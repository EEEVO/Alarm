<template>
  <div>
    <div class="sysbtn">
      <button @click="requestData()">
        <i class="iconfont icon-chaxun"></i>
        查询
      </button>
      <button @click="configuration()">
        <i class="iconfont icon-xujicanshupeizhi"></i>
        配置
      </button>
    </div>
    <div class="clear"></div>
    <ul class="nav-tabList">
      <li v-for="(item,index) of tabsItemName" :key="index" :class="{active:curractiveIndex==index}" @click="select(index)">{{tabsItemName[index]}}</li>
    </ul>
    <div class="tab-content">
      <article v-if="curractiveIndex===0" id="tableYcp" class="tab-pane animated active fadeIn">
        <div class="tableAuto alarmReal">
          <table id="tableYcpID">
            <thead>
              <tr>
                <th>设备号</th>
                <th>设备名称</th>
                <th>关联界面</th>
                <th>关联视频</th>
                <th>资产编号</th>
                <th>预案号</th>
                <th>显示报警</th>
                <th>记录报警</th>
                <th>Email报警</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item,index) of tableName[0].value">
                <tr class="showtr">
                  <td>
                    <i class="iconfont icon-jia"></i>
                    {{item.equip_no}}
                  </td>
                  <td>{{item.equip_nm}}</td>
                  <td>{{item.related_pic}}</td>
                  <td>{{get_related_video(item.related_video)}}</td>
                  <td>{{item.ZiChanID}}</td>
                  <td>{{item.PlanNo}}</td>
                  <td>
                    <input type="checkbox" :checked="alarmSchemes(item,1)">
                  </td>
                  <td>
                    <input type="checkbox" :checked="alarmSchemes(item,2)">
                  </td>
                  <td>
                    <input type="checkbox">
                  </td>
                  <!-- 这里是我的弹出块 -->
                </tr>
                <tr class="hiddentd">
                  <td colspan="9">
                    <div class="listStyle">
                      <ul>
                        <li>
                          <b>设备属性 :</b>
                          {{item.detail}}
                        </li>
                        <li>
                          <b>通讯刷新周期 :</b>
                          {{item.acc_cyc}}
                        </li>
                        <li>
                          <b>通故障处理意见 :</b>
                          {{item.proc_advice}}
                        </li>
                        <li>
                          <b>故障提示 :</b>
                          {{item.out_of_contact}}
                        </li>
                        <li>
                          <b>故障恢复提示 :</b>
                          {{item.contacted}}
                        </li>
                        <li>
                          <b>报警声音文件 :</b>
                          {{item.event_wav}}
                        </li>
                        <li>
                          <b>驱动文件 :</b>
                          {{item.communication_drv}}
                        </li>
                        <li>
                          <b>通讯端口 :</b>
                          {{item.local_addr}}
                        </li>
                        <li>
                          <b>设备地址 :</b>
                          {{item.equip_addr}}
                        </li>
                        <li>
                          <b>通讯参数 :</b>
                          {{item.communication_param}}
                        </li>
                        <li>
                          <b>通讯时间参数 :</b>
                          {{item.communication_time_param}}
                        </li>
                        <li>
                          <b>报警升级周期（分钟）:</b>
                          {{item.AlarmRiseCycle}}
                        </li>
                        <li>
                          <b>模板设备号 :</b>
                          {{item.raw_equip_no}}
                        </li>
                        <li>
                          <b>附表名称:</b>
                          {{item.tabname}}
                        </li>
                        <li>
                          <b>属性:</b>
                          {{item.attrib}}
                        </li>
                        <li>
                          <b>安全时段:</b>
                          {{item.SafeTime}}
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </article>
      <article v-else-if="curractiveIndex===1" id="tableYxp" class="tab-pane animated active fadeIn">
        <div class="tableAuto alarmReal">
          <table id="tableYxpID">
            <thead>
              <tr>
                <th>设备号</th>
                <th>模拟量编号</th>
                <th>模拟量名称</th>
                <th>下限值</th>
                <th>回复下限值</th>
                <th>回复上限值</th>
                <th>上限值</th>
                <th>单位</th>
                <th>关联页面</th>
                <th>关联视频</th>
                <th>资产编号</th>
                <th>预案号</th>
                <th>曲线记录</th>
                <th>显示报警</th>
                <th>记录报警</th>
                <th>Email报警</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) of tableName[1].value" :key="index">
                <td>
                  <i class="iconfont icon-jia"></i>
                  {{item.equip_no}}
                </td>
                <td>{{item.equip_nm}}</td>
                <td>{{item.related_pic}}</td>
                <td>{{get_related_video(item.related_video)}}</td>
                <td>{{item.ZiChanID}}</td>
                <td>{{item.PlanNo}}</td>
                <td>
                  <input type="checkbox" :checked="alarmSchemes(item,1)">
                </td>
                <td>
                  <input type="checkbox" :checked="alarmSchemes(item,2)">
                </td>
                <td>
                  <input type="checkbox">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
      <article v-else-if="curractiveIndex===2" id="tableSet" class="tab-pane animated active fadeIn">
        <div class="tableAuto alarmReal">
          <table id="tableSetID">
            <thead>
              <tr>
                <th>设备号</th>
                <th>状态量编号</th>
                <th>状态量名称</th>
                <th>0-1事件</th>
                <th>1-0事件</th>
                <th>关联页面</th>
                <th>关联视频</th>
                <th>资产编号</th>
                <th>预案号</th>
                <th>显示报警</th>
                <th>记录报警</th>
                <th>Email报警</th>
              </tr>
            </thead>
          </table>
        </div>
      </article>
      <article v-else-if="curractiveIndex===3" id="SetParm" class="tab-pane animated active fadeIn">
        <div class="tableAuto alarmReal">
          <table id="SetParmID">
            <thead>
              <tr>
                <th>设备号</th>
                <th>设置号</th>
                <th>设置名称</th>
                <th>设置类型</th>
                <th>操作命令</th>
                <th>操作参数</th>
                <th>记录</th>
                <th>动作</th>
                <th>值</th>
                <th>是否可执行</th>
              </tr>
            </thead>
          </table>
        </div>
      </article>
    </div>
  </div>
