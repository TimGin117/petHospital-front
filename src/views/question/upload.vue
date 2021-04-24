<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="病种">
        <DiseasesSelect
          v-model="form.diseaseId"
        />
      </el-form-item>
      <el-form-item label="题干">
        <el-input v-model="form.stem" />
      </el-form-item>
      <el-form-item label="选项A">
        <el-input v-model="form.choiceA" />
      </el-form-item>
      <el-form-item label="选项B">
        <el-input v-model="form.choiceB" />
      </el-form-item>
      <el-form-item label="选项C">
        <el-input v-model="form.choiceC" />
      </el-form-item>
      <el-form-item label="选项D">
        <el-input v-model="form.choiceD" />
      </el-form-item>
      <el-form-item label="答案">
        <el-radio-group v-model="form.answer">
          <el-radio label="A">A</el-radio>
          <el-radio label="B">B</el-radio>
          <el-radio label="C">C</el-radio>
          <el-radio label="D">D</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import DiseasesSelect from '@/components/DiseasesSelect/index.vue'
import { addQuestion, findQuestionById } from '@/api/question'
import { mapGetters } from 'vuex'
export default {
  components: { DiseasesSelect },
  data() {
    return {
      form: {
        diseaseId: [],
        stem: '',
        choiceA: '',
        choiceB: '',
        choiceC: '',
        choiceD: '',
        answer: 'A'
      }
    }
  },
  computed: {
    ...mapGetters({
      creatorId: 'id',
      questionId: ''
    })
  },
  created() {
    const {
      questionId
    } = this.$route.query

    if (questionId) {
      this.questionId = questionId
      this.fetchQuestion(questionId)
    }
  },
  methods: {
    fetchQuestion(questionId) {
      findQuestionById({ questionId }).then(res => {
        const {
          diseaseId,
          choices,
          stem,
          answer
        } = res.data

        this.form = {
          diseaseId: String(diseaseId),
          choiceA: choices[0],
          choiceB: choices[1],
          choiceC: choices[2],
          choiceD: choices[3],
          stem,
          answer
        }
      })
    },
    onSubmit() {
      const question = {
        diseaseId: this.form.diseaseId[this.form.diseaseId.length - 1],
        stem: this.form.stem,
        admId: this.creatorId,
        answer: this.form.answer,
        choice: [this.form.choiceA, this.form.choiceB, this.form.choiceC, this.form.choiceD].join('|')
      }
      addQuestion(question).then(Response => {
        this.$message.success('添加成功')
      })
    },
    onCancel() {
      this.form = {
        diseaseId: [],
        stem: '',
        choiceA: '',
        choiceB: '',
        choiceC: '',
        choiceD: '',
        answer: 'A'
      }
    }
  }
}
</script>

<style scoped>
.el-input {
    margin-bottom: 20px;
    width: 800px;
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    padding-right: 8px;
}
</style>
