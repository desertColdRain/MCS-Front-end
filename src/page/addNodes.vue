<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="4">
        <el-form
          :model="nodes"
          :rules="rules"
          ref="nodes"
          label-width="110px"
          class="demo-nodes"
        >
          <el-form-item label="IP地址" prop="ip">
            <el-input v-model="nodes.ip"></el-input>
          </el-form-item>

          <el-form-item label="端口号" prop="port">
            <el-input v-model="nodes.port"></el-input>
          </el-form-item>

          <el-form-item label="备注" prop="notes">
            <el-input v-model.number="nodes.notes" maxLength="11"></el-input>
          </el-form-item>

          <el-form-item class="button_submit">
            <el-button type="primary" @click="addNodes">立即添加</el-button>
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
export default {
  data() {
    return {
      nodes: {
        ip: "", //店铺名称
        port: "", //地址
        notes: "",
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
  },
  methods: {
    addNodes() {
      this.$axios
        .post("/node/add", {
          ip: this.nodes.ip,
          port: this.nodes.port,
          notes: this.nodes.notes,
        })
        .then((res) => {
          if (res.data.code === 200) {
            
            console.log(this.nodes.ip);
            alert("添加节点列表成功");
            //this.nodes = res.data.data
            //console.log(this.nodes)
            //this.tableData.nodes.push(tableData.nodes)

            // this.$router.replace({path: 'node/view'})
          } else {
            console.log(res.data.code);
            alert("添加节点列表失败！");
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
