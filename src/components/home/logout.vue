<template>
  <div class="logout">
    <div class="logout-content">
      <div class="mg-default-center">
        <p class="MessageBox_p1">
          <i class="iconfont"></i>
          <b>注销 {{outMsg}}?</b>
        </p>
        <p class="MessageBox_p2">这将重新登录？</p>
        <p class="MessageBox_p3">
          <button @click="confirm()">确定</button>
          <button @click="cancel()">取消</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script type="es6">
export default {
  computed: {
    outMsg() {
      return window.localStorage.userName
    }
  },
  methods: {
    confirm() {
      window.localStorage.userName = "";
      window.localStorage.userPWD = "";
      this.cancel();
    },
    cancel() {
      this.$store.commit('switchLogout');
    }
  }
}
</script>

<style lang="scss" scopedSlots>
.logout {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .6);
  z-index: 100;
  .logout-content {
    top: 35%;
    color: #fff;
    position: relative;
    padding: 20px;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: 0 0; // background-image: url("./bg1_.jpg");
    text-shadow: 0 1px 5px rgba(0, 0, 0, .25);
    z-index: 2;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .25);
    .mg-default-center {
      width: 400px;
      margin: 0 auto;
      p {
        text-align: left
      }
      .MessageBox_p1 {
        font-size: 24px;
        white-space: pre-wrap;
        i {
          font-size: 24px;
          font-family: "iconfont" !important; // font-size: 16px;
          font-style: normal;
          &:before {
            content: "\e61a";
          } // .iconfont {}
        }
      }
      .MessageBox_p2 {
        font-size: 13px;
      }
      .MessageBox_p3 {
        text-align: right;
        button {
          margin-right: 10px;
          padding-left: 15px;
          padding-right: 15px;
          font-size: 14px;
          border: none;
          border-radius: 2px;
          padding: 6px 12px;
          box-shadow: inset 0 -2px 0 rgba(0, 0, 0, .05);
          color: #fff;
          font-family: "Microsoft YaHei";
          background: rgba(0, 0, 0, .2);
          cursor: pointer;
          &:hover {
            background: rgba(0, 0, 0, .4);
            color: #fff;
          }
        }
      }
    }
  }
}
</style>


