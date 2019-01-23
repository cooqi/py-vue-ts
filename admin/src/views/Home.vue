<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
      <div class="logo"></div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="meauID" @click="handleClick">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span class="nav-text">我的作品</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="appstore-o" />
          <span class="nav-text">标签管理</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="team" />
          <span class="nav-text">个人信息</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="bar-chart" />
          <span class="nav-text">nav 4</span>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="cloud-o" />
          <span class="nav-text">nav 5</span>
        </a-menu-item>
        <a-menu-item key="6">
          <a-icon type="appstore-o" />
          <span class="nav-text">nav 6</span>
        </a-menu-item>
        <a-menu-item key="7">
          <a-icon type="team" />
          <span class="nav-text">nav 7</span>
        </a-menu-item>
        <a-menu-item key="8">
          <a-icon type="shop" />
          <span class="nav-text">nav 8</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <router-view/>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        i love you
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<style>
  #components-layout-demo-fixed-sider .logo {
    height: 32px;
    background: rgba(255,255,255,.2);
    margin: 16px;
  }
</style>

<script lang="ts">
import { Component, Vue,Watch } from 'vue-property-decorator';

@Component({
})
export default class Home extends Vue {
    //数据
    meauID:Array<string>=['1']

    //方法
    handleClick (e) {
        console.log('click', e)
        this.meauID=e.keyPath
    }

    // 声明周期钩子
    mounted() {
        this.meauID[0]=this.$route.meta.key || '1';
    }


}
</script>
