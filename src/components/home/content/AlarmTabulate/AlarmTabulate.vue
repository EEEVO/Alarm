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
        <div class="contentBodyInAn">
          <!-- 操作按钮 -->
          <div class="btn-block">
            <button class="btn" @click="saveData()">
              <i class="iconfont icon-baocun"></i>保存
            </button>
            <button class="btn" @click="remove()">
              <i class="iconfont icon-shanchu"></i>删除
            </button>
            <button class="btn" @click="add()">
              <i class="iconfont icon-tianjia"></i>添加</button>
          </div>
          <div class="clear"></div>
          <ul class="nav-tabList">
            <li v-for="(item,index) of tabsItemName" :key="index" :class="{active:curractiveIndex==index}" @click="select(index)">{{tabsItemName[index]}}</li>
          </ul>
          <peopleMsg v-if="curractiveIndex==0" ref="peopleMsg"></peopleMsg>
          <equipGroup v-if="curractiveIndex==1" ref="equipGroup"></equipGroup>
          <almReport v-if="curractiveIndex==2" ref="almReport"></almReport>
          <weekAlrReport v-if="curractiveIndex==3" ref="weekAlrReport"></weekAlrReport>
          <speAlmReport v-if="curractiveIndex==4" ref="speAlmReport"></speAlmReport>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="es6">
import commontHeader from '../commontHeader'
import peopleMsg from './peopleMsg'
import almReport from './almReport'
import weekAlrReport from './weekAlrReport'
import speAlmReport from './speAlmReport'
import equipGroup from './equipGroup'

export default {
  data() {
    return {
      currentPageName: '报警排表',
      tabsItemName: ["人员信息", "设备监控分组", "管理范围", "周排表", "特定日期排表"],
      curractiveIndex: 0,
      // AlarmSubmitStatus: 
    }
  },
  methods: {
    // 节点的点击回调，获取当前点击的时间对象yyyy-MM-dd
    getDate(date) {
      console.log("111");
      console.log(date);
    },
    select(index) {
      this.curractiveIndex = index
    },
    saveData() {
      switch (this.curractiveIndex) {
        case 0:
          this.$refs.peopleMsg.saveData()
          break;
        case 1:
          this.$refs.equipGroup.saveData()
          break;
        case 2:
          this.$refs.almReport.saveData()
          break;
        case 3:
          this.$refs.weekAlrReport.saveData()
          break;
        case 4:
          this.$refs.speAlmReport.saveData()
          break;
        default:
          console.log("请重新保存");
          break;
      }
    },
    // 增加新行
    add() {
      // debugger
      // const childComponents = ["peopleMsg", "equipGroup", "almReport", "weekAlrReport", "speAlmReport"]
      // this.$refs.childComponents[this.curractiveIndex].addTr()
      switch (this.curractiveIndex) {
        case 0:
          this.$refs.peopleMsg.addTr()
          break;
        case 1:
          this.$refs.equipGroup.addTr()
          break;
        case 2:
          this.$refs.almReport.addTr()
          break;
        case 3:
          this.$refs.weekAlrReport.addTr()
          break;
        case 4:
          this.$refs.speAlmReport.addTr()
          break;
        default:
          console.log("添加失败");
          break;
      }
    },
    remove() {
      this.$store.commit("AlarmModelStatus")
    }
  },
  components: {
    commontHeader,
    peopleMsg,
    almReport,
    weekAlrReport,
    speAlmReport,
    equipGroup
    // navList
    // Vue2DataPicker
  },
  watch: {
    AlarmSubmitStatus() {
      if (this.AlarmSubmitStatus) {
        switch (this.curractiveIndex) {
          case 0:
            this.$refs.peopleMsg.deleteTr()
            break;
          case 1:
            this.$refs.equipGroup.deleteTr()
            break;
          case 2:
            this.$refs.almReport.deleteTr()
            break;
          case 3:
            this.$refs.weekAlrReport.deleteTr()
            break;
          case 4:
            this.$refs.speAlmReport.deleteTr()
            break;
          default:
            console.log("添加失败");
            break;
        }
      }
      this.$store.commit("AlarmModalSubmitStatus", false)
    }
  },
  computed: {
    AlarmSubmitStatus() {
      return this.$store.state.AlarmSubmitStatus
    }
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
      .btn-block {
        float: right;
        .btn {
          background-color: rgba(50, 219, 1, 0.3);
          &:hover {
            background-color: rgba(50, 219, 1, 0.6);
            color: #fff;
            box-shadow: 0 0 2rem 0.5rem rgba(50, 219, 1, 0.3);
          }
        }
      }
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
