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
            {path: 'dones', component: './dones'}
        ]
    }],
};