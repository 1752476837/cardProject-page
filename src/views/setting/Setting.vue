<template>
  <div class="setting">
    <h1 class="title">设置</h1>
    <el-form ref="form"  label-width="80px">
   <div style="font-size: large;margin-bottom: 20px">播放设置</div>
          <el-form-item label="视频播放">
            <el-radio-group v-model="form.player">
              <el-radio-button label="0">自动</el-radio-button>
              <el-radio-button label="1">手动</el-radio-button>
            </el-radio-group>
          </el-form-item>


        <div style="margin-top: 100px ;font-size: large;margin-bottom: 20px">Tag设置</div>
        <el-row>
          <el-col span="12">
            <el-form-item label="标题">
              <el-input
                      type="text"
                      placeholder="请输入内容"
                      v-model="form.title"
                      maxlength="15"
                      show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="描述">
              <el-input
                      type="text"
                      placeholder="请输入内容"
                      v-model="form.description"
                      maxlength="25"
                      show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      <el-row>
        <el-col span="12">
          <el-form-item label="网址">
            <el-input
                    placeholder="请输入内容"
                    v-model="form.domain"
                    clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="图标">
            <el-upload
                    class="avatar-uploader"
                    :action="getDomain()"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    with-credentials="true">
              <img v-if="form.icon" :src="form.icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-form-item>
        </el-col>
      </el-row>
      <el-form-item align="center" style="margin-top: 100px">
        <el-button type="primary" @click="saveConfig">保存</el-button>
        <el-button @click="reSet">重置</el-button>
      </el-form-item>


    </el-form>
  </div>
</template>

<script>
import axios from '../../axios.js'
export default {
  name: 'Setting',
  data() {
    return {
        form:{
            player:0,
            title:"",
            description:"",
            domain:"",
            icon:""
        },
        bakForm:{}
    }
  },
  created () {
    //获取配置页面参数
    this.getParams();
  },
  methods: {
      getDomain(){
         return this.$http.defaults.baseURL + "/fileUpload";
      },
      //重置表单
      reSet(){
          this.form = JSON.parse(JSON.stringify(this.bakForm));
      },
      //保存配置
      saveConfig(){
          this.$http.post("/saveConfig",this.form).then(res=>{
              this.$notify({
                  title: '成功',
                  message: "保存成功",
                  duration: 2000,
                  type: 'success'
              })
              this.getParams();
          })
      },
      //获取配置页面参数
      getParams(){
            this.$http.get("/getConfig").then(res=>{
                this.form = res.data;
                this.bakForm = JSON.parse(JSON.stringify(res.data));
            })
      }
      ,
      handleAvatarSuccess(res, file) {
          this.form.icon = res;
      },
      beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isPNG = file.type === 'image/png';
          const isBMP = file.type === 'image/bmp';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG && !isBMP && !isPNG) {
              this.$message.error('图片只能是 JPG、BMP、PNG 格式!');
          }
          if (!isLt2M) {
              this.$message.error('图片大小不能超过 2MB!');
          }
          return (isJPG || isPNG || isBMP) && isLt2M;
      },

    handleClick (e) {
      console.log(e.username)
      axios.delUser({
        username: e.username
      }).then((res) => {
        if(res.status === 200 && res.data && res.data.code === 0) {
          this.$notify({
            title: '成功',
            message: res.data.msg,
            duration: 2000,
            type: 'error'
          })
          this.tableData = this.tableData.filter(val => val.username !== e.username)
        } else {
          this.$notify({
            title: '错误',
            message: res.data.msg,
            duration: 2000,
            type: 'error'
          })
        }
      })
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
