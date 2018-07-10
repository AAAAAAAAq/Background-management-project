export default {
  data () {
    return {
      // 后台返回数据
      list: [],
      // 加载提示
      loading: true,
      // 分页数据
      pagenum: 1,
      pagesize: 5,
      total: 0,
      searchVal: '',
      // 绑定表单数据
      FromData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editID: -1,
      // 控制显示添加用户弹出框
      AddFormVisible: false,
      // 控制显示编辑用户弹出框
      EditFormVisible: false,
      // 控制显示角色分配弹出框
      RightFormVisible: false,
      // 表单验证的规则
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' }, // 触发的条件 失去焦点
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度不小于6个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { type: 'number', message: '请输入正确的电话', trigger: 'blur' },
          { min: 8, max: 11, message: '请输入正确的电话', trigger: 'blur' }
        ]
      },
      // 分配角色需要数据
      currentUserName: '',
      currentRoleID: -1,
      currentUserID: -1,
      roles: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    // 分页事件
    handleSizeChange (val) {
      this.pagesize = val
      this.loadData()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.loadData()
    },
    handleSearch () {
      this.loadData()
    },
    async loadData () {
      // 发送异步请求之前
      this.loadding = true
      const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchVal}`)
      // 异步请求结束
      this.loading = false
      const data = res.data
      const {meta: { msg, status }} = data
      if (status === 200) {
        const {data: {users, total}} = data
        this.list = users
        this.total = total
      } else {
        this.$message.error(msg)
      }
    },
    // 修改用户状态
    async handleSwitchChange (user) {
      const res = await this.$http.put(`users/${user.id}/state/${this.mg_state}`)
      const data = res.data
      const {meta: { msg, status }} = data
      if (status === 200) {
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    },
    // 删除
    async handleDel (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        const res = await this.$http.delete(`users/${id}`)
        const data = res.data
        const { meta: { status, msg } } = data
        this.loadData()
        if (status === 200) {
          this.$message({
            type: 'success',
            message: msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加用户
    async handleAdd () {
      this.AddFormVisible = false
      const res = await this.$http.post('users', this.FromData)
      const data = res.data
      const {meta: { status, msg }} = data
      if (status === 201) {
        this.$message.success(msg)
        this.loadData()
        this.handleClear()
      } else {
        this.$message.error(msg)
      }
    },
    // 表单验证
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 获取编辑用户信息显示到弹出框
    async handleSerPer (user) {
      this.EditFormVisible = true
      this.editID = user.id
      const res = await this.$http.get(`users/${this.editID}`)
      this.FromData = res.data.data
    },
    // 编辑用户
    async handleEdit () {
      const res = await this.$http.put(`users/${this.editID}`, this.FromData)
      const data = res.data
      const {meta: { msg, status }} = data
      if (status === 200) {
        this.EditFormVisible = false
        this.$message.success(msg)
        this.loadData()
      } else {
        this.$message.error(msg)
      }
    },
    // 清除文本框
    handleClear () {
      for (const key in this.FromData) {
        this.FromData[key] = ''
      }
    },
    // 显示分配角色的弹出框信息
    async handlePerRights (user) {
      this.currentUserName = user.username
      this.currentUserID = user.id
      // 弹出框显示
      this.RightFormVisible = true
      // 获取所有角色信息
      const res = await this.$http.get('roles')
      this.roles = res.data.data
      // 根据用户id查询用户信息：角色id
      const res1 = await this.$http.get(`users/${user.id}`)
      this.currentRoleID = res1.data.data.rid
    },
    async handelSetRoles (user) {
      const res = await this.$http.put(`users/${this.currentUserID}/role`, {
        rid: this.currentRoleID
      })
      const data = res.data
      const { meta: { msg, status } } = data
      if (status === 200) {
        // 关闭弹出框
        this.RightFormVisible = false
        // 提示
        this.$message.success(msg)
        // 重置数据
        this.currentUserName = ''
        this.currentRoleID = -1
        this.currentUserID = -1
      } else {
        this.$message.error(msg)
      }
    }
  }
}
