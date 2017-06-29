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
      <p class="loading-text">正在连接…</p>
    </div>
    <!--<button @click="updataLogin"></button>-->
  </div>
</template>

<script type="es6">
export default {
  methods: {
    // updataLogin() {
    //   this.$store.commit('updataLogin');
    // }
  }
}
</script>

<style lang="scss">
#loading-center {
  top: 35%;
  left: 45%;
  width: auto;
  height: auto;
  position: fixed; // height: auto;
  // width: auto;
  // position: relative;
  // z-index: 1;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  #loading-center-absolute {
    margin: 0 auto; // position: absolute;
    // left: 45%; 
    // top: 30%;
    height: 70px;
    width: 70px;
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
    // width: 70px;
    // position: absolute;
    // top: 52%;
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

