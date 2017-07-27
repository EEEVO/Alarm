<template>
  <div>
    <commontHeader :current-page-name="currentPageName"></commontHeader>
    <div class="contents">
      <div class="contentHeader">
        <span>
          <i class="iconfont icon-dingshirenwu"></i>
          {{currentPageName}}
        </span>
      </div>
      <div class="contentBody">
        <div class="contentBodyInAn">
          <ul class="nav-tabList">
            <li v-for="(item,index) of tabsItemName" :key="index" :class="{active:curractiveIndex==index}" @click="select(index)">{{tabsItemName[index]}}</li>
          </ul>
          <!-- 选项卡内容块 -->
          <div class="tab-content">
            <!-- <NormalQuest></NormalQuest> -->
            <transition v-if="curractiveIndex==0">
              <div class="main-block">
                <div class="block-left">
                  <NormalQuest></NormalQuest>
                </div>
                <div class="block-center">
                  <systemsControl></systemsControl>
                </div>
                <div class="block-right">
                  <equipControe></equipControe>
                </div>
              </div>
            </transition>
            <transition v-if="curractiveIndex==1">
              <div class="main-block">
                <cyclicTask></cyclicTask>
              </div>
            </transition>
            <transition v-if="curractiveIndex==2">
              <div class="main-block">
                <WeeklyTasks></WeeklyTasks>
              </div>
            </transition>
            <transition v-if="curractiveIndex==3">
              <div class="main-block">
                <SpecialDate></SpecialDate>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="es6">
import commontHeader from '../commontHeader'
import NormalQuest from './NormalQuest'
import equipControe from './equipControe'
import systemsControl from './systemsControl'
import cyclicTask from './cyclicTask'
import WeeklyTasks from './WeeklyTasks'
import SpecialDate from './SpecialDate'


export default {
  data() {
    return {
      currentPageName: '定时任务',
      tabsItemName: [" 普通任务", "循环任务", "每周任务安排", "特殊日期安排"],
      curractiveIndex: 0
    }
  },
  methods: {
    select(index) {
      this.curractiveIndex = index
    },
  },
  components: {
    commontHeader,
    NormalQuest,
    equipControe,
    systemsControl,
    cyclicTask,
    WeeklyTasks,
    SpecialDate
    // navList
  },
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
    .tab-content {
      border: 1px solid rgba(255, 255, 255, .15);
      clear: both;
      @include absoluteWH(auto, auto);
      @include trbl(29px, 0, 0, 0);
      .main-block {
        @include absoluteWH(auto, auto);
        @include trbl(0, 0, 0, 0);
        .block-left {
          @include absoluteWH(auto, auto);
          @include trbl(0, 70%, 0, 0);
        }
        .block-center {
          @include absoluteWH(auto, auto);
          @include trbl(0, 30%, 0, 30%);
        }
        .block-right {
          @include absoluteWH(auto, auto);
          @include trbl(0, 0, 0, 70%);
        }
      }
    }
  }
}
</style>
