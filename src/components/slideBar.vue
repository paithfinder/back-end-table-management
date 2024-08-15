<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b" router>
      <slide-bar-item :barList="barList"></slide-bar-item>
    </el-menu>

  </div>
</template>

<script>
import slideBarItem from './slideBarItem.vue';
export default {
  components:{
    slideBarItem
  },
  data(){
    return{
      activeIndex: '',
      barList:[
                {
                    id:1,
                    label:'老大',
                    link:'/menu1',
                    children:[
                        {
                            id:2,
                            label:'老大的大儿子',
                            link:'/submenu1',
                            address:"2-1",
                            children:[]
                        },
                        {
                            id:3,
                            label:'老大的二儿子',
                            link:'/submenu2',
                            address:"2-2"
                        }
                    ]
                },
                {
                    id:4,
                    label:'老二',
                    link:'/menu2'
                },
                {
                    id:5,
                    label:'老三',
                    link:"/menu3"
                }
            ],
    }
  },
  props:{
 
  },
  methods: {
     
    },
    created(){
      
    }
}
</script>

<style>

</style>