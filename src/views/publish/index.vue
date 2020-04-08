<template>
  <div class="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发布文章</span>
      </div>
      <!-- ----------------------------------------- -->
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <!-- ----------------------------------------- -->
        <el-form-item label="内容">
        <!-- 富文本编辑器 -->
          <quill-editor style="height:288px ; marginBottom: 68px" v-model="article.content" ref="myQuillEditor" :options="editorOption"></quill-editor>
        </el-form-item>
        <!-- ----------------------------------------- -->
        <el-form-item label="频道">
          <el-select placeholder="请选择频道" v-model="article.channel_id">
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="channel in channels"
              :key="channel.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- ----------------------------------------- -->
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- ----------------------------------------- -->
        <el-form-item>
          <el-button type="primary" @click="onSumbmit(false)">发表</el-button>
          <el-button @click="onSumbmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 加载富文本编辑器的样式文件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 加载富文本编辑器的核心组件
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'PublishIndex',
  components: {
    quillEditor
  },
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        },
        channel_id: '' // 频道id
      },
      channels: [], /// 频道列表数组
      editorOption: {} // 富文本编辑器的配置选项对象
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    // 获取频道列表
    loadChannels () {
      // 有些接口需要 token，有些接口不需要 token
      // 是否需要，应该由接口文档指示
      this.$axios({
        method: 'GET',
        url: '/channels'
      })
        .then(res => {
          this.channels = res.data.data.channels
        })
        .catch()
    },
    onSumbmit (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        // // Headers参数
        // headers: {
        //   // 接口中说明的 Content-Type application/json 不需要传递
        //   // 因为 axios 会自动添加发送 Content-Type application/json
        //   Authorization: `Bearer ${window.localStorage.getItem('user_token')}`
        // },
        // Query参数
        params: {
          draft
        },
        // Body参数
        data: this.article
      })
        .then(() => {
          if (draft) {
            this.$message({ message: '以存入草稿', type: 'success' })
          } else {
            this.$message({ message: '发布成功', type: 'success' })
          }
          // this.$router.push('/article')
        })
        .catch()
    }
  }
}
</script>

<style>
</style>
