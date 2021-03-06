import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AllQuestions from '@/components/AllQuestions'
import Register from '@/components/Register'
import HotQuestions from '@/components/HotQuestions'
import QuestionDetails from '@/components/QuestionDetails'
import HelloWorld from '@/components/HelloWorld'
import SubmitQuestions from '@/components/SubmitQuestions'
import KnowledgeMap from '@/components/KnowledgeMap'
import Message from '@/components/Message'
import History from '@/components/History'
import MyQuestions from '@/components/MyQuestions'

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
    {
      path: '/knowledgeMap',
      name: 'KnowledgeMap',
      component: KnowledgeMap,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/history',
      name: 'History',
      component: History,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/myQuestions',
      name: 'MyQuestions',
      component: MyQuestions,
      meta:{
        requireAuth:true
      }
    },
  ]
});


// ??????????????????
// router.beforeEach(function (to, from ,next) {
//   if (to.matched.some(record => record.meta.requireAuth)) {
//     if (window.localStorage.hasOwnProperty('token')) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath} // ??????????????????????????????????????????
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
//           query: {redirect: to.fullPath} // ??????????????????????????????????????????
//         })
//       }
//     }) 
//   } 
//   else {
//     next()
//   }
// });

