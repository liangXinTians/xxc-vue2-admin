<template>
  <div class="app-main">
    <div class="app-container">
      <!-- 头部标签 -->
      <div class="header">
        <div class="tool"></div>
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <el-form-item label="类型">
            <el-select v-model="formInline.businessType" placeholder="操作类型">
              <el-option label="新增" value="1"></el-option>
              <el-option label="修改" value="2"></el-option>
              <el-option label="删除" value="3"></el-option>
              <el-option label="授权" value="4"></el-option>
              <el-option label="导出" value="5"></el-option>
              <el-option label="导入" value="6"></el-option>
              <el-option label="强退" value="7"></el-option>
              <el-option label="生成代码" value="8"></el-option>
              <el-option label="清空数据" value="9"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作时间">
            <el-date-picker
              v-model="formInline.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="onSubmit"
              icon="el-icon-search"
              style="background:#1890ff;color:#fff"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
        <div type="danger">
          <el-button icon="el-icon-refresh" size="mini" @click="reset"
            >重置</el-button
          >
        </div>
      </div>
      <!-- 表单 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;height:100%"
        @selection-change="handleSelectionChange"
        size="mini"
        :default-sort="{ prop: 'date', order: 'descending' }"
        height="560"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="operId" label="日志编号" width="120">
        </el-table-column>
        <el-table-column prop="title" label="分类管理" width="120">
        </el-table-column>
        <el-table-column
          prop="businessType"
          label="操作类型"
          :filters="[
            { text: '家', value: '家' },
            { text: '公司', value: '公司' }
          ]"
          :filter-method="filterTag"
        >
          <template slot-scope="scope"
            ><el-tag
              :type="scope.row.businessType === '家' ? 'primary' : 'success'"
              disable-transitions
              >{{ scope.row.businessType }}</el-tag
            ></template
          >
        </el-table-column>
        <el-table-column prop="requestMethod" label="请求方式">
        </el-table-column>
        <el-table-column prop="operName" label="操作人员" sortable>
        </el-table-column>
        <el-table-column prop="operIp" label="操作地址"> </el-table-column>
        <el-table-column prop="operLocation" label="操作地点">
        </el-table-column>
        <el-table-column prop="status" label="操作状态"> </el-table-column>
        <el-table-column prop="operTime" label="操作日期" sortable>
        </el-table-column>
        <el-table-column prop="" label="操作"> </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="cur"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getAipOperation } from "../../../../api/system";
export default {
  data() {
    return {
      formInline: {
        businessType: "", //操作类型
        time: "" //状态搜索
      },
      tableData: [], //表单总数据
      total: 0, //总数据条数
      value: "", //绑定时间
      currentPage: 1, //当前页
      cur: 20 //每页数据条数
    };
  },
  mounted() {
    this.getOperation();
  },

  methods: {
    //获取列表数据
    getOperation() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.cur
      };
      getAipOperation(params).then(res => {
        this.total = res.total;
        this.tableData = res.rows;
      });
    },
    // 搜索
    onSubmit() {
      let time1 = this.getTime(this.formInline.time[0]);
      let time2 = this.getTime(this.formInline.time[1]);
      const params = {
        pageNum: this.currentPage,
        pageSize: this.cur,
        businessType: this.formInline.businessType,
        beginTime: time1,
        endTime: time2
      };
      getAipOperation(params).then(res => {
        this.total = res.total;
        this.tableData = res.rows;
      });
    },
    // 重置
    reset() {
      this.formInline.businessType = "";
      this.formInline.time = "";
      this.getOperation();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //每页条数
    handleSizeChange(val) {
      this.cur = val;
      const params = {
        pageNum: this.currentPage,
        pageSize: this.cur
      };
      getAipOperation(params).then(res => {
        this.total = res.total;
        this.tableData = res.rows;
      });
    },
    //当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      const params = {
        pageNum: this.currentPage,
        pageSize: this.cur
      };
      getAipOperation(params).then(res => {
        this.total = res.total;
        this.tableData = res.rows;
      });
    },
    //时间
    getTime(time) {
      let a = new Date(time);
      let y = a.getFullYear();
      let m = a.getMonth() + 1;
      let d = a.getDate();
      return y + "-" + m + "-" + d;
    },
    filterTag(value, row) {
      console.log(value, row);
    }
  }
};
</script>

<style lang="scss">
.app-main {
  .app-container {
    padding: 8px;
    .header {
      margin: 0 -5px 8px;
      display: flex;
      justify-content: space-between;
      .tool {
        flex: 1;
      }
      el-input {
        height: 26px;
      }
    }
    .block {
      position: fixed;
      bottom: 10px;
      right: 10px;
    }
  }
}
</style>
