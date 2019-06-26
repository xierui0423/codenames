import Vue from 'vue';
import VueRouter from 'vue-router';
import game from './main.vue';

import routes from './routes';

Vue.use(VueRouter);

$(() => {
  if ($('[data-main-container]').length) {
    Vue.prototype.$imageRoot = window.imageRoot;
    Vue.prototype.$audioRoot = window.audioRoot;

    const router = new VueRouter({
      routes,
      mode: 'hash',
    });


    new Vue({
      el: 'main',
      render: h => h(game),
      router,
    });
  }
});
