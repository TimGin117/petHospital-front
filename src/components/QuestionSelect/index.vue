<template>
  <el-select v-model="value" placeholder="请选择考题" @change="handleChange">
    <el-option
      v-for="item in options"
      :key="item.questionId"
      :label="item.stem"
      :value="item.questionId"
    />
  </el-select>
</template>

<script>
import { fetchQuestionList } from '@/api/question'

export default {
  name: 'QuestionSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: Number
    }
  },
  data() {
    return {
      options: []
    }
  },
  created() {
    console.log('value' + this.value)
    this.fetchList()
  },
  methods: {
    fetchList() {
      fetchQuestionList().then(response => {
        const { data } = response
        this.options = data
      })
    },
    handleChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style scoped>
.el-select {
    width: 400px;
}

.el-select-dropdown__item {
    text-overflow: ellipsis;
    max-width: 600px;
}
</style>
