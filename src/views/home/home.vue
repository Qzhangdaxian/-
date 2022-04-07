<template>
  <div class="home">
    <div class="pen_b">
      <div class="card_text">
        <h3>自然约定品牌合作人</h3>
        <img src="../../assets/login/login_logo.png" alt="" />
      </div>
      <p class="card_phone">
        <van-icon name="phone-circle" color="#FFFFFF" />
        <span class="phone_num">手机号：{{ res.userMobile }}</span>
      </p>
    </div>
    <div class="manage_list">
      <h3 class="manage_list_title"><span>//</span> 三大模块系统管理 <span>//</span></h3>
      <ul>
        <li @click="pathRouter('order')">
          <i class="icon_left"> <van-icon :name="require('../../assets/home/order_icon.png')" /></i>
          <span class="text_right">订单管理</span>
        </li>
        <li class="li_center" @click="pathRouter('refund')">
          <i class="icon_left"> <van-icon :name="require('../../assets/home/refund_icon.png')" /></i>
          <span class="text_right">退款管理</span>
        </li>
        <li class="li_center" @click="pathRouter('performance')">
          <i class="icon_left"> <van-icon :name="require('../../assets/home/pre_icon.png')" /></i>
          <span class="text_right">业绩管理</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// import type { IconProps } from 'vant';
import { Icon, Toast } from "vant";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";
document.title = '订单列表';
export default defineComponent({
  name: "h-home",
  components: {
    "van-icon": Icon,
  },
  setup() {
    // const str = '1211111111111';
    // console.log()
    const route = useRoute();
    const router = useRouter();
    let res: any = ref(route.query);
    var reg = /^(\d{3})\d{4}(\d{4})$/;
    if(res.value.userMobile){
      res.value.userMobile = res.value?.userMobile.replace(reg, "$1****$2");
    }
    if(!res.value.userMobile) {
      Toast('认证失败请重新登录');
      router.push({
        path: '/login'
      })
      store.commit("del_token");
    }

    function pathRouter(routerName: string) {
      console.log(routerName);
      router.push({
        path: "/" + routerName,
        query: route.query,
      });
    }
    // window.addEventListener("popstate", function () {
    //   store.commit('del_token');
    //   this.alert('1111')
    //   return;
    // });
    function titleUpdate() {
      let iframe = document.createElement("iframe");
      //设置标题
      document.title = '订单列表';
      //加载空iframe
      iframe.src = "/";
      document.body.appendChild(iframe);
      //刷新后移除iframe
      setTimeout(function () {
        document.body.removeChild(iframe);
      }, 0);
    }
    titleUpdate();
    return {
      pathRouter,
      res,
    };
  },
});
</script>

<style lang="scss">
@import "./home.scss";
</style>
