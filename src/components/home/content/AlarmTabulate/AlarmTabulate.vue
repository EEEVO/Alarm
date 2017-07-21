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
        <!-- <Vue2DataPicker @node-click="getDate"></Vue2DataPicker> -->
      </div>
    </div>
  </div>
  
  
</template>

<script type="es6">
import commontHeader from '../commontHeader'
// import Vue2DataPicker from '../evtSelect/Vue2-DataPick'

export default {
  data() {
    return {
      currentPageName: '报警排表'
    }
  },
  methods: {
    // 节点的点击回调，获取当前点击的时间对象yyyy-MM-dd
    getDate(date) {
      console.log("111");
      console.log(date);
    }
  },
  components: {
    commontHeader,
    // navList
    // Vue2DataPicker
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
