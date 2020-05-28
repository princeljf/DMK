import Vue from 'vue'
import Router from 'vue-router'

import main from '@/views/main/index'
import code from '@/views/code/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/code',
      name: 'code',
      component: code
    },
  ]
})
