<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from "vue";
document.title= '自然约定';
export default defineComponent({
  name: "hsh-home",
  components: {},
  setup() {
    document.write('<meta name="viewport" content="width=100%,inital-scale=1.0,maximum-scale=1.0,user-scalable=no;">');
    // window.onload = function () {
    //   document.addEventListener("touchstart", function (event) {
    //     if (event.touches.length > 1) {
    //       event.preventDefault();
    //     }
    //   });
    //   document.addEventListener("gesturestart", function (event) {
    //     event.preventDefault();
    //   });
    // };
    // ios
    // document.addEventListener(
    //   "mousewheel",
    //   function (e: any) {
    //     e = e || window.event;
    //     // if ((e.wheelDelta && event.ctrlKey) || e.detail) {
    //     //   event.preventDefault();
    //     // }
    //   },
    //   {
    //     capture: false,
    //     passive: false,
    //   }
    // );
    // document.addEventListener(
    //   "keydown",
    //   function (event) {
    //     if (
    //       (event.ctrlKey === true || event.metaKey === true) &&
    //       (event.keyCode === 61 || event.keyCode === 107 || event.keyCode === 173 || event.keyCode === 109 || event.keyCode === 187 || event.keyCode === 189)
    //     ) {
    //       event.preventDefault();
    //     }
    //   },
    //   false
    // );
    return;
  },
});
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
