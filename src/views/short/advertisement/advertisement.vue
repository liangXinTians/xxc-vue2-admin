<template>
  <div class="all">
    <!-- 头部 -->
    <div class="top">
      <el-row class="top-left">
        <el-dialog
          v-dialogDrag
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
            <el-form-item label="广告类别" prop="advertType">
              <el-form ref="form" :data="tableData3">
                <el-select
                  v-model="tableData3.dictLabel"
                  style="width: 100%"
                  placeholder="请选择广告类别"
                  clearable
                  @keyup.enter.native="handleQuery"
                >
                  <el-option
                    v-for="item in tableData3"
                    :key="item.id"
                    style="width: 100%"
                    :value="item.dictLabel"
                    :label="item.dictLabel"
                  />
                </el-select>
              </el-form>
            </el-form-item>
            <el-form-item label="广告名称" prop="advertName">
              <el-input
                v-model="ruleForm.advertName"
                placeholder="请输入广告名称"
              />
            </el-form-item>
            <el-form-item label="链接地址" prop="advertAddress">
              <el-input
                v-model="ruleForm.advertAddress"
                placeholder="请输入链接地址"
              />
            </el-form-item>
            <el-form-item label="广告图片" prop="advertUrl">
              <el-upload
                class="upload-demo"
                action="ruleForm.advertUrl"
                :on-success="handleUploadSuccess"
                :before-upload="beforeUpload"
                :limit="1"
                :accept="'image/png, image/jpeg'"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="排序" prop="sortNo">
              <el-input
                v-model="ruleForm.sortNo"
                placeholder="请输入排序"
              />
            </el-form-item>
            <el-form-item label="是否启用">
              <el-radio-group v-model="ruleForm.normalDisable">
                <el-radio
                  v-model="ruleForm.normalDisable"
                  label="0"
                >正常</el-radio>
                <el-radio
                  v-model="ruleForm.normalDisable"
                  label="1"
                >停运</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                v-model="ruleForm.remark"
                placeholder="请输入备注"
              />
            </el-form-item>
            <el-form-item style="position: relative; margin: 40px 0 40px 0">
              <div class="add-button">
                <el-button
                  type="primary"
                  @click="submitForm('ruleForm')"
                >确定</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-button
          size="small"
          @click="dialogVisible = true"
        ><i class="el-icon-plus" /> 新增</el-button>
        <el-button
          plain
          size="small"
          @click="exportData()"
        ><i class="el-icon-download" /> 导出</el-button>
      </el-row>
      <div v-show="isShow" class="top-right">
        <div class="flex fen">
          <div class="fen-text">广告类别</div>
          <el-form ref="form" :data="tableData3">
            <el-select
              v-model="tableData3.dictLabel"
              placeholder="请选择广告类别"
              clearable
              @keyup.enter.native="handleQuery"
            >
              <el-option
                v-for="item in tableData3"
                :key="item.id"
                :value="item.dictLabel"
                :label="item.dictLabel"
              />
            </el-select>
          </el-form>
        </div>

        <div class="flex fen">
          <div class="fen-text">广告名称</div>
          <el-input
            v-model="query.advertName"
            placeholder="请输入广告名称"
            size="medium"
          />
        </div>
        <el-form
          :inline="true"
          :model="short"
          class="demo-form-inline form"
          size="mini"
        >
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="onSubmit"
            >搜索</el-button>
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
            />
            <el-button
              icon="el-icon-refresh"
              size="mini"
              circle
              @click="onClear"
            />
          </el-row>
        </div>
      </div>
    </div>
    <!-- 商品内容 -->
    <div class="content">
      <el-table
        id="oIncomTable"
        ref="multipleTable"
        v-loading="loading"
        :row-key="(r, i) => i"
        :columns="columns"
        :data-source="itemMains"
        :scroll="{
          y: '65vh'
        }"
        :pagination="false"
        :loading="spinning"
        style="margin-top: 10px; width: 100%"
        class="tableCls lable"
        bordered
        :custom-row="loadCustomRow"
        :data="tableData2"
        tooltip-effect="dark"
      >
        <el-table-column type="selection" width="" class="table-colum" sortable />
        <el-table-column prop="" label="#" width="100px" type="index" />
        <el-table-column prop="advertType" label="广告类别" width="200px">
          <template slot-scope="scope">
            <div>
              {{
                scope.row.advertType === 0
                  ? "首页轮播图"
                  : scope.row.advertType === 1
                    ? "首页中部广告位"
                    : "热门推荐"
              }}
              <!-- 热门推荐2 首页轮播图0 首页中部广告位1 -->
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="advertName" label="广告名称" width="200px" />
        <el-table-column
          prop="advertAddress"
          label="链接地址"
          width="200px"
        />
        <el-table-column prop="advertUrl" label="广告图片" width="">
          <template slot-scope="scope">
            <div class="big-img">
              <el-image
                class="img"
                min-width="30"
                height="30"
                :src="
                  scope.row.advertUrl.startsWith('https://sourcebyte.vip')
                    ? scope.row.advertUrl
                    : 'https://sourcebyte.vip' + scope.row.advertUrl
                "
                lazy
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sortNo" label="排序" />
        <el-table-column prop="normalDisable" label="是否启用">
          <template slot-scope="scope">
            <div class="column-ture">
              {{ scope.row.normalDisable === "0" ? "正常" : "停运" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="备注" width="" />
        <el-table-column prop="" label="操作" />
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="bottom">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData2.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { getAdvertiseList, getAdvertType, upload } from '../../../api/short'
import { exportToExcel } from '../../../utils/xlsx'
export default {
  name: 'Advertisement',
  data() {
    return {
      dialogVisible: false, // 新增显示
      ruleForm: {
        advertType: '',
        advertUrl: '',
        searchValue: '',
        advertName: '',
        advertAddress: '',
        sortNo: '',
        normalDisable: '',
        remark: ''
      },
      rules: {
        advertType: [
          { required: true, message: '广告类别不为空', trigger: 'blur' }
        ],
        advertName: [
          { required: true, message: '请选择活动区域', trigger: 'blur' }
        ],
        advertAddress: [
          { required: true, message: '链接地址不能为空', trigger: 'blur' }
        ],
        advertUrl: [
          { required: true, message: '广告图片不为空', trigger: 'blur' }
        ],
        sortNo: [
          { required: true, message: '排序不能为空', trigger: 'blur' }
        ],
        normalDisable: [
          { required: true, message: '选择是否启用', trigger: 'blur' }
        ]
      },
      query: {
        advertType: '',
        advertName: ''
      },
      loading: false,
      isShow: true,
      visible: false,
      tableData: [], // 临时储存列表
      tableData2: [], // 广告储存列表
      tableData3: [] // advert-type储存列表

    }
  },
  created() {
    this.getApiAdvertiseList()
    this.getApiAdvertType()
  },
  methods: {
    // 导出
    exportData() {
      exportToExcel('自定义文件名称', document.querySelector('#oIncomTable'), this)
    },
    // 新增列表
    submitForm() {
      if (this.tableData3.dictLabel === '首页轮播图') {
        this.ruleForm.advertType = 0
      }
      if (this.tableData3.dictLabel === '首页中部广告') {
        this.ruleForm.advertType = 1
      }
      if (this.tableData3.dictLabel === '热门推荐') {
        this.ruleForm.advertType = 2
      }

      const obj = { // 暂存新增的数据
        advertType: this.ruleForm.advertType,
        advertUrl: this.ruleForm.advertUrl,
        searchValue: this.ruleForm.searchValue,
        advertName: this.ruleForm.advertName,
        advertAddress: this.ruleForm.advertAddress,
        sortNo: this.ruleForm.sortNo,
        normalDisable: this.ruleForm.normalDisable,
        remark: this.ruleForm.remark
      }

      this.tableData.push(obj) // 新增一行数据

      this.ruleForm.advertType = ''
      this.ruleForm.advertUrl = ''
      this.ruleForm.searchValue = ''
      this.ruleForm.advertName = ''
      this.ruleForm.advertAddress = ''
      this.ruleForm.sortNo = ''
      this.ruleForm.normalDisable = ''
      this.ruleForm.remark = ''

      this.dialogVisible = false
    },
    resetForm() {
      this.dialogVisible = false
    },

    // 引入图片
    handleUploadSuccess(response, file) {
      // 处理上传成功后的操作
      // console.log(response)
      // console.log(response.url)
      this.ruleForm.advertUrl = response.url

      const params = {
        advertUrl: response.url
      }
      upload(params).then(res => {

      })
    },
    beforeUpload(file) {
      // 限制文件大小为50MB
      const isLt50M = file.size / 1024 / 1024 < 50
      if (!isLt50M) {
        this.$message.error('上传图片大小不能超过50MB!')
      }
      // 限制文件类型为png/jpg/jpeg
      const isImage = file.type === 'image/png' || file.type === 'image/jpeg'
      if (!isImage) {
        this.$message.error('只能上传png/jpg/jpeg格式的图片!')
      }
      return isLt50M && isImage
    },

    // 隐藏
    showclick() {
      this.isShow = false
    },
    // 每页条数
    // handleSizeChange (val) {
    //   this.cur = val
    //   const params = {
    //     pageNum: this.currentPage,
    //     pageSize: this.cur,
    //     orderByColumn: "create_time",
    //     isAsc: "desc"
    //   }
    //   getShortList(params).then(res => {
    //     this.tableData = res.rows
    //   })
    // },
    // 当前页
    // handleCurrentChange (val) {
    //   this.currentPage = val
    //   const params = {
    //     pageNum: this.currentPage,
    //     pageSize: this.cur,
    //     orderByColumn: "create_time",
    //     isAsc: "desc"
    //   }
    //   getShortList(params).then(res => {
    //     this.tableData = res.rows
    //   })
    // },
    // 刷新页面
    refreshData() {
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
    onClear() {
      this.refreshData()
    },
    // 商品列表
    getApiAdvertiseList() {
      console.log('aaa')
      getAdvertiseList().then(res => {
        console.log('bbb')
        this.tableData = res.rows
        this.tableData2 = this.tableData
      })
    },
    // adver-type列表
    getApiAdvertType() {
      getAdvertType().then(res => {
        this.tableData3 = res.data
      })
    },

    // 搜索
    onSubmit() {
      setTimeout(() => {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.tableData2 = ''
          if (this.tableData3.dictLabel === '首页轮播图') {
            this.query.advertType = 0
          }
          if (this.tableData3.dictLabel === '首页中部广告') {
            this.query.advertType = 1
          }
          if (this.tableData3.dictLabel === '热门推荐') {
            this.query.advertType = 2
          }
          this.tableData2 = this.tableData.filter(
            (item) =>
              item.advertType === this.query.advertType &&
              item.advertName.includes(this.query.advertName)
          )
        }, 500)
      }, 500)
    }
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
.top-left {
  margin-top: 8px;
}
.add-button {
  position: absolute;
  right: 0;
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
  height: auto;
}
.table {
  font-size: 12px;
}
.table-colum {
  /* height: 400px; */
  height: auto;

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

.big-img {
  height: 30px;
  width: 30px;
  overflow: hidden;
  border-radius: 5px;
  background-color: rgb(230, 230, 230);
}
.big-img .img {
  transition: all 0.4s;
}

.big-img .img:hover {
  transform: scale(1.2);
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
