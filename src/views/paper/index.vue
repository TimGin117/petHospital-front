
<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        fixed
        prop="paperId"
        label="考卷ID"
        width="120"
      />
      <el-table-column
        fixed
        prop="paperName"
        label="考卷名称"
      />
      <el-table-column
        prop="duration"
        label="考试时间"
      />
      <el-table-column
        prop="admId"
        label="创建人ID"
      />
      <el-table-column
        prop="admName"
        label="创建人"
      />
      <el-table-column
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row.paperId)">编辑</el-button>
          <el-button type="text" style="color: red;" size="small" @click="handleDelete(scope.row.paperId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deletePaper, fetchPaperList } from '@/api/paper'
export default {

  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      fetchPaperList().then(res => {
        this.tableData = res.data
      })
    },
    handleClick(paperId) {
      this.$router.push({
        name: 'PaperUpload',
        query: { paperId }
      })
    },
    handleDelete(paperId) {
      deletePaper({ paperId })
    }
  }
}
</script>
