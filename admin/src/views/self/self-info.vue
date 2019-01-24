<style scoped>
    .self .ivu-input-wrapper{display: block;width: 500px;margin:0 auto 15px;}
</style>

<template>
    <div class="self">
        <Input v-model="info.name" placeholder="Enter name..." style="width: 300px" />
        <Input v-model="info.email" placeholder="Enter email..." style="width: 300px" />
        <Input v-model="info.work_position" placeholder="Enter work position..." style="width: 300px" />
        <Input v-model="info.github" placeholder="Enter github path..." style="width: 300px" />
        <Input v-model="info.work_year" placeholder="Enter work time year..." style="width: 300px" />
        <Input v-model="info.self_introduction" placeholder="Enter self introduction..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"  />
        <Input v-model="info.self_work_intro" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter self work intro..." />
        <Button type="primary" @click="edit_info">修改</Button>
    </div>
</template>



<script>
    export default {
        components: {},
        data() {
            return {
                info:{
                    name:'',
                    email:'',
                    self_introduction:'',
                    work_position:'',
                    self_work_intro:'',
                    github:'',
                    work_year:''
                }
            }
        },
        methods: {
            edit_info(){
                let p=this.info
                let _this=this
                this.$api.post('selfEdit',p)
                    .then(function (res) {
                        if(res.code==200){
                            _this.$Message.success(res.msg)
                            _this.getInfo()
                        }else{
                            _this.$Message.error(res.msg)
                        }
                    })
            },
            getInfo(){
                let _this=this
                this.$api.get('/selfDetail',{})
                    .then(function (res) {
                        if(res.code==200){
                            _this.info=res.data
                        }
                    })
            }
        },
        mounted() {
            this.getInfo()
        },
        watch: {
            ''(to, from) {

            }
        }

    }
</script>