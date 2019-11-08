import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

// const Graph = () => import('./routes/Graph.vue')
// const Messages = () => import('./routes/Messages.vue')
// const Files = () => import('./routes/Files.vue')
// const URLs = () => import('./routes/URLs.vue')
// const Locations = () => import('./routes/Locations.vue')

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  // routes: [
  //   {
  //     name: 'graph',
  //     path: '/',
  //     component: Graph
  //   },
  //   {
  //     name: 'messages',
  //     path: '/messages',
  //     component: Messages,
  //   },
  //   {
  //     name: 'files',
  //     path: '/files',
  //     component: Files
  //   },
  //   {
  //     name: 'urls',
  //     path: '/urls',
  //     component: URLs
  //   },
  //   {
  //     name: 'locations',
  //     path: '/map',
  //     component: Locations
  //   }
  // ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
