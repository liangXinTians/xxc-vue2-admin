<template>
  <div class="all">
    <!-- 头部 -->
    <div class="top">
      <el-row class="top-left">
        <el-button plain size="small" @click="exportData()"
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
        :data="tableData"
        tooltip-effect="dark"
        height="600px"
        v-loading="loading"
      >
        <el-table-column type="selection" width="" class="table-colum">
        </el-table-column>
        <el-table-column prop="" label="#" width="" type="index">
        </el-table-column>
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
          <template slot-scope="scope">
            <div>
              {{ scope.row.payStatus === 1 ? "已支付" : "待支付" }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="orderStatus" label="订单状态">
          <template slot-scope="scope">
            <div>
              {{ scope.row.orderStatus === 0 ? "待付款" : "待发货" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="备注" width=""> </el-table-column>
        <el-table-column prop="" label="操作" fixed="right" width="150px">
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
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getOrderList } from "../../../api/short"
import { exportToExcel } from '../../../utils/xlsx'
export default {
  name: "orders",
  data () {
    return {
      loading: false,
      tableData: [] //储存列表
    }
  },
  created () {
    this.getApiOrderList()
  },
  methods: {
    //导出
    exportData () {
      exportToExcel('自定义文件名称', document.querySelector('#oIncomTable'), this)
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
    getApiOrderList () {
      console.log('aaa')
      getOrderList().then(res => {
        console.log('bbb')
        this.tableData = res.rows
      })
    },
    // 表单提交
    onSubmit () {
      this.refreshData()
    },
    // 刷新页面
    refreshData () {
      // location.reload();

      setTimeout(() => {
        this.loading = true
        setTimeout(() => {
          this.getApiOrderList()
          this.loading = false
        }, 500)
      }, 500)
    },
    // 清除表单内容
    onClear () {
      this.refreshData()
    },
  },
  computed: {
    //输入值筛选
    tableData2 () {
      return this.tableData.filter(
        (item) =>
          item.goodsClassify.includes(this.query.goodsClassify) &&
          item.goodsName.includes(this.query.goodsName)
      )
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