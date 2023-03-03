<template>
    <div class="game-inner">
        <div class="edit-switch" style="width: 100%;margin-top: 8px">
            <span style="float: left;width: auto">是否添加角色反馈动画：</span>
            <el-switch style="width: auto;float: left"
                    v-model="allData.feedbackAnimate.show"
                    active-color="#77DC04"
                    @change="setAnimateName('feedbackAnimate')"
                    inactive-color="#ff4949">
            </el-switch>
        </div>
        <div class="upload">
            <span style="left:10px;position:relative;" class="file-title">动画文件</span>
            <div class="animate-box">
                <span v-text="allData.feedbackAnimate.name"></span>
            </div>
            <div class="upload-btn">
                <div class="upload-btn-file">
                    <span>更改文件</span>
                    <input type="file" multiple="multiple" @change="uploadAnimation($event,'feedbackAnimate')">
                </div>
            </div>
        </div>
        <el-input placeholder="请输入内容"  v-model="allData.feedbackAnimate.times" style="width:80%;margin-bottom: 1px" size="mini">
            <template slot="prepend" >未作答正确提示时间(s)：</template>  
        </el-input> 
    </div>
</template>

<script>
    export default {
        name: "EditGameBefore",
        props: [
            "allData",
            "gameData",
            "resourceData",
            "item",
            "index",
            "tabShowStatus"
        ],
        mounted() {
            
        },
        methods:{
            setAnimateName(type){
                if(!this.allData[type].show){
                    this.allData[type].name = '';
                }
            },
            uploadAnimation(e,type) {
                if (e.target.files.length === 0 || e.target.files.length !== 3) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                let object = {};
                let files = Object.values(e.target.files);
                files.forEach((item, index) => {
                    object['animation' + (index + 1)] = item;
                });
                this.$http.post('/uploadingAnimation', object, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    e.target.value = '';
                    this.allData[type].name = res.resourceName;
                    this.allData[res.resourceName] = res.data;
                })
            },
        }
        
    }
</script>
<style scoped>
    .option-item {
        border-top:1px solid #ccc;
        overflow: hidden;
        width: 100%;
        margin-top: 15px;
        float: left;
        &:nth-of-type(1){
            border: none;
        }
    }
    .game-icon {
        height: 40px;
        line-height: 40px;
        color: #fff;
        float: left;
        width: 100%;
    }
    .audio-title{
        margin-top: 15px;
        margin-bottom: 0;
        float: left;
        padding: 0 5px;
    }
    .option-animate{
        color: #eee;
        border-bottom: 1px solid #ccc;
        padding-bottom: 15px;
        overflow: hidden;
        .option-animate-radio{
            >label{
                margin: 5px 0;
            }
        }
        .option-checkbox{
            overflow: hidden;
            &>*{
                overflow: hidden;
            }
        }
        .option-animate-title{
            margin-top: 15px;
            border-left: 4px solid #eee;
            padding-left: 10px;
            height: 16px;
            line-height: 16px;
        }
        .option-animate-radio{
            margin: 10px 0 0 0;
            >label{
                width: 50%;
            }
        }
    }
    .option-audio{
        color: #eee;
        .option-audio-title{
            margin-bottom: 10px;
            margin-top: 10px;
            border-left: 4px solid #eee;
            padding-left: 10px;
            height: 16px;
            line-height: 16px;
        }
        .option-audio-inner{
            padding-left: 15px;
        }
    }
    .upload{
        color:#fff;
    }
</style>