<template>
  <div class="refund">
    <form action="/">
      <van-search
        v-model="value"
        shape="round"
        placeholder="客户姓名/身份证/产品管理编号"
        @search="onSearch(value)"
        @clear="onClear"
      />
    </form>
    <ListArr
      ref="child"
      :data="data"
      :list="list"
      :btnType="'refund'"
      :finished="finished"
      @click="onLoad"
    ></ListArr>
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
    // "van-button": Button,
    // "van-icon": Icon,
    ListArr,
  },
  setup() {
    const value = ref("");
    const datas = reactive({
      // 门店
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
      // 经销商
      // data: [
      //   {
      //     name: "已完成",
      //     value: 1,
      //   },
      //   {
      //     name: "待补录",
      //     value: 2,
      //   },
      //   {
      //     name: "待审核",
      //     value: 3,
      //   },
      //   {
      //     name: "已退款",
      //     value: 4,
      //   },
      // ],
      list: [{
        state: 1,
        storeName: "和合苑理发店",
        userName: "张飒",
        productIdent: '123546'
      }],
      finished: false

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
@import "./refund.scss";
</style>
