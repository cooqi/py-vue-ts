<style scoped>
 .login{background: url("../assets/img/cooqihuang.jpg")no-repeat center #244280; background-size:contain;height: 100%;width: 100%;padding: 1px}
 .login h3{text-align: center;line-height: 50px;color: #6495fc;font-size: 24px;position: relative}
 .login h3:before,.login h3:after{position: absolute;content: '';width: 130px;height: 2px;background: #6495fc;top:0;bottom: 0;margin: auto;}
 .login h3:before{left: 0;}
 .login h3:after{right: 0;}
 .login .form{width: 500px;height: 250px;background: rgba(255,255,255,.7);margin: 250px auto;border-radius: 30px;box-shadow: 0 0 20px 5px rgba(254,240,23,.3);padding: 30px 60px;}
 .login .input-block{margin-bottom: 15px;}
</style>

<template>
    <div class="login">
        <div class="form">
            <h3>登录管理</h3>
            <a-input placeholder="用户名" v-model="userName" ref="userNameInput" class="input-block">
                <a-icon slot="prefix" type="user" />
                <a-icon v-if="userName" slot="suffix" type="close-circle" @click="emitEmptyName" />
            </a-input>
            <a-input placeholder="密码" v-model="password" ref="userNameInput" class="input-block">
                <a-icon slot="prefix"  type="lock" />
                <a-icon v-if="password" slot="suffix" type="close-circle" @click="emitEmptyPW" />
            </a-input>
            <a-button type="primary" :loading="loading" @click="login">
                登录
            </a-button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import md5 from 'js-md5';

    @Component({
    })
    export default class login extends Vue {

        //数据
        loading:boolean= false
        userName:string=''
        password:string=''

        //方法
        login () {  //登录
            if(this.userName=='' || this.password==''){
                this.$message.error('请填写用户名和密码')
                return false;
            }
            this.loading = true
            let p={
                username:this.userName,
                password:md5(this.password)
            }
            let _this=this
            this.$api.post('/login',p)
                .then(function (res) {
                    if(res.code==200){
                        _this.$message.success('登录成功')
                        _this.$routeGo('home')
                        localStorage.setItem('token',res.token)
                    }else{
                        _this.$message.error('用户名和密码错误')
                        _this.loading = false
                    }
                })
        }

        emitEmptyName(){  //清空用户名
            this.userName = ''
        }

        emitEmptyPW(){  //清空密码
            this.userName = ''
        }



    }
</script>

