Nova.booting((Vue, router) => {
    router.addRoutes([
        {
            name: 'index',
            path: '/nova-installed-packages',
            component: require('./components/Index'),
        },
        {
            name: 'show',
            path: '/nova-installed-packages/:packageName',
            component: require('./components/Show'),
        },
    ])
})
