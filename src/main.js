// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.css'
import MyAxios from './plugin/MyAxios'
import moment from '../node_modules/moment'

Vue.config.productionTip = false

Vue.filter('fmtDate', (value, fmstr) => {
  return moment(value).format(fmstr)
})
Vue.use(ElementUI)
Vue.use(MyAxios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
