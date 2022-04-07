<template>
  <div class="performance">
    <form action="/">
      <van-search v-model="value" shape="round" placeholder="客户姓名" @search="onSearch(value)" @clear="onClear" />
    </form>
    <van-dropdown-menu :overlay="overlay">
      <van-dropdown-item title="下单时间" @open="(showTime = true), (overlay = false)" />
      <van-dropdown-item title="店铺名称" :options="dateForStore" v-model="storeName" @click="AllStore" @change="selectStore" @open="overlay = true" />
      <van-dropdown-item title="订单状态" :options="dateForState" v-model="state" @change="selectState" @open="overlay = true" />
    </van-dropdown-menu>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-list :offset="100" :finished="finished && list.length > 0" finished-text="没有更多了" @load="onLoadIng">
        <van-cell v-for="item in list" :key="item.state">
          <van-swipe-cell>
            <van-nav-bar>
              <template #left>
                <van-icon name="shop-o" />
                <span class="storeName">{{ item?.storeName }}</span>
                <van-icon name="arrow" />
              </template>
              <template #right>
                <span :style="{ color: dateForState[item.state].color }">{{ dateForState[Number(item?.state)]?.text }}</span>
              </template>
            </van-nav-bar>
            <van-divider :style="{ color: '#CBCBCB' }" />
            <van-nav-bar>
              <template #left>
                <span class="nav_text">用户姓名</span>
              </template>
              <template #right>
                <span class="nat_text_data">{{ item?.userName }}</span>
              </template>
            </van-nav-bar>
            <van-nav-bar>
              <template #left>
                <span class="nav_text">产品管理编号</span>
              </template>
              <template #right>
                <span class="nat_text_data">{{ item?.productNo || "暂无" }}</span>
              </template>
            </van-nav-bar>
          </van-swipe-cell>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <!-- 时间选择 -->
    <!-- <van-calendar v-model:show="showTime" :show-confirm="false" type="range" @confirm="selectTime"></van-calendar> -->
    <van-action-sheet v-model:show="showTime" title="请选择下单起始时间">
      <van-cell-group inset>
        <van-cell class="cell-title" title="下单开始时间：" :value="startTime ? startTime : '请选择'" @click="TimeChoose(0)" />
        <van-cell class="cell-title" title="下单结束时间：" :value="endTime ? endTime : '请选择'" @click="TimeChoose(1)" />
      </van-cell-group>
      <van-datetime-picker v-model="nowTime" type="date" @confirm="selectTime" :title="titleName" item-height="40" :min-date="minDate" :max-date="maxDate"></van-datetime-picker>
    </van-action-sheet>
    <!-- 时间选择结束 -->
    <div class="add_btn">
      <van-button color="#919A74">
        共
        <span class="money">{{ total||0 }}</span> 单
      </van-button>
    </div>
    <van-empty class="custom-image custom-image-no-found" :image="require('../../assets/addOrder/no-found.png')" description="暂无订单~" v-if="list.length === 0" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { Icon, Overlay } from "vant";
