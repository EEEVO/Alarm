<template>
  <div class="ribbon">
    <button class="btn" title="刷新" @click="Refresh()">
      <i class="iconfont icon-shuaxin"></i>
    </button>
    <span>当前页/</span>
    <span class="currentPage">{{currentPageName}}</span>
  </div>
</template>

<script type="es6">
export default {
  props: ["currentPageName"],
  methods: {
    Refresh() {
      // TODO:此处功能疑问
      this.$store.commit('switchREFRESH_STATUS');
    }
  }
}
</script>

<style lang="scss" scoped>
// .ribbon 
div{
  height: 40px;
  line-height: 40px;
  font-family: "Open Sans", Arial, Helvetica, Sans-Serif;
  .btn {
    border: none;
    border-radius: 2px;
    box-shadow: inset 0 -2px 0 rgba(0, 0, 0, .05);
    color: #fff;
    font-family: "Microsoft YaHei";
    background-color: #707070;
    padding: 4px 6px;
    line-height: normal;
    margin-right: 10px;

    i {
      font-size: 13px!important;
    }
  }
  .currentPage {
    color: #FFD600;
  }
}
</style>
