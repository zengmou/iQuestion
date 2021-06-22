<template>
  <div>
    <nav-menu></nav-menu>
    <router-view/>
    <div>
      <el-row>
        <el-col :span="21">
          <div style="margin: 0.1rem">
            <p style="margin-left:0.57rem;margin-top:40px;float: left;font-size: 0.42rem;" class="title">{{title}}</p>
            <template>
              <el-table :data="tableData" style="width: 100%;margin-left:0.4rem" max-height="600">
                <el-table-column prop="answer">
                  <template slot-scope="scope">
                    <div style="font-size:0.2rem" class="left">
                      用户id：{{scope.row.userId}}
                    </div>
                    <div style="font-size:0.1rem" class="right">
                       回复时间：{{scope.row.createTime}}
                    </div>
                    <div style="font-size:0.3rem;margin-top:40px">
                      {{scope.row.content}}
                    </div>
                    <div >{{scope.row.colorActive}}</div>
                    <div style="margin-top:25px" @click="good(scope.$index)">
                      <vue-clap-button :size= "size"
                      :colorNormal="scope.row.colorBefore"
                      :colorActive="scope.row.colorAfter" />
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" style="margin-left:1rem">
          <el-input v-model="content" placeholder="请输入回复内容" style="margin-top:100px;width:80%"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="21" style="margin-left:1rem">
          <el-button type="primary" style="margin-top:20px;margin-bottom:20px" @click="answer()">发布回复</el-button>
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
        userId:window.localStorage.getItem("userId"),
        tableData:[],
        tableDataText:[],
        tableDataColor:[],
        colorActive:'',
        colorNormal:'',
      }
    },
    created(){
      this.$axios.get('./comment/',{
        params:{
          from:0,
          id:window.localStorage.getItem("userId"),
          qid:this.$route.query.id,
          sum:20,
          type:"createTime"
        }
      }).then(res =>{
        this.tableDataText = res.data.data.data;
        setTimeout(()=>{
            this.likeWhether();
        },1000)

      })

    },

    methods:{
      async likeWhether(){
        var length = this.tableDataText.length;
        for(let i=0;i<length;i++){
          let a = await this.likeWhether1(i);
        }
        setTimeout(()=>{
          this.likeWhether2();
        },1000)
      },
      likeWhether1(i){
        console.log("hello"+i);
        this.$axios.get('./like/whether',{
            params:{
              commentId:this.tableDataText[i].id,
              userId:window.localStorage.getItem("userId")
            }
          }).then(res =>{
            if(res.data.data.data===true){
                this.tableDataColor.push({
                  id:this.tableDataText[i].id,
                  colorBefore:"#F56C6C",
                  colorAfter:"#909399"
                })
            }
            else{
               console.log("hello")
               this.tableDataColor.push({
                  id:this.tableDataText[i].id,
                  colorBefore:"#909399",
                  colorAfter:"#F56C6C"
                })
            }
            console.log(this.tableDataColor.length)
          })
      },
      likeWhether2(){
        console.log(this.tableDataColor);
        var length = this.tableDataText.length;
        for(var i=0;i<length;i++){
          for(var j=0;j<length;j++){
            if(this.tableDataText[i].id === this.tableDataColor[j].id){
              this.tableData.push({
                id:this.tableDataText[i].id,
                userId:this.tableDataText[i].userId,
                createTime:this.tableDataText[i].createTime,
                content:this.tableDataText[i].content,
                colorBefore:this.tableDataColor[j].colorBefore,
                colorAfter:this.tableDataColor[j].colorAfter
              })
            }
          }

        }
      },
      good(row){
        this.$axios.post('./like/?commentId='+this.tableData[row].id+'&userId='+parseInt(this.userId),{

            // commentId:this.tableData[row].id,
            // userId:,

        }).then(res =>{
          if(res.data.data.data === "点赞成功"){
            this.$message.success("点赞成功")
          }
          else if(res.data.data.data === "取消点赞"){
            this.$message("已取消点赞")
          }
        })
      },
      answer(){
        console.log(this.content);
        this.$axios.post('./comment/',{
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
