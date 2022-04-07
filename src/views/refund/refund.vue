<template>
  <div class="refund">
    <form action="/">
      <van-search
        v-model="value"
        shape="round"
        placeholder="客户姓名"
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
      :onLoad="onLoadData"
      @page="onLoadData"
      :types="type"
      :fatherMethod="fatherMethod"
    ></ListArr>
  </div>
</template>
<script lang="ts">
      // :fefund="'fefund'"
import { defineComponent, reactive, ref, toRefs } from "vue";
import { Icon } from "vant";
import { Toast, Search, Button } from "vant";
import ListArr from "@/components/lists/list.component.vue";
import {orderService} from '../service';
import { useRoute } from "vue-router";
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
    const route = useRoute();
    const type = route.query.type
    const value = ref("");
    const datas = reactive({
      // 门店
      data: [
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
      list: [],
      finished: false,
      length:0,
      state: 0
    });
    const child = ref()
    const refreshing = ref(false);
    const onSearch = (val: string) => {
      datas.list = [];
      onLoadData([1, datas.state])
    };
    const onClear = (val: string) => {
      console.log(1)
    };
    const onLoad = ref()
    const onLoading = (num: number) => {
      console.log(child.value)
    }
    const onLoadData = (param:any) => {
      datas.list= []
      datas.state = param[1];
      if (refreshing.value) {
        datas.list = [];
        refreshing.value = false;
      }
      orderService.orderList({
        page: param[0],
        limit: 10,
        state: datas.data[param[1]].value,
        // state: param[1]
        userName: value.value,
        category: 2
        }).then((res: any)=>{
        // console.log(res);
        if(res.data.data){
          datas.length = res.data.data.length;
        }else{
          datas.finished = true;
        }
        if(param[0] == 1 && param[2]){
          datas.list = [];
          datas.list.concat(res.data.data)
        }
        if(datas.length){
          datas.list = datas.list.concat(res.data.data);
          if(datas.length < param[0]){
            datas.finished = true;
          }
          else{
            // console.log(datas.page++)
            // debugger
            // datas.page ++
          }
        }else{
          datas.finished = true;
          // console.log(length)
          // if( num === 1){
          //   console.log('da111')
          // }
        }

        // datas.finished = true;
      })
      // for (let i = 0; i < 10; i++) {
      //   datas.list.push({
      //     state: 1,
      //     storeName: "和合苑理发店",
      //     userName: "张飒" + i,
      //     productIdent: "123546",
      //   });
      // }
      // datas.loading= false;

      // if (datas.list.length >= 40) {
      //   datas.finished = true;
      // }
    };
    function addRefund() {
      console.log((child.value.loading))
      // router.push({
      //   path: "/addOrder",
      // });
    }
    function fatherMethod() {
        onLoadData([1, datas.state])
    }
    return {
      value,
      ...toRefs(datas),
      onSearch,
      onClear,
      addRefund,
      onLoading,
      onLoad,
      child,
      onLoadData,
      type,
      fatherMethod
    }
  }
})
</script>
<style lang="scss">
@import "./refund.scss";
</style>
