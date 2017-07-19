<template>
  <div>
    <template v-if="!this.advancedConfig_STATUS">
      <!-- 左侧列表 -->
      <div class="nav">
        <!-- 导航条件选择快 -->
        <select class="nav_source" v-model="currentEquipNo" @change="getCurrentEquipMsg()">
          <option value="" v-for="(item,index) of equipNoArr" :key="index" :value="item.id">{{item.label}}</option>
        </select>
        <!-- 导航列表 -->
        <div class="nav_list">
          <ul>
            <li v-for="(item,index) of currentEquipMsg" :key="index" @click="getEquipMsgObj(item,index)" :class="{active:currentEquipMsgObjIndex==index}">{{item.set_nm}}</li>
          </ul>
        </div>
      </div>
      <!-- 右侧内容块 -->
      <div class="content">
        <div class="content_list">
          <ul @change="getChangeValue($event)">
            <li>
              <span>设备号：</span>
              <b>{{currentEquipMsgObj.equip_no}}</b>
              <div class="clear"></div>
            </li>
            <li>
              <span>设置号：</span>
              <b>{{currentEquipMsgObj.set_no}}</b>
              <div class="clear"></div>
            </li>
            <li>
              <span>设置名称：</span>
              <input type="text" v-model="currentEquipMsgObj.set_nm" listName="set_nm">
              <div class="clear"></div>
            </li>
            <li>
              <span>值：</span>
              <input type="text" v-model="currentEquipMsgObj.value" listName="value">
              <div class="clear"></div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 底部按钮块 -->
      <div class="foot_btn">
        <span>配置更多属性，请单击 </span>
        <button class="advancedConfig" @click="advancedConfig()">高级配置</button>
      </div>
    </template>
    <!-- 高级配置内容块 -->
    <template v-if="this.advancedConfig_STATUS">
      <div class="detailedConfig">
        <div class="content_list">
          <ul @change="getChangeValue($event)">
            <li>
              <span>设置类型：</span>
              <input type="text" v-model="currentEquipMsgObj.set_type" listName="set_type">
              <div class="clear"></div>
            </li>
            <li>
              <span>动作：</span>
              <input type="text" v-model="currentEquipMsgObj.action" listName="action">
              <div class="clear"></div>
            </li>
            <li>
              <span>操作命令：</span>
              <input type="text" v-model="currentEquipMsgObj.main_instruction" listName="main_instruction">
              <div class="clear"></div>
            </li>
            <li>
              <span>操作参数：</span>
              <input type="text" v-model="currentEquipMsgObj.minor_instruction" listName="minor_instruction">
              <div class="clear"></div>
            </li>
            <li>
              <span>记录：</span>
              <input type="checkbox" :checked="currentEquipMsgObj.record" listName="record" @click="updataCheckbox($event,'record')">
              <div class="clear"></div>
            </li>
            <li>
              <span>是否可以执行：</span>
              <input type="checkbox" :checked="currentEquipMsgObj.canexecution" listName="canexecution" @click="updataCheckbox($event,'canexecution')">
              <div class="clear"></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="foot_btn">
        <button class="advancedConfig" @click="advancedConfig()">返回</button>
      </div>
    </template>
  </div>
</template>

