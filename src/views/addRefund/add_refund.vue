<template>
  <div class="add_refund">
    <!-- 此处添加客户信息 -->
    <h-detail :isDetail="false" :dataSources="dataSources" :images="images"></h-detail>
    <!-- 门店上传退款信息 -->
    <van-form v-if="type == 4">
      <div class="add_refund-form">
        <h6 class="record_code required">退款原因</h6>
        <van-cell-group>
          <van-field v-model="refundReason" is-link readonly name="picker" :right-icon="'arrow-down'" placeholder="请选择" @click="showPicker = true" />
          <van-popup v-model:show="showPicker" position="bottom">
            <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
          </van-popup>
        </van-cell-group>

        <van-cell-group style="height: auto !important" v-if="showback">
          <van-field v-model="backText" rows="2" autosize type="textarea" placeholder="请输入退款原因" />
        </van-cell-group>

        <h6 class="record_code required">身份证号</h6>
        <van-cell-group>
          <van-field v-model="refundIdentity" :length="18" :rules="[{ pattern: pattern, message: '身份证号格式不对' }]" placeholder="请输入" />
        </van-cell-group>
        <h6 class="record_code required">客户手机号</h6>
        <van-cell-group>
          <van-field v-model="refundPhone" :length="11" :rules="[{ pattern: patternPhone, message: '手机号格式错误' }]" placeholder="请输入" />
        </van-cell-group>
        <h6 class="record_code model_state required">上传客户照片</h6>
        <div class="image-preview">
          <van-image-preview :isdefault="true" :images="images"></van-image-preview>
        </div>
        <p class="ARequired picTip">请按照上述示例图标准拍照上传</p>
        <van-uploader v-model="productNoImg" :after-read="afterRead" :before-delete="deteleImg" :upload-icon="'back-top'" :max-count="3">
          <van-icon name="back-top" class="van-uploader-upload" />
          <p>点击上传</p>
        </van-uploader>
        <div class="submit_next">
          <van-button color="#919A74" size="large" @click="onSubmitStore">提交申请</van-button>
        </div>
      </div>
    </van-form>
    <!-- 经销商上传 退款补录-->
    <div class="add_refund-form" v-if="type == 3">
      <h6 class="record_code model_state required">上传销毁照片</h6>
      <div class="image-preview">
        <van-image-preview :isdefault="true" :images="images"></van-image-preview>
      </div>
      <p class="ARequired picTip">请按照上述示例图标准拍照上传</p>
      <van-uploader v-model="refundImg" :after-read="afterReads" :before-delete="deteleImgs" :upload-icon="'back-top'" :max-count="3">
        <van-icon name="back-top" class="van-uploader-upload" />
        <p>点击上传</p>
      </van-uploader>
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
import { CellGroup, Field, Button, Form, Picker, Uploader, Popup, Icon, Divider, Toast } from "vant";
import hDetail from "@/components/header_detail/detail.component.vue";
import imgagePre from "@/components/imagePreview/imagePreview.vue";
import { orderService } from "../service";
import { useRoute } from "vue-router";

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
    const route = useRoute();
    let res: any = ref(route.query);
    let data = reactive({
      show: false,
      refundReason: "",
      refundHairImg: [],
      refundImg: [],
      refundIdentity: "",
      showPicker: false,
      columns: ["无新生毛发生长", "有毛发生长但未达到预期", "其他因素不满意（选择此项请填写具体原因）"],
      images: ["https://img.yzcdn.cn/vant/apple-1.jpg", "https://img.yzcdn.cn/vant/apple-2.jpg", "https://img.yzcdn.cn/vant/apple-1.jpg"],
      result: "",
      pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
      patternPhone: /^1[3456789]\d{9}$/,
      backText: "",
      showback: false,
      refundPhone: "",
      type: res.value.type,
      imgData: [] as any,
      productNoImg: [] as Array<any>,
      imgDatas: [] as any
    });
    let dataSources = ref();

    const orderDetail = () => {
      orderService.orderDetail({ id: res.value.id }).then((res) => {
        if (res.data.success) {
          dataSources.value = res.data.data;
        }
        console.log(dataSources.value);
      });
    };
    orderDetail();
    const onConfirm = (value: string, index: number) => {
      console.log(value, index);
      data.showPicker = false;
      if (index == 2) {
        data.showback = true;
      } else {
        data.showback = false;
        data.refundReason = value;
      }
    };
    const onSubmitStore = () => {
      const param = {
        id: res.value.id,
        refundReason: data.refundReason || data.backText,
        refundHairImg: data.imgData.join(","),
        refundPhone: data.refundPhone,
        refundIdentity: data.refundIdentity,
      };
      if(data.refundReason.length == 0 || data.imgData.length == 0 || data.refundPhone.length == 0 || data.refundIdentity.length == 0){
        Toast('带*号的是必填项');
        return;
      }else if(!data.patternPhone.test(data.refundPhone)){
        Toast("请填写正确的手机号");
          return;
      }else if(data.imgData.length != 3){
        Toast('请添加三张客户图片')
        return;
      }
      console.log(dataSources.value.data.identity);
      console.log(data.refundIdentity.substring(0, 12))
      if (dataSources.value.data.identity.substring(0,12) != data.refundIdentity.substring(0, 12)) {
        data.show = true;
        return;
      }
      orderService.orderreRund(param).then((res: any) => {
        if (res.data.success) {
          Toast("提交成功");
          history.back();
        }
      });
    };
    const onSubmitDealer = () => {
      const param = {
        id: res.value.id,
        refundImg: data.imgDatas.join(','),
      };
      orderService.orderRefundRecord(param).then((res: any)=>{
        if(res.data.success){
          Toast('提交成功');
          history.back();
        }
      })
      console.log("param==>", param);
    };
    const afterReads = (file: any) => {
      let fileContent = file.file as File;
      orderService
        .upload(fileContent)
        .then((res: any) => res.json())
        .then((res: any) => {
          data.imgDatas.push(res.data.id);
        });
    };
    const deteleImgs: any = (file: any) => {
      data.refundImg.forEach((item: any, index: number) => {
        if (item.file.name === file.file.name) {
          data.refundImg.splice(index, 1);
          let id = data.imgDatas.splice(index, 1);
          orderService.delete(id).then((res: any) => {
            Toast("删除成功");
          });
        }
      });
    };
    const afterRead = (file: any) => {
      let fileContent = file.file as File;
      orderService
        .upload(fileContent)
        .then((res: any) => res.json())
        .then((res: any) => {
          data.imgData.push(res.data.id);
          console.log(data.imgData, res.data);
        });
    };
    const deteleImg: any = (file: any) => {
      data.productNoImg.forEach((item: any, index: number) => {
        if (item.file.name === file.file.name) {
          data.productNoImg.splice(index, 1);
          let id = data.imgData.splice(index, 1);
          orderService.delete(id).then((res: any) => {
            Toast("删除成功");
          });
        }
      });
    };
    const onClickStep = (active: any, isNext: boolean) => {
      console.log(active);
      data.show = false;
    };
    return {
      ...toRefs(data),
      onConfirm,
      onSubmitStore,
      onSubmitDealer,
      afterRead,
      onClickStep,
      dataSources,
      deteleImg,
      afterReads,
      deteleImgs
    };
  },
});
</script>
<style lang="scss">
@import "./add_refund.scss";
</style>
