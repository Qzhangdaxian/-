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
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
      title: '自然约定|盈管理系统',
      keywords: '自然约定, 头皮生态管理专家'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue'),
    meta: {
      title: '登录',
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
      keywords: '自然约定, 头皮生态管理专家'
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/order/order.vue'),
    meta: {
      requireAuth: true,
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
      title: '订单管理'
    }
  },
  {
    path: '/record',
    name: 'Record',
    // redirect: 'record',
    component: () => import('../views/record/record.vue'),
    meta: {
      requireAuth: true,
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
      title: '补录'
    }
  },
  {
    path: '/addOrder',
    name: 'AddOrder',
    // redirect: 'record',
    component: () => import('../views/addOrder/add_order.vue'),
    meta: {
      requireAuth: true,
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
      title: '新订单申请'
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
      title: '退款管理',
      requireAuth: true,
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }
  },
  {
    path: '/addRefund',
    name: 'AddRefund',
    component: () => import('../views/addRefund/add_refund.vue'),
    meta: {
      title: '退款申请',
      requireAuth: true,
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }
  },
  // 业绩管理
  {
    path: '/performance',
    name: 'Performance',
    component: () => import('../views/performance/performance.vue'),
    meta: {
      title: '业绩管理',
      requireAuth: true,
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }
  },
  {
    path: '/orderDetail',
    name: 'OrderDetail',
    component: () => import('../views/orderDetail/orderDetail.vue'),
    meta: {
      title: '订单详情',
      requireAuth: true,
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    }
  },
  {
    path: '/payOrder',
    name: 'PayOrder',
    component: () => import('../views/payOrder/pay-order.vue'),
    meta: {
      title: '订单支付',
      requireAuth: true,
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  // history: createWebHistory(process.env.BASE_URL)
  routes
})
if (storage.get("token")) {
  store.commit("set_token", storage.get("token"));
}
router.beforeEach((to, from, next) => {
  const title: any = to.meta.title
  if (title) {
    document.title = title
    // 下面是关键的地方，匹配苹果设备
    // if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
      const i = document.createElement('iframe')
      i.src = "//m.baidu.com/favicon.ico" // src要设置成一个实际存在的图片，最好是比较小的，如果不存在，在使用this.$router.go(-1)这种跳转时，会出现错误
      i.style.display = "none"
      i.onload = () => {
        setTimeout(() => {
          document.body.removeChild(i)
        }, 0)
      }
    // }
  }
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
