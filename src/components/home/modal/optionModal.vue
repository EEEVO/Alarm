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
            <article v-if="curractiveIndex==0">
              <div id="commonlyList_Equip" v-if="!advancedConfigStatus[curractiveIndex]">
                <!-- TODO:此处好像不能用虚标签做状态切换 -->
                <div class="system_plug_list">
                  <div class="listStyle">
                    <ul>
                      <li v-for="(item,index) of tableItemName[curractiveIndex].value" :key="index" @click="currentLiIndex=index" :class="{active:currentLiIndex==index}">{{item.equip_nm}}</li>
                    </ul>
                  </div>
                </div>
                <div class="system_plug_Data">
                  <div class="sys_plug_ul_height_1">
                    <ul>
                      <li>
                        <span>设备号：</span>
                        <b>{{tableItemName[curractiveIndex].value[currentLiIndex].equip_no}}</b>
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>设备名称：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].equip_nm">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>关联页面：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].related_pic">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>关联视频：</span>
                        <select name="" id="">
                          <!-- <option v-for="(item,index) of QueryTableData[2].value" :key="index">{{item.ZiChanID}}</option> -->
                        </select>
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>资产编号：</span>
                        <select v-model="tableItemName[curractiveIndex].value[currentLiIndex].ZiChanName">
                          <option v-for="(item,index) of QueryTableData[2].value" :key="index" :value="item.ZiChanName">{{item.ZiChanName}}</option>
                        </select>
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>预案号：</span>
                        <select v-model="tableItemName[curractiveIndex].value[currentLiIndex].PlanNo">
                          <option v-for="(item,index) of QueryTableData[3].value" :key="index" :value="item.PlanNo">{{item.PlanNo}}</option>
                        </select>
                        <div class="clear"></div>
                      </li>
                    </ul>
                  </div>
                  <div class="sys_plug_ul_height_2">
                    <ul>
                      <li>
                        <span>显示报警：</span>
                        <input type="checkbox" :checked="alarmSchemes(tableItemName[curractiveIndex].value[currentLiIndex].alarm_scheme,1)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>记录报警：</span>
                        <input type="checkbox" :checked="alarmSchemes(tableItemName[curractiveIndex].value[currentLiIndex].alarm_scheme,2)">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <!-- TODO:不确定判断字段 -->
                        <span>Eamil报警</span>
                        <input type="checkbox">
                        <div class="clear"></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="system_plug_botton">
                  <p>
                    <span>配置更多属性，请单击</span>
                    <button class="advancedSetparm" @click="advancedConfigUpdata()">
                      高级配置
                    </button>
                  </p>
                </div>
              </div>
              <!-- 高级配置页面 -->
              <div id="advancedList_Equip" v-if="advancedConfigStatus[curractiveIndex]">
                <div class="system_plug_Data">
                  <div class="listStyle">
                    <ul>
                      <li>
                        <span>设备属性：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].detail">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>通讯刷新周期：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].acc_cyc">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>通故障处理意见：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].proc_advice">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>故障提示：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].out_of_contact">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>故障恢复提示：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].contacted">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>报警声音文件：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].event_wav">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>驱动文件：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].communication_drv">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>通讯端口：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].local_addr">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>设备地址：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].equip_addr">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>通讯参数：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].communication_param">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>通讯时间参数：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].communication_time_param">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>报警升级周期（分钟）：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].AlarmRiseCycle">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>模板设备号：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].raw_equip_no">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>附表名称：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].tabname">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>属性：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].attrib">
                        <div class="clear"></div>
                      </li>
                      <li>
                        <span>安全时段：</span>
                        <input type="text" v-model="tableItemName[curractiveIndex].value[currentLiIndex].SafeTime">
                        <div class="clear"></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="system_plug_botton">
                  <p>
                    <button @click="advancedConfigUpdata()">返回</button>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </template>
      <!-- 底部的确定，取消按钮啥的 -->
      <p class="MessageBox_p3">
        <button>确定</button>
        <button>取消</button>
        <button @click="onUsingModals()">应用</button>
      </p>
    </div>
  
  </div>
</template>

 <script type="es6">

export default {
  props: ["optionModelData"],
  data() {
    return {
      // 设备配置页面 选中的设备index
      currentLiIndex: 0,
      // nav
      navName: ["设备配置", "模拟量配置", "状态量配置", "设置配置"],
      // 每一块内的高级页面状态数组
      advancedConfigStatus: [false, false, false, false],
      // 当前选中的index
      curractiveIndex: 0,
      tableItemName: this.optionModelData,
      equipData: '',
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
    }
  },
  created() {
    this.getQueryTableData()
  },
  methods: {
    // 应用按钮单机事件
    onUsingModals() {

    },
    // 更改当前选项卡高级配置页面状态
    advancedConfigUpdata() {
      let Tem = this.advancedConfigStatus[this.curractiveIndex];
      this.$set(this.advancedConfigStatus, this.curractiveIndex, !Tem);
    },
    select(param) {
      this.curractiveIndex = param
    },
    exitModel() {
      this.$store.commit("optionModalStatus")
      this.$store.commit("updatequeryEquip")
    },
    getEquip(param) {
      this.currentLiIndex
      this.equipData = param
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
          // console.log(JSON.parse(res.data.d));
          item.value = JSON.parse(res.data.d);
        })
      }
    }
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
                    input {
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
                    select {
                      background: rgba(255, 255, 255, .2);
                      border: 1px solid rgba(255, 255, 255, .4);
                      color: #FFF;
                      transition: all 300ms linear 0s;
                      padding: 5px 10px;
                      outline: 0;
                      float: left;
                      width: 195px!important;
                      display: block;
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
                    input {
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
                    select {
                      background: rgba(255, 255, 255, .2);
                      border: 1px solid rgba(255, 255, 255, .4);
                      color: #FFF;
                      transition: all 300ms linear 0s;
                      padding: 5px 10px;
                      outline: 0;
                      float: left;
                      width: 195px!important;
                      display: block;
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


