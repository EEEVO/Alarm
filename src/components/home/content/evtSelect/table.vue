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
          </table>
        </div>
      </article>
    </div>
  </div>
</template>

<script type="es6">
export default {
  props: ["equipNo"],
  data() {
    return {
      tabsItemName: ["设备事件", "设置事件", "系统事件"],
      curractiveIndex: 0
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
      }
    }
  }
}
</style>


