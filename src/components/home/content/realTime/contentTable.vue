<template>
  <div>
    写个树形例子
    <ul>
      <li v-for="(item_A,index) of children" :key="index">
        <span>{{item_A.name}}</span>
        <ul v-if="item_A.children">
          <li v-for="(item_B,index_B) of item_A.children" :key="index_B">
            <span>{{item_B.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script type="es6">
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
      open: false,
      children: [
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [
            {
              name: 'child folder',
              children: [
                { name: 'hello' },
                { name: 'wat' }
              ]
            },
            { name: 'hello' },
            { name: 'wat' },
            {
              name: 'child folder',
              children: [
                { name: 'hello' },
                { name: 'wat' }
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

    // 验证请求的权限
    checkIsAdmin() {
      return this.$http.post(`${this.$store.state.urlCommon}/UserPermissions`, {
        userName: window.localStorage.userName
      })
    },
    // 获取所有设备的状态
    allEquipSatatus() {
      return this.$http.post(`${this.$store.state.urlCommon}/GetEquipAllState`)
    },
    // 获取设备列表
    treeConfList2() {
      return this.$http.post(`${this.$store.state.urlCommon}/GWEquipTree`)
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
  }
}
</script>

<style lang="scss">

</style>


