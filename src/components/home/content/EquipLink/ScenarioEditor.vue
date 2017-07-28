<template>
  <div class="main">
    <div class="content1">
      <p class="title">场景列表</p>
      <div class="list">
        <ul>
          <li v-for="(item,index) of SetParmTable" :key="index" v-if="item.set_type==='J'" :class="{active:currParmTableIndex===index}" @click="setIndex(item,index)">{{item.set_nm}}</li>
        </ul>
      </div>
    </div>
    <div class="content2">
      <div class="btn-block">
        <button class="btn" @click="saveData()">
          <i class="iconfont icon-baocun"></i>保存
        </button>
        <button class="btn" @click="remove()">
          <i class="iconfont icon-shanchu"></i>删除
        </button>
        <button class="btn" @click="add()">
          <i class="iconfont icon-tianjia"></i>添加
        </button>
      </div>
      <p class="title">场景内容编辑</p>
      <div class="content-edit">
        <div class="cd-left">
          <div class="title">
            <div class="title-name">场景名称</div>
            <input type="text" class="title-content" v-model="SetParmItemName">
          </div>
          <div class="content">
            <ul>
              <li v-for="(item,index) of SetParmItemContent" :key="index" @click="SetParmItemContentIndex=parseInt(index)" :class="{active:SetParmItemContentIndex===index}">
                {{item}}
              </li>
            </ul>
          </div>
          <div class="btn">
            <button @click="delete_scenelist()">删除</button>
            <button @click="move_scenelist('up')">上移</button>
            <button @click="move_scenelist('down')">下移</button>
          </div>
        </div>
        <div class="cd-right" @change="radioChange($event)">
          <p>
            <label for="equipCtrl">
              <input id="equipCtrl" name="scene_rdo" type="radio">设备控制
            </label>
          </p>
          <select name="" id="" :disabled="radio_disabled != 'equipCtrl'" @change="select($event)">
            <option v-for="(item,index) of SetParmTable" :key="index" :value="item.set_type" :select="index===0" :index="index">{{item.set_nm}}</option>
          </select>
          <div class="temperature" v-show="temperatureStatus">
            <span>温度设置</span>
            <input type="text">
          </div>
          <p>
            <label for="delayInterval">
              <input id="delayInterval" name="scene_rdo" type="radio">延时间隔
            </label>
          </p>
          <div class="time">
            <input type="text" :disabled="radio_disabled != 'delayInterval'" v-model="dayTime">
            <span>天</span>
            <input type="text" :disabled="radio_disabled != 'delayInterval'" v-model="hourTime">
            <span>小时</span>
            <input type="text" :disabled="radio_disabled != 'delayInterval'" v-model="MinuteTime">
            <span>分</span>
            <input type="text" :disabled="radio_disabled != 'delayInterval'" v-model="secondeTime">
            <span>秒</span>
          </div>
          <button @click="insert_sceneList()">插入</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="es6">
