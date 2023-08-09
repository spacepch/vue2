<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix header-box">
      <span>文章列表</span>
    </div>
    <!-- 搜索框表单 -->
    <div class="search-box">
      <el-form :inline="true" :model="q">
        <el-form-item label="文章分类" size="small">
          <el-select v-model="q.cate_id" placeholder="文章分类">
            <el-option
              v-for="obj in cateList"
              :label="obj.cate_name"
              :value="obj.id"
              :key="obj.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布状态" size="small">
          <el-select v-model="q.state" placeholder="发布状态">
            <el-option label="已发布" value="已发布"></el-option>
            <el-option label="草稿" value="草稿"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="initListFn"
            >查询</el-button
          >
          <el-button type="info" size="small" @click="resetListFn">重置</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="test" :visible.sync="flag"></el-dialog>
      <el-button type="primary" size="small" @click="showDialogFn"
        >发布文章</el-button
      >
    </div>

    <!-- 文章表格 -->
    <el-table :data="artList" style="width: 100%" border stripe>
      <el-table-column prop="title" label="文章标题" width="180">
        <template v-slot="scope">
          <el-link type="primary" @click="showDetailFn(scope.row.id)"> {{ scope.row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类" width="180">
      </el-table-column>
      <el-table-column prop="pub_date" label="发表时间">
        <template v-slot="scope">
          <span>
            {{$formateDate(scope.row.pub_date)}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作"> </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="q.pagenum"
      :page-sizes="[2, 3, 5, 10]"
      :page-size.sync="q.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 发表文章对话框 -->
    <el-dialog
      fullscreen
      title="发表文章"
      :visible.sync="pubDialogvisible"
      :before-close="handleClose"
      @closed="closeFn"
    >
      <!-- 发布文章表单 -->
      <el-form
        :model="pubForm"
        :rules="pubFormRules"
        ref="pubFormRef"
        label-width="100px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select
            v-model="pubForm.cate_id"
            placeholder="请选择活动区域"
            style="width: 100%"
          >
            <el-option
              v-for="obj in cateList"
              :key="obj.id"
              :label="obj.cate_name"
              :value="obj.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <quill-editor
            v-model="pubForm.content"
            @blur="quillRequiredFn"
          ></quill-editor>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img">
          <input
            type="file"
            @change="changeCoverFn"
            ref="iptFileRef"
            v-show="0"
            accept="image/*"
          />
          <img class="the_img" @click="chooseImgFn" :src="coverImgSrc" alt="" />
          <br />
          <el-button type="text">+ 选择封面</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pubArticFn('已发布')"
            >发布</el-button
          >
          <el-button type="info" @click="pubArticFn('存草稿')"
            >存为草稿</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 查看文章详情对话框 -->

  </el-card>
</template>

<script>
import { getArtCateListAPI, uploadArticleAPI, getArtListAPI, getArtDetailAPI } from '@/api'
import cover_img from '@/assets/images/cover.jpg'
export default {
  name: 'ArtList',
  data () {
    return {
      flag: false,
      pubDialogvisible: false,
      q: {
        pagenum: 1,
        pagesize: 5,
        cate_id: '',
        state: ''
      },
      pubForm: {
        cate_id: '',
        title: '',
        content: '', // 富文本
        cover_img: null, // 封面图片
        state: '' // 发布状态
      },
      pubFormRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          {
            min: 1,
            max: 30,
            message: '文章标题的长度为1-30个字符',
            trigger: 'blur'
          }
        ],
        cate_id: [
          { required: true, message: '请填入文章标题', trigger: 'change' }
        ],
        content: [{ required: true, message: '请选择分类', trigger: 'blur' }],
        cateList: [
          { required: true, message: '请填入内容', trigger: 'change' }
        ],
        cover_img: [{ required: true, message: '请选择封面', trigger: 'blur' }]
      },
      cateList: [], // 保存文章分类
      artList: [], // 保存文章列表
      total: 0 // 保存现有文章数量
    }
  },
  methods: {
    showDialogFn () {
      this.pubDialogvisible = true
    },
    async handleClose (done) {
      const res = await this.$confirm(
        '此操作将导致文章信息丢失, 是否继续?',
        '提示',
        {
          type: 'warning'
        }
      ).catch((err) => err)

      if (res === 'cancel') return
      done()
    },
    async getCateListFn () {
      const { data: res } = await getArtCateListAPI()
      this.cateList = res.data
    },
    async getArtListFn () {
      const { data: res } = await getArtListAPI(this.q)
      if (res.code !== 0) return this.$message.error(res.message)
      this.artList = res.data
      this.total = res.total
    },
    changeCoverFn (e) {
      const files = e.target.files
      if (files.length === 0) {
        this.pubForm.cover_img = null
      } else {
        this.pubForm.cover_img = files[0]
      }
      this.$refs.pubFormRef.validateField('cover_img')
    },
    chooseImgFn () {
      this.$refs.iptFileRef.click()
    },
    pubArticFn (str) {
      this.$refs.pubFormRef.validate((valid) => {
        this.pubForm.state = str
        if (valid) {
          const formData = new FormData()
          Object.keys(this.pubForm).forEach(key => {
            formData.append(key, this.pubForm[key])
          })
          // #region
          // formData.append('title', this.pubForm.title)
          // formData.append('cover_img', this.pubForm.cover_img)
          // formData.append('cate_id', this.pubForm.cate_id)
          // formData.append('content', this.pubForm.content)
          // formData.append('state', this.pubForm.state)
          // #endregion
          uploadArticleAPI(formData).then(({ data: res }) => {
            if (res.code === 0) {
              this.$message.success(res.message)
            } else if (res.code === 2) {
              this.$message.success(res.message)
            } else {
              return this.$message.error(res.message)
            }
            this.pubDialogvisible = false
            this.getArtListFn()
          })
        } else {
          return false
        }
      })
    },
    quillRequiredFn () {
      this.$refs.pubFormRef.validateField('content')
    },
    closeFn () {
      this.$refs.pubFormRef.resetFields()
    },
    handleSizeChange (sizes) {
      this.q.pagesize = sizes
      this.q.pagenum = 1
      this.getArtListFn()
    },
    handleCurrentChange (nowPage) {
      this.q.pagenum = nowPage
      this.getArtListFn()
    },
    initListFn () {
      this.q.pagenum = 1
      this.q.pagesize = 5
      this.getArtListFn()
    },
    resetListFn () {
      this.q = {
        pagenum: 1,
        pagesize: 5,
        cate_id: '',
        state: ''
      }
      this.getArtListFn()
    },
    async showDetailFn (artId) {
      const res = await getArtDetailAPI(artId)
      console.log(res)
    }
  },
  created () {
    this.getCateListFn()
    this.getArtListFn()
  },
  computed: {
    coverImgSrc () {
      if (this.pubForm.cover_img) {
        return URL.createObjectURL(this.pubForm.cover_img)
      } else {
        return cover_img
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}
::v-deep .ql-editor {
  min-height: 300px;
}
.the_img {
  width: 400px;
  height: 280px;
  cursor: pointer;
}
.the_img:hover {
  filter: brightness(90%);
}
</style>
