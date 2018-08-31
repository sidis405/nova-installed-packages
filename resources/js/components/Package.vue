<template>
            <div class="flex m-2 mb-4 shadow hover:shadow-md h-128 w-full" style="max-width: 400px;">
                <div class="flex-1 bg-white text-sm rounded-sm" style="border-width: 4px 1px 1px; border-style: solid; border-color: rgb(101, 116, 205) rgb(221, 221, 221) rgb(221, 221, 221); border-image: initial;"><!---->

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
                        target="" class="text-indigo font-bold no-underline uppercase text-xs hover:text-indigo-dark">
                            {{package.author.name}}
                        </a>

                        <a href="#" v-if="!installed" @click="install" class="btn btn-default btn-small btn-primary">Install Package</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['package', 'installedPackages'],

        data() {
            return {
                installed: this.isInstalled()
            }
        },

        methods: {

            isInstalled() {

                var isPackageInstalled = this.installedPackages.map(function(i) {
                  return i.name;
                }).includes(this.package.composer_name);

                return isPackageInstalled;
            },

            install(){
                this.$toasted.show('Installing \'' + this.package.composer_name + '\'...', { type: 'info', duration: 100000 });


                // axios.post('/nova-vendor/sidis405/nova-installed-packages', {package: this.package.composer_name}).then((response) => {
                //     console.log(response.data)
                // })
                var request = new XMLHttpRequest();
                request.open('POST', '/nova-vendor/sidis405/nova-installed-packages', true);
                request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                request.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);

                request.onprogress = function(e) {
                    var response = e.currentTarget.response;
                    var lastResponseLength = null
                    var output = typeof lastResponseLength === typeof undefined
                        ? response
                        : response.substring(lastResponseLength);

                    lastResponseLength = response.length;
                    console.log(output);
                };

                let vm = this

                request.onreadystatechange = function() {
                    if (request.readyState == 4) {
                        vm.installed = true
                        setTimeout(function(){
                            vm.$toasted.clear();
                            vm.$toasted.show('\'' + vm.package.composer_name + '\' was installed successfully', { type: 'success' });
                        }, 2000)
                        console.log('Complete');
                    }
                };

                request.send('package=' + this.package.composer_name);
            }
        },

        computed: {
            tags() {
                return this.package.tags.map(function(value) {
                  return '#' + value.name;
                }).join(" ");
            }

        }
    }
</script>
