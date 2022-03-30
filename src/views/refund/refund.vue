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
      :onLoad="onLoadData"
      @page="onLoadData"
    ></ListArr>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { Icon } from "vant";
import { Toast, Search, Button } from "vant";
import router from "@/router";
import ListArr from "@/components/lists/list.component.vue";
import {orderService} from '../service';
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
      finished: false,
      length:0
    });
    const child = ref()
    const refreshing = ref(false);
    const onSearch = (val: string) => Toast(val);
    const onClear = (val: string) => Toast("搜索清除");
    const onLoad = ref()
    const onLoading = (num: number) => {
      console.log(child.value)
    }
    const onLoadData = (param:any) => {
      console.log(param[0],param[1])
      if (refreshing.value) {
        datas.list = [];
        refreshing.value = false;
      }
      orderService.orderList('get', {
        page: param[0],
        limit: 10,
        // state: param[1]
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
          console.log(datas.list)
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
    return {
      value,
      ...toRefs(datas),
      onSearch,
      onClear,
      addRefund,
      onLoading,
      onLoad,
      child,
      onLoadData
    }
  }
})
</script>
<style lang="scss">
@import "./refund.scss";
</style>
