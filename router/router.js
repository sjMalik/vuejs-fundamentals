import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = {template: '<div>Home</div>'};
const About = {template: '<div>About</div>'};

Vue.use(VueRouter);

const routes = [
    {path: '/', component: Home},
    {path: '/about', component: About},
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;

