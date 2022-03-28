<template>
  <div class="order_detail">
    <div>
      <h-detail :isDetail="true" :dataSources="dataSources" :images="images"></h-detail>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import hDeatil from "@/components/header_detail/detail.component.vue";
document.title = "订单详情";
export default defineComponent({
  name: "h-order_detail",
  components: {
    "h-detail": hDeatil,
  },
  setup() {
    const images = ["https://img.yzcdn.cn/vant/apple-1.jpg", "https://img.yzcdn.cn/vant/apple-2.jpg", "https://img.yzcdn.cn/vant/apple-1.jpg"];
    const dataSources = [
      {
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
    ];
    return {
      images,
      dataSources,
    };
  },
});
</script>
<style lang="scss">
@import "./orderDetail.scss";
</style>
