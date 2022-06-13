<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="task" highlight-current-row style="width: 100%">
        <el-table-column lable="任务id" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.taskId }}</span>
          </template>
        </el-table-column>
        <el-table-column property="username" label="提交者" width="150">
        </el-table-column>
        <el-table-column property="content" label="提交内容" width="1000">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-form>
              <el-form-item aria-placeholder="分数" >
                <el-col :span="12">
                  <el-input v-model="score"></el-input>
                </el-col>
              </el-form-item>
            </el-form>
            <el-button
              size="medium"
              type="danger"
              @click="evaluate(scope.$index, scope.row)"
              >评分</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="Pagination" style="text-align: left; margin-top: 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagation.currentPage"
          :page-size="pagation.pagesize"
          layout="total, prev, pager, next"
          :total="pagation.total"
        >
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
const user = store.state.user.username;

export default {
  data() {
    return {
      task: [],
      score: 0,
      pagation: {
        pagesize: 15,
        total: 0,
        currentPage: 1,
      },
    };
  },
  components: {
    headTop,
  },
  computed: {
    taskList() {
      const dataCodeList = this.task;
      const pagesize = this.pagation.pagesize;
      const currentPage = this.pagation.currentPage;
      return dataCodeList.slice(
        (currentPage - 1) * pagesize,
        pagesize * currentPage
      );
    },
  },
  created() {
    this.taskDetail();
  },
  methods: {
    taskDetail() {
      this.$axios
        .post("task/detail", {
          taskId: this.$route.query.taskId,
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.task = res.data.data;
            this.pagation.total = Object.keys(this.task).length;
            console.log(res.data.data);
          } else {
            alert(res.data.msg);
          }
        })
        .catch((failResponse) => {});
    },
    // 提交评分函数
    evaluate(index, row) {
      console.log("进入评分环节");
      console.log(this.score)
      this.$axios
        .post("/task/evaluate", {
          username: row.username,
          score: this.score,
        })
        .then((res) => {
          if (res.data.code === 200) {
            alert("评分成功");
            console.log(res.data);
          } else {
            alert(res.data.msg);
          }
        })
        .catch((failResponse) => {});
    },

    handleSizeChange(val) {
      this.pagation.pagesize = size;
    },
    handleCurrentChange(val) {
      this.pagation.currentPage = currentPage;
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
