<template>
  <div class="fullScreenPopup">
    <div class="fullScreenAll"></div>
    <div class="fullScreenCenter">
      <!-- 头部title -->
      <div class="MessageBox_top">
        <span>配置</span>
        <button class="MessageBox_top_Exit" @click="exitModel()">
          <i class="iconfont icon-guanbi"></i>
        </button>
      </div>
      <!-- 中间的内容操作块 -->
      <template>
        <div class="system_plug">
          <ul class="nav-tabList">
            <li v-for="(item,index) of tableItemName" :key="index" :class="{active:curractiveIndex==index}" @click="select(index)">{{navName[index]}}</li>
          </ul>
          <div class="tab-content">
            <equip class="setparm" v-show="curractiveIndex==0" :equip-no-arr-a="tableItemName[curractiveIndex]" :table-item-name="tableItemName" :curractive-index="curractiveIndex" :query-table-data="QueryTableData" @getJsonChangeArr="getJsonChangeArr"></equip>
            <ycp class="setparm" v-show="curractiveIndex==1" :equip-no-arr-a="equipNoArr" :table-item-name="tableItemName" :curractive-index="curractiveIndex" :query-table-data="QueryTableData" @getJsonChangeArr="getJsonChangeArr"></ycp>
            <yxp class="setparm" v-show="curractiveIndex==2" :equip-no-arr-a="equipNoArr" :table-item-name="tableItemName" :curractive-index="curractiveIndex" :query-table-data="QueryTableData" @getJsonChangeArr="getJsonChangeArr"></yxp>
            <setparm class="setparm" v-show="curractiveIndex==3" :equip-no-arr-a="equipNoArr" :table-item-name="tableItemName" :curractive-index="curractiveIndex" @getJsonChangeArr="getJsonChangeArr"></setparm>
          </div>
        </div>
      </template>
      <!-- 底部的确定，取消按钮啥的 -->
      <p class="MessageBox_p3">
        <button @click="confirm()">确定</button>
        <button @click="exitModel()">取消</button>
        <button @click="onUsingModals()">应用</button>
      </p>
    </div>
  </div>
</template>

 <script type="es6">
import equip from './optionModal/equip.vue'
import setparm from './optionModal/SetParm'
import yxp from './optionModal/yxp'
import ycp from './optionModal/ycp'

Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

