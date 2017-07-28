<template>
  <div class="fullScreenPopup">
    <div class="fullScreenAll"></div>
    <div class="fullScreenCenter">
      <!-- 头部title -->
      <div class="MessageBox_top">
        <span>提示</span>
        <button class="MessageBox_top_Exit" @click="exitModel()">
          <i class="iconfont icon-guanbi"></i>
        </button>
      </div>
      <div class="MessageBox_content">
        <span>确认删除所选行吗？</span>
      </div>
      <div class="MessageBox_footer">
        <button @click="submit()">确定</button>
        <button @click="exitModel()">取消</button>
      </div>
    </div>
  </div>
</template>

 <script type="es6">
export default {
  data() {
    return {
      scenarioName: ''
    }
  },
  methods: {
    exitModel() {
      this.$store.commit("EquipLink_ADD_Status")
    },
    submit() {
      this.$store.commit("EquipLink_ADD_Status", this.scenarioName)
      this.scenarioName = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin.scss';
@import '../../../../style/common.scss';

.fullScreenPopup {
  @include absoluteWH(100%, 100%);
  position: fixed;
  @include trbl(0, 0, 0, 0);
  background: rgba(0, 0, 0, .6);
  z-index: 100;
  .fullScreenAll {
    position: absolute;
    @include trbl(0, 0, 0, 0);
    z-index: 1;
  }
  .fullScreenCenter {
    top: 30%;
    color: #fff;
    position: relative;
    padding: 20px;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: 0 0;
    text-shadow: 0 1px 5px rgba(0, 0, 0, .25);
    z-index: 2;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .25);
    width: 300px;
    background: url(/static/img/bg_1.jpg);
    .MessageBox_top {
      position: absolute;
      @include trbl(0, 0, auto, 0);
      z-index: 200;
      span {
        display: block;
        float: left;
        padding: 8px 12px;
      }
      .MessageBox_top_Exit {
        background-color: transparent;
        padding: 8px 12px;
        border: none;
        color: #fff;
        cursor: pointer;
        float: right;
        &:hover {
          background-color: rgba(0, 0, 0, .4);
          color: #fff;
        }
      }
    }
    .MessageBox_content {
      margin: 10px 0;
      span {
        font-size: 24px;
        white-space: pre-wrap;
      }
      input {
        background: rgba(255, 255, 255, .2);
        border: 1px solid rgba(255, 255, 255, .4);
        color: #FFF;
        margin: 10px 0;
        padding: 6px 12px;
        display: block;
        width: 100%;
        transition: all 300ms linear 0s;
      }
    }
    .MessageBox_footer {
      text-align: right;
      button {
        @include comBtn;
        background: rgba(0, 0, 0, .3);
        margin-right: 10px;
        padding-left: 15px;
        padding-right: 15px;
        font-size: 14px;
        &:hover {
          background: rgba(0, 0, 0, .4);
          color: #fff;
        }
      }
    }
  }
}
</style>


