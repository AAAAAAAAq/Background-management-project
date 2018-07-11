<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="权限管理" level2="角色列表"></my-breadcrumb>
    <el-row>
      <el-col :span="24" class="btn">
        <el-button>添加角色</el-button>
      </el-col>
    </el-row>
    <el-table
      class="tb"
      height="500"
      border
      stripe
      :data="list"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="role"
        label="角色描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
        label="操作">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>
  .btn {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
