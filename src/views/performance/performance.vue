<template>
  <div class="performance">
    <form action="/">
      <van-search
        v-model="value"
        shape="round"
        placeholder="客户姓名/身份证/产品管理编号"
        @search="onSearch(value)"
        @clear="onClear"
      />
    </form>
    <van-dropdown-menu>
      <van-dropdown-item title="下单时间" @open="showTime = true"/>
      <van-dropdown-item title="订单状态" :options="data" v-model="state" @change="selectState"/>
    </van-dropdown-menu>
    <!-- 时间选择 -->
    <van-calendar v-model:show = "showTime" :show-confirm="false" type="range" @confirm="selectTime"></van-calendar>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-list :finished="finished" finished-text="没有更多了" @load="onLoadIng">
        <van-cell v-for="item in list" :key="item.state">
          <van-swipe-cell>
            <div>
              <van-nav-bar  :right-text="data[Number(item.state)].text">
                <template #left>
                  <van-icon name="shop-o" />
                  <span class="storeName">{{ item.storeName }}</span>
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
            </div>
          </van-swipe-cell>
        </van-cell>
      </van-list>
    </van-pull-refresh>

    <div class="add_btn">
      <van-button color="#919A74">
        共
        <span class="money">30</span> 单
      </van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { Icon } from "vant";
import { Toast, Search, Button, DropdownMenu, DropdownItem, PullRefresh, List,Calendar, Cell, SwipeCell, NavBar, Divider } from "vant";
import ListArr from "@/components/lists/list.component.vue";

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
  "van-calendar" :Calendar,
  },
  setup() {
    const value = ref("");
    const datas = reactive({
      data: [
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
      list: [{
        state: 1,
        storeName: "和合苑理发店",
        userName: "张飒",
        productIdent: '123546'
      }],
      finished: false,
      showTime:false,

    });
    const child = ref()
    const onSearch = (val: string) => Toast(val);
    const onClear = (val: string) => Toast("搜索清除");
    const onLoad = ref();
    let state = 1;
    const loading = ref(false);
    const onLoadIng = (num: number) => {
      console.log(child.value)
    }
    const onRefresh = () => {
      // props.onLoad();
      setTimeout(() => {
        Toast('刷新成功');
        loading.value = false;
      }, 1000);
    };
    const selectState = () => {
      console.log(state)
    }
    const selectTime = (values:any) => {
      console.log(values);
      const [start , end] = values;
      console.log(start);
      datas.showTime = false;
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
      onLoad,
      child,
      state,
    }
  }
})

</script>
<style lang="scss">
@import "./performance.scss";
</style>
