<template>
  <!-- 头部组件 el-row布局 -->
  <el-row type="flex" justify="space-between" align="middle">
    <!-- 左侧 -->
    <el-col :span="6" class="left">
      <!-- 左侧 -->
      <i :class="{'el-icon-s-fold ':foldSwitch , 'el-icon-s-unfold':unfoldSwitch}" @click="fold"></i>
      <span>世界因为你而美丽</span>
    </el-col>
    <!-- 右侧 -->
    <el-col :span="3" class="right">
      <!-- 头像 -->
      <img width="50" :src="user.photo" />
      <!-- 下拉菜单 -->
      <span>{{ user.name }}</span>
      <el-dropdown trigger="click" placement="bottom-start">
        <i class="el-icon-s-tools" ></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$router.push('/account')">账户信息</el-dropdown-item>
          <el-dropdown-item @click.native="gitHttp">git地址</el-dropdown-item>
          <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
import eventBus from '@/utils/event-bus'
export default {
  data () {
    return {
      user: {
        name: '', // 用户昵称
        photo: '' // 用户头像
      },
      // 展开开关
      foldSwitch: true,
      // 关闭开关
      unfoldSwitch: false
    }
  },
  created () {
    this.loadUser()

    // 在初始化中监听自定义事件
    eventBus.$on('update-user', user => {
      // this.user = user
      this.user.name = user.name
      this.user.photo = user.photo
    })
  },
  methods: {
    // 调用父组件（home.vue）的折叠方法
    fold () {
      this.$emit('foldMetod')
      // 折叠图标和展开图标之间的切换
      if (this.foldSwitch === true) {
        this.foldSwitch = false
        this.unfoldSwitch = true
      } else if (this.foldSwitch === false) {
        this.foldSwitch = true
        this.unfoldSwitch = false
      }
    },
    // 获取用户个人信息
    loadUser () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        this.user = res.data.data
      }).catch(() => {
        this.$message.error('获取数据失败')
      })
    },
    // git地址
    gitHttp () {
      window.location.href = 'https://github.com/hallelujah1019'
    },
    // 退出
    onLogout () {
      this.$confirm('确认退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除token，调到登录页
        window.localStorage.removeItem('user_token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>
<style lang='less' scoped>
.left {
  display: flex;
  align-items: center;

  i {
    font-size: 24px;
  }

  span {
    margin-left: 4px;
  }
}

.right {
  display: flex;
  align-items: center;

  img {
    border-radius: 100%;
    margin-right: 5px;
  }
  i {
    vertical-align: middle;
    font-size: 20px;
    margin-left: 10px;
  }
}
</style>
