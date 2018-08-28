<template>
    <div>
            <heading class="mb-6">Installed Packages</heading>

            <div class="flex justify-between">
                <div class="relative h-9 flex items-center mb-6">
                    <icon type="search" class="absolute ml-3 text-70" />

                    <input
                        class="appearance-none form-control form-input w-search pl-search"
                        placeholder="Search"
                        type="search"
                        v-model="search"
                    >
                </div>
            </div>

        <card>

            <div class="overflow-hidden overflow-x-auto relative">
                <table class="table w-full" cellpadding="0" cellspacing="0">
                    <thead>
                    <tr>
                        <th v-for="field in fields" class="text-left">
                                {{ field.label }}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(package, index) in packages" :key="index">
                        <td v-for="field in fields">
                            <span class="whitespace-no-wrap text-left">
                                {{ package[field.attribute] }}
                            </span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </card>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.getPackages()
        },

        data() {
            return {
                fields: [
                    {
                        label: 'Name',
                        attribute: 'name',
                        sortable: true
                    },
                    {
                        label: 'Description',
                        attribute: 'description',
                        sortable: false
                    },
                    {
                        label: 'Version',
                        attribute: 'version',
                        sortable: false
                    }
                ],
                packages: ''
            }
        },

        methods: {
            getPackages() {
                axios.get('/nova-vendor/sidis405/nova-installed-packages').then((response) => {
                    this.packages = response.data
                })
            }
        }
    }
</script>

<style>
    /* Scoped Styles */
</style>
