<template>
  <div class="check">
    <el-form
            :model="checkForm"
            status-icon
            :rules="checkFormRules"
            ref="checkFormRef"
            label-position="left"
            label-width="0px"
            class="check-page"
    >
      <div class="logoImg"><img src="../../assets/gy-logo2.png" width="150px" height="150px"/></div>
      <!--<div>{{id}}{{title}}</div>-->
      <div v-show="checkflag">
      <el-form-item prop="groupid">
        分组：
        <el-select v-model="checkForm.groupid" filterable placeholder="请选择" @change="groupChang">
          <el-option
                  v-for="item in groupData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="userid">
        姓名：
        <el-select v-model="checkForm.userid" filterable placeholder="请选择">
          <el-option
                  v-for="item in UserData"
                  :key="item.id"
                  :label="item.username"
                  :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="width:100%; text-align: center">
        <div>
          <el-button
                  type="primary"
                  class="el-icon-mobile-phone"
                  @click="handleSubmit"
                  :loading="loading"
          >会议签到</el-button>
        </div>
      </el-form-item>
      </div>
      <div v-show="!checkflag">
        <el-button type="success">{{checkMsg}}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "checkMetting",
    data(){
      return {
        id:this.$route.query.id,
        title:this.$route.query.title,
        groupData:[],
        UserData:[],
        groupUserData:[],
        checkForm:{
          mettingid:this.$route.query.id,
          groupid:"",
          userid:"",
        },
        checkflag:true,
        checkMsg:'',
        loading: false,
        //验证规则
        checkFormRules: {
          groupid: [
            { required: true, message: "请选择分组", trigger: "blur" },
          ],
          userid: [
            { required: true, message: "请选择签到人员", trigger: "blur" },
          ]
        },
      }
    },
    methods:{
      handleSubmit(){
        this.$refs.checkFormRef.validate(valid => {
          if (!valid) {
            return;
          } else {
            this.check();
          }
        });
      },
      async check(){
        const { data: res } = await this.$http.post(
            "check/check",this.checkForm
        );
        if (res.code == 200) {
          this.$message({
            title: "签到成功",
            message: "签到成功",
            type: "success"

          });
          this.checkflag = false;
          this.checkMsg="签到成功";

        } else {
          this.$message.error({
            title: "签到失败",
            message: res.msg,
            type: "error"
          });
          this.checkflag = false;
          this.checkMsg="签到失败";
        }
      },
      async getGroup() {
        const { data: res } = await this.$http.get("mettingGroup/getAllGroup");
        if (res.code !== 200) {
          return this.$message.error("获取列表失败");
        } else {
          this.groupData = res.data;
        }
      },
      async getGroupUser() {
        const { data: res } = await this.$http.get("mettingGroup/getAllGroupUser");
        if (res.code !== 200) {
          return this.$message.error("获取列表失败");
        } else {
          this.groupUserData = res.data;
        }
      },
      groupChang(id){
        this.checkForm.userid = "";
        this.UserData = this.groupUserData.filter( function (value){
          return value.groupid == id ? true :false
        })
        console.log(this.UserData);
      },

    },
    created(){
      this.getGroup();
      this.getGroupUser();
    }
  }
</script>

<style scoped>
  .check-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    background: #fff;
    border: 1px solid #eaeaea;
    position: relative;
    height: 100%;
  }
  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  }
  .logoImg{
    width: 150px;
    height: 150px;
    margin: 20px auto;
    text-align: center;
  }
  .check{
    text-align: center;
    width: 90%;
    margin: 20% auto;
  }
</style>