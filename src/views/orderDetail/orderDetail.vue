<template>
  <div class="order_detail">
    <div>
      <h-detail :isDetail="true" :dataSources="dataSources"
      :alopeciaImgArray="alopeciaImgArray"
      :productNoImgArray="productNoImgArray"
      :refundHairImgArray="refundHairImgArray"
      :refundImgArray="refundImgArray"
      :types="type"></h-detail>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import hDeatil from "../../components/header_detail/detail.component.vue";
import { useRoute, useRouter } from "vue-router";
import { orderService } from "../service";
document.title = "订单详情";
export default defineComponent({
  name: "h-order_detail",
  components: {
    "h-detail": hDeatil,
  },
  setup() {
    let dataSources = ref();
    const route = useRoute();
    const router = useRouter();
    let alopeciaImgArray =ref([] as any)
    let productNoImgArray =ref([] as any)
    let refundHairImgArray =ref([] as any)
    let refundImgArray =ref([] as any)

    const type = ref(route.query.type);
    let res: any = ref(route.query);
    const orderDetail = () => {
      orderService.orderDetail({ id: res.value.id }).then((res) => {
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
          res.data.data.identity = res.data.data.identity.slice(0, 12) +'****';
          dataSources.value = res.data.data;
        }
        console.log(dataSources.value);
      });
    };
    orderDetail();
    return {
      dataSources,
      type,
      alopeciaImgArray,
      productNoImgArray,
      refundHairImgArray,
      refundImgArray
    };
  },
});
</script>
<style lang="scss">
@import "./orderDetail.scss";
</style>
