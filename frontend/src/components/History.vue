<template>
  <div>
    <nav-menu></nav-menu>
    <router-view/>
    <div v-loading.fullscreen.lock="loading"
         class="login"
         element-loading-spinner="fa fa-spinner fa-pulse fa-3x fa-fw">
      <el-row>
        <el-col :span="24">
          <el-row>
            <el-col :span="24">
                <div class="head1" style="text-align: left;margin: 0.57rem 0.7rem;font-size: 1rem;font-weight:bold;margin-left:100px" >
                  历史记录
                </div>
                <div >
                  <el-button style="margin-top: 0.5rem;margin-left: 0.15rem" @click="clean()">清空浏览历史</el-button>
                </div>
              <div class="table">
                <template>
                  <el-table :data="tableData" style="margin: 0.83rem;width: 90%;" :show-header="false">
                    <el-table-column prop="questions">
                      <template slot-scope="scope">
                        <div @click="viewDetail(scope.$index)" style="cursor: pointer;font-size: 0.4rem;margin-bottom:20px;margin-top:10px" class="question">
                          <i class="el-icon-search" style="margin-right:10px"></i>
                          {{scope.row.title}}
                        </div>
                        <div style="font-family: Microsoft YaHei;font-size: 0.3rem" class="info1">
                          浏览时间：{{scope.row.createTime}}
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
</template>


<script>
  import NavMenu from "../components/common/Nav";
  export default {
    name: "History",
    components: {
      NavMenu,
    },
    data(){
      return{
        questionId:'',
        tableData:[],
      }
    },
    created(){
      this.$axios.get('/user/history?id='+window.localStorage.getItem("userId"),{
      }) .then((res)=>{
        this.tableData = res.data.data.data;
      })
    },
    methods:{
      viewDetail(row){
        window.localStorage.setItem("questionTitle",this.tableData[row].title);
        this.$router.replace('/questionDetails?id='+this.tableData[row].id)
      },
      clean(){
        this.$axios.put('/user/history?id='+window.localStorage.getItem("userId"),{
        }) .then((res)=>{
          this.tableData = res.data.data.data;
          if(res.status===200){
            this.$message.success("已清空浏览历史");
          }
        })
      }
    }

  }
</script>

<style>

  .table{
    background-color: transparent;
  }

</style>

<style scoped>
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
