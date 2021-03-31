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
            @click="() => append(node, data)"
          >
            添加
          </el-button>
          <el-button
            v-if="node.isLeaf"
            type="text"
            @click="() => remove(node, data)"
          >
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog
      title="添加病种"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-input v-model="name" placeholder="病种名称" autocomplete="off" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAppend">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addDiseases, deleteDiseases, fetchDiseasesList } from '@/api/diseases'

export default {
  name: 'DiseasesList',
  components: { },
  data() {
    return {
      list: [],
      filterText: '',
      name: '',
      treeNodeData: null,
      treeNode: null,
      dialogVisible: false,
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
          diseaseId: -1,
          name: '全部病种',
          children: data
        }]
      })
    },
    append(node, data) {
      this.dialogVisible = true
      this.treeNodeData = data
      this.treeNode = node
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    remove(node, data) {
      deleteDiseases({
        diseaseId: data.diseaseId
      }).then(response => {
        this.fetchList()
        this.$message.success('删除成功')
      })
    },
    handleAppend() {
      const node = this.treeNode
      const id = node.data.diseaseId

      addDiseases({
        name: this.name,
        parent: id
      }).then(response => {
        this.dialogVisible = false
        this.fetchList()
      })
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
