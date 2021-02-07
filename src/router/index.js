import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home/home'
import category from '../views/category/category'
import profile from '../views/profile/profile'
import shopcart from '../views/shopcart/shopcart'
import detail from '../views/detail/detail'

Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: 'home'
}, {
    path: '/home',
    component: home,
}, {
    path: '/category',
    component: category
}, {
    path: '/profile',
    component: profile
}, {
    path: '/shopcart',
    component: shopcart
}, {
    path: '/detail/:id',
    component: detail

}]

const router = new VueRouter({
    routes
})

export default router