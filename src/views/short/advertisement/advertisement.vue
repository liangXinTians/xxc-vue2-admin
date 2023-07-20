<template>
  <div class="all">
    <!-- 头部 -->
    <div class="top">
      <el-row class="top-left">
        <el-dialog
          :visible.sync="dialogVisible"
          width="60%"
          :before-close="handleClose"
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
            <el-form-item label="导航图标" prop="advertUrl">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                style="border: 1px dashed #d9d9d9; width: 178px; height: 178px"
              >
                <img
                  v-if="ruleForm.advertUrl"
                  :src="ruleForm.advertUrl"
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
        </el-dialog>
        <el-button size="small" @click="dialogVisible = true"
          ><i class="el-icon-plus"></i> 新增</el-button
        >
        <el-button plain size="small" @click="exportData()"
          ><i class="el-icon-download"></i> 导出</el-button
        >
      </el-row>
      <div class="top-right" v-show="isShow">
        <div class="flex fen">
          <div class="fen-text">广告类别</div>
          <!-- <el-input
            v-model="query.advertType"
            placeholder="请输入广告类别"
            size="medium"
          ></el-input> -->
          <!-- <el-select v-model="tableData3" placeholder="请选择广告类别">
            <el-option
              v-for="item in tableData3"
              :key="item.value"
              :label="item.dictLabel"
            >
            </el-option>
          </el-select> -->
          <el-form ref="form" :data="tableData3">
            <el-select
              v-model="tableData3.dictLabel"
              placeholder="选择店铺"
              clearable
              @keyup.enter.native="handleQuery"
            >
              <el-option
                v-for="item in tableData3"
                :key="item.id"
                :value="item.dictLabel"
                :label="item.dictLabel"
              >
              </el-option>
            </el-select>
          </el-form>
        </div>

        <div class="flex fen">
          <div class="fen-text">广告名称</div>
          <el-input
            v-model="query.advertName"
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
            <el-button
              icon="el-icon-search"
              size="mini"
              circle
              @click="showclick"
            ></el-button>
            <el-button
              icon="el-icon-refresh"
              size="mini"
              circle
              @click="onClear"
            ></el-button>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 商品内容 -->
    <div class="content">
      <el-table
        id="oIncomTable"
        :rowKey="(r, i) => i"
        :columns="columns"
        :dataSource="itemMains"
        :scroll="{ y: 500 }"
        :pagination="false"
        :loading="spinning"
        style="margin-top: 10px; width: 100%"
        class="tableCls lable"
        bordered
        :customRow="loadCustomRow"
        ref="multipleTable"
        :data="tableData2"
        tooltip-effect="dark"
        height="600px"
        v-loading="loading"
      >
        <el-table-column type="selection" width="" class="table-colum" sortable>
        </el-table-column>
        <el-table-column prop="" label="#" width="100px" type="index">
        </el-table-column>
        <el-table-column prop="advertType" label="广告类别" width="200px">
          <template slot-scope="scope">
            <div>
              {{
                scope.row.advertType === 0
                  ? "首页轮播图"
                  : a === 1
                  ? "首页中部广告位"
                  : "热门推荐"
              }}
              <!-- 热门推荐2 首页轮播图0 首页中部广告位1 -->
            </div>
          </template>
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData2.length"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getAdvertiseList, getAdvertType } from "../../../api/short"
import { exportToExcel } from '../../../utils/xlsx'
export default {
  name: "advertisement",
  data () {
    return {
      dialogVisible: false, //新增显示
      ruleForm: {
        advertUrl: '',
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
      query: {
        advertType: '',
        advertName: ''
      },
      loading: false,
      isShow: true,
      visible: false,
      tableData: [], //临时储存列表
      tableData2: [], //广告储存列表
      tableData3: [] //advert-type储存列表

    }
  },
  created () {
    this.getApiAdvertiseList()
    this.getApiAdvertType()
  },
  methods: {
    //导出
    exportData () {
      exportToExcel('自定义文件名称', document.querySelector('#oIncomTable'), this)
    },
    // 新增列表
    submitForm (rulrForm) {
      this.tableData.push(this.ruleForm)
      this.rulrForm = ''
      this.dialogVisible = false
    },
    resetForm () {
      this.dialogVisible = false
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
    //隐藏
    showclick () {
      this.isShow = false
    },
    //每页条数
    handleSizeChange (val) {
      this.cur = val
      const params = {
        pageNum: this.currentPage,
        pageSize: this.cur,
        orderByColumn: "create_time",
        isAsc: "desc"
      }
      getShortList(params).then(res => {
        this.tableData = res.rows
      })
    },
    //当前页
    handleCurrentChange (val) {
      this.currentPage = val
      const params = {
        pageNum: this.currentPage,
        pageSize: this.cur,
        orderByColumn: "create_time",
        isAsc: "desc"
      }
      getShortList(params).then(res => {
        this.tableData = res.rows
      })
    },
    // 刷新页面
    refreshData () {
      // location.reload();

      setTimeout(() => {
        this.loading = true
        setTimeout(() => {
          this.getApiAdvertiseList()
          this.loading = false
        }, 500)
      }, 500)
    },
    // 清除表单内容
    onClear () {
      this.refreshData()
    },
    //商品列表
    getApiAdvertiseList () {
      console.log('aaa')
      getAdvertiseList().then(res => {
        console.log('bbb')
        this.tableData = res.rows
        this.tableData2 = this.tableData
      })
    },
    //adver-type列表
    getApiAdvertType () {
      getAdvertType().then(res => {

        this.tableData3 = res.data
      })
    },

    // 搜索
    onSubmit () {
      setTimeout(() => {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.tableData2 = ''
          if (this.tableData3.dictLabel == "首页轮播图") {
            this.query.advertType = 0
          }
          if (this.tableData3.dictLabel == "首页中部广告") {
            this.query.advertType = 1
          }
          if (this.tableData3.dictLabel == "热门推荐") {
            this.query.advertType = 2
          }
          this.tableData2 = this.tableData.filter(
            (item) =>
              item.advertType == this.query.advertType &&
              item.advertName.includes(this.query.advertName)
          )
        }, 500)
      }, 500)
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