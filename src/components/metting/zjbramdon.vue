<template>
  <div>
    <div>
      <el-breadcrumb separator="/" style="padding-left:10px;padding-bottom:10px;font-size:12px;">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>读书会管理</el-breadcrumb-item>
        <el-breadcrumb-item>总经办抽签小程序</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-card class="box-card">
        <div class="rollCall">
          <div v-for="(item,i) in rollList" class="personItem" :class="itemStyle(i+1)">
            <div>
              {{item.name}}
            </div>
          </div>
        </div>
        <div class="opertionClass">
          <div class="setButton">
            <el-select v-model="choseCount" placeholder="请选择">
              <el-option key="20" label="每次20人" :value="20"></el-option>
              <el-option key="21" label="每次21人" :value="21"></el-option>
              <el-option key="10" label="每次10人" :value="10"></el-option>
              <el-option key="5" label="每次5人" :value="5"></el-option>
              <el-option key="2" label="每次2人" :value="2"></el-option>
              <el-option key="1" label="每次1人" :value="1"></el-option>
            </el-select>
          </div>
          <div class="clickButton">
            <el-button type="success" @click="beginRamdon"  style="width: 10rem;">
              <span> {{this.beginRamdonFlag==true?"分组抽签":"停止"}}</span>
            </el-button>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="romdomResulttitle">
          <el-link type="primary">抽签结果</el-link>
        </div>
        <div class="romdomResult">
          <div v-for="(item,i) in romdomlist" :class="ResultStyle(i)">
            <div class="resultgroup">第{{i+1}}组</div>
            <div v-for="(item2,i) in item" class="ResultItem2">
              {{rollList[item2-1].name}}
            </div>
          </div>
        </div>
      </el-card>
    </div>


  </div>
</template>

