<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{this.level1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{this.level2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  name: 'MyBreadcrumb',
  props: ['level1', 'level2']
}
</script>

<style>

</style>
