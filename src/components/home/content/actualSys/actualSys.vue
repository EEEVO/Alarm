<template>
  <div>
    <commontHeader :current-page-name="currentPageName"></commontHeader>
    <div class="contents">
      <div class="contentHeader">
        <span>
          <i class="iconfont icon-kuaizhao"></i>
          {{currentPageName}}
        </span>
      </div>
      <div class="contentBody">
        <div class="contentBodyInAn Slide-in-topSlow">
          <!--条件选择栏-->
          <div class="inforbtnList">
            <button v-for="(item,index) of btnInfo" :key="index" :checkBtn="item.btnStatus" @click="checkCondition(index)" :class="{btn:item.btnStatus,btnNo:!item.btnStatus}">
              <img :src="item.bgName">
              <span>{{item.spanName}}</span>
              <b class="badge">{{eventCountMsg[index]}}</b>
            </button>
          </div>
          <div class="actualbody">
            <div class="tableAuto">
              <table id="tableAct">
                <thead>
                  <tr>
                    <th>类型</th>
                    <th>时间</th>
                    <th>事件</th>
                    <th>确认</th>
                    <th>处理意见</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) of tableInfo" :key="index">
                    <td>
                      <img :src="imgToken(item.类型)">
                    </td>
                    <td>{{item.时间}}</td>
                    <td>{{item.事件}}</td>
                    <td>
                      <button v-if="item.确认=='False'" class="btn" @click="updataModalMsg(item)">请确认</button>
                      <i v-else class="iconfont icon-queren"></i>
                    </td>
                    <td>{{item.处理意见}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--table弹出的模态框-->
    <!--TODO:这里因为fullScreenPopup的遮罩层导致里面的transition动画效果未出现-->
    <div class="fullScreenPopup" v-if="modalBoxStatus">
      <div class="fullScreenAll"></div>
      <transition name="numList" enter-active-class="bounceInDown  animated" leave-active-class="fadeOut animated">
        <modalBox v-if="modalBoxStatus" @child="updataModal" :modal-box-info="modalBoxInfo" :ator-info="atorMsg"></modalBox>
      </transition>
    </div>
  </div>
</template>

<script type="es6">
import commontHeader from '../commontHeader'
import modalBox from './modalBox'

export default {
  data() {
    return {
      currentPageName: '实时快照',
      event_Level_list: '',
      eventCountMsg: [0, 0, 0, 0, 0],
      btnInfo: [{
        bgName: "/static/infor/Fatal.png",
        spanName: "故障",
        btnStatus: true
      }, {
        bgName: "/static/infor/Warn.png",
        spanName: "警告",
        btnStatus: true
      }, {
        bgName: "/static/infor/Info.png",
        spanName: "信息",
        btnStatus: true
      }, {
        bgName: "/static/infor/SetParm.png",
        spanName: "设置",
        btnStatus: true
      }, {
        bgName: "/static/infor/ZiChan.png",
        spanName: "资产",
        btnStatus: true
      }],
      tableInfo: '',

      // 模态框所用数据
      modalBoxInfo: '',
      modalBoxStatus: false,
      // 短信号码名单
      atorMsg: ''
    }
  },
  methods: {

    updataModalMsg(param) {
      console.log(param);
      this.modalBoxInfo = param
      this.updataModal()
    },
    updataModal() {
      this.modalBoxStatus = !this.modalBoxStatus
    },
    imgToken(param) {
      let arrtem = this.event_Level_list.split(';');
      for (let i = 0; i < arrtem.length; i++) {
        if (arrtem[i] == "" || typeof (arrtem[i]) == "undefined") {
          arrtem.splice(i, 1);
          i = i - 1;
        }
        arrtem[i] = arrtem[i].split(',');
        for (var m = 0; m < arrtem[i].length; m++) {
          let element = arrtem[i][m];
          if (param === element) {
            return this.btnInfo[i].bgName
          }
        }
      }
    },

    checkCondition(param) {
      this.btnInfo[param].btnStatus = !this.btnInfo[param].btnStatus
      this.postGetRealTimeEvent().then((res) => {
        this.tableInfo = JSON.parse(res.data.d);
      })
    },
    /**
     * 获取报警数据
     */
    GetAlarmConfig() {
      return new Promise((resolve, reject) => {
        this.$http.post(`${this.$store.state.urlCommon}GetAlarmConfig`, {
          userName: window.localStorage.userName
        }).then((res) => {
          const arr_data = JSON.parse(res.data.d)
          for (let index = 0; index < arr_data.length; index++) {
            // debugger
            let element = arr_data[index];
            let min = parseInt(element.SnapshotLevelMin);
            let max = parseInt(element.SnapshotLevelMax);
            for (let index = min; index <= max; index++) {
              this.event_Level_list += `${index.toString()},`
            }
            if (this.event_Level_list.endsWith(',')) {
              this.event_Level_list = this.event_Level_list.substring(0, this.event_Level_list.length - 1);
              this.event_Level_list += ";"
            }
          }
          //好像得在这里写
          // TODO:这里不知道能不能拿到
          resolve("第一个回调函数跑完")
        })
      })
    },

    /**
     * 获取系统的实时快照（事件）各个消息类型的总数
     */
    SysEvtCounts() {
      // console.log(this.$http.all());
      this.$http.all([this.postGetRealTimeEventCount(), this.postGetRealTimeEvent(), this.postAtorData()])
        .then(this.$http.spread((eventCountMsg, perms, atorMsg) => {
          // 处理消息总数
          this.eventCountMsg = eventCountMsg.data.d.split(",")
          // 处理table数据
          this.tableInfo = JSON.parse(perms.data.d);
          // 处理短信数据，为模态框提供
          this.atorMsg = JSON.parse(atorMsg.data.d);
        }));
    },

    postGetRealTimeEventCount() {
      return this.$http.post(`${this.$store.state.urlCommon}GetRealTimeEventCount`, {
        event_Level_list: this.event_Level_list,
        equip_no_list: this.Browse_Equip_List_Get()
      })
    },
    postAtorData() {
      return this.$http.post(`${this.$store.state.urlCommon}QueryTableData`, {
        tableName: "Administrator"
      })
    },
    postGetRealTimeEvent() {
      return this.$http.post(`${this.$store.state.urlCommon}GetRealTimeEvent`, {
        event_Level_list: this.btnTobool(),
        // 此参数有误
        equip_no_list: this.Browse_Equip_List_Get()
      })
    },

    /**
     * 通过按钮状态组合查询参数
     */
    btnTobool() {
      let arrtem = this.event_Level_list.split(';');
      for (let i = 0; i < arrtem.length; i++) {
        if (arrtem[i] == "" || typeof (arrtem[i]) == "undefined") {
          arrtem.splice(i, 1);
          i = i - 1;
        }
      }
      let result = '';
      for (let index = 0; index < this.btnInfo.length; index++) {
        let element = this.btnInfo[index];
        if (element.btnStatus) {
          result += `${arrtem[index]},`
        }
      }
      result = result.substring(0, result.length - 1);
      return result
    },
    /**
     * 查询用户可查看设备
     */
    Browse_Equip_List_Get() {
      let equipList = '';
      if (this.$store.state.getWebUser.IsAdministrator != true) {
        //TODO:没有遇到没有权限过的账号
      } else {
        equipList = "";
      }
      return equipList
    }
  },
  created() {
    this.GetAlarmConfig().then((value) => {
      console.log(value);
      this.SysEvtCounts();
    })
  },
  components: {
    commontHeader,
    modalBox
  },
}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin.scss';
.contents {
  /*width: auto;
  height: auto;
  position: absolute;*/
  @include absoluteWH(auto, auto);
  /*left: 0px;
  top: 40px;
  bottom: 0;
  right: 0px;*/
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
    /*width: auto;
    height: auto;
    position: absolute;*/
    /*left: 0px;
    top: 34px;
    bottom: 13px;
    right: 0px;*/
    @include absoluteWH(auto, auto);
    @include trbl(34px, 0, 13px, 0);
    background: rgba(0, 0, 0, .18)!important;
    border: 1px solid rgba(0, 0, 0, .13)!important;
    .contentBodyInAn {
      /*width: auto;
      height: auto;*/
      /*left: 13px;
      top: 13px;
      bottom: 13px;
      right: 13px;*/
      // position: absolute;
      @include absoluteWH(auto, auto);
      @include trbl(13px, 13px, 13px, 13px);
      /* 条件选择栏*/
      .inforbtnList {
        button {
          img {
            /*width: 32px;
            height: 32px;
            position: absolute;*/
            /*left: 6px;
            top: 6px;*/
            @include absoluteWH(32px, 32px);
            @include trbl(6px, auto, auto, 6px);
          }
          span {
            padding-left: 30px;
          }
          .badge {
            background: rgba(0, 0, 0, 0.3);
            color: #fff;
            padding: 3px 7px;
            font-size: 12px;
            font-weight: 700;
            border-radius: 10px;
            white-space: nowrap;
            text-align: center;
            margin-left: 6px;
          }
        }
        .btn {
          @include btn(rgba(125, 191, 255, .3), rgba(125, 191, 255, .4));
        }
        .btnNo {
          @include btn(rgba(0, 0, 0, .3), rgba(0, 0, 0, .4));
        }
      }
      /* table块*/
      .actualbody {
        /*width: auto;
        height: auto;
        position: absolute;*/
        @include absoluteWH(auto, auto);
        /*left: 0;
        top: 44px;
        right: 0;
        bottom: 0;*/
        @include trbl(44px, 0, 0, 0);
        .tableAuto {
          overflow: auto;
          /*width: auto;
          height: auto;
          position: absolute;*/
          @include absoluteWH(auto, auto);
          /*left: 0;
          top: 0;
          right: 0;
          bottom: 0;*/
          @include trbl(0, 0, 0, 0);
          table {
            background: rgba(0, 0, 0, .15);
            border: 1px solid rgba(255, 255, 225, .15);
            width: 100%;
            text-align: left;
            white-space: nowrap;
            border-collapse: collapse;
            /* 头部*/
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
              tr {
                transition: all 300ms linear 0s;
                &:nth-child(odd) {
                  background: rgba(0, 0, 0, .13);
                  border: 1px solid rgba(255, 255, 225, .15);
                }
                &:hover {
                  background: rgba(255, 255, 255, .2)!important;
                }
                td {
                  border: 1px solid rgba(255, 255, 225, .15);
                  padding: 8px 10px;
                  .btn {
                    @include btn( rgba(50, 219, 1, 0.3), rgba(50, 219, 1, 0.6));
                    padding: 6px 12px;
                    &:hover {
                      box-shadow: 0 0 2rem 0.5rem rgba(50, 219, 1, 0.3);
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
}


.fullScreenPopup {
  .fullScreenAll {
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    /*top: 0;
    right: 0;
    bottom: 0;
    left: 0;*/
    @include trbl(0, 0, 0, 0);
    z-index: 10;
  }
}
</style>
