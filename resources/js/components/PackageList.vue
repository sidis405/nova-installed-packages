<template>
    <div class="flex flex-wrap sm:justify-start">
            <Package v-for="(package, index) in packages" :package="package" :installedPackages="installedPackages" :key="getKeyName(index, package.composer_name)" />
    </div>
</template>

<script>

    import Package from './Package.vue'

    export default {

        components : {
            Package
        },

        props: ['packages', 'installedPackages', 'listingType'],

        methods: {
            getKeyName(index, name){
                return [this.listingType, name, index].join('-')
            }
        }
    }
</script>
