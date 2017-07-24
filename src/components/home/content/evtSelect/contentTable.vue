<template>
  <div>
    <!--写个树形例子-->
    <tree ref='tree' :treeData="treeData" :options="options" @node-click='handleNode' class="tree" v-if="treeDataStatus"></tree>
    <div class="timeSelect">
      <vtime class="vtime" ref="vtime" @goTime="goTime" @endTime="endTime"></vtime>
      <button @click="configuration()">
        <i class="iconfont icon-chaxun"></i>
        查询
      </button>
    </div>
    <vtable class="vtalbe" :equip-data="equip_Data"></vtable>
  </div>
</template>

<script type="es6">
import tree from './tree/tree'
import vtable from './table'
import vtime from './time'

export default {
  data() {
    return {
      // tree组件配置项
      options: {
        showCheckbox: true,
        halfCheckedStatus: true,//控制父框是否需要半钩状态,
        search: {
          useInitial: true,
          useEnglish: false,
          customFilter: null
        }
      },
      treeDataStatus: false,
      treeData: [{
        checked: false,
        id: null,
        label: "所有设备",
        nodeSelectNotAll: false,
        open: true,
        parentId: null,
        searched: false,
        visible: true,
        children: []
      }],
      // 所勾选的设备号列表
      equip_Data: '',
    }
  },
  components: {
    tree,
    vtable,
    vtime
  },
  methods: {
    goTime(goTime) {
      this.goDate = goTime
    },
    endTime(endTime) {
      this.endDate = endTime
    },
    // 查询
    configuration() {
      let equip_no_list = this.$refs.tree.getSelectedNodeIds().join(",")
      let times = this.$refs.vtime.getDateTime()
      this.equip_Data = {
        times,
        equip_no_list
      }
    },
    // 节点的点击回调
    // 查询设备数据
    handleNode(e) {
      // console.log(e);
      // TODO:待测试
      console.log(this.$refs.tree.getSelectedNodeIds());
    },
    httpEquipItemList() {
      this.$http.post(`${this.$store.state.urlCommon}EquipItemList`, {}).then((res) => {
        let arr_res = JSON.parse(res.data.d);
        for (let i = 0; i < arr_res.length; i++) {
          let item = arr_res[i];
          if (item.value !== "") {
            let obj_tem = {
              checked: false,
              id: item.value,
              label: item.name,
              nodeSelectNotAll: false,
              open: true,
              parentId: null,
              searched: false,
              visible: true
            }
            this.treeData[0].children.push(obj_tem);
          }
        }
        this.treeDataStatus = true;
      })
    }
  },
  created() {
    this.httpEquipItemList()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin.scss';

div {
  .tree {
    overflow: auto;
    min-height: 20px;
    border-radius: 4px;
    @include absoluteWH(auto, 100%);
    @include trbl(0, 77%, 0, 0);
  }
  .timeSelect {
    .vtime {
      vertical-align: top;
    }
    position: absolute;
    @include trbl(0, 0, atuo, 23%);
    margin: 0 0 4px 13px;
    button {
      vertical-align: top;
    }
  }
  button {
    @include btn(rgba(50, 219, 1, 0.3), rgba(50, 219, 1, 0.6));
    padding: 6px 12px;
    &:hover {
      box-shadow: 0 0 2rem 0.5rem rgba(50, 219, 1, 0.3);
    }
  }
  .vtalbe {
    position: absolute;
    @include trbl(40px, 0, 0, 23%);
  }
}
</style>


