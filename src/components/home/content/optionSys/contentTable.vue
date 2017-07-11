<template>
  <div>
    <!--写个树形例子-->
    <tree :treeData="treeData" :options="options" @node-click='handleNode' @get-click="handlecheckedChange" class="tree"></tree>
    <!--ref='tree'-->
  </div>
</template>

<script type="es6">
import tree from './tree/tree'

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
      treeData: [{
        checked: false,
        children: [],
        id: 1,
        label: "所有设备",
        nodeSelectNotAll: false,
        open: true,
        parentId: null,
        searched: false,
        visible: true
      }],
    }
  },
  components: {
    tree
  },
  methods: {
    // 节点的点击回调
    // 查询设备数据
    handleNode(e) {
      console.log(e);
      // TODO:待测试
      this.$refs.tree.getSelectedNodeIds();
    },
    handlecheckedChange(e) {
      console.log(e);
    },
    httpEquipItemList() {
      this.$http.post(`${this.$store.state.urlCommon}EquipItemList`, {}).then((res) => {
        console.log(res.data.d);
        let arr_res = JSON.parse(res.data.d);
        for (let i = 0; i < arr_res.length; i++) {
          let item = arr_res[i];
          if (item.value !== "") {
            let obj_tem = {
              checked: false,
              id: 1,
              label: "",
              nodeSelectNotAll: false,
              open: true,
              parentId: null,
              searched: false,
              visible: true
            }
            obj_tem.label = item.name
            obj_tem.id = item.value
            this.treeData[0].children.push(obj_tem);
          }
        }
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
    overflow: auto; // height: 100%;
    min-height: 20px;
    border-radius: 4px; // position: absolute;
    @include absoluteWH(auto, 100%);
    @include trbl(0, 77%, 0, 0);
    /*left: 0;
    top: 0;
    right: 77%;
    bottom: 0;*/
  }
}
</style>


