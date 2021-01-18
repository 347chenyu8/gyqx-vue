<template>
  <div>
    <!-- 面包导航 -->
    <el-breadcrumb separator="/" style="padding-left:10px;padding-bottom:10px;font-size:12px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销售代表</el-breadcrumb-item>
      <el-breadcrumb-item>数据导入</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="queryMap" class="demo-form-inline">
      <el-row :gutter="20" class="cardRow">
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>JDE-国药器械（海南）有限公司</span>
            </div>
            <div class="card-centent-div">
              <el-form-item>
                <!--<el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>-->
                <el-button type="primary" @click="uploadClick(0)">
                  上传JDE采购数据
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="uploadClick(1)">
                  上传JDE销售数据
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-form-item>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>千方百剂--达沃斯</span>
            </div>
            <div class="card-centent-div">
              <el-form-item>
                <el-button type="primary" @click="uploadClick(2)">
                  上传达沃斯采购数据
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="uploadClick(3)">
                  上传达沃斯销售数据
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-form-item>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="cardRow">
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>千方百剂--维健</span>
            </div>
            <div class="card-centent-div">
              <el-form-item>
                <el-button type="primary" @click="uploadClick(4)">
                  上传维健采购数据
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="uploadClick(5)">
                  上传维健销售数据
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-form-item>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>千方百剂--思高</span>
            </div>
            <div class="card-centent-div">
              <el-form-item>
                <el-button type="primary" @click="uploadClick(6)">
                  上传思高采购数据
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="uploadClick(7)">
                  上传思高销售数据
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-form-item>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="cardRow">
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>千方百剂--智合健</span>
            </div>
            <div class="card-centent-div">
              <el-form-item>
                <el-button type="primary" @click="uploadClick(8)">
                  上传智合健采购数据
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="uploadClick(9)">
                  上传智合健销售数据
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-form-item>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-form>
    <!--上传弹出框-->
    <el-dialog title="上传Excel" @close="closeUpload" :visible.sync="centerDialogVisible" width="38%" center>
        <span>
          <el-upload
                  :auto-upload="false"
                  :multiple="false"
                  ref="upload"
                  :limit="1"
                  class="upload-demo"
                  drag
                  :headers="headerObject"
                  :data="inputData"
                  :on-success="handleUploadSuccess"
                  :action="uploadUrl"
                  :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传.xls/.xlsx文件</div>
          </el-upload>
        </span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="closeUpload" size="small">取消返回</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "dataInput",
    data() {
      return {
        centerDialogVisible: false,
        uploadUrl: '',
        headerObject: {
          Authorization: window.localStorage.getItem("JWT_TOKEN")
        }, //图片上传请求头
        inputData: {},
        queryMap: {},

      }
    },
    methods: {
      closeUpload() {
        this.centerDialogVisible = false;
        this.$refs.upload.clearFiles();
      },

      beforeAvatarUpload(file) {
        let lastSite = file.name.lastIndexOf('.');
        let Xls = file.name.substring(lastSite + 1, file.name.length);
        if (Xls === 'xls' || Xls === 'xlsx') {
          return file
        } else {
          this.$message.error('上传文件只能是 xls/xlsx 格式!')
          return false
        }
      },
      /**
       * 上传之后的回调
       */
      handleUploadSuccess: function (response, file, fileList) {
        if (200 !== response.code) {
          this.$refs.upload.clearFiles();
          this.$message.error("上传失败:" + response.msg);
          this.centerDialogVisible = false;
          return
        } else {
          this.$message.success("上传成功");
          this.centerDialogVisible = false;
          return
        }
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      uploadClick(type) {

        if (type === 0) {
          this.uploadUrl = this.$http.defaults.baseURL + 'upload/jdeInput/';
        } else if (type === 1) {
          this.uploadUrl = this.$http.defaults.baseURL + 'upload/jdeOutput/';
        } else if (type === 2) {
          this.uploadUrl = this.$http.defaults.baseURL + 'upload/dwsInput/';
        } else if (type === 3) {
          this.uploadUrl = this.$http.defaults.baseURL + 'upload/dwsOutput/';
        } else if (type === 4) {
          this.uploadUrl = this.$http.defaults.baseURL + 'upload/wjInput/';
        } else if (type === 5) {
          this.uploadUrl = this.$http.defaults.baseURL + 'upload/wjOutput/';
        }else if (type === 6) {
          this.uploadUrl = this.$http.defaults.baseURL + 'upload/sgInput/';
        }else if (type === 7) {
          this.uploadUrl = this.$http.defaults.baseURL + 'upload/sgOutput/';
        }else if (type === 8) {
          this.uploadUrl = this.$http.defaults.baseURL + 'upload/zhjInput/';
        }else if (type === 9) {
          this.uploadUrl = this.$http.defaults.baseURL + 'upload/zhjOutput/';
        }
        this.centerDialogVisible = true
      }
    }
  }
</script>

<style scoped>
.cardRow{
  margin-top: 20px;
}
  .card-centent-div{
    text-align: center;
  }
</style>