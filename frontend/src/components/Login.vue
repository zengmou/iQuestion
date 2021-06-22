<template>
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
    <el-col :span="24">
      <div style="margin:0 auto;">
        <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login_container" label-position="left" label-width="0px" v-loading="loading">
          <p class="login_title" style="padding-top:60px;padding-bottom: 100px;font-size: 2em;font-weight:bold">账户登录</p>
          <el-form-item  prop="username" label-width="100px" label="用户名">
            <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item  prop="password" label-width="100px" label="密码">
            <el-input type="text" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item style="width: 100%;margin-top:14px;padding-top: 80px">
            <el-button id="login_button" type="primary" style="width: 50%;border: none" v-on:click="login(loginForm)">登录</el-button>
          </el-form-item>
          <el-form-item>
            还没有账号? 去<el-link type="primary" href="register" :underline="false" style="margin-bottom: 1px">注册</el-link>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
          password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        },
        loading: false
      }
    },
    created(){
      
    },
    methods: {
      login (formName) {
        if(this.loginForm.identity!=''){
          this.$axios.post('./user/login',{
            name:this.loginForm.username,
            pwd:this.loginForm.password
          })
            .then(resp => {
              if (resp.status === 200) {
                window.localStorage.setItem("userId",resp.data.data.id)
                this.$message.success('登录成功');
                this.$router.replace('/hotQuestions');
              }
              else{
                this.$message.error('登录失败');
              }
            })
            .catch(error => {
              console.log(error);
              this.$message.error('登录请求失败');
            })
        }
        else{
          this.$message.error('输入格式有误');
        }
      }
    }
  }
</script>

<style scoped>
  body{
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  #login_img{
    height:100%;
    float: left;
    background-size: cover;
    border-radius: 0 25% 25% 0/ 50%;
  }
  .login_container{
    background-clip: padding-box;
    margin: 90px auto;
    width: 500px;
    padding: 35px 35px 15px 35px;
  }
  .login_title {
    margin: 0 auto 20px auto;
    text-align: center;
    color: #72707c;
  }
</style>

<style>
  #particles-js{ 
    width: 100%;
    height: calc(100% - 100px);
    position: absolute;  
  }
</style>
