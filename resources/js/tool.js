Nova.booting((Vue, router) => {

    Vue.config.productionTip = true
    Vue.config.devtools = true

    router.addRoutes([
        {
            name: 'nova-installed-packages',
            path: '/nova-installed-packages',
            component: require('./components/Index'),
        }
    ])
})
