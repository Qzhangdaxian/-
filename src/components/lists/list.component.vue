<template>
  <div class="order_list_z">
    <van-tabs v-model:active="active" sticky :animated="true" @click-tab="onClickTab(active)">
      <van-tab v-for="index in data" :key="index.value" :title="index.name">
        <p class="tips" v-if="active === 2 && index.value == 5 && types == 4">请您及时补录产品管理编号，产品管理编号的补录涉及后续退款流程的推进， 请提示客户谨慎保管并及时在系统提交相关信息。</p>
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <van-list :offset="100" :finished="finished && list.length > 0" finished-text="没有更多了" @load="onLoadIng">
            <van-cell v-for="item in list" :key="item.state">
              <van-swipe-cell>
                <div>
                  <van-nav-bar>
                    <template #left>
                      <div @click="detail(item.id)" data-for="1">
                        <van-icon name="shop-o" />
                        <span class="storeName">{{ item.storeName }}</span>
                        <van-icon name="arrow" />
                      </div>
                    </template>
                    <template #right>
                      <span :style="{ color: color[item.state] }">
                        {{ CheckStatePipe(item.state) }}
                      </span>
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
                      <span class="nat_text_data">{{ item.productNo || "暂无" }}</span>
                    </template>
                  </van-nav-bar>
                </div>
                <template #right>
                  <!--
                   补录 || item.state !== 5
                   退款
                   付款
                  -->
                  <!--
                  经销商
                  <van-button
                      v-if="item.state === 5 "
                      square
                      :loading="isLoding"
                      :disabled="isLoding "
                      type="default"
                      color="#919A74"
                      text="待补录"
                      @click="onClick('record', item.id)"
                    />
                -->
                  <template v-if="types == 3">
                    <van-button
                      v-if="item.state === 7 "
                      square
                      :loading="isLoding"
                      :disabled="isLoding "
                      type="default"
                      color="#919A74"
                      text="待补录"
                      @click="onClick('addRefund', item.id)"
                    />

                  </template>
                  <!--
                  门店
                -->
                  <template v-if="types == 4 && item.state == 5">
                    <van-button square :loading="isLoding" :disabled="isLoding" type="default" color="#919A74" text="待补录" @click="onClick('record', item.id)" />
                  </template>
                  <template v-if="types == 4 && item.state == 6">
                    <van-button v-if="item.state == 6" square :loading="isLoding"
                    :disabled="isLoding || types == 3" type="default" color="#919A74"
                    text="退款" @click="onClick('addRefund', item.id)" />
                  </template>

                  <van-button
                    v-if="(item.state == 1 || item.state == 4) && types == 3"
                    square
                    :loading="isLoding"
                    :disabled="isLoding "
                    type="default"
                    color="#919A74"
                    text="付款"
                    @click="onClick('payOrder', item.id)"
                  />
                </template>
              </van-swipe-cell>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <van-empty class="custom-image custom-image-no-found" :image="require('../../assets/addOrder/no-found.png')" description="暂无订单~" v-if="list.length === 0" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Tab, Tabs, PullRefresh, List, Cell, SwipeCell, Button, NavBar, Divider, Toast, Icon, Empty } from "vant";
// import router from "@/router";
import { useRoute, useRouter } from "vue-router";

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
    "van-icon": Icon,
    "van-empty": Empty,
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
    types: Number as any,
    fefund: String
  },
  setup(props, context) {
    const route = useRoute();
    //待付款 待审核 待发货 已发货 已完成

    const router = useRouter();
    const loading = ref(false);
    const active = ref(0);
    const isLoding = ref(false);
    let page = ref(1);
    let state = ref(0);
    let isNo = ref(false);
    const color = ref(["#8E8E8E","#E41818", "#E41818", "#8E8E8E", "#8E8E8E",  "#8E8E8E", "#8E8E8E",  "#E41818","#8E8E8E", "#8E8E8E", "#8E8E8E"])
    if(Number(route.query.type) == 3){
      color.value[1] = "#E41818" ;
    } else if(Number(route.query.type) == 4){
      color.value[1] = "#8E8E8E";
      color.value[5] = "#E41818" ;
    }
    const data= ref([
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
        },
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
      ],)
    const onClickTab = (name: number) => {
      isNo.value = true;
      page.value = 1;
      state.value = name;
      context.emit("page", [page.value, state.value, isNo.value]);
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
      console.log(props.finished);
      isNo.value = false;
      if (!props.finished) {
        //   props.onLoad(2);
        context.emit("page", [page.value++, state.value, isNo.value]);
      }
      // Toast('加载中');
      // console.log(isLoding.value)
    };
    const onClick = (uerRouter: string, id: number) => {
      // isLoding.value = true;
      router.push({
        path: "/" + uerRouter,
        query: {
          type: props.types,
          id,
          quota: route.query.quota
        },
      });
    };
    const detail = (id: number) => {
      router.push({
        path: "/orderDetail",
        query: {
          id,
          type: route.query.type
        },
      });
    };
    function CheckStatePipe(value: any): any {
      const returnData = data.value.filter((item: Data) => item.value === Number(value));
      if (props.types == 3 && returnData.length> 0)
        switch (returnData[0]?.name) {
          case "已提交":
            return "待付款";
          default:
            return returnData[0].name;
        }
      else return returnData[0].name;
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
      color,
      onRefresh,
      onClick,
      CheckStatePipe,
      onClickTab,
      onLoadIng,
      // addOrder,
      detail,
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
