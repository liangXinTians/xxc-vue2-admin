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
        :header-cell-style="{background:'rgb(248,248,249)'}"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="operId" label="日志编号" width="120">
        </el-table-column>
        <el-table-column prop="title" label="系统模块" width="120">
        </el-table-column>
        <el-table-column prop="businessType" label="操作类型">
          <template slot-scope="scope"
            ><el-tag v-if="scope.row.businessType == 1" type="info" size="mini"
              >新增</el-tag
            >
            <el-tag
              v-else-if="scope.row.businessType == 2"
              type="info"
              size="mini"
              >修改</el-tag
            >
            <el-tag
              v-else-if="scope.row.businessType == 3"
              type="danger"
              size="mini"
              >删除</el-tag
            >
            <el-tag v-else-if="scope.row.businessType == 4" size="mini"
              >授权</el-tag
            >
            <el-tag
              v-else-if="scope.row.businessType == 5"
              type="warning"
              size="mini"
              >导出</el-tag
            >
            <el-tag
              v-else-if="scope.row.businessType == 6"
              type="warning"
              size="mini"
              >导入</el-tag
            >
            <el-tag
              v-else-if="scope.row.businessType == 7"
              type="danger"
              size="mini"
              >强退</el-tag
            >
            <el-tag
              v-else-if="scope.row.businessType == 8"
              type="warning"
              size="mini"
              >生成代码</el-tag
            >
            <el-tag
              v-else-if="scope.row.businessType == 9"
              type="danger"
              size="mini"
              >清空数据</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="requestMethod" label="请求方式">
        </el-table-column>
        <el-table-column prop="operName" label="操作人员" sortable>
        </el-table-column>
        <el-table-column prop="operIp" label="操作地址"> </el-table-column>
        <el-table-column prop="operLocation" label="操作地点">
        </el-table-column>
        <el-table-column prop="status" label="操作状态"
          ><template slot-scope="scope">
            <el-tag
              :type="scope.row.status == 0 ? '' : 'danger'"
              size="small"
              >{{ scope.row.status == 0 ? "成功" : "失败" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="operTime" label="操作日期" sortable>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="open(scope.row)" size="mini"
              ><i class="el-icon-view"></i><span>详情</span></el-button
            >
          </template></el-table-column
        >
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
import { getAipOperation } from "@/api/system";
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
  created() {
    this.getOperation();
  },
  mounted() {},

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
    //详情展示
    open(item) {
      console.log(item);
      this.$alert(
        `<table cellspacing="10px" width="700px">
        <tr>
            <th>操作模块</th>
            <td>${item.title}/${item.businessType}</td>
            <th>请求地址：</th>
            <td>${item.operUrl}</td>
        </tr>
        <tr>
            <th>登录信息：</th>
            <td>${item.operName}/${item.operIp}/${item.operLocation}</td>
            <th>请求方式：</th>
            <td>${item.requestMethod}</td>
        </tr>
        <tr>
            <th>操作方法：</th>
            <td colspan="3">${item.method}</td>
        </tr>
        <tr>
            <th>请求参数：</th>
            <td colspan="3">
                ${item.operParam}
            </td>
        </tr>
        <tr>
            <th>返回参数：</th>
            <td colspan="3">${item.jsonResult}</td>
        </tr>
        <tr>
            <th>操作状态：</th>
            <td>${item.status == 0 ? "正常" : "异常"}</td>
            <th>操作时间：</th>
            <td>${item.operTime}</td>
        </tr>
    </table>`,
        "操作日志详细",
        {
          dangerouslyUseHTMLString: true,
          customClass: "msgbox"
        }
      );
    }
  }
};
</script>

<style lang="scss">
.app-main {
   background-color: rgb(255, 255, 255);
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
table {
  table-layout: fixed;
}

.msgbox {
  width: 700px !important;
}
</style>
