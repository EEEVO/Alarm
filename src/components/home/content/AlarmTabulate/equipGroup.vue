<template>
  <div class="main">
    <div class="col4">
      <table>
        <thead>
          <tr>
            <th>设备分组名称</th>
          </tr>
        </thead>
        <tbody @click="clickObj($event)">
          <tr v-for="(item,index) of data" :key="index" :class="{active:currentIndex===index}" :index="index">
            <td :index="index">
              <input type="text" v-model="item.group_name" :index="index">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col8">
      <table>
        <thead>
          <tr class="col8-thead-tr">
            <th>
              <span></span>所选设备
              <span class="tabu-control1" @click="empty2checkAll(false)">
                <i class="iconfont icon-qingkong"></i>清空
              </span>
              <span class="tabu-control2" @click="empty2checkAll(true)">
                <i class="iconfont icon-quanxuan"></i>全选
              </span>
            </th>
          </tr>
        </thead>
        <tbody @click="getCheckEquipNo($event)">
          <tr class="col8-tbody-tr">
            <td class="clearfix">
              <div class="equipList">
                <div class="equipListContent" v-for="(item,index) of equipData" :key="index">
                  <input type="checkbox" :checked="item.checked" :index="item.value">
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
      currentIndex: '',
      text: '',
    }
  },
  created() {
    this.initData()
    this.initEquipList()
  },
  computed: {
    equipData() {
      // 转数组
      if (this.currentIndex === '') {
        return null
      }
      let tem_Obj = this.data[this.currentIndex]
      console.log(tem_Obj.equipcomb);
      if (tem_Obj.equipcomb) {
        this.text = tem_Obj.equipcomb.split("#")
      } else {
        this.text = []
      }

      // 过滤空位
      for (let i = 0; i < this.text.length; i++) {
        if (this.text[i] == '' || this.text[i] == null || typeof (this.text[i]) == undefined) {
          this.text.splice(i, 1);
          i = i - 1
        }
      }

      for (let item_equipList of this.equipList) {
        item_equipList.checked = false
        for (let i = 0; i < this.text.length; i++) {
          if (item_equipList.value == this.text[i]) {
            item_equipList.checked = true
            break
          }
        }
      }
      return this.equipList
    }
  },
  methods: {
    //TODO: 获取点击复选框上的设备号
    getCheckEquipNo(e) {
      // 然后在text数组中删除该设备号，拼成字符串添加到对应的equipcomb中
    },
    // TODO:清空或者全选所选
    empty2checkAll(statu) {
      // true代表全选
      this.data[parseInt(this.currentIndex)].equipcomb = ''
      if (statu) {
        let temStr = ""
        this.equipList.forEach((element) => {
          temStr += `#${element.value}`
        });
        this.data[parseInt(this.currentIndex)].equipcomb = temStr
      }
    },

    // // 列表菜单单机事件
    // clickTr(index) {
    //   this.currentIndex = index
    // },
    // 增加新行
    addTr() {
      this.data.push({
        equipcomb: '',
        group_name: '',
        group_no: `${this.data.length + 1}`,
        sta_n: '0'
      })
    },
    // TODO:下面两方法没用
    clickObj(e) {
      // 获取到当前tr的index
      this.currentIndex = parseInt(e.target.getAttribute("index"))
    },
    deleteTr() {
      this.data.splice(parseInt(this.currentIndex), 1);
    },
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
        this.equipList = this.equipList.filter((item) => {
          if (item.value != "") {
            return item
          }
        })
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

@mixin commom-table-control {
  cursor: pointer;
  position: absolute;
  font-weight: 500;
  line-height: 34px;
  padding: 0 13px;
  transition: all 300ms linear 0s;
  height: 34px;
}

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
          input {
            border: none;
            background-color: transparent;
            color: #fff;
            &:focus {
              color: #FBE863;
            }
          }
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
      .tabu-control1 {
        @include commom-table-control;
        @include trbl(0, 72px, auto, auto);
        &:hover {
          background: rgba(255, 255, 255, .2);
        }
      }
      .tabu-control2 {
        @include commom-table-control;
        @include trbl(0, 0, auto, auto);
        &:hover {
          background: rgba(255, 255, 255, .2);
        }
      }
      .col8-thead-tr:hover {
        background: rgba(0, 0, 0, .43);
      }
      .col8-tbody-tr:hover {
        background: rgba(0, 0, 0, 0.13);
      }
      background: rgba(0, 0, 0, 0.13);
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
