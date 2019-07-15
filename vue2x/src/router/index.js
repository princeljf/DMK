import Vue from 'vue'
import Router from 'vue-router'

import DMK from '@/views/DMK/demo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'DMK',
      component: DMK
    }
  ]
})
