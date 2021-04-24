<template>
  <el-cascader
    v-model="value"
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
import { targetTreeItem, targetTreeItemByName } from '@/utils/index'

export default {
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: []
    }
  },
  computed: {
    targetName() {
      const target = targetTreeItem(this.value, this.options, 'diseaseId')
      if (_.isObject(target)) { return targetTreeItem(this.value, this.options, 'diseaseId').name }
      return ''
    }
  },
  async created() {
    debugger
    await this.fetchOptions()
    this.changeValueByName()
  },
  methods: {
    changeValueByName() {
      if (!this.name) return
      debugger
      this.value = targetTreeItemByName(this.name, this.options, 'diseaseId')
    },
    async fetchOptions() {
      await fetchDiseasesList().then(res => {
        const { data } = res
        this.options = data
      })
    },
    handleSearchChange(val) {
      this.$emit('valueChange', val)
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
