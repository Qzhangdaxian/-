<template>
  <div class="record">
    <div class="record_massage" v-bind:class="{ listIndex: show, listIndexs: !show }">
      <van-nav-bar :right-text="CheckStatePipe(3)">
        <template #left>
          <van-icon name="shop-o" />
          <span class="storeName">和合苑理发店</span>
          <van-icon name="arrow" />
        </template>
      </van-nav-bar>
      <van-divider :style="{ color: '#CBCBCB' }" />
      <van-nav-bar>
        <template #left>
          <span class="nav_text">用户姓名</span>
        </template>
        <template #right>
          <span class="nat_text_data">张飒</span>
        </template>
      </van-nav-bar>
      <van-nav-bar>
        <template #left>
          <span class="nav_text">身份证号</span>
        </template>
        <template #right>
          <span class="nat_text_data">1544698498416341</span>
        </template>
      </van-nav-bar>
      <van-nav-bar>
        <template #left>
          <span class="nav_text">下单日期</span>
        </template>
        <template #right>
          <span class="nat_text_data">2022-01-20</span>
        </template>
      </van-nav-bar>
      <van-nav-bar>
        <template #left>
          <span class="nav_text">产品管理编号</span>
        </template>
        <template #right>
          <span class="nat_text_data">无</span>
        </template>
      </van-nav-bar>
      <div class="van-hairline--top"></div>
      <van-nav-bar>
        <template #left>
          <span class="nav_text">脱发史</span>
        </template>
        <template #right>
          <span class="nat_text_data">2022-01-20</span>
        </template>
      </van-nav-bar>
      <van-nav-bar>
        <template #left>
          <span class="nav_text">脱发状态</span>
        </template>
        <template #right>
          <span class="nat_text_data">M型脱发</span>
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
          <span class="nat_text_data">无</span>
        </template>
      </van-nav-bar>
      <van-nav-bar>
        <template #left>
          <span class="nav_text">快递公司</span>
        </template>
        <template #right>
          <span class="nat_text_data">无</span>
        </template>
      </van-nav-bar>
      <van-nav-bar>
        <template #left>
          <span class="nav_text">快递单号</span>
        </template>
        <template #right>
          <span class="nat_text_data">无</span>
        </template>
      </van-nav-bar>
      <div class="arrow_togger" @click="arrowTogger">
        {{ arrowText }}
        <van-icon name="arrow-down" v-if="!show" />
        <van-icon name="arrow-up" v-if="show" />
      </div>
    </div>
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
import { NavBar, Icon, Divider, Uploader, CellGroup, Field, Button } from "vant";
import imgagePre from "../../components/imagePreview/imagePreview.vue";
document.title = "补录";
export default defineComponent({
  name: "h-record",
  components: {
    "van-nav-bar": NavBar,
    "van-icon": Icon,
    "van-divider": Divider,
    "van-cell-group": CellGroup,
    "van-field": Field,
    "van-image-preview": imgagePre,
    "van-uploader": Uploader,
    "van-button": Button
  },
  setup() {
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
    function CheckStatePipe(value: any): any {
      const returnData = data.filter((item: Data) => item.value === Number(value));
      return returnData[0].name;
    }
    const show = ref(false);
    const index = ref(0);
    const arrowText = ref("展开");
    const record_code = ref("");
    const images = ["https://img.yzcdn.cn/vant/apple-1.jpg", "https://img.yzcdn.cn/vant/apple-2.jpg", "https://img.yzcdn.cn/vant/apple-1.jpg"];
    const imageArr = ["https://img.yzcdn.cn/vant/apple-1.jpg"];
    function arrowTogger() {
      show.value = !show.value;
      if (!show.value) {
        arrowText.value = "展开";
      } else {
        arrowText.value = "收起";
      }
    }
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
      CheckStatePipe,
      arrowTogger,
      afterRead
    };
  },
});
interface Data {
  name: string;
  value: number;
}
</script>
<style lang="scss">
@import "./record.scss";
</style>
