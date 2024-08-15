<template>
  <div class="container">
    <div class="title">
      <h1>欢迎进入乐购后台管理系统</h1>
    </div>
    <div class="loginBox">
      <div class="header">
        <h3>登录</h3>
      </div>
      <div class="content">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="name">
            <el-input v-model="ruleForm.username" placeholder="请输入你的昵称"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入你的密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" size="mini">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getLoginData } from '@/api/login'
import { validate } from '@/api/validate'
import md5 from "js-md5"
export default {
  name: "loginPage",
  data() {

    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('昵称不能为空！'));
      } else {
        if (this.ruleForm.checkName !== '') {
          this.$refs.ruleForm.validateField('checkName');
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空！'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };

    return {
      ruleForm: {
        username:'',
        password: "",
      },
      rules: {
        pass: [

          { validator: validatePass, trigger: 'blur' }
        ],
        name: [
          { validator: validateName, trigger: 'blur' }
        ]


      },
      loginObj: {},
      hashkey:'',
      img_url:'',
      // username:'RTYL',
      // password: "RTYL8888",


    }
  },
  mounted() {
   

  },
  methods: {
    submitForm(formName) {
      console.log(formName)
      validate().then(res => {
     console.log(res.data.data);
     const data=res.data.data;
     this.hashkey=data.hashkey;
     this.img_url=data.image_url;
    this.login()
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
    login(){
      getLoginData({
      username: this.ruleForm.username,
      password:md5(this.ruleForm.password),
      captcha: this.img_url,
      hashkey: this.hashkey,
    }).then(res => {
      if(res){
        console.log(res.data.data)
        localStorage.setItem('token',res.data.data.token)
        this.$message({
          showClose: true,
          message: '恭喜你，登录成功',
          type: 'success',
          duration:500
        });
        this.$router.push('/home')
      }
    }).catch(error => {
      if (error.response) {
        // 服务器返回了错误状态码
        console.log(error.response.data.data.error);
        const errorMsg = error.response.data.data.error
        this.$message({
          showClose: true,
          message: errorMsg,
          type: 'error',
          duration:1000
        });
      }
    });

    }
  }
}
</script>

<style scoped lang="less">
.container {
  background-image: url('/src/static/登录页背景.jpg');
  object-fit: cover;
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  // filter: blur(0.1rem);
  .loginBox {
    width: 20%;
    height: 35%;
    background-image: linear-gradient(109.6deg, rgba(0, 51, 102, 0.8) 11.2%, rgba(187, 187, 187, 0.8) 91.1%);

    padding: 1rem;
    box-sizing: border-box;

    .header {
      width: 100%;
      height: 2rem;

      h3 {
        margin: 0;
        text-align: center;
        line-height: 2rem;
      }
    }

    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;

    }

  }

  .title {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%; 0);
  }
}

::v-deep .el-form-item__label {
  text-align: center !important;
  width: 4rem !important;
}

::v-deep .el-form-item__content {
  margin-left: 0 !important;
  text-align: center;
}
</style>
