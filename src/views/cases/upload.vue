<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item v-if="name===''" label="病种">
        <DiseasesSelect
          @change="handleSearchChange"
        />
      </el-form-item>
      <el-form-item v-else label="病种">
        <el-input
          style="width: 400px"
          :placeholder="name"
          :disabled="true"
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
            :on-progress="handleProgress"
            accept=".jpg,.jpeg,.png,.JPG,.JPEG"
            :on-success="(res) => handleImgSuccess('diagnosis',res)"
          >
            <img v-if="form.diagnosisPhotoUri" :src="form.diagnosisPhotoUri" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="视频">
          <el-upload
            class="avatar-uploader"
            :http-request="(file) => handleUpload('diagnosis',file)"
            action=""
            accept=".avi,.AVI,.mkv,.MKV,.mp4,.MP4,.rmvb,.RMVB,.wmv,.WMV"
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
            accept=".jpg,.jpeg,.png,.JPG,.JPEG"
            action="http://localhost:9527/dev-api/file/upload"
            :show-file-list="false"
            :on-success="(res) => handleImgSuccess('inspection',res)"
          >
            <img v-if="form.inspectionPhotoUri" :src="form.inspectionPhotoUri" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="视频">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            accept=".avi,.AVI,.mkv,.MKV,.mp4,.MP4,.rmvb,.RMVB,.wmv,.WMV"
            :http-request="(file) => handleUpload('inspection',file)"
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
            accept=".jpg,.jpeg,.png,.JPG,.JPEG"
            action="http://localhost:9527/dev-api/file/upload"
            :show-file-list="false"
            :on-success="(res) => handleImgSuccess('treatment',res)"
          >
            <img v-if="form.treatmentPhotoUri" :src="form.treatmentPhotoUri" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="视频">
          <el-upload
            class="avatar-uploader"
            action=""
            accept=".avi,.AVI,.mkv,.MKV,.mp4,.MP4,.rmvb,.RMVB,.wmv,.WMV"
            :show-file-list="false"
            :http-request="(file) => handleUpload('treatment',file)"
          >
            <video v-if="form.treatmentVideoUri" :src="form.treatmentVideoUri" class="avatar" controls="controls" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button :type="caseId?'success':'primary'" @click="submitForm('form')">{{ caseId ? '修改病例':'新建病例' }}</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import DiseasesSelect from '@/components/DiseasesSelect/index.vue'
import { addCase, updateCase, fetchCase } from '@/api/case'
import { uploadChunks } from '@/api/file'
import md5 from 'md5'

export default {
  components: { DiseasesSelect },
  data() {
    return {
      caseId: '',
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
      },
      name: '',
      createTime: ''
    }
  },
  created() {
    const {
      caseId
    } = this.$route.query

    if (caseId) {
      this.caseId = caseId
      this.fetchCase(caseId)
    }
  },
  methods: {
    fetchCase(caseId) {
      fetchCase({ caseId }).then(res => {
        const {
          name,
          diagnosis,
          diagnosisVideoUri,
          diagnosisPhotoUri,
          inspection,
          inspectionVideoUri,
          inspectionPhotoUri,
          treatment,
          treatmentVideoUri,
          treatmentPhotoUri,
          createTime
        } = res.data

        this.name = name

        this.createTime = createTime

        this.form = {
          name,
          diagnosis,
          diagnosisVideoUri,
          diagnosisPhotoUri,
          inspection,
          inspectionVideoUri,
          inspectionPhotoUri,
          treatment,
          treatmentVideoUri,
          treatmentPhotoUri
        }
      })
    },
    handleSearchChange(name) {
      this.$set(this.form, 'name', name)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.caseId) {
            updateCase({ ...this.form, caseId: this.caseId, createTime: this.createTime }).then(response => {
              this.$message.success('修改成功')
            })
          } else {
            addCase(this.form).then(Response => {
              this.$message.success('添加成功')
            })
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleImgSuccess(prop, res) {
      this.$set(this.form, `${prop}PhotoUri`, res.data)
    },
    handleProgress(event, file) {
      console.log(file.percentage)
      console.log(file)
      console.log(event)
    },
    handleUpload(prop, upload) {
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

      let cnt = 0

      chunks.forEach((chunk, index) => {
        const formData = new FormData()
        formData.append('md5', hash)
        formData.append('chunks', chunks.length)
        formData.append('chunk', index)
        formData.append('pureName', pureName)
        formData.append('size', totalSize)
        formData.append('ext', ext)
        formData.append('file', chunk)

        uploadChunks(formData).then(res => {
          cnt++
          if (cnt === chunks.length) {
            this.$set(this.form, `${prop}VideoUri`, res.data)
          }
        })
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
    width: 178px;
    height: 178px;
    display: flex;
    align-items: center;
    justify-content: center;
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
