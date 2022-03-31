<template>
  <div class="order">
    <form action="/" class="order_form">
      <van-search v-model="value" shape="round" placeholder="客户姓名/身份证/产品管理编号" @update:model-value="onSearch(value)" @clear="onClear" />
      <span @click="isShow" v-if="Number(type) == 3">筛选</span>
    </form>
    <ListArr ref="child" :data="data" :list="list" :btnType="btnType" :finished="finished"
     :onLoad="onLoadData" @page="onLoadData" :types="type"></ListArr>

    <div class="add_btn" v-if="Number(type) === 4">
      <van-button color="#919A74" @click="addOrder">
        <van-icon name="plus" />
      </van-button>
    </div>
    <van-popup v-model:show="show" round position="bottom" >
      <!--
      <div class="popup_top">
        <span>理发店/门店选择</span>
        <van-icon name="cross"  @click="onCancel"/>
      </div>
      <van-search v-model="values" shape="round" placeholder="请输入店铺名称搜索" @update:model-value="storeSearch(value)" @clear="onClear" />
      :showToolbar="false"
      -->
      <van-picker title="理发店/门店选择" v-if="show" :columns="storeLists"  @confirm="onConfirm"  @change="onChange"/>
    </van-popup>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Toast, Search, Button, Popup, Icon, Picker } from "vant";
// import router from "@/router";
import ListArr from "@/components/lists/list.component.vue";
import { orderService } from "./order.service";
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
    "van-picker": Picker,
    "van-popup":Popup
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const value = ref("");
    const show = ref(false);
    const datas = reactive({
      data: [
        {
          name: "全部",
          value: 0,
        },
        {
          name: "已提交",
          value: 1,
        },
        {
          name: "待补录",
          value: 5,
        },
        {
          name: "待审核",
          value: 2,
        },
        {
          name: "待发货",
          value: 3,
        },
        {
          name: "已驳回",
          value: 4,
        },

        {
          name: "已完成",
          value: 6,
        }
      ],
      list: [] as Array<{ state: number; storeName: string; userName: string; productIdent: string }>,
      // loading: false,
      finished: false,
      length: 0,
      username: "",
      state: 0,
      btnType: "",
      dataSoures: ([] as Array<any>),
      storeLists: ([] as Array<any>),
      values: '',
      storeId: null
    });
    const type = ref(route.query.type);
    if(Number(type.value) == 3){
      datas.data[1].name="待付款"
    }
    const child = ref();
    const refreshing = ref(false);
    const onSearch = (val: string) => {
      datas.username = val;
      onLoadData([1, datas.state]);
    };
    if (Number(route.query.type) === 4) {
      datas.btnType = "record";
    } else if (Number(route.query.type) === 3) {
      datas.btnType = "payOrder";
    }
    const onClear = (val: string) => Toast("搜索清除");
    const onLoad = ref();
    const onLoadData = (param: any) => {
      datas.state = datas.data[param[1]].value;
      if (refreshing.value) {
        datas.list = [];
        refreshing.value = false;
      }
      orderService
        .orderList("get", {
          page: param[0],
          limit: 10,
          state: param[1] == 0 ? "" : datas.data[param[1]].value,
          userName: datas.username,
          storeId: datas.storeId,
          category: 1,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.data) {
            datas.length = res.data.data.length;
          } else {
            datas.finished = true;
          }
          if (param[0] == 1) {
            datas.list = [];
          }
          if (datas.length) {
            datas.list = datas.list.concat(res.data.data);
            if (datas.length < param[0]) {
              datas.finished = true;
            } else {
              // console.log(datas.page++)
              // debugger
              // datas.page ++
            }
          } else {
            datas.finished = true;
            // console.log(length)
            // if( num === 1){
            //   console.log('da111')
            // }
          }

          // datas.finished = true;
        });
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
    const isShow = () => {
      show.value = !show.value;
    };
    const storeSearch = (val: string) => {
      storeList(datas.values)
    };
    const storeList = (userName?: string) => {
      // datas.storeLists = []
      const param = ({
        page: 1,
        limit: 999999,
      } as any)
      if(userName){
        param.userName = userName;
      }
      orderService
        .storeList(param)
        .then((res) => {
          if(res.data && res.data.data){
            res.data.data.forEach((item: any) => {
              datas.dataSoures.push(item.id)
              datas.storeLists.push(item.dealerName)
            })
          }
        });
    };
    storeList();
    function addOrder() {
      router.push({
        path: "/addOrder",
      });
    }
    const onCancel = () => {
      show.value= false;
    };
    const onConfirm = (val: string, index: number) => {
      // Toast(`当前值: ${val}, 当前索引: ${index}`);
      datas.storeId = datas.dataSoures[index]
      show.value= false;
      onLoadData([1, datas.state])
    };
    const onChange = (val: string, index: number) => {
      // Toast(`当前值: ${val}, 当前索引: ${index}`);
    };
    return {
      value,
      ...toRefs(datas),
      onSearch,
      onClear,
      addOrder,
      onLoadData,
      onLoad,
      child,
      type,
      show,
      isShow,
      onConfirm,
      onCancel,
      onChange,
      storeSearch
    };
  },
});
</script>
<style lang="scss">
@import "./order.scss";
</style>
