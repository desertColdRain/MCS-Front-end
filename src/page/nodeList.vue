<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="nodeList" highlight-current-row style="width: 100%">
        <el-table-column lable = '序号' type="index" width="100"> </el-table-column>
        <el-table-column property="ip" label="IP地址" width="220">
        </el-table-column>
        <el-table-column property="port" label="端口号" width="220">
        </el-table-column>
        <el-table-column property="createTime" label="加入时间" width="300">
        </el-table-column>
        
        <el-table-column property="notes" label="备注" width="320">
        </el-table-column>
      <el-table-column prop="delete" lable="删除节点" width = '200'>
        <el-row>
        <el-col :span="16" :offset="0">
        <el-button type="danger" icon="el-icon-delete" circle
        
        @click="deleteNode">
       
        </el-button>
        </el-col>
      </el-row>
      </el-table-column>
      </el-table>
      
      <div class="Pagination" style="text-align: left; margin-top: 10px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="pagation.currentPage" :page-size="pagation.pagesize" layout="total, prev, pager, next"
      :total="pagation.total">
    </el-pagination>

      </div>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";

export default {
  data() {
    return {
      nodes: [],
      
     pagation: {
        pagesize: 2,
        total: 0,
        currentPage: 1
      },
    };
  },
 
  components: {
    headTop,
  },
   computed:{
    nodeList() {
       const dataCodeList = this.nodes
        const pagesize = this.pagation.pagesize
        const currentPage = this.pagation.currentPage
        return dataCodeList.slice((currentPage - 1) * pagesize, pagesize * currentPage)
    }
  },
  created() {
    this.getNodeList();
  },
  methods: {
    deleteNode(){
      this.$axios.post("node/delete",{
        ip: "1",
        port: 1,
        createTime: "2022年04月24 16:53:25", 
        notes: "1"
      })
      .then((res)=>{
         if (res.data.code === 200) {
            //console.log('刪除节点成功')
            this.nodes = res.data.data;
            console.log(this.nodes);
          } else {
            console.log(res.data.code);
            alert("删除节点失败！");
          }
      })
    },
    getNodeList() {
      this.$axios
        .get("/node/view", {})

        .then((res) => {
          if (res.data.code === 200) {
            //console.log('获取节点列表成功')
            this.nodes = res.data.data;
            console.log(this.nodes);
            //this.tableData.nodes.push(tableData.nodes)
            this.pagation.total = Object.keys(this.nodes).length;
          } else {
            console.log(res.data.code);
            alert("获取节点列表失败！");
          }
        })
        .catch((failResponse) => {});
    },
   handleSizeChange(val) {
      this.pagation.pagesize = size
    },
    handleCurrentChange(val) {
       this.pagation.currentPage = currentPage
    },
  },
};
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}
</style>
