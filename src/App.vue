<template>
  <div id="app" :style="{background:nowBg}">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  computed: {
    nowBg() {
      let bg = this.$store.state.bg_url || window.localStorage.bg_url || 'bg_1.jpg'
      let res = `url(../static/img/${bg})`
      return res
    }
  },
};
</script>

<style>
@import '../src/style/public.css';
@import '../src/fonts/iconfont.css';
@import '../src/style/transitionStyle.css';
@import '../src/style/scrollbarStyle.css';
@import '../src/style/animate.min.css';

@import '../src/style/common.scss';
@import '../src/style/mixin.scss';

#app {
  width: 100%;
  height: 100%;
}
</style>
