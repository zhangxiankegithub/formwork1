<template>
    <div>
        <div class="game-title">
            <i :class="tabShowStatus[index].child.option?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'option')" ref="optionTitle"></i>
            <span @click="tabShow(index,'option')">数独矩阵</span>
        </div>
        <div class="game-inner" v-show="tabShowStatus[index].child.option">
            <div class="edit-select" style="width: 80%">
                <span>矩阵类型：</span>
                <el-select  v-model="item.displaycontrol[0].style" @change="selectoption(index)" placeholder="请选择" size="mini">
                    <el-option
                            v-for="item in style"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="upload" >
                <div class="option-animate-title">
                    矩阵分组：
                </div>
                <div class="option-animate-title">
                    (文本格式输入数字，用逗号隔开，回车换行，最后一行数字末尾不加逗号)
                </div>
            </div>
            <div class="edit-textarea">
                <textarea name=""  cols="30" rows="10" style="width: 100%;height: 100%"  v-model="item.matrix0[0].text"
                            placeholder="请输入文字">
                </textarea>
            </div>
            <div class="upload" >
                <div class="option-animate-title">
                    矩阵赋值：
                </div>
                <div class="option-animate-title">
                    (文本格式输入数字，用逗号隔开，回车换行，最后一行数字末尾不加逗号)
                </div>
            </div>
            <div class="edit-textarea">
                <textarea name=""  cols="30" rows="10" style="width: 100%;height: 100%"  v-model="item.matrix1[0].text"
                            placeholder="请输入文字">
                </textarea>
            </div>
            <div class="upload" >
                <div class="option-animate-title">
                    空值难易度优先级提示顺序：
                </div>
                <div class="option-animate-title">
                   (文本格式输入数字，用逗号隔开，回车换行，最后一行数字末尾不加逗号)
                </div>
            </div>
            <div class="edit-textarea">
                <textarea name=""  cols="30" rows="10" style="width: 100%;height: 100%"  v-model="item.matrix2[0].text"
                            placeholder="请输入文字">
                </textarea>
            </div>
        </div>
        <div class="game-title">
            <i :class="tabShowStatus[index].child.option1?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'option1')" ref="option1Title"></i>
            <span @click="tabShow(index,'option1')">矩阵格子配置</span>
        </div>
        <div class="game-inner" v-show="tabShowStatus[index].child.option1">
            <div class="upload" >
                <div class="option-animate-title">
                    | 格子排列间距
                </div>
                <div class="lockStatus">
                    <el-input placeholder="请输入其宽度"  style="width:40%" v-model="item.ranks.width" size="mini" @input="setElementStatus1(index,'ranks','width',item.ranks,$event,item.ranks.ratio)">
                        <template slot="prepend">行间距:</template>
                    </el-input>
                    <div style="float: left;text-align: center;width: 20%;height: 28px;margin-top: 15px">
                        <img :src = unLockImg alt="" @click="setImageLock2('index','ranks')" style="height: 10px" v-if="!item.ranks.lock">
                        <img :src = lockImg alt="" @click="setImageLock2('index','ranks')" style="height: 10px" v-if="item.ranks.lock">
                    </div>
                    <el-input placeholder="请输入其高度"  style="width:40%" v-model="item.ranks.height" size="mini" @input="setElementStatus1(index,'ranks','height',item.ranks,$event,item.ranks.ratio)">
                        <template slot="prepend">列间距:</template>
                    </el-input>
                </div>
                <div class="upload" >
                    <div class="option-animate-title">
                        | 格子矩阵位置
                    </div>
                    <el-input placeholder="请输入内容"  v-model="item.square.x" size="mini"@input="setElementStatus1(index,'square','x',item.square,$event,'')">
                        <template slot="prepend">X：</template>
                    </el-input>
                    <el-input placeholder="请输入内容"  v-model="item.square.y" size="mini"@input="setElementStatus1(index,'square','y',item.square,$event,'')">
                        <template slot="prepend">Y：</template>
                    </el-input>
                </div>
                <div class="upload" >
                    <div class="option-animate-title">
                        | 每个格子大小
                    </div>
                    <div class="lockStatus">
                        <el-input placeholder="请输入其宽度"  style="width:40%" v-model="item.square.width" size="mini" @input="setElementStatus1(index,'square','width',item.square,$event,item.square.ratio)">
                            <template slot="prepend">W :</template>
                        </el-input>
                        <div style="float: left;text-align: center;width: 20%;height: 28px;margin-top: 15px">
                            <img :src = unLockImg alt="" @click="setImageLock2('index','square')" style="height: 10px" v-if="!item.square.lock">
                            <img :src = lockImg alt="" @click="setImageLock2('index','square')" style="height: 10px" v-if="item.square.lock">
                        </div>
                        <el-input placeholder="请输入其高度"  style="width:40%" v-model="item.square.height" size="mini" @input="setElementStatus1(index,'square','height',item.square,$event,item.square.ratio)">
                            <template slot="prepend">H :</template>
                        </el-input>
                    </div>
                </div>
                <div class="upload">
                    <div class="option-animate-title">
                        <div class="edit-checkbox-title">
                            <el-checkbox v-model="item.line[0].show" size="small" @change="setResource(index,'line')">格子分组间隔线</el-checkbox>
                        </div>
                    </div>
                </div>
                <div class="upload" v-show="item.line[0].show">
                    <div class="img-box">
                        <img :src="resourceData[item.line[0].name]" alt="" width="131" height="96">
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改图片</span>
                            <input type="file" @change="uploadImage(index,'line',$event,0)">
                        </div>
                    </div>
                </div>
                <div class="upload" v-show="item.line[0].show">
                        <el-input placeholder="请输入内容"  v-model="item.line[0].x" size="mini"@input="setElementStatus1(index,'line','x',item.line[0],$event,'')">
                            <template slot="prepend">X：</template>
                        </el-input>
                        <el-input placeholder="请输入内容"  v-model="item.line[0].y" size="mini"@input="setElementStatus1(index,'line','y',item.line[0],$event,'')">
                            <template slot="prepend">Y：</template>
                        </el-input>
                    <div class="lockStatus">
                        <el-input placeholder="请输入其宽度" style="width: 35%" v-model="item.line[0].width" size="mini" @input="setElementStatus1(index,'line','width',item.line[0],$event,item.line[0].ratio)">
                            <template slot="prepend">W :</template>
                        </el-input>
                        <!--<span class="lock_block" :lockRadio="item0.ratio"><img :src="resourceData[item0.lockImg]" data-lock="false" alt="" @click="lockStatusData(item0,$event)"></span>-->
                        <div style="float: left;text-align: center;width: 20%;height: 28px;margin-top: 15px">
                            <img :src = unLockImg alt="" @click="setImageLock1('index','line')" style="height: 10px" v-if="!item.line[0].lock">
                            <img :src = lockImg alt="" @click="setImageLock1('index','line')" style="height: 10px" v-if="item.line[0].lock">
                        </div>
                        <el-input placeholder="请输入其高度" style="width: 35%" v-model="item.line[0].height" size="mini" @input="setElementStatus1(index,'line','height',item.line[0],$event,item.line[0].ratio)">
                            <template slot="prepend">H :</template>
                        </el-input>
                    </div>
                </div>
                <div class="upload">
                    <div class="option-animate-title">
                        <div class="edit-checkbox-title">
                            | 空格子
                        </div>
                    </div>
                    <div class="edit-checkbox-title">
                        默认状态：
                    </div>
                </div>
                <div class="upload">
                    <div class="img-box">
                        <img :src="resourceData[item.square.NAME[0].name]" alt="" width="131" height="96">
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改图片</span>
                            <input type="file" @change="uploadImage0(index,'square','NAME',$event,0)">
                        </div>
                    </div>
                </div>
                <div class="upload">
                    <div class="option-animate-title">
                        <div class="edit-checkbox-title">
                            选中和提示状态：
                        </div>
                    </div>
                </div>
                <div class="upload">
                    <div class="img-box">
                        <img :src="resourceData[item.square.NAME[1].name]" alt="" width="131" height="96">
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改图片</span>
                            <input type="file" @change="uploadImage0(index,'square','NAME',$event,1)">
                        </div>
                    </div>
                </div>
                    
                <div class="option-animate-title">
                    <div class="edit-checkbox-title" style="margin-bottom:15px">
                        | 固定格子(格子种类由矩阵类型决定)
                    </div>
                </div>
                <div v-for="(item2,index2) in item.number1">
                    <div class="game-title">
                        <i :class="index2===id?'el-icon-arrow-down':'el-icon-arrow-right'"
                        @click="id===index2?id=-1:id=index2"></i>
                        <span @click="id=== index2?id=-1:id=index2">格子{{index2+1}}</span>
                    </div>
                    <div class="game-inner" v-show="index2===id">
                        <div class="upload">
                            矩阵赋值:{{index2+1}}
                            <div class="edit-checkbox-title">
                                默认状态：
                            </div>
                        </div>
                        <div class="upload">
                            <div class="img-box">
                                <img :src="resourceData[item2.NAME[0].name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadImage0(index,'number1','NAME',$event,index2,0)">
                                </div>
                            </div>
                        </div>
                        <div class="upload">
                            <div class="edit-checkbox-title">
                                错误提示状态：
                            </div>
                        </div>
                        <div class="upload">
                            <div class="img-box">
                                <img :src="resourceData[item2.NAME[1].name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadImage0(index,'number1','NAME',$event,index2,1)">
                                </div>
                            </div>
                        </div>
                        <div class="upload">
                            <div class="edit-checkbox-title">
                                输入错误状态：
                            </div>
                        </div>
                        <div class="upload">
                            <div class="img-box">
                                <img :src="resourceData[item2.NAME[2].name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadImage0(index,'number1','NAME',$event,index2,2)">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="game-title">
            <i :class="tabShowStatus[index].child.option2?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'option2')" ref="option2Title"></i>
            <span @click="tabShow(index,'option2')">选项配置 (选项数量由矩阵决定)</span>
        </div>
        <div class="game-inner" v-show="tabShowStatus[index].child.option2">
            <div class="upload">
                <div class="option-animate-title">
                        | 选项入场效果
                </div>
            </div>
            <div class="upload">
                <el-radio v-model=item.option[0].number label="0">从上落下</el-radio>
                <el-radio v-model=item.option[0].number label="1">从下弹起</el-radio>
                <br>
                <br>
                <el-radio v-model=item.option[0].number label="2">从小到大</el-radio>
                <el-radio v-model=item.option[0].number label="3">渐隐渐现</el-radio>
                <div class="upload">
                    <el-radio v-model=item.option[0].number label="4">无</el-radio>
                </div>
            </div>
            <div class="upload">
                <div class="option-animate-title">
                        | 选项大小 (根据选项1大小设置，控制所有格字大小)
                </div>
                <div class="lockStatus">
                    <el-input placeholder="请输入其宽度" style="width: 35%" v-model="item.option[0].width" size="mini" @input="setElementStatus1(index,'option'+0,'width',item.option[0],$event,item.option[0].ratio)">
                        <template slot="prepend">W :</template>
                    </el-input>
                    <!--<span class="lock_block" :lockRadio="item0.ratio"><img :src="resourceData[item0.lockImg]" data-lock="false" alt="" @click="lockStatusData(item0,$event)"></span>-->
                    <div style="float: left;text-align: center;width: 20%;height: 28px;margin-top: 15px">
                        <img :src = unLockImg alt="" @click="setImageLock1('index','option')" style="height: 10px" v-if="!item.option[0].lock">
                        <img :src = lockImg alt="" @click="setImageLock1('index','option')" style="height: 10px" v-if="item.option[0].lock">
                    </div>
                    <el-input placeholder="请输入其高度" style="width: 35%" v-model="item.option[0].height" size="mini" @input="setElementStatus1(index,'option'+0,'height',item.option[0],$event,item.option[0].ratio)">
                        <template slot="prepend">H :</template>
                    </el-input>
                </div>
            </div>
            <div class="upload">
                <div v-for="(item3,index3) in item.option">
                    <div class="game-title">
                        <i :class="index3===id2?'el-icon-arrow-down':'el-icon-arrow-right'"
                        @click="id2===index3?id2=-1:id2=index3"></i>
                        <span @click="id2=== index3?id2=-1:id2=index3">选项{{index3+1}}</span>
                    </div>
                    <div class="game-inner" v-show="index3===id2">
                        <div class="upload">
                            赋值id:{{index3+1}}
                        </div>
                        <div class="upload">
                            <div class="img-box">
                                <img :src="resourceData[item3.name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadImage(index,'option',$event,index3)">
                                </div>
                            </div>
                        </div>
                        <el-input placeholder="请输入内容"  v-model="item.option[index3].x" size="mini"@input="setElementStatus1(index,'option'+index3,'x',item.option[index3],$event,'')">
                            <template slot="prepend">X：</template>
                        </el-input>
                        <el-input placeholder="请输入内容"  v-model="item.option[index3].y" size="mini"@input="setElementStatus1(index,'option'+index3,'y',item.option[index3],$event,'')">
                            <template slot="prepend">Y：</template>
                        </el-input>
                    </div>
                </div>   
            </div>
        </div>
        <div class="game-title">
            <i :class="tabShowStatus[index].child.option3?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'option3')" ref="option3Title"></i>
            <span @click="tabShow(index,'option3')">反馈动画</span>
        </div>
        <div class="game-inner" v-show="tabShowStatus[index].child.option3">
            <div class="game-title">
                <i :class="tabShowStatus[index].child.option4?'el-icon-arrow-down':'el-icon-arrow-right'"
                @click="tabShow(index,'option4')" ref="option4Title"></i>
                <span @click="tabShow(index,'option4')">角色反馈动画</span>
            </div>
            <div class="game-inner" v-show="tabShowStatus[index].child.option4">  
                <div class="upload" v-show="this.allData.feedbackAnimate.show">
                    <div class="option-animate-title">
                        <el-checkbox v-model="item.feedback0[0].defaultshow" size="small" >
                            默认：<el-input style="width:50%" placeholder="请输入内容"  v-model="item.feedback0[0].defaultanimation" size="mini"> </el-input>
                        </el-checkbox>
                        <el-checkbox v-model="item.feedback0[0].dutishuohuashow" size="small" >
                            读题说话：<el-input style="width:50%" placeholder="请输入内容"  v-model="item.feedback0[0].dutishuohuaanimation" size="mini"> </el-input>
                        </el-checkbox>
                        <el-checkbox v-model="item.feedback0[0].smallrightshow" size="small" >
                            小题正确：<el-input style="width:50%" placeholder="请输入内容"  v-model="item.feedback0[0].smallrightanimation" size="mini"> </el-input>
                        </el-checkbox>
                        <el-checkbox v-model="item.feedback0[0].bigrightshow" size="small" >
                            大题正确：<el-input style="width:50%" placeholder="请输入内容"  v-model="item.feedback0[0].bigrightanimation" size="mini"> </el-input>
                        </el-checkbox>
                        <el-checkbox v-model="item.feedback0[0].wrongshow" size="small" >
                            错误：<el-input style="width:50%" placeholder="请输入内容"  v-model="item.feedback0[0].wronganimation" size="mini"> </el-input>
                        </el-checkbox>
                    </div>
                    <el-input placeholder="请输入内容"  v-model="item.feedback0[0].role[0].x" size="mini"@input="setElementStatus1(index,'role','x',item.feedback0[0].role[0],$event,'')">
                    <template slot="prepend">X：</template>
                    </el-input>
                    <el-input placeholder="请输入内容"  v-model="item.feedback0[0].role[0].y" size="mini"@input="setElementStatus1(index,'role','y',item.feedback0[0].role[0],$event,'')">
                        <template slot="prepend">Y：</template> 
                    </el-input>        
                    <el-input placeholder="请输入内容"  v-model="item.feedback0[0].role[0].scale" size="mini"@input="setElementStatus1(index,'role','scale',item.feedback0[0].role[0],$event,'')">
                        <template slot="prepend">Scale：</template>      
                    </el-input>
                </div>

                <div class="upload">
                    <i @click="changeArr('del',0,'ruchangaudio','feedback0')" class="game-title-icon el-icon-delete"></i>
                    <span class="file-title" style="width: 65px">入场音频</span>
                    <div class="animate-box" style="width: 80px">
                        <span v-text="item.feedback0[0].ruchangaudio.name"></span>
                    </div>
                    <div class="upload-btn" style="position:relative;left: -18px">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file"  @change="uploadAudio(0,index,'feedback0','ruchangaudio',$event)">
                        </div>
                    </div>
                </div>
                <div class="upload">
                    <i @click="changeArr('del',0,'timuaudio','feedback0')" class="game-title-icon el-icon-delete"></i>
                    <span class="file-title" style="width: 65px">题目音频</span>
                    <div class="animate-box" style="width: 80px">
                        <span v-text="item.feedback0[0].timuaudio.name"></span>
                    </div>
                    <div class="upload-btn" style="position:relative;left: -18px">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file"  @change="uploadAudio(0,index,'feedback0','timuaudio',$event)">
                        </div>
                    </div>
                </div>
                <div class="upload">
                    <i @click="changeArr('del',0,'tishiaudio','feedback0')" class="game-title-icon el-icon-delete"></i>
                    <span class="file-title" style="width: 65px">提示音频</span>
                    <div class="animate-box" style="width: 80px">
                        <span v-text="item.feedback0[0].tishiaudio.name"></span>
                    </div>
                    <div class="upload-btn" style="position:relative;left: -18px">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file"  @change="uploadAudio(0,index,'feedback0','tishiaudio',$event)">
                        </div>
                    </div>
                </div>

                <div>
                    <div class="upload">
                        <span class="file-title" style="width:100px">小题正确音频</span>
                        <i @click="changeArr1('add',index,'smallrightaudio')" class="game-title-icon el-icon-plus" ></i>
                    </div>
                    <div v-for="(item4,index4) in item.feedback0[0].smallrightaudio">
                        <div class="upload">
                            <i @click="changeArr1('del',index4,'smallrightaudio')" class="game-title-icon el-icon-delete"></i>
                            <span class="file-title" style="width: 65px"></span>
                            <div class="animate-box" style="width: 80px">
                                <span v-text="item4.audio"></span>
                            </div>
                            <div class="upload-btn" style="position:relative;left: -18px">
                                <div class="upload-btn-file">
                                    <span>更改文件</span>
                                    <input type="file"  @change="uploadAudio1(index,index4,'feedback0','smallrightaudio',$event)">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="upload">
                    <i @click="changeArr('del',0,'bigrightaudio','feedback0')" class="game-title-icon el-icon-delete"></i>
                    <span class="file-title" style="width: 85px">大题正确音频</span>
                    <div class="animate-box" style="width: 65px">
                        <span v-text="item.feedback0[0].bigrightaudio.name"></span>
                    </div>
                    <div class="upload-btn" style="position:relative;left: -18px">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file"  @change="uploadAudio(0,index,'feedback0','bigrightaudio',$event)">
                        </div>
                    </div>
                </div>

                <div>
                    <div class="upload">
                        <span class="file-title">错误音频</span>
                        <i @click="changeArr1('add',index,'wrongaudio')" class="game-title-icon el-icon-plus" ></i>
                    </div>
                    <div v-for="(item4,index4) in item.feedback0[0].wrongaudio">
                        <div class="upload">
                            <i @click="changeArr1('del',index4,'wrongaudio')" class="game-title-icon el-icon-delete"></i>
                            <span class="file-title" style="width: 65px"></span>
                            <div class="animate-box" style="width: 80px">
                                <span v-text="item4.audio"></span>
                            </div>
                            <div class="upload-btn" style="position:relative;left: -18px">
                                <div class="upload-btn-file">
                                    <span>更改文件</span>
                                    <input type="file"  @change="uploadAudio1(index,index4,'feedback0','wrongaudio',$event)">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>  

            <div class="game-title"> 
                <i :class="tabShowStatus[index].child.option5?'el-icon-arrow-down':'el-icon-arrow-right'"
                @click="tabShow(index,'option5')" ref="option5Title"></i>
                <span @click="tabShow(index,'option5')">题干反馈动画</span>
                <div class="edit-switch" style="margin-left:-38px;float:right;top:-9px;position: relative">
                <el-switch
                        v-model="item.feedback1[0].tigananimation[0].show"
                        active-color="#77DC04"
                        @change="setdragStatus(index,'option5','tigananimation',0,'feedback1')"
                        inactive-color="#ff4949">
                </el-switch>
                </div>
            </div>
            <div class="game-inner" v-show="tabShowStatus[index].child.option5">  
                <div class="upload">
                    <span class="file-title">动画文件</span>
                    <div class="animate-box">
                        <span v-text="item.feedback1[0].tigananimation[0].name"></span>
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" multiple="multiple" @change="uploadAnimation(index,0,'feedback1','tigananimation',$event)">
                        </div>
                    </div>
                </div>
                <div class="upload">
                    <div class="option-animate-title">
                        <el-checkbox v-model="item.feedback1[0].ruchanshow" size="small" >
                            入场：<el-input style="width:50%" placeholder="请输入内容"  v-model="item.feedback1[0].ruchananimation" size="mini"> </el-input>
                        </el-checkbox>
                        <el-checkbox v-model="item.feedback1[0].defaultshow" size="small" >
                            默认：<el-input style="width:50%" placeholder="请输入内容"  v-model="item.feedback1[0].defaultanimation" size="mini"> </el-input>
                        </el-checkbox>
                        <el-checkbox v-model="item.feedback1[0].bigrightshow" size="small" >
                            大题正确：<el-input style="width:50%" placeholder="请输入内容"  v-model="item.feedback1[0].bigrightanimation" size="mini"> </el-input>
                        </el-checkbox>
                    </div>
                </div>

                <el-input placeholder="请输入内容"  v-model="item.feedback1[0].tigananimation[0].x" size="mini"@input="setElementStatus1(index,'tigananimation','x',item.feedback1[0].tigananimation[0],$event,'')">
                    <template slot="prepend">X：</template>
                </el-input>
                <el-input placeholder="请输入内容"  v-model="item.feedback1[0].tigananimation[0].y" size="mini"@input="setElementStatus1(index,'tigananimation','y',item.feedback1[0].tigananimation[0],$event,'')">
                    <template slot="prepend">Y：</template> 
                </el-input>        
                <el-input placeholder="请输入内容"  v-model="item.feedback1[0].tigananimation[0].scale" size="mini"@input="setElementStatus1(index,'tigananimation','scale',item.feedback1[0].tigananimation[0],$event,'')">
                    <template slot="prepend">Scale：</template>      
                </el-input> 
            </div> 

            <div class="game-title">
                <i :class="tabShowStatus[index].child.option6?'el-icon-arrow-down':'el-icon-arrow-right'"
                @click="tabShow(index,'option6')" ref="option6Title"></i>
                <span @click="tabShow(index,'option6')">空格子正误动效和音频</span>
            </div>
            <div class="game-inner" v-show="tabShowStatus[index].child.option6">  
                <div class="upload">
                    <div class="option-animate-title">
                            正确动效和音效:
                    </div>
                </div>
                <div class="upload">
                    <i @click="changeArr('del',0,'rightanimation','feedback2')" class="game-title-icon el-icon-delete"></i>
                    <span class="file-title" style="width: 85px">动画文件</span>
                    <div class="animate-box" style="width: 65px">
                        <span v-text="item.feedback2[0].rightanimation[0].name"></span>
                    </div>
                    <div class="upload-btn" style="position:relative;left: -18px">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" multiple="multiple" @change="uploadAnimation(index,0,'feedback2','rightanimation',$event)">
                        </div>
                    </div>
                </div>
                <div class="upload">
                    <i @click="changeArr('del',0,'rightaudio','feedback2')" class="game-title-icon el-icon-delete"></i>
                    <span class="file-title" style="width: 85px">音频文件</span>
                    <div class="animate-box" style="width: 65px">
                        <span v-text="item.feedback2[0].rightaudio.name"></span>
                    </div>
                    <div class="upload-btn" style="position:relative;left: -18px">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file"  @change="uploadAudio(0,index,'feedback2','rightaudio',$event)">
                        </div>
                    </div>
                </div>
                <div class="upload">
                    <div class="option-animate-title">
                            错误动效和音效:
                    </div>
                </div>
                <div class="upload">
                    <i @click="changeArr('del',0,'wronganimation','feedback2')" class="game-title-icon el-icon-delete"></i>
                    <span class="file-title" style="width: 85px">动画文件</span>
                    <div class="animate-box" style="width: 65px">
                        <span v-text="item.feedback2[0].wronganimation[0].name"></span>
                    </div>
                    <div class="upload-btn" style="position:relative;left: -18px">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" multiple="multiple" @change="uploadAnimation(index,0,'feedback2','wronganimation',$event)">
                        </div>
                    </div>
                </div>
                <div class="upload">
                    <i @click="changeArr('del',0,'wrongaudio','feedback2')" class="game-title-icon el-icon-delete"></i>
                    <span class="file-title" style="width: 85px">音频文件</span>
                    <div class="animate-box" style="width: 65px">
                        <span v-text="item.feedback2[0].wrongaudio.name"></span>
                    </div>
                    <div class="upload-btn" style="position:relative;left: -18px">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file"  @change="uploadAudio(0,index,'feedback2','wrongaudio',$event)">
                        </div>
                    </div>
                </div>
            </div>   
        </div>
        <div class="game-title">
            <i :class="tabShowStatus[index].child.option7?'el-icon-arrow-down':'el-icon-arrow-right'"
            @click="tabShow(index,'option7')" ref="option7Title"></i>
            <span @click="tabShow(index,'option7')">动画素材层级配置</span>
            <div class="edit-switch" style="margin-left:-38px;float:right;top:-9px;position: relative">
            </div>
        </div>
        <div class="game-inner" v-show="tabShowStatus[index].child.option7">  
            <div class="edit-select" style="width: 100%">
                <span>角色反馈动画层级：</span>
                <el-select  v-model="item.feedback3[0].jiaose" placeholder="请选择" size="mini">
                    <el-option
                            v-for="item in hierarchy"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="edit-select" style="width: 100%">
                <span>题干反馈动画层级：</span>
                <el-select  v-model="item.feedback3[0].tigan" placeholder="请选择" size="mini">
                    <el-option
                            v-for="item in hierarchy"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="edit-select" style="width: 100%">
                <span>矩阵格子和正误动效层级：</span>
                <el-select  v-model="item.feedback3[0].juzhen" placeholder="请选择" size="mini">
                    <el-option
                            v-for="item in hierarchy"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="edit-select" style="width: 100%">
                <span>选项层级：</span>
                <el-select  v-model="item.feedback3[0].xuanxiang" placeholder="请选择" size="mini">
                    <el-option
                            v-for="item in hierarchy"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div> 

        <div class="game-title">
            <i :class="tabShowStatus[index].child.option8?'el-icon-arrow-down':'el-icon-arrow-right'"
            @click="tabShow(index,'option8')" ref="option8Title"></i>
            <span @click="tabShow(index,'option8')">帮助按钮音频</span>
            <div class="edit-switch" style="margin-left:-38px;float:right;top:-9px;position: relative">
            <el-switch
                    v-model="item.feedback4[0].helpshow[0].show"
                    active-color="#77DC04"
                    @change="setdragStatus(index,'option8','helpshow',0,'feedback4')"
                    inactive-color="#ff4949">
            </el-switch>
            </div>
        </div>
        <div class="game-inner" v-show="tabShowStatus[index].child.option8"> 
            <div class="upload">
                <el-input placeholder="请输入内容"  v-model="item.feedback4[0].helpshow[0].x" size="mini"@input="setElementStatus1(index,'helpshow','x',item.feedback4[0].helpshow[0],$event,'')">
                <template slot="prepend">X：</template>
                </el-input>
                <el-input placeholder="请输入内容"  v-model="item.feedback4[0].helpshow[0].y" size="mini"@input="setElementStatus1(index,'helpshow','y',item.feedback4[0].helpshow[0],$event,'')">
                    <template slot="prepend">Y：</template> 
                </el-input>        
                <el-input placeholder="请输入内容"  v-model="item.feedback4[0].helpshow[0].scale" size="mini"@input="setElementStatus1(index,'helpshow','scale',item.feedback4[0].helpshow[0],$event,'')">
                    <template slot="prepend">Scale：</template>      
                </el-input>
            </div>
            <div class="upload">
                <span class="file-title" >音频文件</span>
                <div class="animate-box">
                    <span v-text="item.feedback4[0].helpaudio.name"></span>
                </div>
                <div class="upload-btn">
                    <div class="upload-btn-file">
                        <span>更改文件</span>
                        <input type="file"  @change="uploadAudio(0,index,'feedback4','helpaudio',$event)">
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
    import {UploadAndRenderEle,RenderElementByIndex} from 'xtemplate-editor'
    const answer = new AnswerInfo();
    export default {
        name: "EditGamePrivate",
        data() {
            return {
                lockImg:this.resourceData['image_lock_on'],
                unLockImg:this.resourceData['image_lock_off'],
                id:-1,
                id2:-1,
                style:[
                    {
                        label: '3x3',
                        value: '3'
                    },
                    {
                        label: '4x4',
                        value: '4'
                    },
                    {
                        label: '5x5',
                        value: '5'
                    },
                    {
                        label: '6x6',
                        value: '6'
                    },
                    {
                        label: '7x7',
                        value: '7'
                    },
                    {
                        label: '8x8',
                        value: '8'
                    },
                    {
                        label: '9x9',
                        value: '9'
                    }
                ],
                selectoptionvalue:[
                    {
                        value:"1,1,1,\n2,2,2,\n3,3,3"
                    },
                    {
                        value:"1,1,2,2,\n1,1,2,2,\n3,3,4,4,\n3,3,4,4"
                    },
                    {
                        value:"1,1,1,2,2,\n1,1,2,2,2,\n3,3,3,4,4,\n3,3,4,4,4,\n5,5,5,5,5"
                    },
                    {
                        value:"1,1,1,2,2,2,\n1,1,1,2,2,2,\n3,3,3,4,4,4,\n3,3,3,4,4,4,\n5,5,5,6,6,6,\n5,5,5,6,6,6"
                    },
                    {
                        value:"1,1,1,1,1,1,1,\n2,2,2,2,2,2,2,\n3,3,3,3,3,3,3,\n4,4,4,4,4,4,4,\n5,5,5,5,5,5,5,\n6,6,6,6,6,6,6,\n7,7,7,7,7,7,7"
                    },
                    {
                        value:"1,1,1,1,2,2,2,2,\n1,1,1,1,2,2,2,2,\n3,3,3,3,4,4,4,4,\n3,3,3,3,4,4,4,4,\n5,5,5,5,6,6,6,6,\n5,5,5,5,6,6,6,6,\n7,7,7,7,8,8,8,8,\n7,7,7,7,8,8,8,8"
                    },
                    {
                        value:"1,1,1,2,2,2,3,3,3,\n1,1,1,2,2,2,3,3,3,\n1,1,1,2,2,2,3,3,3,\n4,4,4,5,5,5,6,6,6,\n4,4,4,5,5,5,6,6,6,\n4,4,4,5,5,5,6,6,6,\n7,7,7,8,8,8,9,9,9,\n7,7,7,8,8,8,9,9,9,\n7,7,7,8,8,8,9,9,9"
                    }
                ],
                selectoptionvalue2:[
                    {
                        value:"0,0,0,\n0,0,0,\n0,0,0"
                    },
                    {
                        value:"0,0,0,0,\n0,0,0,0,\n0,0,0,0,\n0,0,0,0"
                    },
                    {
                        value:"0,0,0,0,0,\n0,0,0,0,0,\n0,0,0,0,0,\n0,0,0,0,0,\n0,0,0,0,0"
                    },
                    {
                        value:"0,0,0,0,0,0,\n0,0,0,0,0,0,\n0,0,0,0,0,0,\n0,0,0,0,0,0,\n0,0,0,0,0,0,\n0,0,0,0,0,0"
                    },
                    {
                        value:"0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,\n0,0,0,0,0,0,0"
                    },
                    {
                        value:"0,0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,0"
                    },
                    {
                        value:"0,0,0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,0,0,\n0,0,0,0,0,0,0,0,0"
                    }
                ],
                hierarchy:[
                    {
                        label: '第1层',
                        value: '1'
                    },
                    {
                        label: '第2层',
                        value: '2'
                    },
                    {
                        label: '第3层',
                        value: '3'
                    },
                    {
                        label: '第4层',
                        value: '4'
                    }
                ]
            }
        },
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
        methods: {
            selectoption(index){
                if(this.gameData[index].displaycontrol[0].style==3){
                    this.gameData[index].matrix0[0].text=this.selectoptionvalue[0].value
                    this.gameData[index].matrix1[0].text=this.selectoptionvalue2[0].value
                    this.gameData[index].matrix2[0].text=this.selectoptionvalue2[0].value
                }
                if(this.gameData[index].displaycontrol[0].style==4){
                    this.gameData[index].matrix0[0].text=this.selectoptionvalue[1].value
                    this.gameData[index].matrix1[0].text=this.selectoptionvalue2[1].value
                    this.gameData[index].matrix2[0].text=this.selectoptionvalue2[1].value
                }
                if(this.gameData[index].displaycontrol[0].style==5){
                    this.gameData[index].matrix0[0].text=this.selectoptionvalue[2].value
                    this.gameData[index].matrix1[0].text=this.selectoptionvalue2[2].value
                    this.gameData[index].matrix2[0].text=this.selectoptionvalue2[2].value
                }
                if(this.gameData[index].displaycontrol[0].style==6){
                    this.gameData[index].matrix0[0].text=this.selectoptionvalue[3].value
                    this.gameData[index].matrix1[0].text=this.selectoptionvalue2[3].value
                    this.gameData[index].matrix2[0].text=this.selectoptionvalue2[3].value
                }
                if(this.gameData[index].displaycontrol[0].style==7){
                    this.gameData[index].matrix0[0].text=this.selectoptionvalue[4].value
                    this.gameData[index].matrix1[0].text=this.selectoptionvalue2[4].value
                    this.gameData[index].matrix2[0].text=this.selectoptionvalue2[4].value
                }
                if(this.gameData[index].displaycontrol[0].style==8){
                    this.gameData[index].matrix0[0].text=this.selectoptionvalue[5].value
                    this.gameData[index].matrix1[0].text=this.selectoptionvalue2[5].value
                    this.gameData[index].matrix2[0].text=this.selectoptionvalue2[5].value
                }
                if(this.gameData[index].displaycontrol[0].style==9){
                    this.gameData[index].matrix0[0].text=this.selectoptionvalue[6].value
                    this.gameData[index].matrix1[0].text=this.selectoptionvalue2[6].value
                    this.gameData[index].matrix2[0].text=this.selectoptionvalue2[6].value
                }

                if(this.gameData[this.index].option.length>this.gameData[index].displaycontrol[0].style){
                    this.gameData[this.index].option.splice(this.gameData[index].displaycontrol[0].style,this.gameData[this.index].option.length-this.gameData[index].displaycontrol[0].style)
                    this.gameData[this.index].number1.splice(this.gameData[index].displaycontrol[0].style,this.gameData[this.index].number1.length-this.gameData[index].displaycontrol[0].style)
                }
                if(this.gameData[index].displaycontrol[0].style>this.gameData[this.index].option.length){
                    let Length = this.gameData[index].displaycontrol[0].style-this.gameData[this.index].option.length
                    for (let i = 0; i<Length; i++) {
                        this.gameData[this.index].option.push({
                            "number": "",
                            "name": "",
                            "componentName": "",
                            "x": "",
                            "y": "",
                            "width":"",
                            "height":"",
                            "lock": false,
                            "ratio": "0"
                        })
                        this.gameData[this.index].number1.push({
                            "NAME": [
                                {
                                    "name": ""
                                },
                                {
                                    "name": ""
                                },
                                {
                                    "name": "image_1577360221884"
                                }
                            ]
                        },)
                    }
                }
                RenderElementByIndex(this.index,this.allData);
                window.shuaxinshuaxin()
            },
            setdragStatus(index, name,type,ii,name2) {
                if (!this.gameData[index][name2][ii][type][0].show) {
                    
                    let title = this.$refs[name + 'Title'];
                    this.tabShowStatus[index].child[name] = false;
                    title.className = 'el-icon-arrow-right';
                    

                    if(type=="tigananimation"){
                        this.gameData[index].feedback1[0].ruchananimation=""
                        this.gameData[index].feedback1[0].defaultanimation=""
                        this.gameData[index].feedback1[0].bigrightanimation=""
                        this.gameData[index].feedback1[0].ruchanshow=false
                        this.gameData[index].feedback1[0].defaultshow=false
                        this.gameData[index].feedback1[0].bigrightshow=false
                        this.gameData[index].feedback1[0].tigananimation[0].show=false,
                        this.gameData[index].feedback1[0].tigananimation[0].name=""
                        this.gameData[index].feedback1[0].tigananimation[0].componentName=""
                        this.gameData[index].feedback1[0].tigananimation[0].x=""
                        this.gameData[index].feedback1[0].tigananimation[0].y=""
                        this.gameData[index].feedback1[0].tigananimation[0].scale=""
                    }
                    if(type=="helpshow"){
                        this.gameData[index].feedback4[0].helpaudio.name=""
                    }
                    RenderElementByIndex(this.index,this.allData);
                    window.shuaxinshuaxin()
                }
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
            uploadAnimation(index,index11, name, name2, e) {
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
                this.$http.post('/uploadingAnimation',object,
                    {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    this.gameData[index][name][index11][name2][0].name = res.resourceName;
                    this.gameData[index][name][index11][name2][0].componentName = name2;
                    this.gameData[index][name][index11][name2][0].x?"":this.gameData[index][name][index11][name2][0].x = 0;
                    this.gameData[index][name][index11][name2][0].y?"":this.gameData[index][name][index11][name2][0].y = 0;
                    this.gameData[index][name][index11][name2][0].scale = 1;
                    UploadAndRenderEle(this.index,name2,res,this.allData);
                    this.updateResourceData();
                })
            },
            uploadAudio(index0,index,name0,name,e) {
                let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1];
                let extArr = ['mp3', 'wav'];
                if (extArr.indexOf(ext) === -1) {
                    this.$message({
                        message: '上传类型不符',
                        type: 'error'
                    });
                    e.target.value = '';
                    return;
                }
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    e.target.value = '';
                    return;
                }
                this.$http.post('/uploadingAudio',
                    {audio: e.target.files[0]}, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    this.gameData[index][name0][index0][name].name = res.resourceName;
                        e.target.value = '';
                        // this.getResourceData();
                    }
                )
            },
             uploadAudio1(index,index44,name0,name,e) {
                let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1];
                let extArr = ['mp3', 'wav'];
                if (extArr.indexOf(ext) === -1) {
                    this.$message({
                        message: '上传类型不符',
                        type: 'error'
                    });
                    e.target.value = '';
                    return;
                }
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    e.target.value = '';
                    return;
                }
                this.$http.post('/uploadingAudio',
                    {audio: e.target.files[0]}, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    this.gameData[index][name0][0][name][index44].audio = res.resourceName;
                        e.target.value = '';
                        // this.getResourceData();
                    }
                )
            },
            changeArr(type, index, name,name2) {
                    if (type === 'del') {
                        if(name=="rightanimation"||name=="wronganimation"){
                            if(this.gameData[this.index][name2][0][name][0].name==""){
                                return
                            }
                        }else{
                            if(this.gameData[this.index][name2][0][name].name==""){
                                return
                            }
                            
                        }
                    this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        if(name=="rightanimation"||name=="wronganimation"){
                            this.gameData[this.index][name2][0][name][0].name=""
                            this.gameData[this.index][name2][0][name][0].componentName=""
                        }else{
                            this.gameData[this.index][name2][0][name].name=""
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },
            changeArr1(type, index, name) {
                if (type === 'add') {
                    function resetArr(arr) {
                        Object.values(arr).forEach((item, index) => {
                            if (typeof item === "object") {
                                resetArr(item)
                            } else if (typeof item === 'boolean') {
                                arr[Object.keys(arr)[index]] = false;
                            } else if (typeof item === 'string') {
                                arr[Object.keys(arr)[index]] = '';
                            } else if (typeof item === 'number') {
                                arr[Object.keys(arr)[index]] = 0;
                            }
                        })
                    };
                   
                    let arr = JSON.parse(JSON.stringify(this.gameData[this.index].feedback0[0][name][0]));
                    resetArr(arr);
                    this.gameData[this.index].feedback0[0][name].push(arr);
                }
                else if (type === 'copy') {
                    this.gameData[this.index].feedback0[0][name].push(JSON.parse(JSON.stringify(this.gameData[this.index].feedback0[0][name][0])));
                }
                else if (type === 'del') {

                    if(this.gameData[this.index].feedback0[0][name].length<=1)
                    {
                        this.gameData[this.index].feedback0[0][name][0].audio=""
                        return;
                    }

                    this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.gameData[this.index].feedback0[0][name].splice(index,1)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },
            setResource(index,name){
                if(!this.gameData[index][name][0].show){
                    this.gameData[index][name][0].show=false
                    this.gameData[index][name][0].name="";
                    this.gameData[index][name][0].componentName="";
                    this.gameData[index][name][0].x="";
                    this.gameData[index][name][0].y="";
                    this.gameData[index][name][0].width="";
                    this.gameData[index][name][0].height="";
                    this.gameData[index][name][0].lock=false,
                    this.gameData[index][name][0].ratio=""
                    RenderElementByIndex(index,this.allData);
                    window.shuaxinshuaxin()
                }else{
                    this.gameData[index][name][0].show=true
                    let line = stage.getChildByName('GAME').getChildByName('GAME'+index).getChildByName('componentContainer').getChildByName("line")
                    if(line){
                        line.visible=true
                    }
                }
            },
            updateResourceData(){
                /*
                * 上传图片后请求资源列表
                * 获取图片链接显示图片
                * */
                this.$emit('updateResourceData')
            },
            uploadImage0(index,name,name2,e,index33,index44) {
                let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1];
                let extArr = ['jpg', 'png'];
                if (extArr.indexOf(ext) === -1) {
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
                if (e.target.files[0].size/1024/1024>1) {
                    this.$message({
                        message: '上传文件大小在1M以内',
                        type: 'warning'
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
                    /*
                    * res.fieldName 图片原始name
                    * res.path 图片路径
                    * res.resourceName 资源name  需要更改gameData相应字段
                    * res.size 图片大小
                    * res.headers http headers
                    * */
                   if(name=='square'){
                       this.gameData[index][name][name2][index33].name = res.resourceName;
                       this.gameData[index][name].width = res.width;
                       this.gameData[index][name].height = res.height;
                       this.gameData[index][name].lock = false; 
                   }
                   if(name=='number1'){
                       this.gameData[index][name][index33][name2][index44].name = res.resourceName;
                   }
                    this.updateResourceData();
                    PIXI.loader.add(res.resourceName,res.path);
                    PIXI.loader.load((loader,resource)=>{
                        window.shuaxinshuaxin()
                    })
                    
                    e.target.value = '';
                })
            },
            uploadImage(index, name, e,index22) {
                let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1];
                let extArr = ['jpg', 'png'];
                if (extArr.indexOf(ext) === -1) {
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
                if (e.target.files[0].size/1024/1024>1) {
                    this.$message({
                        message: '上传文件大小在1M以内',
                        type: 'warning'
                    });
                    return;
                }
                this.$http.post('/uploadingImage',
                    {
                        image: e.target.files[0],
                        render:true
                    },
                    {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    /*
                    * res.fieldName 图片原始name
                    * res.path 图片路径
                    * res.resourceName 资源name  需要更改gameData相应字段
                    * res.size 图片大小
                    * res.headers http headers
                    * */
                    this.gameData[index][name][index22].name = res.resourceName;
                    
                    if(name=="option"){
                        this.gameData[index][name][index22].componentName = name+index22;
                    }else{
                        this.gameData[index][name][index22].componentName = name
                        this.gameData[index][name][index22].width = res.width;
                        this.gameData[index][name][index22].height = res.height;

                    }
                    this.gameData[index][name][index22].x?"":this.gameData[index][name][index22].x = 0;
                    this.gameData[index][name][index22].y?"":this.gameData[index][name][index22].y = 0;

                    PIXI.loader.add(res.resourceName,res.path);
                    PIXI.loader.load((loader,resource)=>{
                        if(name=="line"){
                            UploadAndRenderEle(this.index,name,res,this.allData);
                            this.gameData[index][name][index22].lock=false;
                            if(this.gameData[index][name][0].show==false){
                                let line = stage.getChildByName('GAME').getChildByName('GAME'+index).getChildByName('componentContainer').getChildByName("line");
                                line.visible = false;
                            }
                        }else if(name=="option"){
                            for (let i = 0; i < this.gameData[index][name].length; i++) {
                                this.gameData[index][name][i].width = res.width;
                                this.gameData[index][name][i].height = res.height;
                                this.gameData[index][name][i].lock=false; 
                            }  
                            UploadAndRenderEle(this.index,name+index22,res,this.allData);
                        }else{
                            UploadAndRenderEle(this.index,name+index22,res,this.allData);
                            this.gameData[index][name][index22].lock=false;
                        }
                        this.updateResourceData();
                    })
                    e.target.value = '';
                })
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
            setImageLock2(index,name){
                this.item[name].lock = !this.item[name].lock;
                if(this.item[name].height===0||this.item[name].width===0){
                    return;
                }
                if(this.item[name].lock){
                    this.item[name].ratio = this.item[name].width/this.item[name].height;
                }
            },
            setImageLock1(index,name){
                let component = this.item[name][0].componentName
                if(!component){
                    this.$message({
                        type:'warning',
                        message:'舞台未绑定元素'
                    });
                    return false
                }
                this.item[name][0].lock = !this.item[name][0].lock;
                if(this.item[name][0].height===0||this.item[name][0].width===0){
                    return;
                }
                if(this.item[name][0].lock){
                    this.item[name][0].ratio = this.item[name][0].width/this.item[name][0].height;
                }
            },
            setElementStatus1(index,name,attr,type,e,ratio){
                let componentContainer = stage.getChildByName('GAME').getChildByName('GAME'+index).getChildByName('componentContainer');
                let component = false;
                if(name=="ranks"){
                    
                }else if(name=="square"){
                    
                }else if(name=="role"){

                }else if(name=="helpshow"){

                }else{
                    component = componentContainer.getChildByName(name);
                }
                
                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number);
                };
                let data = type;
                if(component){
                    if(attr === 'scale'){
                        if(isFloat(data[attr])){
                            data[attr] = parseFloat(data[attr]).toFixed(1);
                        }
                        component[attr].set(data[attr]);
                    }else{
                        if((attr === 'x'||attr === 'width') && data[attr] > 1920){
                            data[attr] = parseFloat(component[attr]).toFixed(0);
                            this.$message.error('输入数值超出范围 应为0-1920');
                            return false;
                        }
                        if((attr === 'y'||attr === 'height') && data[attr] > 1080){
                            data[attr] = parseFloat(component[attr]).toFixed(0);
                            this.$message.error('输入数值超出范围 应为0-1080');
                            return false;
                        }
                        if(attr === 'x'||attr === 'y'||attr === 'width'||attr === 'height'){
                            data[attr] = this.verifyNumber(data[attr]);
                            component[attr] = data[attr];
                        }
                        if(attr === 'width'){
                            if(data.lock){
                                data['height'] = (e/ratio).toFixed(0);
                                component['height'] = data['height']

                            }
                        }
                        if(attr === 'height'){
                            if(data.lock) {
                                data['width'] = (e*ratio).toFixed(0);
                                component['width'] = data['width']
                            }
                        }
                    }
                }
                if(name=="option"+0){
                    if((attr === 'x'||attr === 'width') && data[attr] > 1920){
                        data[attr] = parseFloat(component[attr]).toFixed(0);
                        this.$message.error('输入数值超出范围 应为0-1920');
                        return false;
                    }
                    if((attr === 'y'||attr === 'height') && data[attr] > 1080){
                        data[attr] = parseFloat(component[attr]).toFixed(0);
                        this.$message.error('输入数值超出范围 应为0-1080');
                        return false;
                    }
                    if(attr === 'x'||attr === 'y'){
                        data[attr] = this.verifyNumber(data[attr]);
                        let componentContainer = stage.getChildByName('GAME').getChildByName('GAME'+0).getChildByName('componentContainer');
                        component = componentContainer.getChildByName("option"+0);
                        component[attr] = data[attr];
                    }
                    if(attr === 'width'||attr === 'height'){
                        console.log(123)
                        data[attr] = this.verifyNumber(data[attr]);
                        for (let i = 0; i < this.gameData[index].option.length; i++) {
                            let componentContainer = stage.getChildByName('GAME').getChildByName('GAME'+index).getChildByName('componentContainer');
                            component = componentContainer.getChildByName("option"+i);
                            component[attr] = data[attr];
                        }
                    }
                    if(attr === 'width'){
                        if(data.lock){
                            data['height'] = (e/ratio).toFixed(0);
                            for (let i = 0; i < this.gameData[index].option.length; i++) {
                                let componentContainer = stage.getChildByName('GAME').getChildByName('GAME'+index).getChildByName('componentContainer');
                                component = componentContainer.getChildByName("option"+i);
                                component['height'] = data['height']
                            }

                        }
                    }
                    if(attr === 'height'){
                        if(data.lock) {
                            data['width'] = (e*ratio).toFixed(0);
                            for (let i = 0; i < this.gameData[index].option.length; i++) {
                                let componentContainer = stage.getChildByName('GAME').getChildByName('GAME'+index).getChildByName('componentContainer');
                                component = componentContainer.getChildByName("option"+i);
                                component['width'] = data['width']
                            }
                        }
                    }
                }
                if(name == 'ranks'||name == 'square'){
                    let data = this.allData.sources[index][name];
                    let t0 = this.verifyNumber(e);

                    if((attr === 'x'||attr === 'width') && data[attr] > 1920){
                        data[attr] = parseInt(t0 / 10);
                        // data[attr] = parseFloat(this.gameData[index][name][attr]).toFixed(0);
                        this.$message.error('输入数值超出范围 应为0-1920');
                        return false;
                    }
                    if((attr === 'y'||attr === 'height') && data[attr] > 1080){
                        data[attr] = parseInt(t0 / 10);
                        // data[attr] = parseFloat(this.gameData[index][name][attr]).toFixed(0);
                        this.$message.error('输入数值超出范围 应为0-1080');
                        return false;
                    }
                    if(attr === 'x'||attr === 'y'||attr === 'width'||attr === 'height'){
                        data[attr] = this.verifyNumber(data[attr]);
                        window.shuaxinshuaxin()
                    }
                    if(attr === 'width'){
                        if(data.lock){
                            data['height'] = (e/ratio).toFixed(0);
                            window.shuaxinshuaxin()
                        }
                    }
                    if(attr === 'height'){
                        if(data.lock) {
                            data['width'] = (e*ratio).toFixed(0);
                            window.shuaxinshuaxin()
                        }
                    }
                }
                if(name == 'role'||name == 'helpshow'){
                    let data = type;
                    let t0 = this.verifyNumber(e);

                    if((attr === 'x'||attr === 'width') && data[attr] > 1920){
                        data[attr] = parseInt(t0 / 10);
                        // data[attr] = parseFloat(this.gameData[index][name][attr]).toFixed(0);
                        this.$message.error('输入数值超出范围 应为0-1920');
                        return false;
                    }
                    if((attr === 'y'||attr === 'height') && data[attr] > 1080){
                        data[attr] = parseInt(t0 / 10);
                        // data[attr] = parseFloat(this.gameData[index][name][attr]).toFixed(0);
                        this.$message.error('输入数值超出范围 应为0-1080');
                        return false;
                    }
                    if(attr === 'x'||attr === 'y'||attr === 'width'||attr === 'height'){
                        data[attr] = this.verifyNumber(data[attr]);

                    }
                    if(attr === 'width'){
                        if(data.lock){
                            data['height'] = (e/ratio).toFixed(0);
                        }
                    }
                    if(attr === 'height'){
                        if(data.lock) {
                            data['width'] = (e*ratio).toFixed(0);
                        }
                    }
                }
            },
            tabShow(index, name) {
                let title = this.$refs[name + 'Title'];
                let nameTab = this.tabShowStatus[index].child[name];
                if (nameTab) {
                    this.tabShowStatus[index].child[name] = false;
                    title.className = 'el-icon-arrow-right'
                } else {
                    if(name=="option5"){
                        if(this.gameData[index].feedback1[0].tigananimation[0].show){
                            this.tabShowStatus[index].child[name] = true;
                            title.className = 'el-icon-arrow-down';
                        }
                    }else if(name=="option8"){
                        if(this.gameData[index].feedback4[0].helpshow[0].show){
                            this.tabShowStatus[index].child[name] = true;
                            title.className = 'el-icon-arrow-down';
                        }
                    }else{
                        this.tabShowStatus[index].child[name] = true;
                        title.className = 'el-icon-arrow-down';
                    }
                    
                }   
            },
        }
    }
</script>
<style scoped lang="scss">
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