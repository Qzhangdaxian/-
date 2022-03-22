<template>
  <div class="login page-layout">
    <div>
      <img src="../../assets/login/login_logo.png" alt="" class="login_logo" />
    </div>
    <p class="login_welcome">欢迎登录盈管理系统</p>
    <h-input :bordered="false" type="text" placeholder="请输入账号" />
    <div class="password-seeker">
      <h-input :bordered="false" :value="value" :type="{ password: isOpen, text: !isOpen }" placeholder="请输入密码" />
      <eye-outlined class="seeker" v-if="isOpen" @click="toggleSeePwd" />
      <eye-invisible-outlined class="seeker" v-if="!isOpen" @click="toggleSeePwd" />
    </div>
    <div class="policy">
      <check-circle-two-tone :twoToneColor="iconColor" class="check_circle" @click="toggleSgree" />
      <span>我已阅读并同意<a href="javascript:;" @click="openTips">《使用协议和隐私政策概要》</a> </span>
    </div>
    <h-button class="log_in" @click="login">登录</h-button>
    <div class="policy_tip" v-if="tipsIsOpen">
      <div class="policy_shade"></div>
      <div class="policy_text">
        <h3>使用协议和隐私政策概要</h3>
        <p>
          尊敬的经销商/门店工作人员，在您使用小程序前请您充分阅读并理解下述信息内容，若您同意，请点击”同意“并持续使用小程序。<br>
          1、我方视为在您开通小程序账户时已充分授权您的个人隐私信息。您的个人账户开通信息我们仅作为订单管理及退单业务合作推进使用。
          除业务合作必要不会向任何第三方泄露（法律法规要求公开的除外）。<br>
          2、在小程序订单管理中您提交用户信息及图像等（线下购买客户信息），我方视为您已经过本人充分授权并将其使用用途说明清楚情况下提交。
          对此您与客户之间产生的个人信息纠纷我方不承担任何责任。<br>
          3、任何在小程序内提供的个人隐私信息我方在业务合作推进中使用外，均不会像第三方泄露（法律法规要求公开的除外）。
        </p>
        <div class="policy_text-btn">
          <span @click="closeTip">取消</span>
          <span @click="closeTip">确认</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, ref, toRefs } from "vue";
// import 'ant-design-vue/dist/antd.css';
import { Input, Button } from "ant-design-vue";
import { CheckCircleTwoTone, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons-vue";
import { LoginService } from "./login.service";
export default {
  name: "h-login",
  components: {
    "h-input": Input,
    "h-button": Button,
    CheckCircleTwoTone,
    EyeOutlined,
    EyeInvisibleOutlined,
  },
  setup() {
    document.title = "登录";
    const value = ref<string>("");
    // let iconColor = ref<string>("#");
    let canPasswordVisible = reactive({
      isOpen: false,
      iconColor: "rgba(214, 214, 214, 0.6)",
      tipsIsOpen: false
    });
    function toggleSeePwd() {
      canPasswordVisible.isOpen = !canPasswordVisible.isOpen;
      canPasswordVisible.iconColor = "#A9B28E";
      console.log(canPasswordVisible.iconColor);
    }
    function toggleSgree() {
      canPasswordVisible.iconColor === "rgba(214, 214, 214, 0.6)" ? (canPasswordVisible.iconColor = "#A9B28E") : (canPasswordVisible.iconColor = "rgba(214, 214, 214, 0.6)");
    }
    function login() {
      LoginService.login({ username: "152111111", password: "123456" }).then((res) => {
        console.log(res);
      });
    }
    function openTips() {
      canPasswordVisible.tipsIsOpen = !canPasswordVisible.tipsIsOpen;
    }
    function closeTip(){
      canPasswordVisible.tipsIsOpen = !canPasswordVisible.tipsIsOpen;
    }
    return {
      ...toRefs(canPasswordVisible),
      value,
      toggleSeePwd,
      toggleSgree,
      login,
      openTips,
      closeTip,
    };
  },
};
</script>
<style lang="scss">
@import "./login.scss";
</style>
