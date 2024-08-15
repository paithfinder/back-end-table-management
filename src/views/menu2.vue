<template>
    <div class="home">
        <!-- 查询和新增 -->
        <div class="add">
            <div>
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="search" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>

                </el-form>
            </div>
            <div class="right">
                <div class="text" @click="showDialog()">+ 新增快报</div>
                <div> <i class="el-icon-download" @click="downloadTable"></i></div>
            </div>

            <form-item ref="formDialog" @addData="handleAdd" @changeTable="handleTable" @alter="getData"></form-item>

        </div>

        <!-- 表格 -->
        <div class="table">
            <el-table border style="width: 100%" height="25rem" :data="tableData">
                <el-table-column fixed prop="name" label="标题" width="150" align="center">
                </el-table-column>
                <el-table-column prop="source" label="来源" width="150" align="center">
                </el-table-column>
                <el-table-column prop="content" label="内容" width="50" align="center">
                    <template slot-scope="scope">
                        <el-popover placement="right" trigger="click" title="内容"
                            :content=delTag(scope.row.content)>
                            <el-button @click=" handleClick(scope.row)" type="text" size="small"
                            slot="reference">查看</el-button>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column prop="create_time" label="创建时间" width="250" align="center">
                </el-table-column>
                <el-table-column prop="weight" label="权重" width="120" align="center">
                </el-table-column>
                <el-table-column prop="is_active" label="是否可用" width="120" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.is_active" active-color="#13ce66" inactive-color="#ff4949"
                            @change="handleSwitch(scope.row)">

                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <div class="actionBox">
                            <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" round
                                size="small">编辑</el-button>
                            <el-button type="danger" round size="small"
                                @click.native.prevent="deleteRow(scope.$index, scope.row, tableData)">删除</el-button>

                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="picture" label="图片" width="120" align="center">
                    <el-upload class="upload-demo" action="#" :on-preview="handlePreview" :on-remove="handleRemove"
                        :on-change="changeFile" :file-list="fileList" list-type="picture" :auto-upload="false">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-table-column>
            </el-table>

        </div>
        <el-pagination class="pagination" background :hide-on-single-page="false"
            layout="prev, pager, next,jumper, ->, total, slot" :total="count" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-size="10">
        </el-pagination>
    </div>
</template>

<script>
import { getTable, deleteTable, findTable, changeTable, addMedia, downLoadFile } from '@/api/table'
import formItem from '../components/formItem.vue'
export default {
    name: 'menuTwo',
    components: {
        formItem
    },
    data() {

        return {
            currentPage: 1,
            pageSize: 5,
            count: 0,
            tableData: [],
            fileList: [],
            formInline: {
                region: ''
            },
            search: '',
            imgUrl: ''

        }
    },
    methods: {
        showDialog() {
            this.$refs.formDialog.open()
        },
        // uploadImg(row) {
        //     console.log(row)
        //     console.log(row.id)
        //     this.tableData = this.tableData.map(e => {
        //         if (e.id === row.id) {
        //             this.imgUrl ? e.imgUrl = this.imgUrl : e
        //             return { ...e, ...row }
        //         }
        //         return e
        //     })
        //     console.log(this.tableData)
        // },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        downloadTable() {

            const now = new Date()
            const year = now.getFullYear()
            console.log(year)
            downLoadFile(
                this.currentPage,
                this.pageSize,
                year
            ).then(res => {
                console.log(res.data)
                const blob = new Blob([res.data]);
                const url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'filename.xls';
                document.body.appendChild(a);
                a.click(); // 调用 click 方法
                document.body.removeChild(a); // 立即移除 <a> 标签
                window.URL.revokeObjectURL(url); // 清理创建的URL对象
            }).catch(error => {
                console.log(error)
            })

        },
        changeFile(file) {
            console.log(file)
            const formData = new FormData
            formData.append('content', file.raw)
            addMedia(
                formData
            ).then(res => {
                console.log(res.data.data)

            }).catch(err => {
                console.log(err)
            })
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage // 每次点击分页按钮，当前页发生变化
            this.getData()
            console.log(this.currentPage);
        },
        onSubmit() {
            console.log('submit!');
            console.log(this.search)
            findTable(
                {
                    name: this.search,
                    page: 1

                }).then(res => {
                    console.log(res.data.data.results)
                    this.tableData = res.data.data.results
                }).catch(error => {
                    console.log(error)
                })
        },
        handleSwitch(row) {
            console.log(row, 'hah')
            // 修改开关状态
            changeTable(row.id, row).then(res => {

                console.log(res)
            }).catch((error) => {
                console.log(error)
            })
        },
        getData() {
            getTable({ page: this.currentPage }).then(res => {
                console.log(res.data.data.results);
                this.tableData = res.data.data.results
                this.count = res.data.data.count


            }).catch(error => {
                // 处理错误情况
                console.error('Login request failed:', error);
                if (error.response) {
                    // 服务器返回了错误状态码
                    console.error('Status:', error.response.status);
                    console.error('Data:', error.response.data);
                }
            });
        },
        //移除HTML标签
        delTag(str) {
            return str.replace(/<[^>]+>/g, "");
        },
        handleClick(row) {
            console.log(row)
        },
        handleAdd(row) {
            this.getData()
            this.tableData.unshift(row)


        },
        handleVisible(flag) {
            console.log(flag)
            this.dialogFormVisible = flag
        },
        deleteRow(index, rows) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                deleteTable(rows.id).then(res => {
                    console.log(res)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getData()
                }).catch((error) => {
                    console.log(error)
                })

            }).catch(() => {

            })
        },

        handleEdit(index, row) {
            // console.log(row)
            console.log(index, row);
            this.$refs.formDialog.open(row)

        },
        handleTable(form) {

            this.tableData = this.tableData.map(e => {
                if (e.id === form.id) {
                    return { ...e, ...form };
                }
                return e;
            });

        },





    },
    mounted() {
        this.getData()
    }
}
</script>

<style lang="less" scoped>
.home {
    padding: 3rem 3rem 0 3rem;
    box-sizing: border-box;
    height: 100%;
    position: relative;

    .add {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .right {
            display: flex;

            .text {
                color: #2c90ff;
                font-weight: bold;
            }
        }
    }

}

.actionBox {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}


::v-deep .el-form-item__label {
    text-align: right !important;
}

.pagination {
    position: absolute;
    bottom: 10px;
    text-align: center;
    box-sizing: border-box !important;
}

.el-icon-download {
    margin-left: 1rem;
    transform: scale(2);
    color: #66b1ff;
}
</style>