import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/home.vue'
import Users from '../views/users/Users.vue'
import Rights from '../views/roles/Rights.vue'

Vue.use(Router)

export default new Router({
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
        }
      ]
    }
  ]
})