export default {
  props: ["optionModelData"],
  data() {
    return {
      // 设备配置页面 选中的设备index
      currentLiIndex: 0,
      // nav
      navName: ["设备配置", "模拟量配置", "状态量配置", "设置配置"],
      // 当前选中的index
      curractiveIndex: 0,
      tableItemName: this.optionModelData,
      equipNoArr: [],
      QueryTableData: [{
        name: "AlarmProc",
        value: ''
      }, {
        name: "GW_VideoInfo",
        value: ''
      }, {
        name: "GWZiChanTable",
        value: ''
      }, {
        name: "GWPlan",
        value: ''
      }],
      newJsonChange: [[], [], [], []]
    }
  },
  created() {
    this.getQueryTableData()
  },
  methods: {
    // 获取子组件传过来的数据
    getJsonChangeArr(data) {
      for (let item of this.newJsonChange[this.curractiveIndex]) {
        if (item.id == data.id && item.SetParm_ID == data.SetParm_ID && item.listName == data.listName) {
          item.vlaue = data.vlaue
          return
        }
      }
      this.newJsonChange[this.curractiveIndex].push(data)
    },
    // 确认按钮事件
    confirm() {
      this.exitModel();
      this.onUsingModals();
    },
    // TODO:更改设备名称后列表名称没有跟着修改
    // 应用按钮单机事件
    onUsingModals() {
      const urlArr = ["SystemEquipChange", "SystemYcpChange", "SystemYxpChange", "SystemSetParmChange"];
      for (let index = 0, arrLength = urlArr.length; index < arrLength; index++) {
        console.log(JSON.stringify(this.newJsonChange[index]));
        this.$http.post(`${this.$store.state.urlCommon}${urlArr[index]}`, {
          jsonChange: JSON.stringify(this.newJsonChange[index])
        }).then((res) => {
          if (res.data.d == "true") {
            console.log(this.navName[index] + "，修改成功");
          }
          else if (res.data.d == "false") {
            console.log(this.navName[index] + "，未修改成功");
          }
          else {
            console.log(this.navName[index] + "，部分修改成功");
          }
        })
      }
    },
    select(param) {
      this.curractiveIndex = param
      let temEquipNo = this.$store.state.equipNoArr;
      this.equipNoArr = [];
      //遍历获取选中列表的设备信息传入子组件
      temEquipNo.forEach((item_EquipNo) => {
        for (let item_EquipName of this.getEquipName) {
          if (item_EquipNo == item_EquipName.id) {
            this.equipNoArr.push(item_EquipName);
            break
          }
        }
      })
    },
    exitModel() {
      this.$store.commit("optionModalStatus")
      this.$store.commit("updatequeryEquip")
    },
    // 获取关联视频
    get_related_video(item) {
      if (item == this.QueryTableData[1].name) {
        for (let i of this.QueryTableData[1].value) {
          item = i
          return item
        }
      }
    },
    // 是否显示报警
    alarmSchemes(item, index) {
      if ((item & index) > 0) {
        return true
      } else {
        return false
      }
    },
    getQueryTableData() {
      for (let item of this.QueryTableData) {
        this.$http.post(`${this.$store.state.urlCommon}QueryTableData`, {
          tableName: item.name
        }).then((res) => {
          item.value = JSON.parse(res.data.d);
        })
      }
    },
  },
  computed: {
    // 获取设备列表数据
    getEquipName() {
      return this.$store.state.optiontreeData[0].children
    }
  },
  components: {
    setparm,
    yxp,
    ycp,
    equip
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/mixin.scss';

@mixin child-odd {
  background: rgba(0, 0, 0, .13);
  border-top: 1px solid rgba(255, 255, 225, .15);
  border-bottom: 1px solid rgba(255, 255, 225, .15);
}

@mixin comBtn {
  border: none;
  border-radius: 2px;
  padding: 6px 12px;
  box-shadow: inset 0 -2px 0 rgba(0, 0, 0, .05);
  color: #fff;
  font-family: "Microsoft YaHei";
}

.fullScreenPopup {
  @include absoluteWH(100%, 100%);
  position: fixed;
  @include trbl(0, 0, 0, 0);
  background: rgba(0, 0, 0, .6);
  z-index: 100;
  .fullScreenAll {
    position: absolute;
    @include trbl(0, 0, 0, 0);
    z-index: 1;
  }
  .fullScreenCenter {
    top: 10%;
    color: #fff;
    position: relative;
    padding: 20px;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: 0 0;
    text-shadow: 0 1px 5px rgba(0, 0, 0, .25);
    z-index: 2;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .25);
    width: 500px;
    background: url(/static/img/bg_1.jpg);
    .MessageBox_top {
      position: absolute;
      @include trbl(0, 0, auto, 0);
      z-index: 200;
      span {
        display: block;
        float: left;
        padding: 8px 12px;
      }
      .MessageBox_top_Exit {
        background-color: transparent;
        padding: 8px 12px;
        border: none;
        color: #fff;
        cursor: pointer;
        float: right;
        &:hover {
          background-color: rgba(0, 0, 0, .4);
          color: #fff;
        }
      }
    }
    .system_plug {
      height: 350px;
      display: block;
      position: relative;
      margin: 20px 0 0 -20px;
      .nav-tabList {
        list-style: none;
        margin: 0;
        padding-left: 13px;
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
      .tab-content {
        border: 1px solid rgba(255, 255, 255, .15);
        clear: both;
        @include absoluteWH(auto, auto);
        @include trbl(28px, 0, 0, 13px);
        article {
          @include absoluteWH(auto, auto);
          @include trbl(0, 0, 0, 0);
          #commonlyList_Equip {
            .system_plug_list {
              position: absolute;
              @include trbl(0, 66%, 0, 0);
              overflow-y: auto;
              display: block;
              border: 1px solid rgba(255, 255, 225, .15);
              bottom: 35px!important;
              .listStyle {
                ul {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                  white-space: nowrap;
                  li {
                    line-height: 30px;
                    padding: 0 12px;
                    cursor: default;
                    transition: all 300ms linear 0s;
                    &:nth-child(odd) {
                      @include child-odd;
                    }
                    &.active {
                      background: rgba(255, 255, 255, .36)!important;
                    }
                    &:hover {
                      background: rgba(255, 255, 255, .2);
                    }
                  }
                }
                select {
                  background: rgba(255, 255, 255, .2);
                  border: 1px solid rgba(255, 255, 255, .4);
                  color: #FFF;
                  transition: all 300ms linear 0s;
                  padding: 5px 10px;
                  outline: 0;
                  width: 100%;
                  option {
                    background: rgba(0, 0, 0, .9);
                    border-color: rgba(0, 0, 0, .4);
                    color: #FFF;
                  }
                }
                .system_plug_list_lStyle {
                  height: auto;
                  overflow: auto;
                  #treeList_plug_ycp {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    white-space: nowrap;
                    li {
                      line-height: 30px;
                      padding: 0 12px;
                      cursor: default;
                      transition: all 300ms linear 0s;
                      &:nth-child(odd) {
                        background: rgba(0, 0, 0, .13);
                        border-top: 1px solid rgba(255, 255, 225, .15);
                        border-bottom: 1px solid rgba(255, 255, 225, .15);
                      }
                      &:nth-child(even) {
                        background-color: transparent;
                      }
                      &:hover {
                        background: rgba(255, 255, 255, .2);
                      }
                    }
                    .active {
                      background: rgba(255, 255, 255, .36)!important;
                    }
                  }
                }
              }
            }
            .system_plug_Data {
              position: absolute;
              @include trbl(0, 0, 0, 34%);
              display: block;
              bottom: 35px!important;
              .sys_plug_ul_height_1 {
                border: 1px solid rgba(255, 255, 225, .15);
                overflow: auto;
                height: 198px;
                ul {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                  white-space: nowrap;
                  li {
                    line-height: 30px;
                    padding: 0 12px;
                    cursor: default;
                    transition: all 300ms linear 0s;
                    &:nth-child(odd) {
                      @include child-odd;
                    }
                    &:hover {
                      background: none!important;
                    }
                    span {
                      float: left;
                      display: block;
                      min-width: 82px;
                      text-align: right;
                    }
                    input[type="text"],
                    select {
                      background: rgba(255, 255, 255, 0.2);
                      border: 1px solid rgba(255, 255, 255, 0.4);
                      color: #FFF;
                      margin: 0px;
                      padding: 6px 12px;
                      display: block;
                      width: 100%;
                      transition: all 300ms linear 0s;
                      float: left;
                      width: 175px !important;
                      display: block;
                      top: 2px !important;
                    }
                  }
                }
              }
              .sys_plug_ul_height_2 {
                border: 1px solid rgba(255, 255, 225, .15);
                overflow: auto;
                height: 87px;
                ul {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                  white-space: nowrap;
                  li {
                    line-height: 30px;
                    padding: 0 12px;
                    cursor: default;
                    transition: all 300ms linear 0s;
                    &:nth-child(odd) {
                      @include child-odd;
                    }
                    &:hover {
                      background: none!important;
                    }
                    span {
                      float: left;
                      display: block;
                      min-width: 82px;
                      text-align: right;
                    }
                    input {
                      top: 2px!important;
                      cursor: pointer;
                    }
                  }
                }
              }
            }
            .system_plug_botton {
              position: absolute;
              @include trbl(auto, 13px, 0, 13px);
              p {
                margin: 3px 0;
                text-align: right;
                button {
                  @include comBtn;
                  background-color: rgba(50, 219, 1, 0.3);
                  &:hover {
                    background-color: rgba(50, 219, 1, 0.6);
                    color: #fff;
                    box-shadow: 0 0 2rem 0.5rem rgba(50, 219, 1, 0.3);
                  }
                }
              }
            }
          }
          #advancedList_Equip {
            .system_plug_Data {
              position: absolute;
              left: 0;
              top: 0;
              right: 0;
              bottom: 0;
              display: block;
              bottom: 35px!important;
              overflow: auto;
              .listStyle {
                ul {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                  white-space: nowrap;
                  li {
                    line-height: 30px;
                    padding: 0 12px;
                    cursor: default;
                    transition: all 300ms linear 0s;
                    &:nth-child(odd) {
                      @include child-odd;
                    }
                    &:hover {
                      background: rgba(255, 255, 255, .2);
                    }
                    span {
                      float: left;
                      display: block;
                      min-width: 182px;
                      text-align: right;
                    }
                    input[type="text"],
                    select {
                      background: rgba(255, 255, 255, .2);
                      border: 1px solid rgba(255, 255, 255, .4);
                      color: #FFF;
                      margin: 0px;
                      padding: 6px 12px;
                      display: block;
                      width: 100%;
                      transition: all 300ms linear 0s;
                      float: left;
                      width: 195px!important;
                      display: block;
                      top: 2px!important;
                    }
                  }
                }
              }
            }
            .system_plug_botton {
              position: absolute;
              @include trbl(auto, 13px, 0, 13px);
              p {
                margin: 3px 0;
                text-align: right;
                button {
                  @include comBtn;
                  background-color: rgba(50, 219, 1, 0.3);
                  &:hover {
                    background-color: rgba(50, 219, 1, 0.6);
                    color: #fff;
                    box-shadow: 0 0 2rem 0.5rem rgba(50, 219, 1, 0.3);
                  }
                }
              }
            }
          }
        }
        .setparm {
          @include absoluteWH(auto, auto);
          @include trbl(0, 0, 0, 0);
        }
        .active {
          display: block;
        }
      }
    }
    .MessageBox_p3 {
      text-align: right;
      button {
        @include comBtn;
        background: rgba(0, 0, 0, .3);
        margin-right: 10px;
        padding-left: 15px;
        padding-right: 15px;
        font-size: 14px;
        &:hover {
          background: rgba(0, 0, 0, .4);
          color: #fff;
        }
      }
    }
  }
}
</style>


