<template>
  <el-menu :default-active="path1" router mode="horizontal" background-color="white" text-color="#222" style="height:100%">
    <el-button type="text"
               style="color: #757575; float:left;padding:18px;margin-left:35px;font-size:2.0em;"
               @click="hotQuestions"
               icon="el-icon-s-promotion">
      iQuestion
    </el-button>
    <el-submenu index="/login" style="float: right">
      <template slot="title"><i class="el-icon-s-custom"></i>我的</template>
      <el-menu-item @click="message"><i class="el-icon-bell"></i>通知信息</el-menu-item>
      <el-menu-item @click="myQuestions"><i class="el-icon-user"></i>我发布的问题</el-menu-item>
      <el-menu-item @click="history"><i class="el-icon-mobile-phone"></i>历史记录</el-menu-item>
      <el-menu-item @click="quit"><i class="el-icon-switch-button"></i>退出登录</el-menu-item>
    </el-submenu>    
    <el-menu-item @click="submitQuestions" style="float: right"><i class="el-icon-edit"></i>发布问题</el-menu-item>
    <el-menu-item @click="allQuestions" style="float: right"><i class="el-icon-search"></i>所有问题</el-menu-item>
    <el-menu-item @click="hotQuestions" style="float: right"><i class="el-icon-star-off"></i>热门问题</el-menu-item>
    <el-menu-item @click="knowledgeMap" style="float: right"><i class="el-icon-position"></i>知识图谱</el-menu-item>
    
  </el-menu>
</template>


<script>
  export default {
    name: "AdminNav",
    data(){
      return{
        path1:''
      }
    },
    // mounted: function () {
    //   // 获得第二级路由，以设置侧边导航栏高亮
    //   let x = this.$route.path.indexOf('/', 0);
    //   if (x !== -1) {
    //     this.path1 = this.$route.path.substring(x)
    //   }
    //   else {
    //     this.path1 = this.$route.path
    //   }
    // },
    // created(){
    //   localStorage.setItem('name','era')
    //   localStorage.setItem('age','14')
    //   localStorage.setItem('id','68')
    //   localStorage.setItem('identity','370481200005270924')
    //   localStorage.setItem('balance','50000')
    //   localStorage.setItem('loanAmount','2000')
    //   localStorage.setItem('creditRate','一级')
    //   localStorage.setItem('nowDate','2020-04-07')
    // },
    methods: {
      quit() {
        this.$confirm('您将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.localStorage.setItem("token",null);
          window.localStorage.removeItem('identity');
          this.$router.replace({path: '/login'});
          this.$message.success("已退出当前账号")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      hotQuestions(){
        this.$router.replace('/hotQuestions')
      },
      allQuestions(){
        this.$router.replace('/allQuestions')
      },
      knowledgeMap(){
        this.$router.replace('/knowledgeMap')
      },
      submitQuestions(){
        this.$router.replace('/submitQuestions')
      },
      message(){
        this.$router.replace('/message')
      },
      myQuestions(){
        this.$router.replace('/myQuestions')
      },
      history(){
        this.$router.replace('/history')
      }
    }
  }
</script>

<style  scoped>
  .el-divider{
    height: 25px;
    position:relative ;
    float: left;
  }
</style>
