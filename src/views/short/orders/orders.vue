<template>
  <div class="all">
    <!-- 头部 -->
    <div class="top">
      <el-row class="top-left">
        <el-button plain size="small" @click="pullGoods"
          ><i class="el-icon-download"></i> 导出</el-button
        >
      </el-row>
      <div class="top-right">
        <div class="flex fen">
          <div class="fen-text">订单号</div>
          <el-input
            v-model="inputFen"
            placeholder="请输入订单号"
            size="medium"
          ></el-input>
        </div>
        <div class="flex fen">
          <div class="fen-text">订单状态</div>
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
        <el-table-column type="selection" width="" class="table-colum">
        </el-table-column>
        <el-table-column prop="id" label="#" width=""> </el-table-column>
        <el-table-column prop="orderCode" label="订单号" width="200px">
        </el-table-column>
        <el-table-column prop="orderCreateTime" label="创建时间" width="200px">
        </el-table-column>
        <el-table-column prop="receiver" label="收货人" width="">
        </el-table-column>
        <el-table-column
          prop="receiverPhone"
          label="联系方式"
          width="200px"
        ></el-table-column>
        <el-table-column prop="receiverAddress" label="收货地址">
        </el-table-column>
        <el-table-column prop="payAmount" label="支付金额" width="">
        </el-table-column>
        <el-table-column prop="" label="支付方式" width="150px">
        </el-table-column>
        <el-table-column prop="" label="支付时间" width="150px">
        </el-table-column>
        <el-table-column prop="payStatus" label="支付状态" width="">
        </el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" width="">
        </el-table-column>
        <el-table-column prop="" label="备注" width=""> </el-table-column>
        <el-table-column prop="" label="操作" fixed="right" width="150px">
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
import { getOrderList } from "../../../api/short"
export default {
  name: "orders",
  data () {
    return {
      tableData: [] //储存列表
    }
  },
  created () {
    this.getApiOrderList()
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    //商品列表
    getApiOrderList () {
      console.log('aaa')
      getOrderList().then(res => {
        console.log('bbb')
        this.tableData = res.rows
      })
    },
    //导出
    pullGoods () {
    },
    // 表单提交
    onSubmit () {
    },
    // 清除表单内容
    onClear () {
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
  /* width: 100%; */
}
</style>