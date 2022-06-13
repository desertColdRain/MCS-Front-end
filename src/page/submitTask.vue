<template>
    <div>
        <head-top></head-top>
        <div class="edit_container">
            <quill-editor v-model="content" ref="myQuillEditor" class="editer" :options="editorOption"
                @ready="onEditorReady($event)">
            </quill-editor>
        </div>
        <div class="submit_btn">
            <el-button type="primary" @click="submitTask">提交</el-button>
        </div>
    </div>
</template>

<script>
import headTop from '../components/headTop'
import { quillEditor } from 'vue-quill-editor'
import store from "../store";

store.commit("getUsername");
const user = store.state.user.username

export default {
    data() {
        return {
            content: '<h3>文本编辑</h3>',
            editorOption: {
            }
        }
    },
    components: {
        headTop,
        quillEditor,
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        }
    },
    methods: {
        onEditorReady(editor) {
            console.log('editor ready!', editor)
        },
        //提交任务
        submitTask() {
            this.$axios.post("task/submit", {
                taskId: this.$route.query.taskId,
                content: this.content,
                username: user
            })
                .then((res) => {
                    if (res.data.code === 200) {
                        alert(res.data.msg)
                        console.log(res.data)
                    } else {
                        alert(res.data.msg)
                    }
                })
                .catch((failResponse) => { });
        },
    },
}
</script>

<style lang="less">
@import '../style/mixin';

.edit_container {
    padding: 40px;
    margin-bottom: 40px;
}

.editer {
    height: 350px;
}

.submit_btn {
    text-align: center;
}
</style>
