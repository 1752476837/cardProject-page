<template>
    <div class="setting">
        <h1 class="title">账号密码</h1>
        <el-form style="width: 50%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="原密码" prop="oldPass">
                <el-input v-model="ruleForm.oldPass"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPass">
                <el-input v-model="ruleForm.newPass"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="newPass1">
                <el-input v-model="ruleForm.newPass1"></el-input>
            </el-form-item>

            <el-form-item align="center" >
                <el-button type="primary" @click="savePass('ruleForm')">保存</el-button>
            </el-form-item>


        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'Center',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.newPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm:{
                    oldPass:"",
                    newPass:"",
                    newPass1:""
                },
                rules: {
                    oldPass: [
                        { required: true, message: '请输入原密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ],
                    newPass: [
                        { validator: validatePass, trigger: 'blur' },
                    ],
                    newPass1: [
                        { validator: validatePass2, trigger: 'blur' },
                    ],
                }
            }
        },
        created () {

        },
        methods: {
            savePass(ruleForm){
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        this.$http.post("/savePass",this.ruleForm).then(res=>{
                            this.$notify({
                                title: '成功',
                                message: "修改成功,请重新登录",
                                duration: 2000,
                                type: 'success'
                            });
                            this.$cookieStore.delCookie("LY_TOKEN")
                            setTimeout(()=>{
                                this.$router.push({
                                    path: '/login'
                                })
                            },2000)

                        }).catch(res=>{
                            this.$notify({
                                title: '错误',
                                message: res.response.data.message,
                                duration: 2000,
                                type: 'error'
                            });
                        })




                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }

        }
    }
</script>

<style lang="stylus">
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
    .setting
        background #fff
        padding 20px
        max-width 1100px
        margin 0 auto
        .title
            font-size 28px
            padding 0 0 30px 0

</style>
