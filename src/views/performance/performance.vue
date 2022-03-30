<template>
  <div class="performance">
    <form action="/">
      <van-search
        v-model="value"
        shape="round"
        placeholder="客户姓名"
        @search="onSearch(value)"
        @clear="onClear"
      />
    </form>
    <van-dropdown-menu :overlay="overlay">
      <van-dropdown-item title="下单时间" @open="showTime = true,overlay=false" />
      <van-dropdown-item
        title="店铺名称"
        :options="dateForStore"
        v-model="storeName"
        @click="AllStore"
        @change="selectStore"
        @open="overlay=true"
      />
      <van-dropdown-item
        title="订单状态"
        :options="dateForState"
        v-model="state"
        @change="selectState"
        @open="overlay=true"
      />
    </van-dropdown-menu>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-list :offset="100" :finished="finished && list.length>0" finished-text="没有更多了" @load="onLoadIng">
        <van-cell v-for="item in list" :key="item.state">
          <van-swipe-cell>
              <van-nav-bar :right-text="dateForState[Number(item.state)].text">
                <template #left>
                  <van-icon name="shop-o" />
                  <span class="storeName">{{ item.storeName || '合和苑理发店'}}</span>
                  <van-icon name="arrow" />
                </template>
              </van-nav-bar>
              <van-divider :style="{ color: '#CBCBCB' }" />
              <van-nav-bar>
                <template #left>
                  <span class="nav_text">用户姓名</span>
                </template>
                <template #right>
                  <span class="nat_text_data">{{ item.userName }}</span>
                </template>
              </van-nav-bar>
              <van-nav-bar>
                <template #left>
                  <span class="nav_text">产品管理编号</span>
                </template>
                <template #right>
                  <span class="nat_text_data">{{ item.productIdent }}</span>
                </template>
              </van-nav-bar>

          </van-swipe-cell>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <!-- 时间选择 -->
    <!-- <van-calendar v-model:show="showTime" :show-confirm="false" type="range" @confirm="selectTime"></van-calendar> -->
    <van-action-sheet v-model:show="showTime" title="请选择下单起始时间" >
      <van-cell-group inset>
        <van-cell class="cell-title" title="下单开始时间：" :value="startTime ? startTime : '请选择'" @click="TimeChoose(0)" />
        <van-cell class="cell-title" title="下单结束时间：" :value="endTime ? endTime : '请选择'" @click="TimeChoose(1)" />
      </van-cell-group>
      <van-datetime-picker
        v-model="nowTime"
        type="date"
        @confirm="selectTime"
        :title="titleName"
        item-height="40"
        :min-date="minDate"
        :max-date="maxDate"
      ></van-datetime-picker>
    </van-action-sheet>
    <!-- 时间选择结束 -->
    <div class="add_btn">
      <van-button color="#919A74">
        共
        <span class="money">{{total}}</span> 单
      </van-button>
    </div>
    <van-empty
        class="custom-image custom-image-no-found"
        :image="require('../../assets/addOrder/no-found.png')"
        description="暂无订单~"
        v-if="list.length === 0"
      />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { Icon, Overlay } from "vant";
import { Toast, Search, Button, DropdownMenu, DatetimePicker, CellGroup, DropdownItem, PullRefresh, List,
ActionSheet, Cell, SwipeCell, NavBar, Divider,Empty } from "vant";
import ListArr from "@/components/lists/list.component.vue";
import {orderService} from '../service'
document.title = "业绩管理"
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
    "van-empty": Empty
  },
  setup() {
    const value = ref("");
    const datas = reactive({
      dateForStore: [{
        text: "理发店0",
        value: 0,
      },
      {
        text: "理发店1",
        value: 1,
      },

      {
        text: "理发店2",
        value: 2,
      },
      ],
      dateForState: [
        {
          text: "全部",
          value: 1,
        },
        {
          text: "已提交",
          value: 2,
        },
        {
          text: "待补录",
          value: 3,
        },
        {
          text: "待发货",
          value: 4,
        },
        {
          text: "已发货",
          value: 5,
        },
        {
          text: "已完成",
          value: 6,
        },
        {
          text: "待付款",
          value: 7,
        },
        {
          text: "待审核",
          value: 9,
        },
      ],
      list: [] as any,
      finished: false,
      showTime: false,
      state: 0,
      storeName: 0,
      startTime: '',
      endTime: '',
      titleName: '起始时间',
      nowTime: '',
      activeTime: ['1'],
      minDate: new Date(2022, 2, 1),
      maxDate: new Date(),
      overlay:true,
      page: 1,
      total:0
    });
    const child = ref()
    const onSearch = (val: string) => Toast(val);
    const onClear = (val: string) => Toast("搜索清除");
    const onLoad = ref();
    const loading = ref(false);
    const onLoadIng = () => {
      orderService.orderList({page:datas.page, limit: 10}).then(res=>{
        let length = 0;
        datas.total = res.data.count;
        if(res.data.data){
          length = res.data.data.length
        }else{
          datas.finished = true
        }
        if(length){
          datas.list = datas.list.concat(res.data.data)
          if(length< datas.page){
            datas.finished = true
          }else{
            datas.page++
          }
        }else{
          datas.finished = true;
          if(datas.page === 1){
           console.log('没有数据')
          }
        }
        }
      )
    }
    onLoadIng
    const onRefresh = () => {
      // props.onLoad();
      setTimeout(() => {
        Toast('刷新成功');
        loading.value = false;
      }, 1000);
    };
    // 点击筛选订单状态
    const selectState = () => {
      console.log(datas.state)
    }
    // 点击筛选店铺名称
    const selectStore = () => {
      console.log(datas.storeName)
    }
    // 获得所有门店信息
    const AllStore = () => {
      // 接口获取所有门店信息，更新dateForStore
    }
    const selectTime = () => {
      console.log(datas.nowTime);
      let date = new Date(datas.nowTime);
      let dateTmp = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
      datas.nowTime
      if (datas.titleName == '起始时间') {
        datas.startTime = dateTmp;
      } else {
        datas.endTime = dateTmp;
      }
      if (datas.startTime && datas.endTime) {
        console.log("ok");
        // 可以筛选了
        datas.showTime = false;

      }
    }
    const TimeChoose = (opNum: number) => {

      if (opNum === 0) {
        datas.titleName = '起始时间'
      } else {
        datas.titleName = '终止时间'
      }
    }

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
      onLoad,
      child,
    }
  }
})

</script>
<style lang="scss">
@import "./performance.scss";
</style>
