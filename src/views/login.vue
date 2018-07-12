<template>
  <div class="login-wrap">
    <el-form label-position="top" label-width="80px" :model="formDate" class="login-form">
      <h2>用户登录</h2>
  <el-form-item label="用户名">
    <el-input v-model="formData.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formData.password" type="password" @keyup.enter.native="handleLogin"></el-input>
  </el-form-item>
 <el-button type="primary" class="login-btn" @click="handleLogin">登录</el-button>
</el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      const res = await this.$http.post('login', this.formData)
      // 相当于写在构造函数中
      const data = res.data
      const {meta: { status, msg }} = data
      if (status === 200) {
        this.$message.success(msg)
        const {data: {token}} = data
        sessionStorage.setItem('token', token)
        this.$router.push({name: 'home'})
      } else {
        this.message.error(msg)
      }
    }
  }
}
</script>

<style>
  .login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}

.login-wrap .login-form .login-btn {
  width: 100%;
}
</style>
