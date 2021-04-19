<template>
  <div class="app-container">
    <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="100px" class="demo-dynamic">
      <el-form-item
        prop="paperName"
        label="考卷名称"
        :rules="{
          required: true, message: '考卷名称不能为空', trigger: 'blur'
        }"
      >
        <el-input v-model="dynamicValidateForm.paperName" />
      </el-form-item>
      <el-form-item
        v-for="(question, index) in dynamicValidateForm.questionScores"
        :key="question.questionId || question.key"
        class="question"
        :label="'考题' + (index + 1)"
        :prop="'questionScores.' + index + '.questionId'"
        :rules="{
          required: true, message: '考题不能为空', trigger: 'blur'
        }"
      >
        <QuestionSelect v-model="question.questionId" />
        <span class="score-label">分值：</span>
        <el-input-number v-model="question.score" :min="1" />
        <el-button @click.prevent="removeQuestion(question)">删除</el-button>
      </el-form-item>
      <el-form-item
        prop="duration"
        label="考试时间"
        :rules="{
          required: true, message: '考试时间不能为空', trigger: 'blur'
        }"
      >
        <el-input-number v-model="dynamicValidateForm.duration" controls-position="right" :min="1" :step="10" />
      </el-form-item>
      <el-form-item>
        <el-button :type="paperId?'success':'primary'" @click="submitForm('dynamicValidateForm')">{{ paperId ? '修改考卷':'创建考卷' }}</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        <el-button @click="addQuestion">新增考题</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import QuestionSelect from '@/components/QuestionSelect/index.vue'
import { addPaper, updatePaper, findPaperById } from '@/api/paper'
import { mapGetters } from 'vuex'

export default {
  components: { QuestionSelect },
  data() {
    return {
      dynamicValidateForm: {
        questionScores: [{
          questionId: '',
          score: 1
        }],
        paperName: '',
        duration: 90
      },
      paperId: ''
    }
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  created() {
    const {
      paperId
    } = this.$route.query

    if (paperId) {
      this.paperId = paperId
      this.fetchPaper(paperId)
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = JSON.parse(JSON.stringify(this.dynamicValidateForm))
          formData.questionScores = formData.questionScores.map(item => ({ questionId: item.questionId, score: item.score }))

          if (this.paperId) {
            updatePaper({ ...formData, admId: this.id, paperId: this.paperId }).then(response => {
              this.$message.success('修改成功')
            })
          } else {
            addPaper({ ...formData, admId: this.id }).then(response => {
              this.$message.success('添加成功')
            })
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    removeQuestion(item) {
      var index = this.dynamicValidateForm.questionScores.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.questionScores.splice(index, 1)
      }
    },
    addQuestion() {
      this.dynamicValidateForm.questionScores.push({
        questionId: '',
        score: 1,
        key: Date.now()
      })
    },
    fetchPaper(paperId) {
      findPaperById({ paperId }).then(res => {
        const {
          questions: questionScores,
          paperName,
          duration
        } = res.data

        this.dynamicValidateForm = {
          paperName,
          duration,
          questionScores
        }
      })
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 500px;
}

.score-label {
  font-weight: 600;
  font-size: 14px;
  color: #606266;
  margin-left: 20px;
}

.el-input-number{
  margin-right: 40px;
}
</style>
