<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    line-height: 30px;
    color: #fff;
  }
  .layout-nav{
    float: right;
    margin: 0 auto;
    margin-right: 20px;
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">cooqihuang</div>
          <div class="layout-nav">
            <MenuItem name="1" to="login">
              <Icon type="ios-paper-plane"></Icon>
              退出
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1"  width="auto" :class="menuitemClasses" >
            <MenuItem name="1" to="works">
              <Icon type="ios-navigate"></Icon>
              <span>个人作品</span>
            </MenuItem>
            <MenuItem name="2" to="self">
              <Icon type="ios-star"></Icon>
              <span>个人信息</span>
            </MenuItem>
            <MenuItem name="3" to="tag">
              <Icon type="ios-bookmark"></Icon>
              <span>Tag管理</span>
            </MenuItem>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px',marginTop:'24px'}">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                isCollapsed: false
            };
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        }

    }
</script>