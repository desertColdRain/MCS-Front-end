<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="block" highlight-current-row style="width: 100%">
        <el-table-column property="index" label="区块高度" width="180">
        </el-table-column>
        <el-table-column property="hash" label="区块哈希" width="320">
        </el-table-column>
        <el-table-column property="preHash" label="前一区块哈希" width="320">
        </el-table-column>
        <el-table-column property="timeStamp" label="时间戳" width="200">
        </el-table-column>
        <el-table-column
          property="transactionList"
          label="交易列表"
          width="300"
        >
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left; margin-top: 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="count"
        >
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
      block: [
        {
          index: "", //区块号
          hash: "", //区块头的哈希值
          preHash: "", //上一个区块的哈希值
          timeStamp: "",
          transactionList: {
            transactionHash: "",
          },
        },
      ],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
    };
  },
  components: {
    headTop,
  },
  created() {
    this.getBlockHeader();
  },
  methods: {
    getBlockHeader() {
      this.$axios.get("block/header", {}).then((res) => {
        if (res.data.code === 200) {
          this.block = [];
          const table = {
            index: res.data.data.header.index,
            hash: res.data.data.header.hash,
            preHash: res.data.data.header.preHash,
            timeStamp: res.data.data.header.timeStamp.value,
            transactionList: res.data.data.body.transactionList.transactionHash,
          };
          this.block.push(table);
          console.log(this.block);
          this.count = Object.keys(this.block).length;
          //this.block = res.data.data
          console.log(this.count);
        } else {
          console.log(res.data.code);
          alert("查询区块链头信息失败");
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getAdmin();
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


