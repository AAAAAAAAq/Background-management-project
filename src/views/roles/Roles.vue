<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="权限管理" level2="角色列表"></my-breadcrumb>
    <el-row>
      <el-col :span="24" class="btn">
        <el-button>添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      class="tb"
      height="500"
      border
      stripe
      :data="list"
      style="width: 100%">
      <!-- 展开列 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 当前角色中的权限列表 -->
          <!-- scope.row 角色对象 roleName, roleDesc, children -->
          <!-- 一级权限 item1 -->
          <el-row
            class="level1"
            v-for="item1 in scope.row.children"
            :key="item1.id">
            <el-col :span="4">
              <!-- 显示一级权限 -->
              <el-tag @close="hanldeClose(scope.row, item1.id)" closable>{{ item1.authName }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <!-- 二级和三级权限 -->
            <el-col :span="20">
              <!-- 二级权限 -->
              <el-row
                v-for="item2 in item1.children"
                :key="item2.id">
                <el-col :span="4">
                  <!-- 显示二级权限 -->
                  <el-tag @close="hanldeClose(scope.row, item2.id)"  closable type="success">{{ item2.authName }}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <!-- 三级权限 -->
                  <el-tag
                    @close="hanldeClose(scope.row, item3.id)"
                    class="level3"
                    closable
                    type="warning"
                    v-for="item3 in item2.children"
                    :key="item3.id">
                    {{ item3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 没有权限的时候显示 -->
          <el-row v-if="scope.row.children.length === 0">
            <el-col :span="24">未分配权限</el-col>
          </el-row>
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
          <el-button type="success" icon="el-icon-check" size="mini" plain @click="handleShowRightDialog(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配权限的对话框 -->
    <el-dialog
      @open="hanldeOpenDialog"
      title="分配权限"
      :visible.sync="dialogVisible">
      <!-- 树形结构 
      data:提供树形数据
      props：设置数据中显示的属性
      分别通过default-expanded-keys和default-checked-keys设置默认展开和默认选中的节点。
      需要注意的是，此时必须设置node-key，其值为节点数据中的一个字段名，该字段在整棵树中是唯一的。-->
      <el-tree
        :data="treeData"
        :props="defaultProps"
        :default-checked-keys= "checkList"
        node-key= "id"
        show-checkbox
        default-expand-all>
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: true,
      // 控制显示分配权限的对话框
      dialogVisible: false,
      // 绑定树形结构数据
      treeData: [],
      // 配置要展示数据的哪个属性
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 获取选择节点的id
      checkList: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    // 加载角色列表
    async loadData () {
      this.loading = true
      // resData是服务器返回的数据
      const { data: resData } = await this.$http.get('roles')
      // 解析 data status msg
      const { data, meta: { status, msg } } = resData
      if (status === 200) {
        this.list = data
      } else {
        this.$message.error(msg)
      }
    },
    // 标签关闭事件
    async hanldeClose (role, rightId) {
      // roleId:角色对象
      // rightId:权限id
      const {data: resData} = await this.$http.delete(`roles/${role.id}}/rights/${rightId}`)
      const { data, meta: { status, msg } } = resData
      if (status === 200) {
        this.$message.success(msg)
        // 重新绑定当前角色children 权限
        role.children = data
      } else {
        this.$message.error(msg)
      }
    },
    // 打开对话框时执行
    async hanldeOpenDialog () {
      const { data: resData } = await this.$http.get('rights/tree')
      const { data } = resData
      this.treeData = data
    },
    // 点击按钮显示分配权限的对话框
    handleShowRightDialog (role) {
      this.dialogVisible = true
      // 获取当前角色所拥有的权限id
      // 遍历一级权限
      const arr = []
      role.children.forEach((item1) => {
        arr.push(item1.id)
        // 遍历二级权限
        item1.children.forEach((item2) => {
          arr.push(item2.id)
          // 遍历三级权限
          item2.children.forEach((item3) => {
            arr.push(item3.id)
          })
        })
      })
      this.checkList = arr
    }
  }
}
</script>

<style>
  .btn {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .row-add {
  margin-top: 10px;
  margin-bottom: 10px;
}
.level3 {
  margin-right: 5px;
  margin-bottom: 5px;
}
.level1 {
  margin-bottom: 10px;
}
</style>