</template>

<script type="es6">
export default {
  props: ['equipNo', 'QueryTableData'],
  data() {
    return {
      tabsItemName: ["设备配置", "模拟量配置", "状态量配置", "设置配置"],
      curractiveIndex: 0,
      // 请求的参数名
      tableName: [{
        name: 'Equip',
        value: ''
      }, {
        name: 'ycp',
        value: ''
      }, {
        name: 'yxp',
        value: ''
      }, {
        name: 'SetParm',
        value: ''
      }],
      // equip_no_list: "",
      queryTableData: '',
      EquipData: '',
      ycpData: '',
      yxpData: '',
      SetParmData: '',
      equip_no_list: ""
    }
  },
  watch: {
    equipNo() {
      console.log("3");
      this.equip_no_list = this.equipNo.join(",");
      this.getArgument();
    }
  },
  methods: {
    get_related_video(item) {
      for (let i of this.QueryTableData[1].value) {
        if (item == this.QueryTableData[1].name) {
          item = i
          return item
        }
      }
    },
    // 获得资产名称
    get_ZiChanID(item) {
      for (let i of this.QueryTableData[2].value) {
        if (item == i.ZiChanID) {
          item = i.ZiChanName
        }
      }
    },
    // 是否显示报警
    alarmSchemes(item, index) {
      if ((item.alarm_scheme & index) > 0) {
        return true
      } else {
        return false
      }
    },
    select(index) {
      this.curractiveIndex = index
    },

    // 查询事件
    requestData() {
      console.log("1");
      this.$emit("get-equipno")
    },
    getArgument() {
      console.log("4。发送请求");
      for (let item of this.tableName) {
        this.$http.post(`${this.$store.state.urlCommon}GetSystemConfig`, {
          table_name: item.name,
          equip_no_list: this.equip_no_list
        }).then((res) => {
          item.value = JSON.parse(res.data.d)
          console.log(JSON.parse(res.data.d));
        })
      }
    },
    // 配置事件
    configuration() {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin.scss';

@mixin trtdhover {
  &:nth-child(odd) {
    background: rgba(0, 0, 0, .13);
    border-top: 1px solid rgba(255, 255, 225, .15);
    border-bottom: 1px solid rgba(255, 255, 225, .15);
  }
  &:nth-child(even) {
    background-color: transparent;
  }
  &:hover {
    background: rgba(255, 255, 255, .2)!important;
  }
}

.sysbtn {
  float: right;
  button {
    @include btn( rgba(50, 219, 1, 0.3), rgba(50, 219, 1, 0.6));
    padding: 6px 12px;
    position: static;
    &:hover {
      box-shadow: 0 0 2rem 0.5rem rgba(50, 219, 1, 0.3);
    }
  }
}

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
  @include trbl(60px, 0, 0, 12px);
  .tab-pane {
    @include absoluteWH(auto, auto);
    @include trbl(0, 0, 0, 0);
    .tableAuto {
      overflow: auto;
      @include absoluteWH(auto, auto);
      @include trbl(0, 0, 0, 0);
      table {
        background: rgba(0, 0, 0, .15);
        border: 1px solid rgba(255, 255, 225, .15);
        width: 100%;
        text-align: left;
        white-space: nowrap;
        border-collapse: collapse;
        thead {
          tr {
            background: rgba(0, 0, 0, .43);
            th {
              border: 1px solid rgba(255, 255, 225, .15);
              padding: 8px 10px;
              border-top: none;
              text-align: left;
            }
          }
        }
        tbody {
          .showtr {
            transition: all 300ms linear 0s;
            @include trtdhover;
            td {
              border: 1px solid rgba(255, 255, 225, .15);
              padding: 8px 10px;
              &:first-child,
              input {
                cursor: pointer;
              }
            }
          }
          .hiddentd {
            background: rgba(0, 0, 0, .13)!important;
            td {
              padding: 0!important;
              div {
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
                    @include trtdhover;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>


