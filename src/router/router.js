import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    { path: '/', component: () => import('../views/Welcome.vue') },
    { path: '/homepage', component: () => import('../views/Homepage.vue') },
    { path: '/room', name: 'room', component: () => import('../views/Room.vue')}
]

export default new VueRouter({mode:'history', routes: routes})