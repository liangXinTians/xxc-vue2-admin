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
          <el-button icon="el-icon-refresh" size="mini">重置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        deptName: "", //部门搜索
        status: "" //状态搜索
      }
    };
  },
  methods: {
    // 搜索
    onSubmit() {},
    // 重置
    reset() {}
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
