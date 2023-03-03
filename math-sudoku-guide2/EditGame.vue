<template>
    <div class="game" v-if="showStatus">
        <EditGameBefore :gameData="gameData" :resourceData="resourceData" :allData="allData" @updateResourceData="updateResourceData">

        </EditGameBefore>
        <div style="clear: both"></div>
        <div v-for="(item,index) in gameData" class="game-box" :style="{marginTop:index===0?'8px':0}">
            <div class="game-title" style="background: #313131;padding-left: 8px;border-bottom: 1px solid #232323;" :style="{
                background:tabShowStatus[index].show?'#409EFF':'#313131'
            }" @click="setLock(index)">
                <i :class="tabShowStatus[index].show?'el-icon-arrow-down':'el-icon-arrow-right'"
                   @click="tabShow(index,'one')" ref="oneTitle"></i>
                <span @click="tabShow(index,'one')">
                    内容页{{index+1}}
                </span>
                <i @click="changeArr('del',index)" class="game-title-icon el-icon-delete"></i>
                <i @click="changeArr('copy',index)" class="game-title-icon el-icon-tickets"></i>
                <i @click="changeArr('add',index)" class="game-title-icon el-icon-plus"></i>
                <!--<i class="game-title-icon el-icon-circle-check-outline" v-if="tabShowStatus[index].lock"></i>-->
            </div>
            <div v-show="tabShowStatus[index].show">
                <EditGamePublic
                    :gameData="gameData"
                    :item="item"
                    :index="index"
                    :resourceData="resourceData"
                    :allData="allData"
                    :tabShowStatus="tabShowStatus"
                    @updateResourceData="updateResourceData">
                </EditGamePublic>
                <EditGamePrivate
                    :gameData="gameData"
                    :item="item"
                    :index="index"
                    :resourceData="resourceData"
                    :allData="allData"
                    :tabShowStatus="tabShowStatus"
                    :tabShowLists="tabShowLists"
                    @updateResourceData="updateResourceData">
                </EditGamePrivate>
            </div>
        </div>
        <div style="clear: both"></div>
        <EditGameAfter :gameData="gameData" :resourceData="resourceData" :allData="allData" @updateResourceData="updateResourceData">

        </EditGameAfter>
    </div>
