<template>
  <div class="app-container">
    <el-card v-for="item in list" :key="item.questionId">
      <div class="header-wrapper">
        <h4>题干：{{ item.stem }}</h4>
        <el-button type="text" icon="el-icon-delete" @click="handleDelete(item.questionId)" />
      </div>
      <p>A：{{ item.choices[0] }}</p>
      <p>B：{{ item.choices[1] }}</p>
      <p>C：{{ item.choices[2] }}</p>
      <p>D：{{ item.choices[3] }}</p>
      <p style="color: red">答案：{{ item.answer }}</p>
    </el-card>
  </div>
</template>

<script>
import { fetchQuestionList, deleteQuestion } from '@/api/question'

export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      fetchQuestionList().then(response => {
        const { data } = response
        this.list = data
      })
    },
    handleDelete(id) {
      deleteQuestion({ questionId: id }).then(response => {
        this.$message.success('删除成功')
        this.fetchList()
        this.list = this.list.filter(item => item.questionId !== id)
      })
    }
  }
}
</script>

<style scoped>

.el-card {
    margin-right: 20px;
    border-radius: 8px;
}
.el-card + .el-card{
    margin-top: 20px;
}

.header-wrapper {
  display: flex;
  align-items: baseline;
}

.el-button {
  margin-left: 20px;
}
</style>
