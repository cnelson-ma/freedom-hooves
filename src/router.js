import Vue from 'vue';
import Router from 'vue-router';
import Display from './views/Display.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'display',
      component: Display,
    },
    {
      path: '/bidding',
      name: 'bidding',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "bidding" */ './views/Bidding.vue'),
    },
  ],
});
