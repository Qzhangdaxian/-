<template>
  <div class="refund">
    <van-search
      v-model="value"
      shape="round"
      placeholder="客户姓名/身份证/产品管理编号"
      @search="onSearch(value)"
      @clear="onClear"
    />
    <form action="/">
      <ListArr ref="child" :data="data" :list="list" :typeWhat="typeWhat"  @click="onLoad"></ListArr>
      <div class="add_btn">
        <van-button color="#919A74" @click="addRefund">
          <van-icon name="plus" />
        </van-button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { Icon } from "vant";
import { Toast, Search, Button } from "vant";
import router from "@/router";
import ListArr from "@/components/lists/list.component.vue";

document.title = "退款管理"
export default defineComponent({
  name: "h-refund",
  components: {
    "van-search": Search,
    "van-button": Button,
    "van-icon": Icon,
    ListArr,
  },
  setup() {
    const value = ref("");
    const datas = reactive({
      data: [
        {
          name: "已完成",
          value: 1,
        },
        {
          name: "退款已提交",
          value: 2,
        },
      ],
      list: [{
        state: 1,
        storeName: "和合苑理发店",
        userName: "张飒",
        productIdent: '123546'
      }],
      typeWhat:"退款",

    });
    const child = ref()
    const onSearch = (val: string) => Toast(val);
    const onClear = (val: string) => Toast("搜索清除");
    const onLoad = ref()
    const onLoading = (num: number) => {
      console.log(child.value)
    }
    function addRefund() {
      console.log((child.value.loading))
      // router.push({
      //   path: "/addOrder",
      // });
    }
    return {
      value,
      ...toRefs(datas),
      onSearch,
      onClear,
      addRefund,
      onLoading,
      onLoad,
      child
    }
  }
})
</script>
<style lang="scss">
@import "../order/order.scss";
@import "./refund.scss";
</style>
