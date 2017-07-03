<template>
  <div>
    <div class="userSkin" v-once>
      <img src="../../img/bg_1.jpg" @click="chooseSkin('bg_1.jpg')">
      <img src="../../img/bg_2.jpg" @click="chooseSkin('bg_2.jpg')">
      <img src="../../img/bg_3.jpg" @click="chooseSkin('bg_3.jpg')">
      <div class="clear"></div>
      <img src="../../img/bg_4.jpg" @click="chooseSkin('bg_4.jpg')">
      <img src="../../img/bg_5.jpg" @click="chooseSkin('bg_5.jpg')">
      <img src="../../img/bg_6.jpg" @click="chooseSkin('bg_6.jpg')">
      <div class="clear"></div>
      <img src="../../img/bg_7.jpg" @click="chooseSkin('bg_7.jpg')">
      <img src="../../img/bg_8.jpg" @click="chooseSkin('bg_8.jpg')">
      <img src="../../img/bg_9.jpg" @click="chooseSkin('bg_9.jpg')">
      <div class="clear"></div>
    </div>
  </div>
</template>

<script type="es6">

export default {
  data() {
    return {
      bg: ''
    }
  },
  methods: {
    chooseSkin(currentURL) {
      console.log(currentURL);
      // 存入localStorage
      window.localStorage.bg_url = currentURL
      this.$store.commit('updata_bg_url', {
        currentURL
      })
    }
  }
}
</script>

<style lang="scss">

</style>

<style lang="scss" scopedSlots>
/*皮肤块*/

.userSkin {
  width: 118px;
  height: 118px;
  background: rgba(0, 0, 0, .36);
  padding: 8px 0 0 8px;
  &:before {
    content: "\e624";
    position: absolute;
    right: 47px;
    top: -10.44444px;
    font-family: "iconfont" !important;
    color: rgba(0, 0, 0, .36);
  }
  img {
    width: 30px;
    height: 30px;
    display: block;
    float: left;
    cursor: pointer;
    margin-right: 6px;
    margin-bottom: 6px;
    border: 1px solid rgba(255, 255, 255, .3);
    &:hover {
      border-width: 2px;
      border-color: rgba(255, 255, 255, .5);
    }
  }
}
</style>


