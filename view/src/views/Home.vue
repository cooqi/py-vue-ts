<style scoped>
.home{width: 100%;height: 100%;background: linear-gradient(-45deg,#000,#f3ebdf);position: relative;overflow: hidden}
.title h2{font-size: 52px;font-weight: 700;color: #fff}
.title p{color: #fff}
.card{width: 720px;margin:auto;overflow: hidden;position: absolute;top:0;right: 0;bottom: 0;left: 0;height: 220px}
  .self-info,.work-intro-info{background: rgba(255,255,255,.1);border-radius: 10px;padding: 15px;width: 330px;height: 200px;float: left;margin: 10px 15px;text-align: left;border: 1px solid #ccc;box-shadow: 0 0 15px 3px rgba(255,255,255,.5)}
.card a{color: #2c3e50}
.work-list{color: #7b3a17;cursor: pointer}
.work-list:hover{text-decoration: underline;font-weight: 700}
  .home-footer{position: absolute;width: 100%;bottom: 0;left: 0;color: #999;font-size: 13px;}
</style>
<template>
  <div class="home">
    <div class="title">
      <h2>&lt;Code/&#62;</h2>
      <p>Let's go</p>
    </div>
    <div class="card">
      <div class="self-info">
        <h3>黄琪</h3>
        <p>偶尔忧郁偶尔欢脱的女孩纸</p>
        <p class="work-list" @click="goto('content')">作品集》</p>
      </div>

      <div class="work-intro-info">
        <h3>网页制作（5年）</h3>
        <p>对工作有着极大的热情，想成为优秀的前端工程师</p>
        <p>邮箱：407997152@qq.com</p>
        <p><a href="">https://github.com/cooqi</a></p>
      </div>
    </div>

    <div class="home-footer">
      <p>ICP备案号：鄂ICP备15003219号</p>
      <p>联网备案号：42011602000593</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {

  },
    methods:{
      goto(name){
          this.$router.push({ path: name})
      }
    }
}
</script>
