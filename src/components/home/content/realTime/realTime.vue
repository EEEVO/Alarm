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
        <contentTable class="contentBodyInAn .Slide-in-topSlow"></contentTable>
      </div>
    </div>
  </div>
</template>

<script type="es6">
import commontHeader from '../commontHeader'
import contentTable from './contentTable'


export default {
  data() {
    return {
      currentPageName: '设备数据'
    }
  },
  components: {
    commontHeader,
    contentTable
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
    .contentBodyInAn {
      width: auto;
      height: auto;
      left: 13px;
      top: 10px;
      bottom: 13px;
      right: 13px;
      position: absolute;
      animation: slideInTopSlow 900ms forwards;
    }
  }
}
</style>
