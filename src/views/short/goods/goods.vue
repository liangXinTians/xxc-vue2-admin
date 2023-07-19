<template>
  <div class="all">
    <!-- 头部 -->
    <div class="top">
      <el-row class="top-left">
        <el-popover placement="right" width="400" trigger="click">
          <el-table :data="gridData">
            <el-table-column>aaaaa</el-table-column>
          </el-table>
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
          <div class="fen-text">商品分类</div>
          <el-input
            v-model="inputFen"
            placeholder="请输入商品分类"
            size="medium"
          ></el-input>
        </div>
        <div class="flex fen">
          <div class="fen-text">商品名称</div>
          <el-input
            v-model="inputMing"
            placeholder="请输入商品名称"
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
        height="600px"
      >
        <el-table-column type="selection" width="55" class="table-colum">
        </el-table-column>
        <el-table-column label="#" width="60" sortable prop="id">
        </el-table-column>
        <el-table-column prop="goodsClassify" label="商品分类" width="140">
        </el-table-column>
        <!-- <el-table-column
          prop="goodsName"
          label="商品名称"
          width="120"
          class="table-colum"
        >
        </el-table-column> -->
        <el-table-column prop="goodsName" label="商品名称" width="120">
        </el-table-column>
        <el-table-column prop="goodsFeature" label="卖点" width="120">
        </el-table-column>
        <el-table-column prop="newPrice" label="销售价" width="120">
        </el-table-column>
        <el-table-column prop="oldPrice" label="划线价" width="120">
        </el-table-column>
        <el-table-column prop="goodsStoc" label="存库" width="120">
        </el-table-column>
        <el-table-column prop="goodsItemUrl" label="主图" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.goodsItemUrl" min-width="30" height="30" />
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
import { getShortList } from "../../../api/short"
export default {
  name: "goods",
  data () {
    return {
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      short: {
        inputMing: '',
        inputfen: '',
        type: '',
        state: '',
      },
      tableData: []
    }
  },
  created () {
    this.getApiShortList()
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    //商品列表
    getApiShortList () {
      console.log('aaa')
      getShortList().then(res => {
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
.bottom {
  position: fixed;
  bottom: 10px;
  right: 20px;
}
</style>