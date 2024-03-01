<template>
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
              <el-option label="整租" value="0" />
              <el-option label="合租" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              v-model="house.state"
              clearable
              placeholder="请选择状态"
              class="input"
            >
              <el-option label="待审核" value="0" />
              <el-option label="待出租" value="1" />
              <el-option label="已出租" value="2" />
              <el-option label="已下架" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="onSubmit"
            >搜索</el-button>
            <el-button
              icon="el-icon-refresh"
              @click="onClear"
            >重置</el-button>
          </el-form-item>
        </el-form>
        <div class="another">
          <el-row>
            <el-button
              icon="el-icon-search"
              size="mini"
              circle
              @click="dialog = true"
            />
            <el-button
              icon="el-icon-refresh"
              size="mini"
              circle
              @click="onSubmit"
            />
            <el-button
              icon="el-icon-menu"
              size="mini"
              circle
              @click="dialogShowHidden = true"
            />
          </el-row>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <el-table
      v-loading="loading"
      :data="houseList"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      height="566px"
      :cell-style="rowStyle"
      :header-cell-style="rowClass"
      :row-style="{ height: '45px' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55px" />
      <el-table-column label="#" type="index" width="50px" />
      <el-table-column
        v-if="!this.hiddenList.includes('type')"
        prop="type"
        width="60px"
        label="类型"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.type === 0 ? "整租" : "合租" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!this.hiddenList.includes('houseCode')"
        width="120px"
        prop="houseCode"
        label="户型"
        show-overflow-tooltip
      />
      <el-table-column
        v-if="!this.hiddenList.includes('houseArea')"
        width="80px"
        prop="houseArea"
        label="整套面积"
        show-overflow-tooltip
      />
      <el-table-column
        v-if="!this.hiddenList.includes('roomType')"
        prop="roomType"
        label="出租房间"
        width="80px"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{ scope.row.roomType === 1 ? "主卧" : "" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!this.hiddenList.includes('roomArea')"
        prop="roomArea"
        label="房屋面积"
        width="80px"
        show-overflow-tooltip
      />
      <el-table-column
        v-if="!this.hiddenList.includes('direction')"
        prop="direction"
        label="朝向"
        width="60px"
        show-overflow-tooltip
      />
      <el-table-column
        v-if="!this.hiddenList.includes('decoration')"
        prop="decoration"
        label="装修"
        width="80px"
        show-overflow-tooltip
      />
      <el-table-column
        v-if="!this.hiddenList.includes('price')"
        prop="price"
        label="租金"
        width="60px"
        show-overflow-tooltip
      />
      <el-table-column
        v-if="!this.hiddenList.includes('startDate')"
        prop="startDate"
        label="起租日期"
        width="100px"
        show-overflow-tooltip
      />
      <el-table-column
        v-if="!this.hiddenList.includes('state')"
        prop="state"
        label="状态"
        width="60px"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{ houseState(scope.row.state) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!this.hiddenList.includes('faceUrl')"
        prop="faceUrl"
        label="封面图"
        width="80px"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div class="big_img">
            <el-image
              style="width: 30px; height: 30px"
              :src="
                scope.row.faceUrl.startsWith('https://sourcebyte.vip')
                  ? scope.row.faceUrl
                  : 'https://sourcebyte.vip' + scope.row.faceUrl
              "
              lazy
              class="img"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!this.hiddenList.includes('villageName')"
        prop="villageName"
        label="小区名称"
        width="178px"
        show-overflow-tooltip
      />
      <el-table-column
        v-if="!this.hiddenList.includes('houseNo')"
        prop="houseNo"
        label="房牌号"
        width="100px"
        show-overflow-tooltip
      />
      <el-table-column
        v-if="!this.hiddenList.includes('roomCode')"
        prop="roomCode"
        label="门牌号"
        width="80px"
        show-overflow-tooltip
      />
      <el-table-column
        v-if="!this.hiddenList.includes('code')"
        prop="code"
        label="房源代号"
        width="100px"
        show-overflow-tooltip
      />
      <el-table-column
        v-if="!this.hiddenList.includes('ownerName')"
        prop="ownerName"
        label="房东姓名"
        width="90px"
        show-overflow-tooltip
      />
      <el-table-column
        v-if="!this.hiddenList.includes('owerPhone')"
        prop="owerPhone"
        label="房东电话"
        width="120px"
        show-overflow-tooltip
      />
      <el-table-column
        v-if="!this.hiddenList.includes('agentName')"
        prop="agentName"
        label="经纪人"
        width="60px"
        show-overflow-tooltip
      />
      <el-table-column
        v-if="!this.hiddenList.includes('agentPhone')"
        prop="agentPhone"
        label="经纪人电话"
        width="100px"
        show-overflow-tooltip
      />
      <el-table-column
        v-if="!this.hiddenList.includes('ramark')"
        prop="remark"
        label="备注"
        width="100px"
        show-overflow-tooltip
      />
      <el-table-column fixed="right" label="操作" width="120" z-index="1000">
        <template slot-scope="scope" />
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      :current-page="pageNum"
      :page-sizes="[20, 50, 100, 200]"
      :page-size="20"
      layout="->,total, sizes, prev, pager, next, jumper"
      :total="this.houseList.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 搜索弹框 -->
    <el-drawer
      ref="searchDrawer"
      title="房源搜索"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
    >
      <div class="demo-drawer__content">
        <el-form
          ref="form"
          :model="searchForm"
          label-width="80px"
          label-position="right"
          size="small"
        >
          <el-form-item label="朝向" prop="direction">
            <el-select
              v-model="searchForm.direction"
              prop="direction"
              placeholder="请选择朝向"
              clearable
              style="width: 100%;"
            >
              <el-option label="东" value="东" />
              <el-option label="南" value="南" />
              <el-option label="西" value="西" />
              <el-option label="北" value="北" />
            </el-select>
          </el-form-item>
          <el-form-item label="装修" prop="decoration">
            <el-select
              v-model="searchForm.decoration"
              prop="decoration"
              placeholder="请选择装修"
              clearable
              style="width: 100%;"
            >
              <el-option label="简装" value="简装" />
              <el-option label="中装" value="中装" />
              <el-option label="精装修" value="精装修" />
              <el-option label="豪装" value="豪装" />
            </el-select>
          </el-form-item>
          <el-form-item label="租金" prop="price">
            <el-input
              v-model="searchForm.price"
              prop="price"
              autocomplete="off"
              placeholder="请输入租金"
            />
          </el-form-item>
          <el-form-item label="小区名称" prop="villageName">
            <el-select
              v-model="searchForm.villageName"
              prop="villageName"
              placeholder="请选择房源小区"
              clearable
              style="width: 100%;"
            >
              <el-option label="信业iCC" value="信业iCC" />
              <el-option
                label="越秀星汇尚城"
                value="越秀星汇尚城"
              />
              <el-option label="万科杭宸" value="万科杭宸" />
              <el-option label="昌运里" value="昌运里" />
              <el-option label="宝嘉誉峰" value="宝嘉誉峰" />
              <el-option label="嘉泰馨庭" value="嘉泰馨庭" />
              <el-option label="锦文雅苑" value="锦文雅苑" />
              <el-option label="天鸿香榭里" value="天鸿香榭里" />
              <el-option label="锦秀文澜阁" value="锦秀文澜阁" />
              <el-option label="金昌苑" value="金昌苑" />
            </el-select>
          </el-form-item>
          <el-form-item label="房东姓名" prop="ownerName">
            <el-input
              v-model="searchForm.ownerName"
              prop="ownerName"
              autocomplete="off"
              placeholder="请输入房东姓名"
            />
          </el-form-item>
          <el-form-item label="房东电话" prop="ownerPhone">
            <el-input
              v-model="searchForm.ownerPhone"
              prop="ownerPhone"
              autocomplete="off"
              placeholder="请输入房东电话"
            />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button type="primary" @click="popSubmit()">确 定</el-button>
        </div>
      </div>
    </el-drawer>
    <!-- 穿梭框 -->
    <el-dialog
      v-dialogDrag
      title="显示/隐藏"
      :visible.sync="dialogShowHidden"
      width="540px"
      custom-class="dialog-transfer"
      close-on-click-modal
    >
      <el-transfer
        v-model="hiddenList"
        :data="showAndHidden"
        :titles="['显示', '隐藏']"
        @change="handleChange"
      />
    </el-dialog>
  </div>
</template>

<script>
import { getHouseRoomList } from '@/api/tenement.js'
import dialogDrag from '@/directive/modules/dialogDrag.js'
export default {
  name: '',
  directives: {
    dialogDrag
  },
  props: [],
  data() {
    // 穿梭框
    const generateData = _ => {
      const data = []
      // 遍历列表全部属性并添加到data数组
      const houseProperty = {
        type: '类型',
        houseCode: '户型',
        houseArea: '整套面积',
        roomType: '出租房间',
        roomArea: '房屋面积',
        direction: '朝向',
        decoration: '装修',
        price: '租金',
        startDate: '起租日期',
        state: '状态',
        faceUrl: '封面图',
        villageName: '小区名称',
        houseNo: '房牌号',
        roomCode: '门牌号',
        code: '房源代号',
        ownerName: '房东姓名',
        owerPhone: '房东电话',
        agentName: '经纪人',
        agentPhone: '经纪人电话',
        ramark: '备注'
      }
      for (const key in houseProperty) {
        data.push({
          key: key,
          label: houseProperty[key]
        })
      }
      return data
    }
    return {
      house: {
        // 类型  0-整租   1-合租
        type: '',
        // 租房状态  0-待审核  1-待出租  2-已出租  3-已下架
        state: ''
      },
      // 多选列表数据
      multipleSelection: [],
      // 房源信息
      houseList: [],
      // 页数
      pageNum: 1,
      // 每页多少条数据
      pageSize: 20,
      // 搜索框是否显示
      dialog: false,
      // 显示与隐藏框是否显示
      dialogShowHidden: false,
      // 表单内容
      searchForm: {
        // 朝向
        direction: '',
        // 装修
        decoration: '',
        // 租金
        price: '',
        // 小区名称
        villageName: '',
        // 房东姓名
        ownerName: '',
        // 房东电话
        ownerPhone: ''
      },
      // loading效果
      loading: false,
      // 显示与隐藏数据
      showAndHidden: generateData(),
      // 隐藏列表
      hiddenList: []
    }
  },
  computed: {
    // 获取房屋出租状态
    houseState() {
      return function(state) {
        if (state === 0) {
          return '待审核'
        } else if (state === 1) {
          return '待出租'
        } else if (state === 2) {
          return '已出租'
        } else {
          return '已下架'
        }
      }
    }
  },
  mounted() {
    if (localStorage.getItem('hiddenList')) {
      this.hiddenList = JSON.parse(localStorage.getItem('hiddenList'))
    }
    this.getHouseList()
  },
  methods: {
    // 获取房源信息
    getHouseList() {
      this.loading = true
      const {
        direction,
        decoration,
        price,
        villageName,
        ownerName,
        ownerPhone
      } = this.searchForm
      const { type, state } = this.house

      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        orderByColumn: 'create_time',
        isAsc: 'desc',
        ...(type && { type }),
        ...(state && { state }),
        ...(direction && { direction }),
        ...(decoration && { decoration }),
        ...(price && { price }),
        ...(villageName && { villageName }),
        ...(ownerName && { ownerName }),
        ...(ownerPhone && { ownerPhone })
      }
      getHouseRoomList(params).then(res => {
        this.houseList = res.rows
        this.loading = false
      })
    },
    // 顶部表单提交
    onSubmit() {
      this.getHouseList()
    },
    // 搜索弹框表单提交
    popSubmit() {
      this.getHouseList()
      // 关闭弹框
      this.$refs.searchDrawer.closeDrawer()
    },
    // 清除表单内容
    onClear() {
      Object.keys(this.house).forEach(key => {
        this.house[key] = ''
      })
      // this.house.type = "";
      // this.house.state = "";
      // 搜索弹框重置
      this.resetForm('form')
      // 发送请求重新获取列表
      this.getHouseList()
    },
    // 重置搜索弹框
    resetForm(form) {
      if (this.$refs[form]) {
        this.$refs[form].resetFields()
      }
    },
    // 穿梭框值变化
    handleChange(value, direction, movedKeys) {
      this.hiddenList = []
      value.forEach(item => {
        this.hiddenList.push(item)
      })
      localStorage.setItem('hiddenList', JSON.stringify(this.hiddenList))
    },

    // 修改页面条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getHouseList()
    },
    // 修改页面数
    handleCurrentChange(val) {
      this.pageNum = val
      this.getHouseList()
    },
    // 多选列表
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 修改表头样式
    rowStyle() {
      return 'text-align:center'
    },
    // 修改表头样式
    rowClass({ row, rowIndex }) {
      return 'text-align:center;background:rgba(248, 248, 248, 1);color: #515a6e;'
    }
  }
}
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
}

>>> .el-button--primary {
  background-color: #1890ff;
  border-color: #1890ff;
}

.el-button--primary.is-active,
.el-button--primary:active {
  background: #1682e6;
  border-color: #1682e6;
  color: #fff;
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

.demo-drawer__content {
  margin: 0 30px;
  .demo-drawer__footer {
    float: right;
  }
}

// 穿梭框样式
.el-dialog__wrapper >>> .el-dialog__header {
  background-color: rgba(0, 0, 0, 0) !important;
}

>>> .el-transfer__button {
  border-radius: 50%;
  padding: 12px;
  display: block;
  margin-left: 0;
}

>>> .el-button--primary.is-disabled,
.el-button--primary.is-disabled:active,
.el-button--primary.is-disabled:focus,
.el-button--primary.is-disabled:hover {
  color: #fff;
  background-color: #8cc8ff;
  border-color: #8cc8ff;
}

>>> .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #1890ff;
  border-color: #1890ff;
}

>>> .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #1890ff;
  border-color: #1890ff;
}
</style>
