<template>
  <div class="image_preview">
    <div class="img_box" :class="{imgSm: isdefault, imgLag: !isdefault}" v-for="(item2, index) of images" :key="index">
      <img :src="item2" alt="" @click="getImg(index)" />
    </div>
  </div>
</template>
<script lang="ts">
import { Options } from "vue-class-component";
import { defineComponent } from "vue";
import { ImagePreview } from 'vant';

export default defineComponent({
  name: 'h-image',
  props: {
    images: ([] as any),
    isdefault: Boolean
  },
  components:{},
  setup(props){
    function getImg(index: number): void {
      ImagePreview({
        images: props.images, // 预览图片的那个数组
        showIndex: true,
        loop: false,
        startPosition: index, // 指明预览第几张图
      });
    }
    return{
      getImg
    }
  }
})
</script>
<style lang="scss">
@import './imagePreview.scss';
</style>
