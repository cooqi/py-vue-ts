<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    export default class APP extends Vue {
        // 初始化数据
        msg = 123

        // 声明周期钩子
        mounted () {
            this.greet()
        }

        // 计算属性
        get computedMsg () {
            return 'computed ' + this.msg
        }

        // 方法
        greet () {
            alert('greeting: ' + this.msg)
        }
    }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
