<template>
<div>
  <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt="" />
  </div>
  <div>
    <nav-menu class="nav"></nav-menu>
    <router-view/>
    <div class="front">
      <el-row>
        <el-col :span="24">
          <el-row>
            <el-col :span="24">
              <div class="head1">
                <p style="text-align: left;font-size: 0.65rem;font-weight:bold;margin-left:100px">所有问题</p>
              </div>
              <div class="search">
                <el-input placeholder="请输入搜索内容" v-model="search"  class="input-with-select" style="width:50%;margin-left:1.2rem;margin-top:0.66rem"></el-input>
                <el-button slot="append" icon="el-icon-search" @click="searchQuestion()"></el-button>
              </div>

              <div class="table">
                <template>
                  <el-table :data="tableData" style="margin: 0.85rem;width: 90%;" :show-header="false">
                    <el-table-column prop="questions">
                      <template slot-scope="scope">
                        <div @click="viewDetail(scope.$index)" style="cursor: pointer;font-size:0.46rem;margin-bottom:20px;margin-top:10px" class="question">
                          <i class="el-icon-search" style="margin-right:0.3rem"></i>
                          {{scope.row.title}}
                        </div>
                        <div style="font-family: Microsoft YaHei;font-size: 0.35rem;margin-bottom:0.5rem" class="content">
                          {{scope.row.content}}
                        </div>
                        <div style="font-family: Microsoft YaHei;font-size: 0.2rem" class="info1">
                          回复数：{{scope.row.commentCount}}
                        </div>
                        <div style="font-family: Microsoft YaHei;font-size:  0.2rem" class="info2">
                          热度：{{scope.row.heat}}
                        </div>
                        <div style="font-family: Microsoft YaHei;font-size:  0.2rem" class="info3">
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
    name: "AllQuestions",
    components: {
      NavMenu,
    },
    data(){
      return{
        imgSrc:require('../assets/background/1.png'),
        search:'',
        questionId:'',
        tableDataOrigin:[],
        tableData:[],
      }
    },
    created(){
      this.$axios.get('./question/',{
        params:{
          from:0,
          sum:20,
          type:"createTime"
        }
      }) .then((res)=>{
        this.tableData = res.data.data.data;
      })
    },
    methods:{
      viewDetail(row){
        window.localStorage.setItem("questionTitle",this.tableData[row].title);
        this.$router.replace('/questionDetails?id='+this.tableData[row].id)
      },
      searchQuestion(){
          this.$axios.get('./question/search',{
            params:{
              from:0,
              sum:20,
              id:window.localStorage.getItem('userId'),
              str:this.search,
              type:"heat"
            }
          }).then(res =>{
              this.tableData = res.data.data.data;
          })
      }
    }

  }
</script>

<style>
  /* .el-table__row>td{
	border: none;
  } */
  .el-table::before {
	height: 0px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-table,.el-table__expanded-cell {
    /* background-color: transparent; */
    background: rgba(255, 255, 255, 0.3);
  }
  .table{
    /* background-color: transparent; */
    background: rgba(255, 255, 255, 0.3);
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
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .info1{
    display: inline;
    float: left;
    position: relative;
    margin-left: 1.7rem;
  }
  .info2{
    display: inline;
    float: left;
    position: relative;
    left: 25%;
  }
  .info3{
    display: inline;
    float: right;
    position: relative;
    margin-right:  1rem;
  }
  .table /deep/ .el-table th {
    /* background-color: transparent!important; */
    background: rgba(255, 255, 255, 0.3);
  }

  .table /deep/ .el-table tr {
    /* background-color: transparent!important; */
    background: rgba(255, 255, 255, 0.3);
  }
  .table /deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{
    /* background-color: transparent; */
    background: rgba(255, 255, 255, 0.3);
  }
  .question:hover {
    /* text-decoration: underline; */
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
    margin-left: 1.7rem;
    background-color: transparent;
  }
  #demo-table-expand {
    font-size: 0;
  }
  #demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>

