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
      <div style="display: flex;">
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:9527/dev-api/file/upload"
            :show-file-list="false"
            :on-success="handleImgSuccess"
          >
            <img v-if="form.diagnosisPhotoUri" :src="form.diagnosisPhotoUri" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="视频">
          <el-upload
            class="avatar-uploader"
            :http-request="handleUpload"
            action=""
            :show-file-list="false"
          >
            <video v-if="form.diagnosisVideoUri" :src="form.diagnosisVideoUri" class="avatar" controls="controls" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </div>
      <el-form-item label="检查">
        <el-input v-model="form.inspection" type="textarea" />
      </el-form-item>
      <div style="display: flex;">
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:9527/dev-api/file/upload"
            :show-file-list="false"
            :on-success="handleImgSuccess"
          >
            <img v-if="form.inspectionPhotoUri" :src="form.inspectionPhotoUri" class="avatar">
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
            <video v-if="form.inspectionVideoUri" :src="form.inspectionVideoUri" class="avatar" controls="controls" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </div>
      <el-form-item label="治疗">
        <el-input v-model="form.treatment" type="textarea" />
      </el-form-item>
      <div style="display: flex;">
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:9527/dev-api/file/upload"
            :show-file-list="false"
            :on-success="handleImgSuccess"
          >
            <img v-if="form.treatmentPhotoUri" :src="form.treatmentPhotoUri" class="avatar">
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
            <video v-if="form.treatmentVideoUri" :src="form.treatmentVideoUri" class="avatar" controls="controls" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </div>

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
import { uploadChunks } from '@/api/file'
import md5 from 'md5'

export default {
  components: { DiseasesSelect },
  data() {
    return {
      form: {
        name: '',
        diagnosis: '',
        diagnosisVideoUri: '',
        diagnosisPhotoUri: '',
        inspection: '',
        inspectionVideoUri: '',
        inspectionPhotoUri: '',
        treatment: '',
        treatmentVideoUri: '',
        treatmentPhotoUri: ''
      }
    }
  },
  methods: {
    handleSearchChange(name) {
      this.$set(this.form, 'name', name)
    },
    onSubmit() {
      addCase(this.form).then(Response => {
        this.$message.success('添加成功')
      })
    },
    onCancel() {
      this.$refs.form.resetFields()
    },
    handleImgSuccess(res) {
      this.$set(this.form, 'diagnosisPhotoUri', res.data)
    },
    handleVideoSuccess(res) {
      this.form.videoUri = res.data
    },
    handleUpload(upload) {
      const {
        file
      } = upload
      const totalSize = file.size
      const [pureName, ext] = file.name.split('.')
      const hash = md5(file)
      const piece = 1024 * 1024 * 1 // 1M

      let start = 0 // 每次上传的开始字节
      let end = start + piece // 每次上传的结尾字节
      const chunks = []
      while (start < totalSize) {
        // 根据长度截取每次需要上传的数据
        // File对象继承自Blob对象，因此包含slice方法
        const blob = file.slice(start, end)
        chunks.push(blob)

        start = end
        end = start + piece
      }

      chunks.forEach((chunk, index) => {
        const formData = new FormData()
        formData.append('md5', hash)
        formData.append('chunks', chunks.length)
        formData.append('chunk', index)
        formData.append('pureName', pureName)
        formData.append('size', totalSize)
        formData.append('ext', ext)
        formData.append('file', chunk)

        uploadChunks(formData)
        // uploadChunks({
        //   md5: hash,
        //   chunks: chunks.length,
        //   chunk: index,
        //   pureName,
        //   size: totalSize,
        //   ext,
        //   file: chunk
        // })
      })
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
