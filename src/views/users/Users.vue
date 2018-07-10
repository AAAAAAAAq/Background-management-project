<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 面包屑 -->
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <el-row class="seachArea">
      <el-col :span="24">
        <el-input v-model="searchVal" clearable placeholder="请输入内容" class="searchInput">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
     <el-table
      v-loading = "loading"
      stripe
      border
      :data="list"
      style="width: 100%">
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="username"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_time | fmtDate('YYYY-MM-DD HH:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态">
      <template slot-scope="scope">
        <el-switch
          @change="handleSwitchChange(scope.row)"
          v-model="scope.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
      <!-- 分页 -->
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagenum"
    :page-sizes="[5,10,15,20]"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: true,
      pagenum: 1,
      pagesize: 5,
      total: 0,
      searchVal: ''
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    // 分页事件
    handleSizeChange(val) {
      this.pagesize = val
      this.loadData()
    },
    handleCurrentChange(val) {
      this.pagenum = val
      this.loadData()
    },
    handleSearch() {
      this.loadData()
    },
    async loadData () {
      // 发送异步请求之前
      this.loadding = true
      // 发送请求前获取token
      const token = sessionStorage.getItem('token')
      // 在请求头中设置token
      this.$http.defaults.headers.common['Authorization'] = token
      const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchVal}`)
      // 异步请求结束
      this.loading = false
      const data = res.data
      const {meta: { msg, status }} = data
      if (status === 200) {
        const {data: {users, total}} = data
        this.list = users
        this.total = total
      } else {
        this.$message.error(msg)
      }
    },
    async handleSwitchChange(user) {
      console.log(1);
      
      const res = await this.$http.put(`users/${user.id}/state/${this.mg_state}`)
      const data = res.data
      const {meta: { msg, status }} = data
      if(status === 200){
        this.$message.success(msg)
      }else{
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style>
  .box-card {
    height: 100%;
  }
  .seachArea {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .seachArea .searchInput{
    width: 350px;
  }
</style>
