<template>
  <div class="add_refund">
    <!-- 此处添加客户信息 -->
    <h-detail :dataSources="dataSources" :images="images"></h-detail>

    <!-- <div> -->
    <!-- 门店上传退款信息 -->
    <van-form v-if="true">
      <div class="add_refund-form">
        <h6 class="record_code required">退款原因</h6>
        <van-cell-group>
          <van-field
            v-model="backWhy"
            is-link
            readonly
            name="picker"
            :right-icon="'arrow-down'"
            placeholder="请选择"
            @click="showPicker = true"
          />
          <van-popup v-model:show="showPicker" position="bottom">
            <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
          </van-popup>
        </van-cell-group>

        <van-cell-group style="height: auto !important;" v-if="showback">
          <van-field v-model="backText" rows="2" autosize type="textarea" placeholder="请输入退款原因" />
        </van-cell-group>

        <h6 class="record_code required">身份证号</h6>
        <van-cell-group>
          <van-field
            v-model="identityCustomBack"
            :length="18"
            :rules="[{ pattern: pattern, message: '身份证号格式不对' }]"
            placeholder="请输入"
          />
        </van-cell-group>
        <h6 class="record_code model_state required">上传客户照片</h6>
        <div class="image-preview">
          <van-image-preview :isdefault="true" :images="images"></van-image-preview>
        </div>
        <p class="ARequired picTip">请按照上述示例图标准拍照上传</p>
        <van-uploader v-model="backHeadImg" :after-read="afterRead" :max-count="1" />
        <div class="submit_next">
          <van-button color="#919A74" size="large" @click="onSubmitStore">提交申请</van-button>
        </div>
      </div>
    </van-form>
    <!-- 经销商上传 退款补录-->
    <div class="add_refund-form" v-if="true">
      <h6 class="record_code model_state required">上传销毁照片</h6>
      <div class="image-preview">
        <van-image-preview :isdefault="true" :images="images"></van-image-preview>
      </div>
      <p class="ARequired picTip">请按照上述示例图标准拍照上传</p>
      <van-uploader v-model="backDestoryImg" :after-read="afterRead" :max-count="1" />
      <div class="submit_next">
        <van-button color="#919A74" size="large" @click="onSubmitDealer">提交申请</van-button>
      </div>
    </div>
    <!-- </div> -->

    <div class="popup_tip">
      <van-popup class="van_popup" :close-on-click-overlay="false" v-model:show="show">
        <div class="tip_content">
          <van-icon name="info-o" />
          <p>因身份证号码与提交订单信息不符，无法进行退款，请联系客服。</p>
          <van-divider />
          <span @click="onClickStep(1, true)">确认</span>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { CellGroup, Field, Button, Form, Picker, Uploader, Popup, Icon, Divider } from "vant";
import hDetail from '@/components/header_detail/detail.component.vue'
import imgagePre from "@/components/imagePreview/imagePreview.vue";
document.title = "退款";
export default defineComponent({
  name: "h-add_refund",
  components: {
    "van-cell-group": CellGroup,
    "van-field": Field,
    "van-button": Button,
    "van-form": Form,
    "van-picker": Picker,
    "van-image-preview": imgagePre,
    "van-uploader": Uploader,
    "van-popup": Popup,
    "van-icon": Icon,
    "van-divider": Divider,
    "h-detail": hDetail,
  },
  setup() {
    let data = reactive({
      show: false,
      backWhy: '',
      backHeadImg: [],
      backDestoryImg: [],
      identityCustomBack: '',
      showPicker: false,
      columns: ["无新生毛发生长", "有毛发生长但未达到预期", "其他因素不满意（选择此项请填写具体原因）"],
      images: ["https://img.yzcdn.cn/vant/apple-1.jpg", "https://img.yzcdn.cn/vant/apple-2.jpg", "https://img.yzcdn.cn/vant/apple-1.jpg"],
      result: "",
      pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
      backText: '',
      showback:false,
    });
    const dataSources = [
      {
        storeName: '和合苑理发店',
        userName: '张珊',
        identity: '51651653',
        age: '45',
        orderTime: '2022-01-20',
        code: '1165651',
        alopecia: '2022-01-22',
        alopeciaState: 'M型脱发',
        deliveryDate: '2022-01-23',
        courierCompany: '京东',
        courierNumber: '459325454',
        id: 0,
        state: 1,
      },
    ]
    const onConfirm = (value: string, index: number) => {
      console.log(value, index);
      data.showPicker = false;
      if (index == 2) {
        data.showback = true;
      } else {
        data.showback = false;
        data.backWhy = value;
      }

    };
    const onSubmitStore = () => {
      console.log(data);
      data.show = true;
    };
    const onSubmitDealer = () => {
      console.log(data);
    };
    const afterRead = (file: any) => {
      console.log(file);
    }
    const onClickStep = (active: any, isNext: boolean) => {
      console.log(active)
      data.show = false;
    }
    return {
      ...toRefs(data),
      onConfirm,
      onSubmitStore,
      onSubmitDealer,
      afterRead,
      onClickStep,
      dataSources,
    }
  }
})
</script>
<style lang="scss">
@import "./add_refund.scss";
</style>
