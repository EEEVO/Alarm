<template>
  <div>
    <form class="login-content">
      <div class="userName signin-input">
        <i class="iconfont icon-yonghu"></i>
        <input type="text" placeholder="请输入用户名" required v-model.trim="userName">
      </div>
      <div class="userPwd signin-input">
        <i class="iconfont icon-password"></i>
        <input type="password" placeholder="请输入密码" required v-model.trim="userPwd">
      </div>
      <button class="goBtn" @click="Login">
        登录
        <i class="iconfont icon-youjiantou2"></i>
      </button>
      <div class="message">{{warnMsg}}</div>
    </form>
  </div>
</template>

<script type="es6">
export default {
  data() {
    return {
      userName: '',
      userPwd: '',
      warnMsg: ''
    }
  },
  methods: {
    // 登录函数
    Login() {
      if (this.checkSubMsg()) {
        setTimeout(this.$store.commit("updataLogin"),1000);
      }
    },
    // 检查登录信息
    checkSubMsg() {
      if (this.userName === "") {
        this.warnMsg = "用户名不能为空"
        return false
      }
      if (this.userPwd === "") {
        this.warnMsg = "密码不能为空"
        return false
      }
      return true
      // window.localStorage.userName = this.userName;
      // window.localStorage.userPWD = this.userPwd;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/public.css';
@import '../../fonts/iconfont.css';

.login-content {
  width: 330px;
  margin: 0 auto;
  padding: 13px;
  .signin-input {
    margin: 13px 0;
    position: relative;
    i {
      position: absolute;
      color: #bfbfbf;
      left: 16px;
      height: 62px;
      line-height: 56px;
      font-size: 22px;
    }
    input {
      display: block;
      width: 100%;
      height: 54px;
      padding: 12px 6px 12px 46px;
      border: 1px solid #2779e5;
      font-size: 14px;
      color: #bfbfbf;
      background: #2d2e30;
    }
  }
  .goBtn {
    border: none;
    padding: 6px 12px;
    color: #fff;
    font-family: "Microsoft YaHei";
    cursor: pointer;
    width: 100%;
    padding: 12px 12px;
    margin-top: 6px;
    position: relative;
    transition: all 333ms ease;
    background-color: #2779e5;
    &:hover {
      padding-right: 34px;
      background-color: #60a0f6;
      color: #fff;
      i {
        opacity: 1;
      }
    }
    i {
      margin-left: 4px;
      position: absolute;
      left: auto;
      top: auto;
      opacity: 0;
      transition: opacity 218ms ease;
    }
  }
  .message {
    text-align: center;
    color: #fff
  }
}
</style>

