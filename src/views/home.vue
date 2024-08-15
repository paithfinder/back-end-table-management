<template>
  <el-container class="container">
    <!-- 侧边栏：封装组件 -->
  <el-aside width="200px" class="slideBar">
    <h4>乐购后台管理系统</h4>
    <slideBar ></slideBar>
  </el-aside>
  <el-container>
    <el-header class="header">
      <div class="text">欢迎:</div>
           
           <div class="text">admin</div>
           <img src="../static/个人.png" alt="" class="img">
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import slideBar from'@/components/slideBar.vue'

export default {
    name:"homePage",
    components:{
        slideBar
    },
    data(){
        return{
           
       
        
        }
    },
    mounted(){
 
    },
    methods:{
       
       
    }
    
}
</script>

<style scoped lang="less">
// .container{
//     display: flex;
    
    .slideBar{
        background-color: #545c64;
        height:100vh;
        h4{
            color:white;
            text-align: center;
        }
    }
//     .content{
//         flex:10;
        .header{
            height:7%;
            width:100%;
            display:flex;
            justify-content: end;
            align-items: center;
            background-color: #9c9c9c;
            .text{
                color:white;
                text-align: right;
                line-height:3rem;
            }
            .img{
                width:2rem;
                height:2rem;
                padding:1rem;
                
            }
        }
//         .main{
       
//         }

//     }
// }
</style>