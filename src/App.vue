<template>
  <div id="app">
    <!--<Login></Login>-->
    <router-view></router-view>
  </div>
</template>

<script>
// import Login from './components/pages/login'

export default {
  name: 'app',
  // data() {
  //   return {
  //     // TODO:背景图片因为打包等原因必须放在static文件夹下
  //     bg: {
  //       // background: `url("../static/img/${this.nowBg}")`,
  //       border: "1px solid red"
  //     },
  //     // bg_url: '',
  //   }
  // },
  // computed: {
  //   nowBg() {
  //     if (window.localStorage.bg_url) {
  //       let a = window.localStorage.bg_url;
  //       this.$store.commit('updata_bg_url', {
  //         a
  //       })
  //       import './style/Skin/bg1.css'
  //       // return this.bg_url
  //     } else {
  //       window.localStorage.bg_url= this.$store.state.bg_url
  //       // return this.bg_url
  //     }
  //   }
  // },
  // methods: {
  //   initBg() {
  //     if (window.localStorage.bg_url) {
  //       this.$store.state.bg_url = this.bg_url = window.localStorage.bg_url;
  //       // this.bg_url
  //       return this.bg_url
  //     } else {
  //       window.localStorage.bg_url = this.bg_url = this.$store.state.bg_url
  //       return this.bg_url
  //     }
  //   }
  // }
};
</script>

<style>
@import '../src/style/public.css';
@import '../src/fonts/iconfont.css';
@import '../src/style/transitionStyle.css';
@import '../src/style/scrollbarStyle.css';
@import '../src/style/animate.min.css';

@import '../src/style/mixin.scss';

/*@import '../src/style/Skin/bg1.css';*/

#app {
  width: 100%;
  height: 100%;
  /*先写死以后再换*/
  background: url("../static/img/bg_1.jpg")
}
</style>
