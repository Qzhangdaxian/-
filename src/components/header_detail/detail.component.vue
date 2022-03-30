<template>
  <div class="record_massage" v-bind:class="{ listIndex: show && !isDetail, listIndexs: !show && !isDetail }">
    <!--<div v-for="dataSource in dataSource" :key="dataSource.id"></div> -->
    <van-nav-bar :right-text="CheckStatePipe(dataSource.state)">
      <template #left>
        <van-icon name="shop-o" />
        <span class="storeName">{{ dataSource.storeName }}</span>
        <van-icon name="arrow" />
      </template>
    </van-nav-bar>
    <van-divider :style="{ color: '#CBCBCB' }" />
    <van-nav-bar>
      <template #left>
        <span class="nav_text">用户姓名</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{ dataSource.userName }}</span>
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">身份证号</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{ dataSource.identity }}</span>
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">年龄</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{ dataSource.age }}岁</span>
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">下单日期</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{ dateFormat(dataSource.createTime)|| '暂无' }}</span>
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">产品管理编号</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{ dataSource.productNo || "暂无" }}</span>
      </template>
    </van-nav-bar>
    <div class="image_pic">
      <van-image-preview :isdefault="false" :images="productNoImgArray"></van-image-preview>
    </div>
    <div class="van-hairline--top"></div>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">脱发史</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{ alopeciaHistory[dataSource.alopeciaHistory] }}</span>
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">脱发状态</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{ alopeciaState[dataSource.alopeciaState] }}</span>
      </template>
    </van-nav-bar>
    <!--
      <div class="image_preview">
        <div class="img_box" v-for="(item2, index) of images" :key="index">
          <img :src="item2" alt="" @click="getImg(index)" />
        </div>
      </div>
      -->
    <div>
      <van-image-preview :isdefault="true" :images="alopeciaImgArray"></van-image-preview>
    </div>
    <div class="van-hairline--top"></div>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">发货日期</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{ dateFormat(dataSource.expressTime) || "暂无" }}</span>
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">快递公司</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{ dataSource.expressCompany || "暂无" }}</span>
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">快递单号</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{ dataSource.express || "暂无" }}</span>
      </template>
    </van-nav-bar>

    <div class="arrow_togger" @click="arrowTogger" v-if="!isDetail">
      {{ arrowText }}
      <van-icon name="arrow-down" v-if="!show" />
      <van-icon name="arrow-up" v-if="show" />
    </div>
  </div>
  <div class="refund_text" v-if="isDetail">
    <div class="refund_cause">
      <van-nav-bar>
        <template #left>
          <span class="nav_text">退款原因</span>
        </template>
        <template #right>
          <span class="nat_text_data">{{ dataSource.refundReason || "暂无" }}</span>
        </template>
      </van-nav-bar>
      <div class="image_pic" v-if="isDetail">
        <van-image-preview :isdefault="true" :images="refundHairImgArray"></van-image-preview>
      </div>
    </div>
    <div class="destroy">
      <van-nav-bar>
        <template #left>
          <span class="nav_text">销毁图片</span>
        </template>
      </van-nav-bar>
      <div class="image_pic" v-if="isDetail">
        <van-image-preview :isdefault="false" :images="refundImgArray"></van-image-preview>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { NavBar, Icon, Divider } from "vant";
import imgagePre from "@/components/imagePreview/imagePreview.vue";
import router from "@/router";

export default defineComponent({
  name: "h-header_detail",
  components: {
    "van-nav-bar": NavBar,
    "van-icon": Icon,
    "van-divider": Divider,
    "van-image-preview": imgagePre,
  },
  props: {
    dataSources: {} as any,
    isDetail: Boolean,
  },
  setup(props) {
    let dataSource = ref();
    let alopeciaHistory = ["", "1-3年", "3-5年", "5-7年", "7-10年", "10年以上"];
    let alopeciaState = ["", "M型脱发", "口型脱发", "O型脱发", "地中海脱发"];
    const data = [
      {
        name: "全部",
        value: 0,
      },
      {
        name: "已提交",
        value: 1,
      },
      {
        name: "待审核",
        value: 2,
      },
      {
        name: "待发货",
        value: 3,
      },
      {
        name: "已驳回",
        value: 4,
      },
      {
        name: "待补录",
        value: 5,
      },
      {
        name: "已完成",
        value: 6,
      },
      {
        name: "退款待补录",
        value: 7,
      },
      {
        name: "退款待审核",
        value: 8,
      },
      {
        name: "退款完成",
        value: 9,
      },
      {
        name: "退款失败",
        value: 10,
      },
    ];
    const imageArr = ["https://img.yzcdn.cn/vant/apple-1.jpg"];
    const show = ref(false);
    const arrowText = ref("展开");
    let alopeciaImgArray = ref([] as any);
    let productNoImgArray = ref([] as any);
    let refundHairImgArray = ref([] as any);
    let refundImgArray = ref([] as any);
    if (props.dataSources && props.dataSources.data) {
      // eslint-disable-next-line vue/no-setup-props-destructure
      dataSource.value = props.dataSources.data;
    } else {
      // eslint-disable-next-line vue/no-setup-props-destructure
      dataSource.value = props.dataSources;
    }
    if (dataSource.value && dataSource.value?.alopeciaImgArray) {
      dataSource.value.alopeciaImgArray.forEach((item: any) => {
        if (item && item.url) {
          alopeciaImgArray.value.push(item.url);
        }
      });
    }
    if (dataSource.value && dataSource.value?.productNoImgArray) {
      dataSource.value.productNoImgArray.forEach((item: any) => {
        if (item && item.url) {
          productNoImgArray.value.push(item.url);
        }
      });
    }
    if (dataSource.value && dataSource.value?.refundHairImgArray) {
      dataSource.value.refundHairImgArray.forEach((item: any) => {
        if (item && item.url) {
          refundHairImgArray.value.push(item.url);
        }
      });
    }
    if (dataSource.value && dataSource.value?.refundImgArray) {
      dataSource.value.refundImgArray.forEach((item: any) => {
        if (item && item.url) {
          refundImgArray.value.push(item.url);
        }
      });
    }
    function arrowTogger() {
      show.value = !show.value;
      if (!show.value) {
        arrowText.value = "展开";
      } else {
        arrowText.value = "收起";
      }
    }
    function CheckStatePipe(value: any): any {
      const returnData = data.filter((dataSource: Data) => dataSource.value === Number(value));
      return returnData[0].name;
    }
    function dateFormat(time: string) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接 + " " + hours + ":" + minutes + ":" + seconds
      return year + "-" + month + "-" + day ;
    }
    return {
      show,
      arrowText,
      imageArr,
      alopeciaImgArray,
      alopeciaHistory,
      alopeciaState,
      dataSource,
      productNoImgArray,
      refundImgArray,
      refundHairImgArray,
      arrowTogger,
      CheckStatePipe,
      dateFormat
    };
  },
});
interface Data {
  name: string;
  value: number;
}
</script>
<style lang="scss">
@import "./detail.scss";
</style>
