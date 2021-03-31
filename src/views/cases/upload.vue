<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="病种">
        <el-cascader
          v-model="search"
          class="search-input"
          :options="options"
          :props="{
            expandTrigger: 'hover',
            label: 'name',
            value: 'diseaseId',
          }"
          @change="handleSearchChange"
        />
      </el-form-item>
      <el-form-item label="诊断">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="检查">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="治疗">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>
.el-input {
    margin-bottom: 20px;
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
