<template>
    <div class="flex flex-wrap sm:justify-start">
            <Package v-for="(package, index) in packages" :package="package" :installedPackages="installedPackages" :key="index" />
    </div>
</template>

<script>

    import Package from './Package.vue'

    export default {

        components : {
            Package
        },

        props: ['packages', 'installedPackages']
    }
</script>
