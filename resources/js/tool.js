Nova.booting((Vue, router) => {
    router.addRoutes([
        {
            name: 'nova-installed-packages',
            path: '/nova-installed-packages',
            component: require('./components/Index'),
        },
        {
            name: 'nova-installed-packages-detail',
            path: '/nova-installed-packages/:packageName',
            component: require('./components/Show'),
        },
    ])
})
