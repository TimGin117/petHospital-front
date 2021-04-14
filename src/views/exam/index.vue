<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="考试试卷">
        <el-select v-model="form.paperId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="考试名称">
        <el-input v-model="form.examName" />
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="form.startTime"
          type="datetime"
          placeholder="选择考试开始时间"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchPaperList } from '@/api/paper'
import { addExam } from '@/api/exam'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  data() {
    return {
      options: [],
      form: {
        paperId: '',
        examName: '',
        startTime: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      creatorId: 'id'
    })
  },
  created() {
    this.fetchPaperOptions()
  },
  methods: {
    fetchPaperOptions() {
      fetchPaperList().then(res => {
        this.options = res.data?.map(item => ({
          label: item.paperName,
          value: item.paperId
        }))
      })
    },
    onSubmit() {
      addExam({
        paperId: this.form.paperId,
        examName: this.form.examName,
        creatorId: Number(this.creatorId),
        startTime: moment(this.form.startTime).format('YYYY-MM-DD HH:mm:ss')
      }).then(res => {
        this.$message.success('添加考试成功')
      })
    },
    onCancel() {
      this.form = {
        paperId: '',
        examName: '',
        startTime: ''
      }
    }
  }
}
</script>

<style scoped>
.el-select {
    width: 400px;
}

.el-input {
    width: 600px;
}
</style>
