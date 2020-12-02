import Vue from 'vue'
import Router from 'vue-router'
// 首页
import home from '../view/home/index.vue'
import order from '../view/home/customer_order.vue'
import tab from '../view/home/my_tab.vue'
import sub from '../view/home/sub_tab.vue'
import ord from '../view/home/ord.vue'
import gen from '../view/home/order.vue'
// 个人业绩
import person from '../view/Person/index.vue'
import Psale from '../view/Person/Sale.vue'

// 购物车
import shop from '../view/shoping/index.vue'
import order_detail from '../view/shoping/order.vue'
import submit from '../view/shoping/submit.vue'
import Success from '../view/shoping/Success'

//团队业绩
import team from '../view/team/index.vue'
import agent from '../view/team/agent_list.vue'
import month from '../view/team/month.vue'
import gmp from '../view/team/Gmp.vue'
import detail from '../view/team/detail.vue'
import tagent from '../view/team/tagent.vue'

// 用户中心
import user from '../view/user/index.vue'
import my_agent from '../view/user/my_agent.vue'
import set from '../view/user/my_set.vue'
import exma from '../view/user/examine.vue'
import modify from '../view/user/modify.vue'
import exma_agent from '../view/user/agent_sh.vue'
import son from '../view/user/son.vue'
import sondetail from '../view/user/detail_son.vue'
import sale from '../view/user/user_sale.vue'
import lower from '../view/user/lower.vue'
import address from "../view/user/address.vue"
import add_address from "../view/user/add_address.vue"

//用户注册，登录
import login from '../view/user/login.vue'
import reg from '../view/user/register.vue'
import font from '../view/user/forget.vue'
// import { Tab } from 'vant';

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: login
        },
        {
            path: '/home',
            name: 'home',
            meta: {
                requireAuth: true
            },
            component: home
        },
        {
            path: '/gen',
            name: 'gen',
            meta: {
                requireAuth: true
            },
            component: gen
        },
        {
            path: '/person',
            name: 'person',
            meta: {
                requireAuth: true,
                keepAlive: true, //此组件需要被缓存
            },
            component: person
        },
        {
            path: '/team',
            name: 'team',
            meta: {
                requireAuth: true,
                keepAlive: true, //此组件需要被缓存
            },
            component: team
        },
        {
            path: '/user',
            name: 'user',
            meta: {
                requireAuth: true
            },
            component: user
        },
        {
            path: '/address',
            name: 'address',
            component: address
        },
        {
            path: '/add_address',
            name: 'add_address',
            component: add_address
        },

        {
            path: '/shop/:id',
            name: 'shop',
            component: shop
        },
        {
            path: '/order',
            name: 'order',
            component: order
        },
        {
            path: '/tab/:index',
            name: 'tab',
            meta: {
                requireAuth: true,
                keepAlive: true, //此组件需要被缓存
            },
            component: tab
        },
        {
            path: '/sub/:index',
            name: 'sub',
            meta: {
                requireAuth: true,
                keepAlive: true, //此组件需要被缓存
            },
            component: sub
        },
        {
            path: '/sale',
            name: 'sale',
            meta: {
                requireAuth: true
            },
            component: sale
        },
        {
            path: '/agent',
            name: 'agent',
            meta: {
                requireAuth: true
            },
            component: agent
        },
        {
            path: '/month',
            name: 'month',
            meta: {
                requireAuth: true
            },
            component: month
        },
        {
            path: '/gmp',
            name: 'gmp',
            meta: {
                requireAuth: true
            },
            component: gmp
        },
        {
            path: '/set',
            name: 'set',
            meta: {
                requireAuth: true
            },
            component: set
        },
        {
            path: '/exma',
            name: 'exma',
            meta: {
                requireAuth: true
            },
            component: exma
        },
        {
            path: '/my_agent',
            name: 'my_agent',
            meta: {
                requireAuth: true
            },
            component: my_agent
        },
        {
            path: '/modify/:id',
            name: 'modify',
            meta: {
                requireAuth: true
            },
            component: modify
        },
        {
            path: '/exma_agent/:id',
            name: 'exma_agent',
            meta: {
                requireAuth: true
            },
            component: exma_agent
        },
        {
            path: '/son/:id',
            name: 'son',
            meta: {
                requireAuth: true
            },
            component: son
        },
        {
            path: '/sondetail/:id',
            name: 'sondetail',
            meta: {
                requireAuth: true
            },
            component: sondetail
        },
        {
            path: '/detail',
            name: 'detail',
            meta: {
                requireAuth: true,
            },
            component: detail
        },
        {
            path: '/order_detail',
            name: 'order_detail',
            component: order_detail
        },
        {
            path: '/submit',
            name: 'submit',
            component: submit
        },
        {
            path: '/login',
            name: 'longin',
            component: login
        },
        {
            path: '/Psale',
            name: 'Psale',
            meta: {
                requireAuth: true
            },
            component: Psale
        }, {
            path: '/ord/:id',
            name: 'ord',
            meta: {
                requireAuth: true
            },
            component: ord
        }, {
            path: '/reg',
            name: 'reg',
            component: reg
        }, {
            path: '/font',
            name: 'font',
            component: font
        }, {
            path: '/lower/:id',
            name: 'lower',
            meta: {
                requireAuth: true
            },
            component: lower
        },
        {
            path: '/tagent',
            name: 'tagent',
            meta: {
                requireAuth: true
            },
            component: tagent
        },
        {
            path: '/Success',
            name: 'Success',
            component: Success
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
        if (localStorage.getItem('token')) { // 判断是否登录
            next()
        } else { // 没登录则跳转到登录界面
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
})


export default router