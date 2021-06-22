<template>
<div>
  <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt="" />
  </div>
  <div class="front">
    <nav-menu></nav-menu>
    <router-view/>
    <div v-loading.fullscreen.lock="loading"
         class="login"
         element-loading-spinner="fa fa-spinner fa-pulse fa-3x fa-fw">
      <el-row>
        <el-col :span="24">
          <el-row>
            <el-col :span="24">
              <div class="head1" style="margin: 40px 50px;margin-left:100px;text-align: left;font-size: 3.0em;font-weight:bold;" >
                我发布的问题
              </div>
              <div class="table">
                <template>
                  <el-table :data="tableData" style="margin: 60px;width: 90%;" :show-header="false">
                    <el-table-column prop="questions">
                      <template slot-scope="scope">
                        <div @click="viewDetail(scope.$index)" style="cursor: pointer;font-size: 24px;margin-bottom:20px;margin-top:10px" class="question">
                          <i class="el-icon-search" style="margin-right:10px"></i>
                          {{scope.row.title}}
                        </div>
                        <div style="font-family: Microsoft YaHei;font-size: 16px;margin-bottom:20px" class="content">
                          {{scope.row.content}}
                        </div>
                        <div style="font-family: Microsoft YaHei;font-size: 10px" class="info1">
                          回复数：{{scope.row.commentCount}}
                        </div>
                        <div style="font-family: Microsoft YaHei;font-size: 10px" class="info2">
                          热度：{{scope.row.heat}}
                        </div>
                        <div style="font-family: Microsoft YaHei;font-size: 10px" class="info3">
                          发布时间：{{scope.row.createTime}}
                        </div>
                      </template>

                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</div>
</template>


<script>
  import NavMenu from "../components/common/Nav";
  export default {
    name: "MyQuestions",
    components: {
      NavMenu,
    },
    data(){
      return{
        imgSrc:require('../assets/background/1.png'),
        questionId:'',
        tableData:[],
      }
    },
    created(){
      this.$axios.get('/question/myQuestion?from=0&id='+window.localStorage.getItem("userId")+'&sum=999&type=createTime',{
      }) .then((res)=>{
        this.tableData = res.data.data.data;
      })
    },
    methods:{
      viewDetail(row){
        window.localStorage.setItem("questionTitle",this.tableData[row].title);
        this.$router.replace('/questionDetails?id='+this.tableData[row].id)
      },
    }

  }
</script>

<style>

  .table{
    background-color: transparent;
  }
   .el-table,.el-table__expanded-cell {
    background-color: transparent;
  } 

</style>

<style scoped>
  .background{
    width:80%;
    height:100%;
    z-index:-1;
    position: fixed;
  }
  .front{
    z-index:1;
  }
  .head1{
    display: inline;
    float: left;
  }
  .search{
    display: inline;
  }

  .info1{
    display: inline;
    float: left;
    position: relative;
    margin-left: 120px;
  }
  .info2{
    display: inline;
    float: left;
    position: relative;
    left: 25%;
  }
  .info3{
    display: inline;
    float: left;
    position: relative;
    left: 50%;
  }
  .table /deep/ .el-table th {
    background-color: transparent!important;

  }

  .table /deep/ .el-table tr {
    background-color: transparent!important;
  }
  .table /deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{
    background-color: transparent;

  }
  .question:hover {
    color: #336699;
  }
  .question {
    text-align: left;
    font-weight: bold;
    margin-left: 60px;
    background-color: transparent;
  }
  .content{
    text-align: left;
    margin-left: 120px;
    background-color: transparent;
  }

</style>
