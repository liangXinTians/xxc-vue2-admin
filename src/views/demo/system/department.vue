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
        row-key="parentId"
        :default-expand-all="fold"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        size="mini"
      >
        <el-table-column prop="deptName" label="部门名称" width="400">
        </el-table-column>
        <el-table-column prop="orderNum" label="排序" >
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag size="mini">{{
              scope.row.status == 0 ? "正常" : "异常"
            }}</el-tag>
          </template></el-table-column
        >
        <el-table-column prop="createTime" label="创建时间" width="180"> </el-table-column>
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
      tableData2: [] //搜索过滤
    };
  },
  created() {},
  mounted() {
    this.getDepartment();
  },
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
        console.log("res:", res, "tab:", this.tableData);
      });
    },
    //折叠
    onFold() {
      this.fold = !this.fold;
    },
    //搜索按钮
    onSubmit() {
      let params = this.formInline;
      console.log(params);
      getApiDepartment(params).then(res => {
        this.tableData = res.data;
      });
    },
    //重置
    reset() {
      this.formInline.deptName = "";
      this.formInline.status = "";
      this.getDepartment();
    },

    load(tree, treeNode, resolve) {}
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
  }
}
</style>
