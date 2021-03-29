<template>
  <div class="app-container diseases-list">
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
    />
    <el-tree
      ref="tree"
      :data="list"
      node-key="id"
      default-expand-all
      :props="defaultProps"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            @click="() => append(data)"
          >
            添加
          </el-button>
          <el-button
            type="text"
            @click="() => remove(node, data)"
          >
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { fetchDiseasesList } from '@/api/diseases'

let id = 1000

export default {
  name: 'DiseasesList',
  components: { },
  data() {
    return {
      list: [],
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'diseaseId'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      fetchDiseasesList().then(res => {
        const { data } = res
        this.list = [{
          diseasesId: -1,
          name: '全部病种',
          children: data
        }]
      })
    },
    append(data) {
      const newChild = { diseasesId: id++, name: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.unshift(newChild)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
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
