import { createRouter, createWebHistory } from 'vue-router'

import movieList from '../components/movieList.vue'
import movieDetail from '../components/movieDetail.vue'

const routes = [
    {
        path: '/',
        redirect: '/movielist'
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/movielist'
    },
    {
        path: '/movielist',
        name: 'movieList',
        component: movieList
    },
    {
        path: '/moviedetail/:movie_id',
        name: 'movieDetail',
        component: movieDetail
    }
]

//include ไปใน router
const router = createRouter({
    history: createWebHistory(),
    routes
})


//export ให้ main.js ดึงไปใช้ได้
export default router