export default {
  data() {
    return {
      // 天
      dayTime: '',
      // 小时
      hourTime: '',
      // 分
      MinuteTime: '',
      // 秒
      secondeTime: '',
      equipTable: [],
      // 场景表
      SetParmTable: [],
      //设备控制选中索引
      SetParmTableIndex: '',
      // 场景名称
      SetParmItemName: '',
      // 场景名称下的内容
      SetParmItemContent: [],
      // 场景内容中的索引
      SetParmItemContentIndex: '',
      ycpTable: [],
      yxpTable: [],
      autoTable: [],
      currParmTableIndex: '',
      radio_disabled: '',
      // 温度设置区块显示状态
      temperatureStatus: false,
      // TODO:数据没响应式更新
      // addName: this.$store.state.scenarioName
    }
  },
  computed: {
    addName() {
      let temArr = []
      this.SetParmTable.forEach((item) => {
        if (item.set_type === "J") {
          temArr.push(item)
        }
      });
      if (temArr.length == 0) {
        temArr[0] = {}
        this.equipTable.forEach((item) => {
          if (item.communication_drv === "GWChangJing.NET.dll") {
            temArr[0].equip_no = item.equip_no
            temArr[0].set_no = 0
          }
        });
      }
      let obj = {
        equio_no: temArr[0].equip_no,
        set_no: parseInt(temArr[temArr.length - 1].set_no) + 1,
        set_nm: this.$store.state.scenarioName,
        set_type: 'J',
        value: ''
      }
      this.SetParmTable.unshift(obj)
      return this.$store.state.scenarioName
    }
  },
  created() {
    this.$http.post(`${this.$store.state.urlCommon}QueryMultiTable`, this.$qs.stringify({
      tableNames: "Equip,SetParm,ycp,yxp,AutoProc"
    })).then((res) => {
      const temXML = this.XMLStr2XMLObj(res.data)

      this.equipTable = JSON.parse(temXML.getElementsByTagName("string")[0].innerHTML);
      this.SetParmTable = JSON.parse(temXML.getElementsByTagName("string")[1].innerHTML);
      this.ycpTable = JSON.parse(temXML.getElementsByTagName("string")[2].innerHTML);
      this.yxpTable = JSON.parse(temXML.getElementsByTagName("string")[3].innerHTML);
      this.autoTable = JSON.parse(temXML.getElementsByTagName("string")[4].innerHTML);
    }).catch((error) => {
      console.log(error);
    })
  },
  methods: {
    remove(){

    },
    add() {
      this.$store.commit('EquipLink_ADD_Status')
    },
    //插入按钮
    insert_sceneList() {
      // 过滤当前是否有选中项
      if (this.currParmTableIndex == null) {
        return
      }
      let m = ''
      if (this.SetParmTable[this.currParmTableIndex].value != "") {
        m = '+'
      }
      // 设备控制
      if (document.querySelector('#equipCtrl').checked) {
        // let Str_values = `${this.SetParmTable[0].equip_no},${this.SetParmTable[0].set_no},${this.SetParmTable[0].set_nm},${this.SetParmTable[0].equip_no},${this.SetParmTable[0].set_type},${this.SetParmTable[0].value}`
        let temIndex = this.SetParmTableIndex || 0
        let Obj_values = {
          equip_no: this.SetParmTable[temIndex].equip_no,
          set_no: this.SetParmTable[temIndex].set_no,
          set_nm: this.SetParmTable[temIndex].set_nm,
          set_type: this.SetParmTable[temIndex].set_type,
          value: this.SetParmTable[temIndex].value
        }
        // let Arr_values = Str_values.split(',')
        for (let i = 0, n = this.equipTable.length; i < n; i++) {
          var item = this.equipTable[i];
          if (Obj_values.equip_no == item.equip_no) {
            this.SetParmItemContent.push(`${item.equip_nm} ${Obj_values.set_nm}`)
            // 这里好像没有相等的情况            
            if (Obj_values.set_nm == "V") {
              this.SetParmTable[this.currParmTableIndex].value += `${m + Obj_values.equip_no},${Obj_values.set_no},${Obj_values.value}`
            } else {
              this.SetParmTable[this.currParmTableIndex].value += `${m + Obj_values.equip_no},${Obj_values.set_no}`
            }
            break
          }
        }

      }
      // 延时间隔
      else {
        let num = 0, numb = 0
        if (this.dayTime != '') {
          num += parseInt(this.dayTime) * 60 * 60 * 1000
        } else {
          numb++
        }

        if (this.hourTime != '') {
          num += parseInt(this.hourTime) * 60 * 1000
        } else {
          numb++
        }

        if (this.MinuteTime != '') {
          num += parseInt(this.MinuteTime) * 1000
        } else {
          numb++
        }

        if (this.secondeTime != '') {
          num += parseInt(this.secondeTime)
        } else {
          numb++
        }

        if (numb != 4) {
          this.SetParmItemContent.push(`延时间隔 ${num} 毫秒`)
          this.SetParmTable[this.currParmTableIndex].value += m + num;
        }
      }
    },
    // 设备控制select下拉框change事件
    select(e) {
      this.temperatureStatus = false
      this.SetParmTableIndex = parseInt(e.target.options[e.target.selectedIndex].getAttribute("index"))
      if (e.target.type === "select-one" && e.target.value === "V") {
        this.temperatureStatus = true

      }
    },
    radioChange(e) {
      // 复选框的单机事件
      if (e.target.type === "radio") {
        this.radio_disabled = e.target.getAttribute("id")
      }
    },
    // 删除场景内容块中选中行
    delete_scenelist() {
      this.SetParmItemContent.splice(this.SetParmItemContentIndex, 1);
    },
    move_scenelist(param) {
      // 如果只剩一项或者没项
      if (this.SetParmItemContent.length <= 1) {
        return
      }
      switch (param) {
        // 上移
        case 'up':
          let tem_up = this.SetParmItemContent[this.SetParmItemContentIndex]
          if (this.SetParmItemContentIndex == 0) {
            this.SetParmItemContent.splice(this.SetParmItemContentIndex, 1);
            this.SetParmItemContent.push(tem_up)
          } else {
            let tem_up_2 = this.SetParmItemContent[this.SetParmItemContentIndex - 1]
            this.SetParmItemContent.splice(this.SetParmItemContentIndex, 1, tem_up_2)
            this.SetParmItemContent.splice(this.SetParmItemContentIndex - 1, 1, tem_up)
          }
          break;
        // 下移
        case 'down':
          let tem_down = this.SetParmItemContent[this.SetParmItemContentIndex]
          if (this.SetParmItemContentIndex == this.SetParmItemContent.length - 1) {
            this.SetParmItemContent.splice(this.SetParmItemContentIndex, 1);
            this.SetParmItemContent.unshift(tem_up)
          } else {
            // 获取后一位的值
            let tem_down_2 = this.SetParmItemContent[this.SetParmItemContentIndex + 1]
            this.SetParmItemContent.splice(this.SetParmItemContentIndex, 1, tem_down_2)
            this.SetParmItemContent.splice(this.SetParmItemContentIndex + 1, 1, tem_down)
          }
          break;
        default:
          console.log("移动参数有误");
          break;
      }
    },
    setIndex(item, index) {
      // console.log(item);
      this.SetParmItemName = item.set_nm
      this.currParmTableIndex = parseInt(index)
      // 拿到当前的设备号与设置号
      let temStr = item.value
      let valuelist
      if (temStr) {
        valuelist = temStr.split('+')
      }
      this.SetParmItemContent = []
      if (valuelist[0] != null) {
        valuelist.forEach((item) => {
          let values = item.split(',')
          if (values.length === 1) {
            this.SetParmItemContent.push(`延时间隔 ${values[0]}`)
          } else {
            let tem_set_nm = ''
            this.SetParmTable.forEach((item) => {
              // 通过设备号与设置号获取对应的设置名
              if (values[0] == item.equip_no && values[1] == item.set_no) {
                tem_set_nm += item.set_nm
              }
            });
            this.equipTable.forEach((item) => {
              // 通过设备号与获取对应的设备名
              if (values[0] == item.equip_no) {
                tem_set_nm = `${item.equip_nm} ${tem_set_nm}`
              }
            });
            this.SetParmItemContent.push(tem_set_nm)
          }
        })
      }
    },
    // xml串转成xml对象
    XMLStr2XMLObj(str) {
      if (document.all) {
        var xmlDom = new ActiveXObject("Microsoft.XMLDOM")
        xmlDom.loadXML(str)
        return xmlDom
      } else {
        return new DOMParser().parseFromString(str, "text/xml")
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin.scss';
.main {
  .content1 {
    @include absoluteWH(auto, auto);
    @include trbl(0, 70%, 0, 0);
    .title {
      text-align: center;
    }
    .list {
      @include absoluteWH(auto, auto);
      @include trbl(34px, 13px, 13px, 13px);
      overflow-y: auto;
      border: 1px solid rgba(255, 255, 225, .15);
    }
  }
  .content2 {
    @include absoluteWH(auto, auto);
    @include trbl(0, 0, 0, 30%);
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
    >.title {
      width: 100%;
      background: rgba(255, 255, 255, .4);
      margin: 0;
      padding: 10px 15px;
      margin-top: 34px;
    }
    >.content-edit {
      @include absoluteWH(auto, auto);
      @include trbl(71px, 0, 0, 0);
      border: 1px solid rgba(255, 255, 225, .15);
      >.cd-left {
        @include absoluteWH(auto, auto);
        @include trbl(13px, 50%, 0, 0);
        padding: 0 13px 13px;
        >.title {
          position: relative;
          display: table;
          border-collapse: separate;
          width: 100%;
          >.title-name {
            float: left;
            background: rgba(255, 255, 255, .2);
            border: 1px solid rgba(255, 255, 255, .4);
            padding: 5px 10px;
            display: table-cell;
            white-space: nowrap;
            vertical-align: middle;
          }
          >.title-content {
            background: rgba(255, 255, 255, .2);
            border: 1px solid rgba(255, 255, 255, .4);
            color: #FFF;
            margin: 0px;
            padding: 6px 12px;
            display: block;
            width: 100%;
            transition: all 300ms linear 0s;
            display: table-cell;
            float: left;
            width: auto!important;
          }
        }
        >.content {
          @include absoluteWH(auto, auto);
          @include trbl(34px, 13px, 48px, 13px);
          overflow-y: auto;
          border: 1px solid rgba(255, 255, 225, .15);
        }
        >.btn {
          @include absoluteWH(auto, auto);
          @include trbl(auto, 0, 6px, 13px);
        }
      }
      >.cd-right {
        @include absoluteWH(auto, auto);
        @include trbl(13px, 0, 0, 50%);
        padding: 0 13px 13px;
        .temperature {
          margin: 13px;
        }
        input[type="radio"] {
          vertical-align: top;
        }
        input[type="text"] {
          background: rgba(255, 255, 255, .2);
          border: 1px solid rgba(255, 255, 255, .4);
          color: #FFF;
          margin: 0px;
          padding: 6px 12px;
          transition: all 300ms linear 0s;
          display: inline;
          width: 20%;
        }
        select {
          background: rgba(255, 255, 255, .2);
          border: 1px solid rgba(255, 255, 255, .4);
          color: #FFF;
          transition: all 300ms linear 0s;
          padding: 5px 10px;
          outline: 0;
          width: 100%;
          option {
            background: rgba(0, 0, 0, .9);
            border-color: rgba(0, 0, 0, .4);
            color: #FFF;
          }
        }
        .time {
          margin-bottom: 10px;
        }
      }
    }
  }
}

button {
  border: none;
  border-radius: 2px;
  padding: 6px 12px;
  box-shadow: inset 0 -2px 0 rgba(0, 0, 0, .05);
  color: #fff;
  font-family: "Microsoft YaHei";
  background: rgba(0, 0, 0, .3);
  &:hover {
    background: rgba(0, 0, 0, .4);
    color: #fff;
  }
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  white-space: nowrap;
  li {
    line-height: 30px;
    padding: 0 12px;
    cursor: default;
    transition: all 300ms linear 0s;
    &:nth-child(odd) {
      background: rgba(0, 0, 0, .13);
      border-top: 1px solid rgba(255, 255, 225, .15);
      border-bottom: 1px solid rgba(255, 255, 225, .15);
    }
    &:nth-child(even) {
      background-color: transparent;
    }
    &:hover {
      background: rgba(255, 255, 255, .2);
    }
    &.active {
      background: rgba(255, 255, 255, .36)!important;
    }
  }
}
</style>

 
