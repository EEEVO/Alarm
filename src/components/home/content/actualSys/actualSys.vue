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
            <button class="btn">
              <img src="/static/infor/Fatal.png">
              <span>故障</span>
              <b class="badge">{{eventCountMsg[0]}}</b>
            </button>
            <button class="btn">
              <img src="/static/infor/Warn.png">
              <span>警告</span>
              <b class="badge">{{eventCountMsg[1]}}</b>
            </button>
            <button class="btn">
              <img src="/static/infor/Info.png">
              <span>信息</span>
              <b class="badge">{{eventCountMsg[2]}}</b>
            </button>
            <button class="btn">
              <img src="/static/infor/SetParm.png">
              <span>设置</span>
              <b class="badge">{{eventCountMsg[3]}}</b>
            </button>
            <button class="btn">
              <img src="/static/infor/ZiChan.png">
              <span>资产</span>
              <b class="badge">{{eventCountMsg[4]}}</b>
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
  
                </tbody>
              </table>
            </div>
          </div>
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
      currentPageName: '实时快照',
      event_Level_list: '',
      eventCountMsg: [0, 0, 0, 0, 0]
    }
  },
  components: {
    commontHeader,
    // navList
  },
  methods: {
    /**
     * 获取报警数据
     */
    GetAlarmConfig() {
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
      })
    },
    /**
     * 获取系统的实时快照（事件）各个消息类型的总数
     */
    SysEvtCounts() {
      this.$http.post(`${this.$store.state.urlCommon}GetRealTimeEventCount`, {
        event_Level_list: this.event_Level_list,
        equip_no_list: this.Browse_Equip_List_Get()
      }).then((res) => {
        this.eventCountMsg = res.data.d.split(",")
      })
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
    this.GetAlarmConfig();
    // this.SysEvtCounts();
    // clearInterval(SysEvtCountsSet);

    setTimeout(() => {
      this.SysEvtCounts();
    }, 3000);

    // var SysEvtCountsSet = setInterval("this.SsEvtCounts()", 4000);
  },

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
      top: 13px;
      bottom: 13px;
      right: 13px;
      position: absolute;
      /* 条件选择栏*/
      .inforbtnList {
        button {
          border: none;
          border-radius: 2px;
          padding: 6px 12px;
          box-shadow: inset 0 -2px 0 rgba(0, 0, 0, .05);
          color: #fff;
          font-family: "Microsoft YaHei";
          background-color: rgba(125, 191, 255, .3);
          position: relative;
          padding: 12px 12px;
          cursor: pointer;
          img {
            width: 32px;
            height: 32px;
            position: absolute;
            left: 6px;
            top: 6px;
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
      }
      /* table块*/
      .actualbody {
        width: auto;
        height: auto;
        position: absolute;
        left: 0;
        top: 42px;
        right: 0;
        bottom: 0;
        .tableAuto {
          overflow: auto;
          width: auto;
          height: auto;
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
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
          }
        }
      }
    }
  }
}
</style>
