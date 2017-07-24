<template>
  <div class="halo-tree">
    <!--上面的搜索框-->
    <!--<div class="input">
                                                                  <input type="text" v-model="search">
                                                                  <span class="icon search"></span>
                                                                </div>-->
    <!--树形菜单-->
    <tree-node :treeData='store.root' :options="options" @handlecheckedChange="handlecheckedChange"></tree-node>
  </div>
</template>

<script type="es6">
import TreeNode from './tree-node.vue'
import TreeStore from './tree-store'

export default {
  name: 'tree',
  props: {
    // 承接数组数据
    treeData: [Array],
    options: [Object]
  },
  data() {
    return {
      search: false,
      store: {
        root: [],
        last: null
      }
    }
  },
  created() {
    // 初始化设置
    this.isTree = true
    // 处理外部传过来的数据
    this.store = new TreeStore({
      // 拿到根节点
      root: (this.treeData || []).slice(0),
      last: null
    })
    // console.log(this.store);
  },
  watch: {
    search: function (val) {
      this.store.filterNodes(val, this.options.search)
    },
    treeData: function (data) {
      this.store = new TreeStore({
        root: (this.treeData || []).slice(0),
        last: null
      })
    }
  },
  methods: {
    handlecheckedChange(node) {
      if (this.options.halfCheckedStatus) {
        this.store.changeCheckHalfStatus(node)
      } else {
        this.store.changeCheckStatus(node)
      }
      this.$emit('handlecheckedChange', node)
    },
    getSelectedNodes() {
      const allnodes = this.store.datas
      let selectedNodes = []
      for (let [, node] of allnodes) {
        if (node.checked) {
          selectedNodes.push(node)
        }
      }
      return selectedNodes
    },
    getSelectedNodeIds() {
      const allnodes = this.store.datas
      let selectedNodeIds = []
      try {
        for (let [, node] of allnodes) {
          if (node.checked && node.children) {
            for (let nodeId of node.children) {
              // debugger
              if (nodeId.checked) {
                selectedNodeIds.push(nodeId.id)
              }
            }
          }
        }
        console.log("1");
        return selectedNodeIds
      } catch (error) {
        console.log(error);
      }
    }
  },
  components: { TreeNode }
}

// let int = 111
// let [, int]

</script>

<style scoped>
* {
  font-size: 13px;
  font-family: '\5FAE\8F6F\96C5\9ED1'
}

.input {
  width: 100%;
  position: relative;
}

.input span {
  position: absolute;
  top: 7px;
  right: 5px;
}

.input input {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
  height: 25px;
  margin-top: 2px;
}

.input input:focus {
  border: none;
}

.search {
  width: 14px;
  height: 14px;
  background-image: url("/static/img/assets/search.png");
  /*background-image: url("../../assets/search.png");*/
}
</style>

