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
            <el-form-item label="类型">
              <el-select
                v-model="house.type"
                clearable
                placeholder="请选择类型"
                class="input"
              >
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.title"
                  :value="item.type"
                 >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标题">
              <el-input
                v-model="house.state"
                placeholder="请输入标题"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSubmit(state)"
                >搜索</el-button
              >
              <el-button icon="el-icon-refresh" @click="onClear">重置</el-button>
            </el-form-item>
          </el-form>
          <div class="another">
            <el-row>
              <el-button icon="el-icon-search" size="mini" circle></el-button>
              <el-button icon="el-icon-refresh" size="mini" circle  @click='onClear'></el-button>
            </el-row>
          </div>
        </div>
      </div>
         <!-- 内容 -->
         <div class="el-table">
          <el-table
            ref="multipleTable"
            :data="
              linkList.slice(
                (currentPage - 1) * pagesize,
                currentPage * pagesize
              )
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
            ></el-table-column>
            <el-table-column
              class=".el-table"
              prop="type"
              label="类别"
              width="150"
              
            ></el-table-column>
            <el-table-column
              class=".el-table juzhong"
              prop="title"
              label="标题"
              width="717"
              header-align="center"
              
            ></el-table-column>

            
            <el-table-column
              class=".el-table"
              prop="state"
              label="状态"
              width="100"
            ><el-tag v-if="state=1" color="#e8f4ff" size="mini">
              正常
            </el-tag>
            <el-tag v-if="state=0" color="#e8f4ff" size="mini">
              异常
            </el-tag>
          </el-table-column>
            <el-table-column
              class=".el-table"
              prop="remark"
              label="备注"
              width="300"
            ></el-table-column>
            <el-table-column prop="articleType" label="操作"> </el-table-column>
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
import {getServeList,getServeType} from '../../api/two'
export default {
  data() {
    return {
        linkList:[{
          type:'',  //类别
          title:'',   //标题
          linkLogo:'',   //站点Logo
        }],       //内容列表
        house: {
        type: "",
        state: ""
      },
      loading:false,       //加载小圆圈
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      typeList:[],    //类型信息
      ArrState:[]
    };
  },
  mounted(){
    this.getServe(),
    this.getType()
  },
  methods:{
    // 获取表单内容数据
    getServe(){
      getServeList().then((res) => {
            console.log(res)
            this.linkList=res.rows
            // console.log(this.linkList)
        }).catch((err) => {
            
        });
    },
    // 获取类别接口信息
    getType(){
      getServeList().then(res=>{
        console.log(res)
        this.typeList=res.rows
        console.log(this.typeList)
      })
    },
   // 模糊查询
   onSubmit() {
      
      console.log(this.house.type)
      console.log(this.house.state)
      console.log("submit!");
      if(this.house.state!=""&&this.house.type!=''){
        setTimeout(() => {
          this.linkList.forEach((item)=>{
            // console.log(item)
            if(item.title.indexOf(this.house.state)>-1|item.type.indexOf(this.house.type)>-1){
              console.log(item)
              console.log(1)
              this.ArrState.push(item)
              this.linkList=this.ArrState
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
          this.linkList.forEach((item)=>{
            // console.log(item)
            if(item.title.indexOf(this.house.state)>-1){
              console.log(item)
              console.log(2)
              this.ArrState.push(item)
              this.linkList=this.ArrState
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
        
          this.linkList.forEach((item)=>{
            // console.log(item)
            if(item.type.indexOf(this.house.type)>-1){
              console.log(item)
              console.log(3)
              this.ArrState.push(item)
              console.log(this.ArrState)
              this.linkList=this.ArrState
            }
            // else{
            //   this.tableData=[]
            // }
          })
        
        if(this.ArrState.length==0){
            console.log(4)
            this.linkList=[]
          }
      }
      else{
        this.linkList=[]
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
    handleSizeChange(val) {
      this.pageSize = val;
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
          this.getServe()
          this.loading=false
        }, 500);
      }, 500);
      console.log(1);
    },
    // 清除表单内容
    onClear() {
      this.refreshData()
    },
  }
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
  background-color:#ffffff;
}
.pagination {
  padding: 5px;
  width: 100%;
  height: 25px;
  margin-bottom: 5px;
  margin-top: 5px;
  background-color:#ffffff;
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