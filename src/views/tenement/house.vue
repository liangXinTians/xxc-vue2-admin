<template>
  <div class="app-main">
    <div class="app-container">
      <!-- 搜索条 -->
      <div class="nav">
        <div class="right flex">
          <!-- 表单 -->
          <el-form
            :inline="true"
            :model="house"
            class="demo-form-inline form"
            size="mini"
          >
            <el-form-item label="类型">
              <el-select
                v-model="house.type"
                clearable
                placeholder="请选择类型"
                class="input"
              >
                <el-option label="整租" value="0"></el-option>
                <el-option label="合租" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select
                v-model="house.state"
                clearable
                placeholder="请选择状态"
                class="input"
              >
                <el-option label="待审核" value="0"></el-option>
                <el-option label="待出租" value="1"></el-option>
                <el-option label="已出租" value="2"></el-option>
                <el-option label="已下架" value="3"></el-option>
              </el-select>
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
              <el-button
                icon="el-icon-search"
                size="mini"
                circle
                @click="getHouseList()"
              ></el-button>
              <el-button icon="el-icon-refresh" size="mini" circle></el-button>
              <el-button icon="el-icon-menu" size="mini" circle></el-button>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 内容 -->
      <el-table
        :data="houseList"
        tooltip-effect="dark"
        style="width: 100%"
        size="mini"
        height="566px"
        :cell-style="rowStyle"
        @selection-change="handleSelectionChange"
        :header-cell-style="rowClass"
        :row-style="{ height: '45px' }"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="#" width="50">1</el-table-column>
        <el-table-column prop="type" width="60" label="类型">
          <template slot-scope="scope">
            <span>{{ scope.row.type === 0 ? "整租" : "合租" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          prop="houseCode"
          label="户型"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          width="80"
          prop="houseArea"
          label="整套面积"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="roomType" label="出租房间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.roomType === 1 ? "主卧" : "" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="roomArea"
          label="房屋面积"
          width="80"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="direction"
          label="朝向"
          width="60"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="decoration"
          label="装修"
          width="80"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="price"
          label="租金"
          width="60"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="startDate"
          label="起租日期"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="60"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{ houseState(scope.row.state) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="faceUrl"
          label="封面图"
          width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div class="big_img">
              <el-image
                style="width: 30px; height: 30px"
                :src="scope.row.faceUrl"
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
        <el-table-column
          prop="villageName"
          label="小区名称"
          width="178"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="houseNo"
          label="房牌号"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="roomCode"
          label="门牌号"
          width="80"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="code"
          label="房源代号"
          width="90"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="ownerName"
          label="房东姓名"
          width="90"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="owerPhone"
          label="房东电话"
          width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="agentName"
          label="经纪人"
          width="60"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="agentPhone"
          label="经纪人电话"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="1"
          label="备注"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="120" z-index="10">
          <template slot-scope="scope"> </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="20"
        layout="->,total, sizes, prev, pager, next, jumper"
        :total="8"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getHouseRoomList } from "@/api/tenement.js";
export default {
  name: "",
  props: [],
  data() {
    return {
      house: {
        // 类型  0-整租   1-合租
        type: "",
        // 租房状态  0-待审核  1-待出租  2-已出租  3-已下架
        state: ""
      },
      multipleSelection: [],
      // 房源信息
      houseList: [],
      // 页数
      pageNum: 1,
      pageSize: 20
    };
  },
  mounted() {
    this.getHouseList();
  },
  methods: {
    // 表单提交
    onSubmit() {
      this.getHouseList();
    },
    // 清除表单内容
    onClear() {
      this.house.type = "";
      this.house.state = "";
      this.getHouseList();
    },
    // 多选列表
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //获取房源信息
    getHouseList() {
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        orderByColumn: "create_time",
        isAsc: "desc"
      };
      // 如果状态不存在则不作为参数传递
      if (this.house.type) {
        params.type = this.house.type;
      }

      if (this.house.state) {
        params.state = this.house.state;
      }
      getHouseRoomList(params).then(res => {
        this.houseList = res.rows;
      });
    },
    // 修改页面条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 修改页面数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 修改表头样式
    rowStyle() {
      return "text-align:center";
    },
    // 修改表头样式
    rowClass({ row, rowIndex }) {
      return "text-align:center;background:rgba(248, 248, 248, 1);color: #515a6e;";
    }
  },
  computed: {
    // 获取房屋出租状态
    houseState() {
      return function(state) {
        if (state === 0) {
          return "待审核";
        } else if (state === 1) {
          return "待出租";
        } else if (state === 2) {
          return "已出租";
        } else {
          return "已下架";
        }
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
}

.el-button--primary {
  background-color: #1890ff;
  border-color: #1890ff;
}

.input {
  width: 140px;
}

.app-main {
  height: 100vh;
  min-height: calc(100vh - 84px);
  width: 100%;
  .app-container {
    padding: 8px;
    background-color: #fff;
    .nav {
      margin-left: -5px;
      margin-right: -5px;
      margin-bottom: 5px;
      height: 32px;
      .right {
        float: right;
        height: 100%;
      }
    }
    .big_img {
      width: 30px;
      height: 30px;
      overflow: hidden;
      border-radius: 5px;
      box-shadow: 0 0 5px 1px #ccc;
      cursor: pointer;
      margin: 0 auto;
      .img {
        overflow: hidden;
        position: relative;
        transition: all 0.3s;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    .el-pagination {
      height: 25px;
      margin-bottom: 5px;
      margin-top: 5px;
      padding: 5px !important;
    }
  }
}
</style>
