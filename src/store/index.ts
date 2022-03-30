import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/model/storage'

// Vue.use(Vuex);
// 用Vuex.Store对象用来记录token
const store = new Vuex.Store({

  state: {
    // 存储token
    // token: storage.get('token') ? storage.get('token') : '',
    token: "",
    userName: "" // 可选
  },

  getters : {
    get_token(state) {
      return state.token || storage.get("token") || null;
    }
  },

  // 计算属性
  mutations: {
    // 修改token，并将token存入localStorage
    set_token(state, token) {
      state.token = token;
      storage.set('token', token);
      console.log('store、localstorage保存token成功！');
    },
    del_token(state) {
      state.token = "";
      storage.remove("token");
    },
    // 可选
    setUserInfo(state, userName) {
      state.userName = userName;
    }
  }
})

// actions: {}

export default store;
