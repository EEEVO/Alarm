<template>
  <div>
    <h1>我是登录动画</h1>
    <button @click="updataLogin"></button>
  </div>
</template>

<script type="es6">
export default {
  methods: {
    updataLogin() {
      this.$store.commit('updataLogin');
    }
  }
}
</script>

<style lang="scss">

</style>

