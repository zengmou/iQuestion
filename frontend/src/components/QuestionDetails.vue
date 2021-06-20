<template>
  <div>
    <nav-menu></nav-menu>
    <router-view/>
    <div>
      <el-row>
        <el-col :span="21">
          <div style="margin: 0 30px">
            <p style="margin-left:40px;margin-top:40px;float: left;font-size: 30px;" class="title">{{title}}</p>
            <template>
              <el-table :data="tableData" style="width: 95%;margin-left:100px" max-height="600">
                <el-table-column prop="answer">
                  <template slot-scope="scope">
                    <div style="font-size:10px" class="left">
                      用户id：{{scope.row.userId}}     
                    </div>
                    <div style="font-size:10px" class="right">
                       回复时间：{{scope.row.createTime}}
                    </div>
                    <div style="font-size:24px;margin-top:40px">
                      {{scope.row.content}}
                    </div>
                    <div style="margin-top:25px" @click="good(scope.$index)">
                      <vue-clap-button :size= "size"
                      :colorNormal="scope.row.colorNormal" 
                      :colorActive="scope.row.colorActive" />
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" style="margin-left:75px">
          <el-input v-model="content" placeholder="请输入回复内容" style="margin-top:100px;width:80%"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" style="margin-left:75px">
          <el-button type="primary" style="margin-top:20px" @click="answer()">发布回复</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import NavMenu from "../components/common/Nav";
  export default {
    name: "QuestionDetails",
    components: {
      NavMenu
    },
    data(){
      return{
        size:40,
        title:window.localStorage.getItem("questionTitle"),
        content:'',        
        selectedRow:'',
        tableData:[{userId:1,createTime:"2021-06-20 03:22:32",content:"xswl",colorNormal:"#ff0000",colorActive:"#F56C6C"},
        {userId:2,createTime:"2021-06-29 03:22:32",content:"hello",colorNormal:"#909399",colorActive:"#ff0000"}]
      }
    },
    created(){
      this.$axios.get('./comment',{
        params:{
          from:0,
          id:window.localStorage.getItem("userId"),
          qid:this.$route.query.id,
          sum:20,
          type:"createTime"
        }
      }).then(res =>{
        this.tableData = res.data.papers;
        var length = this.tableData.length;
        for(var i=0;i<length;i++){
          this.$axios.get('./like/whether',{
            params:{
              commentId:this.tableData[i].id,
              userId:window.localStorage.getItem("userId")
            }
          }).then(res =>{
            if(res.data=="true"){
              this.tableData[i].colorNormal = "#F56C6C";
              this.tableData[i].colorActive = "#909399"
            }
            else{
              this.tableData[i].colorActive = "#909399";
              this.tableData[i].colorActive = "#F56C6C";
            }
          })
        }
      })
    },
    methods:{
      good(row){
        this.$axios.post('./like',{
          commentId:this.tableData[row].id,
          userId:window.localStorage.getItem("userId")
        }).then(res =>{
          if(res.data === "点赞成功"){
            this.$message.success("点赞成功")
          }
          else if(res.data === "取消点赞"){
            this.$message("已取消点赞")
          }
        })
      },
      answer(){
        console.log(this.content);
        this.$axios.post('./comment',{
          content:this.content,
          questionId:this.$route.query.id,
          userId:window.localStorage.getItem("userId")
        }).then(res =>{
          if(res.status === 200){
            this.$message.success("回复成功");
            location. reload()
            this.$router.go(2000)
          }
          else{
            this.$message.error("回复失败");
          }
        })
      }
    }
  }
</script>

<style scoped>
  .left{
    position:absolute;
    display: flex;
    
  }
  .right{
    float: right;
  }
  .title{
    font-weight: bold;
    font-size: 20px;
  }
</style>

<style>
  .title{
    font-weight: bold;
    font-size: 20px;
  }
</style>