<template>
    <div class="container">
        <div class="canvas" ref="canvas"></div>
        <EditGameCustom :allData="allData" v-if="documentStatus"></EditGameCustom>
        <img src="common/images/logo.png" class="logo" id="logo"/>
    </div>
</template>
<script>
    import {Application, Container, Sprite,Texture} from 'pixi.js';
    import {load} from '@/loader';
    import {RenderAllData,RenderPageByIndex,DeletElementByName} from '../../../Editor/render/index'
    import START from '../../../Editor/start/index.js';
    let question;
    let allData;
    export default {
        name: "start",
        data() {
            return {
                isShow: false,
                documentStatus:false,
                number: 0,
                answerStatus:[],
                answerData:[],
                option:['A','B','C','D','E','F','G','H']
            }
        },
        methods: {
            createApp() {
                return new Application({
                    width: 1920,
                    height: !window.screenRatio?1080:1440,
                    autoSize: true,
                    transparent: true //背景是否设为透明
                })
            }
        },
        components: {
            EditGameCustom:resolve=>require([`@/template/${process.env.PROJECT_NAME}/src/EditGameCustom`],resolve)
        },
        created() {
            let loading = document.getElementsByClassName('page-loading')[0];
            loading.style.display = 'block';
        },
        props:['allData'],
        destroyed() {
            PIXI.sound.stopAll();
            app.destroy();
        },
        mounted() {
            PIXI.sound.stopAll();
            let loading = document.getElementsByClassName('page-loading')[0];
            loading.style.display = 'block';


            let canvasContainer = document.getElementsByClassName('canvas')[0];
            canvasContainer.style.height = !window.screenRatio?'10.8rem':'14.4rem';

            let containerList = document.getElementsByClassName('container');

            for(let i = 0; i<containerList.length;i++){
                containerList[i].style.height = !window.screenRatio?'10.8rem':'14.4rem';
            }
            window.app = this.createApp();
            app.view.style.width = '19.2rem';
            app.view.style.height = !window.screenRatio?'10.8rem':'14.4rem';
            app.view.id = 'appCanvas';
            window.stage = app.stage;

            const self = this;
            self.$refs.canvas.appendChild(app.view);
            stage.interactive = true;
            load().then(res => {
                console.log("%c资源加载完啦✌️", "color:#FF323B;font-weight:bold;");
                this.$nextTick(()=>{
                    window.question = res.question.data;
                    question = res.question.data;
                    allData = res.question.data;
                    let startComponent = new START(question.one.start, res);
                    stage.addChild(startComponent);
                    let loading = document.getElementsByClassName('page-loading')[0];
                    loading.style.display = 'none';

                    RenderAllData(true,this.allData);
                    store.dispatch('setComplete',true)
                    this.documentStatus = true;
                    window.onresize = resize;
                    resize()
                    function resize(){
                        let container = document.querySelectorAll('.container');
                        for (let index = 0; index < container.length; index++) {
                            container[index].style.width = (window.innerWidth - 340)+'px'
                            container[index].style.height = ((window.innerWidth - 340)*(((!window.screenRatio?10.8:14.4)/19.2)))+'px'
                        }
                    }
                    window.shuaxinshuaxin = function(){
                        store.state.pageNumber
                        // for (let iii = 0; iii < self.allData.sources.length; iii++) {
                        //     if(window.stage.getChildByName('GAME').getChildByName('GAME'+iii).getChildByName('componentContainer').getChildByName('game22')){
                        //         window.stage.getChildByName('GAME').getChildByName('GAME'+iii).getChildByName('componentContainer').removeChild(window.stage.getChildByName('GAME').getChildByName('GAME'+iii).getChildByName('componentContainer').getChildByName('game22'))
                        //     }
                        //     let game2 = new PIXI.Container();
                        //     game2.name="game22"
                        //     window.stage.getChildByName('GAME').getChildByName('GAME'+iii).getChildByName('componentContainer').addChild(game2);
                        //     let LENGHT = parseFloat(self.allData.sources[iii].displaycontrol[0].style)
                        //     for (let i = 0; i < Math.pow(LENGHT,2); i++) {
                        //         let numberBtn = new Sprite.fromImage(res[self.allData.sources[iii].square.NAME[0].name].url);
                        //         numberBtn.anchor.set(.5,.5);
                        //         numberBtn.width = parseFloat(self.allData.sources[iii].square.width);
                        //         numberBtn.height = parseFloat(self.allData.sources[iii].square.height);
                        //         numberBtn.x= parseFloat(self.allData.sources[iii].square.x)+parseFloat(self.allData.sources[iii].square.width)/2+(parseFloat(self.allData.sources[iii].ranks.width)+parseFloat(self.allData.sources[iii].square.width))*(i%LENGHT)
                        //         numberBtn.y= parseFloat(self.allData.sources[iii].square.y)+parseFloat(self.allData.sources[iii].square.height)/2+(parseFloat(self.allData.sources[iii].ranks.height)+parseFloat(self.allData.sources[iii].square.height))*parseInt(i/LENGHT)
                        //         game2.addChild(numberBtn)
                        //     }    
                        // }
                        if(window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').getChildByName('game22')){
                            window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').removeChild(window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').getChildByName('game22'))
                        }
                        let game2 = new PIXI.Container();
                        game2.name="game22"
                        window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').addChild(game2);
                        let LENGHT = parseFloat(self.allData.sources[store.state.pageNumber].displaycontrol[0].style)
                        for (let i = 0; i < Math.pow(LENGHT,2); i++) {
                            let numberBtn = new Sprite.fromImage(res[self.allData.sources[store.state.pageNumber].square.NAME[0].name].url);
                            numberBtn.anchor.set(.5,.5);
                            numberBtn.width = parseFloat(self.allData.sources[store.state.pageNumber].square.width);
                            numberBtn.height = parseFloat(self.allData.sources[store.state.pageNumber].square.height);
                            numberBtn.x= parseFloat(self.allData.sources[store.state.pageNumber].square.x)+parseFloat(self.allData.sources[store.state.pageNumber].square.width)/2+(parseFloat(self.allData.sources[store.state.pageNumber].ranks.width)+parseFloat(self.allData.sources[store.state.pageNumber].square.width))*(i%LENGHT)
                            numberBtn.y= parseFloat(self.allData.sources[store.state.pageNumber].square.y)+parseFloat(self.allData.sources[store.state.pageNumber].square.height)/2+(parseFloat(self.allData.sources[store.state.pageNumber].ranks.height)+parseFloat(self.allData.sources[store.state.pageNumber].square.height))*parseInt(i/LENGHT)
                            game2.addChild(numberBtn)
                        }    
                    }
                    window.shuaxinshuaxin();
                });
            })
        }
    }
</script>
<style scoped>

    .canvas {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 19.20rem;
        height: 10.80rem;
        transform: translate(-50%, -50%);
    }

    .logo {
        position: absolute;
        z-index: 999;
        right: 0.54rem;
        top: 0.3rem;
        width: 2.52rem;
        pointer-events: none;
    }
</style>