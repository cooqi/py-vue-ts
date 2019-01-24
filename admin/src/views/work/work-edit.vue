<style scoped>
    .add-input{padding-bottom: 80px;}
.add-input .ivu-input-wrapper,.add-input .ivu-select{display: block;width: 500px;margin:0 auto 15px;}
.add-input .ivu-switch-large.ivu-switch-checked:after{left: 47px}
</style>

<template>
    <div>
        <div style="text-align: left;margin-bottom: 20px;">
            <Button type="primary" icon="ios-arrow-back" @click="gotoList">返回列表</Button>
        </div>
        <div class="add-input">
            <Input v-model="work.prj_info" placeholder="Enter projectName or baseInfo..." />
            <Input  v-model="work.url" placeholder="Enter project path url..."  />
            <Select v-model="tags" multiple>
                <Option v-for="item in tagsData" :value="item.tag_name" :key="item.tag_name">{{ item.tag_name }}</Option>
            </Select>
            <Input v-model="work.self_work" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter project detail info..." />
            <div style="margin-bottom: 20px">
                <DatePicker type="date" placeholder="start date" style="width: 200px" @on-change="startTimeChange" :value="work.start_time"></DatePicker>
                <DatePicker type="date" placeholder="end date" style="width: 200px" @on-change="endTimeChange" :value="work.end_time"></DatePicker>
            </div>
            <iSwitch size="large" :value="work.status?true:false" @on-change="chooseStatus" style="margin-bottom: 20px;width: 70px" >
                <span slot="open">公开</span>
                <span slot="close">不公开</span>
            </iSwitch>
        </div>
        <Button type="primary"  @click="add" :loading="loading">
            <span v-if="!loading">Edit!</span>
            <span v-else>Loading...</span>
        </Button>
</div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                loading:false,
                tagsData:[],
                tags:[],
                work:{}
            }
        },
        methods: {
            startTimeChange(date){
                this.work.start_time=date
            },
            endTimeChange(date){
                this.work.end_time=date
            },
            chooseStatus(v){
                this.work.status=v?1:0
            },
            getTag(){
                let _this=this
                this.$api.get('/tagList',{})
                    .then(function (res) {
                        if(res.code==200){
                            _this.tagsData=res.data
                        }
                    })
            },
            add(){
                if(this.tags){
                    this.work.tags=this.tags.join(',')
                }
                if(this.work.prj_info==''){
                    this.$Message.error('项目名/基本信息必填')
                    return false
                }
                this.loading=true
                let p=this.work
                let _this=this
                this.$api.post('/editWork',p)
                    .then(function (res) {
                        if(res.code==200){
                            _this.$Message.success('编辑成功');
                            _this.$routeGo('works')

                        }else {
                            _this.loading = false
                            _this.$Message.warning('编辑失败');
                        }
                    })
            },
            gotoList(){
                this.$routeGo('works')
            },
            getData(id){
                let _this=this
                this.$api.get('/workDetail',{id:id})
                    .then(function (res) {
                        if(res.code==200){
                            _this.work=res.data
                            if(res.data.tags){
                                _this.tags=res.data.tags.split(',')
                            }
                        }else{
                            _this.$Message.error(res.msg)
                        }
                    })
            }
        },
        mounted() {
            let id=this.$route.query.id
            this.getData(id)
            this.getTag()
        },
        watch: {
            ''(to, from) {

            }
        }

    }
</script>