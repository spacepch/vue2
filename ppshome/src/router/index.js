import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//捕获调用push切换到同一路由时报错的异常。
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//捕获调用replace切换到同一路由时报错的异常。
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/',
        meta: { title: '首页' },
        component: () => import('@/views/layout'),
        redirect: '/home',
        children: [
            {
                path: 'qqCard',
                meta: { title: 'QQ接口' },
                component: () => import('@/views/qq'),
            },
            {
                path: 'biliCard',
                name: 'biliCard',
                meta: { title: 'bili接口' },
                component: () => import('@/views/bili'),
            },
            {
                path: 'biliUserCard',
                name: 'biliUserCard',
                meta: { title: 'bili用户搜索接口' },
                component: () => import('@/views/bili/userList.vue')
            },
            {
                path: 'githubCard',
                meta: { title: 'git接口' },
                component: () => import('@/views/github')
            },
            {
                path: 'home',
                name:'home',
                meta: { title: '欢迎页' },
                component: () => import('@/views/home')
            },
        ]
    }
]

const router = new VueRouter({ routes })

export default router