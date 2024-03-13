<template>
  <div>
    <div class="app-main">
      <div class="app-container">
        <!-- 头部 -->
        <div class="app-container-header">
          <!-- 搜索条 -->
          <div class="nav">
            <div class="right flex">
              <!-- 表单 -->
              <el-form :inline="true" :model="house" class="demo-form-inline form" size="medium">
                <el-form-item label="名字">
                  <el-input v-model="house.name" placeholder="请输入名字" :trigger-on-focus="false" size="medium" />
                </el-form-item>
                <el-form-item label="学号">
                  <el-input v-model="house.id" placeholder="请输入学号" :trigger-on-focus="false" size="medium" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" class="button" @click="onSubmit">搜索</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <!-- 内容 -->
        <div class="el-table">
          <el-table :data="tableDatas" style="width: 100%" :full-width="true">
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="240">
            </el-table-column>
            <el-table-column prop="id" label="学号" width="240">
            </el-table-column>
            <el-table-column prop="age" label="年纪" width="180">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="240">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <button @click="deleteIt(scope.$index)">删除</button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页器 -->
        <div class="pagination">
          <div class="pagin">
            <div class="block">
              <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize"
                background layout="total, sizes, prev, pager, next, jumper" :total="tableData.length"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getApiList, getAriticleTyoe } from '../../api/two'
export default {
  data () {
    return {
      state: '', // 标题框输入数据
      ArrState: [], // 用来临时存放查找出来的数据
      loading: false,
      house: {
        name: '',
        id: ''
      },
      tableData: [],
      tableDatas: [],
      multipleSelection: [],
      currentPage: 1, // 初始页
      pagesize: 10 //    每页的数据
    }
  },
  mounted () {
    if (localStorage.getItem('getProduct')) {
      this.tableData = JSON.parse(localStorage.getItem('getProduct'))
      console.log(222, this.tableData)
      this.tableDatas = this.tableData
    } else {
      this.$axios({
        method: 'GET',
        url: '/getProduct',
      }).then(res => {
        console.log(111, res.data.data)
        this.tableData = res.data.data

        this.tableDatas = this.tableData
        localStorage.setItem('getProduct', JSON.stringify(this.tableData))
      })
    }


  },
  methods: {
    // onSubmit () {
    //   this.tableDatas = []
    // },
    onSubmit () {
      const name = this.house.name
      const id = this.house.id

      // 根据输入框中的条件进行过滤
      this.tableDatas = this.tableData.filter(item => {
        return item.id.includes(id) && item.name.includes(name)
      })
      // this.house.name = ""
      // this.house.id = ""
      console.log(this.tableDatas)
    },

    deleteIt (index) {
      this.tableData.splice(index, 1)
      // 更新本地存储中的数据
      localStorage.setItem('getProduct', JSON.stringify(this.tableData))
    },

    handleSizeChange (val) {
      this.pagesize = val
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    },

  }
  // computed: {
  //   tableDatas () {
  //     if (this.house.name === "" && this.house.id === "") {
  //       return this.tableData
  //     } else {
  //       const name = this.house.name
  //       const id = this.house.id

  //       return this.tableData.filter(item => {
  //         // 根据输入框中的值进行过滤条件判断
  //         return (!name || item.name.includes(name)) && (!id || item.id.includes(id))
  //       })
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.button {
  height: 30px;
  width: 70px;
}

.el-table {
  padding: 20px 20px 0 20px;
  width: 100%;
}

.app-main {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
}

.app-container {
  padding: 8px;
  // background-color: #ffffff;
  position: relative;
}

.el-row {
  margin-bottom: 5px;
  position: relative;
  width: 100%;
  height: 33px;
  background-color: #ffffff;
}



.pagination {
  padding: 5px;
  width: 100%;
  height: 35px;
  margin-bottom: 5px;
  margin-top: 5px;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  left: -5px;
  padding-right: 50px;
  border-top: solid 2px #e6ebf5;
  z-index: 1;
}

.pagin {
  position: absolute;
  right: 20px;
}





.flex {
  display: flex;
}

.el-button--primary {
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
}

.app-main {
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;

  .app-container-header {
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
