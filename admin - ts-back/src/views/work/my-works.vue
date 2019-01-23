<style scoped>
.add-btn{overflow: hidden;margin-bottom: 20px;text-align: left}
.add-btn .ant-btn{margin-right: 15px}
.add-btn  .ant-switch{float: right}
</style>

<template>
    <div>
        <div class="add-btn">
            <a-button type="primary" @click="gotoAdd">
                <a-icon type="plus" />添加作品
            </a-button>

            <a-button
                    type="primary"
                    @click="delChoose"
                    :disabled="!hasSelected"
            >
                删除
            </a-button>
            <span style="margin-left: 8px">
                <template v-if="hasSelected">
                  {{`Selected ${selectedRowKeys.length} items`}}
                </template>
            </span>

            <a-switch checkedChildren="公开" unCheckedChildren="未公开" defaultChecked @change='onChangeStatus'/>

        </div>


        <a-table :columns="columns"
                 :dataSource="data"
                 :pagination="pagination"
                 :loading="loading"
                 @change="handleTableChange"
                 :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" class="components-table-demo-nested">
            <span slot="customTitle"><a-icon type="smile-o" /> id</span>
            <span slot="tags" slot-scope="tags">
              <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
            </span>
                    <span slot="action" slot-scope="text, record">
              <a href="javascript:;">编辑</a>
              <a-divider type="vertical" />
              <a href="javascript:;">删除</a>
              <a-divider type="vertical" />
              <a href="javascript:;">
                公开
              </a>
            </span>

            <p slot="expandedRowRender" slot-scope="d"> 个人负责情况：{{d.self_work}}</p>
        </a-table>


    </div>
</template>

<script lang="ts">
    import {Component, Vue,Watch } from 'vue-property-decorator';
    import moment from 'moment';
    const columns = [
        {
        dataIndex: 'key',
        key: 'key',
        width:80,
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'key' },
    }, {
        dataIndex:'time',
        title: '时间',
        key: 'time',
    }, {
        dataIndex:'url',
        title: '地址',
        key: 'url',
    },{
        dataIndex:'prj_info',
        title: '项目说明',
        key: 'prj_info',
    },{
        dataIndex:'tags',
        title: '标签',
        key: 'tags',
        scopedSlots: { customRender: 'tags' },
    },{
        dataIndex:'status',
        title: '状态',
        key: 'status',
        scopedSlots: { customRender: 'status' },
    }, {
        dataIndex:'action',
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    }
    ];

    const data = [
        {
        key:1,
        prj_info: 'John Brown',
        time: 32,
        url: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
        self_work:'456',
        status:'公开'
    }, {
        key:2,
        prj_info: 'Jim Green',
        time: 32,
        url: 'London No. 1 Lake Park',
        tags: ['loser'],
        self_work:'456',
        status:'公开',
    }, {
        key: 3,
        prj_info: 'Joe Black',
        time: 32,
        url: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
        self_work:'456',
        status:'公开',

    }
    ];



    @Component({})
    export default class login extends Vue {
        // 初始化数据
        columns=columns
        data=data
        pagination={
            current:1,
            total:100
        }
        loading:boolean= false

        selectedRowKeys=[]  //选中


        // 声明周期钩子
        mounted() {

        }

        // 方法
        handleTableChange (pagination, filters, sorter) {
            console.log(pagination);
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            this.getdata()
        }

        getdata(){  //获取作品的数据
            /*const pagination = { ...this.pagination };
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = 200;
            this.loading = false;
            this.data = data.results;
            this.selectedRowKeys = []
            this.pagination = pagination;*/
        }

        gotoAdd() {  //添加作品
            this.$routeGo('worksAdd')
        }


        onSelectChange (selectedRowKeys) {  //多选事件
            console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.selectedRowKeys = selectedRowKeys
        }

        //删除选中的数据
        delChoose(){

        }

        //切换选择查看公开不公开的数据
        onChangeStatus(checked){
            console.log(`a-switch to ${checked}`);
        }

        // 计算属性
        get hasSelected() {
            return this.selectedRowKeys.length > 0
        }


    }
</script>
