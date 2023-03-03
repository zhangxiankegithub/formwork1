<template>
    <div>
        <div v-if="startAnimate">
            <div class="game-title" style="background: #313131;padding-left: 8px;border-bottom: 1px solid #232323;">
                <i :class="startAnimateStatus?'el-icon-arrow-down':'el-icon-arrow-right'"
                   @click="startAnimateStatus=!startAnimateStatus"></i>
                <span @click="startAnimateStatus=!startAnimateStatus">
                开场动画
            </span>
                <el-switch class="edit-title-switch"
                           v-model="startAnimate.show"
                           active-color="#77DC04"
                           @change="setStartAnimateStatus()"
                           inactive-color="#ff4949">
                </el-switch>
            </div>
            <div v-show="startAnimateStatus" class="game-inner">
                <div class="upload">
                    <span class="file-title">开场动画：</span>
                    <div class="animate-box">
                        <span v-text="startAnimate.startBg.name"></span>
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" multiple="multiple" @change="uploadAnimation('startAnimate.startBg',$event)">
                        </div>
                    </div>
                </div>
                <el-input placeholder="请输入内容" @input="setAttr('x','startAnimate.startBg',$event)" v-model="startAnimate.startBg.x" size="mini">
                    <template slot="prepend">X：</template>
                </el-input>
                <el-input placeholder="请输入内容" @input="setAttr('y','startAnimate.startBg',$event)" v-model="startAnimate.startBg.y" size="mini">
                    <template slot="prepend">Y：</template>
                </el-input>
                <el-input placeholder="请输入内容" @input="setAttr('scale','startAnimate.startBg',$event)" v-model="startAnimate.startBg.scale" size="mini">
                    <template slot="prepend">Scale：</template>
                </el-input>
                <div class="upload">
                    <span class="file-title">按钮动画：</span>
                    <div class="animate-box">
                        <span v-text="startAnimate.startBtn.name"></span>
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" multiple="multiple" @change="uploadAnimation('startAnimate.startBtn',$event)">
                        </div>
                    </div>
                </div>
                <el-input placeholder="请输入内容" @input="setAttr('x','startAnimate.startBtn',$event)" v-model="startAnimate.startBtn.x" size="mini">
                    <template slot="prepend">X：</template>
                </el-input>
                <el-input placeholder="请输入内容" @input="setAttr('y','startAnimate.startBtn',$event)" v-model="startAnimate.startBtn.y" size="mini">
                    <template slot="prepend">Y：</template>
                </el-input>
                <el-input placeholder="请输入内容" @input="setAttr('scale','startAnimate.startBtn',$event)" v-model="startAnimate.startBtn.scale" size="mini">
                    <template slot="prepend">Scale：</template>
                </el-input>
                <div class="upload">
                    <span class="file-title">背景音频：</span>
                    <div class="animate-box" style="width: 90px">
                        <span v-text="startAnimate.bgSound.name"></span>
                    </div>
                    <div class="upload-btn" style="float: left">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" @change="uploadAudio('bgSound',$event)">
                        </div>
                    </div>
                    <i style="margin: 6px 5px;float: right;color: #fff" @click="startAnimate.bgSound.name = ''" class="game-title-icon el-icon-delete"></i>
                </div>
                <div class="upload">
                    <span class="file-title">点击音频：</span>
                    <div class="animate-box" style="width: 90px">
                        <span v-text="startAnimate.clickAudio.name"></span>
                    </div>
                    <div class="upload-btn" style="float: left">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" @change="uploadAudio('clickAudio',$event)">
                        </div>
                    </div>
                    <i style="margin: 6px 5px;float: right;color: #fff" @click="startAnimate.clickAudio.name = ''" class="game-title-icon el-icon-delete"></i>
                </div>
                <div class="option-item">
                    <div class="upload">
                        <span class="file-title">静音按钮</span>
                        <el-switch class="edit-title-switch"
                                   v-model="startAnimate.muteButton.status"
                                   active-color="#77DC04"
                                   inactive-color="#ff4949">
                        </el-switch>
                    </div>
                    <div v-if="startAnimate.muteButton.status">
                        <div class="upload" style="margin-top: 0">
                            <div class="upload-title">
                                默认图片：
                            </div>
                            <div class="img-box">
                                <img :src="resourceData[allData.startAnimate.muteButton.default.name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadImage('muteButton','default',$event)">
                                </div>
                            </div>
                        </div>
                        <div class="upload" style="margin-top: 0">
                            <div class="upload-title">
                                静音图片：
                            </div>
                            <div class="img-box">
                                <img :src="resourceData[allData.startAnimate.muteButton.click.name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadImage('muteButton','click',$event)">
                                </div>
                            </div>
                        </div>
                        <el-input placeholder="请输入内容" @input="setElementStatus('muteButton','x',$event)"  v-model="allData.startAnimate.muteButton.x" size="mini">
                            <template slot="prepend">X：</template>
                        </el-input>
                        <el-input placeholder="请输入内容" @input="setElementStatus('muteButton','y',$event)"  v-model="allData.startAnimate.muteButton.y" size="mini">
                            <template slot="prepend">Y：</template>
                        </el-input>

                        <el-input placeholder="请输入内容" style="width: 40%" @input="setElementStatus('muteButton','width',$event)"  v-model="allData.startAnimate.muteButton.width" size="mini">
                            <template slot="prepend">W：</template>
                        </el-input>
                        <div style="float: left;text-align: center;width: 20%;height: 28px;margin-top: 15px;line-height: 26px">
                            <img :src = unLockImg style="cursor: pointer" alt="" @click="setImageLock('muteButton',)" v-if="!allData.startAnimate.muteButton.lock">
                            <img :src = lockImg style="cursor: pointer" alt="" @click="setImageLock('muteButton',)" v-if="allData.startAnimate.muteButton.lock">
                        </div>
                        <el-input placeholder="请输入内容" style="width: 40%" @input="setElementStatus('muteButton','height',$event)"  v-model="allData.startAnimate.muteButton.height" size="mini">
                            <template slot="prepend">H：</template>
                        </el-input>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="endAnimate">
            <div class="game-title" style="background: #313131;padding-left: 8px;border-bottom: 1px solid #232323;">
                <i :class="publicStatus?'el-icon-arrow-down':'el-icon-arrow-right'"
                @click="publicStatus=!publicStatus"></i>
                <span @click="publicStatus=!publicStatus">
                    最终动画
                </span>
                <el-switch class="edit-title-switch"
                        v-model="endAnimate.show"
                        active-color="#77DC04"
                        @change="setEndAnimateStatus()"
                        inactive-color="#ff4949">
                </el-switch>
            </div>
            <div v-show="publicStatus" class="game-inner">
                <div class="upload">
                    <span class="file-title">动画文件：</span>
                    <div class="animate-box">
                        <span v-text="endAnimate.animate.name"></span>
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" multiple="multiple" @change="uploadAnimation('endAnimate.animate',$event)">
                        </div>
                    </div>
                </div>
                <el-input placeholder="请输入内容" @input="setAttr('x','endAnimate.animate',$event)" v-model="endAnimate.animate.x" size="mini">
                    <template slot="prepend">X：</template>
                </el-input>
                <el-input placeholder="请输入内容" @input="setAttr('y','endAnimate.animate',$event)" v-model="endAnimate.animate.y" size="mini">
                    <template slot="prepend">Y：</template>
                </el-input>
                <el-input placeholder="请输入内容" @input="setAttr('scale','endAnimate.animate',$event)" v-model="endAnimate.animate.scale" size="mini">
                    <template slot="prepend">Scale：</template>
                </el-input>
                <div class="upload">
                    <span class="file-title">点击前音频：</span>
                    <div class="animate-box">
                        <span v-text="endAnimate.before_audio.name"></span>
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" @change="uploadAudio('before_audio',$event)">
                        </div>
                    </div>
                </div>
                <div class="upload">
                    <span class="file-title">点击后音频：</span>
                    <div class="animate-box">
                        <span v-text="endAnimate.after_audio.name"></span>
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" @change="uploadAudio('after_audio',$event)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="game-title" style="background: #313131;padding-left: 8px;border-bottom: 1px solid #232323;">
                <i :class="helpStatus?'el-icon-arrow-down':'el-icon-arrow-right'"
                   @click="helpStatus = !helpStatus"></i>
                <span @click="helpStatus = !helpStatus">
                    帮助按钮动画
                </span>
                <el-switch class="edit-title-switch"
                           v-model="allData.help.show"
                           active-color="#77DC04"
                           @change="allData.help.name = ''"
                           inactive-color="#ff4949">
                </el-switch>
            </div>
            <div class="game-inner" v-show="helpStatus">
                <div class="upload">
                    <span class="file-title">动画文件：</span>
                    <div class="animate-box">
                        <span v-text="allData.help.name"></span>
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" multiple="multiple" @change="uploadAnimation('help',$event)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import {enterAnimate,mouseEnterAnimate} from './libs/publicData';
    import {Sprite,Texture} from 'pixi.js'
    let startAnimate = {
        "show": true,
        "startBtn": {
            "name": "",
            "x": 0,
            "y": 0,
            "waitAnimation": "idle",
            "clickAnimation": "touch",
            "scale": 1
        },
        "startBg": {
            "name": "",
            "x": 0,
            "y": 0,
            "waitAnimation": "idle",
            "clickAnimation": "touch",
            "scale": 1
        },
        "bgSound": {
            "name": "",
            "volume": 1
        },
        "clickAudio": {
            "name": ""
        },
        "muteButton": {
            "status": true,
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0,
            "lock": true,
            "ratio": 1,
            "componentName": "muteButton",
            "default": {
                "name": ""
            },
            "click": {
                "name": ""
            }
        }
    };
    export default {
        name: "EditGameAfter",
        props:['allData','resourceData'],
        data(){
            return{
                lockImg:this.resourceData['image_lock_on'],
                unLockImg:this.resourceData['image_lock_off'],
                publicStatus: false,
                endAnimate:null,
                startAnimateStatus:false,
                startAnimate:null,
                buttonStatus:false,
                helpStatus:false
            }
        },
        methods:{
            setImageLock(type){
                let data = this.allData.startAnimate.muteButton;
                if(type === 'prev'){
                    data = this.allData.button.prev
                }
                if(type === 'next'){
                    data = this.allData.button.next
                }
                if(type === 'reload'){
                    data = this.allData.button.reload
                }
                data.lock = !data.lock;
                if(data.height===0||data.width===0){
                    return;
                }
                if(data.lock){
                    data.ratio = data.width/data.height;
                }
                console.log(data.ratio);
            },
            setElementStatus(type,attr,e){
                let data = this.startAnimate.muteButton;
                if(type === 'prev'){
                    data = this.allData.button.prev;
                }
                if(type === 'next'){
                    data = this.allData.button.next;
                }
                if(type === 'reload'){
                    data = this.allData.button.reload;
                }
                let ratio = data.ratio;
                if(attr === 'scale'){
                    data[attr] = this.verifyNumber(data[attr]);
                }
                else{
                    if((attr === 'x'||attr === 'width')&& data[attr] > 1920){
                        data[attr] = data[attr].substr(0,3);
                        this.$message.error('输入数值超出范围 应为0-1920');
                        return false;
                    }
                    if((attr === 'y'||attr === 'height')&& data[attr] > 1080){
                        data[attr] = data[attr].substr(0,3);
                        this.$message.error('输入数值超出范围 应为0-1080');
                        return false;
                    }
                    if(attr === 'x'||attr === 'y'||attr === 'width'||attr === 'height'){
                        data[attr] = this.verifyNumber(data[attr]);
                    }
                    if(attr === 'width'){
                        if(data.lock){
                            if(!isNaN((e/ratio).toFixed(0))) {
                                data['height'] = (e / ratio).toFixed(0);
                            }
                        }
                    }
                    if(attr === 'height'){
                        if(data.lock) {
                            if(!isNaN((e*ratio).toFixed(0))) {
                                data['width'] = (e * ratio).toFixed(0);
                            }
                        }
                    }
                }
            },
            setEndAnimateStatus(){
                this.endAnimate.animate.name = '';
                this.endAnimate.animate.x = '';
                this.endAnimate.animate.y = '';
                this.endAnimate.animate.scale = '';
                this.endAnimate.before_audio.name = '';
                this.endAnimate.after_audio.name = '';
                // this.publicStatus = this.endAnimate.show;
            },
            setStartAnimateStatus(){
                this.allData.startAnimate = startAnimate;
                this.startAnimate = startAnimate;
            },
            verifyNumber(number){
                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number)
                };
                let reg = /^\d*\.+$/g;
                if(isNaN(number)){
                    number = 0;
                }
                if(parseFloat(number)>=0){
                    if(isFloat(parseFloat(number))){
                        number = parseFloat(number.split('.')[0]+'.'+number.split('.')[1].substr(0,1));
                    }else{
                        if(reg.test(number)){
                            number = parseFloat(number)+'.';
                        }else{
                            number = number?parseFloat(number):0;
                        }
                    }
                }else{
                    number = 0;
                }
                return number
            },
            verifyAnimationFiles(filesArr) {
                let arr = Object.values(filesArr).map((item, index) => item.name);
                let extArr = [];
                let nameArr = arr.map((item)=>{
                    extArr.push(item.split('.')[1]);
                    return item.split('.')[0]
                });
                let extArrString = extArr.sort((a,b)=>a.length-b.length).toString();
                let extTestArrString = ["png", "json", "atlas"].toString();
                let testName = nameArr[0];
                let nameStatus = nameArr.every((item,index)=>{
                    return testName === item
                });
                let extStatus = extArrString === extTestArrString;
                return nameStatus&&extStatus;
            },
            uploadAnimation(type,e) {
                if (e.target.files.length === 0 || e.target.files.length !== 3) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    e.target.value = '';
                    return;
                }
                if(!this.verifyAnimationFiles(e.target.files)){
                    this.$message({
                        message: '上传文件不符合',
                        type: 'warning',
                    });
                    e.target.value = '';
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
                    if(type ==='help'){
                        this.allData.help.name = res.resourceName;
                    }else{
                        this.allData[type.split('.')[0]][type.split('.')[1]].name = res.resourceName;

                    }
                })
            },
            setAttr(attr,type,e){
                let data = this.allData[type.split('.')[0]][type.split('.')[1]];
                if(data){
                    if(attr === 'scale'){
                        // data[attr] = this.verifyNumber(data[attr]);
                    }
                    if((attr === 'x'||attr === 'width') && data[attr] > 1920){
                        data[attr] = data[attr].substr(0,data[attr].length-1);
                        this.$message.error('输入数值超出范围 应为0-1920');
                        return false;
                    }
                    if((attr === 'y'||attr === 'height') && data[attr] > 1080){
                        data[attr] = data[attr].substr(0,data[attr].length-1);
                        this.$message.error('输入数值超出范围 应为0-1080');
                        return false;
                    }
                    if(attr === 'x'||attr === 'y'||attr === 'width'||attr === 'height'){
                        data[attr] = this.verifyNumber(data[attr]);
                    }
                }
            },
            uploadAudio(type,e) {
                let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length-1];
                let extArr = ['mp3','wav'];
                if(extArr.indexOf(ext) === -1){
                    this.$message({
                        message: '上传类型不符',
                        type: 'error'
                    });
                    return;
                }
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                this.$http.post('/uploadingAudio',
                    {audio: e.target.files[0]}, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    e.target.value = '';
                    if(type === 'bgSound'){
                        this.startAnimate.bgSound.name = res.resourceName;
                    }else if(type === 'clickAudio'){
                        this.startAnimate.clickAudio.name = res.resourceName;
                    }else{
                        this.endAnimate[type].name = res.resourceName;
                        console.log(this.endAnimate);
                    }
                })
            },
            updateResourceData() {
                this.$emit('updateResourceData')
            },
            uploadImage(type,name, e) {
                let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length-1];
                let extArr = ['jpg','png'];
                if(extArr.indexOf(ext) === -1){
                    this.$message({
                        message: '上传类型不符',
                        type: 'error'
                    });
                    return;
                }
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                this.$http.post('/uploadingImage',
                    {
                        image: e.target.files[0]
                    },
                    {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    if(type === 'muteButton'){
                        this.allData.startAnimate.muteButton[name].name = res.resourceName;
                        if(name === 'default'){
                            this.allData.startAnimate.muteButton.width = res.width;
                            this.allData.startAnimate.muteButton.height = res.height;
                            this.allData.startAnimate.muteButton.ratio = res.width/res.height;
                        }
                    }
                    if(type === 'prev'||type === 'next'||type === 'reload'){
                        this.allData.button[type].name = res.resourceName;
                        this.allData.button[type].width = res.width;
                        this.allData.button[type].height = res.height;
                        this.allData.button[type].ratio = res.width/res.height;
                    }
                    this.updateResourceData();
                    e.target.value='';
                })
            },
        },
        mounted(){
            this.endAnimate = this.allData.endAnimate;
            this.startAnimate = this.allData.startAnimate;
        }
    }
</script>

<style scoped>
.upload-title{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #fff;
}
</style>