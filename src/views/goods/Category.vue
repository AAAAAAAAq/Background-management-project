<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品分类"></my-breadcrumb>
    <!-- 按钮 -->
    <el-row>
      <el-col :span="24" class="btn">
        <el-button>添加分类</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      border
      stripe
      :data="list"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="cat_name"
        label="分类名称">
      </el-table-column>
      <el-table-column
        prop="cat_level"
        label="级别">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-else-if="scope.row.cat_level === 1">二级</span>
          <span v-else-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_deleted"
        label="是否有效">
        <template slot-scope="socpe">
          {{socpe.row.cat_deleted ? '无效': '有效'}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain ></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain ></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain ></el-button>
        </template>
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
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const { data: resData } = await this.$http.get('categories?type=3')
      const { data } = resData
      this.list = data
    }
  }
}
</script>

<style>
  .btn {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
