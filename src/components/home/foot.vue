<template>
  <div>
    <footer>{{userName}}</footer>
  </div>
</template>

<script type="es6">
export default {
  data() {
    return {
      userName: window.localStorage.userName
    }
  }
}
</script>

<style lang="scss">

</style>