</template>
<script>
    import  EditGamePublic from './EditGamePublic';
    const  EditGamePrivate = require(`@/template/${process.env.PROJECT_NAME}/src/EditGamePrivate`)
    const  EditGameBefore = require(`@/template/${process.env.PROJECT_NAME}/src/EditGameBefore`)
    const  EditGameAfter = require(`@/template/${process.env.PROJECT_NAME}/src/EditGameAfter`)
    console.log(EditGamePrivate);
    import {CopyPageAndRender,DeletePageInPage,RenderAllData} from '../../../Editor/render/index.js'
    export default {
        name: "EditGame",
        data() {
            return {
                gameData: null,
                showStatus: false,
                publicSourceData:null,
                tabShowStatus: [],
                publicChildStatus:{
                    button:false,
                    animate:false,
                    audio:false
                },
                publicStatus: false,
                resourceData: null,
                feedbackAnimateData: null,
                tabShowLists: {
                    bgImage: false,
                    stemImg: false,
                    subTitle: false,
                    option: false,
                    option1: false,
                    option2: false,
                    option3: false,
                    option4: false,
                    option5: false,
                    option6: false,
                    option7: false,
                    option8: false,
                    option9: false,
                    option10: false
                },
                selectoptionvalue22:[
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
                    }
                ],
            }
        },
        props: ['allData'],
        methods: {
            setLock(index){
            },
            getJSON() {
                this.getResourceData(() => {
                    this.showStatus = true;
                });
                this.gameData = this.allData.sources;
                this.feedbackAnimateData = this.allData.feedbackAnimate;
                this.publicSourceData = this.allData.publicSourceData;
                this.tabShowStatus = [];
                this.gameData.forEach((item, index) => {
                    this.tabShowStatus.push({
                        show: false,
                        lock:false,
                        child: JSON.parse(JSON.stringify(this.tabShowLists))
                    })
                });
            },
            getResourceData(callback) {
                this.$http.get('/getResourceJSON', {params: {}}).then((res) => {
                    this.resourceData = res;
                    if (callback) {
                        callback();
                    }
                })
            },
            changeArr(type, index) {
                if (type === 'add') {
                    let extArr = ['x','y','width','height'];
                    function resetArr(arr) {
                        Object.values(arr).forEach((item, index) => {
                            if (Object.prototype.toString.call(item) === "[object Object]") {
                                if(Object.keys(arr)[index]==='stem'){
                                        item.show = false;
                                        item.text = '请输入文本';
                                        item.width = 960;
                                        item.x = 0;
                                        item.y = 0;
                                        item.lineHeight = 60;
                                        item.letterSpacing = 30;
                                        item.fontFamily = 'Microsoft YaHei';
                                        item.fontSize = 36;
                                        item.color = '#000000';
                                        item.textAlign = 'justify';
                                        item.strong = false;
                                        item.italic = false;
                                        item.padding = 40;
                                        item.componentName  = 'stemText';
                                }else{
                                    resetArr(item)
                                }
                            } else if (Object.prototype.toString.call(item) === '[object Array]') {
                                arr[Object.keys(arr)[index]] = arr[Object.keys(arr)[index]].splice(0,1);
                                resetArr(arr[Object.keys(arr)[index]]);
                            } else if (Object.prototype.toString.call(item) === '[object String]') {
                                if(Object.keys(arr)[index]!='componentName'){
                                    if(extArr.indexOf(Object.keys(arr)[index])>-1){
                                        arr[Object.keys(arr)[index]] = 0;
                                    }else if(Object.keys(arr)[index] === 'scale'){
                                        arr[Object.keys(arr)[index]] = 1;
                                    }else if(Object.keys(arr)[index] === 'ratio'){
                                        arr[Object.keys(arr)[index]] = 1;
                                    }else{
                                        arr[Object.keys(arr)[index]] = '';
                                    }
                                }
                            } else if (Object.prototype.toString.call(item) === '[object Number]') {
                                if(extArr.indexOf(Object.keys(arr)[index])>-1){
                                    arr[Object.keys(arr)[index]] = 0;
                                }else if(Object.keys(arr)[index] === 'scale'){
                                    arr[Object.keys(arr)[index]] = 1;
                                }else if(Object.keys(arr)[index] === 'ratio'){
                                    arr[Object.keys(arr)[index]] = 1;
                                }else{
                                    arr[Object.keys(arr)[index]] = 0;
                                }
                            }
                        })
                    }
                    let arr = JSON.parse(JSON.stringify(this.gameData[0]));
                    let numbernumber = arr.displaycontrol[0].style
                    let matrix0=arr.matrix0[0].text
                    let matrix1
                    let matrix2
                    if(numbernumber==3){
                        matrix1=this.selectoptionvalue22[0].value
                        matrix2=this.selectoptionvalue22[0].value
                    }
                    if(numbernumber==4){
                        matrix1=this.selectoptionvalue22[1].value
                        matrix2=this.selectoptionvalue22[1].value
                    }
                    if(numbernumber==5){
                        matrix1=this.selectoptionvalue22[2].value
                        matrix2=this.selectoptionvalue22[2].value
                    }
                    if(numbernumber==6){
                        matrix1=this.selectoptionvalue22[3].value
                        matrix2=this.selectoptionvalue22[3].value
                    }
                    
                    resetArr(arr);

                    arr.square.NAME.push({
                        "name": ""
                    })
                    arr.displaycontrol[0].style = numbernumber
                    arr.matrix0[0].text=matrix0
                    arr.matrix1[0].text=matrix1
                    arr.matrix2[0].text=matrix2

                    for(let i = 0;i<parseInt(numbernumber)-1;i++){
                        arr.number1[0].NAME.push({
                        "name": ""
                    })
                    }
                    for(let i = 0;i<parseInt(numbernumber)-1;i++){
                        arr.number1.push({
                    "NAME": [
                        {
                            "name": ""
                        },
                        {
                            "name": ""
                        },
                        {
                            "name": ""
                        }
                    ]
                })
                arr.option[0].lock=false
                        arr.option.push({
                    "number": "",
                    "name": "",
                    "componentName": "",
                    "x": 0,
                    "y": 0,
                    "width": 0,
                    "height": 0,
                    "lock": false,
                    "ratio": 1
                })
                    }
                

                    this.gameData.push(arr);
                    this.tabShowStatus.push({
                        show: false,
                        lock:false,
                        child: JSON.parse(JSON.stringify(this.tabShowLists))
                    });
                    CopyPageAndRender(this.gameData.length-1,arr,this.allData)
                }
                else if (type === 'copy') {
                    let data = JSON.parse(JSON.stringify(this.gameData[index]));
                    this.gameData.push(JSON.parse(JSON.stringify(this.gameData[index])));
                    this.tabShowStatus.push({
                        show: false,
                        lock:false,
                        child: JSON.parse(JSON.stringify(this.tabShowLists))
                    });
                    CopyPageAndRender(this.gameData.length-1,data,this.allData)
                }
                else if (type === 'del') {
                    if (this.gameData.length > 1) {
                        this.$confirm('此操作将删除选项, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.gameData.splice(index, 1);
                            this.tabShowStatus.splice(index, 1);
                            store.dispatch('setPageNumber',0);
                            window.stage.getChildByName('GAME').removeChildren();
                            RenderAllData(true,this.allData);
                            window.shuaxinshuaxin();
                            // DeletePageInPage(index);
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }
                }
            },
            tabShow(index, name) {
                let title = this.$refs[name + 'Title'];
                let nameTab = this.tabShowStatus[index].show;
                Object.keys(this.tabShowStatus[index].child).forEach((item, index1) => {
                    this.tabShowStatus[index].child[item] = false
                });
                if (nameTab) {
                    this.tabShowStatus[index].show = false;
                    title.className = 'el-icon-arrow-right';
                    store.dispatch('setPageNumber',-1);
                } else {
                    let GAME = window.stage.getChildByName('GAME');
                    this.tabShowStatus.forEach((item, index1) => {
                        this.tabShowStatus[index1].show = false;
                    });
                    GAME.children.forEach((item,index)=>{
                        item.visible = false
                    });
                    this.tabShowStatus[index].show = true;
                    let gameChild = GAME.getChildByName('GAME'+index);
                    gameChild.visible = true;
                    title.className = 'el-icon-arrow-down';
                    store.dispatch('setPageNumber',index);
                    window.shuaxinshuaxin();
                }
                console.log(store.state.pageNumber)
            },
            updateResourceData() {
                this.getResourceData();
            }
        },
        mounted() {
            this.getJSON();
        },
        components: {
            EditGamePublic: EditGamePublic,

            EditGamePrivate: resolve=>require([`@/template/${process.env.PROJECT_NAME}/src/EditGamePrivate`],resolve),
            EditGameBefore:resolve=>require([`@/template/${process.env.PROJECT_NAME}/src/EditGameBefore`],resolve),
            EditGameAfter:resolve=>require([`@/template/${process.env.PROJECT_NAME}/src/EditGameAfter`],resolve)
        }
    }
</script>
<style lang="scss">
    .game {
        overflow: hidden;
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
    .game-title {
        overflow: hidden;
        height: 40px;
        line-height: 40px;
        background: #555555;
        border-bottom: 1px solid #313131;
        padding-left: 15px;
        color: #fff;
        padding-right: 8px;
        i, span {
            cursor: pointer;
        }
    }

    .game-box {
        width: 100%;
        &:nth-of-type(1) {
            margin-top: 8px;
        }
        &:before, &:after {
            clear: both;
            content: '';
            display: block;
            width: 0;
            height: 0;
            visibility: hidden;
        }
    }

    .game-title-icon {
        float: right;
        font-size: 18px;
        margin: 10px 4px;
        cursor: pointer;
    }

    .game-inner {
        padding: 15px;
        padding-top: 0;
        overflow: hidden;
    }

</style>