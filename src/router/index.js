import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/home.vue'
import Menu1 from '../views/menu1.vue'
import Menu2 from '../views/menu2.vue'
import Menu3 from '../views/menu3.vue'
import SubMenu1 from '../views/subMenu1.vue'
import SubMenu2 from '../views/subMenu2.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/login'},
  {path:'/login',component: Login},
  {
    path:'/home',
    component: Home,
    children:[
      {
        path:'/menu1',
        component:Menu1
      },
      {
        path:'/menu2',
        component:Menu2
      },
      {
        path:'/menu3',
        component:Menu3
      },
      {
        path:'/submenu1',
        component:SubMenu1
      },
      {
        path:'/submenu2',
        component:SubMenu2
      }
    ],
    
  },

  // {
  //   // path: '/about',
  //   // name: 'about',
  //   // // route level code-splitting
  //   // // this generates a separate chunk (about.[hash].js) for this route
  //   // // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 解决重复点击路由报错的问题
// 保存原有的路由跳转方法,如果不是相同路径的话就调用原有路由的跳转方法
let originPush = VueRouter.prototype.push;
 
// 重写路由跳转方法,第一个参数location是要跳转的路由 resolve和reject传递成功与失败
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //如果成功 调用原来的push方法  
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}
export default router
