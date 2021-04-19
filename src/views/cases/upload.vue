<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="病种">
        <DiseasesSelect
          @change="handleSearchChange"
        />
      </el-form-item>
      <el-form-item label="诊断">
        <el-input v-model="form.diagnosis" type="textarea" />
      </el-form-item>
      <el-form-item label="检查">
        <el-input v-model="form.inspection" type="textarea" />
      </el-form-item>
      <el-form-item label="治疗">
        <el-input v-model="form.treatment" type="textarea" />
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:9527/dev-api/file/upload"
          :show-file-list="false"
          :on-success="handleImgSuccess"
        >
          <img v-if="photoUri" :src="photoUri" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="视频">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:9527/dev-api/file/upload"
          :show-file-list="false"
          :on-success="handleVideoSuccess"
        >
          <video v-if="videoUri" :src="videoUri" class="avatar" controls="controls" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import DiseasesSelect from '@/components/DiseasesSelect/index.vue'
import { addCase } from '@/api/case'
export default {
  components: { DiseasesSelect },
  data() {
    return {
      form: {
        name: '',
        diagnosis: '',
        inspection: '',
        treatment: ''
      },
      photoUri: '',
      videoUri: ''
    }
  },
  methods: {
    handleSearchChange(name) {
      this.$set(this.form, 'name', name)
    },
    onSubmit() {
      addCase({ ...this.form, videoUri: this.videoUri, photoUri: this.photoUri }).then(Response => {
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
    },
    handleImgSuccess(res) {
      this.photoUri = res.data
    },
    handleVideoSuccess(res) {
      this.videoUri = res.data
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

  .avatar-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader >>> .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
