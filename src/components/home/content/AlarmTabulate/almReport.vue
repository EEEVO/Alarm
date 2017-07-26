<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>人员姓名</th>
          <th>设备分组名称</th>
        </tr>
      </thead>
      <tbody @click="clickObj($event)">
        <tr v-for="(item,index) of data" :key="index" :index="index" :class="{active:currTrIndex==index}">
          <td>
            <!-- <input v-model="item.Administrator"> -->
            <select v-model="item.Administrator">
              <option value="" v-for="(item_Admin,index_Admin) of Administrator" :key="index_Admin" :value="item_Admin.Administrator">{{item_Admin.Administrator}}</option>
            </select>
          </td>
          <td>
            <select v-model="item.group_no">
              <option value="" v-for="(item_Admin,index_Admin) of EquipGroup" :key="index_Admin" :value="item_Admin.group_no">{{item_Admin.group_name}}</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="es6">
export default {
  data() {
    return {
      data: [],
      // 设备分组名
      EquipGroup: [],
      Administrator: [],
      // 当前被选中的tr
      currTrIndex: ''
    }
  },
  computed: {
    EquipGroupName() {

    }
  },
  created() {
    this.initData()
  },
  methods: {
    // 初始化请求数据
    initData() {
      this.$http.post(`${this.$store.state.urlCommon}QueryTableData`, {
        tableName: 'AlmReport'
      }).then((res) => {
        this.data = JSON.parse(res.data.d)
      })
      // 获取设备分组名
      this.$http.post(`${this.$store.state.urlCommon}QueryTableData`, {
        tableName: 'EquipGroup'
      }).then((res) => {
        this.EquipGroup = JSON.parse(res.data.d)
      })
      // 获取人员姓名
      this.$http.post(`${this.$store.state.urlCommon}QueryTableData`, {
        tableName: 'Administrator'
      }).then((res) => {
        this.Administrator = JSON.parse(res.data.d)
      })
    },
    // 增加新行
    addTr() {
      this.data.push({
        Administrator: '',
        group_no: ''
      })
    },
    clickObj(e) {
      // 获取到当前tr的index
      this.currTrIndex = e.target.parentNode.parentNode.getAttribute("index")
    },
    deleteTr() {
      this.data.splice(parseInt(this.currTrIndex), 1);
    },
    saveData() {
      let currData = this.data,
        data = ''
      for (let item of currData) {
        if (item.Administrator && item.group_no) {
          data += `${item.Administrator.replace(/\s/g, "")},
                    ${item.group_no.replace(/\s/g, "")};`
        } else {
          alert("不能留未选项!");
          return
        }
      }
      data = data.substr(0, data.length - 1)
      this.$http.post(`${this.$store.state.urlCommon}ResetAlarmTab`, {
        tabName: "AlmReport",
        data: data.replace(/\s/g, "")
      }).then((res) => {
        if (res.data.d == "true") {
          alert('保存成功')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../style/mixin.scss";
div {
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
          /*  padding: 8px 10px; */
          select {
            width: 100%;
            height: 100%;
            border: none;
            background-color: transparent;
            color: #FFF;
            transition: all 300ms linear 0s;
            padding: 5px 10px;
            outline: 0;
            &:focus {
              color: #FBE863;
            }
          }
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
}
</style>
