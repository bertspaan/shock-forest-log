import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Graph from './routes/Graph.vue'
import Messages from './routes/Messages.vue'
import Files from './routes/Files.vue'
import URLs from './routes/URLs.vue'
import Locations from './routes/Locations.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

// path: '/video/:videoId/shot/:shotId',

const router = new VueRouter({
  routes: [
    {
      name: 'graph',
      path: '/',
      component: Graph
    },
    {
      name: 'messages',
      path: '/messages',
      component: Messages
    },
    {
      name: 'files',
      path: '/files',
      component: Files
    },
    {
      name: 'urls',
      path: '/urls',
      component: URLs
    },
    {
      name: 'locations',
      path: '/locations',
      component: Locations
    }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
