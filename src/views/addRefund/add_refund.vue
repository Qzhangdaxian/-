<template>
  <div class="add_refund">
    <!-- 此处添加客户信息 -->
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
        <h6 class="record_code required">身份证号</h6>
        <van-cell-group>
          <van-field
            v-model="identityCustomBack"
            :length="11"
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
import { CellGroup, Field, Button, Form, Picker, Uploader, Popup, Icon, Divider} from "vant";
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
  },
  setup() {
    let data = reactive({
      show:false,
      backWhy: '',
      backHeadImg: [],
      backDestoryImg:[],
      identityCustomBack: '',
      showPicker: false,
      columns: ["reason-1", "reason-2", "reason-3", "reason-4", "reason-5"],
      images: ["https://img.yzcdn.cn/vant/apple-1.jpg", "https://img.yzcdn.cn/vant/apple-2.jpg", "https://img.yzcdn.cn/vant/apple-1.jpg"],
      result: "",
      pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
    });
    const onConfirm = (value: string) => {
      console.log(value);
      data.backWhy = value;
      data.showPicker = false;
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
    }
  }
})
</script>
<style lang="scss">
@import "./add_refund.scss";
</style>
