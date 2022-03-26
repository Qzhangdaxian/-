<template>
  <div class="record_massage" v-bind:class="{ listIndex: show, listIndexs: !show }">
    <div v-for="item in dataSources" :key="item.id">
      <van-nav-bar :right-text="CheckStatePipe(item.state)">
      <template #left>
        <van-icon name="shop-o" />
        <span class="storeName">{{item.storeName}}</span>
        <van-icon name="arrow" />
      </template>
    </van-nav-bar>
    <van-divider :style="{ color: '#CBCBCB' }" />
    <van-nav-bar>
      <template #left>
        <span class="nav_text">用户姓名</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{item.userName}}</span>
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">身份证号</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{item.identity}}</span>
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">年龄</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{item.age}}岁</span>
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">下单日期</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{item.orderTime}}</span>
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">产品管理编号</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{item.code}}</span>
      </template>
    </van-nav-bar>
    <div class="van-hairline--top"></div>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">脱发史</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{item.alopecia}}</span>
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">脱发状态</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{item.alopeciaState}}</span>
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
      <van-image-preview :isdefault="true" :images="images"></van-image-preview>
    </div>
    <div class="van-hairline--top"></div>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">发货日期</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{item.deliveryDate}}</span>
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">快递公司</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{item.courierCompany}}</span>
      </template>
    </van-nav-bar>
    <van-nav-bar>
      <template #left>
        <span class="nav_text">快递单号</span>
      </template>
      <template #right>
        <span class="nat_text_data">{{item.courierNumber}}</span>
      </template>
    </van-nav-bar>
    </div>
    <div class="arrow_togger" @click="arrowTogger">
      {{ arrowText }}
      <van-icon name="arrow-down" v-if="!show" />
      <van-icon name="arrow-up" v-if="show" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { NavBar, Icon, Divider } from "vant";
import imgagePre from "@/components/imagePreview/imagePreview.vue";

export default defineComponent({
  name: "h-header_detail",
  components: {
    "van-nav-bar": NavBar,
    "van-icon": Icon,
    "van-divider": Divider,
    "van-image-preview": imgagePre,
  },
  props:{
    images:[] as any,
    dataSources: [] as any
  },
  setup(props) {
    console.log(props.dataSources)
    const data = [
      {
        name: "全部",
        value: 1,
      },
      {
        name: "已提交",
        value: 2,
      },
      {
        name: "待补录",
        value: 3,
      },
      {
        name: "待发货",
        value: 4,
      },
      {
        name: "已发货",
        value: 5,
      },
      {
        name: "已完成",
        value: 6,
      },
      {
        name: "待付款",
        value: 7,
      },
      {
        name: "待审核",
        value: 9,
      },
    ];
    const show = ref(false);
    const arrowText = ref("展开");
    function arrowTogger() {
      show.value = !show.value;
      if (!show.value) {
        arrowText.value = "展开";
      } else {
        arrowText.value = "收起";
      }
    }
    function CheckStatePipe(value: any): any {
      const returnData = data.filter((item: Data) => item.value === Number(value));
      return returnData[0].name;
    }
    return {
      show,
      arrowText,
      arrowTogger,
      CheckStatePipe
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
