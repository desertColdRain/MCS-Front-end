<template>
	<div class="testBox">
       <div class="box">
         <json-viewer :value="block"></json-viewer>  
       </div>
 	</div>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
import Vue from 'vue'
Vue.use(JsonViewer)

export default {
  data() {
    return {
      block:{
        body:{
            enclavePubKeyCS: '',
            keyListRevoke: '',
            keyListInUse: '',
            PIData: '',
            MCSRelatedHash: '',
            transactionList: ''
        },
        header:{
            index: '',
            timeStamp: '',
            hash: '',
            preHash: '',
            generatorAddress:'',
            difficulty: '',
            nonce: ''
        }
        
      },
    }
  },
  created() {
    this.blockDetail();
  },
  methods:{
    blockDetail() {
      this.$axios
        .post("block/detail", {
          index: this.$route.query.index,
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.block = res.data.data;
            this.pagation.total = Object.keys(this.task).length;
            console.log(res.data.data);
          } else {
            alert(res.data.msg);
          }
        })
        .catch((failResponse) => {});
    },
  },
}
</script>
