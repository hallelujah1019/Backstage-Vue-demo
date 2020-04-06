<template>
  <el-container>
    <!-- 运用ElementUI的布局容器 -->
    <!-- 左侧容器 -->
    <el-aside class="navigation" :style="leftStyle">
      <!-- logo图片 -->
      <div class="menu-title" style="background-color:#2e2f32">
        <i class="el-icon-platform-eleme"></i>
        <img src="../../assets/img/logo_admin.png" alt />
      </div>
      <!-- 导航菜单 -->
      <el-menu
        style="width:188px"
        class="navigation"
        :collapse="isCollapse"
        background-color="#353b4e"
        text-color="#ffffff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item :style="submenuStyle" index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu :style="submenuStyle" index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">内容管理</span>
          </template>
          <el-menu-item index="/publish">发布文章</el-menu-item>
          <el-menu-item index="/article">内容列表</el-menu-item>
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
      <!-- 头部容器 调用头部容器子组件 -->
      <el-header>
        <layout-header @foldMetod="fold"></layout-header>
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
import layoutHeader from '../../components/layout-header'

export default {
  // 在实例中使用 components 属性注册需要用到的组件
  components: {
    'layout-header': layoutHeader
  },
  data () {
    return {
      // 优化折叠  让左侧容器 width改变 这样主页所有容器才能改变
      leftStyle: {
        width: '189px',
        transition: 'all 0.6s'
      },
      // 同上
      submenuStyle: {
        width: '189px'
      },
      // 折叠开关
      isCollapse: false
    }
  },
  methods: {
    // 折叠方法  比较笨
    fold () {
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
  height: 98em;
  overflow: hidden;
  .menu-title {
    padding: 8px 0;
    width: 187px;
    padding-left: 14px;
    i {
      font-size: 36px;
      color: #ffffff;
    }
    img {
      // 尽量让他们中线对齐
      vertical-align: top;
      height: 30px;
      margin: 3px;
    }
  }
}
</style>
