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
            <!-- 接口要求，不传为全部 -->
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
          <el-select placeholder="请选择频道" v-model="filterForm.channel_id">
            <el-option label="所有频道" value="null"></el-option>
            <el-option value="aaa"></el-option>
          </el-select>
        </el-form-item>
        <!-- ------------- -->
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="rangeDate"
            type="daterange"
            range-separator="——"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <!-- ------------- -->
        <el-form-item>
          <!-- 点击查询按钮：重新发请求获取筛选数据，新查询的数据肯定从第 1 页开始 -->
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin : 23px 0 23px 0">
      <div slot="header" class="clearfix">
        <span>共找到{{total_count }}条符合条件的内容</span>
      </div>
      <el-table :data="articles" style="width: 100%">
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
        <el-table-column prop="pubdate" label="发布日期" align="center"></el-table-column>
        <el-table-column prop="address" label="操作" align="center"></el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
      style="textAlign: center;"
      background
      @size-change="onPageSizeChange"
      @current-change="onPageChange"
      :page-sizes="[10, 11]"
      :page-size="page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total_count"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'ArticleIndex',
  data () {
    return {
      // 过滤数据的表单
      filterForm: {
        status: null,
        channel_id: null,
        begin_pubdate: '',
        end_pubdate: ''
      },
      // 日期范围（开始时间，结束时间）
      rangeDate: '',
      // 数据总条数
      total_count: 0,
      // 每页条数
      page_size: 10,
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
      ]
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    // 请求数据
    loadArticles (page = 1, pageSize) {
      const token = window.localStorage.getItem('user_token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        headers: {
          Authorization: `Bearer ${token}`
        },
        // Query参数使用params传递
        params: {
          page, // 页码
          per_page: pageSize// 每页大小
        }
      })
        .then(res => {
          this.total_count = res.data.data.total_count
          this.articles = res.data.data.results
        })
        .catch()
    },
    // 点击获取当前页数 和 点击获取每页条数 具体看elementUI
    onPageChange (page) {
      const pageSize = this.page_size
      this.loadArticles(page, pageSize)
    },
    onPageSizeChange (pageSize) {
      this.page_size = pageSize
      this.loadArticles(1, pageSize)
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
