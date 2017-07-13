<template>
  <div class="fullScreenPopup">
    <div class="fullScreenAll"></div>
    <div class="fullScreenCenter">
      <!-- 头部title -->
      <div class="MessageBox_top">
        <span>配置</span>
        <button class="MessageBox_top_Exit">
          <i class="iconfont icon-guanbi"></i>
        </button>
      </div>
      <!-- 中间的内容操作块 -->
      <div class="system_plug">
        <ul class="nav-tabList">
          <li v-for="(item,index) of tabsItemName" :key="index" :class="{active:curractiveIndex==index}" @click="select(index)">{{tabsItemName[index]}}</li>
        </ul>
        <div class="tab-content">
          <article>
            <div id="commonlyList_Equip">
              <div class="system_plug_list">
                <div class="listStyle">
                  <ul>
                    <li>我是列表栏</li>
                  </ul>
                </div>
              </div>
              <div class="system_plug_Data">
                <div class="sys_plug_ul_height_1">
                  <ul>
                    <li>
                      <span>设备号：</span>
                      <b>1</b>
                      <div class="clear"></div>
                    </li>
                    <li>
                      <span>设备名称：</span>
                      <input type="text">
                      <div class="clear"></div>
                    </li>
                    <li>
                      <span>关联视频：</span>
                      <select name="" id=""></select>
                      <div class="clear"></div>
                    </li>
                  </ul>
                </div>
                <div class="sys_plug_ul_height_2">
                  <ul>
                    <li>
                      <span>显示报警：</span>
                      <input type="checkbox">
                      <div class="clear"></div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="system_plug_botton">
                <p>
                  <span>配置更多属性，请单击</span>
                  <button class="advancedSetparm">
                    高级配置
                  </button>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
      <!-- 底部的确定，取消按钮啥的 -->
      <p class="MessageBox_p3">
        <button>确定</button>
        <button>取消</button>
        <button>应用</button>
      </p>
    </div>

  </div>
</template>

<script type="es6">
export default {
  // props:["tabsItemNameA"],
  data() {
    return {
      tabsItemName: ["设备配置", "模拟量配置", "状态量配置", "设置配置"],
      curractiveIndex: 0
    }
  },
  methods: {
    select(param) {
      this.curractiveIndex = param
    }
  }
  // computed:{
  //   tabsItemNameB(){
  //     return this.tabsItemNameA
  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin.scss';

.fullScreenPopup {
  @include absoluteWH(100%, 100%);
  position: fixed;
  @include trbl(0, auto, auto, 0);
  background: rgba(0, 0, 0, .6);
  z-index: 100;
  .fullScreenAll {
    position: absolute;
    @include trbl(0, 0, 0, 0);
    z-index: 1;
  }
  .fullScreenCenter {
    top: 35%;
    color: #fff;
    position: relative;
    padding: 20px;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: 0 0;
    text-shadow: 0 1px 5px rgba(0, 0, 0, .25);
    z-index: 2;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .25);
    width: 500px;
    background: url(/static/img/bg_1.jpg);
    .MessageBox_top {
      position: absolute;
      @include trbl(0, 0, auto, 0);
      z-index: 200;
      span {
        display: block;
        float: left;
        padding: 8px 12px;
      }
      .MessageBox_top_Exit {
        background-color: transparent;
        padding: 8px 12px;
        border: none;
        color: #fff;
        cursor: pointer;
        float: right;
      }
    }
    .system_plug {
      height: 350px;
      display: block;
      position: relative;
      margin: 20px 0 0 -20px;
      .nav-tabList {
        list-style: none;
        margin: 0;
        padding-left: 13px;
        li {
          float: left;
          margin-right: 4px;
          cursor: pointer;
          padding: 6px 12px;
          background: rgba(255, 255, 255, .13);
          border-radius: 4px 4px 0 0;
          transition: all 300ms linear 0s;
          &:hover {
            background: rgba(255, 255, 255, .36);
            color: #fff;
          }
        }
        .active {
          background: rgba(255, 255, 255, .8)!important;
          color: #000!important;
        }
      }
      .tab-content {
        border: 1px solid rgba(255, 255, 255, .15);
        clear: both;
        @include absoluteWH(auto, auto);
        @include trbl(28px, 0, 0, 13px);
        article {
          @include absoluteWH(auto, auto);
          @include trbl(0, 0, 0, 0);
          #commonlyList_Equip {
            .system_plug_list {
              position: absolute;
              @include trbl(0, 66%, 0, 0);
              overflow-y: auto;
              display: block;
              border: 1px solid rgba(255, 255, 225, .15);
              bottom: 35px!important;
              .listStyle {
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
                    &.active {
                      background: rgba(255, 255, 255, .36)!important;
                    }
                    &:hover {
                      background: rgba(255, 255, 255, .2);
                    }
                  }
                }
              }
            }
            .system_plug_Data {
              position: absolute;
              @include trbl(0, 0, 0, 34%);
              display: block;
              bottom: 35px!important;
              .sys_plug_ul_height_1 {
                border: 1px solid rgba(255, 255, 225, .15);
                overflow: auto;
                height: 198px;
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
                    &:hover {
                      background: none!important;
                    }
                    span {
                      float: left;
                      display: block;
                      min-width: 82px;
                      text-align: right;
                    }
                    input {
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
                    select {
                      background: rgba(255, 255, 255, .2);
                      border: 1px solid rgba(255, 255, 255, .4);
                      color: #FFF;
                      transition: all 300ms linear 0s;
                      padding: 5px 10px;
                      outline: 0;
                      float: left;
                      width: 195px!important;
                      display: block;
                    }
                  }
                }
              }
              .sys_plug_ul_height_2 {
                border: 1px solid rgba(255, 255, 225, .15);
                overflow: auto;
                height: 87px;
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
                    &:hover {
                      background: none!important;
                    }
                    span {
                      float: left;
                      display: block;
                      min-width: 82px;
                      text-align: right;
                    }
                    input {
                      top: 2px!important;
                      cursor: pointer;
                    }
                  }
                }
              }
            }
            .system_plug_botton {
              position: absolute;
              left: 13px;
              bottom: 0;
              right: 13px;
              p {
                margin: 3px 0;
                text-align: right;
                button {
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
            }
          }
        }
        .active {
          display: block;
        }
      }
    }
    .MessageBox_p3 {
      text-align: right;
      button {
        border: none;
        border-radius: 2px;
        padding: 6px 12px;
        box-shadow: inset 0 -2px 0 rgba(0, 0, 0, .05);
        color: #fff;
        font-family: "Microsoft YaHei";
        background: rgba(0, 0, 0, .3);
        margin-right: 10px;
        padding-left: 15px;
        padding-right: 15px;
        font-size: 14px;
        &:hover {
          background: rgba(0, 0, 0, .4);
          color: #fff;
        }
      }
    }
  }
}
</style>


