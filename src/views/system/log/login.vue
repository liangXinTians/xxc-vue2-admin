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
          <el-form-item label="用户名称">
            <el-input
              v-model="formInline.userName"
              placeholder="请输入用户名称"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="登录时间">
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
        style="width: 100%;"
        @selection-change="handleSelectionChange"
        size="mini"
        :default-sort="{ prop: 'date', order: 'descending' }"
        height="560"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="infoId" label="访问编号" width="100">
        </el-table-column>
        <el-table-column prop="userName" label="用户名称" width="100" sortable>
        </el-table-column>
        <el-table-column prop="ipaddr" label="登录地址"> </el-table-column>
        <el-table-column prop="loginLocation" label="登录地点">
        </el-table-column>
        <el-table-column prop="browser" label="浏览器"> </el-table-column>
        <el-table-column prop="os" label="操作系统"> </el-table-column>
        <el-table-column prop="status" label="登录状态" width="70"
          ><template slot-scope="scope">
            <el-tag :type="scope.row.status == 0 ? '' : 'danger'" size="mini">{{
              scope.row.status == 0 ? "成功" : "失败"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="msg" label="操作信息"> </el-table-column>
        <el-table-column prop="loginTime" label="登录日期" sortable>
        </el-table-column>
      </el-table>
      <div class="block" style="color:rgb(96, 98, 102)">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="cur"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="color:rgb(96, 98, 102);font-size 13px;font-weight 700"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getAipLogin } from "@/api/system";
export default {
  data() {
    return {
      formInline: {
        userName: "", //操作类型
        time: "" //状态搜索
      },
      tableData: [], //表单总数据
      total: 0, //总数据条数
      value: "", //绑定时间
      currentPage: 1, //当前页
      cur: 20 //每页数据条数
    };
  },
  created() {
    this.getLogin();
  },
  mounted() {},
  methods: {
    //获取列表数据
    getLogin() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.cur
      };
      getAipLogin(params).then(res => {
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
        userName: this.formInline.userName,
        beginTime: time1,
        endTime: time2
      };
      getAipLogin(params).then(res => {
        this.total = res.total;
        this.tableData = res.rows;
      });
    },
    // 重置
    reset() {
      this.formInline.userName = "";
      this.formInline.time = "";
      this.getLogin();
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
      getAipLogin(params).then(res => {
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
      getAipLogin(params).then(res => {
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
