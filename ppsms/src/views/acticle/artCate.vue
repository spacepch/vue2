<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix header-box">
      <span>卡片名称</span>
      <el-button type="primary" size="mini" @click="addCateShowFn"
        >添加分类</el-button
      >
    </div>

    <el-table :data="artList" stripe border style="width: 100%">
      <el-table-column type="index" label="序号" width="100"> </el-table-column>
      <el-table-column prop="cate_name" label="分类名称"> </el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"> </el-table-column>
      <el-table-column label="操作" v-slot="scope">
        <el-button type="primary" size="mini" @click="updateCateFn(scope.row)">修改</el-button>
        <el-button type="danger" size="mini" @click="deleteCateFn(scope.row)">删除</el-button>
      </el-table-column>
    </el-table>

    <el-dialog title="添加分类" :visible.sync="dialogFormVisible" @closed="formCloseFn">
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addRef"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input
            v-model="addForm.cate_name"
            minlength="1"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input
            v-model="addForm.cate_alias"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelFn">取 消</el-button>
        <el-button type="primary" @click="comfirmFn">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { getArtCateListAPI, saveArtCateAPI, updateArtCateAPI, deleteArtCateAPI } from '@/api'
export default {
  data () {
    return {
      artList: [],
      dialogFormVisible: false,
      isEdit: false,
      editId: '',
      addForm: {
        cate_name: '',
        cate_alias: ''
      },
      addRules: {
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,15}$/,
            message: '分类别名必须是1-15的大小写字母数字',
            trigger: 'blur'
          }
        ],
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          {
            pattern: /^\S{1,10}$/,
            message: '分类名称必须是1-10的非空字符',
            trigger: 'blur'
          }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    async getCateFn () {
      const { data: res } = await getArtCateListAPI()
      this.artList = res.data
    },
    addCateShowFn () {
      this.isEdit = false
      this.dialogFormVisible = true
    },
    comfirmFn () {
      this.$refs.addRef.validate(async valid => {
        if (valid) {
          // 判断新增还是编辑
          if (this.isEdit) {
            // 编辑分类-分支
            const { data: res } = await updateArtCateAPI({ id: this.editId, ...this.addForm })
            if (res.code) return this.$notify.error(res.message)
            this.$notify.success(res.message)
          } else {
            // 新增分类-分支
            const { data: res } = await saveArtCateAPI(this.addForm)
            if (res.code) return this.$notify.error(res.message)
            this.$notify.success(res.message)
          }
          // 重新请求列表数据
          this.getCateFn()
          // 关闭对话框
          this.dialogFormVisible = false
        } else {
          return false
        }
      })
    },
    formCloseFn () {
      this.$refs.addRef.resetFields()
    },
    cancelFn () {
      this.dialogFormVisible = false
    },
    updateCateFn (obj) {
      this.editId = obj.id
      this.dialogFormVisible = true
      this.isEdit = true
      this.$nextTick(() => {
        this.addForm.cate_name = obj.cate_name
        this.addForm.cate_alias = obj.cate_alias
      })
    },
    async deleteCateFn (obj) {
      const { data: res } = await deleteArtCateAPI(obj.id)
      if (res.code) return this.$notify.error(res.message)
      this.$notify.success(res.message)
      this.getCateFn()
    }
  },
  created () {
    this.getCateFn()
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
