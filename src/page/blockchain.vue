<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="blockchainList" highlight-current-row style="width: 100%">
        <el-table-column label="区块高度" prop="index" width="100">
        </el-table-column>

        <el-table-column property="preHash" label="前一区块的哈希" width="280">
        </el-table-column>
        <el-table-column property="hash" label="区块哈希" width="280">
        </el-table-column>
        <el-table-column property="generator" label="区块创建者" width="220">
        </el-table-column>
        <el-table-column property="timeStamp" label="时间戳" width="220">
        </el-table-column>
        <el-table-column property="detail" label="详细信息" width="220">
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
import { getUserList, getUserCount } from "@/api/getData";
export default {
  data() {
    return {
      blockchain: [
        {
          index: "", //区块号
          timeStamp: "", //区块创建的时间戳
          hash: "", //区块头的哈希值
          preHash: "", //上一个区块的哈希值
          generator: "", //区块创建这的账户地址，即公钥的哈希值
          detail: "",
        },
      ],
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
  computed:{
     blockchainList() {
        const dataCodeList = this.blockchain
        const pagesize = this.pagation.pagesize
        const currentPage = this.pagation.currentPage
        return dataCodeList.slice((currentPage - 1) * pagesize, pagesize * currentPage)

      }
  },
  created() {
    this.getBlockchain();
  },
  methods: {
    getBlockchain() {
      this.$axios.get("block/blockchain", {}).then((res) => {
        if (res.data.code === 200) {
          this.blockchain = [];
          res.data.data.forEach((item) => {
            const tableItem = {
              index: item.header.index,
              preHash: item.header.preHash === null ? "null" : item.header.preHash,
              hash: item.header.hash,
              timeStamp: item.header.timeStamp.value,
              generator: item.header.nonce,
            };
            this.blockchain.push(tableItem);
          });
          console.log(res.data);
          this.pagation.total = Object.keys(this.blockchain).length;
          console.log(this.count);
        } else {
          console.log(res.data.code);
          alert("查询区块链信息失败");
        }
      });
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
