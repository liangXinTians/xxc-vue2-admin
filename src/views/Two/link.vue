<template>
  <div class="app-main">
    <div class="app-container">
      <!-- 头部 -->
      <div class="nav">
        <div class="right flex">
          <!-- 表单 -->
          <el-form
            :inline="true"
            :model="house"
            class="demo-form-inline form"
            size="mini"
          >
            <el-form-item label="站点名称">
              <el-input
                v-model="house.linkName"
                placeholder="请输入站点名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
              <el-input
                v-model="house.state"
                placeholder="请输入联系方式"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSubmit"
                >搜索</el-button
              >
              <el-button icon="el-icon-refresh" @click="onClear"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
          <div class="another">
            <el-row>
              <el-button icon="el-icon-search" size="mini" circle></el-button>
              <el-button
                icon="el-icon-refresh"
                size="mini"
                circle
                @click="onClear"
              ></el-button>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="el-table">
        <el-table
          ref="multipleTable"
          :data="
            linkList.slice((currentPage - 1) * pagesize, currentPage * pagesize)
          "
          tooltip-effect="dark"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            class=".el-table"
            prop="index"
            label="#"
            width="50"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column
            class=".el-table"
            prop="linkName"
            label="站点名称"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column
            class=".el-table"
            prop="linkUrl"
            label="站点链接"
            width="502"
            align="center"
          ></el-table-column>
          <el-table-column
            class=".el-table"
            prop="linkLogo"
            label="站点Logo"
            width="200"
            align="center"
          ></el-table-column>
          <el-table-column
            class=".el-table"
            prop="linkShow"
            label="展示地址"
            width="200"
            align="center"
          >
          </el-table-column>
          <el-table-column
            class=".el-table"
            prop="linkWay"
            label="联系方式"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            class=".el-table"
            prop="remark"
            label="备注"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column prop="articleType" label="操作" align="center"> </el-table-column>
        </el-table>
        <!-- <el-table-column prop="articleType" label="类型" width="120"></el-table-column> -->
        <!-- <el-table-column prop="address" label="地址" show-overflow-tooltip> -->
        <!-- </el-table-column> -->
      </div>

      <!-- 分页器 -->
      <div class="pagination">
        <div class="pagin">
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 50, 100]"
              :page-size="pagesize"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="linkList.length"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLinkList } from "../../api/two";
export default {
  data() {
    return {
      linkList: [
        {
          linkName: "", //站点名称
          linkUrlL: "", //站点链接
          linkLogo: "", //站点Logo
          linkShow: "", //展示地址
          linkWay: "", //联系方式
        },
      ], //内容列表
      house: {
        linkName: "",
        state: "",
      },
      loading: false, //加载小圆圈
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
    };
  },
  mounted() {
    this.getLink();
  },
  methods: {
    // 获取表单内容数据
    getLink() {
      getLinkList()
        .then((res) => {
          console.log(res);
          this.linkList = res.rows;
          // console.log(this.linkList)
        })
        .catch((err) => {});
    },
    // 表单提交
    onSubmit() {
      // console.log(this.house.type, this.house.state);
      this.getSearchLink()
    },
    // 搜索获取表单的内容
    getSearchLink(){
      this.loading=true
      const {linkName,state} =this.house
      console.log(linkName)
      const params={
        pageNum: 1,
        pageSize: 20,
        orderByColumn: 'create_time',
        linkName:linkName,
        state:state
      }
      getLinkList(params).then(res=>{
        console.log(res)
        
        setTimeout(() => {
          this.loading=false
        }, 500);
        this.linkList=res.rows
      })
    },
    // 清除表单内容
    onClear() {
      this.house.type = "";
      this.house.state = "";
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    // 刷新页面
    refreshData() {
      // location.reload();

      setTimeout(() => {
        this.loading = true;
        setTimeout(() => {
          this.getLink();
          this.loading = false;
        }, 500);
      }, 500);
      console.log(1);
    },
    // 清除表单内容
    onClear() {
      this.refreshData();
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  /* box-sizing: border-box; */
  margin: 0;
  padding: 0;
}
.app-main {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.app-container {
  padding: 8px;
  background-color: #ffffff;
}
.el-row {
  margin-bottom: 5px;
  position: relative;
  width: 100%;
  height: 33px;
  background-color: #ffffff;
}
.el-table {
  font-size: 12px;
  width: 100%;
  height: 800px;
  background-color: #ffffff;
}
.pagination {
  padding: 5px;
  width: 100%;
  height: 25px;
  margin-bottom: 5px;
  margin-top: 5px;
  background-color: #ffffff;
  position: relative;
}
.pagin {
  position: absolute;
  right: 0;
}
.demo-right {
  float: right;
}
.a1 {
  border-radius: 50%;
}
.a2 {
  border-radius: 50%;
}
.el-table {
  text-align: center;
  font-size: 12px;
}

.flex {
  display: flex;
}

.el-button--primary {
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
}

.input {
  width: 140px;
}

.app-main {
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
  .app-container {
    padding: 8px;
    .nav {
      margin-left: -5px;
      margin-right: -5px;
      margin-bottom: 5px;
      .right {
        float: right;
      }
    }
  }
}
</style>