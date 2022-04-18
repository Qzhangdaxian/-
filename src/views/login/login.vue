<template>
  <div class="login page-layout">
    <!--
    -->
    <div>
      <img src="../../assets/login/login_bg.png" alt="" class="login_logo" />
    </div>
    <div class="login_passWord">
      <p class="login_welcome">欢迎登录盈管理系统</p>
      <p class="error_tip" v-if="isPassword">请检查看账号/密码是否有误</p>
      <a-input v-model:value="userName" :class="{ form_input: !isUernameError, error_input: isUernameError }" :bordered="false" type="text" placeholder="请输入账号" @change="onChangs('userName')" />
      <div class="password-seeker">
        <a-input-password v-model:value="passWord" :class="{ form_input: !isPasswordError, error_input: isPasswordError }" placeholder="请输入密码" @change="onChangs('passWord')" />
      </div>
      <div class="policy">
        <check-circle-outlined v-if="!isActive" class="check_circle" @click="toggleSgree" />
        <van-icon name="checked" class="checked_circle" v-if="isActive" @click="toggleSgree"/>
        <span>我已阅读并同意<a href="javascript:;" @click="openTips">《使用协议和隐私政策概要》</a> </span>
      </div>
      <h-button class="log_in" :disabled="isDis" @click="login">登录</h-button>
    </div>
    <!--:disabled="true"-->
    <div class="policy_tip" v-if="tipsIsOpen">
      <div class="policy_shade"></div>
      <div class="policy_text">
        <h3>使用协议和隐私政策概要</h3>
        <p>
          尊敬的经销商/门店工作人员，在您使用小程序前请您充分阅读并理解下述信息内容，若您同意，请点击”同意“并持续使用小程序。<br />
          1、我方视为在您开通小程序账户时已充分授权您的个人隐私信息。您的个人账户开通信息我们仅作为订单管理及退单业务合作推进使用。 除业务合作必要不会向任何第三方泄露（法律法规要求公开的除外）。<br />
          2、在小程序订单管理中您提交用户信息及图像等（线下购买客户信息），我方视为您已经过本人充分授权并将其使用用途说明清楚情况下提交。 对此您与客户之间产生的个人信息纠纷我方不承担任何责任。<br />
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
import { defineComponent, reactive, ref, toRefs } from "vue";
// import 'ant-design-vue/dist/antd.css';
import { Input, Button } from "ant-design-vue";
// import { FormItem } from "ant-design-vue/lib/form";
import { InputPassword } from "ant-design-vue/lib/input";
import { CheckCircleOutlined } from "@ant-design/icons-vue";
import { LoginService } from "./login.service";
import { useRouter } from "vue-router";
import { Icon } from "vant";
import store from "@/store";
// interface FormState {
//   username: string;
//   password: string;
// }
import storage from "@/model/storage";
import { Toast } from "vant";
document.title = "登录";
export default defineComponent({
  name: "h-login",
  components: {
    "a-input": Input,
    "h-button": Button,
    // 'a-form': Form,
    // 'a-form-item':FormItem,
    "a-input-password": InputPassword,
    // CheckCircleTwoTone,
    "check-circle-outlined": CheckCircleOutlined,
    'van-icon': Icon,
    // EyeOutlined,
    // EyeInvisibleOutlined,
  },
  setup() {
    const userName = ref<string>("");
    const passWord = ref<string>("");
    const router = useRouter();
    // let iconColor = ref<string>("#");
    let canPasswordVisible = reactive({
      isOpen: false,
      iconColor: "#919A74",
      tipsIsOpen: false,
      isUernameError: false,
      isPasswordError: false,
      isDis: false,
      isPassword: false,
      isActive: true
    });
    function disChange() {
      if (canPasswordVisible.iconColor === "#919A74" && userName.value && passWord.value) {
        canPasswordVisible.isDis = false;
      }
      // else {
      //   canPasswordVisible.isDis = true;
      // }
    }
    function toggleSgree() {
      canPasswordVisible.isActive = !canPasswordVisible.isActive
      disChange();
    }
    function login() {
      if (!canPasswordVisible.isActive) {
        Toast("请勾选使用协议和政策概要");
        return;
      }
      canPasswordVisible.isDis = true;
      if (!userName.value) {
        canPasswordVisible.isUernameError = true;
        return;
      }
      if (!passWord.value) {
        canPasswordVisible.isPasswordError = true;
        return;
      }
      const param = {
        username: userName.value,
        password: passWord.value,
      };
      // console.log(param);
      LoginService.login("POST", param).then((res) => {
        if (!res.data.success) {
          if (res.data.message === null || res.data.message) {
            canPasswordVisible.isPassword = true;
          } else {
            // console.log("success===>登陆成功");
            // router.push({
            //   path: "/demo",
            // });
          }
          canPasswordVisible.isPasswordError = true;
        } else {
          let data = res.data.data;
          store.commit("set_token", data.token);
          store.commit("setUserInfo", data.userMobile);
          router.push({
            path: "/",
            query: {
              // 1：财务 2 运营 3 经销商 4 门店
              type: data.userInfo.type,
              userMobile: data.userInfo.userMobile,
              quota: data.userInfo.quota,
            },
          });
          //86400000
          setInterval(() => {
            storage.removeAll();
            router.push({
              path: "/login",
            });
            Toast("认证失败请重新登录");
          }, 86400000);
        }
      });
    }
    function onChangs(name: string): void {
      if (name === "userName") {
        userName.value.length >= 1 ? (canPasswordVisible.isUernameError = false) : (canPasswordVisible.isUernameError = true);
      } else if (name === "passWord") {
        passWord.value.length >= 1 ? (canPasswordVisible.isPasswordError = false) : (canPasswordVisible.isPasswordError = true);
      }
      canPasswordVisible.isPassword = false;
      disChange();
    }
    function openTips() {
      canPasswordVisible.tipsIsOpen = !canPasswordVisible.tipsIsOpen;
    }
    function closeTip() {
      canPasswordVisible.tipsIsOpen = !canPasswordVisible.tipsIsOpen;
    }
    return {
      ...toRefs(canPasswordVisible),
      userName,
      passWord,
      toggleSgree,
      login,
      openTips,
      closeTip,
      onChangs,
    };
  },
});
</script>
<style lang="scss">
@import "./login.scss";
// @import 'ant-design-vue/lib/date-picker/style/css';
</style>
