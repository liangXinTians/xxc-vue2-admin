<template>
  <div class="app-main">
    <div class="app-container">
      <!-- 头部标签 -->
      <div class="header">
        <div>
          <el-button icon="el-icon-sort" style="font-size:12px" @click="onFold"
            >折叠/展开</el-button
          >
        </div>
        <div class="tool"></div>
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <el-form-item label="部门名称">
            <el-input
              v-model="formInline.deptName"
              placeholder="请输入部门名称"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.status" placeholder="部门状态">
              <el-option label="正常" value="0"></el-option>
              <el-option label="停用" value="1"></el-option>
            </el-select>
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
          <el-button icon="el-icon-refresh" size="mini" @click="reset">
            重置</el-button
          >
        </div>
      </div>
      <!-- 表单 -->
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="deptId"
        :default-expand-all="fold"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        size="mini"
        :header-cell-style="{background:'rgb(248,248,249)'}"
      >
        <el-table-column prop="deptName" label="部门名称" width="400">
        </el-table-column>
        <el-table-column prop="orderNum" label="排序"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag size="mini">{{
              scope.row.status == 0 ? "正常" : "异常"
            }}</el-tag>
          </template></el-table-column
        >
        <el-table-column prop="createTime" label="创建时间" width="180">
        </el-table-column>
        <el-table-column prop="" label="操作"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getApiDepartment } from "@/api/system.js";
export default {
  data() {
    return {
      formInline: {
        deptName: "", //部门搜索
        status: "" //状态搜索
      },
      fold: true, //折叠
      tableData: [], //例表数据
      tableData2: [], //搜索过滤
      loading: true, // 遮罩层
      open: true,
      close: false
    };
  },
  created() {
    this.getDepartment();
  },
  mounted() {},
  methods: {
    //列表数据
    getDepartment() {
      getApiDepartment().then(res => {
        this.tableData = res.data;
        this.tableData2 = res.data;
        let tab = this.tableData.slice(1);
        this.tableData.splice(1);
        this.tableData[0].children.push(...tab);
        let tab2 = this.tableData[0].children.slice(1);
        this.tableData[0].children.splice(1);
        this.tableData[0].children[0].children.push(...tab2);
      });
    },
    //折叠
    onFold() {
      let els = document.getElementsByClassName("el-table__expand-icon");
      if (this.tableData.length != 0 && els.length != 0) {
        for (let j1 = 0; j1 < els.length; j1++) {
          els[j1].classList.add("dafult");
        }
        if (
          this.$el.getElementsByClassName("el-table__expand-icon--expanded")
        ) {
          const open = this.$el.getElementsByClassName(
            "el-table__expand-icon--expanded"
          );
          for (let j = 0; j < open.length; j++) {
            open[j].classList.remove("dafult");
          }
          const dafult = this.$el.getElementsByClassName("dafult");
          for (let a = 0; a < dafult.length; a++) {
            dafult[a].click();
          }
        }
      }
      if (this.tableData.length != 0) {
        const elsopen = this.$el.getElementsByClassName(
          "el-table__expand-icon--expanded"
        );
        if (
          this.$el.getElementsByClassName("el-table__expand-icon--expanded")
        ) {
          for (let i = 0; i < elsopen.length; i++) {
            elsopen[i].click();
          }
        }
      }
    },
    //搜索按钮
    onSubmit() {
      let params = this.formInline;
      getApiDepartment(params).then(res => {
        this.tableData = res.data;
      });
    },
    //重置
    reset() {
      this.formInline.deptName = "";
      this.formInline.status = "";
      this.getDepartment();
    }
  }
};
</script>

<style lang="scss" scoped>
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
  }
}
</style>
