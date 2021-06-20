<template>
  <div>
    <nav-menu></nav-menu>
    <router-view/>
    <div v-loading.fullscreen.lock="loading"
      class="login"
      element-loading-spinner="fa fa-spinner fa-pulse fa-3x fa-fw">
      <vue-particles
          color="#292929"
          :particleOpacity="1"
          :particlesNumber="80"
          shapeType="circle"
          :particleSize="2"
          linesColor="#292929"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.8"
          :linesDistance="150"
          :moveSpeed="3"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="remove"
      ></vue-particles>
      <el-row>
        <el-col :span="21">                     
              <div style="margin-left:130px">
                <el-form :model="submitForm" :rules="rules" class="submit_container" label-position="middle"
                  label-width="0px" v-loading="loading" :ref="submitForm">
                    <p class="submit_title" style="font-size: 2em;font-weight:bold;padding-top:120px;padding-bottom: 60px;">发布问题</p>
                    <el-form-item label-width="100px" label="问题题目" prop="questionTitle">           
                    <el-input type="text" v-model="submitForm.questionTitle" auto-complete="off" placeholder="请输入问题题目" ref="username"></el-input>
                </el-form-item>
                <el-form-item label-width="100px" label="具体内容" prop="content">    
                    <el-input :rows="6" type="textarea" v-model="submitForm.content" auto-complete="off" placeholder="请输入问题内容"></el-input>          
                </el-form-item>
                <el-form-item style="width: 100%;margin-top:14px;padding-top: 60px">
                    <el-button type="primary" style="width: 50%;border: none;margin-top:14px" v-on:click="submitQuestion(submitForm)">发布提问</el-button>
                </el-form-item>
                
                </el-form>
              </div>
           
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>
  import NavMenu from "../components/common/Nav";
  export default {
    name: "SubmitQuestions",
    components: {
      NavMenu,
    },
    data(){
      return{
        submitForm: {
          questionTitle: '',
          content: '',
        },
        rules: {
        // blur 失去鼠标焦点时触发验证       
        questionTitle: [{required: true, message: '问题题目不能为空', trigger: 'blur'}],
        content: [{required: true, message: '问题内容不能为空', trigger: 'blur'}],
        },
        loading: false
      }
    },
    methods:{
      submitQuestion(){
          this.$axios.post('./question',{     
            content:this.submitForm.content,
            title:this.submitForm.questionTitle,
            userId:window.localStorage.getItem('userId'),
          }).then(res =>{
              if(res.status===200){
                this.$message.success('发布问题成功');
                this.$router.replace('/myQuestions')
              }
              else{
                  this.$message.error('发布问题失败');
              }
          }).catch(error =>{
              this.$message.error('发布请求失败');
          })
      }
    }

  }
</script>

<style>
  #particles-js{
   width: 100%;
   height: calc(100% - 100px);
    position: absolute;  
  }
 
</style>

<style scoped>
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .content{
    text-align: left;
    margin-left: 120px;
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

