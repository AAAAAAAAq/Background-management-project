import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/home.vue'
import Users from '../views/users/Users.vue'
import Rights from '../views/roles/Rights.vue'
import Roles from '../views/roles/Roles.vue'
import Category from '../views/goods/Category.vue'
import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: '/users',
          component: Users
        },
        {
          name: 'rights',
          path: '/rights',
          component: Rights
        },
        {
          name: 'roles',
          path: '/roles',
          component: Roles
        },
        {
          name: 'category',
          path: '/categories',
          component: Category
        }
      ]
    }
  ]
})

// 路由的前置守卫
router.beforeEach((to, from, next) => {
  // 判断当前访问的路由是否是login，如果是 next()
  if (to.name === 'login') {
    next()
  } else {
    // 判断有没有token
    const token = sessionStorage.getItem('token')
    if (!token) {
      // 跳转到登录页
      router.push({ name: 'login' })
      // 提示用户登陆
      Message.warning('请先登录')
      return
    }
  }
  next()
})
export default router
