<template>
  <div class="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ $route.params.articleId ?  "编辑文章" : "发布文章" }}</span>
      </div>
      <!-- ----------------------------------------- -->
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <!-- ----------------------------------------- -->
        <el-form-item label="内容">
        <!-- 富文本编辑器 -->
          <quill-editor style="height:388px ; marginBottom: 68px" v-model="article.content" ref="myQuillEditor" :options="editorOption"></quill-editor>
        </el-form-item>
        <!-- ----------------------------------------- -->
        <el-form-item label="频道">
          <!-- <el-select placeholder="请选择频道" v-model="article.channel_id">
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="channel in channels"
              :key="channel.id"
            ></el-option>
          </el-select> -->

          <!-- 自己封装一个频道列表组件 -->
          <channel-select v-model="article.channel_id" :includeAll="false"></channel-select>
        </el-form-item>
        <!-- ----------------------------------------- -->
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="2">双图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
           <template v-if="article.cover.type > 0">
            <el-row :gutter="200">
              <el-col :span="3" v-for="(item, index) in article.cover.type" :key="item">
                <!--
                  <UploadImage v-model="article.cover.images[0]"></UploadImage>
                    它得把选择的图片同步到数组的第1项
                  <UploadImage v-model="article.cover.images[1]"></UploadImage>
                    它得把选择的图片同步到数组的第2项
                  <UploadImage v-model="article.cover.images[2]"></UploadImage>
                    它得把选择的图片同步到数组的第3项

                  完整写法：
                    :value="article.cover.images[0]"
                    @input="article.cover.images[0] = 事件参数"
                 -->
                <UploadImage
                  v-model="article.cover.images[index]"
                ></UploadImage>
              </el-col>
            </el-row>
          </template>
        </el-form-item>
        <!-- ----------------------------------------- -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">发表</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
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
// 频道组件
import ChannelSelect from '@/components/channel-select'

//
import UploadImage from './components/upload-image'

export default {
  name: 'PublishIndex',
  components: {
    quillEditor,
    ChannelSelect,
    UploadImage
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
    // this.loadChannels()
    // 添加和编辑用的是同一个组件，编辑时要初始化文章内容（根据Id获取）
    if (this.$route.params.articleId) {
      this.loadArticle()
    }
  },
  methods: {
    // 获取频道列表
    // loadChannels () {
    //   // 有些接口需要 token，有些接口不需要 token
    //   // 是否需要，应该由接口文档指示
    //   this.$axios({
    //     method: 'GET',
    //     url: '/channels'
    //   })
    //     .then(res => {
    //       this.channels = res.data.data.channels
    //     })
    //     .catch()
    // },

    loadArticle () {
      this.$axios({
        method: 'GET',
        url: `/articles/${this.$route.params.articleId}`
      }).then(res => {
        this.article = res.data.data
      })
    },
    // 添加和编辑
    onSubmit (draft) {
      if (this.$route.params.articleId) {
        // 请求编辑文章
        this.updateArticle(draft)
      } else {
        // 请求添加文章
        this.addArticle(draft)
      }
    },
    // 添加
    addArticle (draft) {
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
    },
    // 编辑
    updateArticle (draft) {
      this.$axios({
        method: 'PUT',
        url: `/articles/${this.$route.params.articleId}`,
        params: {
          draft
        },
        data: this.article
      }).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
        this.$router.push('/article')
      }).catch(() => {
        this.$message.error('更新失败')
      })
    }
  }
}
</script>

<style>
</style>
