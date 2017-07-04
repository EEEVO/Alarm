<template>
  <div>
    <nav>
      <div class="navUser">
        <span v-if="toggleMenuStatus">
          <i class="iconfont icon-yonghu"></i>
          <span class="userName">{{userName}}</span>
        </span>
      </div>
      <div class="navList">
        <ul :class="{minifieds:!toggleMenuStatus}">
          <li v-for="(item,index) of items" :key="index" v-if="item.value=='1'" :class="{active:isAcitve==item.name}" @click="selected(item.name)">
            <!--此处应该是路由标签-->
            <router-link :to="{name:item.nameUrl}">
              <a>
                <i :class="item.icon " class="iconfont "></i>
                <span v-show="toggleMenuStatus ">{{item.name}}</span>
              </a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script type="es6">
import { items } from '../data.js'

export default {
  props: ['toggleMenuStatus'],
  data() {
    return {
      // isAcitve: this.items[0].name,
      isAcitve: "",
      userName: window.localStorage.userName,
      items: items
    }
  },
  computed: {
    updataisAcitve() {
      console.log("计算属性更新？");
      this.isAcitve = this.$store.state.isAcitve
    }
  },
  // created() {
  //   this.updataisAcitve();
  // },
  methods: {
    selected(gameName) {
      this.$store.commit("updata_isAcitve", gameName);
      // this.updataisAcitve();
    },
    // updataisAcitve() {
    //   return this.isAcitve = this.$store.state.isAcitve
    // }
  }
}
</script>


<style lang="scss" scopedSlots>
.navUser {
  height: 39px;
  line-height: 39px;
  padding-left: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, .15);
  cursor: pointer;
  margin-top: 51px;
  white-space: nowrap;
}

.navList {
  width: auto;
  height: auto;
  left: 0px;
  top: 91px;
  bottom: 51px;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;
  ul {
    line-height: 39px;
    list-style: none;
    padding-left: 0;
    margin: 0;
    font-size: 14px;

    li {
      cursor: pointer;
      white-space: nowrap;
      /* 增加选中时的遮罩*/
      &:active {
        background: rgba(255, 255, 255, .2);
        color: #fff;
      }
      a {
        text-decoration: none;
        color: #ebebeb;
        padding: 10px 133px 10px 10px;
        &:hover {
          color: #FFD600;
        }
      }
    }
    /*选中时候后面增加一个标记*/
    .active a {
      color: #FFD600;
      &:before {
        content: "\e61b";
        font-family: "iconfont" !important;
        position: absolute;
        right: -3px;
        color: #eee;
      }
    }
  }
  .minifieds li {
    border-bottom: 1px solid rgba(2, 8, 9, .33);
    border-top: 1px solid rgba(255, 255, 255, .23);
    position: relative;
  }
}
</style>

