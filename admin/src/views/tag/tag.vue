<style scoped>

</style>

<template>
    <div>
        <Input v-model="value" placeholder="Enter tag name..." style="width: 300px" @keyup.enter.native="addTag"/>
        <div style="margin: 20px auto">
            <template v-for="item in data">
            <Tag type="border" closable color="primary" @on-close="handleClose(item.id)" >{{item.tag_name}}</Tag>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                value:'',
                data:[]
            }
        },
        methods: {
            addTag(){
                let _this=this
                this.$api.post('/addTag',{tag_name:this.value})
                    .then(function (res) {
                        if(res.code==200){
                            _this.$Message.success(res.msg)
                            _this.value=''
                            _this.getTag()
                        }else{
                            _this.$Message.error(res.msg)
                        }
                    })
            },
            getTag(){
                let _this=this
                this.$api.get('/tagList',{})
                    .then(function (res) {
                        if(res.code==200){
                            _this.data=res.data
                        }
                    })
            },
            handleClose(i){
                let _this=this
                this.$api.post('/tagDel',{id:i})
                    .then(function (res) {
                        if(res.code==200){
                            _this.getTag()
                            _this.$Message.success(res.msg)
                        }else{
                            _this.$Message.error(res.msg)
                        }
                    })
            }
        },
        mounted() {
            this.getTag()
        },
        watch: {
            ''(to, from) {

            }
        }

    }
</script>