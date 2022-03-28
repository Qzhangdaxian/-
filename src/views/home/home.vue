<template>
  <div class="home">
    <div class="pen_b">
      <div class="card_text">
        <h3>自然约定品牌合作人</h3>
        <img src="../../assets/login/login_logo.png" alt="">
      </div>
      <p class="card_phone">
        <van-icon name="phone-circle" color="#FFFFFF"/>
        <span class="phone_num">手机号：18009098900</span>
      </p>
    </div>
    <div class="manage_list">
      <h3 class="manage_list_title"> // 三大模块系统管理 //</h3>
      <ul>
        <li @click="pathRouter('order')">
          <i class="icon_left"><van-icon name="todo-list-o" /></i>
          <span class="text_right">订单管理</span>
        </li>
        <li class="li_center" @click="pathRouter('refund')">
          <i class="icon_left"><van-icon name="refund-o" /></i>
          <span class="text_right">退款管理</span>
        </li>
        <li>
          <i class="icon_left" @click="pathRouter('performance')"><van-icon name="chart-trending-o" /></i>
          <span class="text_right">业绩管理</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import type { IconProps } from 'vant';
import { Icon } from 'vant';
import router from "@/router";

document.title = "自然约定|盈管理系统";

export default defineComponent({
  name: "h-home",
  components: {
    'van-icon': Icon
  },
  setup() {
    function pathRouter(routerName: string){
      router.push({
        path: '/'+routerName,
      })
    }
    return {
      pathRouter
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./home.scss";
</style>
