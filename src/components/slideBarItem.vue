<template>
    <div>
        <template v-for="(item) in barList" >
            <el-submenu :index="item.link" v-if="item?.children?.length > 0" :key="item.id" >
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{ item.label }}</span>
                </template>
                <slide-bar-item :barList="item.children"></slide-bar-item>
            </el-submenu>
            <div v-else :key="item.id">
                <el-menu-item :index="item.link" :key="item.id">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{ item.label }}</span>
                </el-menu-item>
            </div>
        </template>
    </div>

</template>

<script>
import slideBarItem from './slideBarItem'
export default {
    name:'slide-bar-item',
    props: {
        barList: {
            type: Array,
            required: true,
            default: () => {
                return []
            }
        }
    },
    components:{
        slideBarItem
    }

}
</script>

<style></style>