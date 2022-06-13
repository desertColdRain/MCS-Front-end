<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown-item>
      <a href="" @click="logout">
        <p class="dropdown-itemp"><icon type="power"> </icon>注销</p>
      </a>
    </el-dropdown-item>
  </div>
  
</template>

<script>
import { signout } from "@/api/getData";
import { baseImgPath } from "@/config/env";
import { mapActions, mapState, Store } from "vuex";
import store from "../store";
//store.commit('getUsername')
store.commit("getToken");
store.commit("getUsername");
store.commit("getPubKey");
console.log("Prof .Yan ");
//console.log(store.state.user)
const user = store.state.user;
console.log(store.state.user);
export default {
  data() {
    return {
      baseImgPath,
    };
  },
  created() {
    console.log("2222222");
  },
  computed: {},
  methods: {
    logout() {
      this.$axios
        .get("/logout", {
          //token: successResponse.data.token
        })
        .then((res) => {
          if (res.data.code === 200) {
            console.log(this.$store.state);
            alert("退出成功");
            // this.$store.commit('setToken',successResponse.data.data.token)
            this.$store.commit("clearToken");
            this.$store.commit("clearUsername");
            this.$store.commit("clearPubKey");
            this.$store.commit("clearAddress");
            this.$router.replace({ path: "/" });
          } else {
            alert("退出失败");
          }
        });
    },
  },
};
</script>

<style lang="less">
@import "../style/mixin";
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator {
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
