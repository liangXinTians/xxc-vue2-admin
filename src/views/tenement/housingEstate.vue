<template>
  <div class="app-container">
    <!-- 搜索条 -->
    <div class="nav">
      <div class="right flex">
        <!-- 表单 -->
        <el-form
          :inline="true"
          :model="plot"
          class="demo-form-inline form"
          size="mini"
          @submit.native.prevent
        >
          <el-form-item label="名称">
            <el-input
              v-model.trim="plot.name"
              class="input"
              placeholder="请输入名称"
              size="mini"
              clearable
            />
          </el-form-item>
          <el-form-item label="代号">
            <el-input
              v-model.trim="plot.code"
              class="input"
              placeholder="请输入代号"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              native-type="submit"
              @click="onSubmit"
            >搜索</el-button>
            <el-button icon="el-icon-refresh" @click="onClear">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" size="mini" circle />
            <el-button
              icon="el-icon-refresh"
              size="mini"
              circle
              @click="onSubmit()"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 内容 -->
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="houseVillageList"
      tooltip-effect="dark"
      size="mini"
      height="566px"
      style="width: 100%"
      :cell-style="rowStyle"
      :header-cell-style="rowClass"
      :row-style="{ height: '25px' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="#" type="index" width="50" />
      <el-table-column prop="name" label="名称" width="185" />
      <el-table-column prop="areaCode" label="区域" width="195" />
      <el-table-column
        prop="year"
        label="年份"
        width="88"
        show-overflow-tooltip
      />
      <el-table-column
        prop="type"
        label="建筑类型"
        width="110"
        show-overflow-tooltip
      />
      <el-table-column
        prop="green"
        label="绿化率"
        width="90"
        show-overflow-tooltip
      />
      <el-table-column
        prop="introduce"
        label="介绍"
        width="230"
        show-overflow-tooltip
      />
      <el-table-column
        prop="remark"
        label="备注"
        show-overflow-tooltip
      />
      <el-table-column label="操作" show-overflow-tooltip />
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      :current-page="pageNum"
      :page-sizes="[20, 50, 100, 200]"
      :page-size="20"
      layout="->,total, sizes, prev, pager, next, jumper"
      :total="this.houseVillageList.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getHouseVillageList } from '@/api/tenement.js'
export default {
  name: '',
  props: [],
  data() {
    return {
      // 搜索框小区信息
      plot: {
        // 名称
        name: '',
        // 代号
        code: ''
      },
      // 小区管理信息
      houseVillageList: [],
      // 多选框数据
      multipleSelection: [],
      // loading效果
      loading: false,
      // 页数
      pageNum: 1,
      // 每页多少条数据
      pageSize: 20
    }
  },
  mounted() {
    this.getHVillageList()
  },
  methods: {
    // 获取小区管理信息
    getHVillageList() {
      this.loading = true
      const { name, code } = this.plot

      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...(name && { name }),
        ...(code && { code })
      }
      getHouseVillageList(params).then(res => {
        this.houseVillageList = res.rows.reverse()
        this.loading = false
      })
    },
    // 顶部表单提交
    onSubmit() {
      this.getHVillageList()
    },

    // 清除表单内容
    onClear() {
      Object.keys(this.plot).forEach(key => {
        this.plot[key] = ''
      })
      // this.plot.name = "";
      // this.plot.code = "";
      this.getHVillageList()
    },
    // 多选框方法
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 修改页面条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getHVillageList()
    },
    // 修改页面数
    handleCurrentChange(val) {
      this.pageNum = val
      this.getHVillageList()
    },
    // 修改表头样式
    rowStyle() {
      return 'text-align:center'
    },
    // 修改表头样式
    rowClass({ row, rowIndex }) {
      return 'text-align:center;background:rgba(248, 248, 248, 1);color: #515a6e;'
    }
  }
}
</script>
<style lang="scss" scoped>
/* 搜索按钮 */
>>> .el-button--primary {
  background-color: #1890ff;
  border-color: #1890ff;
}

>>> .el-button--primary.is-active,
.el-button--primary:active {
  background: #1682e6;
  border-color: #1682e6;
  color: #fff;
}
// 分页器
>>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #1890ff;
  color: #fff;
}
// 搜索按钮
.el-form-item--mini.el-form-item {
  margin-bottom: 10px;
}

.app-container {
  background-color: #fff;
  padding: 10px 0 0 0;
  .nav {
    width: 100%;
    height: 36px;

    .input {
      width: 140px;
    }
  }
}

// 导航栏
.demo-form-inline {
  float: right;
}

// 输入框
</style>
