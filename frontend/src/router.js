import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  name: 'Homepage',
  path: '',
  component: () => import(/* webpackChunkName: 'homepage' */ '@/views/homepage.vue')
}, {
  name: 'System',
  path: '/system/:sid',
  component: () => import(/* webpackChunkName: 'system' */ '@/views/system/index.vue'),
  children: [{
    name: 'Edit',
    path: 'edit/:pid',
    component: () => import(/* webpackChunkName: 'edit' */ '@/views/system/edit/index.vue')
  }, {
    name: 'Preview',
    path: 'preview/:pid',
    component: () => import(/* webpackChunkName: 'preview' */ '@/views/system/preview.vue')
  }]
}]

const router = new VueRouter({
  routes
})

export default router
