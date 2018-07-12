<template>
  <el-container class="container">
    <el-header class="header">
        <!-- 栅格系统 -->
        <el-row>
            <el-col :span="4">
                <img src="/static/logo.png" alt="">
            </el-col>
            <el-col class="middle" :span="19">
                <h2>电商后台管理系统</h2>
            </el-col>
            <el-col :span="1">
                <a class="logout" @click.prevent="handleLogout" href="#">退出</a>
            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside class="aside" width="200px">
            <!-- 侧边栏 -->
            <el-menu
          :router="true"
          :unique-opened="true"
          class="menu">
          <!-- 一级菜单 -->
          <el-submenu
            v-for="item in menus"
            :key="item.id"
            :index="item.id + ''">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              v-for="item1 in item.children"
              :key="item1.id"
              :index="'/' + item1.path">
              <i class="el-icon-menu"></i>
              {{ item1.authName }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
        </el-aside>
        <el-main class="main">
            <!-- 给匹配路由的组件站位 -->
            <router-view></router-view>
        </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menus: []
    }
  },
  // 判断是否登录
  beforeCreate () {
    const token = sessionStorage.getItem('token')
    if (!token) {
      this.$router.push({ name: 'login' })
      this.$message.warning('请先登录')
    }
  },
  created () {
    // 加载当前角色的权限列表
    this.loadData()
  },
  methods: {
    async loadData () {
      const { data: resData } = await this.$http.get('menus')
      const { data, meta: { msg, status }} = resData
      if (status === 200) {
        this.menus = data
      }else{
        this.$message.error(msg)
      }
    },
    handleLogout () {
      sessionStorage.clear()
      this.$router.push({name: 'login'})
      this.$message.success('退出成功')
    }
  }
}
</script>

<style>
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
  padding: 0;
}

.header .middle {
  line-height: 60px;
  color: #fff;
  text-align: center;
}

.header .logout {
  line-height: 60px;
  text-decoration: none;
  color: orange;
}

.aside {
  background-color: #d3dce6;
}

.aside .menu {
  height: 100%;
}

.main {
  background-color: #e9eef3;
}

</style>
