<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="诊断">
        <el-input v-model="form.diagnosis" type="textarea" />
      </el-form-item>
      <el-form-item label="检查">
        <el-input v-model="form.inspection" type="textarea" />
      </el-form-item>
      <el-form-item label="治疗">
        <el-input v-model="form.treatment" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import disasesSelect from './components/disasesSelect.vue'
import { addCase } from '@/api/case'
export default {
  components: { disasesSelect },
  data() {
    return {
      form: {
        name: '',
        diagnosis: '',
        inspection: '',
        treatment: ''
      }
    }
  },
  methods: {
    handleSearchChange(name) {
      this.$set(this.form, 'name', name)
    },
    onSubmit() {
      addCase(this.form).then(Response => {
        this.$message.success('添加成功')
      })
    },
    onCancel() {
      this.form = {
        name: '',
        diagnosis: '',
        inspection: '',
        treatment: ''
      }
    }
  }
}
</script>

<style scoped>
.el-input {
    margin-bottom: 20px;
}

.el-textarea {
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
