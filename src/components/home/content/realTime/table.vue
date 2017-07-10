<template>
  <div>
    <ul class="nav-tabList">
      <li v-for="(item,index) of countAll" :key="index" v-if="item.count>0" :class="{active:index==curractiveIndex}" @click="select(index)">{{tabsItemName[index]}}</li>
    </ul>
    <div class="tab-content">
      <article v-if="curractiveIndex===0" id="tableYcp" class="tab-pane animated active fadeIn">
        <div class="tableAuto alarmReal">
          <table id="tableYcpID">
            <thead>
              <tr>
                <th>报警状态</th>
                <th>模拟量编号</th>
                <th>模拟量名称</th>
                <th>实时值</th>
                <th>曲线</th>
                <th>处理意见</th>
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
                <th>报警状态</th>
                <th>状态量编号</th>
                <th>状态量名称</th>
                <th>实时状态</th>
                <th>处理意见</th>
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
                <th>设置命令</th>
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
  props: {
    countAll: Array,
    currEquipNo: String,
    activeIndex: Number
  },
  data() {
    return {
      tabsItemName: ["模拟量", "状态量", "设置"],
      // 钩子函数求出activeIndex
      curractiveIndex: ""
    }
  },
  methods: {
    select(index) {
      console.log(index);
      this.curractiveIndex = index;
    }
  },
  created() {
    this.curractiveIndex = this.activeIndex
  },
  computed: {
    nowactiveIndex() {
      console.log(this.countAll);
      for (let index = 0; index < this.countAll.length; index++) {
        let element = this.countAll[index];
        if (element.count > 0) {
          this.curractiveIndex = index
          break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
  }
  .active {
    background: rgba(255, 255, 255, .8)!important;
    color: #000!important;
  }
}

.tab-content {
  border: 1px solid rgba(255, 255, 255, .15);
  width: auto;
  height: auto;
  clear: both;
  position: absolute;
  left: 12px;
  top: 28px;
  right: 0;
  bottom: 0;
  .tab-pane {
    width: auto;
    height: auto;
    position: absolute;
    left: 0;
    top: 0;
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


