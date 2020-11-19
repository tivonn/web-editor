module.exports = (pages) => {
  const template =
`import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'homepage',
    path: '',
    redirect: '/${pages[0].id}'
  }, ${pages.map(page => {
return `{
  name: ${page.id},
  path: '/:pid',
  component: () => import(/* webpackChunkName: '${page.id}' */ '@/views/${page.id}/index.vue')
}`
})}]

const router = new VueRouter({
  routes
})

export default router
`
  return template
}
