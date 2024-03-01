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
                    size="mini"
                    
                  >
                    <el-option
                      v-for='item in articleType '
                      :key="item.value"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                      
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="标题">
                  <el-input
                  v-model="house.state"
                  
                  placeholder="请输入内容"
                  :trigger-on-focus="false"
                  size="mini"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    @click="onSubmit"

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
                  ></el-button>
                  <el-button
                    icon="el-icon-refresh"
                    size="mini"
                    circle
                    @click="refreshData"
                  ></el-button>
                </el-row>
              </div>
            </div>
          </div>
        </div>
        <!-- 内容 -->
        <div class="el-table">
          <el-table
            ref="multipleTable"
            :data="
              tableData.slice(
                (currentPage - 1) * pagesize,
                currentPage * pagesize
              )
            "
            tooltip-effect="dark"
            style="width: 100%"
            height=""
            @selection-change="handleSelectionChange"
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
              prop="articleType"
              label="类型"
              width="100"
              align="center"
            ></el-table-column>
            <el-table-column
              class=".el-table"
              prop="smallTitle"
              label="标题"
              width="200"
              align="center"
            ></el-table-column>
            <el-table-column
              class=".el-table"
              prop="bigTitle"
              label="简介"
              width="586"
              header-align="center"
              align="center"

            ></el-table-column>
            <el-table-column
              class=".el-table"
              prop="faceUrl"
              label="封面图"
              width="100"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div class="big_img">
                  <el-image
                    style="width: 30px; height: 30px"
                    :src="scope.row.faceUrl.startsWith('https://sourcebyte.vip') ? scope.row.faceUrl : 'https://sourcebyte.vip' + scope.row.faceUrl"
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
              class=".el-table"
              prop="articleSource"
              label="来源"
              width="100"
              align="center"
            ></el-table-column>
            <el-table-column
              class=".el-table"
              prop="remark"
              label="备注"
              width="100"
              align="center"
            ></el-table-column>
            <el-table-column prop="articleType" label="操作"  align="center"> </el-table-column>
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
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pagesize"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length"
              >
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="el-dialog"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getApiList,getAriticleTyoe } from "../../api/two";
export default {
  data() {
    return {
      state:'',         //标题框输入数据
      ArrState:[],       //用来临时存放查找出来的数据
      loading:false,
      house: {
        type: '',
        state: "",
      },
      articleType:[],
      formInline: {
        user: "",
        region: "",
      },
      tableData: [
        {
          articleType: "",
          smallTitle: "",
          bigTitle: "",
          faceUrl: "",
          articleSource: "",
          remark: "",
        },
      ],
      multipleSelection: [],
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
    };
  },
  mounted() {
    this.getList();
    this.getTyoe();
  },
  methods: {
    // 表单提交
    onSubmit() {
      console.log(this.house.type, this.house.state);
    },
    // 清除表单内容
    onClear() {
      this.refreshData()
    },
    // 模糊查询
    onSubmit() {
      
      console.log(this.house.type)
      console.log(this.house.state)
      console.log("submit!");
      if(this.house.state!=""&&this.house.type!=''){
        setTimeout(() => {
          this.tableData.forEach((item)=>{
            // console.log(item)
            if(item.smallTitle.indexOf(this.house.state)>-1|item.articleType.indexOf(this.house.type)>-1){
              console.log(item)
              console.log(1)
              this.ArrState.push(item)
              this.tableData=this.ArrState
            }
            // else{
            //   this.tableData=[]
            // }
          })
         this.house.state=''
        },);
      }
      else if(this.house.state!=""){
        setTimeout(() => {
          this.tableData.forEach((item)=>{
            // console.log(item)
            if(item.smallTitle.indexOf(this.house.state)>-1){
              console.log(item)
              console.log(2)
              this.ArrState.push(item)
              this.tableData=this.ArrState
            }
            // else{
            //   this.tableData=[]
            // }
          })
         this.house.state=''
        },);
      }
      else if(this.house.type!=""){
        console.log(3)
        
          this.tableData.forEach((item)=>{
            // console.log(item)
            if(item.articleType.indexOf(this.house.type)>-1){
              console.log(item)
              console.log(3)
              this.ArrState.push(item)
              console.log(this.ArrState)
              this.tableData=this.ArrState
            }
            // else{
            //   this.tableData=[]
            // }
          })
        
        if(this.ArrState.length==0){
            console.log(4)
            this.tableData=[]
          }
      }
      else{
        this.tableData=[]
      }
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
    // 获取文章内容
    getList() {
      getApiList()
        .then((res) => {
          // console.log(res);
          // console.log(res.rows);
          this.tableData = res.rows;
          
        })
        .catch((err) => {});
        console.log(123)
    },
    // 获取文章类型数据
    getTyoe(){
      getAriticleTyoe().then((res) => {
          console.log(res); 
          this.articleType=res.data
          console.log(this.articleType)
        })
        .catch((err) => {});
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
      this.ArrState=[]
      setTimeout(() => {
        this.loading=true;
        setTimeout(() => {
          this.getList()
          this.loading=false
        }, 500);
      }, 500);
      console.log(1);
    },
    // 获取类型内容

  },
};
</script>

<style lang="scss" scoped>
.ic-font {
  font-size: 12px;
}
* {
  /* box-sizing: border-box; */
  margin: 0;
  padding: 0;
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
.el-table {
  font-size: 12px;
  width: 100%;
  background-color:#ffffff;
}
.pagination {
  padding: 5px;
  width: 100%;
  height: 35px;
  margin-bottom: 5px;
  margin-top: 5px;
  background-color:#ffffff;
  position: fixed;
  bottom: 0;
  left: -5px;
  border-top: solid 2px #e6ebf5;
  z-index: 1;
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