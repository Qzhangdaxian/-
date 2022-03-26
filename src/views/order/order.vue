<template>
  <div class="order">
    <form action="/">
      <van-search v-model="value" shape="round" placeholder="客户姓名/身份证/产品管理编号" @search="onSearch(value)" @clear="onClear" />
    </form>
    <ListArr ref="child"
    :data="data"
    :list="list"
    :btnType="'record'"
    :finished='finished'
    :onLoad="onLoadData">
    </ListArr>
    <div class="add_btn">
      <van-button color="#919A74" @click="addOrder">
        <van-icon name="plus" />
      </van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { Icon } from "vant";
// import { useRouter, useRouter } from "vue-router";
import { Toast, Search, Button } from "vant";
import router from "@/router";
import ListArr from "@/components/lists/list.component.vue";
// import {CheckStatePipe} from '../pipe/state.pipe'
document.title = "订单管理";

export default defineComponent({
  name: "h-order",
  components: {
    "van-search": Search,
    "van-button": Button,
    "van-icon": Icon,
    // eslint-disable-next-line vue/no-unused-components
    ListArr,
    // 'van-sticky': Sticky
    // 'van-badge': Badge
  },

  setup() {
    const value = ref("");
    const datas = reactive({
      data: [
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
      ],
      list: [{
        state: 1,
        storeName: "和合苑理发店",
        userName: "张飒",
        productIdent: '123546'
      }],
      // loading: false,
      finished: false
    });

    const child = ref()
    const refreshing = ref(false);
    const onSearch = (val: string) => Toast(val);
    const onClear = (val: string) => Toast("搜索清除");
    const onLoad = ref()
    const onLoadData = (num:number) => {
        if (refreshing.value) {
          datas.list = [];
          refreshing.value = false;
        }
        for (let i = 0; i < 10; i++) {
          datas.list.push(
            {
              state: 1,
              storeName: "和合苑理发店",
              userName: "张飒" +i,
              productIdent: '123546'
            }
          );
        }
        // datas.loading= false;

        if (datas.list.length >= 40) {
          datas.finished = true;
        }
        console.log(1)
    };
    function addOrder() {
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
      addOrder,
      onLoadData,
      onLoad,
      child
    };
  },
});
</script>
<style lang="scss">
@import "./order.scss";
</style>
