<template>
    <div>
        <router-link :to="{ name: 'nova-installed-packages'}">
            ← Back
        </router-link>

        <h2 class="uppercase text-center mb-4" v-html="this.packageName"></h2>

        <card class="flex flex-col mb-6 p-4">
            <p v-html="packageData['abstract']"></p>
        </card>


        <card class="flex flex-col mb-6 p-4">
            <h4 class="uppercase text-center mb-4">Description</h4>
            <span v-html="packageData['description_html']"></span>
        </card>

        <card class="flex flex-col mb-6 p-4">
            <h4 class="uppercase text-center mb-4">Instructions</h4>
            <span v-html="packageData['instructions_html']"></span>
        </card>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.getPackageDataFromNovaPackages()
        },

        data() {
            return {
                packageData: '',
            }
        },

        methods: {
            getPackageDataFromNovaPackages() {
                axios.get('https://novapackages.com/api/search?q=' + this.packageName).then((response) => {
                    this.packageData = response.data['data'][0];
                })
            }
        },

        computed: {
            packageName() {
                return this.$route.params.packageName
            }
        }
    }
</script>

<style>
    /* Scoped Styles */
</style>
