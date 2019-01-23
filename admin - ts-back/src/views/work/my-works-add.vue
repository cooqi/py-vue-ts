<style scoped>
.add-btn{overflow: hidden;margin-bottom: 20px;text-align: left}
.add-btn .ant-btn{margin-right: 15px}
.add-btn  .ant-switch{float: right}
</style>

<template>
    <div>
        <div class="add-btn">
            <a-button type="primary" @click="gotoList">
                <a-icon type="left" />作品列表
            </a-button>

        </div>
        <div>
            <a-input placeholder="项目名称或基本信息" v-model="workInfo.prj_info">
                <a-icon slot="prefix" type="user" />
                <a-icon v-if="workInfo.prj_info" slot="suffix" type="close-circle" @click="workInfo.prj_info=''" />
            </a-input>
            <a-input placeholder="项目可访问地址" v-model="workInfo.url">
                <a-icon slot="prefix" type="user" />
                <a-icon v-if="workInfo.url" slot="suffix" type="close-circle" @click="workInfo.url=''" />
            </a-input>

            <a-textarea placeholder="项目负责情况" :rows="4" v-model="workInfo.self_work"/>

            <a-select mode="multiple" :defaultValue="tags" style="width: 100%" @change="handleChangeTags" placeholder="标签*">
                <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{(i + 9).toString(36) + i}}</a-select-option>
            </a-select>

            <a-range-picker @change="onChangeTime" :defaultValue="[moment(workInfo.start_time, dateFormat), moment(workInfo.end_time, dateFormat)]"/>

            <a-switch checkedChildren="公开" unCheckedChildren="不公开" defaultChecked @change='chooseStatus'/>

            <a-button type="primary" :loading="confirmLoading" @click="handleOk">
                提交
            </a-button>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue,Watch } from 'vue-property-decorator';
    import moment from 'moment';

    @Component({})
    export default class login extends Vue {
        // 初始化数据
        tags=[]
        workInfo={
            prj_info:'',
            start_time:'2017-05-06',
            end_time:'2018-06-06',
            url:'',
            tags:'',
            self_work:'',
            status:1
        }
        dateFormat= 'YYYY/MM/DD'
        confirmLoading:boolean=false


        // 声明周期钩子
        mounted() {

        }

        // 方法

        gotoList() {  //返回作品列表
            this.$routeGo('works')
        }
        handleOk(e) {  //提交
            let p={ ...this.workInfo }
            p.tags=this.tags.join(',')
            this.confirmLoading = true;
            let _this=this
            this.$api.post('/addWork',p)
                .then(function (res) {
                    _this.confirmLoading = false;
                    if(res.code==200){
                        _this.$confirm({
                            title: '添加成功',
                            content: '继续添加？',
                            okText: '继续添加',
                            cancelText: '返回列表',
                            onOk() {
                                _this.$routeGo('worksAdd')
                            },
                            onCancel() {
                                _this.$routeGo('works')
                            },
                        });

                    }else{
                        _this.$message.error(res.msg)
                    }
                })
        }


        onChangeTime(date, dateString) {  //获取时间
            console.log(date, dateString);
        }

        moment=moment  //日期选择

        //选择tga
        handleChangeTags(value) {
            console.log(`selected ${value}`);
            this.tags=value
        }

        //选择新增的作品需不需要公开
        chooseStatus(checked){
            console.log(`a-switch to ${checked}`);
            if(checked){
                this.workInfo.status=1
            }else{
                this.workInfo.status=0
            }
        }



    }
</script>
