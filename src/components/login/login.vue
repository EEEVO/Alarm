<template>
  <div>
    <div class="loginForm">
      <transition name="loginForm" enter-active-class="flipX animated" leave-active-class="flipOutX animated">
        <loginForm v-if="!count"></loginForm>
      </transition>
    </div>
    <transition name="loginAni">
      <loginAni v-if="count"></loginAni>
    </transition>
  </div>
</template>

<script type="es6">
// flipOutX animated


import loginForm from './loginform';
import loginAni from './logingAnimation';

export default {
  computed: {
    count() {
      return this.$store.state.LOGIN_STATUS
    }
  },
  components: {
    loginForm,
    loginAni
  }
}
</script>

<style lang="scss">
@import '../../style/animate.min.css';

html,
body {
  background: #2d2e30;
}

.loginForm {
  top: 30%;
  width: auto;
  height: auto;
  position: fixed;
  left: 0;
  right: 0;
  animation-fill-mode: both;
  animation-duration: 1s;
  animation-name: flipInX;
  backface-visibility: visible!important;
  .text {
    margin: 100px;
    color: #fff
  }
  loginForm,
  loginAni {
    position: fixed;
    top: 30%;
  }
}
</style>
