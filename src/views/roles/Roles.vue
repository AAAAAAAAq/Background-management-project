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
        type="expand"
        width="50">
        <template>
  
        </template>
      </el-table-column>
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
        prop="roleDesc"
        label="角色描述"
        width="180">
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
  created() {
    this.loadData()
  },
  methods: {
    // 加载角色列表
    async loadData(){
      // resData是服务器返回的数据 
      const { data: resData } = await this.$http.get('roles')
      // 解析 data status msg
      const { data, meta: { status, msg }} = resData
      if (status === 200) {
        this.list = data
      }else{
        this.$message.error(msg)
      }
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