import { Toast, Search, Button, DropdownMenu, DatetimePicker, CellGroup, DropdownItem, PullRefresh, List, ActionSheet, Cell, SwipeCell, NavBar, Divider, Empty } from "vant";
import ListArr from "@/components/lists/list.component.vue";
import { orderService } from "../service";
document.title = "业绩管理";
export default defineComponent({
  name: "h-refund",
  components: {
    "van-search": Search,
    "van-button": Button,
    "van-dropdown-menu": DropdownMenu,
    "van-dropdown-item": DropdownItem,
    "van-pull-refresh": PullRefresh,
    "van-list": List,
    "van-cell": Cell,
    "van-swipe-cell": SwipeCell,
    "van-nav-bar": NavBar,
    "van-divider": Divider,
    "van-cell-group": CellGroup,
    "van-icon": Icon,
    "van-action-sheet": ActionSheet,
    "van-datetime-picker": DatetimePicker,
    "van-empty": Empty,
  },
  setup() {
    const value = ref("");
    const datas = reactive({
      dateForStore: [] as Array<{ text: string; value: number }>,
      dateForState: [
        {
          text: "全部",
          value: 0,
          color: "#8E8E8E",
        },
        {
          text: "已提交",
          value: 1,
          color: "#E41818",
        },
        {
          text: "待审核",
          value: 2,
          color: "#8E8E8E",
        },
        {
          text: "待发货",
          value: 3,
          color: "#F9BB48",
        },
        {
          text: "已驳回",
          value: 4,
          color: "#8E8E8E",
        },
        {
          text: "待补录",
          value: 5,
          color: "#E41818",
        },
        {
          text: "已完成",
          value: 6,
          color: "#8E8E8E",
        },
        {
          text: "退款待补录",
          value: 7,
          color: "#E41818",
        },
        {
          text: "退款待审核",
          value: 8,
          color: "#8E8E8E",
        },
        {
          text: "退款完成",
          value: 9,
          color: "#8E8E8E",
        },
        {
          text: "退款失败",
          value: 10,
          color: "#8E8E8E",
        },
      ],
      list: [] as any,
      finished: false,
      showTime: false,
      state: 0,
      storeName: 0,
      startTime: "",
      endTime: "",
      titleName: "起始时间",
      nowTime: "",
      activeTime: ["1"],
      minDate: new Date(2022, 2, 1),
      maxDate: new Date(),
      overlay: true,
      page: 1,
      total: 0,
      dataSoures: [] as Array<any>,
      storeLists: [] as Array<any>,
    });
    // const child = ref()
    const onSearch = (val: string) => {
      datas.list = [];
      datas.page = 1;
      datas.finished = false;
      let param = {};
      if (val) {
        param = {
          page: datas.page,
          limit: 10,
          userName: val,
        };
      } else {
        param = {
          page: 1,
          limit: 10,
        };
      }
      onLoadIng(param)
    };
    const onClear = (val: string) => {
      datas.finished = false;
      datas.list = [];
      datas.page = 1;
      const param = {
        page: datas.page,
        limit: 10,
      };
      onLoadIng(param)
    };
    // const onLoad = ref();
    const loading = ref(false);
    const onLoadIng = (param?: any) => {
      let params:any
      if(datas.state){
          params = {
            pages: datas.page,
            limit: 10,
            state: datas.state,
          }
      }else{
        params = {
          page: datas.page, limit: 10
        };
      }
      datas.state? params.state = datas.state: null;
      datas.storeName? params.storeId = datas.storeName: null;
      value.value? params.userName = value.value: null;
      // startTime: new Date(datas.startTime).valueOf(),
      //     endTime: new Date(datas.endTime).valueOf() + 86400000 - 1,
      datas.startTime? params.startTime = new Date(datas.startTime).valueOf(): null;
      datas.endTime? params.endTime = new Date(datas.endTime).valueOf() + 86400000 - 1: null;
      orderService.orderList(params).then((res) => {
        let length = 0;
        datas.total = res.data.count;
        if (res.data.data) {
          length = res.data.data.length;
        } else {
            datas.finished = true;
          }
        if (length) {
          datas.list = datas.list.concat(res.data.data);
          console.log(datas.list)
          if (length < datas.page) {
            datas.finished = true;
          } else {
            datas.page++;
          }
        } else {
          datas.finished = true;
          if (datas.page === 1) {
            console.log("没有数据");
          }
        }
      });
    };
    // onLoadIng();
    const onRefresh = () => {
      datas.finished = false;
      // props.onLoad();
      datas.page = 1
      datas.list = [];
      setTimeout(() => {
        Toast("刷新成功");
        const param = {
          page: datas.page,
          limit: 10,
          state: datas.state
        };
        onLoadIng(param)
        loading.value = false;
      }, 1000);
    };
    // 点击筛选订单状态
    const selectState = () => {
      datas.finished = false;
      datas.list = [];
      datas.page = 1;
      let param = {};
      if (datas.state) {
        param = { page: datas.page, limit: 10, state: datas.state };
      } else {
        param = { page: 1, limit: 10 };
      }
      console.log(param)
      onLoadIng(param)
    };
    // 点击筛选店铺名称
    const selectStore = () => {
      datas.finished = false;
      datas.list = [];
      datas.page = 1;
      const param = {
        page: 1,
        limit: 10,
        storeId: datas.storeName,
      };
      console.log(param);
      // datas.dateForStore.forEach(item=>{
      //   if(item.text == datas.storeName){

      //   }
      // })
      onLoadIng(param)
    };
    // 获得所有门店信息
    const AllStore = () => {
      // 接口获取所有门店信息，更新dateForStore
      const param = {
        page: 1,
        limit: 999999,
      } as any;

      orderService.storeList(param).then((res) => {
        if (res.data && res.data.data) {
          datas.dateForStore = [];
          res.data.data.forEach((item: any) => {
            datas.dateForStore.push({ text: item.storeName, value: item.id });
            // datas.dataSoures.push(item.id)
            // datas.storeLists.push(item.dealerName)
          });
        }
      });
    };
    AllStore();
    const selectTime = () => {
      datas.finished = false;
      datas.list = [];
      datas.page = 1;
      let date = new Date(datas.nowTime);
      let dateTmp = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
      datas.nowTime;
      if (datas.titleName == "起始时间") {
        datas.startTime = dateTmp;
      } else {
        datas.endTime = dateTmp;
      }
      if (datas.startTime && datas.endTime) {
        const param = {
          page: datas.page,
          limit: 10,
          startTime: new Date(datas.startTime).valueOf(),
          endTime: new Date(datas.endTime).valueOf() + 86400000 - 1,
        };
        onLoadIng(param)
        // 可以筛选了
        datas.showTime = false;
      }
    };
    const TimeChoose = (opNum: number) => {
      if (opNum === 0) {
        datas.titleName = "起始时间";
      } else {
        datas.titleName = "终止时间";
      }
    };

    return {
      value,
      loading,
      ...toRefs(datas),
      onRefresh,
      selectState,
      onSearch,
      onClear,
      onLoadIng,
      selectTime,
      selectStore,
      AllStore,
      TimeChoose,
      // onLoad,
      // child,
    };
  },
});
</script>
<style lang="scss">
@import "./performance.scss";
</style>
