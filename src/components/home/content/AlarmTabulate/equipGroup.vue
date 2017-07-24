<template>
  <div class="main">
    <div class="col4">
      <table>
        <thead>
          <tr>
            <th>设备分组名称</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) of data" :key="index" :class="{active:currentIndex==index}" @click="currentIndex=index">
            <td>{{item.group_name}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col8">
      <table>
        <thead>
          <tr>
            <th>所选设备</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="clearfix">
              <div class="equipList">
                <div class="equipListContent" v-for="(item,index) of equipList" :key="index">
                  <input type="checkbox">
                  <span>{{item.name}}</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script type="es6">
export default {
  data() {
    return {
      data: [],
      equipList: '',
      currentIndex: ''
    }
  },
  created() {
    this.initData()
    this.initEquipList()
  },
  methods: {
    // 初始化请求数据
    initData() {
      this.$http.post(`${this.$store.state.urlCommon}QueryTableData`, {
        tableName: 'EquipGroup'
      }).then((res) => {
        this.data = JSON.parse(res.data.d)
      })
    },
    initEquipList() {
      this.$http.post(`${this.$store.state.urlCommon}EquipItemList`).then((res) => {
        this.equipList = JSON.parse(this.getXmlStr(res.data))
        console.log(this.equipList);
      })
    },
    // 转成xml对象
    createXml(str) {
      if (document.all) {
        var xmlDom = new ActiveXObject("Microsoft.XMLDOM")
        xmlDom.loadXML(str)
        return xmlDom
      }
      else
        return new DOMParser().parseFromString(str, "text/xml")
    },
    // 处理xml串
    getXmlStr(str) {
      return this.createXml(str).getElementsByTagName("string")[0].innerHTML
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../style/mixin.scss";
.main {
  @include absoluteWH(auto, auto);
  @include trbl(0, 0, 0, 0);
  overflow: auto;
  top: 60px;
  left: 0;
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
          background: rgba(255, 255, 255, .2);
        }
        &.active {
          background: rgba(255, 255, 255, .2)!important;
        }
        td {
          border: 1px solid rgba(255, 255, 225, .15);
          padding: 8px 10px;
        }
      }
    }
  }
  .col4 {
    position: absolute;
    @include trbl(0, 66%, 0, 0);
  }
  .col8 {
    position: absolute;
    @include trbl(0, 0, 0, 34%);
    table {
      height: 100%;
      position: relative;
      tr:hover {
        background: none;
      }
      .equipList {
        position: absolute;
        @include trbl(34px, 0, 0, 0);
        overflow-y: auto;
        padding: 13px;
        .equipListContent {
          float: left;
          width: 160px;
          height: 30px;
          margin-top: 0!important;
        }
      }
    }
  }
}
</style>
