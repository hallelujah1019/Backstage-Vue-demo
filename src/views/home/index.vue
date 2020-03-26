<template>
  <el-container>
    <el-aside class="navigation" :style="leftStyle">
      <!-- 左侧导航菜单 -->
      <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>-->
      <div class="menu-title" style="background-color:#2e2f32">
        <img src="../../assets/img/logo_admin.png" alt />
      </div>
      <el-menu
        style="width:188px"
        class="navigation"
        :collapse="isCollapse"
        background-color="#353b4e"
        text-color="#ffffff"
        active-text-color="#ffd04b"
      >
        <el-menu-item :style="submenuStyle" index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu :style="submenuStyle" index="2-1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">内容管理</span>
          </template>
          <el-menu-item index="2-1">发布文章</el-menu-item>
          <el-menu-item index="1-2">内容列表</el-menu-item>
          <el-menu-item index="1-3">评论管理</el-menu-item>
          <el-menu-item index="1-4">素材管理</el-menu-item>
        </el-submenu>

        <el-submenu :style="submenuStyle" index="3">
          <template slot="title">
            <i class="el-icon-star-on"></i>
            <span slot="title">粉丝管理</span>
          </template>
          <el-menu-item index="3-1">图文数据</el-menu-item>
          <el-menu-item index="2-2">粉丝概况</el-menu-item>
          <el-menu-item index="2-3">粉丝画像</el-menu-item>
          <el-menu-item index="2-4">粉丝列表</el-menu-item>
        </el-submenu>

        <el-menu-item :style="submenuStyle" index="4">
          <i class="el-icon-s-custom"></i>
          <span slot="title">账户信息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 大容器 -->
    <el-container>
      <el-header>
        <el-button @click="abc">mmda</el-button>
        <home-header></home-header>
      </el-header>
      <el-main>
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 引入头部组件
import homeHeader from '../../components/home-header'

export default {
  components: {
    'home-header': homeHeader
  },
  data () {
    return {
      leftStyle: {
        width: '189px',
        transition: 'all 0.6s'
      },
      // 优化折叠
      submenuStyle: {
        width: '189px'
      },
      isCollapse: false
    }
  },
  methods: {
    abc () {
      if (this.isCollapse === false) {
        this.isCollapse = true
        this.leftStyle.width = '65px'
        this.submenuStyle.width = '65px'
      } else {
        this.leftStyle.width = '188px'
        this.submenuStyle.width = '189px'
        this.isCollapse = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navigation {
  height: 100vh;
  overflow: hidden;
  .menu-title {
    padding: 8px 0;
    width: 187px;
    text-align: center;
    img {
      height: 30px;
    }
  }
}
</style>
