<template>
  <div>
    <!--写个树形例子-->
    <tree ref='tree' :treeData="treeData" :options="options" @node-click='handleNode'></tree>
    <!--<button @click='getselected'>selected</button>-->
  </div>
</template>

<script type="es6">
import tree from './tree/tree'

export default {
  data() {
    return {
      // 用户权限
      getWebUser: '',
      // 设备状态数组
      AllEquipStat: '',
      // 设备列表数组
      treeList: '',
      // 写个假数组
      arr_menuList: '',
      
      // tree组件配置项
      options: {
        showCheckbox: false,
        search: {
          useInitial: true,
          useEnglish: false,
          customFilter: null
        }
      },
      treeData: [
        {
          id: 1,
          label: '一级节点',
          open: true,
          checked: false,
          nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
          parentId: null,
          visible: true,
          searched: false,
          bgName: "CommunicationOK.png",
          children: [
            {
              id: 2,
              label: '二级节点-1',
              checked: false,
              nodeSelectNotAll: false,
              parentId: 1,
              searched: false,
              visible: true,
              bgName: "NoCommunication.png"
            },
            {
              label: '二级节点-2',
              open: true,
              checked: false,
              nodeSelectNotAll: false,
              id: 3,
              parentId: 1,
              visible: true,
              searched: false,
              bgName: "HaveAlarm.png",
              children: [
                {
                  // id: 4,
                  parentId: 3,
                  label: '三级节点-1',
                  visible: true,
                  searched: false,
                  checked: false,
                  bgName: "HaveAlarm.png",
                  nodeSelectNotAll: false

                },
                {
                  // id: 5,
                  label: '三级节点-2',
                  parentId: 3,
                  searched: false,
                  bgName: "NoCommunication.png",
                  visible: true,
                  checked: false,
                  nodeSelectNotAll: false
                }, {
                  // id: 4,
                  parentId: 3,
                  label: '三级节点-1',
                  visible: true,
                  searched: false,
                  checked: false,
                  bgName: "HaveAlarm.png",
                  nodeSelectNotAll: false

                },
                {
                  // id: 5,
                  label: '三级节点-2',
                  parentId: 3,
                  searched: false,
                  bgName: "NoCommunication.png",
                  visible: true,
                  checked: false,
                  nodeSelectNotAll: false
                }, {
                  // id: 4,
                  parentId: 3,
                  label: '三级节点-1',
                  visible: true,
                  searched: false,
                  checked: false,
                  bgName: "HaveAlarm.png",
                  nodeSelectNotAll: false

                },
                {
                  // id: 5,
                  label: '三级节点-2',
                  parentId: 3,
                  searched: false,
                  bgName: "NoCommunication.png",
                  visible: true,
                  checked: false,
                  nodeSelectNotAll: false
                }
              ]
            }
          ]
        }
      ]
    }
  },
  computed: {

  },
  created() {
    this.$http.all([this.checkIsAdmin(), this.allEquipSatatus(), this.treeConfList2()]).then(this.$http.spread((getWebUser, AllEquipStat, treeList) => {
      if (getWebUser != 'false') {
        this.getWebUser = getWebUser.data.d;
      }
      if (AllEquipStat.data != false) {
        this.AllEquipStat = this.getXmlStr(AllEquipStat.data).split(';');
      }
      if (treeList.data != 'false') {
        // debugger
        // TODO:目前是xml数据格式
        let temXMLDOM = this.getXmlStr(treeList.data);
        //TODO:此处正则替换可以简化
        temXMLDOM = temXMLDOM.replace(/&lt;/g, "<");
        temXMLDOM = temXMLDOM.replace(/&gt;/g, ">");
        temXMLDOM = this.createXml(temXMLDOM);
        console.log(temXMLDOM);
        // temXMLDOM
      }
    }))
  },

  methods: {
    getselected() {
      console.log(this.$refs.tree.getSelectedNodeIds())
    },
    handleNode(e) {
      console.log(e)
    },
    // 验证请求的权限
    checkIsAdmin() {
      return this.$http.post(`${this.$store.state.urlCommon}UserPermissions`, {
        userName: window.localStorage.userName
      })
    },
    // 获取所有设备的状态
    allEquipSatatus() {
      return this.$http.post(`${this.$store.state.urlCommon}GetEquipAllState`)
    },
    // 获取设备列表
    treeConfList2() {
      return this.$http.post(`${this.$store.state.urlCommon}GWEquipTree`)
    },
    // 处理xml串
    getXmlStr(str) {
      return this.createXml(str).getElementsByTagName("string")[0].innerHTML
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
    }
  },
  components: {
    tree
  }
}
</script>

<style lang="scss" scoped>
div {
  overflow: auto;
  height: 100%;
  min-height: 20px;
  border-radius: 4px;
  position: absolute;
  left: 0;
  top: 0;
  right: 77%;
  bottom: 0;
}
</style>


