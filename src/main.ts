import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
import Vant from 'vant';

// import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
const app = createApp(App)

app.use(store, Vant)
  .use(router)
  .mount('#app')
