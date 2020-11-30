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
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="mettingTitle">
              <span>会议扫码签到</span>
            </div>
            <div>
              <img width="100%" height="100%" id="QRCode" :src=getQRCodeURL />
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
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
        myChart2:{},
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
            text: '读书会签到',
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
            data: [0, 0, 0, 0],
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
      async getCheck() {
        const { data: res } = await this.$http.get("check/getAllCheck/" + this.id);
        if (res.code !== 200) {
          return this.$message.error("获取列表失败");
        } else {
          this.checkData = res.data;
          for(let i=0; i<this.groupData.length; i++){
            this.UserData = this.checkData.filter( function (value){
              return value.groupid == this.groupData[i].id ? true :false
            })
          }

          this.checkData.filter()
        }
      },
      // 定时刷新数据
      refreshData() {
        let _this = this;
        setInterval(function() {
          _this.getCheck();
          debugger
          _this.$set(_this.groupCount,0,_this.groupCount[0]+1);
          _this.myChart2.setOption({
            xAxis: {
              type: 'category',
              data: _this.groupArray,
            },
            yAxis: {
              type: 'value',
              name:'人',
            },
            series: [{
              data: _this.groupCount,
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
        }, 5000);
      },
    },
    created(){
      this.getGroup();
    },
    mounted(){
      this.draw();
      this.refreshData();

    }
  }
</script>

<style scoped>
  .mettingTitle{
    text-align: center;
    font-weight: bold;
  }
</style>