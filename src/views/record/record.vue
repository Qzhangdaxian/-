<template>
  <div class="record">
    <h-detail :dataSources="dataSources" :images="images"></h-detail>
    <div class="record_form">
      <h6 class="record_code required">产品管理编号</h6>
      <van-cell-group>
        <van-field v-model="record_code" placeholder="请输入" />
      </van-cell-group>
      <div class="imgs">
        <van-image-preview :isdefault="false" :images="imageArr"></van-image-preview>
      </div>
      <p class="examples ARequired">请按照上述示例图标准拍照上传</p>
      <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1"/>
    </div>
    <div class="btn_submit">
      <van-button round color="#919A74" size="large" type="primary">提交补录</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import {Uploader, CellGroup, Field, Button } from "vant";
import imgagePre from "@/components/imagePreview/imagePreview.vue";
import hDetail from '@/components/header_detail/detail.component.vue'
document.title = "补录";
export default defineComponent({
  name: "h-record",
  components: {
    "van-cell-group": CellGroup,
    "van-field": Field,
    "van-image-preview": imgagePre,
    "van-uploader": Uploader,
    "van-button": Button,
    "h-detail": hDetail
  },
  setup() {
    const show = ref(false);
    const index = ref(0);
    const arrowText = ref("展开");
    const record_code = ref("");
    const images = ["https://img.yzcdn.cn/vant/apple-1.jpg", "https://img.yzcdn.cn/vant/apple-2.jpg", "https://img.yzcdn.cn/vant/apple-1.jpg"];
    const imageArr = ["https://img.yzcdn.cn/vant/apple-1.jpg"];
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
        id:0,
        state: 1,
      },
      // {
      //   storeName: '和合苑理发店',
      //   userName: '张珊',
      //   identity: '51651653',
      //   age: '45',
      //   orderTime: '2022-01-20',
      //   code: '1165651',
      //   alopecia: '2022-01-22',
      //   alopeciaState: 'M型脱发',
      //   deliveryDate: '2022-01-23',
      //   courierCompany: '京东',
      //   courierNumber: '459325454',
      //   id:1,
      //   state: 2,
      // }
    ]
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
    const afterRead = (file: any) => {
      // file.status = 'success';
      // file.message = '上传中...';

      // setTimeout(() => {
      //   file.status = 'success';
      //   file.message = '上传失败';
      // }, 1000);
    };

    return {
      show,
      index,
      images,
      imageArr,
      arrowText,
      record_code,
      fileList,
      dataSources,
      afterRead
    };
  },
});

</script>
<style lang="scss">
@import "./record.scss";
</style>
