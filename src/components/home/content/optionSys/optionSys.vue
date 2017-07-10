<template>
  <div>
    <commontHeader :current-page-name="currentPageName"></commontHeader>
    <div class="contents">
      <div class="contentHeader">
        <span>
          <i class="iconfont icon-shishizhuangtai"></i>
          {{currentPageName}}
        </span>
      </div>
      <div class="contentBody">
  
      </div>
    </div>
  </div>
</template>

<script type="es6">
import commontHeader from '../commontHeader'

export default {
  data() {
    return {
      currentPageName: '系统配置'
    }
  },
  components: {
    commontHeader,
    // navList
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
  .contentHeader {
    width: auto;
    height: 34px;
    background: rgba(0, 0, 0, .23)!important;
    border: 1px solid rgba(0, 0, 0, .23)!important;
    line-height: 34px;
    padding-left: 10px;
    font-size: 14px;
  }

  .contentBody {
    width: auto;
    height: auto;
    position: absolute;
    left: 0px;
    top: 34px;
    bottom: 13px;
    right: 0px;
    background: rgba(0, 0, 0, .18)!important;
    border: 1px solid rgba(0, 0, 0, .13)!important;
  }
}
</style>
