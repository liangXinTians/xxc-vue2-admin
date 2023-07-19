<template>
  <div class="app-container">
    <!-- 搜索条 -->
    <div class="nav">
      <el-button
        slot="reference"
        @click="addCategory(null)"
        size="small"
        class="addCategory"
      >
        <i class="el-icon-plus"></i> 新增
      </el-button>
      <div class="right flex">
        <!-- 表单 -->
        <el-form
          :inline="true"
          class="demo-form-inline form"
          size="mini"
          @submit.native.prevent
        >
          <el-form-item label="分类名称">
            <el-input
              class="input"
              placeholder="请输入分类名称"
              v-model.trim="classifyName"
              size="mini"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="onSubmit"
              native-type="submit"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" @click="onClear">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 内容 -->
    <el-table
      v-loading="loading"
      :data="categoryList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :header-cell-style="rowClass"
      :cell-style="addClass"
      default-expand-all
      size="small"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="classifyName" label="分类名称" width="400">
      </el-table-column>
      <el-table-column prop="classifyUrl" label="分类图片" width="300">
        <template slot-scope="scope">
          <div class="big_img">
            <el-image
              style="width: 30px; height: 30px"
              :src="
                scope.row.classifyUrl.startsWith('https://sourcebyte.vip')
                  ? scope.row.classifyUrl
                  : 'https://sourcebyte.vip' + scope.row.classifyUrl
              "
              lazy
              class="img"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="sortNo" label="排序" align="center" width="110">
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center" width="260">
      </el-table-column>
      <el-table-column prop="id" label="操作" align="center" width="180">
        <template slot-scope="scope">
          <button class="operation-add" @click="addCategory(scope.row.id)">
            <i class="el-icon-plus"></i> 新增
          </button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增功能表单 -->
    <el-dialog
      title="添加分类"
      close-on-click-modal
      width="500px"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="addCategoryItem"
        size="small"
        :rules="rules"
        ref="addCategoryItem"
      >
        <el-form-item
          label="上级分类"
          prop="parentId"
          :label-width="formLabelWidth"
        >
          <treeselect
            v-model="topCategory"
            :normalizer="normalizer"
            :options="categoryList"
          />
        </el-form-item>
        <el-form-item
          label="分类名称"
          prop="classifyName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="addCategoryItem.classifyName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="分类图片"
          prop="classifyUrl"
          :label-width="formLabelWidth"
        >
          <el-upload
            action="#"
            list-type="picture-card"
            :limit="1"
            :class="{ hide_box: !showAdd }"
            :file-list="dealImgFileList"
            :on-change="dealImgChange"
            :auto-upload="false"
            :before-upload="beforeAvatarUpload"
            accept=".jpeg,.jpg,.png"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">
              请上传 大小不超过 <span style="color: red;">50MB</span> 格式为
              <span style="color: red;">png/jpg/jpeg</span> 的文件
            </div>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="排序" prop="sortNo" :label-width="formLabelWidth">
          <el-input
            v-model="addCategoryItem.sortNo"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            v-model="addCategoryItem.remark"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" size="small"
          >确 定</el-button
        >
        <el-button @click="cancel" size="small">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCategoryList } from "@/api/short.js";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "category",
  data() {
    return {
      // 搜索框分类名称信息
      classifyName: "",
      // loading效果
      loading: false,
      // 分类数据
      categoryList: [],
      // 新增数据
      addCategoryItem: {
        // 名称
        classifyName: "",
        // 图片地址
        classifyUrl: "",
        // 父节点id
        parentId: "",
        // 备注
        remark: "",
        // 排序
        sortNo: ""
      },
      // 新增框是否开启
      dialogFormVisible: false,
      // 新增功能输入框前文字宽度
      formLabelWidth: "80px",
      // 大图图片
      dialogImageUrl: "",
      // 显示大图
      dialogVisible: false,
      // 是否已经添加，添加之后显示放大以及删除
      disabled: false,
      // 图片列表
      dealImgFileList: [],
      // 是否展示加号框
      showAdd: true,
      // 表单验证规则
      rules: {
        classifyName: [
          { required: true, message: "分类名称不能为空", trigger: "blur" }
        ],
        sortNo: [{ required: true, message: "排序不能为空", trigger: "blur" }],
        parentId: [{ required: true }],
        classifyUrl: [{ required: true }]
      },
      // 上级分类
      topCategory: null,
      normalizer(node) {
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.id,
          label: node.classifyName,
          children: node.children
        };
      }
    };
  },
  components: { Treeselect },
  mounted() {
    this.getCateList();
  },
  methods: {
    // 获取分类列表信息
    getCateList() {
      this.loading = true;
      const params = {};
      if (this.classifyName) {
        params.classifyName = this.classifyName;
      }
      getCategoryList(params).then(res => {
        this.categoryList = this.processArray(res.data);
        this.loading = false;
      });
    },
    // 将分类数据整理
    processArray(arr) {
      const map = {};
      const result = [];

      arr.forEach(item => {
        item.children = [];
        map[item.id] = item;
      });

      arr.forEach(item => {
        if (item.parentId !== 0) {
          map[item.parentId].children.push(item);
        } else {
          result.push(item);
        }
      });
      return result;
    },
    // 顶部表单提交
    onSubmit() {
      this.getCateList();
    },
    // 清除表单内容
    onClear() {
      this.classifyName = "";
      this.getCateList();
    },
    // 新增分类
    addCategory(a) {
      if (a) {
        this.topCategory = a;
      }
      this.dialogFormVisible = true;
    },
    // 上传图片时触发
    dealImgChange(file, fileList) {
      this.dealImgFileList = fileList;
      this.addCategoryItem.classifyUrl = this.dealImgFileList[0].url.slice(5);
      this.showAdd = false;
    },
    // 删除按钮
    handleRemove(file) {
      this.dealImgFileList = [];
      this.dialogImageUrl = "";
      this.showAdd = true;
    },
    // 放大按钮
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 提交表单
    submitForm() {
      this.addCategoryItem.parentId = this.topCategory;
      this.dialogFormVisible = false;
      console.log(this.addCategoryItem);
    },
    // 取消提交表单
    cancel() {
      Object.keys(this.addCategoryItem).forEach(key => {
        this.addCategoryItem[key] = "";
      });
      this.dealImgFileList = [];
      this.topCategory = null;
      this.dialogFormVisible = false;
    },
    // 验证图片上传规范
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/png" ||file.type === "image/jpg"||file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 50;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 PNG/JPG/JPEG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 50MB!");
      }
      return isJPG && isLt2M;
    },
    // 修改列样式
    addClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex >= 2) {
        return "text-align:center";
      }
    },
    // 修改表头样式
    rowClass({ row, rowIndex }) {
      return "background:rgba(248, 248, 248, 1);color: #515a6e;";
    }
  }
};
</script>
<style lang="scss" scoped>
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
    .addCategory {
      margin-left: 10px;
      float: left;
    }
    .input {
      width: 140px;
    }
  }
  .big_img {
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0 0 5px 1px #ccc;
    cursor: pointer;
    .img {
      overflow: hidden;
      position: relative;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
  .operation-add {
    padding-left: 0;
    padding-right: 0;
    width: inherit;
    padding: 7px 10px;
    border-color: transparent;
    color: #1890ff;
    background: transparent;
    &:active {
      color: #1682e6;
      background-color: transparent;
    }
  }
}

// 导航栏
.demo-form-inline {
  float: right;
}

.center {
  text-align: center;
}

// 如果图片大于一张上传框就隐藏
.hide_box >>> .el-upload--picture-card {
  display: none;
}
.el-dialog__wrapper >>> .el-dialog__header {
  background-color: rgba(0, 0, 0, 0);
}
</style>
