Nova.booting((Vue, router) => {
    router.addRoutes([
        {
            name: 'nova-installed-packages',
            path: '/nova-installed-packages',
            component: require('./components/Tool'),
        },
    ])
})
