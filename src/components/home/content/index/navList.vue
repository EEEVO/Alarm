<template>
  <div class="navBtnList">
    <ul>
      <li v-for="(item,index) of items" :key="index" v-if="item.value=='1'&&index!==0" :class="{active:isAcitve==item.name}" @click="selected(item.name)">
        <!--此处应该是路由标签-->
        <router-link :to="{name:item.nameUrl}">
          <a class="a">
            <p>{{item.name}}</p>
            <div class="navBtnListImg">
              <img :src="item.img">
            </div>
          </a>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script type="es6">
import { items } from '../../../data.js'

export default {
  data() {
    return {
      items
    }
  }
}
</script>

<style lang="scss" scoped>
.navBtnList {
  width: auto;
  height: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 13px 0 13px 0;
  margin: 0 auto;
  overflow-x: auto;
  overflow-y: hidden;
  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    width: 630px;
    li {
      float: left;
      transform: none;
      transition-duration: .5s;
      /* 鼠标移入放大*/
      &:hover {
        transform: scale(1.2);
        transition-duration: .5s;
      }
      .a {
        color: #fff;
        border-radius: 12px;
        width: 80px;
        height: auto;
        text-decoration: none;
        border-color: rgba(0, 0, 0, .43);
        background: rgba(0, 0, 0, .43);
        display: block;
        margin: 0 10px 0 0;
        padding-bottom: 10px;
        p {
          text-align: center;
          margin: 0;
          padding-top: 10px;
        }
        .navBtnListImg {
          width: 68px;
          height: 68px;
          margin: 0 auto;
          padding: 2px;
          background: rgba(0, 0, 0, .53);
          border-radius: 50%;
          img {
            width: 53px;
            height: 53px;
            margin: 6px;
            border: none;
          }
        }
      }
    }
  }
}
</style>
