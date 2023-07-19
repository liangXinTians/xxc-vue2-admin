<template>
  <div class="all">
    <!-- 头部 -->
    <div class="top">
      <el-row class="top-left">
        <el-popover
          placement="right"
          width="800"
          trigger="click"
          v-model="visible"
        >
          <el-form
            :model="ruleForm"
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
          >
            <div class="add-top">添加导航管理</div>
            <el-form-item label="广告类别" prop="navigateName">
              <el-input
                v-model="ruleForm.navigateName"
                placeholder="请输入导航名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="广告名称" prop="advertName">
              <el-input
                v-model="ruleForm.advertName"
                placeholder="请输入广告名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="链接地址" prop="advertAddress">
              <el-input
                v-model="ruleForm.advertAddress"
                placeholder="请输入链接地址"
              ></el-input>
            </el-form-item>
            <el-form-item label="导航图标" prop="navigateUrl">
              <!-- <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload> -->
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                style="border: 1px dashed #d9d9d9; width: 178px; height: 178px"
              >
                <img
                  v-if="ruleForm.navigateUrl"
                  :src="ruleForm.navigateUrl"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="排序" prop="sortNo">
              <el-input
                v-model="ruleForm.sortNo"
                placeholder="请输入排序"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
              <el-radio-group v-model="ruleForm.normalDisable">
                <el-radio label="0">正常</el-radio>
                <el-radio label="1">停运</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                v-model="ruleForm.remark"
                placeholder="请输入备注"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >确定</el-button
              >
              <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
          </el-form>
          <el-button slot="reference" size="small"
            ><i class="el-icon-plus"></i> 新增</el-button
          >
        </el-popover>
        <el-button plain size="small" @click="pullGoods"
          ><i class="el-icon-download"></i> 导出</el-button
        >
      </el-row>
      <div class="top-right">
        <div class="flex fen">
          <div class="fen-text">广告类别</div>
          <el-input
            v-model="inputFen"
            placeholder="请输入广告类别"
            size="medium"
          ></el-input>
        </div>
        <div class="flex fen">
          <div class="fen-text">广告名称</div>
          <el-input
            v-model="inputMing"
            placeholder="请输入广告名称"
            size="medium"
          ></el-input>
        </div>
        <el-form
          :inline="true"
          :model="short"
          class="demo-form-inline form"
          size="mini"
        >
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSubmit"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" @click="onClear">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="another">
          <el-row>
            <el-button icon="el-icon-search" size="mini" circle></el-button>
            <el-button icon="el-icon-refresh" size="mini" circle></el-button>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 商品内容 -->
    <div class="content">
      <el-table
        highlight-current-row
        class="lable"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="selection" width="" class="table-colum">
        </el-table-column>
        <el-table-column prop="sortNo" label="#" width="100px">
        </el-table-column>
        <el-table-column prop="searchValue" label="广告类别" width="200px">
        </el-table-column>
        <el-table-column prop="advertName" label="广告名称" width="200px">
        </el-table-column>
        <el-table-column
          prop="advertAddress"
          label="链接地址"
          width="200px"
        ></el-table-column>
        <el-table-column prop="advertUrl" label="广告图片" width="">
          <template slot-scope="scope">
            <div class="img-div">
              <img :src="scope.row.advertUrl" min-width="30" height="30" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sortNo" label="排序"> </el-table-column>
        <el-table-column prop="normalDisable" label="是否启用">
          <template slot-scope="scope">
            <div class="column-ture">
              {{ scope.row.normalDisable === 0 ? "停用" : "正常" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="备注" width=""> </el-table-column>
        <el-table-column prop="" label="操作"> </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="bottom">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getAdvertiseList } from "../../../api/short"
export default {
  name: "advertisement",
  data () {
    return {
      ruleForm: {
        searchValue: '',
        advertName: '',
        advertAddress: '',
        sortNo: '',
        normalDisable: '',
        remark: ''
      },
      rules: {
        searchValue: [
          { required: true, trigger: 'blur' },
        ],
        advertName: [
          { required: true, message: '请选择活动区域', trigger: 'blur' }
        ],
        advertAddress: [
          { required: true, message: '链接地址不能为空', trigger: 'blur' }
        ],
        sortNo: [
          { required: true, message: '排序不能为空', trigger: 'blur' }
        ],
      },
      visible: false,
      tableData: [] //储存列表
    }
  },
  created () {
    this.getApiAdvertiseList()
  },
  methods: {
    // 新增列表
    submitForm (rulrForm) {
      this.tableData.push(this.ruleForm)
      this.rulrForm = ''
      this.visible = false
    },
    resetForm () {
      this.visible = false
    },
    handleAvatarSuccess (res, file) {
      this.ruleForm.navigateUrl = file.response.data.fullUrl
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/webp' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jgp,jpeg,webp,png格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    //商品列表
    getApiAdvertiseList () {
      console.log('aaa')
      getAdvertiseList().then(res => {
        console.log('bbb')
        this.tableData = res.rows
      })
    },
    //新增商品
    getGoods () {
    },
    //导出
    pullGoods () {
    },
    // 表单提交
    onSubmit () {
    },
    // 清除表单内容
    onClear () {
      this.short.type = ''
      this.short.state = ''
    },
  }
}
</script>
<style scoped>
.all {
  background-color: rgb(255, 255, 255);
  min-height: calc(100vh - 84px);
}
.flex {
  display: flex;
}
.top {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
}
.add-top {
  font-size: 20px;
  margin-left: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.top-left {
  margin-top: 8px;
}
.top-right {
  display: flex;
}
.fen {
  margin-right: 20px;
}
.fen-text {
  margin-top: 9px;
  margin-right: 7px;
  white-space: nowrap;
  font-weight: 700;
}
.content {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.table {
  font-size: 12px;
  /* margin-top: 10px; */
  /* padding-left: 100px; */
}
.table-colum {
  /* display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
  height: 400px;
}
.column-ture {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(24, 144, 255);
  height: 26px;
  width: 50px;
  background-color: rgb(232, 244, 255);
  border-radius: 3px;
}
.bottom {
  position: fixed;
  bottom: 10px;
  right: 20px;
}
.img-div {
  width: 30px;
  height: 30px;
  overflow: hidden;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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