<template>
  <div>
    <el-card class="comment">
      <div slot="header" class="clearfix">
        <span>评论管理</span>
      </div>
      <!-- ------------------------- -->
      <el-table
        :data="articles"
        v-loading="loading"
        element-loading-text="拼命加载中"
        style="width: 100%"
      >
        <el-table-column prop="title" label="标题" width="466" align="center"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数" align="center"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数据" align="center"></el-table-column>
        <el-table-column label="评论状态" width="200" align="center">
          <template slot-scope="scope">
            <!-- 开关组件绑定的数据是一个布尔值，它会根据布尔值的真假来决定开关状态 -->
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onStatusChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!-- 跳转评论列表 -->
            <el-button type="primary" @click="$router.push('/comment/' + scope.row.id)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- ------------------------- -->
    <el-pagination
      style="textAlign:center ; marginTop:20px"
      background
      layout="prev, pager, next"
      :total="totalCount"
      @current-change="onPageChange"
      :disabled="loading"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  // 组件的 name 最好起名为两个单词，尽量少用一个单词
  // 为什么？为了避免和原生的 html 标签冲突
  name: 'CommentIndex',
  data () {
    return {
      articles: [], // 文章的评论列表
      totalCount: 0, // 评论列表总条数
      loading: true // 表格的 loading 状态
    }
  },
  created () {
    this.loadArticles(1)
  },
  methods: {
    // 获取评论管理列表
    loadArticles (page = 1) {
      // 加载 loading
      this.loading = true

      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment',
          page,
          per_page: 10
        }
      })
        .then(res => {
          this.articles = res.data.data.results
          this.totalCount = res.data.data.total_count
        })
        .catch()
        .finally(() => {
          // 无论成功还是失败，最终都要执行
          // 停止 loading
          this.loading = false
        })
    },
    // 修改评论状态
    onStatusChange (article) {
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: article.id.toString()
        },
        data: {
          // 开关组件双向绑定了 article.comment_status
          // 所以获取 article.comment_status 也就是在获取开关组件的启用状态
          allow_comment: article.comment_status
        }
      })
        .then(res => {
          this.$message({
            type: 'success',
            message: `${article.comment_status ? '启用' : '关闭'}成功`
          })
        })
        .catch(() => {
          this.$message.error('操作失败')
        })
    },
    // --------------------
    onPageChange (page) {
      this.loadArticles(page)
    }
  }
}
</script>

<style>
</style>
