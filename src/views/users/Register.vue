<!--<template>-->
  <!--<div>-->
    <!--<div>-->
      <!--<div id="register">-->
        <!--<p class="title">注册</p>-->
        <!--<el-form-->
                <!--:model="ruleForm2"-->
                <!--status-icon-->
                <!--:rules="rules2"-->
                <!--ref="ruleForm2"-->
                <!--label-width="0"-->
                <!--class="demo-ruleForm"-->
        <!--&gt;-->
          <!--<el-form-item prop="name">-->
            <!--<el-input v-model="ruleForm2.name" auto-complete="off" placeholder="真实姓名"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item  prop="phone">-->
            <!--<el-input v-model="ruleForm2.phone" auto-complete="off" placeholder="请输入手机号"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item prop="smscode" class="code">-->
            <!--<el-input v-model="ruleForm2.smscode" placeholder="验证码"></el-input>-->
            <!--<el-button type="primary" :disabled='isDisabled' @click="sendCode">{{buttonText}}</el-button>-->
          <!--</el-form-item>-->
          <!--<el-form-item prop="password">-->
            <!--<el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="输入密码"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item prop="checkPass">-->
            <!--<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认密码"></el-input>-->
          <!--</el-form-item>-->

          <!--<el-form-item>-->
            <!--<el-row>-->
              <!--<el-col span="12">-->
                <!--&lt;!&ndash;级联选择框&ndash;&gt;-->
                <!--<div class="block">-->
                  <!--<el-cascader-->
                          <!--v-model="ruleForm2.factoryId"-->
                          <!--:options="options"-->
                          <!--@change="handleChange" placeholder="公司/工厂"></el-cascader>-->
                <!--</div>-->
              <!--</el-col>-->
              <!--<el-col span="12">-->
                <!--<el-radio-group v-model="ruleForm2.identity"  size="small">-->
                  <!--<el-radio-button label="1">负责人</el-radio-button>-->
                  <!--<el-radio-button label="2">审核员</el-radio-button>-->
                <!--</el-radio-group>-->
              <!--</el-col>-->
            <!--</el-row>-->
          <!--</el-form-item>-->

          <!--&lt;!&ndash;职能选择&ndash;&gt;-->
          <!--<el-form-item>-->
            <!--<el-row>-->

              <!--<el-select style="width:100%" filterable v-model="ruleForm2.skill" multiple placeholder="职能（多选）">-->
                <!--<el-option-group-->
                        <!--v-for="group in skills"-->
                        <!--:key="group.label"-->
                        <!--:label="group.label">-->
                  <!--<el-option-->
                          <!--v-for="item in group.options"-->
                          <!--:key="item.value"-->
                          <!--:label="item.label"-->
                          <!--:value="item.value">-->
                  <!--</el-option>-->
                <!--</el-option-group>-->
              <!--</el-select>-->

            <!--</el-row>-->
          <!--</el-form-item>-->

          <!--<el-form-item>-->
            <!--<el-button type="primary" @click="submitForm" style="width:100%;">注册</el-button>-->
            <!--<p class="login" @click="gotoLogin">已有账号？立即登录</p>-->
          <!--</el-form-item>-->

        <!--</el-form>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->
