<template>
  <div>
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt="" />
    </div>

    <div class="front">
      <nav-menu></nav-menu>
      <router-view/>
      <br>
      <br>
      <br>
      <el-row>
        <el-col>
          <div>
            <p style="text-align: center; margin-bottom: 50px;font-size: 30px;font-weight: bold">知识图谱问答</p>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <div class="out" align="center">
            <el-input class="input" type="text" ref="input1" placeholder="请输入问题" v-model="input1"></el-input>
          </div>
        </el-col>
      </el-row>

      <br>

      <el-row>
        <el-col>
          <div>
            <el-button type="primary" class="button" v-on:click="search()">查询</el-button>
          </div>
        </el-col>
      </el-row>

      <br>

      <el-row>
        <el-col>
          <div class="answerDiv">
            {{answer}}
            <!--<el-input type="text" style="width: 500px; text-align: center" v-model="input2">{{answer}}</el-input>-->
          </div>
        </el-col>
      </el-row>

      <br>
      <br>
      <br>
      <br>

      <el-row>
        <el-col>
          <div>
            <el-button ref="btn1" type="primary" class="button" @click="submitQuestions" v-if="showBtn">答案是我，不满意？(▼へ▼メ) 那去发帖提问吧→</el-button>
          </div>
        </el-col>
      </el-row>

      <br>

      <el-row>
        <el-col>
          <div>
            <el-button type="primary" class="button" @click="add" v-if="showBtn">没有搜到答案？来新增吧！ヾ(ｏ･ω･)ﾉ</el-button>
          </div>
        </el-col>
      </el-row>
    </div>


  </div>
</template>

<script>
  import NavMenu from "../components/common/Nav";
  export default {
    name: "KnowledgeMap",
    components: {
      NavMenu,
    },

    data(){

      return{
        imgSrc:require('../assets/background/1.png'),
        input1:'',
        input2:'',
        answer:'',
        showBtn:false
      }

    },

    created () {
      setTimeout(() => {
        window.L2Dwidget.init({
          pluginRootPath: 'static/live2dw/',
          pluginJsPath: 'lib/',
          pluginModelPath: 'live2d-widget-model-hijiki/assets/',
          tagMode: false,
          debug: false,
          model: { jsonPath: '/static/live2dw/live2d-widget-model-hijiki/assets/hijiki.model.json' },
          display: { position: 'right', width: 300, height: 450},
          mobile: { show: false },
          log: false
        })
      }, 1000)
    },

    methods:{
      search(){
        //var temp1 =window.localStorage.getItem('id');
        var inputValue = this.$refs.input1.value;
        if(inputValue!==''){
          this.$axios.get('/knowledgeMap/search?question='+inputValue,{
            })
            .then(res=>{
              this.answer = res.data.data.data;
            })
          setTimeout(() =>{
            this.showBtn=true;
          },3000);
        }
        else{
          this.$message.error("输入问题不能为空")
        }
        //this.$refs.btn1.showBtn.value=ture;
        
      },
      submitQuestions(){
        this.$router.replace('/submitQuestions')
      },
      add(){
        this.$prompt('请输入该问题的答案', '新增', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if(value!==null){
            this.$axios.post('/knowledgeMap/add',{
              answer:value,
              question:this.$refs.input1.value
            }).then(res =>{
              if(res.status===200){
                this.$message.success('新增成功');
              }
              else{
                this.$message.error('新增失败');
              }
            });
          }
          else{
            this.$message.error("新增答案不能为空")
          }
          
        });
      },



    }

  }
</script>

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
  .answerDiv{
    color: black;
    background-color: rgba(176,224,255,0.5);
    font-size: 20px;
    font-family: "Bookman Old Style";
    text-align: center;
    width: 700px;
    height: 55px;
    line-height: 60px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    border-radius: 6px;
  }
  .input{
     text-align: center;
     width: 700px;
   }
  .button{
    text-align: center;
    width: 700px;
  }
</style>
