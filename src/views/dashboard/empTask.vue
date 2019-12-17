<!--<template>-->
  <!--<div class="setting">-->
    <!--<h1 class="title">任务</h1>-->
    <!--<el-tabs stretch="true" type="border-card">-->
      <!--<el-tab-pane label="执行中">-->

        <!--<div style="margin: 10px 10px;" v-for="(item,index) in  workData" v-if="item.state == 1">-->
          <!--<div>-->
            <!--<span>项目号：{{item.productId}}</span> <span  style="float: right;">流程号：{{item.processId}}</span>-->
          <!--</div>-->
          <!--<div  style="margin: 4px 0px">-->
            <!--<span>组件：{{item.componentTitle}}&nbsp;|&nbsp;&nbsp;数量：{{item.count}}</span> <span  style="float: right;">-->
                <!--<el-button type="text"  @click="showTaskDetail(item.processId)">详情&gt;</el-button>-->
                <!--&lt;!&ndash;<el-button type="text"  @click="checkDetailVisible = true">详情2&gt;</el-button>&ndash;&gt;-->
            <!--</span>-->
          <!--</div>-->
          <!--<div>-->
            <!--<el-progress :percentage="Math.floor((item.passCount / item.count) * 100)"></el-progress>-->
          <!--</div>-->

          <!--<div>-->
            <!--<el-button type="success" size="mini" round v-if="item.state == 1">执行中</el-button>-->
            <!--<el-button type="info" size="mini" round v-if="item.state == 4">已完成</el-button>-->
          <!--</div>-->
          <!--<HR style="FILTER: alpha(opacity=100,finishopacity=0,style=3)" color=#987cb9 SIZE=3></HR>-->
        <!--</div>-->



      <!--</el-tab-pane>-->

      <!--<el-tab-pane label="已完成">-->
        <!--<div style="margin: 10px 10px;" v-for="(item,index) in  workData" v-if="item.state == 4">-->
          <!--<div>-->
            <!--<span>项目号：{{item.productId}}</span> <span  style="float: right;">流程号：{{item.processId}}</span>-->
          <!--</div>-->
          <!--<div  style="margin: 4px 0px">-->
            <!--<span>组件：{{item.componentTitle}}&nbsp;|&nbsp;&nbsp;数量：{{item.count}}</span> <span  style="float: right;">-->
                <!--<el-button type="text"  @click="showTaskDetail(item.processId)">详情&gt;</el-button>-->
            <!--&lt;!&ndash;<el-button type="text"  @click="checkDetailVisible = true">详情2&gt;</el-button>&ndash;&gt;-->
            <!--</span>-->
          <!--</div>-->
          <!--<div>-->
            <!--<el-progress :percentage="Math.floor((item.passCount / item.count) * 100)"></el-progress>-->
          <!--</div>-->

          <!--<div>-->
            <!--<el-button type="success" size="mini" round v-if="item.state == 1">执行中</el-button>-->
            <!--<el-button type="info" size="mini" round v-if="item.state == 4">已完成</el-button>-->
          <!--</div>-->
          <!--<HR style="FILTER: alpha(opacity=100,finishopacity=0,style=3)" color=#987cb9 SIZE=3></HR>-->
        <!--</div >-->
      <!--</el-tab-pane>-->

    <!--</el-tabs>-->



    <!--&lt;!&ndash;负责人详情的弹框&ndash;&gt;-->
    <!--<el-dialog-->
            <!--title="负责人详情"-->
            <!--:visible.sync="detailVisible"-->
            <!--width="80%"-->
            <!--modal="true"-->
            <!--center>-->
    <!--<el-form>-->
      <!--<el-row>-->
        <!--<el-col :span="12">-->
          <!--<el-form-item  class="form_input" label="组件">-->
            <!--<el-tag>{{taskDetail.componentTitle}}</el-tag>-->

          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="12">-->
          <!--<el-form-item class="form_input" label="上级">-->
            <!--<el-tag>{{taskDetail.parentName}}</el-tag>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->

      <!--<el-row>-->
        <!--<el-col :span="12">-->
          <!--<el-form-item class="form_input" label="总量">-->
            <!--<el-tag>{{taskDetail.count}}</el-tag>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="12">-->
          <!--<el-form-item class="form_input" label="合格">-->
            <!--<el-tag>{{taskDetail.passCount}}</el-tag>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row>-->
        <!--<el-col :span="12">-->
          <!--<el-form-item class="form_input" label="已审核">-->
            <!--<el-tag>{{taskDetail.checkCount}}</el-tag>-->

          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="12">-->
          <!--<el-form-item class="form_input" label="不合格">-->
            <!--<el-tag>{{taskDetail.mistake}}</el-tag>-->

          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row>-->
        <!--<el-col :span="12">-->
          <!--<el-form-item class="form_input" label="负责人">-->
            <!--<el-tag>{{taskDetail.dutyName}}</el-tag>-->

          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="12">-->
          <!--<el-form-item class="form_input" label="审核人">-->
            <!--<el-tag>{{taskDetail.checkName}}</el-tag>-->

          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row>-->
        <!--<el-col>-->
          <!--<el-form-item class="form_input" label="已生产">-->
            <!--<el-input v-model="taskDetail.dutyCount" :disabled="taskDetail.state == 4"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-form-item label="参数列表" >-->
        <!--<el-tag v-for="item in taskDetail.skills">-->
          <!--{{item}}-->
        <!--</el-tag>-->
      <!--</el-form-item>-->
    <!--</el-form>-->


      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="detailVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="dutyCommit(taskDetail.id,taskDetail.dutyCount)" :disabled="taskDetail.state == 4">提 交</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->


    <!--&lt;!&ndash;审核人详情的弹框&ndash;&gt;-->
    <!--<el-dialog-->
            <!--title="审核人详情"-->
            <!--:visible.sync="checkDetailVisible"-->
            <!--width="80%"-->
            <!--modal="true"-->
            <!--center>-->
      <!--<el-form>-->
        <!--<el-row>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item  class="form_input" label="组件">-->
              <!--<el-tag>{{taskDetail.componentTitle}}</el-tag>-->

            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item class="form_input" label="上级">-->
              <!--<el-tag>{{taskDetail.parentName}}</el-tag>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->

        <!--<el-row>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item class="form_input" label="总量">-->
              <!--<el-tag>{{taskDetail.count}}</el-tag>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item class="form_input" label="合格">-->
              <!--<el-tag>{{taskDetail.passCount}}</el-tag>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col>-->
            <!--<el-form-item class="form_input" label="已生产">-->
              <!--<el-tag>{{taskDetail.dutyCount}}</el-tag>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item class="form_input" label="负责人">-->
              <!--<el-tag>{{taskDetail.dutyName}}</el-tag>-->

            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item class="form_input" label="审核人">-->
              <!--<el-tag>{{taskDetail.checkName}}</el-tag>-->

            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->

        <!--<el-row>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item class="form_input" label="已审核">-->
              <!--<el-input v-model="taskDetail.checkCount" :disabled="taskDetail.state == 4"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item class="form_input" label="不合格">-->
              <!--<el-input v-model="taskDetail.mistake" :disabled="taskDetail.state == 4"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-form-item label="参数列表" >-->
          <!--<el-tag v-for="item in taskDetail.skills">-->
            <!--{{item}}-->
          <!--</el-tag>-->
        <!--</el-form-item>-->

      <!--</el-form>-->


      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="checkDetailVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="checkCommit" :disabled="taskDetail.state == 4">提 交</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->
  <!--</div>-->



