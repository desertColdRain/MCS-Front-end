<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="4">
        <el-form
          :model="task"
          ref="task"
          label-width="110px"
          class="demo-nodes"
        >
          <el-form-item label="密码" prop="password">
            <el-input v-model="task.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="任务要求" prop="requirements">
            <el-input v-model="task.taskContent.requirements"></el-input>
          </el-form-item>
          <el-form-item label="信任值要求" prop="trustRequirement">
            <el-input v-model="task.trustRequirement"></el-input>
          </el-form-item>
          <el-form-item label="奖金" prop="bonus">
            <el-input v-model="task.taskContent.bonus"></el-input>
          </el-form-item>

          <el-form-item label="截止时间" prop="deadline">
            <el-input
              v-model="task.taskContent.deadline"
              type="text"
              maxLength="31"
            ></el-input>
          </el-form-item>

          <el-form-item class="button_submit">
            <el-button type="primary" @click="issueTask">立即发布</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
import { cityGuess, addShop, searchplace, foodCategory } from "@/api/getData";
import { baseUrl, baseImgPath } from "@/config/env";
import store from "../store";
store.commit("getUsername");
store.commit("getAddress");
console.log(123456);
let user = store.state.user.username
const addr = store.state.user.address
console.log(user);
console.log(addr);
console.log(789123);
export default {
  data() {
    return {
      task: {
        username: user,
        password: "",
        address: addr,
        trustRequirement: "",
        taskContent: {
          requirements: "",
          bonus: "",
          deadline: "",
        },
      },
      baseUrl,
      baseImgPath,
      categoryOptions: [],
      responseResult: [],
    };
  },
  components: {
    headTop,
  },
  mounted() {},
  computed: {},
  created() {
    //this.initData();
    //this.issueTask();
  },
  methods: {
    issueTask() {
      this.$axios
        .post("/task/issue", {
           username: this.task.username,
            password: this.task.password,
            address: this.task.address,
            trustRequirement: this.task.trustRequirement,
            taskContent: {
              requirements: this.task.taskContent.requirements,
              bonus: this.task.taskContent.bonus,
              deadline: this.task.taskContent.deadline,
            },
          
        })
        .then((res) => {
          if (res.data.code === 200) {
            alert("发布任务成功")
            console.log(this.task.username);
            console.log("添加节点列表成功");
            //this.nodes = res.data.data
            //console.log(this.nodes)
            //this.tableData.nodes.push(tableData.nodes)

            // this.$router.replace({path: 'node/view'})
          } else {
            console.log(res.data);
            console.log('============code=========')
            console.log(res.data.code);
            console.log('============code==========')
            alert(res.data[0].msg);
          }
        })
        .catch((failResponse) => {});
    },
  },
};
</script>

<style lang="less">
@import "../style/mixin";
.button_submit {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.el-table .info-row {
  background: #c9e5f5;
}

.el-table .positive-row {
  background: #e2f0e4;
}
</style>
