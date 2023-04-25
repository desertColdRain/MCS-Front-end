<template>
    <div class="fillcontain">
        <head-top></head-top>
        <p class="explain_text">基于区块链的匿名信任评估系统</p>
        <p class="explain_text">这是一个基于区块链的匿名信任认证众包系统的后端部分。系统主要包含三部分</p>
        <p class="explain_text">基于Intel SGX的密钥管理系统: https://github.com/desertColdRain/MCS-cloud-server</p>
        <p class="explain_text">基于区块链的众包系统: https://github.com/desertColdRain/crowdsourcing-based-on-blockchain</p>
		<p class="explain_text">客户端前端系统: https://github.com/desertColdRain/MCS-Front-end</p>
		
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    export default {
    	components: {
    		headTop,
    	},
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
	}
</style>
