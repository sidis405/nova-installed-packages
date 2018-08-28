<template>
    <div>
            <heading class="mb-6">Installed Packages ({{ this.packages.length }})</heading>

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
                        <th>
                            &nbsp;
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(package, index) in filteredPackages" :key="index">
                        <td v-for="field in fields">
                            <span class="whitespace-no-wrap text-left">
                                {{ package[field.attribute] }}
                            </span>
                        </td>
                        <td>
                            <router-link :to="{ name: 'show', params: { packageName: package.name }}">
                                <icon type="view" view-box="0 0 24 24" width="20" height="20" />
                            </router-link>
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
                    },
                    {
                        label: 'Description',
                        attribute: 'description',
                    },
                    {
                        label: 'Version',
                        attribute: 'version',
                    },
                    {
                        label: 'Author(s)',
                        attribute: 'authors',
                    }
                ],
                packages: '',
                search: '',
            }
        },

        methods: {
            getPackages() {
                axios.get('/nova-vendor/sidis405/nova-installed-packages').then((response) => {
                    this.packages = Array.from(Object.keys(response.data), k=>response.data[k]);
                })
            }
        },

        computed: {
            filteredPackages() {
                if (! this.search.length) {
                    return this.packages;
                }
                const regex = this.searchRegex;
                // User input is not a valid regular expression, show no results
                if (! regex) {
                    return {};
                }
                return this.packages.filter(novaPackage => {
                    let matchesSearch = false;
                    for (let key in novaPackage) {
                        if (Array.isArray(novaPackage[key])) {
                            novaPackage[key].forEach(property => {
                                if (regex.test(property)) {
                                    matchesSearch = true;
                                }
                            });
                        }
                        else if (regex.test(novaPackage[key])) {
                            matchesSearch = true;
                        }
                    }
                    return matchesSearch;
                });
            },
            searchRegex() {
                try {
                    return new RegExp('(' + this.search + ')','i');
                } catch (e) {
                    return false;
                }
            }
        }
    }
</script>

<style>
    /* Scoped Styles */
</style>
