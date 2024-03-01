<template>
  <div class="all">
    <!-- 头部 -->
    <div class="top">
      <el-row class="top-left">
        <el-button
          plain
          size="small"
          @click="addAddress"
        ><i class="el-icon-plus" /> 新增</el-button>
        <el-button
          plain
          size="small"
          @click="exportData"
        ><i class="el-icon-download" /> 导出</el-button>
      </el-row>
      <div class="top-right">
        <div class="flex fen">
          <div class="fen-text">收货人</div>
          <el-input
            v-model="search.userName"
            placeholder="请输入收货人"
            size="medium"
          />
        </div>
        <div class="flex fen">
          <div class="fen-text">手机号</div>
          <el-input
            v-model="search.phone"
            placeholder="请输入手机号"
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
              @click="onSearch"
            >搜索</el-button>
            <el-button icon="el-icon-refresh" @click="onClear">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="another">
          <el-row>
            <el-button icon="el-icon-search" size="mini" circle />
            <el-button icon="el-icon-refresh" size="mini" circle />
          </el-row>
        </div>
      </div>
    </div>
    <!-- 商品内容 -->

    <div class="content">
      <el-table
        ref="multipleTable"
        highlight-current-row
        class="lable"
        :data="filteredData.length > 0 ? filteredData : tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :scroll="{
          y: '65vh'
        }"
      >
        <el-table-column type="selection" width="55" class="table-colum" />
        <el-table-column prop="index" label="#" width="50" />
        <el-table-column prop="userName" label="收货人" width="178" />
        <el-table-column prop="phone" label="手机号" width="178" />
        <el-table-column prop="address" label="地址" width="178" />
        <el-table-column prop="isDefault" label="默认地址" width="178">
          <el-switch v-model="tableData.isDefault" />
        </el-table-column>
        <el-table-column prop="normalDisable" label="是否启用" width="178">
          <el-switch v-model="tableData.normalDisable" />
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="178" />
        <el-table-column prop="" label="操作" />
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="bottom">
      <el-pagination
        background
        :page-sizes="[10, 20, 50, 100]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange(10)"
        @current-change="handleCurrentChange(1)"
      />
    </div>

    <!--添加表-->
    <el-dialog title="添加收货地址" :visible.sync="dialogVisible" width="60%">
      <el-form ref="newAddressForm" :model="newAddressForm" label-width="80px">
        <el-form-item
          label="收货人"
          prop="userName"
          placeholder="请输入收货人"
          :rules="[{ required: true, message: '请输入收货人' }]"
        >
          <el-input v-model="newAddressForm.userName" />
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phone"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请输入手机号' }]"
        >
          <el-input v-model="newAddressForm.phone" />
        </el-form-item>
        <el-form-item
          label="地址"
          prop="address"
          placeholder="请输入地址"
          :rules="[{ required: true, message: '请输入地址' }]"
        >
          <el-input v-model="newAddressForm.address" />
        </el-form-item>
        <el-form-item
          label="默认地址"
          prop="isDefault"
          :rules="[{ required: true, message: '请选择是否为默认地址' }]"
        >
          <el-radio-group v-model="newAddressForm.isDefault">
            <el-radio label="true">是</el-radio>
            <el-radio label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="是否启用"
          prop="normalDisable"
          :rules="[{ required: true, message: '请选择是否启用' }]"
        >
          <el-radio-group v-model="newAddressForm.normalDisable">
            <el-radio label="true">是</el-radio>
            <el-radio label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="newAddressForm.remark" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveNewAddress">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { apiGetAddress } from '../../../api/short'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
export default {
  name: 'Address',
  data() {
    return {
      tableData: [],
      filteredData: [],
      value1: true,
      value2: true,
      search: {
        userName: '',
        phone: ''
      },
      dialogVisible: false, // 控制对话框的显示和隐藏
      newAddressForm: {
        userName: '',
        phone: '',
        address: '',
        isDefault: false,
        normalDisable: false,
        remark: ''
      }
    }
  },
  created() {
    console.log('11')
    this.getAddress()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 地址列表
    getAddress() {
      apiGetAddress().then(res => {
        console.log(res)
        this.tableData = res.rows
      })
    },
    // 新增商品
    addAddress() {
      this.dialogVisible = true
    },
    saveNewAddress() {
      // 将 newAddressForm 的数据保存到 tableData 数组中
      this.tableData.push({
        userName: this.newAddressForm.userName,
        phone: this.newAddressForm.phone,
        address: this.newAddressForm.address,
        isDefault: this.newAddressForm.isDefault,
        normalDisable: this.newAddressForm.normalDisable,
        remark: this.newAddressForm.remark
      })
      // 关闭对话框，并清空表单数据
      this.dialogVisible = false
      this.newAddressForm = {
        userName: '',
        phone: '',
        address: '',
        isDefault: false,
        normalDisable: false,
        remark: ''
      }
    },
    // 导出
    exportData() {
      const headers = [
        { label: '收货人', value: 'userName' },
        { label: '手机号', value: 'phone' },
        { label: '地址', value: 'address' },
        { label: '默认地址', value: 'isDefault' },
        { label: '是否启用', value: 'normalDisable' },
        { label: '备注', value: 'remark' }
      ]

      const data = this.tableData.map(item => ({
        userName: item.userName,
        phone: item.phone,
        address: item.address,
        isDefault: item.isDefault ? '是' : '否',
        normalDisable: item.normalDisable ? '是' : '否',
        remark: item.remark
      }))

      const worksheet = XLSX.utils.json_to_sheet(data, { header: headers.map(h => h.label) })
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] }
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
      const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' })

      saveAs(excelData, '地址列表.xlsx')
    },
    // 搜索
    onSearch() {
      const params = this.search
      console.log(params.userName)
      console.log(params.phone)
      this.filteredData = this.tableData.filter(item => {
        console.log(item)
        return (
          item.userName.includes(params.userName) ||
          item.phone.includes(params.phone)
        )
      })
    },
    // 清除表单内容
    onClear() {
      this.search.userName = ''
      this.search.phone = ''
      this.filteredData = [] // Add this line to clear the filtered data
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
}

.table-colum {
  height: 400px;
}

.bottom {
  position: fixed;
  bottom: 10px;
  right: 20px;
}
</style>
