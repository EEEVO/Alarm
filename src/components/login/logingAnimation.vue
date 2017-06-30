<template>
  <div>
    <div id="loading-center">
      <div id="loading-center-absolute">
        <div class="object object_zero">
          <img src="./00.png">
        </div>
        <div class="object object_one">
          <img src="./01.png">
        </div>
        <div class="object object_two">
          <img src="./02.png">
        </div>
        <div class="object object_three">
          <img src="./03.png">
        </div>
      </div>
      <p class="loading-text">{{loginStatusText[loginStatusText_index]}}</p>
    </div>
  </div>
</template>

<script type="es6">
import Axios from 'axios'

export default {
  data() {
    return {
      loginStatusText: ["正在连接…", "服务器请求超时", "已连接服务器", "登录失败"],
      loginStatusText_index: 0,
      userName: window.localStorage.userName,
      userPwd: window.localStorage.userPWD,
      //服务器链接次数
      numbToService: 0,
      urlCommon: 'http://localhost:8080/GWServices.asmx/'
    }
  },
  created() {
    this.ajaxGWServiceInit()
  },
  methods: {
    //登录服务器
    ajaxGWServiceInit() {
      this.numbToService++;
      Axios.post(`${this.urlCommon}ConnectService`, {
        user_name: this.userName
      }).then((response) => {
        let res_data = response.data.d;
        if (res_data !== null && res_data !== "" && res_data !== "false") {
          this.ajaxGWLogin();
        } else {
          if (this.numbToService < 3) {
            this.loginStatusText_index = 2
            this.$store.commit('updataLoginMsg', {
              msg: this.loginStatusText[this.loginStatusText_index]
            })
            this.ajaxGWServiceInit();
          } else {
            // 更换链接状态
            this.loginStatusText_index = 1
            this.$store.commit('updataLoginMsg', {
              msg: this.loginStatusText[this.loginStatusText_index]
            })
            this.$store.commit("updataLogin")
          }
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    //验证用户名和密码
    ajaxGWLogin() {
      Axios.post(`${this.urlCommon}LoginService`, {
        userName: this.userName,
        userPwd: this.unEncrypt(this.userPwd)
      }).then((response) => {
        let res_data = response.data.d;
        if (res_data !== null && res_data !== "" && res_data !== "false") {
          // 更新登录状态
          window.localStorage.LOGIN_COMPLETE = "true"
          //跳转到首页
          this.$router.push('/home');
        } else {
          this.loginStatusText_index = 3;
          this.$store.commit('updataLoginMsg', {
            msg: "用户名或密码错误！"
          })
          setTimeout(this.$store.commit("updataLogin"), 1000);
        }
      }).catch((error) => {

      })


    },
    //解密
    unEncrypt(Text) {
      let output = new String();
      let alterText = new Array();
      let varCost = new Array();
      let TextSize = Text.length;
      for (let i = 0; i < TextSize; i++) {
        alterText[i] = Text.charCodeAt(i);
        varCost[i] = Text.charCodeAt(i + 1);
      }
      for (let i = 0; i < TextSize; i = i + 2) {
        output += String.fromCharCode(alterText[i] - varCost[i]);
      }
      return output;
    }
  }
}
</script>

<style lang="scss" scoped>
#loading-center {
  top: 35%;
  width: 100%;
  height: auto;
  position: fixed;
  #loading-center-absolute {
    height: 70px;
    width: 70px;
    margin: 0 auto;
    transition: all 3s cubic-bezier(0.470, 0.000, 0.745, 0.715);
    animation: changehovertree 3s linear infinite;
    .object {
      position: absolute;
      img {
        width: 45px;
        height: auto
      }
      @at-root .object_zero {
        position: absolute;
        left: 13.5px;
        top: 19px;
        animation: object_zero 1s;
        z-index: 1;
      }
      @at-root .object_one {
        position: absolute;
        left: 14px;
        top: -3px;
        animation: object_one 1s;
        z-index: 3;
      }
      @at-root .object_two {
        position: absolute;
        left: -5px;
        top: 32px;
        -webkit-animation: object_two 1s;
        animation: object_two 1s;
        z-index: 3;
      }
      @at-root .object_three {
        position: absolute;
        right: -7px;
        top: 32px;
        -webkit-animation: object_three 1s;
        animation: object_three 1s;
        z-index: 3;
      }
    }
  }
  .loading-text {
    color: #fff
  }
}

@keyframes changehovertree {
  0% {
    transform: rotate(0)
  }
  50% {
    transform: rotate(180deg)
  }
  100% {
    transform: rotate(360deg)
  }
}

@-webkit-keyframes object_zero {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes object_zero {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes object_one {
  0% {
    -webkit-transform: translate(0, -70px) rotate(0deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
}

@keyframes object_one {
  0% {
    transform: translate(0px, -70px) rotate(0deg);
    -webkit-transform: translate(0, -70px) rotate(0deg);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
    -webkit-transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
}

@-webkit-keyframes object_two {
  0% {
    -webkit-transform: translate(-70px, 0) rotate(0deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
}

@keyframes object_two {
  0% {
    transform: translate(-70px, 0) rotate(0deg);
    -webkit-transform: translate(-70px, 0) rotate(0deg);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
    -webkit-transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
}

@-webkit-keyframes object_three {
  0% {
    -webkit-transform: translate(70px, 0) rotate(0deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
}

@keyframes object_three {
  0% {
    transform: translate(70px, 0) rotate(0deg);
    -webkit-transform: translate(70px, 0) rotate(0deg);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
    -webkit-transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
}
</style>

