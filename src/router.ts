import Vue from 'vue'
import Router from 'vue-router'
import List from './views/List.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'list',
            component: List
        },
        {
            path: '/doc/:id',
            name: 'doc',
            // route level code-splitting
            // this generates a separate chunk (doc.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "doc" */ './views/Doc.vue')
        }
    ]
})
