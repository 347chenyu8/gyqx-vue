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
          <el-button  icon="el-icon-plus" @click="search" type="primary">创建会议</el-button>
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
          <el-table-column prop="id" type="index" label="ID" width="50"></el-table-column>
          <el-table-column prop="title" label="会议主题" width="150"></el-table-column>
          <el-table-column prop="begin_time" label="会议开始时间" width="190"></el-table-column>
          <el-table-column prop="end_time" label="会议结束时间" width="250"></el-table-column>
          <el-table-column label="操作" width="100px;">
            <template slot-scope="scope">
              <el-button
                      v-hasPermission="'loginLog:delete'"
                      type="text"
                      size="mini"
                      icon="el-icon-delete"
                      @click="del(scope.row.id)"
              >编辑</el-button>
              <el-button
                      v-hasPermission="'loginLog:delete'"
                      type="text"
                      size="mini"
                      icon="el-icon-delete"
                      @click="del(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "metting",
    data() {
      return {
        sels: [], //选中的值显示
        mettingData: [],
        total: 0, //总共多少条数据
        queryMap: { pageNum: 1, pageSize: 10, location: "" } //查询对象
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
        this.getLoginLogList();
      },
      //翻页
      handleCurrentChange(current) {
        this.queryMap.pageNum = current;
        this.getLoginLogList();
      },
      //加载会议列表
      async getLoginLogList() {
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
    },
    created() {
      this.getLoginLogList();
    }

  }
</script>

<style scoped>

</style>