<style scoped>
.btn-box{text-align: left;margin-bottom: 10px;}
.btn-box .ivu-btn-primary{margin-right: 15px}
</style>

<template>
    <div>
        <div class="btn-box">
            <Button type="primary" icon="md-add" @click="addWork">添加作品</Button>
            <Button type="error" icon="ios-trash-outline" @click="delAll">删除</Button>
        </div>
        <Menu mode="horizontal" active-name="" @on-select="fileStatus">
            <MenuItem name="">
                <Icon type="ios-paper" />
                全部
            </MenuItem>
            <MenuItem name="0">
                <Icon type="ios-people" />
                未公开
            </MenuItem>
            <MenuItem name="1">
                <Icon type="ios-construct" />
                已公开
            </MenuItem>
        </Menu>
        <Table :columns="columns10" :data="data" :loading="loading" @on-selection-change="selectChange"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total" :current="current" show-total :page-size="pageSize" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>
<script>
    import expandRow from '../../components/table-expand.vue';
    export default {
        components: { expandRow },
        data () {
            return {
                columns10: [
                    {
                        type: 'selection',
                        width: 50,
                        align: 'center'
                    },
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: 'name/info',
                        key: 'prj_info'
                    },
                    {
                        title: 'time',
                        key: 'time',
                        width:180,
                        render: (h, params) => {
                            return h('p', params.row.start_time+'-'+params.row.end_time);
                        }

                    },
                    {
                        title: 'url',
                        key: 'url'
                    },
                    {
                        title: 'tags',
                        key: 'tags',
                        render: (h, params) => {
                            const row = params.row;
                            let tags=row.tags.split(',');

                            return  h('p',tags.map(item => {
                                return h('Tag', item)
                            }))
                        }
                    },
                    {
                        title: 'status',
                        key: 'status',
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.status === 1 ? 'success' : row.status === 0 ? 'default' : 'error';
                            const text = row.status === 1 ? '公开' : row.status === 0 ? '未公开' : 'Fail';

                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, text);
                        }
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.row.id)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.delSingle(params.row.id)
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type:params.row.status?'':'warning',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.changeStatus(params.row.id)
                                        }
                                    }
                                }, params.row.status?'不公开':'公开')
                            ]);
                        }
                    }
                ],
                data: [],
                loading:false,
                total:100,
                pageSize:10,
                current:1,
                status:'',
                selection:[]  //选择/全选
            }
        },
        methods:{
            getdata(){
                this.loading=true
                let _this=this
                this.$api.get('/workList',{pageIndex:this.current,pageSize:this.pageSize,status:this.status})
                    .then(function (res) {
                        _this.loading=false;
                        if(res.code==200){
                            _this.data=res.data
                            _this.total=res.total
                        }else{
                            _this.$Message.warning(res.msg);
                        }
                    })

            },
            selectChange(selection){
                this.selection=selection
            },
            changePage(i){
                this.current=i
                this.getdata()
            },
            fileStatus(v){
                console.log(v)
                this.status=v
                this.getdata()
            },
            addWork(){
                this.$routeGo('worksAdd')
            },
            edit(index){
                this.$routeGo('worksEdit',{id:index},true)
            },
            del(index){
                let _this=this
                this.$api.post('/workDel',{id:index})
                    .then(function (res) {
                        if(res.code==200){
                            _this.$Message.success(res.msg)
                            _this.getdata()
                        }else{
                            _this.$Message.error(res.msg)
                        }
                    })
            },
            delSingle(i){
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定要删除此条数据？</p>',
                    onOk: () => {
                        this.del(i)
                    }
                });

            },
            delAll(){
                console.log(this.selection)
                let selectionId=[]
                if(this.selection.length!=0){
                    for(let i=0;i<this.selection.length;i++){
                        selectionId.push(this.selection[i].id)
                    }
                    let selectionToString=''
                    selectionToString=selectionId.join(',')
                    this.$Modal.confirm({
                        title: '提示',
                        content: '<p>确定要删除此条选中的数据？</p>',
                        onOk: () => {
                            this.del(selectionToString)
                        }
                    });
                }else{
                    this.$Message.error('请至少选择一条需要删除的数据')
                }
            },
            changeStatus(index){
                let _this=this
                this.$api.post('/workStatusEdit',{id:index})
                    .then(function (res) {
                        if(res.code==200){
                            _this.$Message.success(res.msg)
                            _this.getdata()
                        }else{
                            _this.$Message.error(res.msg)
                        }
                    })
            }
        },
        mounted(){
            this.getdata()
        }
    }
</script>