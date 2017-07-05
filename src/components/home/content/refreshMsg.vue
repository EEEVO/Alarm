<template>
  <div class="logout">
    <div class="logout-content">
      <div class="mg-default-center">
        <p class="MessageBox_p1">
          <i class="iconfont icon-shuaxin"></i>
          <b>刷新?</b>
        </p>
        <p class="MessageBox_p2">这将重新载入页面。</p>
        <p class="MessageBox_p3">
          <button @click="confirm()">确定</button>
          <button @click="cancel()">取消</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script type="es6">
export default {

  methods: {
    confirm() {
      console.log("确定刷新");

    },
    cancel() {
      this.$store.commit('switchREFRESH_STATUS');
    }
  }
}
</script>

<style lang="scss" scopedSlots>
@import '../modalbox.scss'
</style>


