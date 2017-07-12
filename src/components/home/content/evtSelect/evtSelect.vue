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
      currentPageName: '事件查询'
    }
  },
  components: {
    commontHeader,
    contentTable
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin.scss';

.contents {
  @include absoluteWH(auto, auto);
  @include trbl(40px, 0, 0, 0);
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
    @include absoluteWH(auto, auto);
    @include trbl(34px, 0, 13px, 0);
    background: rgba(0, 0, 0, .18)!important;
    border: 1px solid rgba(0, 0, 0, .13)!important;
    .contentBodyInAn {
      @include absoluteWH(auto, auto);
      @include trbl(10px, 13px, 13px, 13px);
      animation: slideInTopSlow 900ms forwards;
    }
  }
}
</style>
