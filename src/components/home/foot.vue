<template>
  <div>
    <footer>{{ID}}</footer>
  </div>
</template>

<script type="es6">
// import Axios from 'axios'

export default {
  data() {
    return {
      // userName: this.$store.state.userName
      ID: "",
      userName: window.localStorage.userName,
      urlCommon: 'http://localhost:8080/GWServices.asmx/'
    }
  },
  created() {
    this.$http.post(`${this.urlCommon}ConnectService`, {
      user_name: this.userName
    }).then((response) => {
      let res_data = response.data.d;
      // 验证成功
      if (res_data !== null && res_data !== "" && res_data !== "false") {
        this.ID = res_data
      }
    }).catch((error) => {
      console.log(error);
    });
  }
}
</script>

<style lang="scss">

</style>


