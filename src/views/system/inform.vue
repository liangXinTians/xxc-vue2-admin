<template>
  <div class="app-main">
    <div class="app-container">
      <div class="header">
        <div class="tool"></div>
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <el-form-item label="公告标题">
            <el-input
              v-model="formInline.noticeTitle"
              placeholder="请输入公告标题"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="操作人员">
            <el-input
              v-model="formInline.createBy"
              placeholder="请输入操作人员"
            >
            </el-input>
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

      <!-- 列表数据 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        size="mini"
        :header-cell-style="{background:'rgb(248,248,249)'}"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号" prop="noticeId" width="55">
          <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
        </el-table-column>
        <el-table-column
          prop="noticeTitle"
          label="公告标题"
          width="300"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="200">
        </el-table-column>
        <el-table-column
          prop="noticeType"
          label="公告类型"
          show-overflow-tooltip
          width="100"
        >
          <template slot-scope="scope">
            <el-tag type="success" size="mini"
              >公告{{ scope.row.noticeType }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag size="mini">{{
              scope.row.status == 0 ? "正常" : "异常"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建者" width="150">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip
          width="200"
        >
        </el-table-column>
        <el-table-column prop="" label="操作" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getAipInform } from "@/api/system";
export default {
  data() {
    return {
      formInline: {
        noticeTitle: "", //公告搜索
        createBy: "" //操作搜索
      },
      tableData: [], //表单总数据
      total: 0, //总数据条数
      value: "", //绑定时间
      currentPage: 1, //当前页
      cur: 20 //每页数据条数
    };
  },
  created() {
    this.gitInform();
  },
  mounted() {},
  methods: {
    //列表数据
    gitInform() {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.cur,
        orderByColumn: "create_time",
        isAsc: "desc"
      };
      getAipInform(params).then(res => {
        this.total = res.total;
        this.tableData = res.rows;
      });
    },
    // 选中状态
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 搜索
    onSubmit() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.cur,
        businessType: this.formInline.businessType,
        orderByColumn: "create_time",
        isAsc: "desc",
        ...this.formInline
      };
      console.log(params);
      getAipInform(params).then(res => {
        this.total = res.total;
        this.tableData = res.rows;
        console.log(res);
      });
    },
    // 重置
    reset() {
      this.formInline.noticeTitle = "";
      this.formInline.createBy = "";
    },
    //每页条数
    handleSizeChange(val) {
      this.cur = val;
      const params = {
        pageNum: this.currentPage,
        pageSize: this.cur,
        orderByColumn: "create_time",
        isAsc: "desc"
      };
      getAipInform(params).then(res => {
        this.total = res.total;
        this.tableData = res.rows;
      });
    },
    //当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      const params = {
        pageNum: this.currentPage,
        pageSize: this.cur,
        orderByColumn: "create_time",
        isAsc: "desc"
      };
      getAipInform(params).then(res => {
        this.total = res.total;
        this.tableData = res.rows;
      });
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
</style>
