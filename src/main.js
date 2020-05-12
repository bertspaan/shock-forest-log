import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import InfiniteLoading from 'vue-infinite-loading'

Vue.use(VueRouter)
Vue.use(InfiniteLoading, { /* options */ })

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    {
      name: 'main',
      path: '/',
      component: App
    },
    {
      name: 'about',
      path: '/about',
      component: App
    }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