<script type="es6">
export default {
  props: ["equipNoArrA", "tableItemName", "curractiveIndex"],
  data() {
    return {
      advancedConfig_STATUS: false,
      // 当前被选中的设备号
      currentEquipNo: '',
      // 当前被选中的设备信息
      currentEquipMsg: [],

      // 当前被选中的设备详细信息index
      currentEquipMsgObjIndex: '',
      // 当前被选中的设备详细信息
      currentEquipMsgObj: {},

      // 提交上去的jsonChange
      temJsonChange: []
    }
  },
  methods: {
    updataCheckbox(e, item) {
      this.currentEquipMsgObj[item] = e.target.checked
    },
    getChangeValue(e) {
      let temObj
      if (e.target.type === "checkbox") {
        temObj = {
          id: this.currentEquipMsgObj.equip_no,
          SetParm_ID: this.currentEquipMsgObj.set_no,
          listName: e.target.getAttribute('listName'),
          // vlaue: e.target.checked
          vlaue: `'${e.target.checked}'`
        }
      } else {
        temObj = {
          id: this.currentEquipMsgObj.equip_no,
          SetParm_ID: this.currentEquipMsgObj.set_no,
          listName: e.target.getAttribute('listName'),
          // vlaue: e.target.value
          vlaue: `'${e.target.value}'`
        }
      }
      this.temJsonChange.push(temObj)
      // console.log(temObj);
      this.$emit("getJsonChangeArr", temObj)
    },
    advancedConfig() {
      this.advancedConfig_STATUS = !this.advancedConfig_STATUS
    },
    // 通过select选中的设备号获取该设备下的测点什么的信息
    getCurrentEquipMsg() {
      this.currentEquipMsg = []
      this.tableItemName[this.curractiveIndex].value.forEach((item) => {
        if (this.currentEquipNo === item.equip_no) {
          this.currentEquipMsg.push(item);
        }
      })
    },
    // 点击二级设备列表获取当前详细信息
    getEquipMsgObj(item, index) {
      this.currentEquipMsgObjIndex = index
      this.currentEquipMsgObj = item
    }
  },
  computed: {
    equipNoArr() {
      let temArr = [];
      this.equipNoArrA.forEach((itemA) => {
        for (let itemB of this.tableItemName[this.curractiveIndex].value) {
          if (itemA.id === itemB.equip_no) {
            temArr.push(itemA)
            break
          }
        }
      });
      return temArr
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin.scss';

@mixin ul-li {
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
      /* 此代码可以提取为公用 */
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
    }
    .active {
      background: rgba(255, 255, 255, .36)!important;
    }
  }
}

@mixin content-list($span-min-width) {
  .content_list {
    overflow: auto;
    height: 198px;
    @include ul-li;
    span {
      float: left;
      display: block;
      min-width: $span-min-width;
      text-align: right;
    }
    input[type="text"] {
      background: rgba(255, 255, 255, .2);
      border: 1px solid rgba(255, 255, 255, .4);
      color: #FFF;
      margin: 0px;
      padding: 6px 12px;
      display: block;
      width: 100%;
      transition: all 300ms linear 0s;
      float: left;
      width: 195px!important;
      display: block;
      top: 2px!important;
    }
  }
}





















































/* 左侧导航  */

.nav {
  @include absoluteWH(auto, auto);
  @include trbl(0, 66%, 35px, 0);
  overflow-y: auto;
  display: block;
  border: 1px solid rgba(255, 255, 225, .15);
  /*  导航条件选择快 */
  .nav_source {
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
  } // 导航列表
  .nav_list {
    height: auto;
    overflow: auto;
    @include ul-li;
  }
}

//  右侧内容块 
.content {
  @include absoluteWH(auto, auto);
  @include trbl(0, 0, 35px, 34%);
  display: block;
  bottom: 35px!important;
  border: 1px solid rgba(255, 255, 225, .15);
  @include content-list(82px);
}

@include content-list(182px);

//  底部按钮样式
// 此段代码可以共用 
.foot_btn {
  position: absolute;
  left: 13px;
  bottom: 0;
  right: 13px;
  margin: 3px 0;
  text-align: right;
  .advancedConfig {
    border: none;
    border-radius: 2px;
    padding: 6px 12px;
    box-shadow: inset 0 -2px 0 rgba(0, 0, 0, .05);
    color: #fff;
    font-family: "Microsoft YaHei";
    background-color: rgba(50, 219, 1, 0.3);
    &:hover {
      background-color: rgba(50, 219, 1, 0.6);
      color: #fff;
      box-shadow: 0 0 2rem 0.5rem rgba(50, 219, 1, 0.3);
    }
  }
}
</style>
