<template>
  <div>
    <van-tabs v-model:active="active" sticky :animated="true" @click-tab="onClickTab(active)">
      <van-tab v-for="index in data" :key="index.value" :title="index.name">
        <p class="tips" v-if="active === 2">请您及时补录产品管理编号，产品管理编号的补录涉及后续退款流程的推进， 请提示客户谨慎保管并及时在系统提交相关信息。</p>
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <van-list :finished="finished" finished-text="没有更多了" @load="onLoadIng">
            <van-cell v-for="item in list" :key="item.state">
              <van-swipe-cell>
                <div>
                  <van-nav-bar :right-text="CheckStatePipe(item.state)">
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
                <template #right>
                  <!---->
                  <van-button v-if="btnType === 'record'" square :loading="isLoding" :disabled="isLoding" type="default" color="#919A74" text="补录" @click="onClick('record')" />
                  <van-button v-if="btnType === 'performance'" square :loading="isLoding" :disabled="isLoding" type="default" color="#919A74" text="入库" @click="onClick('performance')" />
                  <van-button v-if="btnType === 'refund'" square :loading="isLoding" :disabled="isLoding" type="default" color="#919A74" text="退款" @click="onClick('addRefund')" />
                </template>
              </van-swipe-cell>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Tab, Tabs, PullRefresh, List, Cell, SwipeCell, Button, NavBar, Divider, Toast } from "vant";
import router from "@/router";
import { number, string } from "vue-types";

export default defineComponent({
  name: "h-list",
  components: {
    "van-tabs": Tabs,
    "van-tab": Tab,
    "van-pull-refresh": PullRefresh,
    "van-list": List,
    "van-cell": Cell,
    "van-swipe-cell": SwipeCell,
    "van-button": Button,
    "van-nav-bar": NavBar,
    "van-divider": Divider,
  },
  props: {
    list: [] as any,
    data: [] as any,
    onLoad: Function as any,
    finished: {
      type: Boolean,
    },
    // routerName: String,
    btnType: String,
  },
  setup(props, context) {
    const loading = ref(false);
    const active = ref(0);

    const isLoding = ref(false);
    const onClickTab = (name: number) => {
      console.log(name);
    };
    const onRefresh = () => {
      // props.onLoad();
      setTimeout(() => {
        Toast("刷新成功");
        loading.value = false;
      }, 1000);
    };
    //
    const onLoadIng = () => {
      // props.onLoad();
      // Toast('加载中');
      // console.log(isLoding.value)
    };
    const onClick = (uerRouter: string) => {
      // isLoding.value = true;
      router.push({
        path: "/" + uerRouter,
      });
    };
    function CheckStatePipe(value: any): any {
      const returnData = props.data.filter((item: Data) => item.value === Number(value));
      return returnData[0].name;
    }
    return {
      active,
      // loadings,
      loading,
      // finished,
      // refreshing,
      isLoding,
      // onSearch,
      // onClear,
      onRefresh,
      onClick,
      CheckStatePipe,
      onClickTab,
      onLoadIng,
      // addOrder,
    };
  },
});
interface Data {
  name: string;
  value: number;
}
</script>

<style lang="scss">
@import "./list.scss";
</style>