<script>
  export default {
    name: "ramdon",
    data() {
      return{
        rollList:[
          {index:1, name: '王喜雅'},
          {index:2, name: '梁铮'},
          {index:3, name: '马婕'},
          {index:4, name: '吴忠亲'},
          {index:5, name: '崔曼丽'},
          {index:6, name: '吴伟伟'},
          {index:7, name: '曾连梅'},
          {index:8, name: '卢传宝'},
          {index:9, name: '王绥精'},
          {index:10, name: '占青'},
          {index:11, name: '林学光'},
          {index:12, name: '邓玉丹'},
          {index:13, name: '王夏静'},
          {index:14, name: '李益'},
          {index:15, name: '黄杨杰'},
          {index:16, name: '黄名杰'},
          {index:17, name: '丁虹甸'},
          {index:18, name: '杨宏明'},
          {index:19, name: '韩雪芬'},
          {index:20, name: '文海珠'},
          {index:21, name: '王小娜'},
          {index:22, name: '冼心进'},
          {index:23, name: '符书品'},
          {index:24, name: '陈笑竹'},
          {index:25, name: '范雪冰'},
          {index:26, name: '黄祥'},
          {index:27, name: '罗智关'},
          {index:28, name: '陈燕珠'},
          {index:29, name: '杨逢丰'},
          {index:30, name: '冯斯诚'},
          {index:31, name: '陈鸿鑫'},
          {index:32, name: '曾小蕊'},
          {index:33, name: '黄淑娜'},
          {index:34, name: '唐晓佳'},
          {index:35, name: '韩馨莹'},
          {index:36, name: '冯秀雄'},
          {index:37, name: '符承安'},
          {index:38, name: '邓吉良'},
          {index:39, name: '苏炳锋'},
          {index:40, name: '赵玉婷'},
          {index:41, name: '黄清军'},
          {index:42, name: '陈科'},
          {index:43, name: '董儒杰'},
          {index:44, name: '陈伟'},
          {index:45, name: '林烈栋'},
          {index:46, name: '张润武'},
          {index:47, name: '曾小欣'},
          {index:48, name: '王智翔'},
          {index:49, name: '晏彩琼'},
          {index:50, name: '陈晓红'},
          {index:51, name: '陈凌灵'},
          {index:52, name: '王其辉'},
          {index:53, name: '冯文彬'},
          {index:54, name: '曾丹连'},
          {index:55, name: '徐文全'},
          {index:56, name: '潘在文'},
          {index:57, name: '蔡红曼'},
          {index:58, name: '倪俊霞'},
          {index:59, name: '蒋蓉'},
          {index:60, name: '符慧宇'},
          {index:61, name: '梁君'},
          {index:62, name: '张大冶'},
          {index:63, name: '陈惠'},
          {index:64, name: '姜志钒'},
          {index:65, name: '王才博'},
          {index:66, name: '陈宇'},
          {index:67, name: '房国隆'},
          {index:68, name: '林永秀'},
          {index:69, name: '王军辉'},
          {index:70, name: '姚江宏'},
          {index:71, name: '左春慧'},
          {index:72, name: '贾璐羽'},
          {index:73, name: '叶茂军'},
          {index:74, name: '胡毓蝶'},
          {index:75, name: '陈宗宁'},
          {index:76, name: '许家超'},
          {index:77, name: '王思涛'},
          {index:78, name: '钟丹丹'},
          {index:79, name: '周微'},
          {index:80, name: '王妮'},
          {index:81, name: '王华君'},
          {index:82, name: '张钧'},
          {index:83, name: '李祺'},
          {index:84, name: '杨菊'},
          {index:85, name: '胡莲花'},
          {index:86, name: '蔡亚良'},
          {index:87, name: '杨春桃'},
          {index:88, name: '林治'},
          {index:89, name: '陈友荟'},
          {index:90, name: '王思文'},
          {index:91, name: '陈琪琪'},
          {index:92, name: '蔡兴旺'},
          {index:93, name: '王统鸿'},
          {index:94, name: '蔡汝师'},
          {index:95, name: '温晓蝶'},
          {index:96, name: '邢诒明'},
          {index:97, name: '张彩云'},
          {index:98, name: '陈柳遐'},
          {index:99, name: '陈美吉'},
          {index:100, name: '王超'},
          {index:101, name: '王乾田'},

        ],
        beginRamdonFlag:true,
        ramdonIndex:-1,
        chooseIndex:[],
        cheatIndex:[],
        choseCount:20,
        group:[],
        romdomcount:0,
        romdomlist:[],
      }
    },
    methods:{
      beginRamdon(){
        let Data = this.rollList;
        if(this.beginRamdonFlag == true){
          this.beginIntervalId = setInterval(() => {
            this.group=[];
            let count = this.choseCount;
            let remain = Data.length-this.chooseIndex.length;
            if(remain >= this.choseCount){
               count = this.choseCount;
            }else{
              count = remain;
            }
            for(;count>0;){
              this.ramdonIndex = this.getRandomInt(0,Data.length-1);
              if(!this.choosedTest2(this.ramdonIndex)){
                count--;
                this.group.push(this.ramdonIndex)
              }
            }
          }, 150);
          this.beginRamdonFlag = false;
        }else{
          clearInterval(this.beginIntervalId);
          // this.chooseIndex.push(this.ramdonIndex);
          this.chooseIndex = this.chooseIndex.concat(this.group);
          this.romdomlist.push(this.group);
          this.beginRamdonFlag = true;
        }
      },
      getRandomInt (min, max) {
        let flag = false;
        let rom = -1;
        do {
          flag = false;
          rom = parseInt(Math.random() * (max - min + 1) + min, 10);
          rom = rom+1;
          for (let i = 0; i < this.chooseIndex.length; i++) {
            if (this.chooseIndex[i] == rom) {
              flag=true;
              break;
            }
          }
        }while(flag);
        console.log(rom);
        return rom;
      },
      itemStyle(i){
        for(let x = 0; x < this.group.length; x++){
          if (this.group[x] == i) {
            return "chooseStyle"
          }
        }
        for(let j = 0; j < this.chooseIndex.length; j++){
          if(this.chooseIndex[j] == i){
            return "choosedStyle"
          }
        }
        return "commonStyle"

      },
      //结果样式
      ResultStyle(i){
        if(i%5 == 0){
          return "resultStyle1"
        }else if(i%5==1){
          return "resultStyle2"
        }else if(i%5==2){
          return "resultStyle3"
        }else if(i%5==3){
          return "resultStyle4"
        }else if(i%5==4){
          return "resultStyle5"
        }
      },
      //判断是否已经选择
      choosedTest(test){
        let flag = false;
        for(let s = 0; s < this.chooseIndex.length; s++)
          if (this.chooseIndex[s] == test) {
            flag= true;
          }
        return flag;
      },
      //判断是否已经选择
      choosedTest2(test){
        let flag = false;
        for(let s = 0; s < this.chooseIndex.length; s++){
          if (this.chooseIndex[s] == test) {
            flag= true;
          }
        }
        for(let x = 0; x < this.group.length; x++){
          if (this.group[x] == test) {
            flag= true;
          }
        }

        return flag;
      },
      //判断作弊人数是否已经全部选择
      cheatTest(){
        let index  = 0;
        for (let z = 0; z < this.cheatIndex.length; z++) {
          for(let s = 0; s < this.chooseIndex.length; s++)
            if (this.cheatIndex[z] == this.chooseIndex[s]) {
              index++;
            }
        }
        if(index == this.cheatIndex.length){
          return true
        }
        return false;
      },
      setCount(i){
        this.choseCount=i;
      }

    }

  }
