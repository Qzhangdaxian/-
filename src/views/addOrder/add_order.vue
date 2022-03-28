<template>
  <div class="add_order">
    <p class="add_order-tip ARequired">请您逐条填写完整再进行提交。所有信息依据将用于客户退款实际依据，否则无法进行退款办理。</p>
    <div>
      <van-steps :active="active" active-icon="success" active-color="#FFFFFF" @click-step="onClickStep">
        <van-step>
          <span>客户基本信息</span>
        </van-step>
        <van-step>
          <span>客户脱发信息</span>
        </van-step>
      </van-steps>
      <van-form>
        <div class="user_info add_order-form" v-if="active === 0">
          <h6 class="record_code required">客户姓名</h6>
          <van-cell-group>
            <van-field v-model="userName" :rules="[{ required: true, message: '请填写客户姓名' }]" placeholder="请输入" />
          </van-cell-group>
          <h6 class="record_code">身份证号</h6>
          <van-cell-group>
            <van-field v-model="idCard" placeholder="请输入客户身份证号钱前12位" />
          </van-cell-group>
          <h6 class="record_code">客户联系电话</h6>
          <van-cell-group>
            <van-field v-model="userPhone" :length="11" :rules="[{ pattern: pattern, message: '手机号格式错误' }]" placeholder="请输入" />
          </van-cell-group>
          <h6 class="record_code required">年龄</h6>
          <van-cell-group>
            <van-field v-model="age" placeholder="请输入" :rules="[{ required: true, message: '请填写客户年龄' }]" />
          </van-cell-group>
          <div class="btn_next">
            <van-button color="#919A74" :disabled="!Boolean(userName) || !Boolean(age)" size="large" @click="onNext">下一步 </van-button>
          </div>
        </div>
        <div class="user_info add_order-form" v-if="active === 1">
          <h6 class="record_code required">脱发史</h6>
          <van-cell-group>
            <van-field v-model="result" is-link readonly name="picker" :right-icon="'arrow-down'" placeholder="请选择" @click="showPicker = true" />
            <van-popup v-model:show="showPicker" position="bottom">
              <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
            </van-popup>
          </van-cell-group>
          <h6 class="record_code required">脱发状态</h6>
          <van-field name="radio">
            <template #input>
              <van-radio-group v-model="checked" direction="horizontal">
                <div class="hair_model">
                  <van-radio name="1" label="M型脱发">
                    <van-image width="100" height="100" :src="require('../../assets/addOrder/m_model.png')" />
                    <span>M型脱发</span>
                  </van-radio>
                  <van-radio name="2">
                    <van-image width="100" height="100" :src="require('../../assets/addOrder/mouthpiece.png')" />
                    <span>口型脱发</span>
                  </van-radio>
                </div>
                <div class="hair_model">
                  <van-radio name="3">
                    <van-image width="100" height="100" :src="require('../../assets/addOrder/o_model.png')" />
                    <span>O型脱发</span>
                  </van-radio>
                  <van-radio name="4" class="radio_last">
                    <van-image width="100" height="100" :src="require('../../assets/addOrder/med.png')" />
                    <span class="radio_span_last">地中海型脱发</span>
                  </van-radio>
                </div>
              </van-radio-group>
            </template>
          </van-field>
          <h6 class="record_code model_state required">客户脱发照片上传</h6>
          <div class="image-preview">
            <van-image-preview :isdefault="true" :images="images"></van-image-preview>
          </div>
          <p class="ARequired picTip">请按照上述示例图标准拍照上传</p>
          <van-uploader v-model="fileList" :after-read="afterRead" :upload-icon="'back-top'" :max-count="1">
            <van-icon name="back-top" class="van-uploader-upload" />
            <p>点击上传</p>
          </van-uploader>
          <div class="submit_next">
            <van-button color="#919A74" size="large" @click="onSubmit">提交 </van-button>
          </div>
        </div>
      </van-form>
    </div>
    <div class="popup_tip">
      <van-popup class="van_popup" :close-on-click-overlay="false" v-model:show="show">
        <div class="tip_content">
          <van-icon name="info-o" />
          <p>未提交客户身份证信息，请确定后期此订单不再进行退款</p>
          <van-divider />
          <span @click="onClickStep(1, true)">确认</span>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { Steps, Step, CellGroup, Field, Button, Form, Popup, Picker, RadioGroup, Radio, Image, Uploader, Icon, Divider, Toast } from "vant";
// import { Image as VanImage } from 'vant';
import imgagePre from "@/components/imagePreview/imagePreview.vue";
document.title = "新订单申请";
export default defineComponent({
  name: "h-add_order",
  components: {
    "van-steps": Steps,
    "van-step": Step,
    "van-cell-group": CellGroup,
    "van-field": Field,
    "van-button": Button,
    "van-form": Form,
    "van-popup": Popup,
    "van-picker": Picker,
    "van-radio-group": RadioGroup,
    "van-radio": Radio,
    "van-image": Image,
    "van-image-preview": imgagePre,
    "van-uploader": Uploader,
    "van-icon": Icon,
    "van-divider": Divider,
  },
  setup() {
    let data = reactive({
      active: 0,
      userName: "",
      idCard: "",
      userPhone: "",
      age: "",
      show: false,
      result: "",
      showPicker: false,
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      checked: 1,
      images: ["https://img.yzcdn.cn/vant/apple-1.jpg", "https://img.yzcdn.cn/vant/apple-2.jpg", "https://img.yzcdn.cn/vant/apple-1.jpg"],
      pattern: /^1[3456789]\d{9}$/,
    });
    const onClickStep = (active: any, isNext: boolean) => {
      if (!data.userName && !data.age) {
        Toast("带*号的的是必填项");
        return;
      }
      if (!data.idCard && !isNext && active === 1) {
        data.show = true;
        return;
      }
      if (data.userName && data.age) {
        data.active = active;
        data.show = false;
      }

      // console.log(active)
    };
    const onNext = () => {
      if (data.userName && data.age) {
        // data.active = 1;
        if (data.userPhone && !data.pattern.test(data.userPhone)) {
          Toast("请填写正确的手机号");
          return;
        }
        if (!data.idCard) {
          data.show = true;
        } else {
          data.active = 1;
        }
      }
    };
    const onConfirm = (value: string) => {
      data.result = value;
      data.showPicker = false;
    };
    const onSubmit = () => {
      console.log(data.checked);
    };
    const fileList = ref([
      // {
      //   url: 'https://img.yzcdn.cn/vant/leaf.jpg',
      //   status: 'success',
      //   message: '上传中...',
      // },
      // {
      //   url: 'https://img.yzcdn.cn/vant/tree.jpg',
      //   status: 'success',
      //   message: '上传失败',
      // },
    ]);
    const afterRead = (file: any) => {
      // file.status = 'success';
      // file.message = '上传中...';
      // setTimeout(() => {
      //   file.status = 'success';
      //   file.message = '上传失败';
      // }, 1000);
    };
    return {
      // active,
      fileList,
      ...toRefs(data),
      onClickStep,
      onNext,
      onConfirm,
      onSubmit,
      afterRead,
    };
  },
});
</script>
<style lang="scss">
@import "./add_order.scss";
</style>
