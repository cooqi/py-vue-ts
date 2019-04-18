<template>
  <div class="hello">
    <div id="xhr">
      <!--头-->
      <div id="head">

        <div id="eyes-part">
          <div id="glasses">
            <div class="glasses-left">
              <div class="eyes-left"></div>
            </div>
            <div class="glasses-right">
              <div class="eyes-right"></div>
            </div>
            <div class="clear"></div>
          </div>
        </div><!--眼睛-->

        <div id="mouth">
          <ul id="teeth">
            <li class="teeth-side teeth-side-left"></li>
            <li></li>
            <li></li>
            <li class="teeth-side teeth-side-right"></li>
          </ul><!--牙齿-->
        </div><!--嘴巴-->

      </div><!--头-->

      <div id="yellowbody">
        <div id="clothes">
          <div class="clothes-top"></div>
          <div class="clothes-bottom"></div>
        </div><!--衣服-->


        <div id="hand">
          <div class="hand-left">
            <div class="hand-left-palm"></div>
          </div>
          <div class="hand-right">
            <div class="hand-right-palm"></div>
          </div>
        </div><!--手-->

      </div><!--身体-->

      <div id="footer">
        <div class="leg"></div>
        <div class="foot"></div>
      </div><!--脚-->

      <div class="welcome">
        <h3>欢迎来到我的主页</h3>
        <p>想了解更多，请点击查看我的作品集</p>
        <p>*本页面所有图标均为css绘制</p>
      </div>
    </div><!--end-->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import '../assets/css/xhr.css';
</style>
