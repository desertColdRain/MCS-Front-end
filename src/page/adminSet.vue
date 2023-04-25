<template>
  <div class="fillcontain">
    <head-top></head-top>
    <header class="admin_title">账号信息</header>
    <div class="admin_set">
      <ul>
        <li>
          <span id="span">用户名：</span><span> {{ user.userName }} </span>
        </li>
        <li>
          <span>公钥：</span><span>{{user.pkString}}</span>
        </li>
        <li><span>信任值：</span><span>{{user.trustValue}}</span></li>
        <li>
          <span>地址：</span><span>{{ user.accountAddr }}</span>
        </li>
        <li>
          <span>更换头像：</span>
          <el-upload
            class="avatar-uploader"
            :action="baseUrl + '/admin/update/avatar/' + user.accountAddr"
            :show-file-list="false"
            :on-success="uploadImg"
            :before-upload="beforeImgUpload"
          >
            <img
              v-if="user.avatar"
              :src="baseImgPath + user.publicKey"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </li>
      </ul>
    </div>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="4">
        <el-form
          :model="alter"
          :rules="rules"
          ref="nodes"
          label-width="110px"
          class="demo-nodes"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="alter.username"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="alter.password"></el-input>
          </el-form-item>
          <el-form-item class="button_submit">
            <el-button type="primary" @click="keyAlter">立即更新密钥</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
import store from "../store";
import { mapState } from "vuex";
store.commit("getUsername");
store.commit("getAddress");
const username = store.state.user.username;
const pk = store.state.user.pubKey
console.log(32);
console.log(pk);
console.log(54);
console.log("Hello, world")

export default {
  data() {
    return {
      user: [],
      pk: pk,
      alter: [
        {
          username: "",
          password: "",
        },
      ],
      baseUrl,
      baseImgPath,
    };
  },
  components: {
    headTop,
  },
  created() {
    this.getUser();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    uploadImg(res, file) {
      if (res.status == 1) {
        this.user.avatar = res.image_path;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    beforeImgUpload(file) {
      const isRightType =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightType && isLt2M;
    },
    keyAlter() {
      this.$axios
        .post("/keyAlter", {
          username: this.alter.username,
          password: this.alter.password,
        })
        .then((res) => {
          if (res.data.code === 200) {
            alert("密钥更新成功");
            //this.nodes = res.data.data
            //console.log(this.nodes)
            //this.tableData.nodes.push(tableData.nodes)

            // this.$router.replace({path: 'node/view'})
          } else {
            console.log(res.data.code);
            alert("密钥更新失败！");
          }
        })
        .catch((failResponse) => {});
    },
    getUser() {
      this.$axios
        .post("/getUser", {
            username: username
        })

        .then((res) => {
          if (res.data.code === 200) {
            console.log(res.data.msg)
            // console.log(res.data.data)
            this.user = res.data.data;
            console.log(this.user);
        
          } else {
            console.log(res.data.code);
            alert(res.data.msg);
          }
        })
        .catch((failResponse) => { });
    },
  },
};
</script>

<style lang="less">
@import "../style/mixin";
.explain_text {
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  color: #333;
}
.admin_set {
  width: 60%;
  background-color: #f9fafc;
  min-height: 400px;
  margin: 20px auto 0;
  border-radius: 10px;

  ul > li {
    white-space: normal;
    word-break: break-all;
    word-wrap: break-word;
    padding: 20px;
    span {
      color: #666;
    }
  }
}
.admin_title {
  margin-top: 20px;
  .sc(24px, #666);
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  margin-top: 10px;
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
</style>
