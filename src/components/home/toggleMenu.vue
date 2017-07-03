<template>
  <div>
    <nav>
      <div class="navUser">
        <span v-show="toggleMenuStatus">
          <i class="iconfont icon-yonghu"></i>
          <span class="userName">{{userName}}</span>
        </span>
      </div>
      <div class="navList">
        <ul :class="{minifieds:!toggleMenuStatus}">
          <li v-for="(item,index) of items" :key="index" v-if="item.value=='1'" :class="{active:isAcitve==item.name}" @click="selected(item.name)">
            <!--此处应该是路由标签-->
            <router-link to="">
              <a href="">
                <i :class="item.icon" class="iconfont"></i>
                <span v-show="toggleMenuStatus">{{item.name}}</span>
              </a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script type="es6">
export default {
  props: ['toggleMenuStatus'],
  data() {
    return {
      // isAcitve: this.items[0].name,
      isAcitve: "首页",
      userName: window.localStorage.userName,
      items: [
        {
          name: '首页',
          htmlName: 'index',
          value: '1',
          icon: 'icon-yingsaitong'
        },
        {
          name: '设备数据',
          htmlName: 'RealTime',
          value: '1',
          icon: 'icon-shishizhuangtai'
        },
        {
          name: '实时快照',
          htmlName: 'ActualSys',
          value: '1',
          icon: 'icon-kuaizhao'
        },
        {
          name: '系统配置',
          htmlName: 'Systems',
          value: '1',
          icon: 'icon-xujicanshupeizhi'
        },
        {
          name: '事件查询',
          htmlName: 'EvtSelect',
          value: '1',
          icon: 'icon-chaxun'
        },
        {
          name: '报警排表',
          htmlName: 'AlarmTabulate',
          value: '1',
          icon: 'icon-renyuanpaiban'
        },
        {
          name: '定时任务',
          htmlName: 'TimedTask',
          value: '1',
          icon: 'icon-dingshirenwu'
        },
        {
          name: '设备联动',
          htmlName: 'EquipLink',
          value: '1',
          icon: 'icon-shebeiguanli'
        },
        {
          name: '门禁系统',
          htmlName: 'EntrGuard',
          value: '0',
          icon: 'icon-menjinxitong'
        },
        {
          name: '视频系统',
          htmlName: 'VideoSystem',
          value: '0',
          icon: 'icon-shipin'
        },
        {
          name: '能耗系统',
          htmlName: 'Energy',
          value: '0',
          icon: 'icon-nenghaoguanli'
        },
      ]
    }
  },
  methods: {
    selected(gameName) {
      this.isAcitve = gameName
    }
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
  /*position: absolute;*/
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

