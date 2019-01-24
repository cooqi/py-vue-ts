<style scoped>
.login{background:url("../assets/img/cooqihuang.jpg")no-repeat center #244280; background-size:contain;height: 100%;width: 100%;padding: 1px }
.login h3{line-height: 50px;color:#244280;font-size: 22px }
    .input-box{width: 460px;height: 260px;background: rgba(255,255,255,.8);padding: 20px 50px;border-radius: 20px;margin: 230px auto 0;border: 3px solid #fff}
</style>

<template>
    <div class="login">
        <div class="input-box">
            <h3>管理系统登录</h3>
            <Input prefix="ios-contact" placeholder="Enter name" style="width: 100%;margin-bottom: 15px" v-model="username"/>
            <Input prefix="md-finger-print" placeholder="Enter password" style="width: 100%;margin-bottom: 15px" v-model="password"/>
            <Button type="primary" :loading="loading" icon="ios-power" @click="login">
                <span v-if="!loading">登录</span>
                <span v-else>登陆中</span>
            </Button>
        </div>
    </div>
</template>



<script>
    import md5 from 'js-md5'
    export default {
        components: {},
        data() {
            return {
                loading: false,
                username:'',
                password:''
            }
        },
        methods: {
            login(){
                if(this.username==''||this.password==''){
                    this.$Message.warning('用户名密码必填');
                    return false;
                }
                this.loading = true;
                let _this=this
                this.$api.post('/login',{username:this.username,password:md5(this.password)})
                    .then(function (res) {
                        if(res.code==200){
                            _this.$Message.success(res.msg);
                            localStorage.setItem('token',res.token)
                            _this.$routeGo('home')
                        }else{
                            _this.loading = false
                            _this.$Message.warning(res.msg);
                        }
                    })
            }
        },
        mounted() {

        },
        watch: {
            ''(to, from) {

            }
        }

    }
</script>