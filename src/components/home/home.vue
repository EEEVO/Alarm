<template>
  <div>
    <!--头部工具栏-->
    <header>
      <!--头部左侧-->
      <div class="headerLeft">
        <img src="./logo.png">
        <span>新一代机房综合监控系统</span>
      </div>
      <!--头部右侧-->
      <div class="headerRight">
        <button class="btn btns-style-2" title="全屏" @click="fullScreen()">
          <i class="iconfont icon-quanping"></i>
        </button>
        <button class="btn btns-style-2" title="注销" @click="switchLogout()">
          <i class="iconfont icon-logout"></i>
        </button>
  
        <div class="popupSkin">
          <button class="btn btns-style-2" title="主题" @click="Skin_STATUS = !Skin_STATUS">
            <i class="iconfont icon-skin"></i>
          </button>
          <!--TODO:enter-active-class未生效-->
          <transition enter-active-class="flipInX animated" leave-active-class="flipOutX animated">
            <popupSkin class="popupSkin-content" v-if="Skin_STATUS"></popupSkin>
          </transition>
        </div>
        <button class="btn btns-style-2" title="折叠菜单" @click="toggleMenuStatus=!toggleMenuStatus">
          <i class="iconfont icon-caidan"></i>
        </button>
        <!---->
      </div>
    </header>
    <!--导航菜单栏-->
    <toggleMenu id="toggleMenu" :toggle-menu-status="toggleMenuStatus" :class="{widthtrue:!toggleMenuStatus,widthfalse:toggleMenuStatus}"></toggleMenu>
    <!--主要内容块-->
    <router-view id="content">
  
    </router-view>
    <!--底部栏-->
    <foot id="foot" :class="{paddtrue:!toggleMenuStatus,paddfalse:toggleMenuStatus }"></foot>
  
    <!--模态框-->
    <transition enter-active-class="fadeIn animated" leave-active-class="fadeOut animated">
      <logout v-if="logoutStatus"></logout>
      <refreshMsg v-if="refreshStatus"></refreshMsg>
    </transition>
  </div>
</template>

<script type="es6">
// 选择皮肤组件
import popupSkin from './popupSkin'
// 退出登录组件
import logout from './logout'
// 导航菜单组件
import toggleMenu from './toggleMenu'
// 页脚组件块
import foot from './foot'
// 刷新组件
import refreshMsg from './content/refreshMsg'
// import commontHeader from './content/commontHeader'

export default {
  data() {
    return {
      Skin_STATUS: false,
      bgSkin: './bg_9.jpg',
      // 折叠菜单的状态值，true为显示
      toggleMenuStatus: true
    }
  },
  computed: {
    logoutStatus() {
      return this.$store.state.LOGOUT_STATUS
    },
    refreshStatus() {
      return this.$store.state.REFRESH_STATUS
    }

  },
  methods: {
    // 全屏事件
    fullScreen() {
      if (this.$store.state.FULL_STATUS === true) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
        this.$store.commit('switchFullStatus');
      } else {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen();
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        }
        this.$store.commit('switchFullStatus');
      }
    },
    //切换注销状态组件显示
    switchLogout() {
      this.$store.commit('switchLogout')
    },
    depositBG() {
      if (window.localStorage.bg === "") {
        window.localStorage.bg = "./bg_9.jpg";
      }

      //TODO:给根节点元素设置背景图片

    }
  },
  components: {
    popupSkin,
    logout,
    toggleMenu,
    foot,
    refreshMsg
    // commontHeader
  }
}

</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 50px;
  background: none;
  border-bottom: 1px solid rgba(255, 255, 255, .15);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 11;
  .headerLeft {
    // position: relative;
    img {
      width: 32px;
      height: 32px;
      position: absolute;
      left: 6px;
      top: 10px;
    }
    span {
      font-size: 15px;
      position: absolute;
      left: 48px; // top: 20px;
      color: #fff;
      /*此上边距是根据header高度与span本身高度计算得来*/
      margin-top: 15px;
    }
  }
  .headerRight {
    float: right;
    margin-right: 13px;
    margin-top: 6px;
    /*按钮样式*/
    .btns-style-2 {
      background: rgba(0, 0, 0, .1);
      &:hover {
        background: rgba(0, 0, 0, .2);
        color: #fff;
      }
    }
    button {
      padding: 5px 6px;
      i {
        font-size: 20px;
      }
    }
    .popupSkin {
      display: inline;
      position: relative;
      /*皮肤组件框*/
      .popupSkin-content {
        position: absolute;
        top: 30px;
        right: -35px;
        z-index: 300; // display: block;
        list-style: none;
        border-radius: 4px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
      }
    }
  }
}

#toggleMenu {
  // width: 220px;
  height: 100%;
  background-color: rgba(0, 0, 0, .43);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
}

#foot {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: rgba(0, 0, 0, .33);
  border-top: 1px solid rgba(255, 255, 255, .15);
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 11;
}

.paddtrue {
  animation: move_true .5s 1;

  @keyframes move_true {
    0% {
      padding: 0px 0px 0px 233px;
    }
    100% {
      padding: 0px 0px 0px 58px;
    }
  }
  padding: 0px 0px 0px 58px;
}



.paddfalse {
  animation: move_false .5s 1;
  @keyframes move_false {
    0% {
      padding: 0px 0px 0px 58px;
    }
    100% {
      padding: 0px 0px 0px 233px;
    }
  }
  padding: 0px 0px 0px 233px;
}


.widthtrue {
  animation: width_true 0.5s 1;
  width: 48px;
  @keyframes width_true {
    0% {
      width: 220px;
    }
    100% {
      width: 48px;
    }
  }
}



.widthfalse {
  animation: width_false 0.5s 1;
  @keyframes width_false {
    0% {

      width: 48px;
    }
    100% {
      width: 220px;
    }
  }
  width: 220px;
}

#content {
  width: auto;
  height: auto;
  position: fixed;
  left: 233px;
  top: 50px;
  bottom: 50px;
  right: 13px;
  z-index: 8;
}
</style>


