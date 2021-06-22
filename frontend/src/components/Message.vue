<template>
    <div>
      <nav-menu></nav-menu>
      <router-view/>
      <el-row>
        <el-col :span="24">
          <el-row>
            <el-col :span="24">
              <div class="head1" style="text-align: left;margin: 0.57rem 0.7rem;font-size: 0.6rem;font-weight:bold;margin-left:100px" >
                通知消息
              </div>
              <div class="table">
                <template>
                  <el-table :data="tableData" style="margin: 0.8rem;width: 90%;" :show-header="false">
                    <el-table-column prop="messages">
                      <template slot-scope="scope">
                        <!--<div @click="viewDetail(scope.$index)" style="cursor: pointer;font-size: 24px;margin-bottom:20px;margin-top:10px" class="question">-->
                          <!--<i class="el-icon-search" style="margin-right:10px"></i>-->
                          <!--{{scope.row.fromId}}-->
                        <!--</div>-->
                        <div v-show="false" style="font-family: Microsoft YaHei;font-size: 0.35rem;margin-left: 0.5rem;margin-bottom: 5px" class="content">
                          id：{{scope.row.id}}
                        </div>
                        <div style="font-family: Microsoft YaHei;font-size: 0.32rem;margin-left: 1.2rem;margin-bottom: 5px" class="content">
                          发信人：{{scope.row.fromId}}
                        </div>
                        <div style="font-family: Microsoft YaHei;font-size: 0.32rem;margin-left: 1.2rem;margin-bottom: 5px" class="content">
                          详细内容：{{scope.row.content}}
                        </div>
                        <div style="font-family: Microsoft YaHei;font-size: 0.32rem;margin-left: 1.2rem;margin-bottom: 5px" class="info1">
                          状态：
                          <span v-if="scope.row.hasRead == '0'">未读</span>
                          <span v-if="scope.row.hasRead == '1'">已读</span>
                        </div>
                        <div style="font-family: Microsoft YaHei;font-size: 0.2rem;margin-left: 1.2rem;margin-bottom: 5px" class="info1">
                          发信时间：{{scope.row.createTime}}
                        </div>
                        <div style="font-family: Microsoft YaHei;font-size: 0.2rem;margin-left: 1.2rem;margin-bottom: 5px" class="info3">
                          <el-button type="primary" class="button" @click="read(scope.row.id)" :disabled="scope.row.hasRead == 1">确认已读</el-button>
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
</template>

<script>
  import NavMenu from "../components/common/Nav";
  export default {
    name: "Message",
    components: {
      NavMenu,
    },
    data(){
      return{
        tableData:[],
      }
    },
    created(){
      this.$axios.get('/message/?toid='+window.localStorage.getItem("userId"),{
      }) .then((res)=>{
        this.tableData=res.data.data.data;
      })
    },
    methods:{
      read(msgid){
        this.$axios.get('/message/detail?messageId='+msgid,{
        }) .then((res)=>{
          this.tableData=res.data.data.data;
        })
        location. reload()
      }
    }
  }
</script>

<style scoped>
  .button {
    text-align: center;
    width: 700px
  }
</style>
