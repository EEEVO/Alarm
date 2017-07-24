<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>人员姓名</th>
          <th>设备分组名称</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) of data" :key="index">
          <td>{{item.Administrator}}</td>
          <td>{{item.group_no}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="es6">
export default {
  data() {
    return {
      data: []
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
        td {
          border: 1px solid rgba(255, 255, 225, .15);
          padding: 8px 10px;
        }
      }
    }
  }
}
</style>
