import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/order/order.vue'),
    children: [

    ]
  },
  {
    path: '/record',
    name: 'Record',
    // redirect: 'record',
    component: () => import('../views/record/record.vue'),
  },
  {
    path: '/addOrder',
    name: 'AddOrder',
    // redirect: 'record',
    component: () => import('../views/addOrder/add_order.vue'),
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('../views/demo.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  // history: createWebHistory(process.env.BASE_URL)
  routes
})

export default router
