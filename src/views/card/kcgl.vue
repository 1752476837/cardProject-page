<template>
    <div id="kcgl">
        <!-- 搜索 -->
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="项目名称">
                <el-input v-model="search.title"></el-input>
            </el-form-item>
            <el-button type="primary" @click="postsearch">查询</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
        </el-form>
        <!-- 表格列表 -->
        <div class="listbox">
            <el-button type="primary" @click="addxzkc">添加</el-button>
             <!-- @click="addClass" -->
            <!-- <div class="cheekClass" v-show="addClassswitch">
                <div class="el-dialog__header">
                    <span class="el-dialog__title">查看课时</span>
                    <button type="button" aria-label="Close" class="el-dialog__headerbtn">
                        <i @click="xzkcsj=false" class="el-dialog__close el-icon el-icon-close">
                        </i>
                    </button>
                </div>
                <el-form-item>
                    <el-input v-model="tableData.classTime"></el-input>
                </el-form-item>
            </div> -->
            <template>
                <el-table
                    v-loading="loading"
                    :data="tableData.items"
                    border
                    style="width: 100%">
                    <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    prop="title"
                    label="课程名称"
                    align="center"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    label="课时"
                    align="center"
                    width="120"
                    >
                        <template slot-scope="scope"> 
                            <el-button
                            size="mini"
                            @click="seeclass(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.row)">修改</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                        layout="prev, pager, next"
                        :total="totalPage"
                        @current-change="handleCurrentChange"
                        :page-size="PageSizes"
                        >
                    </el-pagination>
                </div>
            </template>
        </div>
        <!-- 选择课程（添加弹窗） -->
        <div v-show="xzkcsj">
            <div id="bg" class="bg"></div>
            <div class="xzkctj">
                <el-form ref="form" :model="form" label-width="100px">
                    <div class="el-dialog__header">
                        <span class="el-dialog__title">添加课程</span>
                        <button type="button" aria-label="Close" class="el-dialog__headerbtn">
                            <i @click="xzkcsj=false" class="el-dialog__close el-icon el-icon-close">
                            </i>
                        </button>
                    </div>
                    <el-form-item label="课程名称">
                        <el-input v-model="form.className"></el-input>
                    </el-form-item>
                    <el-button style="margin:0 0 20px 0" @click="addformtime">添加</el-button>
                    <div class="timebox" style="height:251.2px;overflow-y:auto">
                        <el-form-item label="课时">
                            <el-date-picker
                            v-model="form.email"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item 
                        v-for="(domain, index) in form.time"
                        label='课时'
                        :key="domain.key"
                        :props="'domains.' + index + '.value'"
                        >
                            <el-date-picker
                            v-model="domain.value"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                            </el-date-picker>
                            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                        </el-form-item>
                    </div>
                    <el-button type="primary" @click="getTime">提交</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import Config from '../../router/config.js';
export default {
    name:'kcgl',
    data() {
        return {
            loading:true,
            msg:"课程管理",
            xzkcsj:false,
            addClassswitch:false,
            api:Config.api,
            search:{
                title:''
            },
            tableData: '',
            form:{
                className:'',
                time:[{
                    value:''
                }],
                email:''
            },
            // 总页数
            totalPage:null,
            // 默认每页显示的条数（自带的不修改修改）
            PageSizes:1,
            // 每页条数 （自己设置往后台传输的）
            pageSize:5,
            // 默认显示第几页，点击之后选中第几页
            currentPage:1,
            title:'',
        }
    },
    mounted(){
        this.onSearch();
    },
    methods:{
        onSearch(){
            this.loading=true;
            let api =this.api+'/projectCourse/list?';
            let params = {
                pageSize:this.pageSize,
                currentPage:this.currentPage,
                title:this.title
            };
            this.$http.get(api,{params}).then(res=>{
                if(res.data.totalPage==null){
                    this.totalPage=1
                }else{
                    this.totalPage=res.data.totalPage
                }
                this.tableData = res.data;
                this.loading=false;
            }).catch(err=>{
                console.log(err)
            });
        },
        // 时间选则新增
        addformtime(){
            this.form.time.push({
                value: '',
                key: Date.now()
            });
        },
        // 时间选则删除
        removeDomain(item) {
            var index = this.form.time.indexOf(item)
            if (index !== -1) {
            this.form.time.splice(index, 1)
            }
        },
        //   点击选择课程添加
        addxzkc(){
            this.xzkcsj=true;
        },
        // 列表修改
        handleEdit(row) {
            console.log(row.id);
        },
        // 列表删除
        handleDelete(row) {
            console.log(row.id);
        },
        seeclass(row){
            console.log(row);
        },
        postsearch(){

        },
        reset(){

        },
        cleartime(){

        },
        // 添加课程弹窗提交
        getTime(){
            console.log(this.form);
            let api =this.api+'/projectCourse/insert';
            let courseTime = [];
            let all = {};
            let xstime = [];
            let xetime = [];
            for(let i in this.form.time){
                 xstime.push(this.form.time[i].value[0]);
                 xetime.push(this.form.time[i].value[1]);
            }
             xstime.push(this.form.email[0])
             xetime.push(this.form.email[1])
             console.log(xstime);
             console.log(xetime);
            let startTime = Object.assign('',this.form.email[0],);
            let endTime = '';
            let params={
                title:this.form.className,
                courseTime:[
                    {
                        startTime: a1,
                        endTime:  asd,
                    }
                ]
            }
        },
        handleCurrentChange(){},
        addClass(){
            this.addClassswitch = true;
        }
    }
}
</script>
<style lang="scss" scoped>
#kcgl{
    width: 100%;
    height: calc(100% - 80px);
    .xzkctj{
        position: absolute;
        top: 10%;
        left: calc(50% - 296px);
        width: auto;
        background: #fff;
        padding: 20px 40px;
        z-index: 999;
        width: 592px;
        .time{
            margin: 0 0 60px 0;
        }
    }
    .header{
        width: 100%;
        height: auto;
        margin: 40px 0 0 0;
        border-bottom: 1px solid #686868;
        .list{
            width: 150px;
            height: 100%;
            line-height: 45px;
            text-align: center;
            float: left;
            font-size: 16px;
            color: #1cbe8d;
        }
    }
    .search{
        width: auto;
        height: auto;
        margin: 40px 0 20px 20px;
        .searchbox{
            width: 70%;
            background: #eee;
            padding: 30px 10px;
            box-sizing: border-box;
            span{
                margin: 0 20px 0 0;
            }
            input{
                width: 200px;
                line-height: 30px;
                margin: 0 20px 0 0;
                border: 1px solid;
            }
            button{
                width: 60px;
                height: 30px;
                background: #1cbe8d;
                font-size: 14px;
                color: #fff;
                border-radius: 5px;
            }
        }
    }
    .listbox{
        width: 44%;
        height: auto;
        margin: 0 0 0 20px;
        button{
            margin:10px 0 10px 0;
        }
        .cheekClass{
            position: absolute;
            top: 20%;
            left: calc(50% - 350px);
            width: auto;
            background: #eee;
            padding: 20px 40px;
            z-index: 999;
            width: 700px;
        }
    }
}
</style>