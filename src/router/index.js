import { createRouter, createWebHistory } from 'vue-router'

import movieList from '../components/movieList.vue'
import movieDetail from '../components/movieDetail.vue'
import searchPage from '../components/searchPage.vue'
import loginPage from '../components/LoginPage.vue'
import signUpPage from '../components/SignUpPage.vue'
import signUpSuccess from '../components/SignUpSuccess.vue'
import searchGenre from '../components/searchGenre.vue'
import profile from '../components/Profile.vue'
import {getAuth} from "firebase/auth"

const routes = [
    {
        path: '/',
        redirect: '/loginpage'
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/loginpage'
    },
    {
        path: '/loginpage',
        name: 'loginPage',
        component: loginPage,
    },
    {
        path: '/signuppage',
        name: 'signUpPage',
        component: signUpPage,
    },
    {
        path: '/signupsuccess',
        name: 'signUpSuccess',
        component: signUpSuccess,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/movielist',
        name: 'movieList',
        component: movieList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/moviedetail/:id',
        name: 'movieDetail',
        component: movieDetail,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/searchpage/:title',
        name: 'searchPage',
        component: searchPage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/searchgenre/:genre',
        name: 'searchGenre',
        component: searchGenre,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: profile,
        meta: {
            requiresAuth: true
        }
    }
]

//include ไปใน router
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const currentUser = getAuth().currentUser
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if(requiresAuth && !currentUser)
    {
        console.log('You are not authorized to access')
        next('login')
    }
    else if (!requiresAuth && currentUser) 
    {
        console.log('You care authorized to access this area')
        next('users')
    } 
    else
    {
        next()
    }
})

//export ให้ main.js ดึงไปใช้ได้
export default router