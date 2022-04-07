<template>
  <div class="record">
    <!--
  -->
    <h-detail
      :isDetail="false"
      :dataSources="dataSources"
      :alopeciaImgArray="alopeciaImgArray"
      :productNoImgArray="productNoImgArray"
      :refundHairImgArray="refundHairImgArray"
      :refundImgArray="refundImgArray"
      :types="type"
    ></h-detail>
    <div class="record_form" v-if="Number(type) === 4">
      <h6 class="record_code required">产品管理编号</h6>
      <van-cell-group>
        <van-field v-model="productNo" placeholder="请输入" />
      </van-cell-group>
      <div class="imgs">
        <van-image-preview :isdefault="false" :images="imageArr"></van-image-preview>
      </div>
      <p class="examples ARequired">请按照上述示例图标准拍照上传</p>
      <van-uploader v-model="productNoImg" :after-read="afterRead" :before-delete="deteleImg" :upload-icon="'back-top'" :max-count="1">
        <van-icon :name="require('../../assets/addOrder/upload.png')" class="van-uploader-upload" />
        <p>点击上传</p>
      </van-uploader>
    </div>
    <div class="record_form" v-if="Number(type) === 3">
      <h6 class="record_code model_state required">上传销毁照片</h6>
      <div class="image-preview">
        <van-image-preview :isdefault="false" :images="images"></van-image-preview>
      </div>
      <p class="ARequired examples">请按照上述示例图标准拍照上传</p>
      <van-uploader v-model="alopeciaImg" :after-read="afterRead" :before-delete="deteleImg" :upload-icon="'back-top'" :max-count="1">
        <van-icon :name="require('../../assets/addOrder/upload.png')" class="van-uploader-upload" />
        <p>点击上传</p>
      </van-uploader>
    </div>
    <div class="btn_submit">
      <van-button round color="#919A74" size="large" type="primary" @click="record" :disabled="isDis">提交补录</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { Uploader, CellGroup, Field, Button, Icon, Toast } from "vant";
import imgagePre from "@/components/imagePreview/imagePreview.vue";
import hDetail from "@/components/header_detail/detail.component.vue";
import { orderService } from "../service";
import { useRoute } from "vue-router";
import router from "@/router";

document.title = "补录";
export default defineComponent({
  name: "h-record",
  components: {
    "van-cell-group": CellGroup,
    "van-field": Field,
    "van-image-preview": imgagePre,
    "van-uploader": Uploader,
    "van-button": Button,
    "van-icon": Icon,
    "h-detail": hDetail,
  },
  setup() {
    const route = useRoute();
    const show = ref(false);
    const index = ref(0);
    const arrowText = ref("展开");
    const productNo = ref("");
    const images = [require("../../assets/addOrder/destroy_one.png"), require("../../assets/addOrder/destroy_two.png"), require("../../assets/addOrder/destroy_three.png")];
    const imageArr = [require("../../assets/addOrder/order_code.png")];
    const dataSources = ref();
    let alopeciaImgArray = ref([] as any);
    let productNoImgArray = ref([] as any);
    let refundHairImgArray = ref([] as any);
    let refundImgArray = ref([] as any);
    const data = reactive({
      imgData: [] as any,
      productNoImg: [] as Array<any>,
      alopeciaImg: [] as Array<any>,
      type: route.query.type,
      isDis: false
    });
    function getDetail() {
      orderService.orderDetail({ id: route.query.id }).then((res) => {
        if (res.data.success) {
          if (res.data.data && res.data.data.alopeciaImgArray) {
            res.data.data.alopeciaImgArray.forEach((item: any) => {
              if (item && item.url) {
                alopeciaImgArray.value.push(item.url);
              }
            });
          }
          if (res.data.data && res.data.data.productNoImgArray) {
            res.data.data.productNoImgArray.forEach((item: any) => {
              if (item && item.url) {
                productNoImgArray.value.push(item.url);
              }
            });
          }
          if (res.data.data && res.data.data.refundHairImgArray) {
            res.data.data.refundHairImgArray.forEach((item: any) => {
              if (item && item.url) {
                refundHairImgArray.value.push(item.url);
              }
            });
          }
          if (res.data.data && res.data.data.refundImgArray) {
            res.data.data.refundImgArray.forEach((item: any) => {
              if (item && item.url) {
                refundImgArray.value.push(item.url);
              }
            });
          }
          if(res.data.data.identity){
            res.data.data.identity = res.data.data.identity.slice(0, 12) + "****"
          }
          dataSources.value = res.data.data;
        }
      });
    }
    getDetail();
    function record() {
      data.isDis =true;
      if(productNo.value && data.imgData.length> 0){
        const param = {
          id: Number(route.query.id),
          productNo: productNo.value,
          productNoImg: data.imgData.join(","),
        };
        orderService.orderRecord(param).then((res: any) => {
          if (res.data.success) {
            history.back();
            data.isDis =false;
          }
        });
      }else{
        Toast('请检查产品编号和图片是否填写上传');
        data.isDis =false;
      }
    }
    const afterRead = (file: any) => {
      let fileContent = file.file as File;
      file.status = 'uploading';
      file.message = '上传中...';
      orderService
        .upload(fileContent)
        .then((res: any) => res.json())
        .then((res: any) => {
          if (res.success) {
            file.status = "done";
            data.imgData.push(res.data.id);
          } else {
            file.status = "failed";
            file.message = "上传失败...";
          }
          // data.imgData.push(res.data.id);
          // console.log(data.imgData, res.data);
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
    return {
      show,
      index,
      images,
      imageArr,
      arrowText,
      productNo,
      dataSources,
      deteleImg,
      ...toRefs(data),
      afterRead,
      record,
      alopeciaImgArray,
      productNoImgArray,
      refundHairImgArray,
      refundImgArray,
    };
  },
});
</script>
<style lang="scss">
@import "./record.scss";
</style>
