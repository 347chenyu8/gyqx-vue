<template>
  <div id="LoginLogs">
    <!-- 面包导航 -->
    <el-breadcrumb separator="/" style="padding-left:10px;padding-bottom:10px;font-size:12px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>读书会管理</el-breadcrumb-item>
      <el-breadcrumb-item>会议管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右侧卡片区域 -->
    <!-- 用户列表卡片区 -->
    <el-card class="box-card">
      <el-form size="mini" :inline="true" :model="queryMap" class="demo-form-inline">
        <el-form-item>
          <el-button  icon="el-icon-plus" @click="addDialogVisible=true" type="primary">创建会议</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table
                border
                stripe
                size="mini"
                :data="mettingData"
                style="width: 100%;"
                height="460"
                @selection-change="selsChange"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="id" type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="title" label="会议主题" width="250"></el-table-column>
          <el-table-column prop="beginTime" label="会议开始时间" width="150"></el-table-column>
          <el-table-column prop="endTime" label="会议结束时间" width="150"></el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="150"></el-table-column>
          <el-table-column label="操作" width="450">
            <template slot-scope="scope">
              <el-button
                      size="mini"
                      icon="el-icon-s-flag"
                      type="success"
                      @click="joinMetting(scope.row)"
              >进入会议</el-button>
              <el-button
                      size="mini"
                      icon="el-icon-edit"
                      type="primary"
                      @click="update(scope.row.id)"
              >编辑</el-button>
              <el-button
                      size="mini"
                      icon="el-icon-edit"
                      type="primary"
                      @click="showConstitutorUsers(scope.row.id)"
              >设置组织者</el-button>
              <el-button
                      size="mini"
                      icon="el-icon-delete"
                      type="danger"
                      @click="delMetting(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
                style="margin-top:10px;"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryMap.pageNo"
                :page-sizes="[6, 10, 20, 30]"
                :page-size="queryMap.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
        ></el-pagination>
      </template>
    </el-card>

    <!-- 添加对话框 -->
    <el-dialog title="添加会议" @close="closeDialog" :visible.sync="addDialogVisible" width="50%;">
      <!-- 表单 -->
      <span>
          <el-form
                  :model="addForm"
                  label-position="right"
                  :rules="addFormRules"
                  ref="addFormRef"
                  label-width="100px"
          >
            <el-row>
              <el-col :span="20">
                <div >
                  <el-form-item label="主题：" prop="title">
                    <el-input size="medium"  style="width: 100%;"  v-model="addForm.title" ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="beginTime" label="开始时间：">
                <el-date-picker
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择开始时间"
                        v-model="addForm.beginTime"
                        size="medium"
                        style="width: 100%;"
                >
                </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
             <el-row>
              <el-col :span="12">
                <el-form-item prop="endTime" label="结束时间：">
                <el-date-picker
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择结束时间"
                        v-model="addForm.endTime"
                        size="medium"
                        style="width: 100%;"
                >
                </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </span>

      <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button
                  type="primary"
                  @click="addMetting"
                  :loading="btnLoading"
                  :disabled="btnDisabled"
          >确 定</el-button>
        </span>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog title="编辑会议" @close="closeEditDialog" :visible.sync="editDialogVisible" width="50%;">
      <!-- 表单 -->
      <span>
          <el-form
                  :model="editForm"
                  label-position="right"
                  :rules="addFormRules"
                  ref="editFormRef"
                  label-width="100px"
          >
            <el-row>
              <el-col :span="20">
                <div >
                  <el-form-item label="主题：" prop="title">
                    <el-input size="medium"  style="width: 100%;"  v-model="editForm.title" ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="beginTime" label="开始时间：">
                <el-date-picker
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择开始时间"
                        v-model="editForm.beginTime"
                        size="medium"
                        style="width: 100%;"
                >
                </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
             <el-row>
              <el-col :span="12">
                <el-form-item prop="endTime" label="结束时间：">
                <el-date-picker
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择结束时间"
                        v-model="editForm.endTime"
                        size="medium"
                        style="width: 100%;"
                >
                </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </span>

      <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button
                  type="primary"
                  @click="editMetting"
                  :loading="btnLoading"
                  :disabled="btnDisabled"
          >确 定</el-button>
        </span>
    </el-dialog>
    <!--设置组织者-->
    <el-dialog center title="分配人员" :visible.sync="assignDialogVisible" width="49%">
        <span>
          <template>
            <el-transfer
                    filterable
                    :titles="['未拥有','已拥有']"
                    :button-texts="['到左边', '到右边']"
                    v-model="constitutorvalue"
                    :data="constitutorList"
            ></el-transfer>
          </template>
        </span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="assignDialogVisible = false" class="el-icon-close">取消分配</el-button>
          <el-button
                  v-hasPermission="'user:assign'"
                  type="primary"
                  @click="doConstitutorUsers"
                  class="el-icon-check"
                  :loading="btnLoading"
                  :disabled="btnDisabled"
          >确定分配</el-button>
        </span>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: "metting",
    data() {
      var checkBeginTime = (rule, value, callback) => {
        let begin = new Date(Date.parse(value.replace(/-/g,"/")));
        let currentTime = new Date();
        if (value === '') {
          callback(new Error('请填写会议开始时间'));
        } else if(currentTime > begin){
          callback(new Error('会议开始时间不能小于当前时间'));
        }else{
          callback();
        }
      };
      var checkEndTime = (rule, value, callback) => {
        let end = new Date(Date.parse(value.replace(/-/g,"/")));
        let begin = new Date(Date.parse(this.addForm.beginTime.replace(/-/g,"/")));
        console.log(begin+"===="+end);
        if (value === '') {
          callback(new Error('请填写会议开始时间'));
        } else if(begin > end){
          callback(new Error('会议结束时间不能小于开始时间'));
        }else{
          callback();
        }
      };

      return {
        sels: [], //选中的值显示
        mettingData: [],
        total: 0, //总共多少条数据
        queryMap: { pageNum: 1, pageSize: 10, title: "" }, //查询对象，
        addDialogVisible:false,
        editDialogVisible:false,
        btnLoading: false,
        changeMettingID:"",
        btnDisabled: false,
        assignDialogVisible:false,
        constitutorList:[],
        constitutorvalue:[],
        addForm: {
          title: "",
          beginTime: "",
          endTime:"",
        },
        editForm: {
          title: "",
          beginTime: "",
          endTime:"",
        },
        addFormRules: {
          title: [
            { required: true, message: "请输会议主题", trigger: "blur" },
            { min: 3, max: 30, message: "长度在 3 到 30 个字符", trigger: "blur" }
          ],
          beginTime: [{required: true, message: "请填写会议开始时间", trigger: "blur" },
            ],
          endTime: [{ required: true, message: "请填写会议开始时间", trigger: "blur" },
            {validator: checkEndTime, trigger: 'blur'}],
        },

      };
    },
    created(){
      this.getGroupList();
    },
    methods:{
      //列表选择
      selsChange(sels) {
        this.sels = sels;
      },
      //改变页码
      handleSizeChange(newSize) {
        this.queryMap.pageSize = newSize;
        this.getGroupList();
      },
      //翻页
      handleCurrentChange(current) {
        this.queryMap.pageNum = current;
        this.getGroupList();
      },
      //加载会议列表
      async getGroupList() {
        const { data: res } = await this.$http.get("metting/findMettingList", {
          params: this.queryMap
        });
        if (res.code !== 200) {
          return this.$message.error("获取列表失败");
        } else {
          this.total = res.data.total;
          this.mettingData = res.data.rows;
        }
      },
      /**
       * 关闭添加弹出框
       */
      closeDialog() {
        this.$refs.addFormRef.clearValidate();
        this.addForm = {};
      },
      closeEditDialog(){
        this.$refs.editFormRef.clearValidate();
        this.editForm= {};
      },
      /**
       * 增加会议
       */
      addMetting(){
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) {
            return;
          } else {
            this.btnLoading = true;
            this.btnDisabled = true;
            const { data: res } = await this.$http.post("metting/add", this.addForm);
            if (res.code == 200) {
              this.$notify.success({
                title:'操作成功',
                message:'增加会议成功',
              });
              this.addForm = {};
            } else {
              return this.$message.error("增加会议失败:" + res.msg);
            }
            this.addDialogVisible = false;
            this.btnLoading = false;
            this.btnDisabled = false;
            this.getGroupList();
          }
        });
      },
      /**
       * 修改会议
       */
      editMetting(){
        this.$refs.editFormRef.validate(async valid => {
          if (!valid) {
            return;
          } else {
            this.btnLoading = true;
            this.btnDisabled = true;
            const { data: res } = await this.$http.post("metting/add", this.editForm);
            if (res.code == 200) {
              this.$notify.success({
                title:'操作成功',
                message:'编辑会议成功',
              });
              this.editForm = {};
            } else {
              return this.$message.error("编辑会议失败:" + res.msg);
            }
            this.editDialogVisible = false;
            this.btnLoading = false;
            this.btnDisabled = false;
            this.getGroupList();
          }
        });
      },
      /**
       * 修改会议
       */
      async update(id){
        const { data: res } = await this.$http.get("metting/edit/" + id);
        if (res.code == 200) {
          debugger
          this.editForm = res.data;
          this.editDialogVisible = true;
        } else {
          return this.$message.error("编辑分组失败:" + res.msg);
        }
      },
      /**
       * 删除会议
       */
      async delMetting(id) {
        var res = await this.$confirm(
            "此操作将永久删除该会议, 是否继续?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
        ).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
        if (res == "confirm") {
          const { data: res } = await this.$http.post("metting/delete/"+id);
          console.log(res);
          if (res.code == 200) {
            this.$notify.success({
              title:'操作成功',
              message:'会议删除成功',
            });
            this.getGroupList();
          } else {
            this.$message.error(res.msg);
          }
        }
      },
      joinMetting(id){
        this.$router.push({
          path:"/metting/joinMetting",
          query:{metting:id}
        })
      },
      async doConstitutorUsers(){
        this.assignDialogVisible = true;
        this.btnLoading = true;
        this.btnDisabled = true;
        const { data: res } = await this.$http.post(
            "metting/" + this.changeMettingID + "/ConstitutorUsers",
            this.constitutorvalue
        );
        if (res.code == 200) {
          this.$notify.success({
            title:'操作成功',
            message:'分配成员成功',
          });
        } else {
          this.$message.error("分配成员成功:" + res.msg);
        }
        this.assignDialogVisible = false;
        this.btnLoading = false;
        this.btnDisabled = false;
      },

      //弹出组织者编辑页面
      async showConstitutorUsers(id){
        this.changeMettingID = id;
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        const { data: res } = await  this.$http.get("metting/" + id + "/constitutorUsers");
        if (res.code == 200) {
          this.constitutorList = res.data.users;
          this.constitutorvalue = res.data.values;
          this.uid = id;

          setTimeout(() => {
            loading.close();
            this.assignDialogVisible = true;
          }, 400);
        }
      },
    },
  }
</script>

<style scoped>

</style>