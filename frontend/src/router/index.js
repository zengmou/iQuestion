import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AllQuestions from '@/components/AllQuestions'
import Register from '@/components/Register'
import HotQuestions from '@/components/HotQuestions'
import QuestionDetails from '@/components/QuestionDetails'
import HelloWorld from '@/components/HelloWorld'
import SubmitQuestions from '@/components/SubmitQuestions'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/register',
      name:'Register',
      component:Register,
    },
    {
      path:'/',
      name:'HelloWorld',
      component:HelloWorld,
    },
    {
      path: '/allQuestions',
      name: 'AllQuestions',
      component: AllQuestions,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/questionDetails',
      name: 'QuestionDetails',
      component: QuestionDetails,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/hotQuestions',
      name: 'HotQuestions',
      component: HotQuestions,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/submitQuestions',
      name: 'SubmitQuestions',
      component: SubmitQuestions,
      meta:{
        requireAuth:true
      }
    },
  ]
});


// 前端登录拦截
// router.beforeEach(function (to, from ,next) {
//   if (to.matched.some(record => record.meta.requireAuth)) {
//     if (window.localStorage.hasOwnProperty('token')) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath} // 登录成功之后重新跳转到该路由
//       })
//     }
//   } else {
//     next()
//   }
// });

// router.beforeEach(function (to, from ,next) {
//   if (to.matched.some(record => record.meta.requireAuth)) {
//     this.$axios.post(to.fullPath).then(res =>{
//       if(res.status===200){
//         next();
//       }
//       else {
//         next({
//           path: '/login',
//           query: {redirect: to.fullPath} // 登录成功之后重新跳转到该路由
//         })
//       }
//     }) 
//   } 
//   else {
//     next()
//   }
// });

