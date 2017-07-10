<template>
  <div>
    <!--写个树形例子-->
    <tree ref='tree' :treeData="treeData" :options="options" @node-click='handleNode' class="tree"></tree>
    <!--<button @click='getselected'>selected</button>-->
    <vtable v-if="vtableStatus" :count-all="countAll" :curr-equip-no="currEquipNo" :active-index="activeIndex" class="vtalbe"></vtable>
  </div>
</template>

<script type="es6">
import tree from './tree/tree'
import vtable from './table'

export default {
  data() {
    return {
      // 用户权限
      getWebUser: '',
      // 设备状态数组
      AllEquipStat: '',
      // 设备列表数组
      treeList: '',
      // tree组件配置项
      options: {
        showCheckbox: false,
        search: {
          useInitial: true,
          useEnglish: false,
          customFilter: null
        }
      },
      treeData: [],

      countAll: '',
      // 当前选中的设备号
      currEquipNo: "",
      // vtable组件是否显示
      vtableStatus: false,
      // tabs被选中的默认项
      activeIndex: ''
    }
  },
  computed: {

  },
  created() {
    this.$http.all([this.checkIsAdmin(), this.allEquipSatatus(), this.treeConfList2()])
      .then(this.$http.spread((getWebUser, AllEquipStat, treeList) => {
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
          // TODO:将temXMLDOM数据处理成上面数组的样子
          let temObj = {
            id: 1,
            label: temXMLDOM.getElementsByTagName("GWEquipTreeItem")[0].getAttribute("Name"),
            open: true,
            checked: false,
            nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
            parentId: null,
            visible: true,
            searched: false,
            bgName: "HaveAlarm.png",
            children: []
          }
          let x = temXMLDOM.documentElement.childNodes
          this.XMLDOM2treeList(x, temObj);
        }
      }));
  },
  methods: {
    // 节点的点击回调
    // 查询设备数据
    handleNode(e) {
      // console.log(e);
      // 判断当前是否能有点击事件权限
      if (e.children || e.bgName === "NoCommunication.png") {
        return
      }
      // 获取被点击的设备号
      const equip_no = e.id;
      this.$http.post(`${this.$store.state.urlCommon}EquipItemCount`, {
        equip_no: equip_no,
        userName: window.localStorage.userName
      }).then(result => {
        // debugger
        // console.log(result);
        const dataEquip = JSON.parse(result.data.d);
        let countAll = Array.from(dataEquip)
        // console.log(countAll);
        // 传入两个变量，用来生成table数据
        // debugger
        this.currEquipNo = equip_no;
        this.countAll = countAll;
        this.vtableStatus = true
        for (let index = 0; index < this.countAll.length; index++) {
          let element = this.countAll[index];
          if (element.count > 0) {
            this.activeIndex = index
            break
          }
        }
      })
    },
    //判断是否有权限查看此设备
    Browse_Equip_List(equip_no) {
      if (this.getWebUser.IsAdministrator) {
        return true
      } else {
        //TODO:此处需求不明，没有遇到过相关数据情况
        return false
      }
    },
    // 判断当前节点是否有报警状态\
    selectAlarm(name, equip_no, childrenStatus = false) {
      // 如果有子集
      // if (childrenStatus) {
      for (let index = 0; index < this.AllEquipStat.length; index++) {
        let element = this.AllEquipStat[index].split(",");
        if (element[0] === equip_no) {
          if (element[2] === "CommunicationOK") {
            return "CommunicationOK.png"
          } else {
            return 'HaveAlarm.png'
          }
        }
      }
      return 'NoCommunication.png'
      // } else {
      //   if (this.Browse_Equip_List(equip_no)) {
      //     return 'NoCommunication.png'
      //   }
      // }
    },
    XMLDOM2treeList(x, temObj) {
      for (let i = 0; i < x.length; i++) {
        if (x[i].childNodes.length > 0) {
          temObj.children.push({
            id: x[i].getAttribute("EquipNo"),
            label: x[i].getAttribute("Name"),
            open: true,
            checked: false,
            nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
            parentId: null,
            visible: true,
            searched: false,
            bgName: `${this.selectAlarm(x[i].getAttribute("Name"), x[i].getAttribute("EquipNo"), true)}`,
            children: []
          })
          this.XMLDOM2treeList(x[i].childNodes, temObj.children[i])
        } else {
          temObj.children.push({
            id: x[i].getAttribute("EquipNo"),
            label: x[i].getAttribute("Name"),
            open: true,
            checked: false,
            nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
            parentId: null,
            visible: true,
            searched: false,
            bgName: `${this.selectAlarm(x[i].getAttribute("Name"), x[i].getAttribute("EquipNo"))}`,
          })
        }
      }
      this.treeData = [];
      this.treeData.push(temObj)
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
    },
    getselected() {
      console.log(this.$refs.tree.getSelectedNodeIds())
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

  },
  components: {
    tree,
    vtable
  }
}
</script>

<style lang="scss" scoped>
div {
  .tree {
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
  .vtalbe {
    position: absolute;
    left: 23%;
    top: 0;
    right: 0;
    bottom: 0;
  }
}
</style>


