<template>
    <el-dialog :title="actionName" width="80%" :visible.sync="dialogFormVisible" size="mini" :destory-on-close="true" >
        <div class="box">
            <el-form :model="form" label-width="70px">
            <el-form-item label="标题" prop="name"   :rules="[
                { required: true, message: '标题不能为空', trigger: 'blur' }
            ]">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="来源" prop="source"  :rules="[
                { required: true, message: '来源不能为空', trigger: 'blur' },
            ]">
                <el-input v-model="form.source"></el-input>
            </el-form-item>

            <el-form-item label="权重" prop='weight' >
                <el-input-number v-model="form.weight" @change="handleChange" :min="1" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="内容" prop='content'  :rules="[
                { required: true, message: '内容不能为空', trigger: 'blur' },
            ]">
                <test-item  
                @changeText="handleText" 
                :value="form.content"
                >
            </test-item>
            </el-form-item>

        </el-form>
        <div  class="dialog-footer">
            <el-button @click="changeVisible">取 消</el-button>
            <el-button type="primary" @click="submitForm(form)">确 定</el-button>
        </div>
        </div>
     
    </el-dialog>
</template>

<script>
import { addTable,changeTable } from '@/api/table';
import testItem from "@/components/testItem.vue"

export default {
  components: { testItem },
    name: 'dialogeItem',
    component() {
        testItem
    },
    data() {
        return {
            dialogFormVisible: false,
     
            actionName: '编辑快报',
            form: {
                name: '',
                source: '',
                content: '',
                weight: 1,
                is_active: true,
            },
            formLabelWidth: '10rem',
          
        }
    },
    methods: {
        open(row) {
            if (row) {
                this.dialogFormVisible = true;
                this.$nextTick(()=>{
                    Object.assign(this.form, row)
                })
                console.log(row.content)
                this.actionName = '编辑快报'                
            } else {
                this.dialogFormVisible = true;
                this.form = this.$options.data().form
                this.actionName = '新增快报'
           
            }
      
            
        },
        handleChange(value) {
            console.log(value);
        },
        handleText(text){
            this.form.content = text
        },
        submitForm(form) {
            if (this.actionName == '新增快报') {
                console.log(form);
                console.log(this.getCurrentDateTime())
              
                const tableItem = {
                    id: form.id,
                    name: form.name,
                    source: form.source,
                    content: form.content,
                    create_time: this.getCurrentDateTime(),
                    weight: form.weight,
                    is_active: form.is_active
                }

                if (Object.values(tableItem).includes('')) {
                    this.$message.error('内容不能为空');

                } else {
                    this.addRow(tableItem)
                    this.$emit("addData", tableItem)
                    this.dialogFormVisible = false

                }

            } else {
                this.$emit('changeTable', form)
                changeTable(form.id,form).then(res=>{
             
                console.log(form.content)
                console.log(res)
                this.$emit('alter')
            }).catch((error)=>{
                console.log(error)
            })
                this.dialogFormVisible = false
                console.log(form.id)
            }



        },
        changeVisible() {

            this.dialogFormVisible = false
        },
        getCurrentDateTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = ('0' + (now.getMonth() + 1)).slice(-2);
            const day = ('0' + now.getDate()).slice(-2);
            const hours = ('0' + now.getHours()).slice(-2);
            const minutes = ('0' + now.getMinutes()).slice(-2);
            const seconds = ('0' + now.getSeconds()).slice(-2);
            return this.time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        addRow(obj) {
            addTable(obj).then(res => {
                console.log(res.data.data)
                this.$emit('alter')
            }).catch(error => {
                if (error.response) {
                    // 服务器返回了错误状态码
                    console.error('Status:', error.response.status);
                    console.error('Data:', error.response.data);
                }
            })
        }
    },
    beforeDestroy(){
        
    }
}
</script>

<style scoped lang="less">
::v-deep .dialog-footer {
    display: flex !important;
    justify-content: space-between !important;
    padding: 0 5rem 0 5rem;
    box-sizing: border-box;
}
.box{
    height: 400px;
    overflow-y: scroll;
}
</style>