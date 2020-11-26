<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="mettingTitle">
        <span>{{title}}</span>
      </div>
     <div>
       <img  id="QRCode" :src=getQRCodeURL />
     </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "joinMetting",
    data(){
      return{
        id:this.$route.query.metting.id,
        title:this.$route.query.metting.title,
        getQRCodeURL:this.$http.defaults.baseURL+'/metting/getQRCode/'+this.$route.query.metting.id,
      }
    },
    created(){

    }
  }
</script>

<style scoped>
  .mettingTitle{
    text-align: center;
    font-weight: bold;
  }
</style>