import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import storage from '@/model/storage'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/home.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue'),
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/order/order.vue'),
    children: [

    ],
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/record',
    name: 'Record',
    // redirect: 'record',
    component: () => import('../views/record/record.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/addOrder',
    name: 'AddOrder',
    // redirect: 'record',
    component: () => import('../views/addOrder/add_order.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('../views/demo.vue'),
  },
  // 退款管理
  {
    path: '/refund',
    name: 'Refund',
    component: () => import('../views/refund/refund.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/addRefund',
    name: 'AddRefund',
    component: () => import('../views/addRefund/add_refund.vue'),
    meta: {
      requireAuth: true,
    }
  },
  // 业绩管理
  {
    path: '/performance',
    name: 'Performance',
    component: () => import('../views/performance/performance.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/orderDetail',
    name: 'OrderDetail',
    component: () => import('../views/orderDetail/orderDetail.vue'),
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/payOrder',
    name: 'PayOrder',
    component: () => import('../views/payOrder/pay-order.vue'),
    meta: {
      requireAuth: true,
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  // history: createWebHistory(process.env.BASE_URL)
  routes
})
if (storage.get("token")) {
  store.commit("set_token", storage.get("token") );
}
router.beforeEach((to, from, next) => {
  // 判断要去的路由有没有requiresAu
  // to.matched.some(r => r.meta.requireAuth) or to.meta.requiresAuth
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next(); //有token,进行request请求，后台还会验证token
    } else {
      router.push({
        path: "/login",
      })
      // next({
      //   path: "login",
      //   // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由，这要进一步在登陆页面判断
      //   // query: { redirect: to.fullPath }
      // });
    }
  } else {
    next(); //如果无需token,那么随它去吧
  }
});
export default router