<!--</template>-->

<!--<script>-->
<!--import axios from '../../axios.js'-->
<!--export default {-->
  <!--name: 'Setting',-->
  <!--data() {-->
    <!--return {-->
        <!--taskDetail:{-->
            <!--componentTitle:"电池",  //组件名称-->
            <!--parentName:"老张",   //上级负责人名称-->
            <!--count: 100,-->
            <!--passCount:80,-->
            <!--checkCount:100,-->
            <!--mistake:20,-->
            <!--dutyName:"李白",-->
            <!--checkName:"夏侯惇",-->
            <!--dutyCount:100,-->
            <!--type:1,-->
            <!--state:1,   //当前的状态1进行中，4完成-->
            <!--skills:[-->
                <!--"高度100mm","材质：钨合金","质量：0.5K"-->
            <!--]-->

        <!--},-->
        <!--//审核人详情的显示和隐藏-->
        <!--checkDetailVisible:false,-->

        <!--//负责人详情框的显示和隐藏-->
        <!--detailVisible:false,-->



        <!--workData: [-->
          <!--{-->
              <!--productId:54125,  //项目id-->
              <!--processId:204,  //流程idid-->
              <!--componentTitle: "电池" ,//改任务的组件名称-->
              <!--count: 200, //总数量-->
              <!--passCount:124,-->
              <!--state:1 //任务状态1运行中-->
          <!--},-->
            <!--{-->
                <!--productId:54547,  //项目id-->
                <!--processId:124,  //流程idid-->
                <!--componentTitle: "轮胎" ,//改任务的组件名称-->
                <!--count: 50, //总数量-->
                <!--passCount:16,-->
                <!--state:1 //任务状态1运行中-->
            <!--},-->
            <!--{-->
                <!--productId:15547,  //项目id-->
                <!--processId:624,  //流程idid-->
                <!--componentTitle: "底盘" ,//改任务的组件名称-->
                <!--count: 10, //总数量-->
                <!--passCount:8,-->
                <!--state:1 //任务状态1运行中-->
            <!--}-->

      <!--]-->
    <!--}-->
  <!--},-->
  <!--created () {-->
    <!--// this.getAllUser()-->
      <!--this.getWorkTaskList();-->
  <!--},-->
  <!--methods: {-->
      <!--//审核人提交任务进度-->
      <!--checkCommit(){-->
          <!--this.$http.get("empTask/checkUpdate",{params:{-->
                  <!--id:this.taskDetail.id,-->
                  <!--dutyCount:this.taskDetail.dutyCount,-->
                  <!--count:this.taskDetail.count,-->
                  <!--checkCount:this.taskDetail.checkCount,-->
                  <!--mistake:this.taskDetail.mistake-->
              <!--}}).then(res=>{-->
              <!--this.checkDetailVisible = false; //关闭对话框-->
              <!--this.$notify({-->
                  <!--title: '成功',-->
                  <!--message: '提交成功',-->
                  <!--duration: 2000,-->
                  <!--type: 'success'-->
              <!--})-->
              <!--//刷新列表-->
              <!--this.getWorkTaskList();-->
          <!--}).catch(err =>{-->
              <!--this.$notify({-->
                  <!--title: '错误',-->
                  <!--message: err.response.data.message,-->
                  <!--duration: 2000,-->
                  <!--type: 'error'-->
              <!--})-->

          <!--})-->
      <!--},-->

      <!--//负责人提交任务进度-->
      <!--dutyCommit(processId,dutyCount){-->
          <!--this.$http.get("empTask/dutyUpdate",{params:{-->
                <!--id:processId,-->
                  <!--dutyCount:dutyCount-->
              <!--}}).then(res=>{-->
              <!--this.detailVisible = false; //关闭对话框-->
              <!--this.$notify({-->
                  <!--title: '成功',-->
                  <!--message: '提交成功',-->
                  <!--duration: 8000,-->
                  <!--type: 'success'-->
              <!--})-->
              <!--//刷新列表-->
              <!--this.getWorkTaskList();-->

          <!--})-->

      <!--},-->

      <!--//查询任务详情-->
      <!--showTaskDetail(processId){-->
          <!--this.$http.get("empTask/taskDetail?processId="+processId).then(res =>{-->
              <!--let detail = res.data;-->
              <!--detail.skills = JSON.parse(detail.skills);-->
              <!--this.taskDetail = detail;-->
              <!--if (detail.type == 1){-->
                  <!--this.detailVisible = true;-->
              <!--} else if (detail.type == 2){-->
                  <!--this.checkDetailVisible = true;-->

              <!--}-->
          <!--})-->
      <!--},-->

      <!--//获取正在执行中的任务列表-->
      <!--getWorkTaskList(){-->
          <!--this.$http.get("empTask/workTaskList").then(res=>{-->
              <!--this.workData = res.data;-->
          <!--})-->
      <!--},-->
    <!--getAllUser () {-->
      <!--axios.getAllUser().then((res) => {-->
        <!--console.log(res)-->
        <!--if(res.status === 200 && res.data && res.data.code === 0) {-->
          <!--this.tableData = res.data.result-->
        <!--}  else {-->
          <!--this.$notify({-->
            <!--title: '错误',-->
            <!--message: res.data.msg,-->
            <!--duration: 2000,-->
            <!--type: 'error'-->
          <!--})-->
        <!--}-->
      <!--})-->
    <!--},-->
    <!--handleClick (e) {-->
      <!--console.log(e.username)-->
      <!--axios.delUser({-->
        <!--username: e.username-->
      <!--}).then((res) => {-->
        <!--if(res.status === 200 && res.data && res.data.code === 0) {-->
          <!--this.$notify({-->
            <!--title: '成功',-->
            <!--message: res.data.msg,-->
            <!--duration: 2000,-->
            <!--type: 'error'-->
          <!--})-->
          <!--this.tableData = this.tableData.filter(val => val.username !== e.username)-->
        <!--} else {-->
          <!--this.$notify({-->
            <!--title: '错误',-->
            <!--message: res.data.msg,-->
            <!--duration: 2000,-->
            <!--type: 'error'-->
          <!--})-->
        <!--}-->
      <!--})-->
    <!--}-->
  <!--}-->
<!--}-->
<!--</script>-->

<!--<style lang="stylus">-->
  <!--.setting-->
    <!--background #fff-->
    <!--padding 20px-->
    <!--max-width 1100px-->
    <!--margin 0 auto-->
    <!--.title-->
      <!--font-size 28px-->
      <!--padding 0 0 30px 0-->

<!--</style>-->
