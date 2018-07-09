<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 面包屑 -->
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>
  .box-card {
    height: 100%;
  }
</style>
