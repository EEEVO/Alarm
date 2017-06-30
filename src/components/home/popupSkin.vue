<template>
  <div>
    <div class="userSkin">
      <img src="./bg_1.jpg">
      <img src="./bg_2.jpg">
      <img src="./bg_3.jpg">
      <div class="clear"></div>
      <img src="./bg_4.jpg">
      <img src="./bg_5.jpg">
      <img src="./bg_6.jpg">
      <div class="clear"></div>
      <img src="./bg_7.jpg">
      <img src="./bg_8.jpg">
      <img src="./bg_9.jpg">
      <div class="clear"></div>
    </div>
  </div>
</template>

<script type="es6">
export default {

}
</script>

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


