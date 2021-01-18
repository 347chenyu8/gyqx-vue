<template>
  <div id="LoginLogs">
    <!-- 面包导航 -->
    <el-breadcrumb separator="/" style="padding-left:10px;padding-bottom:10px;font-size:12px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>读书会管理</el-breadcrumb-item>
      <el-breadcrumb-item>分组管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右侧卡片区域 -->
    <!-- 用户列表卡片区 -->
    <el-card class="box-card">
      <el-form size="mini" :inline="true" :model="queryMap" class="demo-form-inline">
        <el-form-item>
          <el-button  icon="el-icon-plus" @click="addDialogVisible=true" type="primary">创建分组</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table
                border
                stripe
                size="mini"
                :data="groupData"
                style="width: 100%;"
                height="460"
                @selection-change="selsChange"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="id" type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="分组名称" width="150"></el-table-column>
          <el-table-column prop="remake" label="分组简介" width="190"></el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="250"></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button
                      size="mini"
                      icon="el-icon-s-tools"
                      type="warning"
                      @click="showGroupUsers(scope.row.id)"
              >编辑人员</el-button>
              <el-button
                      size="mini"
                      icon="el-icon-edit"
                      type="primary"
                      @click="update(scope.row.id)"
              >编辑</el-button>
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
    <el-dialog title="添加分组" @close="closeDialog" :visible.sync="addDialogVisible" width="50%;">
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
                  <el-form-item label="名称：" prop="title">
                    <el-input size="medium"  style="width: 100%;"  v-model="addForm.name" @change="changInput" ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div >
                  <el-form-item label="简介：" prop="title">
                    <el-input type="textarea" size="medium"  :rows="4" style="width: 100%;" @change="changInput" v-model="addForm.remake" ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </span>

      <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button
                  type="primary"
                  @click="addGroup"
                  :loading="btnLoading"
                  :disabled="btnDisabled"
          >确 定</el-button>
        </span>
    </el-dialog>
    <!--修改分组表单-->
    <el-dialog title="编辑分组" @close="editDialog" :visible.sync="editDialogVisible" width="50%;">
      <!-- 表单 -->
      <span>
          <el-form
                  :model="editForm"
                  label-position="right"
                  :rules="addFormRules"
                  ref="addFormRef"
                  label-width="100px"
          >
            <el-row>
              <el-col :span="20">
                <div >
                  <el-form-item label="名称：" prop="title">
                    <el-input size="medium"  style="width: 100%;"  v-model="editForm.name"  ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div >
                  <el-form-item label="简介：" prop="title">
                    <el-input type="textarea" size="medium"  :rows="4" style="width: 100%;"  v-model="editForm.remake" ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </span>

      <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button
                  type="primary"
                  @click="editGroup"
                  :loading="btnLoading"
                  :disabled="btnDisabled"
          >确 定</el-button>
        </span>
    </el-dialog>

    <!-- 分配人员对话框 -->
    <el-dialog center title="分配人员" :visible.sync="assignDialogVisible" width="49%">
        <span>
          <template>
            <el-transfer
                    filterable
                    :titles="['未拥有','已拥有']"
                    :button-texts="['到左边', '到右边']"
                    v-model="uservalue"
                    :data="userList"
            ></el-transfer>
          </template>
        </span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="assignDialogVisible = false" class="el-icon-close">取消分配</el-button>
          <el-button
                  v-hasPermission="'user:assign'"
                  type="primary"
                  @click="doAssignUsers"
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
      return {
        sels: [], //选中的值显示
        groupData: [],
        total: 0, //总共多少条数据
        queryMap: { pageNum: 1, pageSize: 10, name: "" }, //查询对象，
        addDialogVisible:false,
        editDialogVisible:false,
        assignDialogVisible:false,
        btnLoading: false,
        btnDisabled: false,
        userList:[],
        uid:'',
        uservalue: [], //用户拥有的角色
        addForm: {
          name: "",
          remake: "",
        },
        editForm:{
          name: "",
          remake: "",
        },
        addFormRules: {
          name: [
            { required: true, message: "请输分组名称", trigger: "blur" },
            { min: 3, max: 30, message: "长度在 3 到 30 个字符", trigger: "blur" }
          ],
        },

      };
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
        const { data: res } = await this.$http.get("mettingGroup/findGroupList", {
          params: this.queryMap
        });
        if (res.code !== 200) {
          return this.$message.error("获取列表失败");
        } else {
          this.total = res.data.total;
          this.groupData = res.data.rows;
        }
      },
      /**
       * 关闭添加弹出框
       */
      closeDialog() {
        this.$refs.addFormRef.clearValidate();
        this.addForm = {};
      },
      /**
       * 关闭便捷弹出框
       */
      editDialog(){
        this.$refs.editFormRef.clearValidate();
        this.editForm = {};
      },
      /**
       * 增加分组
       */
      addGroup(){
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) {
            return;
          } else {
            this.btnLoading = true;
            this.btnDisabled = true;
            const { data: res } = await this.$http.post("mettingGroup/add", this.addForm);
            if (res.code == 200) {
              this.$notify.success({
                title:'操作成功',
                message:'增加分组成功',
              });
              this.addForm = {};
            } else {
              return this.$message.error("增加分组失败:" + res.msg);
            }
            this.addDialogVisible = false;
            this.btnLoading = false;
            this.btnDisabled = false;
            this.getGroupList();
          }
        });
      },

      /**
       * 编辑分组
       */
      editGroup(){
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) {
            return;
          } else {
            this.btnLoading = true;
            this.btnDisabled = true;
            const { data: res } = await this.$http.post("mettingGroup/add", this.editForm);
            if (res.code == 200) {
              this.$notify.success({
                title:'操作成功',
                message:'编辑分组成功',
              });
              this.edit = {};
            } else {
              return this.$message.error("编辑分组失败:" + res.msg);
            }
            this.editDialogVisible = false;
            this.btnLoading = false;
            this.btnDisabled = false;
            this.getGroupList();
          }
        });
      },

      /**
       * 修改分组
       */
      async update(id){
        const { data: res } = await this.$http.get("mettingGroup/edit/" + id);
        if (res.code == 200) {
          this.editForm = res.data;
          this.editDialogVisible = true;
        } else {
          return this.$message.error("编辑分组失败:" + res.msg);
        }
      },
      /**
       * 删除分组
       */
      async delMetting(id) {
        var res = await this.$confirm(
            "此操作将永久删除该分组, 是否继续?",
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
          const { data: res } = await this.$http.post("mettingGroup/delete/"+id);
          console.log(res);
          if (res.code == 200) {
            this.$notify.success({
              title:'操作成功',
              message:'分组删除成功',
            });
            this.getGroupList();
          } else {
            this.$message.error(res.msg);
          }
        }
      },
      //弹出人员编辑页面
      async showGroupUsers(id){
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        const { data: res } = await  this.$http.get("mettingGroup/" + id + "/users");
        if (res.code == 200) {
          debugger
          this.userList = res.data.users;
          this.uservalue = res.data.values;
          this.uid = id;

          setTimeout(() => {
            loading.close();
            this.assignDialogVisible = true;
          }, 400);
        }
      },
      changInput(){
        this.$forceUpdate();
      },

      async doAssignUsers(){
        this.assignDialogVisible = true;
        this.btnLoading = true;
        this.btnDisabled = true;
        const { data: res } = await this.$http.post(
            "mettingGroup/" + this.uid + "/assignUsers",
            this.uservalue
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
      }
    },
    created() {
      this.getGroupList();
    }

  }
</script>

<style scoped>

</style>