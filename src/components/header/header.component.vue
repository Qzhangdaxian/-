<template>
  <div class="header">

  </div>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';

  @Options({
    props: {
      msg: String
    }
  })
  export default class HelloWorld extends Vue {
    msg!: string
  }
</script>
<style>
  @import './header.scss';
</style>
