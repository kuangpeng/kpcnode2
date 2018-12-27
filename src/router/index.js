var router = [
    {
        name: 'home',
        path: '/',
        components: require('../views/Home.vue'),
        meta: {
            keepAlive: true,
            isBack: true
        }
    },
    {
        name: 'newsDetail',
        path: '/detail/:id',
        components: require('../views/Detail.vue'),
        meta: {
            //keepAlive: true
        }
    },
    {
        name: 'my',
        path: '/my',
        components: require('../views/My.vue'),
        meta: {
            requireAuth: true
        }
    },
    {
        name: 'user',
        path: '/user/:username',
        components: require('../views/User.vue'),
    },
    {
        name: 'login',
        path: '/login',
        components: require('../views/Login.vue')
    }
];

export default router;