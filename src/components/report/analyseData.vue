<template>
  <div class="container">
    <div class="header">
      <el-card>
        <div>
          <el-button type="primary" @click="doAnalyseData()">数据溯源</el-button>
        </div>

      </el-card>
    </div>
    <div class="main">
      <el-card>
        <div>
          结果：本次溯源数据{{this.ResuletData.count}}条，时间从{{ResuletData.beginTime}} 至 {{ResuletData.endTime}}，成功{{ResuletData.successCount}}条，失败{{ResuletData.failedCount}}条；
        </div>
        <div class="resultTable">
          <el-tabs type="border-card">
            <el-tab-pane label="失败数据">
              <el-table
                      :data="failedData"
                      border
                      stripe
                      :header-cell-style="{'text-align':'center','background-color':'dodgerblue','color': 'white'}"
                      style="width: 100%">
                <el-table-column
                        prop="system"
                        label="销售系统"
                        :formatter="formatSystem"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="inputtime"
                        label="销售日期"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="goodsname"
                        label="商品名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="goodsmodle"
                        label="商品规格"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="suppliername"
                        label="采购企业"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="count"
                        label="销售数量"
                        align="center"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="销售单价"
                        align="center"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="sum"
                        label="销售总价"
                        align="center"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="origprice"
                        label="溯源单价成本"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="origcost"
                        label="溯源成本金额"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="result"
                        label="失败原因"
                        width="180">
                </el-table-column>
              </el-table>
              <el-pagination
                      background
                      layout="prev, pager, next"
                      @size-change="handleSizeChangeFailed"
                      @current-change="handleCurrentChangeFailed"
                      :total="this.failedTotle"
                      :page-count="failedPageCount"
                      :page-size="pageSize"
              >
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="成功数据">
              <el-table
                      :data="succesData"
                      border
                      stripe
                      :header-cell-style="{'text-align':'center','background-color':'dodgerblue','color': 'white'}"
                      style="width: 100%">
                <el-table-column
                        prop="system"
                        label="销售系统"
                        :formatter="formatSystem"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="inputtime"
                        label="销售日期"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="goodsname"
                        label="商品名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="goodsmodle"
                        label="商品规格"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="suppliername"
                        label="采购企业"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="count"
                        label="销售数量"
                        align="center"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="销售单价"
                        align="center"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="sum"
                        label="销售总价"
                        align="center"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="origprice"
                        label="溯源单价成本"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="origcost"
                        label="溯源成本金额"
                        align="center"
                        width="120">
                </el-table-column>
              </el-table>
              <el-pagination
                      background
                      layout="prev, pager, next"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :total="this.succesTotle"
                      :page-count="succesPageCount"
                      :page-size="pageSize"
                      >
              </el-pagination>
            </el-tab-pane>
          </el-tabs>

        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "analyseData",
    data(){
      return{
        tableData : null,
        ResuletData: {
          count:0,
          beginTime:null,
          endTime:null,
          successCount:0,
          failedCount:0,
          succesData:[],
          failedData:[],
        },
        pageSize:10,
        succesData:[],
        failedData:[],
        failedPageCount:1,
        succesPageCount:1,
        succesTotle:0,
        failedTotle:0,
      }
    },
    methods:{
      async doAnalyseData() {
        const { data: res } = await this.$http.post("report/analyseData");
        if (res.code !== 200) {
          this.$message.error("数据处理失败");
          return;
        } else {
          debugger
          this.ResuletData = res.data;
          this.succesData = this.ResuletData.succesData.slice(0,this.pageSize);
          this.failedData = this.ResuletData.failedData.slice(0,this.pageSize);
          if(this.ResuletData.succesData == null){
            this.succesTotle = 0;
          }else{
            this.succesTotle =  this.ResuletData.succesData.length;
            this.succesPageCount = this.succesData.length%this.pageSize ==0?this.succesData.length/this.pageSize: (this.succesData.length/this.pageSize)+1;
          }
          if(this.ResuletData.failedData == null){
            this.failedTotle = 0;
          }else{
            this.failedTotle =  this.ResuletData.failedData.length;
            this.failedPageCount = this.failedData.length%this.pageSize ==0?this.failedData.length/this.pageSize: (this.failedData.length/this.pageSize)+1;
          }
          this.$message.success("数据处理成功");

          return ;
        }
      },
      formatSystem(row, column){
        if (row.system === '0') {
          return '国药器械'
        } else if(row.system === '1')  {
          return '达沃斯'
        }else if(row.system === '2'){
          return '智合健'
        }
      },
      //改变页码
      handleSizeChange(newSize) {
        console.log(newSize);
        this.succesData = this.ResuletData.succesData.slice(((newSize-1) * this.pageSize),(newSize * this.pageSize));
        this.$set(this.succesData,"age", 30)
      },
      //翻页
      handleCurrentChange(newSize) {
        this.succesData = [];
        let arraydata = this.ResuletData.succesData.slice(((newSize-1) * this.pageSize),(newSize * this.pageSize));
        this.succesData = this.succesData.concat(arraydata);
      },
      //改变页码
      handleSizeChangeFailed(newSize) {
        this.failedData = [];
        this.failedData = this.ResuletData.failedData.slice(((newSize-1) * this.pageSize),(newSize * this.pageSize));
        this.$set(this.failedData,"age", 30)
      },
      //翻页
      handleCurrentChangeFailed(newSize) {
        this.failedData = [];
        let arraydata = this.ResuletData.failedData.slice(((newSize-1) * this.pageSize),(newSize * this.pageSize));
        this.failedData = this.failedData.concat(arraydata);
      },
    }
  }
</script>

<style scoped>
  .container{
    display: flex;
    flex-direction:column;
  }
  .header{
    width: 100%;
  }
  .main{
    width: 100%;
    margin-top: 0.6rem;
  }
  .resultTable{
    margin-top: 0.8rem;
  }

</style>