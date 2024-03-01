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
            v-model="query.orderCode"
            placeholder="请输入订单号"
            size="medium"
          ></el-input>
        </div>

        <div class="flex fen">
          <div class="fen-text">订单状态</div>
          <el-form ref="form" :data="tableData3">
            <el-select
              v-model="tableData3.dictLabel"
              placeholder="请选择订单状态"
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
        :data="tableData2"
        tooltip-effect="dark"
        height="550px"
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
          width="140px"
        ></el-table-column>
        <el-table-column prop="receiverAddress" label="收货地址">
        </el-table-column>
        <el-table-column prop="payAmount" label="支付金额" width="">
        </el-table-column>
        <el-table-column prop="" label="支付方式" width="130px">
        </el-table-column>
        <el-table-column prop="" label="支付时间" width="110px">
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
              {{ scope.row.orderStatus === 1 ? "待发货" : "待付款" }}
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
        :total="tableData2.length"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getOrderList, getOrderStatus } from "../../../api/short"
import { exportToExcel } from '../../../utils/xlsx'
export default {
  name: "orders",
  data () {
    return {
      loading: false,
      query: {
        orderCode: '',
        orderStatus: ''
      },
      tableData: [],//暂时储存列表
      tableData2: [], //储存列表
      tableData3: [] //支付状态储存

    }
  },
  created () {
    this.getApiOrderList()
    this.getApiOrderStatus()
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
        this.tableData = res.rows
        this.tableData2 = this.tableData
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
        this.tableData2 = this.tableData
      })
    },
    //商品支付状态
    getApiOrderStatus () {
      getOrderStatus().then(res => {
        console.log('bbb')
        this.tableData3 = res.data
      })
    },
    // 表单提交
    onSubmit () {
      setTimeout(() => {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.tableData2 = ''

          if (this.tableData3.dictLabel == "待发货") {
            this.query.orderStatus = 0
          }
          if (this.tableData3.dictLabel == "待付款") {
            this.query.orderStatus = 1
          }
          if (this.tableData3.dictLabel == "待收货") {
            this.query.orderStatus = 2
          }
          if (this.tableData3.dictLabel == "待评价") {
            this.query.orderStatus = 3
          }
          if (this.tableData3.dictLabel == "已完成") {
            this.query.orderStatus = 4
          }
          if (this.tableData3.dictLabel == "已关闭") {
            this.query.orderStatus = 5
          }
          if (this.tableData3.dictLabel == "已退款") {
            this.query.orderStatus = 6
          }

          this.tableData2 = this.tableData.filter(
            (item) =>
              item.orderStatus == this.query.orderStatus &&
              item.orderCode.includes(this.query.orderCode)
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
  // computed: {
  //   //输入值筛选
  //   tableData2 () {
  //     return this.tableData.filter(
  //       (item) =>
  //         item.goodsClassify.includes(this.query.goodsClassify) &&
  //         item.goodsName.includes(this.query.goodsName)
  //     )
  //   },
  // },

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
  font-size: 10px;
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
</style>