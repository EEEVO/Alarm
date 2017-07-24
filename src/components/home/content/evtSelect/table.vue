<template>
  <div>
    <ul class="nav-tabList">
      <li v-for="(item,index) of tabsItemName" :key="index" :class="{active:curractiveIndex==index}" @click="select(index)">{{tabsItemName[index]}}</li>
    </ul>
    <div class="tab-content">
      <article v-if="curractiveIndex===0" id="tableYcp" class="tab-pane animated active fadeIn">
        <div class="tableAuto alarmReal">
          <table id="tableYcpID">
            <thead>
              <tr>
                <th>设备名称</th>
                <th>设备事件</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) of EquipEvtData" :key="index">
                <td>{{item.equip_nm}}</td>
                <td>{{item.event}}</td>
                <td>{{item.time}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
      <article v-else-if="curractiveIndex===1" id="tableYxp" class="tab-pane animated active fadeIn">
        <div class="tableAuto alarmReal">
          <table id="tableYxpID">
            <thead>
              <tr>
                <th>设备名称</th>
                <th>设置事件</th>
                <th>操作人员</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) of SetupsEvtData" :key="index">
                <td>{{item.equip_nm}}</td>
                <td>{{item.event}}</td>
                <td>{{item.operator}}</td>
                <td>{{item.time}}</td>
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
                <th>系统事件</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) of SystemEvtData" :key="index">
                <td>{{item.event}}</td>
                <td>{{item.time}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </div>
  </div>
</template>

<script type="es6">
export default {
  props: ["equipData"],
  data() {
    return {
      tabsItemName: ["设备事件", "设置事件", "系统事件"],
      curractiveIndex: 0,
      EquipEvtData: '',
      SetupsEvtData: '',
      SystemEvtData: '',
    }
  },
  watch: {
    equipData() {
      const url = this.$store.state.urlCommon
      this.$http.all([this.$http.post(`${url}QueryEquipEvt`, {
        times: this.equipData.times,
        equip_no_list: this.equipData.equip_no_list,
      }), this.$http.post(`${url}QuerySetupsEvt`, {
        times: this.equipData.times,
        equip_no_list: this.equipData.equip_no_list,
      }), this.$http.post(`${url}QuerySystemEvt`, {
        times: this.equipData.times,
        equip_no_list: this.equipData.equip_no_list,
      })]).then(this.$http.spread((resEquipEvt, resSetupsEvt, resSystemEvt) => {
        if (resEquipEvt.data.d !== "false") {
          this.EquipEvtData = JSON.parse(resEquipEvt.data.d)
        }
        if (resSetupsEvt.data.d !== "false") {
          this.SetupsEvtData = JSON.parse(resSetupsEvt.data.d)
        }
        if (resSystemEvt.data.d !== "false") {
          this.SystemEvtData = JSON.parse(resSystemEvt.data.d)
        }
      }))
    }
  },
  methods: {
    select(index) {
      this.curractiveIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin.scss';
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
  @include trbl(28px, 0, 0, 12px);
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
          tr {
            transition: all 300ms linear 0s;
            &:nth-child(odd) {
              background: rgba(0, 0, 0, .13);
              border: 1px solid rgba(255, 255, 225, .15);
            }
            &:nth-child(even) {
              background-color: transparent;
            }
            &:hover {
              background: rgba(255, 255, 255, .2)!important;
            }
            td {
              border: 1px solid rgba(255, 255, 225, .15);
              padding: 8px 10px;
            }
          }
        }
      }
    }
  }
}
</style>