</script>

<style scoped>
  /*.content{*/
    /*display: flex;*/
    /*justify-content:center;*/
    /*align-items:center;*/
    /*width: 100%;*/
  /*}*/
  .rollCall{
    display: flex;
    flex-wrap:wrap;
    justify-content:flex-start;
    align-items:flex-start;
    width: 100%;
    border-style: solid;
    border-width: 2px;
    margin: 1px;
    border-color:#F0F0F0;
    padding: 2px;
  }
  .personItem{
    width: 5%;
    height: 4.2rem;
    text-align: center;
    display: flex;
    justify-content:center;
    align-items:center;
    border-style: solid;
    border-width: 2px;
    margin: 1px;
    border-color:#F0F0F0;
  }
  .opertionClass{
    display: flex;
    width: 100%;
    margin-top: 1rem ;
  }
  .setButton{
    width: calc(50% - 5rem);
  }
  .clickButton{
    width: calc(50% + 5rem);
  }
  .clickButton3{
    display: flex;
    justify-content:center;
    align-items:center;
    text-align: center;
    width: 100%;
    height: 3rem;
    margin-top: 1.5rem ;

  }
  .clickButton4{
    line-height: 3rem;
    text-align: right;
    width: 50%;
  }
  .clickButton5{
    line-height: 3rem;
    text-align: left;
    width: 50%;
  }
  .clickButton2{
    text-align: center;
    display: flex;
    justify-content:center;
    align-items:center;
    background-color: #5CBB7A;
    color: white;
    text-align: center;
    width: 8rem;
    height: 3rem;

  }

  .commonStyle{
    background-color: #409EFF;
    color: white;
  }
  .chooseStyle{
    background-color: red;
    color: white;
  }
  .choosedStyle{
    background-color: #F0F0F0;
    color:black;
  }
  .romdomResult{
    display: flex;
    flex-wrap:wrap;
  }
  .romdomResulttitle{
    text-align: center;
    margin-top: 1rem ;
  }
  .resultStyle1{
    margin-top: 1rem;
    margin-left: 1rem;
    background-color: #67c23a;
    color:white;
    text-align: center;
    width: 17.5%;
  }
  .resultStyle2{
    margin-top: 1rem;
    margin-left: 1rem;
    background-color: #E6A23C;
    color:white;
    text-align: center;
    width: 17.5%;
  }
  .resultStyle3{
    margin-top: 1rem;
    margin-left: 1rem;
    background-color: #F56C6C;
    color:white;
    text-align: center;
    width: 17.5%;
  }
  .resultStyle4{
    margin-top: 1rem;
    background-color: #409EFF;
    color:white;
    text-align: center;
    width: 17.5%;
    margin-left: 1rem;
  }
  .resultStyle5{
    margin-top: 1rem;
    background-color: darkmagenta;
    color:white;
    text-align: center;
    width: 17.5%;
    margin-left: 1rem;
  }
  .ResultItem2{
    width: 100%;
    border-style: solid;
    border-width: 1px;
    margin: 1px;
    border-color:#F0F0F0;
  }
  .resultgroup{
    background: darkgray;
    font-weight: bold;
  }

</style>