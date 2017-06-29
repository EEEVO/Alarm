<template>
  <div>
    <div class="loginForm">
      <loginForm v-if="!count" class="flipInX animated"></loginForm>
      <loginAni v-else></loginAni>
    </div>
  </div>
</template>



<script type="es6">

// "flipOutX animated"

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
}

</style>
