<template>
  <div class="all">
    <!-- 头部 -->
    <div class="top">
      <el-row class="top-left">
        <el-dialog
          title="添加商品管理"
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
            <!-- <div class="add-top">添加商品管理</div> -->
            <el-row>
              <el-col span="12">
                <el-form-item label="商品分类" prop="goodsClassify">
                  <el-input
                    v-model="ruleForm.goodsClassify"
                    placeholder="请选择商品分类"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="商品名称" prop="goodsName">
                  <el-input
                    v-model="ruleForm.goodsName"
                    placeholder="请输入商品名称"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="卖点">
                  <el-input
                    v-model="ruleForm.goodsFeature"
                    placeholder="产品卖点或简要介绍，10-30字最佳"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="销售价" prop="">
                  <el-input
                    v-model="ruleForm.newPrice"
                    placeholder="请输入销售价"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="12">
                <el-form-item label="划线价">
                  <el-input
                    v-model="ruleForm.oldPrice"
                    placeholder="请输入划线价"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="库存" prop="goodsStock">
                  <el-input
                    v-model="ruleForm.goodsStock"
                    placeholder="请输入库存"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="主图" prop="goodsItemUrl">
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
            <el-form-item label="轮播图" prop="articleContent">
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
            <el-form-item label="图文详情" prop=""> </el-form-item>

            <el-form-item label="是否上架">
              <el-radio-group v-model="ruleForm.status">
                <el-radio label="0">上架</el-radio>
                <el-radio label="1">下架</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否热门">
              <el-radio-group v-model="ruleForm.hotStatus">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="form-bottom">
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
      <div class="top-right" v-show="show">
        <el-form :inline="true" :model="query" class="flex fen" size="mini">
          <el-form-item label="商品分类">
            <el-input
              v-model="query.goodsClassify"
              placeholder="请输入商品分类"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input
              v-model="query.goodsName"
              placeholder="请输入商品名称"
            ></el-input>
          </el-form-item>
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
        height="550px"
        v-loading="loading"
      >
        <el-table-column type="selection" width="55" class="table-colum">
        </el-table-column>
        <el-table-column label="#" width="60" prop="" type="index">
        </el-table-column>
        <el-table-column prop="goodsClassify" label="商品分类" width="140">
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称"
          width="120"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="goodsFeature" label="卖点" width="120">
        </el-table-column>
        <el-table-column prop="newPrice" label="销售价" width="120">
        </el-table-column>
        <el-table-column prop="oldPrice" label="划线价" width="120">
        </el-table-column>
        <el-table-column prop="goodsStock" label="存库" width="120">
        </el-table-column>
        <el-table-column prop="goodsItemUrl" label="主图" width="120">
          <template slot-scope="scope">
            <div class="big-img">
              <img :src="scope.row.goodsItemUrl" min-width="30" height="30" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sortNo" label="浏览量" width="120">
        </el-table-column>
        <el-table-column prop="status" label="是否上架" width="120">
        </el-table-column>
        <el-table-column prop="hotStatus" label="是否热门"> </el-table-column>
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
import { getShortList } from "../../../api/short"
import { exportToExcel } from '../../../utils/xlsx'
export default {
  name: "goods",
  data () {
    return {
      dialogVisible: false, //弹出框
      imageUrl: '',
      ruleForm: {
        goodsClassify: '',
        goodsName: '',
        goodsFeature: '',
        newPrice: '',
        oldPrice: '',
        goodsStock: '',
        goodsItemUrl: '',
        articleContent: '',
        mallGoodsSpecList: '',
        status: '',
        hotStatus: '',
      },
      rules: {
        goodsClassify: [
          { required: true, message: '商品分类不能为空', trigger: 'blur' },
        ],
        goodsName: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' }
        ],
        newPrice: [
          { required: true, message: '销售价不能为空', trigger: 'blur' }
        ],
        goodsStock: [
          { required: true, message: '库存不能为空', trigger: 'blur' },
        ],
        goodsItemUrl: [
          { required: true, message: '主图不能为空', trigger: 'blur' }
        ],
        articleContent: [
          { required: true, message: '轮播图不能为空', trigger: 'blur' }
        ],
      },
      show: true,
      gridData: [],
      query: {
        goodsClassify: "",
        goodsName: "",
      },
      tableData: [],
      tableData2: [],
      loading: false,
      currentPage: 1,
      cur: 20,

    }
  },
  created () {
    this.getApiShortList()
    // this.tableData2()
  },
  methods: {
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
    //图片上传
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
    //商品列表
    getApiShortList () {
      console.log('aaa')
      getShortList().then(res => {
        console.log('bbb')
        this.tableData = res.rows
        this.tableData2 = this.tableData
      })
    },

    //更多
    showclick () {
      this.show = false
    },

    //提交
    onSubmit () {
      setTimeout(() => {
        this.loading = true
        setTimeout(() => {

          this.loading = false
          this.tableData2 = ''
          this.tableData2 = this.tableData.filter(
            (item) =>
              item.goodsClassify.includes(this.query.goodsClassify) &&
              item.goodsName.includes(this.query.goodsName)
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
          this.getApiShortList()
          this.loading = false
        }, 500)
      }, 500)
    },
    // 清除表单内容
    onClear () {
      this.refreshData()
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
}
.table {
  font-size: 12px;
  /* margin-top: 10px; */
}
.table-colum {
  /* display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
  height: 400px;
}
.big-img {
  height: 30px;
  width: 30px;
  overflow: hidden;
  border-radius: 5px;
  background-color: rgb(230, 230, 230);
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.144);
}
.big-img img {
  transition: all 0.4s;
}

.big-img img:hover {
  transform: scale(1.2);
}

.bottom {
  position: fixed;
  bottom: 10px;
  right: 20px;
}
.form-bottom {
  margin-left: 600px;
  margin-top: 20px;
}
</style>