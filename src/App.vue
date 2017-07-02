<template>
  <div id="app" v-bind:style="bg">
    <!--<Login></Login>-->
    <router-view></router-view>
  </div>
</template>

<script>
// import Login from './components/pages/login'

export default {
  name: 'app',
  data() {
    return {
      // bg: this.$store.bg_url
      // TODO:背景图片路径地址找不到
      bg: {
        background: 'url("./img/bg_9.jpg")',
        border: "1px solid red"
      }
    }
  }
};
</script>

<style>
@import '../src/style/public.css';
@import '../src/fonts/iconfont.css';

#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
