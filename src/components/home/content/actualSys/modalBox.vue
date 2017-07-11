<template>
  <div class="fullScreenCenter">
    <!--头部提示栏-->
    <div class="MessageBox_top">
      <span>确定处理该事件吗？</span>
      <button @click="updataModal">
        <i class="iconfont icon-guanbi"></i>
      </button>
    </div>
    <!--title-->
    <p class="MessageBox_p1">{{modalBoxMsg}}</p>
    <p>请输入处理意见(100字以内)：</p>
    <textarea v-model="procMsg"></textarea>
    <p>
      <label>
        <input type="checkbox" @click="numListStatus=!numListStatus">
        <span>是否发送短信</span>
      </label>
    </p>
    <!--TODO:电话号码列表动画有bug-->
    <div class="procsContent" :class="{show:numListStatus,hide:!numListStatus}">
      <ul>
        <li v-for="(item,index) of atorMsg" :key="index">
          <label>
            <input type="checkbox" @click="getTelStr(item.MobileTel)">
            <span>{{item.MobileTel}}({{item.Administrator}})</span>
          </label>
        </li>
      </ul>
    </div>
    <p class="MessageBox_p3">
      <button @click="EventConfirm">确定</button>
      <button @click="updataModal">取消</button>
    </p>
  </div>
</template>

<script type="es6">
export default {
  props: ["modalBoxInfo", "atorInfo"],
  data() {
    return {
      atorMsg: this.atorInfo,
      modalBoxMsg: this.modalBoxInfo.事件,
      // 发送人的电话号码
      telStr: "",
      // 是否发送号码
      numListStatus: false,
      // 处理意见
      procMsg: '',

    }
  },
  computed: {

  },
  methods: {
    updataModal() {
      this.$emit("child")
    },
    // 获取发送人的电话号码
    getTelStr(param) {
      if (this.numListStatus) {
        this.telStr += `${param},`
      }
    },
    EventConfirm() {
      this.telStr = this.telStr.substring(0, this.telStr.length - 1)
      this.$http.post(`${this.$store.state.urlCommon}EventConfirm`, {
        procMsg: this.procMsg,
        isMsg: this.numListStatus,
        telStr: this.telStr,
        procName: this.modalBoxInfo.事件,
        procTime: this.modalBoxInfo.时间,
        userName: window.localStorage.userName
      }).then((res) => {
        if (res.data.d === "true") {
          this.$emit("child")
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  .fullScreenCenter {
    color: #fff;
    position: relative;
    padding: 20px;
    margin: 0 auto;
    text-shadow: 0 1px 5px rgba(0, 0, 0, .25);
    z-index: 90;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .25);
    width: 500px;
    top: 10%;
    background-repeat: no-repeat;
    background-position: 0 0;
    background: url("/static/img/bg_1.jpg");
    .MessageBox_top {
      position: absolute;
      /*top: 0;
      left: 0;
      right: 0;*/
      z-index: 200;
      @include trbl(0,
      0,
      auto,
      0);
      span {
        display: block;
        float: left;
        padding: 8px 12px;
      }
      button {
        background-color: transparent;
        padding: 8px 12px;
        border: none;
        color: #fff;
        cursor: pointer;
        float: right;
        &:hover {
          background-color: rgba(0, 0, 0, .4);
          color: #fff;
        }
      }
    }
    .MessageBox_p1 {
      font-size: 24px;
      white-space: pre-wrap;
    }
    textarea {
      background: rgba(255, 255, 255, .2);
      border: 1px solid rgba(255, 255, 255, .4);
      color: #FFF;
      margin: 0px;
      padding: 6px 12px;
      display: block;
      max-width: 100%;
      max-height: 100px;
      transition: all 300ms linear 0s;
    }
    p {
      label {
        input {
          vertical-align: middle;
          width: 14px;
          height: 14px;
        }
        span {
          vertical-align: middle;
          font-size: 14px;
        }
      }
    }
    .procsContent {
      // display: none;
      max-height: 0px;
      border: none;
      overflow-y: hidden;
      margin-top: 10px; // border: 1px solid rgba(255, 255, 225, .15); // display: none;
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
          padding-left: 0!important;
          &:nth-child(odd) {
            background: rgba(0, 0, 0, .13);
            border-top: 1px solid rgba(255, 255, 225, .15);
            border-bottom: 1px solid rgba(255, 255, 225, .15);
          }
          input {
            top: 2px!important;
            vertical-align: middle;
            margin-left: 10px;
          }
          span {
            vertical-align: middle;
          }
        }
      }
    }
    .show {
      animation: show .5s 1;
      animation-fill-mode: forwards;
      @keyframes show {
        0% {
          display: block;
          max-height: 0px;
        }
        100% {
          max-height: 104px;
          border: 1px solid rgba(255, 255, 225, 0.15);
          display: block;
        }
      }
    }
    .hide {
      animation: hide .5s 1;
      animation-fill-mode: forwards;
      @keyframes hide {
        0% {
          display: block;
          max-height: 104px;
        }
        100% {
          max-height: 0px;
          border: none;
          display: block;
        }
      }
    }
    .MessageBox_p3 {
      text-align: right;
      button {
        border: none;
        border-radius: 2px;
        margin-right: 10px;
        padding: 6px 12px;
        box-shadow: inset 0 -2px 0 rgba(0, 0, 0, .05);
        color: #fff;
        font-family: "Microsoft YaHei";
        background: rgba(0, 0, 0, .3);
        /*padding-left: 15px;
        padding-right: 15px;*/
        padding: auto, 15px, auto, 15px;
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




