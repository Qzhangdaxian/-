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
            <van-field v-model="identity" placeholder="请输入客户身份证号钱前12位" />
          </van-cell-group>
          <h6 class="record_code">客户联系电话</h6>
          <van-cell-group>
            <van-field v-model="phone" :length="11" :rules="[{ pattern: pattern, message: '手机号格式错误' }]" placeholder="请输入" />
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
            <van-field v-model="alopeciaHistory" is-link readonly name="picker" :right-icon="'arrow-down'" placeholder="请选择" @click="showPicker = true" />
            <van-popup v-model:show="showPicker" position="bottom">
              <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
            </van-popup>
          </van-cell-group>
          <h6 class="record_code required">脱发状态</h6>
          <van-field name="radio">
            <template #input>
              <van-radio-group v-model="alopeciaState" direction="horizontal">
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
          <van-uploader v-model="alopeciaImg" :after-read="afterRead" :before-delete="deteleImg" :upload-icon="'back-top'" :max-count="3">
            <van-icon :name="require('../../assets/addOrder/upload.png')" class="van-uploader-upload" />
            <p>点击上传</p>
          </van-uploader>
          <div class="submit_next">
            <van-button color="#919A74" :disabled="imgData.length < 3 || !Boolean(alopeciaState) || !Boolean(alopeciaHistory) || !isDis" size="large" @click="onSubmit">提交</van-button>
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
import { orderService } from "../service";
import { useRoute, useRouter } from "vue-router";
// import router from "@/router";
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
    const route = useRoute();
    const router = useRouter();
    let data = reactive({
      active: 0,
      userName: "",
      identity: "",
      phone: "",
      age: "",
      show: false,
      alopeciaHistory: "",
      showPicker: false,
      // 1-3，3-5，5-7，7-10，10年以上
      columns: ["1-3年", "3-5年", "5-7年", "7-10年", "10年以上"],
      alopeciaState: 0,
      images: [require('../../assets/img/heard_one.png'), require('../../assets/img/heard_two.png'), require('../../assets/img/heard_three.png')],
      pattern: /^1[3456789]\d{9}$/,
      alopeciaImg: [] as Array<any>,
      imgData: [] as any,
      isDis: true,
    });
    const onClickStep = (active: any, isNext: boolean) => {
      if (!data.userName && !data.age) {
        Toast("带*号的的是必填项");
        return;
      }
      if (!data.identity && !isNext && active === 1) {
        data.show = true;
        return;
      }
      if (data.userName && data.age) {
        data.active = active;
        data.show = false;
      }

    };
    const onNext = () => {
      if (data.userName && data.age) {
        // data.active = 1;
        if (data.phone && !data.pattern.test(data.phone)) {
          Toast("请填写正确的手机号");
          return;
        }
        if (!data.identity) {
          data.show = true;
        } else {
          data.active = 1;
        }
      }
    };
    const onConfirm = (value: string) => {
      data.alopeciaHistory = value;
      data.showPicker = false;
    };
    const onSubmit = () => {
      data.isDis = true;
      const param = {
        userName: data.userName,
        age: data.age,
        identity: data.identity,
        phone: data.phone,
        alopeciaHistory: data.columns.indexOf(data.alopeciaHistory)+1,
        alopeciaState: data.alopeciaState,
        alopeciaImg: data.imgData.join(','),
      };
      orderService.orderSave(param).then((res: any) => {
        if (res.data.success) {
          data.isDis = false;
          Toast('提交成功')
          history.back()
        }else{
          data.isDis = false;
        }
      });
      // router.push({
      //   path: "/order",
      // });
    };
    const afterRead = (file: any) => {
      let fileContent = file.file as File;
      file.status = 'uploading';
      file.message = '上传中...';
      orderService.upload(fileContent).then(
            (res: any) => res.json()
        ).then(
            (res: any) => {
              if(res.success){
                file.status= 'done';
                data.imgData.push(res.data.id);
              }else{
                file.status= 'failed';
                file.message= '上传失败...';
              }

            }
        )
      // file.status = 'success';
      // file.message = '上传中...';
      // setTimeout(() => {
      //   file.status = 'success';
      //   file.message = '上传失败';
      // }, 1000);
    };
    const deteleImg: any = (file:any)=>{
      data.alopeciaImg.forEach((item: any, index: number)=>{
        if(item.file.name === file.file.name){
          data.alopeciaImg.splice(index,1);
          let id = data.imgData.splice(index, 1);
          orderService.delete(id).then((res: any) =>{
            console.log('detele==>', res)
          })
        }
      })
      // console.log(data.imgData.splice(data.imgData.indexOf(file.file.name), 1))

    }
    return {
      // active,
      ...toRefs(data),
      onClickStep,
      onNext,
      onConfirm,
      onSubmit,
      afterRead,
      deteleImg,
    };
  },
});
</script>
<style lang="scss">
@import "./add_order.scss";
</style>
