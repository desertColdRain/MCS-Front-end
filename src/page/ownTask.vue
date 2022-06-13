<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="taskList" highlight-current-row style="width: 100%">
        <el-table-column lable="任务id" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.taskId }}</span>
          </template>
        </el-table-column>
        <el-table-column property="taskContent.requirements" label="任务要求" width="300">
        </el-table-column>
        <el-table-column property="taskContent.bonus" label="奖励" width="200">
        </el-table-column>
        <el-table-column property="taskContent.deadline" label="截止时间" width="200">
        </el-table-column>
        <el-table-column property="submitTask.username" label="提交的任务" width="400">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            
            <el-button size="mini" @click="taskDetail(scope.$index, scope.row)">查看详细信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form> </el-form>
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
import store from "../store";
//从cookie中获取用户名
store.commit("getUsername");
const user = store.state.user.username
console.log(user)
export default {
  data() {
    return {
      task: [],
      pagation: {
        pagesize: 15,
        total: 0,
        currentPage: 1
      },
    };
  },
  components: {
    headTop,
  },
  computed: {
    taskList() {
      const dataCodeList = this.task
      const pagesize = this.pagation.pagesize
      const currentPage = this.pagation.currentPage
      return dataCodeList.slice((currentPage - 1) * pagesize, pagesize * currentPage)

    }
  },
  created() {

    this.getTaskList();
  },
  methods: {
    //查看任务列表的函数，get方法，不用传参数就可以
    getTaskList() {
      this.$axios
        .post("/task/ownTask", {
            username: user
        })

        .then((res) => {
          if (res.data.code === 200) {
            console.log('获取任务成功')
            // console.log(res.data.data)
            this.task = res.data.data;
            console.log(this.task);
            this.pagation.total = Object.keys(this.task).length;

          } else {
            console.log(res.data.code);
            alert("获取节点列表失败！");
          }
        })
        .catch((failResponse) => { });
    },


    //查看任务详细信息，将id传给taskDetail页面，由taskDetail页面进行查询
    taskDetail(index, row) {
      this.$router.push({
         path: '/taskDetail',
        query: { 
          taskId: row.taskId
        }
      })
    },
    handleSizeChange(val) {
      this.pagation.pagesize = size
    },
    handleCurrentChange(val) {
      this.pagation.currentPage = currentPage
      //this.getTaskList();
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
