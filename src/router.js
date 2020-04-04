import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: () => import(/* webpackChunkName: 'homepage' */ '@/views/homepage.vue')
  },
  {
    path: '/edit/:pid',
    name: 'Edit',
    component: () => import(/* webpackChunkName: 'edit' */ '@/views/edit/index.vue')
  },
  {
    path: '/preview',
    name: 'Preview',
    component: () => import(/* webpackChunkName: 'preview' */ '@/views/preview/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
