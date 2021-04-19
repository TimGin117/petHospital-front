
<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="stuId"
        label="学号"
      />
      <el-table-column
        prop="nickName"
        label="用户名称"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.nickName || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="avatar"
        label="用户头像"
      >
        <template slot-scope="scope">
          <img v-if="scope.row.avatar" class="user-avatar" :src="scope.row.avatar">
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="userMail"
        label="用户邮箱"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.userMail || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="权限"
        width="180"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.status" placeholder="请选择" @change="handleStatusChange(scope.row)">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { change2Adm, change2Forbid, change2Normal, loadAllUsr } from '@/api/user'

const options = [
  {
    label: '普通',
    value: 1
  },
  {
    label: '禁用',
    value: 0
  },
  {
    label: '超级管理员',
    value: 44
  }
]

export default {

  data() {
    return {
      tableData: [],
      options
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      loadAllUsr().then(res => {
        this.tableData = res.data
      })
    },
    handleStatusChange(row) {
      const {
        status,
        id
      } = row
      const service = {
        44: change2Adm,
        1: change2Normal,
        0: change2Forbid
      }
      service[status]({ usrId: id }).then(res => {
        this.$message.success('权限修改成功')
      })
    }
  }
}
</script>

<style scoped>
.user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
}
</style>
