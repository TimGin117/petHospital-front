<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="病种查询">
        <el-cascader
          v-model="search"
          class="search-input"
          clearable
          :options="options"
          :props="{
            expandTrigger: 'hover',
            label: 'name',
            value: 'diseaseId',
          }"
          @change="handleSearchChange"
        />
      </el-form-item>
      <el-form-item label="模糊搜索">
        <el-input
          v-model="keyword"
          style="width: 400px"
          placeholder="输入关键字进行搜索"
          @change="handleKeywordChange"
        />
      </el-form-item>
      <el-form>

        <el-timeline>
          <el-timeline-item v-for="item in list" :key="item.caseId" :timestamp="item.updateTime" placement="top">
            <el-card>
              <div class="header-wrapper">
                <h4 v-if="item.valid">{{ item.name }}</h4>
                <h4 v-else style="color: red">{{ `${item.name}-已删除` }} </h4>
                <div v-if="item.valid" class="operation-wrapper">
                  <el-button type="text" icon="el-icon-edit" @click="handleEdit(item.caseId)" />
                  <el-button type="text" icon="el-icon-delete" @click="handleDelete(item.caseId)" />
                </div>
              </div>

              <p>诊断：{{ item.diagnosis }}</p>
              <div style="display: flex; justify">
                <p v-if="item.diagnosisPhotoUri" style="display: flex; margin-right: 100px;">详情图片：<img width="300px" height="200px" :src="item.diagnosisPhotoUri"></p>
                <p v-if="item.diagnosisVideoUri" style="display: flex;">详情视频：<video width="300px" height="200px" :src="item.diagnosisVideoUri" controls="controls" /></p>
              </div>
              <p>检查：{{ item.inspection }}</p>
              <div style="display: flex; justify">
                <p v-if="item.inspectionPhotoUri" style="display: flex; margin-right: 100px;">详情图片：<img width="300px" height="200px" :src="item.inspectionPhotoUri"></p>
                <p v-if="item.inspectionVideoUri" style="display: flex;">详情视频：<video width="300px" height="200px" :src="item.inspectionVideoUri" controls="controls" /></p>
              </div>
              <p>治疗：{{ item.treatment }}</p>
              <div style="display: flex; justify">
                <p v-if="item.treatmentPhotoUri" style="display: flex; margin-right: 100px;">详情图片：<img width="300px" height="200px" :src="item.treatmentPhotoUri"></p>
                <p v-if="item.treatmentVideoUri" style="display: flex;">详情视频：<video width="300px" height="200px" :src="item.treatmentVideoUri" controls="controls" /></p>
              </div>
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
      </el-form></el-form></div>
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
      search: '',
      keyword: ''
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
    fetchOptions() {
      fetchDiseasesList().then(res => {
        const { data } = res
        this.options = data
      })
    },
    fetchList({ page = 1, size = 5, name = '', keyword = '' } = {}) {
      this.page = page
      fetchCasesList({
        page,
        size,
        name,
        keyword
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
    handleEdit(caseId) {
      this.$router.push({
        name: 'CasesUpload',
        query: {
          caseId
        }
      })
    },
    handleSearchChange(val) {
      this.fetchList({
        page: 1,
        name: this.targetName
      })
    },
    handleKeywordChange(val) {
      this.fetchList({
        page: 1,
        keyword: this.keyword
      })
    }
  }
}
</script>

<style scoped>
.search-input {
  width: 300px;
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
