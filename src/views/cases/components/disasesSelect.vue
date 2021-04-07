<template>
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
</template>

<script>
import _ from 'lodash'
import { fetchDiseasesList } from '@/api/diseases'
import { targetTreeItem } from '@/utils/index'

export default {
  data() {
    return {
      options: [],
      search: ''
    }
  },
  computed: {
    targetName() {
      const target = targetTreeItem(this.search, this.options, 'diseaseId')
      if (_.isObject(target)) { return targetTreeItem(this.search, this.options, 'diseaseId').name }
      return ''
    }
  },
  created() {
    this.fetchOptions()
  },
  methods: {
    fetchOptions() {
      fetchDiseasesList().then(res => {
        const { data } = res
        this.options = data
      })
    },
    handleSearchChange(val) {
      this.$emit('change', this.targetName)
    }
  }
}
</script>

<style scoped>
.search-input {
  width: 300px;
}

.el-pagination {
    display: flex;
    justify-content: center;
}
</style>
