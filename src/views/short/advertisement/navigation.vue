<template>
  <div class="all">
    <!-- 头部 -->
    <div class="top">
      <el-row class="top-left">
        <el-dialog
          title="添加导航管理"
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
            <!-- <div class="add-top">添加导航管理</div> -->
            <el-form-item label="导航名称" prop="navigateName">
              <el-input
                v-model="ruleForm.navigateName"
                placeholder="请输入导航名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="链接地址" prop="navigateAddress">
              <el-input
                v-model="ruleForm.navigateAddress"
                placeholder="请输入链接地址"
              ></el-input>
            </el-form-item>
            <el-form-item label="导航图标" prop="navigateUrl">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                limit="1"
              >
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <!-- <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog> -->
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
          <div class="fen-text">导航名称</div>
          <el-input
            v-model="query.navigateName"
            placeholder="请输入导航名称"
            size="medium"
          ></el-input>
        </div>
        <div class="flex fen">
          <div class="fen-text">链接地址</div>
          <el-input
            v-model="query.navigateAddress"
            placeholder="请输入链接地址"
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
        <el-table-column type="selection" width="" class="table-colum">
        </el-table-column>
        <el-table-column
          prop=""
          label="#"
          width="300px"
          type="index"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="navigateName" label="导航名称" width="400px">
        </el-table-column>
        <el-table-column prop="navigateAddress" label="链接地址" width="">
        </el-table-column>
        <el-table-column prop="navigateUrl" label="导航图标" width="">
          <template slot-scope="scope">
            <div class="img-div">
              <img :src="scope.row.navigateUrl" min-width="30" height="30" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sortNo" label="排序" width=""></el-table-column>
        <el-table-column prop="normalDisable" label="是否启用">
          <template slot-scope="scope">
            <div class="column-ture">
              {{ scope.row.normalDisable === 0 ? "停用" : "正常" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width=""> </el-table-column>
        <el-table-column prop="mallGoodsSpecList" label="操作">
        </el-table-column>
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
import { getNavigateList } from "../../../api/short"
import { exportToExcel } from '../../../utils/xlsx'
export default {
  name: "goods",
  data () {
    return {
      dialogVisible: false, //弹出框
      ruleForm: {//新增列表
        navigateName: '',
        navigateAddress: '',
        navigateUrl: '',
        sortNo: '',
        normalDisable: '',
        remark: ''
      },
      rules: {
        navigateName: [
          { required: true, message: '导航名称不为空', trigger: 'blur' },
        ],
        navigateAddress: [
          { required: true, message: '请选择活动区域', trigger: 'blur' }
        ],
        sortNo: [
          { required: true, message: '排序不能为空', trigger: 'blur' }
        ],
      },
      loading: false,
      isShow: true,
      currentPage: 1,
      pageSize: 5,
      tableData: [], //储存列表
      tableData2: [],
      query: {
        navigateName: '',
        navigateAddress: ''
      },
      // dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  created () {
    this.getApiNavigateList()
    this.search()
  },
  methods: {
    //添加图片
    handleRemove (file) {
      console.log(file)
      this.ruleForm.navigateUrl = file.url
    },
    handlePictureCardPreview (file) {
      this.ruleForm.navigateUrl = file.url

      this.dialogVisible = true
    },
    handleDownload (file) {
      console.log(file)
      this.ruleForm.navigateUrl = file.url
    },



    //弹出框
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
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

    //隐藏
    showclick () {
      this.isShow = false
    },
    //搜索
    onSubmit () {
      setTimeout(() => {
        this.loading = true
        setTimeout(() => {

          this.loading = false
          this.tableData2 = ''
          this.tableData2 = this.tableData.filter(
            (item) =>
              item.navigateName.includes(this.query.navigateName) &&
              item.navigateAddress.includes(this.query.navigateAddress)
          )
        }, 500)
      }, 500)

    },
    // 刷新页面
    refreshData () {
      // location.reload();

      setTimeout(() => {
        this.loading = true
        setTimeout(() => {
          this.getApiNavigateList()
          this.loading = false
        }, 500)
      }, 500)
    },
    // 清除表单内容
    onClear () {
      this.refreshData()
    },

    //商品列表
    getApiNavigateList () {
      // console.log('aaa')
      let data = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
      }
      getNavigateList(data).then((res) => {
        // console.log('bbb')
        this.tableData = res.rows
        this.tableData2 = this.tableData
      })
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
        this.total = res.total
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

  },
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
.top-left {
  margin-top: 8px;
}
.add-top {
  font-size: 20px;
  margin-left: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
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
  height: 30px;
  width: 30px;
  overflow: hidden;
}
/* 图像上传 */
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