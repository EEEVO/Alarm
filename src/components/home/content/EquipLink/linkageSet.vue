<template>
  <div class="main clearfix">
    <!-- 操作按钮 -->
    <div class="btn-block">
      <button class="btn">
        <i class="iconfont icon-tianjia"></i>删除
      </button>
      <button class="btn">
        <i class="iconfont icon-shanchu"></i>删除
      </button>
      <button class="btn">
        <i class="iconfont icon-baocun"></i>保存
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="(item,index) of week" :key="index">{{item}}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="text">
          </td>
          <td>
            <input type="text">
          </td>
          <td>
            <input type="text">
          </td>
          <td>
            <input type="text">
          </td>
          <td>
            <input type="text">
          </td>
          <td>
            <input type="text">
          </td>
          <td>
            <input type="text">
          </td>
          <td>
            <input type="text">
          </td>
          <td>
            <input type="text">
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
      week: ["使能", "触发设备", "触发类型", "触发点", "延时(毫秒)", "联动设备", "联动命令", "命令参数", "备注"]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin.scss';

.main {
  width: auto;
  height: 100%;
  padding: 13px 13px;
  .title {
    margin: 0
  }
  .btn-block {
    float: right;
    .btn {
      background-color: rgba(50, 219, 1, 0.3);
      &:hover {
        background-color: rgba(50, 219, 1, 0.6);
        color: #fff;
        box-shadow: 0 0 2rem 0.5rem rgba(50, 219, 1, 0.3);
      }
    }
  }
  table {
    overflow: auto;
    @include absoluteWH(auto, auto);
    @include trbl(48px, 0, 0, 0);
    background: rgba(0, 0, 0, .15);
    border: 1px solid rgba(255, 255, 225, .15); // width: 100%;
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
            width: 100%;
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
