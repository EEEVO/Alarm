<template>
  <ul>
    <!--<li v-for="(item,index) in nodeData" v-show="item.visible" :class="[(item.children && item.children.length > 0) ? '':'leaf']" :key='index'>-->
    <li v-for="(item,index) in nodeData" v-show="item.visible" :key='index' class="leaf">
      <!--如果有子节点则显示当前switch-->
      <span class="item">
        <i v-if="item.children && item.children.length > 0" @click.stop='handleNodeExpand(item)' :class="[item.open? 'icon-jian':'icon-jia','icon']">
        </i>
        <!--TODO:搜索框-->
        <!--<div class="inputCheck" :class="{notAllNodes:item.nodeSelectNotAll}" :style="{width:inputWidth+'px', height:inputWidth+'px'}" @click="walkCheckBox(item)">
          <input type="checkbox" class="check" v-if="options.showCheckbox && options.halfCheckedStatus  &&  !item.nodeSelectNotAll" v-model='item.checked' @change="handlecheckedChange(item)"></input>
        </div>-->
        <img :src="`/static/alarm/${item.bgName}`" class="bg">
        <span @click="handleNode(item)" :class="{'node-selected':(item.checked && !options.showCheckbox) || item.searched }" class="name">
          {{item.label}}
        </span>
      </span>
      <tree-node v-if="item.children && item.children.length > 0" :options="options" @handlecheckedChange="handlecheckedChange" v-show='item.open' :tree-data="item.children">
      </tree-node>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'treeNode',
  props: {
    treeData: [Array],
    options: [Object]
  },
  data() {
    return {
      // 节点数据
      nodeData: []
    }
  },
  created() {
    // 获取父节点对象
    const parent = this.$parent
    // debugger
    if (parent.isTree) {
      this.tree = parent
    } else {
      this.tree = parent.tree
    }

    const tree = this.tree
    if (!tree) {
      console.warn('找不到树节点')
    }
    this.nodeData = (this.treeData || []).slice(0)
    // TODO:明天就从这里入手
    console.log(this.nodeData);
  },
  computed: {
    inputWidth: function () {
      if (this.checkFirfox()) {
        return 14
      }
      return 13
    }
  },
  watch: {
    treeData: function (data) {
      this.nodeData = (data || []).slice(0)
    }
  },
  methods: {
    checkFirfox() {
      let u = navigator.userAgent
      if (u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1) {
        return true
      }
      return false
    },
    walkCheckBox(node) {
      if (node.nodeSelectNotAll) {
        node.checked = !node.checked
        this.handlecheckedChange(node)
      }
    },
    handleNodeExpand(node) {
      node.open = !node.open
    },
    handlecheckedChange(node) {
      this.$emit('handlecheckedChange', node)
    },
    handleNode(node) {
      if (this.tree.store.last) {
        if (this.tree.store.last.id === node.id) {
          this.tree.store.last.checked = !this.tree.store.last.checked
        } else {
          this.tree.store.last.checked = false
          node.checked = true
          this.tree.store.last = node
        }
      } else {
        this.tree.store.last = node
        node.checked = true
      }
      this.tree.$emit('node-click', node)
    }
  }
}
</script>

<style lang="scss" scoped>
li {

  .item {
    border: 1px dotted #999;
    border-radius: 5px;
    display: inline-block;
    padding: 6px 8px;
    cursor: pointer;
    white-space: nowrap;
    text-decoration: none;
    &:hover {
      background: rgba(254, 166, 36, 0.4);
      border: 1px solid #f79710;
      box-shadow: 0 0 20px rgba(254, 166, 36, 0.6), inset 0 0 10px rgba(254, 166, 36, 0.5);
    }
    .icon {
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
    }
    /*关闭与打开的图标样式*/
    @mixin tree-WH {
      width: 14px;
      height: 14px;
    }
    .tree-close {
      @include tree-WH;
      background-image: url("/static/img/assets/treeOpen-1.png");
    }

    .tree-open {
      @include tree-WH;
      background-image: url("/static/img/assets/treeClose-2.png");
    }
    /*搜索框样式*/
    .inputCheck {
      display: inline-block;
      position: relative;
      .check {
        display: inline-block;
        position: relative;
        top: 4px;
      }
    }
    .notAllNodes:before {
      content: "";
      display: inline-block;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 10;
      top: 50%;
      left: 50%;
      transform: translate3d(-30%, -5%, 0);
      background-image: url("/static/img/assets/half.jpg");
      /*background-image: url("../../assets/half.jpg");*/
    }
    /*图标标识样式*/
    .bg {
      width: 18px;
      height: 18px;
      margin-top: 1px;
      position: absolute;
    }
    .name {
      padding: 0 0 0 22px!important;
      font-weight: 400;
    }
    .node-selected {
      background-color: #ddd
    }
  }
}


.halo-tree {
  font-size: 14px;
  min-height: 20px;
  border-radius: 4px;
  li {
    margin: 0;
    padding: 5px 5px 5px 0;
    position: relative;
    list-style: none;
    .name,
    i,
    a {
      line-height: 20px;
      vertical-align: middle;
    }
    .name {
      display: inline-block;
      padding: 3px 3px;
      text-decoration: none;
      border-radius: 3px;
    }
    &:last-child::before {
      height: 26px
    }
    .leaf {
      padding-left: 19px;
      @mixin li-after-before {
        content: '';
        left: -6px;
        position: absolute;
        right: auto;
      }
      &::before {
        @include li-after-before;
        border-left: 1px solid #999;
        bottom: 50px;
        height: 100%;
        top: -11px;
        width: 1px;
        transition: all 0.1s ease 0.1s;
      }
      &::after {
        @include li-after-before;
        border-top: 1px solid #999;
        height: 20px;
        top: 18px;
        width: 25px;
      }
    }
    .icon {
      margin-right: 0;
    }
  }
  ul {
    padding-left: 0;
    ul {
      padding-left: 15px;
      padding-top: 10px;
    }
  }
}

.search {
  width: 14px;
  height: 14px;
  /*background-image: url("../../assets/search.png");*/
  background-image: url("/static/img/assets/search.png");
}































/*.check.notAllNodes{
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  width: 13px;
}*/
</style>