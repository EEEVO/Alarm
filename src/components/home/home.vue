<template>
  <div>
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
        <transition enter-active-class="fadein animated">
          <logout v-if="logoutStatus"></logout>
        </transition>
        <div class="popupSkin">
          <button class="btn btns-style-2" title="主题" @click="Skin_STATUS = !Skin_STATUS">
            <i class="iconfont icon-skin"></i>
          </button>
          <!--TODO:enter-active-class未生效-->
          <transition enter-active-class="flipX animated" leave-active-class="flipOutX animated">
            <popupSkin class="popupSkin-content" v-if="Skin_STATUS"></popupSkin>
          </transition>
        </div>
  
        <button class="btn btns-style-2" title="折叠菜单" data-action="toggleMenu">
          <i class="iconfont icon-caidan"></i>
        </button>
      </div>
    </header>
  </div>
</template>

<script type="es6">
import popupSkin from './popupSkin'
import logout from './logout'

export default {
  data() {
    return {
      Skin_STATUS: false,
      bgSkin: './bg_9.jpg'
    }
  },
  computed: {
    logoutStatus() {
      return this.$store.state.LOGOUT_STATUS
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
    logout
  }
}

</script>

<style lang="scss" scoped>
@import '../../style/animate.min.css';


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
    position: relative;
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
      left: 48px;
      top: 20px;
      color: #fff;
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
</style>

<style lang="scss">
// html,
// body {
//   background: url("./bg_9.jpg")
// }
</style>


