<template>
  <div class="channel-select">
    <el-select placeholder="请选择频道" :value="value" @input="$emit('input' , $event)">
      <el-option v-if="includeAll" :value="null" label="全部频道"></el-option>
      <el-option
        :label="channel.name"
        :value="channel.id"
        v-for="channel in channels"
        :key="channel.id"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'ChannelSelect',
  props: {
    value: {
      type: [String, Number],
      require: true
    },
    // 判断是否有全部频道
    includeAll: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      channels: []
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
    }
    // 给父组件传值
    // onInput (data) {
    //   this.$emit('input', data)
    // }
  }
}
</script>

<style>
</style>
