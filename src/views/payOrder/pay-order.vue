<template>
  <div class="pay_order">
    <van-nav-bar :right-text="'待付款'">
      <template #left>
        <van-icon name="shop-o" />
        <span class="storeName">{{ dataSources?.storeName }}</span>
        <van-icon name="arrow" />
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">身份证号</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{ dataSources?.identity }}</span>
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">年龄</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{ dataSources?.age }}</span>
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">下单日期</span>
      </template>
      <template #right>
        <!--| date:'yyyy-dd-mm'-->
        <span class="nat_text_data">{{ dataSources?.createTime }}</span>
      </template>
    </van-nav-bar>
    <div class="pay_type">
      <h3 class="required pay_type-title">支付方式</h3>
      <van-divider hairline />
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
            <span class="nat_text_data">{{res.quota}}</span>
          </template>
        </van-nav-bar>
        <div v-if="res.quota === 0">
          <van-empty class="custom-image" :image="require('../../assets/addOrder/no-found.png')" description="给您配额的产品库存不足，请选择线上支付" />
        </div>
      </div>

    <div class="pay_type-cash" v-if="payNum === 2">
      <div class="pay_type—code">
        <van-empty class="custom-image" :image="require('../../assets/addOrder/code_pay.png')" description="扫一扫上面二维码，完成支付" />
      </div>
      <div class="pay_type-order">
        <h3 class="required pay_type-title">上传支付凭证</h3>
        <van-image-preview :isdefault="false" :images="imageArr" />
        <p class="ARequired pay_type-tips">请按照上述示例图标准拍照上传（点击查看）</p>
        <van-uploader v-model="productNoImg" :after-read="afterRead" :before-delete="deteleImg" :upload-icon="'back-top'" :max-count="1">
          <van-icon :name="require('../../assets/addOrder/upload.png')" class="pay_type-upload" />
          <p>点击上传</p>
        </van-uploader>
      </div>
    </div>
    <div class="pay_order-submit">
      <van-button round class="pay_order-btn" color="#919A74" :disabled="isDis || res.quota === 0" size="large" type="primary" @click="onPay" v-if="payNum === 1">提交付款</van-button>
      <van-button round class="pay_order-btn" :disabled="imgData.length == 0 || isDis" color="#919A74" size="large" type="primary" @click="onPay" v-if="payNum === 2">提交付款</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { NavBar, Icon, Divider, Empty, Button, Uploader, Toast } from "vant";
import imgagePre from "@/components/imagePreview/imagePreview.vue";
import { orderService } from "../service";
import { useRoute } from "vue-router";

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
    const route = useRoute();
    const imageArr = [require('../../assets/addOrder/pay_pic.png')];
    let payNum = ref(1);
    let res: any = ref(route.query);
    const data = reactive({
      imgData: [] as any,
      productNoImg: [] as Array<any>,
      isDis: false
    });
    const dataSources = ref();
    const orderDetail = () => {
      orderService.orderDetail({ id: res.value.id }).then((res) => {
        if (res.data.success) {
          dataSources.value = res.data.data;
          if(res.data.data.payMethod){
            payNum.value = res.data.data.payMethod;
            data.productNoImg.push(res.data.data.voucherArray[0]);
            data.imgData.push(res.data.data.voucherArray[0].id);
          }
        }
      });
    };
    orderDetail();
    const onPay = () => {
      data.isDis = true;
      const param = {
        id: Number(route.query.id),
        voucher: payNum.value ==2? data.imgData.join(",") : null,
        payMethod: payNum.value,
      };
      orderService.orderPay(param).then((res: any) => {
        if (res.data.success) {
          Toast("提交成功");
          history.back();
        }else{
          data.isDis = false;
          Toast("提交失败")
        }
      });
    };
    const payType = (num: number) => {
      payNum.value = num;
    };
    const afterRead = (file: any) => {
      let fileContent = file.file as File;
      Toast("正在上传图片");
      orderService
        .upload(fileContent)
        .then((res: any) => res.json())
        .then((res: any) => {
          data.imgData.push(res.data.id);
          console.log(data.imgData, res.data);
        });
    };
    const deteleImg: any = (file: any) => {
      console.log(file);
      data.productNoImg.forEach((item: any, index: number) => {
        if (item.file&& item.file.name) {
          if (item.file.name === file.file.name) {
            data.productNoImg.splice(index, 1);
            let id = data.imgData.splice(index, 1);
            orderService.delete(id).then((res: any) => {
              Toast("删除成功");
            });
          }
        } else {
          if (item.fileName === file.fileName) {
            data.productNoImg.splice(index, 1);
            let id = data.imgData.splice(index, 1);
            orderService.delete(id).then((res: any) => {
              Toast("删除成功");
            });
          }
        }
      });
    };
    return {
      dataSources,
      payNum,
      imageArr,
      // CheckStatePipe,
      deteleImg,
      ...toRefs(data),
      payType,
      afterRead,
      onPay,
      res
    };
  },
});
</script>
<style lang="scss">
@import "./pay-order.scss";
</style>
