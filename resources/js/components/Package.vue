<template>
        <div class="flex m-2 mb-4 shadow hover:shadow-md h-128 w-full" style="max-width: 350px;">
            <div class="flex-1 bg-white text-sm rounded-sm" style="border-width: 4px 1px 1px; border-style: solid; border-color: rgb(101, 116, 205) rgb(221, 221, 221) rgb(221, 221, 221); border-image: initial;">

                <div class="flex flex-row mt-4 px-4 pb-4" style="height: 14em;">
                    <div class="pb-2 w-full relative">

                        <div class="flex justify-between">

                            <router-link :to="{ name: 'nova-installed-packages-detail', params: { packageName: package.composer_name }}" class="block mb-2 no-underline">
                                <h2 class="text-xl text-grey-darkest flex flex-row items-center text-black">
                                    {{ package.name }}
                                </h2>
                            </router-link>

                            <span v-if="installed"  class="text-success mt-1 font-bold">Installed</span>
                        </div>


                        <div class="text-grey-darkest leading-normal mb-4 markdown leading-tight w-full">{{package.abstract}}</div>

                        <div class="py-4">{{ tags }}</div>

                        <a :href="package.novapackages_url" target="_blank" class="absolute block text-indigo font-bold no-underline pin-b pin-l">
                            Learn More
                        </a>
                    </div>
                </div>
                <div class="bg-grey-lightest flex text-sm border-t border-grey-light px-4 py-4 justify-between">

                        <a :href="package.author.url ? package.author.url : '#'"
                        target="" class="text-indigo font-bold no-underline uppercase text-xs hover:text-indigo-dark mt-3 ml-0">
                            {{package.author.name}}
                        </a>

                        <button v-if="!installed"
                            :disabled="disabled"
                            :class="{'opacity-50 cursor-not-allowed': disabled}"
                            @click.prevent="requestInstallation" class="btn btn-default h-btn-sm btn-primary leading-loose">
                            <span v-if="installing"><loader width="30" height="30"></loader></span>
                            <span v-else>Install</span>
                        </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import notify from '../notify';
    export default {
        props: ['package', 'installedPackages', 'key'],

        created(){

            Nova.$on('installation-requested', payload => this.installIfNeeded(payload))

            Nova.$on('installation-started', payload => { this.notifyIfNeeded('installing', payload); this.disabled = true })

            this.$on('installation-complete', payload => { this.notifyIfNeeded('installed', payload); this.configure()})

            this.$on('configuration-started', payload => this.notifyIfNeeded('configuring', payload))

            Nova.$on('configuration-complete', payload => { this.notifyIfNeeded('configured', payload); this.disabled = false })
        },

        data() {
            return {
                installed: this.isInstalled(),
                installing: false,
                disabled: false,
            }
        },

        methods: {

            concernsPackage(packageKey){
                return packageKey == this.$vnode.key;
            },

            notifyIfNeeded(type, payload){
                if(this.concernsPackage(payload.packageKey)){
                    notify[type](this.package.composer_name, this.$toasted)
                }
            },

            clearNotificationsAfter(after){
                var _this = this
                setTimeout(function(){ _this.$toasted.clear(); }, after)
            },

            isInstalled() {

                return this.installedPackages.map(function(i) { return i.name; }).includes(this.package.composer_name);

            },

            requestInstallation(){
                Nova.$emit('installation-requested', {packageKey: this.$vnode.key});
            },

            installIfNeeded(payload){
                if(this.concernsPackage(payload.packageKey)){
                    this.install()
                }
            },

            install(){

                this.installing = true

                Nova.$emit('installation-started', {packageKey: this.$vnode.key});

                axios.post('/nova-vendor/sidis405/nova-installed-packages', {package: this.package.composer_name})
                .then((response) => {
                        this.$emit('installation-complete', {packageKey: this.$vnode.key});
                })
            },

            configure(){

                this.$emit('configuration-started', {packageKey: this.$vnode.key});

                axios.post('/nova-vendor/sidis405/nova-installed-packages/configure', {package: this.package.composer_name})
                .then((response) => {


                    this.insertPackageScripts(response.data)

                    this.insertNavigationItem(response.data)

                    Nova.$emit('configuration-complete', {packageKey: this.$vnode.key});

                    this.installing = true;
                    this.installed = true;

                    this.clearNotificationsAfter(2000)
                })
            },

            insertPackageScripts(payload){
                var head = document.getElementsByTagName('body')[0];
                var script = document.createElement('script');
                script.src = '/nova-api/scripts/' + payload['tools'][0]['scripts'];
                head.appendChild(script);
            },

            insertNavigationItem(payload){
                document.querySelector('#nova > div > div').insertAdjacentHTML('beforeend', this.decodeHTML(payload['tools'][0]['navigation']))
            },

            decodeHTML(html) {
                var txt = document.createElement('textarea');
                txt.innerHTML = html;
                return txt.value;
            },
        },



        computed: {
            tags() { return this.package.tags.map(function(value) { return '#' + value.name; }).join(" "); }
        }
    }
</script>
