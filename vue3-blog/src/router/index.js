import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import FormView from '../views/FormView.vue';
import RadioAndCheckbox from '../views/RadioAndCheckbox.vue';
import Parent from '../views/slot-example/Parent.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: FormView
    },
    {
      path: '/checkandradio',
      name: 'checkandradio',
      component: RadioAndCheckbox
    },
    {
      path: '/slot',
      name: 'slot',
      component: Parent
    }
  ]
})

export default router
