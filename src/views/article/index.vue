<template>
  <div class="article">
    <!-- 筛选数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="文章状态">
          <!--
            单选框组会把选中的 radio 的 label 同步给绑定的数据
          -->
          <el-radio-group v-model="filterForm.status">
            <!--axios有个功能 当参数为null的时候，他就不发送了 接口要求，不传为全部 -->
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- ------------- -->
        <el-form-item label="频道列表">
          <!--
            下拉列表会把选中的 option 的 value 同步到数据中
          -->
            <channel-selecct v-model="filterForm.channel_id"></channel-selecct>
        </el-form-item>
        <!-- ------------- -->
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="rangeDate"
            type="daterange"
            range-separator="——"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <!-- ------------- -->
        <el-form-item>
          <!-- 点击查询按钮：重新发请求获取筛选数据，新查询的数据肯定从第 1 页开始 -->
          <el-button type="primary" @click="onQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 查找结果表格 -->
    <el-card style="margin : 23px 0 23px 0">
      <div slot="header" class="clearfix">
        <span>共找到{{total_count }}条符合条件的内容</span>
      </div>
      <el-table
        :data="articles"
        v-loading="loading"
        element-loading-text="拼命加载中"
        style="width: 100%"
      >
        <el-table-column prop="date" label="封面" width="180" align="center">
          <!-- 在template声明 slot-scope="scope" ， 然后就可以通过scope.row获取遍历项-->
          <template slot-scope="scope">
            <img width="50" height="50" :src="scope.row.cover.images[0]" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="460" align="center"></el-table-column>
        <el-table-column prop="address" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="articleStatus[scope.row.status].type"
            >{{ articleStatus[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期" align="center">
            <!--
              不传参：{{ scope.row.pubdate | dateFormat }}
              传参：{{ scope.row.pubdate | dateFormat(参数) }}
             -->
          <template slot-scope="scope">
            {{ scope.row.pubdate | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="danger" @click="onDelete(scope.row.id)">删除</el-button>
            <el-button type="primary" @click="$router.push('/publish/' + scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
      style="textAlign: center;"
      background
      :disabled="loading"
      @size-change="onPageSizeChange"
      @current-change="onPageChange"
      :current-page="page"
      :page-sizes="[10, 11]"
      :page-size="page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total_count"
    ></el-pagination>
  </div>
</template>

<script>
// import moment from 'moment'
import ChannelSelecct from '@/components/channel-select'
export default {
  name: 'ArticleIndex',
  components: {
    ChannelSelecct
  },
  data () {
    return {
      // 过滤数据的表单
      filterForm: {
        status: null,
        channel_id: null
      },
      // 日期范围（开始时间，结束时间）
      rangeDate: [],
      // 数据总条数
      total_count: 0,
      // 每页条数
      page: 1,
      page_size: 10,
      loading: true, // 表格的页面的加载状态
      // 文章数据列表
      articles: [],
      // 数据状态
      articleStatus: [
        {
          type: '',
          label: '草稿'
        },
        {
          type: 'warning',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'danger',
          label: '审核失败'
        },
        {
          type: 'info',
          label: '已删除'
        }
      ],
      // 频道列表
      channels: []
    }
  },
  created () {
    this.loadArticles(1)
  },
  // 局部过滤器
  // filters: {
  //   dateFormat (value) {
  //     console.log('dateFormat 被调用了')
  //     return moment(value).format('YYYY-Mo-Do HH:mm:ss ')
  //   }
  // },
  methods: {
    // 请求数据
    loadArticles (page = 1, pageSize) {
      // const token = window.localStorage.getItem('user_token')
      this.loading = true
      this.$axios({
        method: 'GET',
        url: '/articles',
        // headers: {
        //   Authorization: `Bearer ${token}`
        // },
        // Query参数使用params传递
        params: {
          page, // 页码
          per_page: pageSize, // 每页大小
          // 文章状态
          status: this.filterForm.status,
          // 频道列表
          channel_id: this.filterForm.channel_id,
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始时间
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 结束时间
        }
      })
        .then(res => {
          // 成功执行这里
          this.total_count = res.data.data.total_count
          // ---------
          // const articles = res.data.data.results
          // articles.forEach(item => {
          // // moment(指定时间).format('格式')
          //   item.pubdate = moment(item.pubdate).format('YYYY-Mo-Do HH:mm:ss ')
          // })
          // this.articles = articles
          this.articles = res.data.data.results
        })
        .catch() // 失败执行这里
        .finally(() => {
          // 无论成功还是失败都执行这里
          // 停止页面加载
          this.loading = false
        })
    },
    // 点击获取当前页数 和 点击获取每页条数 具体看elementUI
    onPageChange (page) {
      const pageSize = this.page_size
      this.page = page
      this.loadArticles(page, pageSize)
    },
    onPageSizeChange (pageSize) {
      this.page_size = pageSize
      this.loadArticles(1, pageSize)
    },
    // 查询按钮
    onQuery () {
      const pageSize = this.page_size
      this.page = 1
      this.loadArticles(1, pageSize)
    },
    onDelete (articleId) {
      this.$axios({
        method: 'DELETE',
        // /mp/v1_0/articles/:target
        // 注意：接口路径中的 :target 是一个路径参数，:target 是动态的，例如1、2、3，不要写 :
        url: `/articles/${articleId}` // 任何数据和字符串相加都会自动 toString
        // headers: {
        //   // 接口中说明的 Content-Type application/json 不需要传递
        //   // 因为 axios 会自动添加发送 Content-Type application/json
        //   Authorization: `Bearer ${window.localStorage.getItem('user_token')}`
        // }
      })
        .then(res => {
          // 删除成功，重新加载当前页码文章列表
          this.$message({ message: '删除成功', type: 'success' })
          // 重新加载数据列表
          this.loadArticles(this.page, this.page_size)
        })
        .catch()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
<style>
.article .el-card__header {
  border-bottom: 1px dashed #dedede;
}
</style>
