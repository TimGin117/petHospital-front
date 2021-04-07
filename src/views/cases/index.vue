<template>
  <div class="app-container">
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
    <el-timeline>
      <el-timeline-item v-for="item in list" :key="item.caseId" :timestamp="item.updateTime" placement="top">
        <el-card>
          <div class="header-wrapper">
            <h4 v-if="item.valid">{{ item.name }}</h4>
            <h4 v-else style="color: red">{{ `${item.name}-已删除` }} </h4>
            <el-button v-if="item.valid" type="text" icon="el-icon-delete" @click="handleDelete(item.caseId)" />
          </div>

          <p>诊断：{{ item.diagnosis }}</p>
          <p>检查：{{ item.inspection }}</p>
          <p>治疗：{{ item.treatment }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-pagination
      :current-page="page"
      :page-size="5"
      layout="total, prev, pager, next, jumper"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import { deleteCase, fetchCasesList } from '@/api/case'
import { fetchDiseasesList } from '@/api/diseases'
import { targetTreeItem } from '@/utils/index'

export default {
  data() {
    return {
      list: [],
      options: [],
      page: 1,
      total: 0,
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
    this.fetchList()
    this.fetchOptions()
  },
  methods: {
    // filterNode(node, keyword) {
    //   console.log('xxxx')
    //   debugger
    //   if (!keyword) return true
    //   return node.name.indexOf(keyword) !== -1
    // },
    fetchOptions() {
      fetchDiseasesList().then(res => {
        const { data } = res
        this.options = data
      })
    },
    fetchList({ page = 1, size = 5, name = '' } = {}) {
      this.page = page
      fetchCasesList({
        page,
        size,
        name
      }).then(response => {
        const { data } = response
        const {
          content,
          totalElements
        } = data

        this.list = content
        this.total = totalElements
      })
    },
    handleCurrentChange(val) {
      this.fetchList({
        page: val,
        name: this.targetName
      })
    },
    handleDelete(caseId) {
      deleteCase({ caseId }).then(res => {
        this.$message.success('删除成功')
        this.fetchList({
          page: 1
        })
      })
    },
    handleSearchChange(val) {
      this.fetchList({
        page: 1,
        name: this.targetName
      })
    }
  }
}
</script>

<style scoped>
.search-input {
  width: 300px;
  margin-left: 68px;
  margin-bottom: 20px;
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
}

.el-pagination {
    display: flex;
    justify-content: center;
}
</style>
