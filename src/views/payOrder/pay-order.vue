<template>
  <div class="pay_order">
    <van-nav-bar :right-text="'待付款'">
      <template #left>
        <van-icon name="shop-o" />
        <span class="storeName">{{ dataSources.storeName }}</span>
        <van-icon name="arrow" />
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">身份证号</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{ dataSources.alopeciaState }}</span>
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">年龄</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{ dataSources.age }}</span>
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">下单日期</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{ dataSources.orderTime }}</span>
      </template>
    </van-nav-bar>
    <div class="pay_type">
      <h3 class="required pay_type-title">支付方式</h3>
      <van-divider hairline/>
      <div class="sapn_btns">
        <span class="span_btn" v-bind:class="{ bntActive: payNum === 1 }" @click="payType(1)">自有库存</span>
        <span class="span_btn" v-bind:class="{ bntActive: payNum === 2 }" @click="payType(2)">线上支付</span>
      </div>
    </div>
    <div class="pcs" v-if="payNum === 1">
      <van-nav-bar>
        <template #left>
          <span class="nav_text">当前自有库存数量</span>
        </template>
        <template #right>
          <span class="nat_text_data">30</span>
        </template>
      </van-nav-bar>
      <div>
        <van-empty
        class="custom-image"
        :image="require('../../assets/addOrder/no-found.png')"
        description="给您配额的产品库存不足，请选择线上支付" />
      </div>
    </div>
    <div class="pay_type-cash" v-if="payNum === 2">
      <div class="pay_type—code">
        <van-empty
        class="custom-image"
        :image="require('../../assets/addOrder/no-found.png')"
        description="扫一扫上面二维码，完成支付" />
      </div>
      <div class="pay_type-order">
        <h3 class="required pay_type-title">上传支付凭证</h3>
        <van-image-preview :isdefault="false" :images="imageArr"/>
        <p class="ARequired pay_type-tips">请按照上述示例图标准拍照上传（点击查看）</p>
        <van-uploader v-model="fileList" :after-read="afterRead" :upload-icon="'back-top'" :max-count="1" >
        <van-icon name="back-top"  class="pay_type-upload"/>
          <p>点击上传</p>
        </van-uploader>
      </div>
    </div>
    <div class="pay_order-submit">
        <van-button round class="pay_order-btn" color="#919A74" size="large" type="primary">提交付款</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { NavBar, Icon, Divider,Empty, Button, Uploader } from "vant";
import imgagePre from "@/components/imagePreview/imagePreview.vue";

document.title = "订单管理";
export default defineComponent({
  name: "h-pay_order",
  components: {
    "van-nav-bar": NavBar,
    "van-icon": Icon,
    "van-divider": Divider,
    "van-empty": Empty,
    "van-button": Button,
    "van-uploader": Uploader,
    "van-image-preview": imgagePre,
  },
  setup() {
    const imageArr = ["https://img.yzcdn.cn/vant/apple-1.jpg"];
    let payNum = ref(0);
    const fileList = ref([
      // {
      //   url: 'https://img.yzcdn.cn/vant/leaf.jpg',
      //   status: 'success',
      //   message: '上传中...',
      // },
      // {
      //   url: 'https://img.yzcdn.cn/vant/tree.jpg',
      //   status: 'success',
      //   message: '上传失败',
      // },
    ]);
    const dataSources = {
      storeName: "和合苑理发店",
      userName: "张珊",
      identity: "51651653",
      age: "45",
      orderTime: "2022-01-20",
      code: "1165651",
      alopecia: "2022-01-22",
      alopeciaState: "M型脱发",
      deliveryDate: "2022-01-23",
      courierCompany: "京东",
      courierNumber: "459325454",
      id: 0,
      state: 1,
    };
    const payType = (num: number) => {
      payNum.value = num;
    };
    const afterRead = (file: any) => {
      // file.status = 'success';
      // file.message = '上传中...';
      // setTimeout(() => {
      //   file.status = 'success';
      //   file.message = '上传失败';
      // }, 1000);
    };
    // function CheckStatePipe(value: any): any {
    //   const returnData = data.filter((item: Data) => item.value === Number(value));
    //   return returnData[0].name;
    // }

    return {
      dataSources,
      payNum,
      imageArr,
      fileList,
      // CheckStatePipe,
      payType,
      afterRead
    };
  },
});
</script>
<style lang="scss" >
@import "./pay-order.scss";
</style>
