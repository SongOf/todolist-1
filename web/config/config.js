export default {
    singular: true,
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true,
        }],
    ],
    routes: [{
        path: '/',
        component: '../layout',
        routes: [
            {path: 'undos', component: './undos'},
            {path: 'dones', component: './dones'},
            {path: 'expired', component: './expired'}
        ]
    }],
    /*proxy: {
        '/api': {
            target: 'http://localhost:8080',
            changeOrigin: true,
        },
    },*/
};