<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <!-- 面包屑 -->
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table
      class="tb"
      border
      stripe
      :data="list"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="date"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="层级">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  }
}
</script>

<style>
  .box-card {
    height: 100%;
  }
  .tb {
    margin-top: 10px;
  }
</style>
