<template>
  <div>
    <!--写个树形例子-->
    <tree ref='tree' :treeData="treeData" :options="options" @node-click='handleNode' class="tree" v-if="treeDataStatus"></tree>
    <vtable class="vtalbe" @get-equipno='getEquipNo' :equip-no="equipNo" :query-table-data="QueryTableData"></vtable>
  </div>
</template>

<script type="es6">
import tree from './tree/tree'
import vtable from './table'


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
      equipNo: '',

      QueryTableData: [{
        name: "AlarmProc",
        value: ''
      }, {
        name: "GW_VideoInfo",
        value: ''
      }, {
        name: "GWZiChanTable",
        value: ''
      }, {
        name: "GWPlan",
        value: ''
      }],
    }
  },
  components: {
    tree,
    vtable
  },
  methods: {
    // 节点的点击回调
    // 查询设备数据
    handleNode(e) {
    },
    getEquipNo() {
      this.equipNo = this.$refs.tree.getSelectedNodeIds()
    },
    httpEquipItemList() {
      // 请求树形菜单数据
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
        // 提交到vuex，给配置model弹出层用
        this.$store.commit("getoptionModelData", this.treeData)
      })
      for (let item of this.QueryTableData) {
        this.$http.post(`${this.$store.state.urlCommon}QueryTableData`, {
          tableName: item.name
        }).then((res) => {
          // console.log(JSON.parse(res.data.d));
          item.value = JSON.parse(res.data.d);
        })
      }
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
  .vtalbe {
    position: absolute;
    @include trbl(0, 0, 0, 23%);
  }
}
</style>