<!--<script>-->
    <!--export default {-->
        <!--name: "Register",-->
        <!--data() {-->
            <!--// &lt;!&ndash;验证姓名是否合法&ndash;&gt;-->
            <!--let checkName = (rule, value, callback) => {-->
                <!--if (value === '') {-->
                    <!--callback(new Error('请输入真实姓名'))-->
                <!--}else if (!this.checkName(value)) {-->
                    <!--callback(new Error('姓名长度不规范'))-->
                <!--}else {-->
                    <!--callback()-->
                <!--}-->
            <!--}-->
            <!--// &lt;!&ndash;验证手机号是否合法&ndash;&gt;-->
            <!--let checkphone = (rule, value, callback) => {-->
                <!--if (value === '') {-->
                    <!--callback(new Error('请输入手机号码'))-->
                <!--} else if (!this.checkMobile(value)) {-->
                    <!--callback(new Error('手机号码不合法'))-->
                <!--} else {-->
                    <!--callback()-->
                <!--}-->
            <!--}-->
            <!--//  &lt;!&ndash;验证码是否为空&ndash;&gt;-->
            <!--let checkSmscode = (rule, value, callback) => {-->
                <!--if (value === '') {-->
                    <!--callback(new Error('请输入手机验证码'))-->
                <!--} else {-->
                    <!--callback()-->
                <!--}-->
            <!--}-->
            <!--// &lt;!&ndash;验证密码&ndash;&gt;-->
            <!--let validatePass = (rule, value, callback) => {-->
                <!--if (value === "") {-->
                    <!--callback(new Error("请输入密码"))-->
                <!--} else {-->
                    <!--if (this.ruleForm2.checkPass !== "") {-->
                        <!--this.$refs.ruleForm2.validateField("checkPass");-->
                    <!--}-->
                    <!--callback()-->
                <!--}-->
            <!--}-->
            <!--// &lt;!&ndash;二次验证密码&ndash;&gt;-->
            <!--let validatePass2 = (rule, value, callback) => {-->
                <!--if (value === "") {-->
                    <!--callback(new Error("请再次输入密码"));-->
                <!--} else if (value !== this.ruleForm2.password) {-->
                    <!--callback(new Error("两次输入密码不一致!"));-->
                <!--} else {-->
                    <!--callback();-->
                <!--}-->
            <!--};-->
            <!--return {-->

                <!--skills:[-->
                    <!--{-->
                        <!--label:'机器',-->
                        <!--options:[-->
                            <!--{-->
                                <!--value:0,-->
                                <!--label:"汽车"-->
                            <!--},-->
                            <!--{-->
                                <!--value:1,-->
                                <!--label:"飞机"-->
                            <!--},-->
                            <!--{-->
                                <!--value:2,-->
                                <!--label:"轮船"-->
                            <!--},-->
                        <!--]-->
                    <!--},-->
                    <!--{-->
                        <!--label:'部件',-->
                        <!--options:[-->
                            <!--{-->
                                <!--value:9,-->
                                <!--label:"引擎"-->
                            <!--},-->
                            <!--{-->
                                <!--value:11,-->
                                <!--label:"烟囱"-->
                            <!--},-->
                            <!--{-->
                                <!--value:12,-->
                                <!--label:"甲板"-->
                            <!--},-->
                        <!--]-->
                    <!--}-->

                <!--],   //职能选项列表-->
                <!--value: [],-->

                <!--//公司/工厂列表-->
                <!--options: [{-->
                    <!--value: '0',-->
                    <!--label: '公司1',-->
                    <!--children: [{-->
                        <!--value: '11',-->
                        <!--label: '工厂1',-->
                    <!--},-->
                        <!--{-->
                            <!--value: '12',-->
                            <!--label: '工厂2',-->
                        <!--},-->
                        <!--{-->
                            <!--value: '13',-->
                            <!--label: '工厂3',-->
                        <!--}]-->
                <!--}],-->
                <!--ruleForm2: {-->
                    <!--name:"",         //真实姓名-->
                    <!--password: "",        //密码-->
                    <!--checkPass: "",  //密码2-->
                    <!--phone: "",       //手机号-->
                    <!--smscode: "",   //验证码-->
                    <!--identity:"",    //身份-->
                    <!--factoryId:"",   //工厂Id-->
                    <!--skill:[]    //职能-->
                <!--},-->
                <!--rules2: {-->
                    <!--password: [{ validator: validatePass, trigger: 'change' }],-->
                    <!--checkPass: [{ validator: validatePass2, trigger: 'change' }],-->
                    <!--phone: [{ validator: checkphone, trigger: 'change' }],-->
                    <!--name: [{ validator: checkName, trigger: 'change' }],-->
                    <!--smscode: [{ validator: checkSmscode, trigger: 'change' }],-->
                <!--},-->
                <!--buttonText: '发送验证码',-->
                <!--isDisabled: false, // 是否禁止点击发送验证码按钮-->
                <!--flag: true-->
            <!--}-->
        <!--},-->
        <!--created(){-->
            <!--//查询职能列表-->
            <!--this.querySkillSelect();-->

        <!--//    查询公司列表-->
            <!--this.queryCompanyF();-->
        <!--},-->
        <!--methods: {-->
            <!--//查询公司列表-->
            <!--queryCompanyF(){-->
                <!--this.$http.get("/employee/company").then(res=>{-->
                    <!--this.options = res.data;-->
                <!--})-->
            <!--},-->


            <!--//获取职能下拉列表的内容【组件列表】-->
            <!--querySkillSelect(){-->
                <!--this.$http.get("component/querySkillSelect")-->
                    <!--.then(res => {-->
                        <!--this.skills = res.data;-->
                    <!--})-->

            <!--},-->
            <!--// &lt;!&ndash;发送验证码&ndash;&gt;-->
            <!--sendCode () {-->
                <!--let phone = this.ruleForm2.phone-->
                <!--if (this.checkMobile(phone)) {-->
                    <!--console.log(phone)-->
                    <!--let time = 60-->
                    <!--this.buttonText = '已发送'-->
                    <!--this.isDisabled = true-->
                    <!--if (this.flag) {-->
                        <!--this.flag = false;-->
                        <!--let timer = setInterval(() => {-->
                            <!--time&#45;&#45;;-->
                            <!--this.buttonText = time + ' 秒'-->
                            <!--if (time === 0) {-->
                                <!--clearInterval(timer);-->
                                <!--this.buttonText = '重新获取'-->
                                <!--this.isDisabled = false-->
                                <!--this.flag = true;-->
                            <!--}-->
                        <!--}, 1000)-->
                    <!--}-->
                <!--}-->
            <!--},-->
            <!--// &lt;!&ndash;提交注册&ndash;&gt;-->
            <!--submitForm() {-->
                <!--this.$refs.ruleForm2.validate(valid => {-->
                    <!--if (valid) {-->
                        <!--let param = Object.assign({}, this.ruleForm2);-->
                        <!--param.skill = JSON.stringify(param.skill);-->
                        <!--this.$http.post("/employee/register",param)-->
                            <!--.then(res => {-->
                                <!--this.$message({-->
                                    <!--message: "注册成功",-->
                                    <!--type: "success"-->
                                <!--});-->
                            <!--})-->
                            <!--.catch(error => {-->

                                <!--console.log(error.response.data.message)-->
                                <!--this.$message({-->
                                    <!--message: error.response.data.message,-->
                                    <!--type: "error"-->
                                <!--});-->
                            <!--})-->
                    <!--}-->
                <!--})-->
                <!--// this.$refs[formName].validate(valid => {-->
                <!--//   if (valid) {-->
                <!--//     setTimeout(() => {-->
                <!--//       alert('注册成功')-->
                <!--//     }, 400);-->
                <!--//   } else {-->
                <!--//     console.log("error submit!!");-->
                <!--//     return false;-->
                <!--//   }-->
                <!--// })-->
            <!--},-->
            <!--// &lt;!&ndash;进入登录页&ndash;&gt;-->
            <!--gotoLogin() {-->
                <!--this.$router.push({-->
                    <!--path: "/login"-->
                <!--});-->
            <!--},-->
            <!--//验证姓名的长度-->
            <!--checkName(str){-->
                <!--let re = /^.{2,6}$/-->
                <!--if (re.test(str)) {-->
                    <!--return true;-->
                <!--} else {-->
                    <!--return false;-->
                <!--}-->
            <!--},-->
            <!--// 验证手机号-->
            <!--checkMobile(str) {-->
                <!--let re = /^1\d{10}$/-->
                <!--if (re.test(str)) {-->
                    <!--return true;-->
                <!--} else {-->
                    <!--return false;-->
                <!--}-->
            <!--}-->
        <!--}-->
    <!--};-->
