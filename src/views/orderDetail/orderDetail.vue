<template>
  <div class="order_detail">
    <div>
       <h-detail :isDetail="true" :dataSources="dataSources" :types="type" ></h-detail>
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
      const type = ref(route.query.type);
      let res: any = ref(route.query);
      const orderDetail = ()=>{
        orderService.orderDetail({id:res.value.id}).then((res)=>{
          if(res.data.success){
            dataSources.value = res.data.data;
          }
          console.log(dataSources.value)
        })
      }
      orderDetail()
    return {
      dataSources,
      type
    };
  },
});
</script>
<style lang="scss">
@import "./orderDetail.scss";
</style>
