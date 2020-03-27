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
      <img width="50" src="../assets/img/jlq.png" />
      <!-- 下拉菜单 -->
      <span>你的小琳吖</span>
      <el-dropdown trigger="click" placement="bottom-start">
        <i class="el-icon-s-tools" ></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>账户信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      // 展开开关
      foldSwitch: true,
      // 关闭开关
      unfoldSwitch: false
    }
  },
  methods: {
    fold () {
      // 调用父组件（home.vue）的折叠方法
      this.$emit('foldMetod')
      // 折叠图标和展开图标之间的切换
      if (this.foldSwitch === true) {
        this.foldSwitch = false
        this.unfoldSwitch = true
      } else if (this.foldSwitch === false) {
        this.foldSwitch = true
        this.unfoldSwitch = false
      }
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
