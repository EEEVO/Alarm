<template>
  <div>
    <commontHeader :current-page-name="currentPageName"></commontHeader>
    <div class="contents Slide-in-topSlow">
      <!--图片块-->
      <div class="homeImage">
        <img src="./backs.png">
      </div>
      <!--底部操作组件-->
      <navList></navList>
    </div>
  </div>
</template>

<script type="es6">
import commontHeader from '../commontHeader'
import navList from './navList'

export default {
  data() {
    return {
      currentPageName: '首页'
    }
  },
  components: {
    commontHeader,
    navList
  }
}
</script>

<style lang="scss" scoped>
.contents {
  width: auto;
  height: auto;
  position: absolute;
  left: 0px;
  top: 40px;
  bottom: 0;
  right: 0px;
  .homeImage {
    width: auto;
    height: auto;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 133px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
