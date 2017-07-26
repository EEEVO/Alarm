<template>
  <div>
    <commontHeader :current-page-name="currentPageName"></commontHeader>
    <div class="contents">
      <div class="contentHeader">
        <span>
          <i class="iconfont icon-shebeiguanli"></i>
          {{currentPageName}}
        </span>
      </div>
      <div class="contentBody">
        <div class="contentBodyInAn">
          <ul class="nav-tabList">
            <li v-for="(item,index) of tabsItemName" :key="index" :class="{active:curractiveIndex==index}" @click="select(index)">{{tabsItemName[index]}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="es6">
import commontHeader from '../commontHeader'

export default {
  data() {
    return {
      currentPageName: '设备联动',
      tabsItemName: [" 联动设置", "场景编辑"],
      curractiveIndex: 0
    }
  },
  components: {
    commontHeader,
    // navList
  },
  methods: {
    select(index) {
      this.curractiveIndex = index
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../style/mixin.scss";

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
      animation: slideInTopSlow 900ms forwards;
      @include absoluteWH(auto, auto);
      @include trbl(13px, 13px, 13px, 13px);
      .nav-tabList {
        list-style: none;
        margin: 0;
        padding-left: 0;
        li {
          float: left;
          margin-right: 4px;
          cursor: pointer;
          padding: 6px 12px;
          background: rgba(255, 255, 255, .13);
          border-radius: 4px 4px 0 0;
          transition: all 300ms linear 0s;
          &:hover {
            background: rgba(255, 255, 255, .36);
            color: #fff;
          }
        }
        .active {
          background: rgba(255, 255, 255, .8)!important;
          color: #000!important;
        }
      }
    }
  }
}
</style>
