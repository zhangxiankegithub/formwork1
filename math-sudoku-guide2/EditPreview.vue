<template>
    <div class="container">
        <div class="canvas" ref="canvas"></div>
        <EditGameCustom :allData="allData" v-if="documentStatus"></EditGameCustom>
        <!-- <img src="common/images/logo.png" class="logo" id="logo"/> -->
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
                    window.Refreshfunction = function(){
                        if(window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').getChildByName('game22')){
                            window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').removeChild(window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').getChildByName('game22'))
                        }
                        let game2 = new PIXI.Container();
                        game2.name="game22"
                        window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').addChild(game2);
                        let numbersarray=[]
                        for (let i=0;i<parseInt(self.allData.sources[store.state.pageNumber].ranks.Rows)*parseInt(self.allData.sources[store.state.pageNumber].ranks.column);i++){
                            numbersarray[i]=i+parseInt(self.allData.sources[store.state.pageNumber].ranks.start);
                        }
                        numbersarray.sort(function(){ return 0.5 - Math.random()});
                        //添加元素
                        for (let i = 0; i < parseInt(self.allData.sources[store.state.pageNumber].ranks.Rows)*parseInt(self.allData.sources[store.state.pageNumber].ranks.column); i++) {
                            let element = new Sprite.fromImage(res[self.allData.sources[store.state.pageNumber].element.name].url);
                            element.INDEX = numbersarray[i]
                            element.anchor.set(.5,.5);
                            element.width = parseFloat(self.allData.sources[store.state.pageNumber].element.width);
                            element.height = parseFloat(self.allData.sources[store.state.pageNumber].element.height);
                            element.x= 960-parseFloat(self.allData.sources[store.state.pageNumber].element.width)*parseInt(self.allData.sources[store.state.pageNumber].ranks.Rows)/2+parseFloat(self.allData.sources[store.state.pageNumber].element.width)/2+(parseFloat(self.allData.sources[store.state.pageNumber].element.width))*(i%parseInt(self.allData.sources[store.state.pageNumber].ranks.Rows))
                            element.y= 540-parseFloat(self.allData.sources[store.state.pageNumber].element.height)*parseInt(self.allData.sources[store.state.pageNumber].ranks.column)/2+parseFloat(self.allData.sources[store.state.pageNumber].element.height)/2+(parseFloat(self.allData.sources[store.state.pageNumber].element.height))*parseInt(i/parseInt(self.allData.sources[store.state.pageNumber].ranks.Rows))
                            element.interactive=false
                            element.buttonMode=true
                            game2.addChild(element)
                            
                            let number = new PIXI.Text(numbersarray[i])
                            number.anchor.set(0.5,0.5)
                            number.x=element.x
                            number.y=element.y
                            number.style.fontSize=parseInt(self.allData.sources[store.state.pageNumber].ranks.FontSize)
                            number.style.fontFamily=self.allData.sources[store.state.pageNumber].ranks.FontFamily
                            number.style.fontWeight=self.allData.sources[store.state.pageNumber].ranks.strong?'bold':""
                            number.style.fill=self.allData.sources[store.state.pageNumber].ranks.defaultcolor?self.allData.sources[store.state.pageNumber].ranks.defaultcolor:"#FFFFFF"
                            number.interactive=false
                            game2.addChild(number)
                        }      
                    }
                    window.Refreshfunction()
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