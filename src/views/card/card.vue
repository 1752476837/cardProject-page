<template>
    <div class="_tablepage">
        <!-- 查询区 start -->
        <el-form
                :inline="true"
                :model="formSearch"
                ref="formSearch"
                class="demo-form-inline"
                label-width="68px"
        >
            <el-form-item class="form_input" label="姓名" prop="name">
                <el-input v-model="formSearch.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item class="form_select" label="手机号" prop="type">
                <el-input v-model="formSearch.phone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item class="form_date" label="创建时间" prop="createDate">
                <el-date-picker
                        v-model="formSearch.createDate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="timestamp"
                ></el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button type="warning" @click="onReset" plain>重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 查询区 end -->
        <!-- 操作区 start -->
        <el-row class="operate">
            <el-col :span="24">
                <!--<el-button type="primary" round @click="onShowAdd">新增</el-button>-->
                <el-button type="danger" @click="deleteCard()">删除</el-button>
                <el-button type="primary" @click="exportSelected()"> 导出选中 </el-button>
                <el-button type="primary" @click="exportAll()"> 导出全部</el-button>
            </el-col>
        </el-row>
        <!-- 操作区 end -->
        <!--表格 start-->
        <el-table @selection-change="handleSelectionChange" :data="tableList" border style="width: 100%" align="center" v-loading="loading"
                  :default-sort = "{prop: 'createTime', order: 'descending'}">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" ></el-table-column>
            <el-table-column sortable prop="company" label="公司" ></el-table-column>
            <el-table-column sortable prop="position" label="职位" ></el-table-column>
            <el-table-column prop="mail" label="邮箱" ></el-table-column>
            <el-table-column sortable prop="address" label="地址" ></el-table-column>
            <el-table-column sortable prop="createTime" label="创建日期" :formatter="format_date"></el-table-column>
            <el-table-column  prop="updateTime" label="更新日期" :formatter="format_date"></el-table-column>

            <el-table-column fixed="right" label="操作" width="100" align="center">
                <template slot-scope="scope">
                    <el-button @click="onShowDetail(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="onShowEdit(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--表格 end-->

        <!--分页 start-->
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageInfo.currentPage"
                :page-sizes="[5, 10, 50, 100]"
                :page-size="pageInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageInfo.pageTotal"
        ></el-pagination>

        <!--分页 end-->
        <!-- 新增，编辑，查看 start -->
        <el-dialog
                :title="editDialogParam.title"
                :visible.sync="editDialogParam.show"
                width="700"
                @close="handleDialogClose"
        >
            <el-form
                    :inline="true"
                    :model="formEdit"
                    ref="formEdit"
                    class="demo-form-inline"
                    label-width="68px"
                    :rules="formEditRules"
                    :disabled="editDialogParam.formEditDisabled"
            >

                <el-row>
                    <el-col :span="12">
                        <el-form-item class="form_input" label="姓名" prop="name">
                            <el-input v-model="formEdit.name" placeholder="姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="form_select" label="手机号" prop="phone" :rules="[
                          {min: 11,max: 11,message: '手机号码长度为11'},
                        ]">
                            <el-input v-model="formEdit.phone" placeholder="手机号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item class="form_input" label="公司" prop="name">
                            <el-input v-model="formEdit.company" placeholder="公司"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="form_select" label="职务" prop="type">
                            <el-input v-model="formEdit.position" placeholder="职务"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item class="form_input" label=邮箱 prop="name">
                            <el-input v-model="formEdit.mail" placeholder="邮箱"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="form_select" label="地址" prop="type">
                            <el-input v-model="formEdit.address" placeholder="地址"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item class="form_input" label=头像 v-if="formEdit.headImage != null && formEdit.headImage.length > 0">
                            <el-image
                                    style="width: 120px; height: 120px"
                                    :src="formEdit.headImage"
                                    fit="fill"></el-image>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item class="form_select" label="微信" v-if="formEdit.wxCode != null && formEdit.wxCode.length > 0">
                            <el-image
                                    style="width: 120px; height: 120px"
                                    :src="formEdit.wxCode"
                                    fit="fill"></el-image>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col span="22">
                        <el-form-item label="图片" class="form_select"  v-if="formEdit.image != null && formEdit.image.length > 0">
                            <el-image v-for="item in formEdit.image"
                                    style="width: 100px; height: 100px"
                                    :src="item"
                                    :preview-src-list="formEdit.image">
                            </el-image>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col span="22">
                        <el-form-item label="视频" class="form_select" v-if="formEdit.video != null && formEdit.video.length > 0">
                            <video width="80%" height="240" controls >
                                <source :src="formEdit.video" >
                                您的浏览器不支持 video 标签。
                            </video>
                        </el-form-item>
                    </el-col>
                </el-row>


                <!--&lt;!&ndash;视频照片上传&ndash;&gt;-->
               <!--<el-form-item label="上传">-->
                   <!--<el-upload-->
                           <!--with-credentials="true"-->
                           <!--class="upload-demo"-->
                           <!--action="http://localhost:10086/fileUpload"-->
                           <!--:on-preview="handlePreview"-->
                           <!--list-type="picture">-->
                       <!--<el-button size="small" type="primary">点击上传</el-button>-->
                       <!--<div slot="tip" class="el-upload__tip">文件不超过100MB</div>-->
                   <!--</el-upload>-->
               <!--</el-form-item>-->

                <!--<video width="80%" height="240" controls >-->
                    <!--<source :src="videoUrl" >-->
                    <!--&lt;!&ndash;<source src="movie.ogg" type="video/ogg">&ndash;&gt;-->
                    <!--&lt;!&ndash;<source src="movie.webm" type="video/webm">&ndash;&gt;-->
                    <!--您的浏览器不支持 video 标签。-->
                <!--</video>-->

                    <!--<el-image-->
                            <!--v-if="fileType == 'image'"-->
                            <!--style="width: 80%; height: 20%"-->
                            <!--:src="fileUrl"-->
                            <!--:preview-src-list="preUrl">-->
                    <!--</el-image>-->
                <!--<el-row>-->
                    <!--<ali-player @play="play"-->
                                <!--:useFlashPrism="true"-->
                                <!--:autoplay="true"-->
                                <!--:isLive="false"-->
                                <!--:rePlay="false"-->
                                <!--useH5Prism="true"-->
                                <!--:showBuffer="true"-->
                                <!--showBarTime="5000"-->
                                <!--width="100%"-->
                                <!--height="400px"-->
                                <!--controlBarVisibility="hover"-->
                                <!--:source="videoUrl" ></ali-player>-->
                <!--</el-row>-->

            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogParam.show = false">取 消</el-button>
        <el-button v-show="this.editDialogParam.title!='查看'" type="primary" @click="onAdd();">保 存</el-button>
      </span>
        </el-dialog>
        <!-- 新增，编辑，查看 end -->
    </div>
</template>

<style lang="scss">
    .container {
        background-color: #efefef;
        min-height: 100%;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
    ._tablepage {
        // 覆写el样式,调整输入框宽度 start
        .form_input {
            .el-form-item__content {
                width: 220px;
            }
        }
        .form_select {
            .el-select {
                width: 220px;
            }
        }
        .el-pagination {
            padding-top: 5px;
        }
        .el-form-item {
            margin-bottom: 20px;
        }
        // 覆写el样式,调整输入框宽度 end
        .operate {
            padding-bottom: 10px;
        }
    }
</style>

<script>
    export default {

        name: "tablepage",
        data() {
            return {
                multipleSelection:[], // 选中的id数组
                dialogImageUrl: '',
                dialogVisible: false,
                //列表
                tableList:[],
                pageInfo: {
                    //分页
                    currentPage: 1,
                    pageSize: 5,
                    pageTotal: 80
                },

                formSearch: {
                    name: "",  //名称
                    phone: "",   //手机号
                    startdate: null, //开始时间
                    enddate: null, //结束时间
                    createDate: null //日期
                },
                formEdit: {
                    name:  "",     // 姓名
                    phone: "",      //手机
                    position: "",    //职位
                    company:"",      //公司
                    mail:"",         //邮箱
                    address:"" ,      //地址
                    headImage:"",   //头像url
                    wxCode:"",       //微信二维码
                    image:null,        //图片列表
                    video:null       //视频url
                },

                editDialogParam: {
                    title: "新增", //弹窗标题,值为:新增，查看，编辑
                    show: false, //弹框显示
                    formEditDisabled:false,//编辑弹窗是否可编辑
                },

                loading: false //加载提示
            };
        },
        mounted() {
            //查询页面列表
           this.onSearch();
        },
        methods: {
            //导出全部名片信息为 excel
            exportAll(){
                let url = this.$http.defaults.baseURL+"/card/exportAll";
                this.$http({

                    method: 'post',

                    header: {'Content-Type': 'application/xls'},　　　　　　　　　　　　// http请求类型

                    responseType: 'blob',　　　　　　　　　　　　　　　　　　　　　　// 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream

                    url: url,


                })

                    .then( res =>{

                        //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型

                        let blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});

                        let downloadElement = document.createElement('a');

                        let href = window.URL.createObjectURL(blob);

                        downloadElement.href = href;

                        downloadElement.download = '名片信息.xls';　　　　　　　　　　// xxx.xls/xxx.xlsx

                        document.body.appendChild(downloadElement);

                        downloadElement.click();

                        document.body.removeChild(downloadElement);

                        window.URL.revokeObjectURL(href);

                    })

                    .catch( err => {
                        this.$message.error('服务器连接错误！');
                    });
            },
            //导出选中的名片 为 excel
            exportSelected(){
                //如果没有选择则提示
                if (this.multipleSelection.length == 0){
                    this.$notify({
                        title: '提示',
                        message: "请选择名片信息",
                        duration: 2000,
                        type: 'warning'
                    });
                    return;
                }
                let url = this.$http.defaults.baseURL+"/card/exportSelected";
                let data  =  this.multipleSelection;
                this.$http({

                    method: 'post',

                    header: {'Content-Type': 'application/xls'},　　　　　　　　　　　　// http请求类型

                    responseType: 'blob',　　　　　　　　　　　　　　　　　　　　　　// 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream

                    url: url,

                    data: data

                })

                    .then( res =>{

                        //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型

                        let blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});

                        let downloadElement = document.createElement('a');

                        let href = window.URL.createObjectURL(blob);

                        downloadElement.href = href;

                        downloadElement.download = '名片信息.xls';　　　　　　　　　　// xxx.xls/xxx.xlsx

                        document.body.appendChild(downloadElement);

                        downloadElement.click();

                        document.body.removeChild(downloadElement);

                        window.URL.revokeObjectURL(href);

                    })

                    .catch( err => {
                        this.$message.error('服务器连接错误！');
                    });

            },

            // 删除选中的条数
            deleteCard(){
                //如果没有选择则提示
                if (this.multipleSelection.length == 0){
                    this.$notify({
                        title: '提示',
                        message: "请选择名片信息",
                        duration: 2000,
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post("card/remove",this.multipleSelection).then(res => {
                        this.$notify({
                            title: '成功',
                            message: "已删除",
                            duration: 2000,
                            type: 'success'
                        });
                        this.onSearch();
                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },
            //选中的条数
            handleSelectionChange(val) {
                this.multipleSelection = val;
                let ids = [];
                for(let i in val){
                    ids.push(val[i].id);
                }
                this.multipleSelection = ids;
            },
            //上传
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handlePreview(file) {
                console.log(file);
            },

            handleClose(tag) {
                this.formEdit.content.splice(this.formEdit.content.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.formEdit.content.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            stringToDate(dateStr,separator){
                if(!separator){
                    separator="-";
                }
                var dateArr = dateStr.split(separator);
                var year = parseInt(dateArr[0]);
                var month;
                //处理月份为04这样的情况
                if(dateArr[1].indexOf("0") == 0){
                    month = parseInt(dateArr[1].substring(1));
                }else{
                    month = parseInt(dateArr[1]);
                }
                var day = parseInt(dateArr[2]);
                var date = new Date(year,month -1,day);
                return date;
            },
            onSearch() {
                //查询
                this.loading = true;

                if (this.formSearch.createDate) {
                    this.formSearch.startdate = this.formSearch.createDate[0];
                    this.formSearch.enddate =this.formSearch.createDate[1];
                }

                var param = Object.assign({}, this.formSearch, this.pageInfo);
                console.log(param);
                this.$http
                    .get("/card/queryList",{
                        params: {
                            name: param.name,
                            phone:param.phone,
                            startDate:param.startdate,
                            endDate:param.enddate,
                            currentPage:param.currentPage,
                            pageSize:param.pageSize,
                            pageTotal:param.pageTotal
                        }
                    })
                    .then(response => {
                        var json = response.data;
                        this.tableList = json.items;
                        this.pageInfo.pageTotal = json.total;
                    })
                    .catch(error => {
                        this.$message({ message: "执行异常,请重试", type: "error" });
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            onAdd() {
                if (this.editDialogParam.title == "新增") {
                    this._save();
                }
                else if(this.editDialogParam.title == "编辑"){
                    this._edit();
                }
            },
            //新增
            _save() {
                this.$refs["formEdit"].validate(valid => {
                    if (valid) {
                        var param = Object.assign({}, this.formEdit);

                        this.$http
                            .post("/card/add", param)
                            .then(response => {
                                this.$message({ message: "执行成功", type: "success" });
                                this.onSearch();
                                this.editDialogParam.show = false;
                            })
                            .catch(error => {
                                this.$message({ message: "执行异常,请重试", type: "error" });
                            })
                            .finally(() => {});
                    }
                });
            },
            _edit() {
                  this.$http
                  .post("card/updateCard",this.formEdit )
                  .then(response => {
                      this.$message({ message: "保存成功", type: "success" });
                      this.onSearch();
                      this.editDialogParam.show = false;
                  })
                  .catch(error => {
                      this.$message({ message: "操作异常,请重试", type: "error" });
                  })
            },
            onShowAdd() {
                this.editDialogParam.title = "新增";//设置标题

                this.editDialogParam.show = true;//显示弹框
                this.editDialogParam.formEditDisabled=false;//设置可编辑

                let curData={
                    id: null,     // 参数模板id
                    title: "", //模板名称
                    componentId: "", //模板绑定的组件id
                    content:['例 高度：20（mm）'],       //参数列表
                    createTime: "",   //创建时间
                    updateTime: "",   //修改时间
                };
                this.formEdit=Object.assign({},curData);

            },
            onShowEdit(rowData) {
                this.editDialogParam.title = "编辑";
                this.editDialogParam.show = true;
                //this.editDialogParam.formEditDisabled=false;
                let data =  JSON.parse(JSON.stringify(rowData));
                //目前仅显示基本信息，不显示图片，和视频【暂时只能编辑基本信息】
                this.formEdit= data;
                this.formEdit.headImage="",   //头像url
                this.formEdit.wxCode="",       //微信二维码
                this.formEdit.image=null,        //图片列表
                this.formEdit.video=null       //视频url

            },
            onShowDetail(rowData) {
                this.editDialogParam.title = "查看";
                this.editDialogParam.show = true;
                //this.editDialogParam.formEditDisabled=true;   是否可编辑
                let data =  JSON.parse(JSON.stringify(rowData));
                this.formEdit= data;
                this.formEdit.image = JSON.parse(data.image);

            },
            onReset() {
                //重置
                this.$refs["formSearch"].resetFields();
            },
            format_type(row, column) {
                //类别转换
                var type = row[column.property];

            },

            format_date(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            handleSizeChange(val) {
                this.pageInfo.pageSize = val;
                this.onSearch();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageInfo.currentPage = val;
                this.onSearch();
            },
            handleDialogClose() {
                this.$refs["formEdit"].resetFields();
                this.formEdit.video = null;
            }
        }
    };
</script>

