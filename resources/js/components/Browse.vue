<template>
    <div>
        <div class="flex justify-between">
            <div class="relative h-9 flex items-center mb-6">
                <icon type="search" class="absolute ml-3 text-70" />

                <input
                    class="appearance-none form-control form-input w-search pl-search"
                    placeholder="Search novapackages.com"
                    type="search"
                    v-model="term"
                    @input="searchPackages"
                >
            </div>


                <router-link :to="{ name: 'nova-installed-packages'}" class="no-underline">
                    <button class="btn btn-default btn-primary">
                      <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                      <span>Installed Packages</span>
                    </button>
                </router-link>
        </div>

        <template v-if="foundPackages.length">
            <heading class="mb-6">Found Packages ({{ this.foundPackages.length }})</heading>

            <div class="w-full">
                    <PackageList :packages="foundPackages" :installedPackages="installedPackages" />
            </div>

        </template>

        <template v-if="!foundPackages.length">

            <heading class="mb-6">Popular Packages ({{ this.popularPackages.length }})</heading>

            <div class="w-full">
                    <PackageList :packages="popularPackages" :installedPackages="installedPackages" />
            </div>

            <heading class="mb-6 mt-4">Recent Packages ({{ this.recentPackages.length }})</heading>

            <div class="w-full">
                    <PackageList :packages="recentPackages" :installedPackages="installedPackages" />
            </div>

        </template>
    </div>
</template>

<script>

    import PackageList from './PackageList.vue'

    export default {

        components : {
            PackageList
        },

        mounted() {
            this.getPopularPackages()
            this.getRecentPackages()
            this.getInstalledPackages()
        },

        data() {
            return {
                popularPackages: '',
                recentPackages: '',
                foundPackages: '',
                installedPackages: '',
                term: '',
            }
        },

        methods: {

            getInstalledPackages() {
                axios.get('/nova-vendor/sidis405/nova-installed-packages').then((response) => {
                    this.installedPackages = Array.from(Object.keys(response.data), k=>response.data[k]);
                })
            },

            getPopularPackages() {
                axios.get('https://novapackages.com/api/popular').then((response) => {
                    this.popularPackages = response.data.data;
                })
            },

            getRecentPackages() {
                axios.get('https://novapackages.com/api/recent').then((response) => {
                    this.recentPackages = response.data.data;
                })
            },

            searchPackages() {
                if(this.term.length > 2){
                    axios.get('https://novapackages.com/api/search?q=' + this.term).then((response) => {
                        this.foundPackages = response.data.data;
                        console.log(this.foundPackages)
                    })
                }else{
                    this.foundPackages = [];
                }
            }
        }
    }
</script>

<style>
    /* Scoped Styles */
</style>