<!--</script>-->

<!--<style scoped>-->
  <!--.loading-wrapper {-->
    <!--position: fixed;-->
    <!--top: 0;-->
    <!--right: 0;-->
    <!--left: 0;-->
    <!--bottom: 0;-->
    <!--background: #aedff8;-->
    <!--display: flex;-->
    <!--align-items: center;-->
    <!--justify-content: center;-->
  <!--}-->
  <!--.register-wrapper img {-->
    <!--position: absolute;-->
    <!--z-index: 1;-->
  <!--}-->
  <!--.register-wrapper {-->
    <!--position: fixed;-->
    <!--top: 0;-->
    <!--right: 0;-->
    <!--left: 0;-->
    <!--bottom: 0;-->
  <!--}-->
  <!--#register {-->
    <!--max-width: 340px;-->
    <!--margin: 60px auto;-->
    <!--background: #fff;-->
    <!--padding: 20px 40px;-->
    <!--border-radius: 10px;-->
    <!--position: relative;-->
    <!--z-index: 9;-->
  <!--}-->
  <!--.title {-->
    <!--font-size: 26px;-->
    <!--line-height: 50px;-->
    <!--font-weight: bold;-->
    <!--margin: 10px;-->
    <!--text-align: center;-->
  <!--}-->
  <!--.el-form-item {-->
    <!--text-align: center;-->
  <!--}-->
  <!--.login {-->
    <!--margin-top: 10px;-->
    <!--font-size: 14px;-->
    <!--line-height: 22px;-->
    <!--color: #1ab2ff;-->
    <!--cursor: pointer;-->
    <!--text-align: left;-->
    <!--text-indent: 8px;-->
    <!--width: 160px;-->
  <!--}-->
  <!--.login:hover {-->
    <!--color: #2c2fd6;-->
  <!--}-->
  <!--.code >>> .el-form-item__content {-->
    <!--display: flex;-->
    <!--align-items: center;-->
    <!--justify-content: space-between;-->
  <!--}-->
  <!--.code button {-->
    <!--margin-left: 20px;-->
    <!--width: 140px;-->
    <!--text-align: center;-->
  <!--}-->
  <!--.el-button&#45;&#45;primary:focus {-->
    <!--background: #409EFF;-->
    <!--border-color: #409EFF;-->
    <!--color: #fff;-->
  <!--}-->
<!--</style>-->
