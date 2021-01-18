<template>
  <div >
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="mettingTitle">
              <span>{{title}}</span>
            </div>
            <div>
              <div id="checkReport" style="width: 100%;height:300px;"></div>
              <template>
                <el-table
                        border
                        stripe
                        fit
                        size="mini"
                        height="250"
                        :data=checkData
                        style="width: 100%;"
                        :header-cell-style="{background:'#409EFF',color:'#FFFFFF',textAlign: 'center'}"
                        :cell-style="{textAlign: 'center'}"
                >
                  <el-table-column prop="id" type="index" label="序号" ></el-table-column>
                  <el-table-column prop="name" label="姓名" ></el-table-column>
                  <el-table-column prop="checkTime" label="签到时间" ></el-table-column>
                  <el-table-column prop="gname" label="分组名称" ></el-table-column>
                </el-table>
              </template>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple" >
          <el-card class="box-card">
            <div slot="header" class="mettingTitle">
              <span>会议扫码签到</span>
            </div>
            <div>
              <img width="100%" height="250px;" id="QRCode" :src=getQRCodeURL />
            </div>
          </el-card>
        </div>
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="mettingTitle">
              <el-form
                      :model="drawForm"
                      status-icon
                      label-position="left"
                      label-width="0px"
                      class="check-page"
              >
                <el-form-item prop="groupid">
                  <el-select v-model="drawForm.groupid" filterable placeholder="请选择" >
                    <el-option label="所有人" value="0" key="0">
                    </el-option>
                    <el-option
                            v-for="item in groupData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <el-button type="success" class="romdonButton" @click="romdonClick">抽签</el-button>
            </div>
          </el-card>
          <!--<el-card class="box-card">-->
            <!--<div class="score" style="width: 100%;height:300px;">-->
              <!--<template>-->
                <!--<el-table-->
                        <!--border-->
                        <!--stripe-->
                        <!--fit-->
                        <!--size="mini"-->
                        <!--height="100"-->
                        <!--:data="scoreData"-->
                        <!--style="width: 100%;"-->
                        <!--:header-cell-style="{background:'#409EFF',color:'#FFFFFF',textAlign: 'center'}"-->
                        <!--:cell-style="{textAlign: 'center'}"-->
                <!--&gt;-->
                  <!--<el-table-column prop="gname" label="分组名称" ></el-table-column>-->
                  <!--<el-table-column prop="totle" label="总分" ></el-table-column>-->
                  <!--<el-table-column prop="turns1" label="第一轮" ></el-table-column>-->
                  <!--<el-table-column prop="turns2" label="第二轮" ></el-table-column>-->
                  <!--<el-table-column prop="turns3" label="第三轮" ></el-table-column>-->
                  <!--<el-table-column prop="turns4" label="第四轮" ></el-table-column>-->
                  <!--<el-table-column prop="turns5" label="第五轮" ></el-table-column>-->
                <!--</el-table>-->
              <!--</template>-->
            <!--</div>-->
          <!--</el-card>-->
        </div>
      </el-col>
    </el-row>
    <el-dialog title="抽签" @close="closeRandomDialog" :visible.sync="randomDialogVisible" width="50%;"
               center>
      <!-- 表单 -->
      <div style="text-align: center;width: 100%">
        <span style="text-align: center;font-size: 40px">
          <el-button type="danger" style="width: 100%;height: 100px;font-size: 40px;">{{randomName}}</el-button>
        </span>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="beginRamdon" round>{{this.beginRamdonFlag==true?"开始":"停止"}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import echarts from "echarts";

  export default {
    name: "joinMetting",
    data(){
      return{
        id:this.$route.query.metting.id,
        title:this.$route.query.metting.title,
        getQRCodeURL:this.$http.defaults.baseURL+'/metting/getQRCode/'+this.$route.query.metting.id,
        groupData:[],
        groupArray:[],
        groupCount:[0,0,0,0],
        checkData:[],
        randomData:[],
        myChart2:{},
        drawForm:{
          groupid:"",
        },
        randomDialogVisible:false,
        beginIntervalId:'',
        endIntervalId:'',
        randomName:'谁是下一个幸运儿',
        refreshID:'',
        scoreData:[],
        beginRamdonFlag:true,
      }
    },
    methods:{
      draw() {
        this.myChart2 = echarts.init(document.getElementById("checkReport"));
        // 指定图表的配置项和数据
        var option2 = {
          title: {
            //left的值为'left', 'center', 'right'
            left: 'center',
            //默认为10
            //2.主副标题之间的间距
            itemGap: 20,
            text: '读书会签到('+this.checkData.length+'人)',
            textStyle: {
              //文字颜色
              color: '#ccc',
              //字体风格,'normal','italic','oblique'
              fontStyle: 'normal',
              //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
              fontWeight: 'bold',
              //字体系列
              fontFamily: 'sans-serif',
              //字体大小
              fontSize: 18
            },
          },
          tooltip: {
            show: true
          },
          xAxis: {
            type: 'category',
            data: this.groupArray,
          },
          yAxis: {
            type: 'value',
            name:'人',
          },
          series: [{
            data: this.groupCount,
            type: 'bar',
            name: "人数",
            barWidth:80,
            itemStyle: {
              normal: {
                color: function(params) {
                  // build a color map as your need.
                  var colorList = [
                    '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                    '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                    '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                  ];
                  return colorList[params.dataIndex]
                },
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: 'blue',
                    fontSize: 16
                  }
                }
              }
            },
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.myChart2.setOption(option2);
       },
      async getGroup() {
        const { data: res } = await this.$http.get("mettingGroup/getAllGroup");
        if (res.code !== 200) {
          return this.$message.error("获取列表失败");
        } else {
          this.groupData = res.data;
          this.groupData.forEach((item,index,array)=>{
            this.$set(this.groupArray,index,item.name);
          });
        }
      },
      async getCheck(_this) {
          const { data: res } = await _this.$http.get("check/getAllCheck/" + _this.id);
        if (res.code !== 200) {
          return _this.$message.error("获取列表失败");
        } else {
          _this.checkData = res.data;
          for(let i=0; i< _this.groupData.length; i++){
            _this.groupCount[i] = _this.checkData.filter( function (value){
              return value.groupid == _this.groupData[i].id ? true :false
            }).length;
            this.refreshDraw();
          }
        }
      },
      async getAllScore() {
        let _this = this;
        const { data: res } = await _this.$http.get("score/getAllScore/" + _this.id);
        if (res.code !== 200) {
          return _this.$message.error("获取分数失败");
        } else {
          _this.scoreData = res.data;
        }
      },
      refreshDraw(){
        this.myChart2.setOption({
          title:{
            text: '签到('+this.checkData.length+'人)',
          },
          xAxis: {
            type: 'category',
            data: this.groupArray,
          },
          yAxis: {
            type: 'value',
            name:'人',
          },
          series: [{
            data: this.groupCount,
            type: 'bar',
            name: "人数",
            barWidth:80,
            itemStyle: {
              normal: {
                color: function(params) {
                  // build a color map as your need.
                  var colorList = [
                    '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                    '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                    '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                  ];
                  return colorList[params.dataIndex]
                },
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: 'blue',
                    fontSize: 16
                  }
                }
              }
            },
          }]
        })
      },
      // 定时刷新数据
      refreshData() {
        let _this = this;
        this.refreshID = setInterval(function() {
          _this.getCheck(_this);
        }, 3000);
      },

      romdonClick(){
        if(this.drawForm.groupid == "" || this.drawForm.groupid == "0"){
          this.randomData = this.checkData;
        }else{
          let _this = this
          var romdomData = this.checkData.filter( function (value){
            return value.groupid == _this.drawForm.groupid  ? true :false
          });
          this.randomData = romdomData;
        }
        this.randomDialogVisible = true;
      },
      beginRamdon(){
        let Data = this.randomData;
        let index = this.getRandomInt(0,this.randomData.length-1);
        if(this.beginRamdonFlag == true){
          this.beginIntervalId = setInterval(() => {
            let index = this.getRandomInt(0,Data.length-1);
            this.randomName = Data[index].name;
          }, 100);
          this.beginRamdonFlag = false;
        }else{
          clearInterval(this.beginIntervalId);
          this.beginRamdonFlag = true;
        }
      },
      getRandomInt (min, max) {
        return parseInt(Math.random()*(max-min+1)+min,10);
     },
      closeRandomDialog(){
        this.randomName='';
      },
    },
    created(){
      this.getGroup();
      // this.getAllScore();

    },
    mounted(){
      this.draw();
      this.getCheck(this);
      this.refreshData();
    },
    beforeDestroy(){
      clearInterval(this.refreshID)
    },
  }
</script>

<style scoped>
  .mettingTitle{
    text-align: center;
    font-weight: bold;
  }
  .romdonButton{
    width: 100%;
    height: 40px;
    margin: 0px  0px 15px 0px;
  }
</style>