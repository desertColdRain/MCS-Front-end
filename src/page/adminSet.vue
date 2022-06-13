<template>
    <div class="fillcontain">
        <head-top></head-top>
        <header class="admin_title">账号信息</header>
        <div class="admin_set">
            <ul>
                <li>
                    <span>昵称：</span><span>{{user.username}}</span>
                </li>
                <li>
                    <span>公钥：</span><span>{{user.publicKey}}</span>
                </li>
                <li>
                    <span>信任值：</span><span>{{user.trustValue}}</span>
                </li>
                <li>
                    <span>地址：</span><span>{{user.accountAddr}}</span>
                </li>
                <li>
                    <span>更换头像：</span>
                    <el-upload
                      class="avatar-uploader"
                      :action="baseUrl + '/admin/update/avatar/' + user.accountAddr"
                      :show-file-list="false"
                      :on-success="uploadImg"
                      :before-upload="beforeImgUpload">
                      <img v-if="user.avatar" :src="baseImgPath + user.publicKey" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </li>    
            </ul>
        </div>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import store from "../store";
    store.commit("getUsername");
    const user = store.state.user
    console.log(32)
    console.log(user)
    console.log(54)
    export default {
        data(){
            return {
                user:[{
                    username:user.username,
                     
                }],
                baseUrl,
                baseImgPath,
            }
        },
    	components: {
    		headTop,
    	},
        computed: {
            
        },
        methods: {
            
            uploadImg(res, file) {
                if (res.status == 1) {
                    this.user.avatar = res.image_path;
                }else{
                    this.$message.error('上传图片失败！');
                }
            },
            beforeImgUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
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
    .admin_set{
        width: 60%;
        background-color: #F9FAFC;
        min-height: 400px;
        margin: 20px auto 0;
        border-radius: 10px;
        ul > li{
            padding: 20px;
            span{
                color: #666;
            }
        }
    }
    .admin_title{
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
