<template>
    <div class="container">
        <div class="canvas" ref="canvas"></div>
        <img src="common/images/logo.png" class="logo" id="logo"/>
    </div>
</template>

<script>

    import {Application, Container, Graphics, Sprite,Texture, ParticleContainer} from 'pixi.js';
    import {getAnimation, load, reateSprite} from '../../../loader';
    import {getParameter,AnimationFrame} from '../../../AnimateFrame.js';
    import {xesAnimate as AnimateClass} from 'xtemplate-editor'
    import {xesPreviewStart as START} from 'xtemplate-editor'
    import {RenderAllData,RenderPageByIndex} from 'xtemplate-editor'
    import {xesPreviewSubtitle as STEMTITLE} from 'xtemplate-editor'
    let question;
    let allData;
    let Refresh;
    const answer = new AnswerInfo();
    export default {
        name: "index",
        data() {
            return {
                number: 0,
            }
        },
        methods: {
            createApp() {
                return new Application({
                    width: 1920,
                    height: !window.screenRatio?1080:1440,
                    autoSize: true,
                    transparent: true, //背景是否设为透明
                    autoStart:false
                })
            }
        },
        created() {
            let loading = document.getElementsByClassName('page-loading')[0];
            loading.style.display = 'block';
        },
        // props:['allData'],
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

            //开启ticker
            let gl_fps = getParameter('gl_fps');
            let animationFrame = new AnimationFrame(gl_fps, function () {
                app.render(app.stage);
            });
            animationFrame.start();
            //重写暂停方法
            app.stop = function () {
                animationFrame.stop();
            };
            console.log("%c"+"fps:"+animationFrame.fps, "color:deeppink;font-size:24px");
            
            load().then(res => {
                console.log("%c资源加载完啦✌️", "color:#FF323B;font-weight:bold;");
                this.$nextTick(()=>{
                    window.question = res.question.data;
                    question = res.question.data;
                    allData = res.question.data;

                    store.state.testNum = question.sources.length;
                    let loading = document.getElementsByClassName('page-loading')[0];
                    loading.style.display = 'none';
                    if(this.$route.query.id==='undefined'||this.$route.query.id===undefined){
                        this.number = 0;
                    }else{
                        this.number = parseInt(this.$route.query.id);
                    }
                    let start = new START(question.one.start, res);
                    //loading接口
                    answer.loading();
                    RenderAllData(false,question);
                    store.state.pageNumber = this.number;
                    console.log(store.state.pageNumber,987)
                    
                    //数据
                    answer.initLabel(2)
                    // var answer2 = [];//每个小题的正确答案
                    // for (let i = 0; i < question.sources.length; i++) {
                    //     let daan = ""
                    //     answer2.push(daan)
                    // }
                    var testNum = question.sources.length;//总共的题数
                    for(var i=0;i<testNum;i++){
                        answer.initRightAnswer({
                            "id":i,
                            "type":0,
                            "rightAnswer":[{
                                'id':0,
                                'text':""
                            }]}
                        );
                    }

                    window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').alpha=0
                    //结束页
                    
                    let givemefivefunction
                    if(question.endAnimate.show&&question.endAnimate.animate.name){
                    givemefivefunction=function () {
                        let endContainer = new PIXI.Container();
                        window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).addChild(endContainer)
                        
                        let zhezhao = new Sprite.fromImage(res['image_zhezhao'].url);
                        endContainer.addChild(zhezhao);
                        zhezhao.x=0;
                        zhezhao.y=0;
                        zhezhao.interactive=true;

                        let finishiAnimationCon = getAnimation(question.endAnimate.animate.name);
                        let finishiAnimation = finishiAnimationCon.state.setAnimation(0, 'talk', false);
                        finishiAnimationCon.state.timeScale = 1;
                        finishiAnimationCon.x = question.endAnimate.animate.x;
                        finishiAnimationCon.y = question.endAnimate.animate.y;
                        finishiAnimationCon.scale.x = question.endAnimate.animate.scale;
                        finishiAnimationCon.scale.y = question.endAnimate.animate.scale;
                        endContainer.addChild(finishiAnimationCon);
                        let givemefivemusic
                        if(question.endAnimate.before_audio.name){
                            givemefivemusic = res[question.endAnimate.before_audio.name].sound;
                            givemefivemusic.singleInstance = true;
                            givemefivemusic.play();
                        }
                        setTimeout(function () {
                            if(window.forceSubmit!=true){
                                if(finishiAnimationCon.interactive==true){
                                    let finishiAnimation1 = finishiAnimationCon.state.setAnimation(0, 'idle', true);
                                    finishiAnimationCon.state.timeScale = 1;
                                }
                            }
                        },finishiAnimationCon.state.tracks[0].animationEnd*1000);

                        finishiAnimationCon.interactive=true;
                        finishiAnimationCon.buttonMode=true;
                        finishiAnimationCon.on("pointerdown",function () {
                            finishiAnimationCon.interactive=false;
                            let finishiAnimation2 = finishiAnimationCon.state.setAnimation(0, 'touch', false);
                            finishiAnimationCon.state.timeScale = 1;
                            if(question.endAnimate.before_audio.name){
                                givemefivemusic.pause();
                            }
                            if(question.endAnimate.after_audio.name){
                                let clickmusic = res[question.endAnimate.after_audio.name].sound;
                                clickmusic.singleInstance = true;
                                clickmusic.play();
                            }
                            setTimeout(function(){
                                if(window.forceSubmit!=true){
                                    answer.submitAnswer();
                                }
                            },finishiAnimationCon.state.tracks[0].animationEnd*1000)
                        })
                    }
                    } 
                    RenderPageByIndex(store.state.pageNumber)
                    Refresh = function(){
                        RenderPageByIndex(store.state.pageNumber)
                        window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').alpha=1

                        let containers= new PIXI.Container();
                        window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').addChild(containers);
                        //隐藏空格子正误动效
                        let rightAnimationCon
                        if(question.sources[store.state.pageNumber].feedback2[0].rightanimation[0].componentName&&question.sources[store.state.pageNumber].feedback2[0].rightanimation[0].name){
                            rightAnimationCon = window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').getChildByName(question.sources[store.state.pageNumber].feedback2[0].rightanimation[0].componentName)
                            let rightAnimation = rightAnimationCon.state.setAnimation(0, 'animation', false);
                            rightAnimationCon.state.timeScale = 0;
                            rightAnimationCon.interactive=false;
                            rightAnimationCon.alpha=0;
                        }
                        let wrongAnimationCon
                        if(question.sources[store.state.pageNumber].feedback2[0].wronganimation[0].componentName&&question.sources[store.state.pageNumber].feedback2[0].wronganimation[0].name){
                            wrongAnimationCon = window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').getChildByName(question.sources[store.state.pageNumber].feedback2[0].wronganimation[0].componentName)
                            let wrongAnimation = wrongAnimationCon.state.setAnimation(0, 'animation', false);
                            wrongAnimationCon.state.timeScale = 0;
                            wrongAnimationCon.interactive=false;
                            wrongAnimationCon.alpha=0;
                        }

                        //添加角色反馈容器
                        let jiaosecontainer= new PIXI.Container();
                        containers.addChild(jiaosecontainer);
                        
                
                        //添加题干反馈容器
                        let ruchangtimes = 0
                        let tigancontainer= new PIXI.Container();
                        containers.addChild(tigancontainer);

                        //添加数独容器
                        let game = new PIXI.Container();
                        containers.addChild(game);

                        //添加选项容器
                        let optioncontainer= new PIXI.Container();
                        containers.addChild(optioncontainer);

                        containers.setChildIndex(jiaosecontainer,containers.children.length-(5-parseInt(question.sources[store.state.pageNumber].feedback3[0].jiaose)))
                        containers.setChildIndex(tigancontainer,containers.children.length-(5-parseInt(question.sources[store.state.pageNumber].feedback3[0].tigan)))
                        containers.setChildIndex(game,containers.children.length-(5-parseInt(question.sources[store.state.pageNumber].feedback3[0].juzhen)))
                        containers.setChildIndex(optioncontainer,containers.children.length-(5-parseInt(question.sources[store.state.pageNumber].feedback3[0].xuanxiang)))

                        
                        let jiaoseAnimationCon
                        if(question.feedbackAnimate.show&&question.feedbackAnimate.name){
                            jiaoseAnimationCon = getAnimation(question.feedbackAnimate.name)
                            jiaoseAnimationCon.alpha=0
                            if(question.sources[store.state.pageNumber].feedback0[0].defaultanimation&&question.sources[store.state.pageNumber].feedback0[0].defaultshow){
                                let jiaoseAnimation1 = jiaoseAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback0[0].defaultanimation, true);
                                jiaoseAnimationCon.state.timeScale = 1;
                                jiaoseAnimationCon.interactive=false;
                                jiaoseAnimationCon.x = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].x)
                                jiaoseAnimationCon.y = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].y)
                                jiaoseAnimationCon.scale.x = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].scale)
                                jiaoseAnimationCon.scale.y = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].scale)
                                jiaosecontainer.addChild(jiaoseAnimationCon)
                                jiaoseAnimationCon.buttonMode=true
                                jiaoseAnimationCon.alpha=1
                            }  
                        }

                        let tiganAnimationCon
                        if(question.sources[store.state.pageNumber].feedback1[0].tigananimation[0].show&&question.sources[store.state.pageNumber].feedback1[0].tigananimation[0].componentName&&question.sources[store.state.pageNumber].feedback1[0].tigananimation[0].name){
                            tiganAnimationCon = window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').getChildByName(question.sources[store.state.pageNumber].feedback1[0].tigananimation[0].componentName)
                            tigancontainer.addChild(tiganAnimationCon)
                            tiganAnimationCon.alpha=0;
                            tiganAnimationCon.interactive=false;
                            if(question.sources[store.state.pageNumber].feedback1[0].ruchananimation&&question.sources[store.state.pageNumber].feedback1[0].ruchanshow&&question.sources[store.state.pageNumber].feedback0[0].ruchangaudio.name||question.sources[store.state.pageNumber].feedback1[0].ruchananimation&&question.sources[store.state.pageNumber].feedback1[0].ruchanshow&&question.sources[store.state.pageNumber].feedback0[0].ruchangaudio.name==""){
                                let tiganAnimation0 = tiganAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback1[0].ruchananimation, false);
                                tiganAnimationCon.state.timeScale = 1;
                                tiganAnimationCon.alpha=1;
                                ruchangtimes = tiganAnimationCon.state.tracks[0].animationEnd*1000

                                if(question.sources[store.state.pageNumber].feedback0[0].ruchangaudio.name){
                                    let ruchangaudio = res[question.sources[store.state.pageNumber].feedback0[0].ruchangaudio.name].sound;
                                    ruchangaudio.singleInstance = true;
                                    ruchangaudio.play();

                                    if(ruchangtimes<ruchangaudio.duration*1000){
                                        ruchangtimes=ruchangaudio.duration*1000
                                    }
                                    if(question.feedbackAnimate.show&&question.feedbackAnimate.name&&question.sources[store.state.pageNumber].feedback0[0].dutishuohuaanimation&&question.sources[store.state.pageNumber].feedback0[0].dutishuohuashow){
                                        let jiaoseAnimation2 = jiaoseAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback0[0].dutishuohuaanimation, true);
                                        jiaoseAnimationCon.state.timeScale = 1;
                                        jiaoseAnimationCon.alpha=1
                                    }
                                }

                                setTimeout(function(){
                                    tiganAnimationCon.alpha=0
                                },ruchangtimes)
                                
                            }
                            if(question.sources[store.state.pageNumber].feedback1[0].defaultanimation&&question.sources[store.state.pageNumber].feedback1[0].defaultshow){
                                if(question.sources[store.state.pageNumber].feedback1[0].ruchananimation&&question.sources[store.state.pageNumber].feedback1[0].ruchanshow&&question.sources[store.state.pageNumber].feedback0[0].ruchangaudio.name||question.sources[store.state.pageNumber].feedback1[0].ruchananimation&&question.sources[store.state.pageNumber].feedback1[0].ruchanshow&&question.sources[store.state.pageNumber].feedback0[0].ruchangaudio.name==""){
                                    setTimeout(function(){
                                        tiganAnimationCon.alpha=1
                                        let tiganAnimation1 = tiganAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback1[0].defaultanimation, true);
                                        tiganAnimationCon.state.timeScale = 1; 
                                    },ruchangtimes)
                                }else{
                                    let tiganAnimation1 = tiganAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback1[0].defaultanimation, true);
                                    tiganAnimationCon.state.timeScale = 1;
                                    tiganAnimationCon.alpha=1;
                                }
                                
                            }
                        }
                    
                        
                        if(question.sources[store.state.pageNumber].line[0].show){
                            window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').getChildByName(question.sources[store.state.pageNumber].line[0].componentName).alpha=0
                        }

                        //矩阵变数组
                        let numberArr1 = question.sources[store.state.pageNumber].matrix0[0].text.replace(/\s*/g,"").replace(/，/g,",").split(",")
                        let numberArr2 = question.sources[store.state.pageNumber].matrix1[0].text.replace(/\s*/g,"").replace(/，/g,",").split(",")
                        let numberArr3 = question.sources[store.state.pageNumber].matrix2[0].text.replace(/\s*/g,"").replace(/，/g,",").split(",")

                        

                        //正确答案数组
                        let rightArr = []
                        for (let i = 0; i < numberArr2.length; i++) {
                            rightArr.push(numberArr2[i])             
                        }

                        //几×几的数组
                        let LENGHT = parseFloat(question.sources[store.state.pageNumber].displaycontrol[0].style)
                        
                        //矩阵分组有错误提示
                        let zonggeshu1 = 0
                        let shuzilenghts2 = [0,0,0,0,0,0,0,0,0]
                        for (let i = 0; i < numberArr2.length; i++) {
                            zonggeshu1++
                            if(numberArr1[i]=="1"){
                                shuzilenghts2[0]++
                            }
                            if(numberArr1[i]=="2"){
                                shuzilenghts2[1]++
                            }
                            if(numberArr1[i]=="3"){
                                shuzilenghts2[2]++
                            }
                            if(numberArr1[i]=="4"){
                                shuzilenghts2[3]++
                            }
                            if(numberArr1[i]=="5"){
                                shuzilenghts2[4]++
                            }
                            if(numberArr1[i]=="6"){
                                shuzilenghts2[5]++
                            }
                            if(numberArr1[i]=="7"){
                                shuzilenghts2[6]++
                            }
                            if(numberArr1[i]=="8"){
                                shuzilenghts2[7]++
                            }
                            if(numberArr1[i]=="9"){
                                shuzilenghts2[8]++
                            }
                        }                                                                                                                                                         
                        let geshu = 0
                        for (let i = 0; i < LENGHT; i++) { 
                            if(shuzilenghts2[i]!=LENGHT){
                                geshu++
                            }
                        }     
                        if(geshu!=0||zonggeshu1!=LENGHT*LENGHT){                                                                                                                                               
                            alert("矩阵分组有误");    
                        }   
                        //矩阵分组有错误提示                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                                                                   
                        //矩阵赋值提示  
                        let ischongfu = 0 //空格数
                        let fuzhibaocuofunction = function(){
                            let problemArr=[]
                            //把一个数组分成多个数组
                            function group(array, subGroupLength) {
                                let index = 0;
                                let newArray = [];
                                while(index < array.length) {
                                    newArray.push(array.slice(index, index += subGroupLength));
                                }
                                return newArray;   
                            }
                            problemArr = group(numberArr2, LENGHT);
                            //计算是否有唯一值，有的话填入
                            for (let i = 0; i < numberArr2.length; i++) {
                                if(numberArr2[i]!="0"){
                                     //push块区域有的数  
                                    let problemArr22 = []
                                    for (let ii = 0; ii < numberArr2.length; ii++) {
                                        if(numberArr1[ii]==numberArr1[i]){
                                            problemArr22.push(numberArr2[ii])
                                        } 
                                    }
                                    //范围里所有的数
                                    let newnumberArr11 = [] 
                                    let newnumberArr22 = [] 
                                    let newnumberArr33 = [] 
                                    for (let j = 0; j < problemArr.length; j++) {
                                        //push行域有的数
                                        if(newnumberArr11.indexOf(problemArr[parseInt(i/LENGHT)][j])==-1){
                                            newnumberArr11.push(problemArr[parseInt(i/LENGHT)][j])
                                        }else{
                                            if(problemArr[parseInt(i/LENGHT)][j]!="0"){
                                                ischongfu++
                                            }
                                        }
                                        //push列域有的数
                                        if(newnumberArr22.indexOf(problemArr[j][parseInt(i%LENGHT)])==-1){
                                            newnumberArr22.push(problemArr[j][parseInt(i%LENGHT)])
                                        }else{
                                            if(problemArr[j][parseInt(i%LENGHT)]!="0"){
                                                ischongfu++
                                            }
                                        }
                                        //push块区域有的数                               
                                        if(newnumberArr33.indexOf(problemArr22[j])==-1){
                                            newnumberArr33.push(problemArr22[j])
                                        }else{
                                            if(problemArr22[j]!="0"){
                                                ischongfu++
                                            }
                                        }
                                    }
                                }
                            }
                        } 
                        fuzhibaocuofunction();                                     
                        let zonggeshu2 = 0
                        for (let i = 0; i < numberArr2.length; i++) {                                                                                                                                                                                                                                                                                                                                                                                                                            
                            zonggeshu2++                                          
                        }
                        if(zonggeshu2!=LENGHT*LENGHT||ischongfu!=0){                            
                            alert("矩阵赋值有误");                                                                                                                                                                                                                                        
                        }
                        //矩阵赋值提示

                        //空值优先级错误提示
                        let kongzhi1 = 0
                        let kongzhi2 = 0
                        let zonggeshu3 = 0
                        let numberArr4=numberArr3.map(Number)
                        for (let i = 0; i < numberArr2.length; i++) {
                            zonggeshu3++                               
                            if(numberArr2[i]=="0"){
                                kongzhi1++
                            }
                            if(numberArr3[i]!="0"){
                                kongzhi2++
                            }
                        }
                        if(kongzhi1!=kongzhi2||zonggeshu3!=LENGHT*LENGHT){
                            alert("空值难易度有误");
                        }
                        function arrange(source) {
                            var t;
                            var ta;
                            var r = [];

                            source.forEach(function(v) {
                                if (t === v) {
                                    ta.push(t);
                                    t++;
                                    return;
                                }

                                ta = [v];
                                t = v + 1;
                                r.push(ta);
                            });

                            return r;
                        }
                        var min;
                        for(var i=0; i<numberArr4.length; i++){
                            for(var j=i; j<numberArr4.length;j++){
                                if(numberArr4[i]>numberArr4[j]){
                                min=numberArr4[j];
                                numberArr4[j]=numberArr4[i];
                                numberArr4[i]=min;
                                }
                            }
                        }
                        if(arrange(numberArr4).length!=zonggeshu3-kongzhi2){
                            alert("空值难易度配置有误");
                        }
                        //空值优先级错误提示
                        

                        //三维能确定唯一值的
                        let problemArr=[]//矩阵转换为二维数组
                        var shuaxin1 = function(){
                            //把一个数组分成多个数组
                            function group(array, subGroupLength) {
                                let index = 0;
                                let newArray = [];
                                while(index < array.length) {
                                    newArray.push(array.slice(index, index += subGroupLength));
                                }
                                return newArray;   
                            }
                            problemArr = group(rightArr, LENGHT);

                            let numberkong = 0 //空格数
                            //计算是否有唯一值，有的话填入
                            for (let i = 0; i < rightArr.length; i++) {
                                if(rightArr[i]=="0"){
                                    numberkong++
                                     //push块区域有的数  
                                    let problemArr2 = []
                                    for (let ii = 0; ii < rightArr.length; ii++) {
                                        if(numberArr1[ii]==numberArr1[i]){
                                            problemArr2.push(rightArr[ii])
                                        } 
                                    }
                                    //范围里所有的数
                                    let newnumberArr = [] 
                                    for (let j = 0; j < problemArr.length; j++) {
                                        //push行域有的数
                                        if(newnumberArr.indexOf(problemArr[parseInt(i/LENGHT)][j])==-1){
                                            newnumberArr.push(problemArr[parseInt(i/LENGHT)][j])
                                        }
                                        //push列域有的数
                                        if(newnumberArr.indexOf(problemArr[j][parseInt(i%LENGHT)])==-1){
                                            newnumberArr.push(problemArr[j][parseInt(i%LENGHT)])
                                        }
                                        //push块区域有的数                               
                                        if(newnumberArr.indexOf(problemArr2[j])==-1){
                                            newnumberArr.push(problemArr2[j])
                                        }
                                    }
                                    if(newnumberArr.indexOf("0")!=-1){
                                        newnumberArr.splice(newnumberArr.indexOf("0"), 1);
                                    }
                                    if(newnumberArr.length<LENGHT){
                                        let numberfill2=0
                                        let iii2 = null
                                        for (let iii = 1; iii <= LENGHT; iii++) {
                                            if(newnumberArr.indexOf(iii.toString())==-1){
                                                numberfill2++
                                                iii2=iii
                                            }
                                        }
                                        if(numberfill2==1){
                                            rightArr[i]=iii2.toString()  
                                            numberfill2=0;
                                            iii2 = null;
                                            if(numberkong!=0){
                                                shuaxin1();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        shuaxin1();

                        //每个空格已有数字
                        var zongarr=[];
                        var shuaxin2 = function(){
                            zongarr=[];
                            //把一个数组分成多个数组
                            function group(array, subGroupLength) {
                                let index = 0;
                                let newArray = [];
                                while(index < array.length) {
                                    newArray.push(array.slice(index, index += subGroupLength));
                                }
                                return newArray;   
                            }
                            let problemArr = group(rightArr, LENGHT);

                            let numberkong = 0 //空格数
                            for (let i = 0; i < rightArr.length; i++) {
                                if(rightArr[i]==0){
                                    numberkong++
                                }

                                //push块区域有的数  
                                let problemArr2 = []
                                for (let ii = 0; ii < rightArr.length; ii++) {
                                    if(numberArr1[ii]==numberArr1[i]){
                                        problemArr2.push(rightArr[ii])
                                    } 
                                }
                                //范围里所有的数
                                let newnumberArr = [] 
                                for (let j = 0; j < problemArr.length; j++) {
                                    //push行域有的数
                                    if(newnumberArr.indexOf(problemArr[parseInt(i/LENGHT)][j])==-1){
                                        newnumberArr.push(problemArr[parseInt(i/LENGHT)][j])
                                    }
                                    //push列域有的数
                                    if(newnumberArr.indexOf(problemArr[j][parseInt(i%LENGHT)])==-1){
                                        newnumberArr.push(problemArr[j][parseInt(i%LENGHT)])
                                    }
                                    //push块区域有的数                               
                                    if(newnumberArr.indexOf(problemArr2[j])==-1){
                                        newnumberArr.push(problemArr2[j])
                                    }
                                }
                                if(newnumberArr.indexOf("0")!=-1){
                                    newnumberArr.splice(newnumberArr.indexOf("0"), 1); 
                                }
                                zongarr.push(newnumberArr)
                            }
                        }
                        shuaxin2();

                        //块区域id
                        let arrs = []
                        var shuaxin3 = function(){     
                            for (let j = 0; j < LENGHT; j++) {
                                   let arr = []
                                   arrs.push(arr)
                                }
                            for (let i = 0; i < rightArr.length; i++) {
                                if(numberArr1[i]=="1"){
                                    arrs[0].push(i)
                                }
                                if(numberArr1[i]=="2"){
                                    arrs[1].push(i)
                                }
                                if(numberArr1[i]=="3"){
                                    arrs[2].push(i)
                                }
                                if(numberArr1[i]=="4"){
                                    arrs[3].push(i)
                                }
                                if(numberArr1[i]=="5"){
                                    arrs[4].push(i)
                                }
                                if(numberArr1[i]=="6"){
                                    arrs[5].push(i)
                                }
                                if(numberArr1[i]=="7"){
                                    arrs[6].push(i)
                                }
                                if(numberArr1[i]=="8"){
                                    arrs[7].push(i)
                                }
                                if(numberArr1[i]=="9"){
                                    arrs[8].push(i)
                                }
                            }
                        }
                        shuaxin3();
                        
                        //行列排除法填入确定有唯一值的
                        console.log(zongarr,arrs,123456)
                        var shuaxin4 = function(){ 
                            let shuzilenghts = [0,0,0,0,0,0,0,0,0]
                            for (let i = 0; i < LENGHT; i++) {
                                shuzilenghts = [0,0,0,0,0,0,0,0,0]
                                for (let j = 0; j < LENGHT; j++) {
                                    if(zongarr[arrs[i][j]].indexOf("1")!=-1){
                                        shuzilenghts[0]++
                                    }
                                }
                                for (let j = 0; j < LENGHT; j++) {
                                    if(zongarr[arrs[i][j]].indexOf("2")!=-1){
                                        shuzilenghts[1]++
                                    }
                                }
                                for (let j = 0; j < LENGHT; j++) {
                                    if(zongarr[arrs[i][j]].indexOf("3")!=-1){
                                        shuzilenghts[2]++
                                    }
                                }
                                for (let j = 0; j < LENGHT; j++) {
                                    if(zongarr[arrs[i][j]].indexOf("4")!=-1){
                                        shuzilenghts[3]++
                                    }
                                }
                                for (let j = 0; j < LENGHT; j++) {
                                    if(zongarr[arrs[i][j]].indexOf("5")!=-1){
                                        shuzilenghts[4]++
                                    }
                                }
                                for (let j = 0; j < LENGHT; j++) {
                                    if(zongarr[arrs[i][j]].indexOf("6")!=-1){
                                        shuzilenghts[5]++
                                    }
                                }
                                for (let j = 0; j < LENGHT; j++) {
                                    if(zongarr[arrs[i][j]].indexOf("7")!=-1){
                                        shuzilenghts[6]++
                                    }
                                }
                                for (let j = 0; j < LENGHT; j++) {
                                    if(zongarr[arrs[i][j]].indexOf("8")!=-1){
                                        shuzilenghts[7]++
                                    }
                                }
                                for (let j = 0; j < LENGHT; j++) {
                                    if(zongarr[arrs[i][j]].indexOf("9")!=-1){
                                        shuzilenghts[8]++
                                    }
                                }
                                if(shuzilenghts.indexOf(LENGHT-1)!=-1){
                                    for (let j = 0; j < LENGHT; j++) {
                                        if(zongarr[arrs[i][j]].indexOf((shuzilenghts.indexOf(LENGHT-1)+1).toString())==-1){
                                            if(rightArr[arrs[i][j]]==0){
                                                rightArr[arrs[i][j]] = (shuzilenghts.indexOf(LENGHT-1)+1).toString()
                                            }
                                        }
                                    }
                                }
                                shuaxin1()
                                shuaxin2()
                            }

                            shuzilenghts = [0,0,0,0,0,0,0,0,0]
                            for (let i = 0; i < LENGHT; i++) {
                                shuzilenghts = [0,0,0,0,0,0,0,0,0]
                                for (let j = 0; j < LENGHT; j++) {
                                    if(zongarr[arrs[i][j]].indexOf("1")!=-1){
                                        shuzilenghts[0]++
                                    }
                                }
                                for (let j = 0; j < LENGHT; j++) {
                                    if(zongarr[arrs[i][j]].indexOf("2")!=-1){
                                        shuzilenghts[1]++
                                    }
                                }
                                for (let j = 0; j < LENGHT; j++) {
                                    if(zongarr[arrs[i][j]].indexOf("3")!=-1){
                                        shuzilenghts[2]++
                                    }
                                }
                                for (let j = 0; j < LENGHT; j++) {
                                    if(zongarr[arrs[i][j]].indexOf("4")!=-1){
                                        shuzilenghts[3]++
                                    }
                                }
                                for (let j = 0; j < LENGHT; j++) {
                                    if(zongarr[arrs[i][j]].indexOf("5")!=-1){
                                        shuzilenghts[4]++
                                    }
                                }
                                for (let j = 0; j < LENGHT; j++) {
                                    if(zongarr[arrs[i][j]].indexOf("6")!=-1){
                                        shuzilenghts[5]++
                                    }
                                }
                                for (let j = 0; j < LENGHT; j++) {
                                    if(zongarr[arrs[i][j]].indexOf("7")!=-1){
                                        shuzilenghts[6]++
                                    }
                                }
                                for (let j = 0; j < LENGHT; j++) {
                                    if(zongarr[arrs[i][j]].indexOf("8")!=-1){
                                        shuzilenghts[7]++
                                    }
                                }
                                for (let j = 0; j < LENGHT; j++) {
                                    if(zongarr[arrs[i][j]].indexOf("9")!=-1){
                                        shuzilenghts[8]++
                                    }
                                }
                                if(shuzilenghts.indexOf(LENGHT-2)!=-1){
                                    for (let j = 0; j < LENGHT; j++) {
                                        if(zongarr[arrs[i][j]].indexOf((shuzilenghts.indexOf(LENGHT-2)+1).toString())==-1){
                                            if(rightArr[arrs[i][j]]==0){
                                                rightArr[arrs[i][j]] = (shuzilenghts.indexOf(LENGHT-2)+1).toString()
                                            }
                                        }
                                    }
                                }
                                shuaxin1()
                                shuaxin2()
                            }     
                        }
                        shuaxin4();

                        //难度系数较高提示
                        let numberkong2=0 
                        for (let i = 0; i < rightArr.length; i++) {
                            if(rightArr[i]==0){
                                numberkong2++
                            }
                        }
                        if(numberkong2!=0){
                            alert("此题难度系数较高，程序无法算出答案");
                        }
                        //难度系数较高提示

                        //演算结果是否正确
                        let ischongfu2 = 0 //空格数
                        let fuzhibaocuofunction2 = function(){
                            let problemArr=[]
                            //把一个数组分成多个数组
                            function group(array, subGroupLength) {
                                let index = 0;
                                let newArray = [];
                                while(index < array.length) {
                                    newArray.push(array.slice(index, index += subGroupLength));
                                }
                                return newArray;   
                            }
                            problemArr = group(rightArr, LENGHT);
                            //计算是否有唯一值，有的话填入
                            for (let i = 0; i < numberArr2.length; i++) {
                                if(rightArr[i]!="0"){
                                     //push块区域有的数  
                                    let problemArr22 = []
                                    for (let ii = 0; ii < numberArr2.length; ii++) {
                                        if(numberArr1[ii]==numberArr1[i]){
                                            problemArr22.push(rightArr[ii])
                                        } 
                                    }
                                    //范围里所有的数
                                    let newnumberArr11 = [] 
                                    let newnumberArr22 = [] 
                                    let newnumberArr33 = [] 
                                    for (let j = 0; j < problemArr.length; j++) {
                                        //push行域有的数
                                        if(newnumberArr11.indexOf(problemArr[parseInt(i/LENGHT)][j])==-1){
                                            newnumberArr11.push(problemArr[parseInt(i/LENGHT)][j])
                                        }else{
                                            if(problemArr[parseInt(i/LENGHT)][j]!="0"){
                                                ischongfu2++
                                            }
                                        }
                                        //push列域有的数
                                        if(newnumberArr22.indexOf(problemArr[j][parseInt(i%LENGHT)])==-1){
                                            newnumberArr22.push(problemArr[j][parseInt(i%LENGHT)])
                                        }else{
                                            if(problemArr[j][parseInt(i%LENGHT)]!="0"){
                                                ischongfu2++
                                            }
                                        }
                                        //push块区域有的数                               
                                        if(newnumberArr33.indexOf(problemArr22[j])==-1){
                                            newnumberArr33.push(problemArr22[j])
                                        }else{
                                            if(problemArr22[j]!="0"){
                                                ischongfu2++
                                            }
                                        }
                                    }
                                }
                            }
                        } 
                        fuzhibaocuofunction2();
                        if(ischongfu2!=0){                            
                            alert("此题计算结果有误");                                                                                                                                                                                                                                        
                        }
                        //演算结果是否正确

                        for (let i = 0; i < LENGHT; i++) {
                            stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').getChildByName('option'+i).alpha=0;
                        }


                        let INDEX2 = null;
                        let numbersBtn = [];
                        //做题提示
                        let helpAnimationCon
                        let helpaudio
                        if(question.sources[store.state.pageNumber].feedback4[0].helpaudio.name){
                            helpaudio = res[question.sources[store.state.pageNumber].feedback4[0].helpaudio.name].sound;
                            helpaudio.singleInstance = true;
                        }
                        let helpwidth
                        let helpheight
                        if(question.help.show&&question.help.name){
                            helpAnimationCon = getAnimation(question.help.name);
                            let helpAnimation = helpAnimationCon.state.setAnimation(0, 'animation', false);
                            helpAnimationCon.state.timeScale = 1;
                            helpAnimationCon.x = question.sources[store.state.pageNumber].feedback4[0].helpshow[0].x;
                            helpAnimationCon.y = question.sources[store.state.pageNumber].feedback4[0].helpshow[0].y;
                            helpAnimationCon.scale.x = question.sources[store.state.pageNumber].feedback4[0].helpshow[0].scale;
                            helpAnimationCon.scale.y = question.sources[store.state.pageNumber].feedback4[0].helpshow[0].scale;
                            helpwidth = parseInt(helpAnimationCon.width);
                            helpheight = parseInt(helpAnimationCon.height);
                            helpAnimationCon.interactive=false;
                            helpAnimationCon.buttonMode=true;
                            game.addChild(helpAnimationCon);

                            helpAnimationCon.on("pointerover",function(){
                                helpAnimationCon.width = parseInt(helpwidth)*1.1;
                                helpAnimationCon.height = parseInt(helpheight)*1.1
                                
                            })

                            helpAnimationCon.on("pointerout",function(){
                                helpAnimationCon.width = parseInt(helpwidth)*1;
                                helpAnimationCon.height = parseInt(helpheight)*1

                            })

                            let tishimusic = false;
                            let cishu=0;
                            helpAnimationCon.on("pointerdown",function(){
                                if(question.sources[store.state.pageNumber].feedback4[0].helpaudio.name){
                                    if(tishimusic==false){
                                        tishimusic=true;
                                        let helpAnimation2 = helpAnimationCon.state.setAnimation(0, 'music', true);
                                        helpAnimationCon.state.timeScale = 1;
                                        if(cishu==0){
                                            helpaudio.speed = 1;
                                            let sound0=helpaudio.play();
                                            cishu=1;
                                            sound0.on("end",function () {
                                                tishimusic=false;
                                                cishu=0;
                                                let helpAnimation3 = helpAnimationCon.state.setAnimation(0, 'animation', false);
                                                helpAnimationCon.state.timeScale = 0;
                                            })
                                        }else if(cishu==1) {
                                            // tishi.resume();
                                            helpaudio.speed = 1;
                                        }
                                    }else{
                                        tishimusic=false;
                                        helpaudio.speed = 0;
                                        let helpAnimation2 = helpAnimationCon.state.setAnimation(0, 'music', true);
                                        helpAnimationCon.state.timeScale = 0;
                                    }
                                }
                                if(tishimusic==true){
                                    if(INDEX2!=null){
                                        numbersBtn[INDEX2].texture=res[question.sources[store.state.pageNumber].square.NAME[0].name].texture
                                        numbersBtn[INDEX2].alpha=1
                                    }
                                    let i = 1
                                    while(i<numberArr2.length){
                                        if(numberArr2[numberArr3.indexOf(i.toString())]=="0"){
                                            numbersBtn[numberArr3.indexOf(i.toString())].texture=res[question.sources[store.state.pageNumber].square.NAME[1].name].texture;
                                            INDEX2=numberArr3.indexOf(i.toString());
                                            return
                                        }
                                        i++
                                    }
                                }
                            })
                        }
                        
                                
                        setTimeout(function(){
                            if(window.forceSubmit!=true){
                                helpAnimationCon.interactive=true;
                                //阿秋提示
                                let tishiaudio = null
                                let tishiaudiofunction = null
                                let makeTipsSettimeout
                                let tishing = false
                                let makeTips = function(){
                                    makeTipsSettimeout = setInterval(function(){
                                        if(window.forceSubmit==true){
                                            clearInterval(makeTipsSettimeout)
                                        }
                                        if(window.forceSubmit!=true){
                                            if(INDEX2!=null){
                                                numbersBtn[INDEX2].texture=res[question.sources[store.state.pageNumber].square.NAME[0].name].texture
                                                numbersBtn[INDEX2].alpha=1
                                            }
                                            let i = 1
                                            while(i<numberArr2.length){
                                                if(numberArr2[numberArr3.indexOf(i.toString())]=="0"){
                                                    numbersBtn[numberArr3.indexOf(i.toString())].texture=res[question.sources[store.state.pageNumber].square.NAME[1].name].texture;
                                                    INDEX2=numberArr3.indexOf(i.toString());

                                                    if(question.sources[store.state.pageNumber].feedback0[0].tishiaudio.name){
                                                        tishiaudio = res[question.sources[store.state.pageNumber].feedback0[0].tishiaudio.name].sound;
                                                        tishiaudio.singleInstance = true;  
                                                        tishiaudio.play();
                                                        tishiaudio.speed = 1;
                                                        tishing=true
                                                        if(question.sources[store.state.pageNumber].feedback0[0].timuaudio.name){
                                                            clearTimeout(dutisetTimeout)
                                                            if(timuaudio!=null){
                                                                timuaudio.pause();
                                                            }
                                                        }
                                                        
                                                        if(wrongaudio!=null){
                                                            wrongaudio.pause();
                                                        }
                                                        if(wrongaudio2!=null){
                                                            wrongaudio2.pause();
                                                        }
                                                        if(rightaudio!=null){
                                                            rightaudio.pause();
                                                        }
                                                        if(smallrightaudio!=null){
                                                            smallrightaudio.pause();
                                                        }

                                                        if(question.sources[store.state.pageNumber].feedback0[0].dutishuohuaanimation&&question.sources[store.state.pageNumber].feedback0[0].dutishuohuashow&&question.feedbackAnimate.show&&question.feedbackAnimate.name){
                                                            let jiaoseAnimation2 = jiaoseAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback0[0].dutishuohuaanimation, true);
                                                            jiaoseAnimationCon.state.timeScale = 1;
                                                            jiaoseAnimationCon.alpha=1
                                                            jiaoseAnimationCon.interactive=false;
                                                        } 
                                                        tishiaudiofunction = setTimeout(function(){
                                                            if(question.sources[store.state.pageNumber].feedback0[0].dutishuohuaanimation&&question.sources[store.state.pageNumber].feedback0[0].dutishuohuashow&&question.feedbackAnimate.show&&question.feedbackAnimate.name){
                                                                if(question.sources[store.state.pageNumber].feedback0[0].defaultanimation&&question.sources[store.state.pageNumber].feedback0[0].defaultshow&&question.feedbackAnimate.show&&question.feedbackAnimate.name){                                                
                                                                    let jiaoseAnimation3 = jiaoseAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback0[0].defaultanimation, true);
                                                                    jiaoseAnimationCon.state.timeScale = 1;
                                                                    jiaoseAnimationCon.interactive=true;
                                                                    jiaoseAnimationCon.alpha=1
                                                                } 
                                                            }
                                                            tishing=false
                                                        },tishiaudio.duration*1000)
                                                    } 
                                                    return
                                                }
                                                i++
                                            }  
                                        }                              
                                    },parseInt(question.feedbackAnimate.times)*1000)
                                }
                                //阿秋提示


                                if(question.sources[store.state.pageNumber].line[0].show){
                                    window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').getChildByName(question.sources[store.state.pageNumber].line[0].componentName).alpha=1
                                    game.addChild(window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').getChildByName(question.sources[store.state.pageNumber].line[0].componentName))
                                }
                                //读题音频
                                let dutisetTimeout
                                let timuaudio = null
                                let dutifunction = function(){
                                    if(question.sources[store.state.pageNumber].feedback0[0].timuaudio.name){
                                        if(tishiaudio!=null){
                                            clearTimeout(tishiaudiofunction)
                                            tishiaudio.pause();
                                        }
                                        if(rightaudio!=null){
                                            rightaudio.pause();
                                        }
                                        if(smallrightaudio!=null){
                                            smallrightaudio.pause();
                                        }
                                        
                                        timuaudio = res[question.sources[store.state.pageNumber].feedback0[0].timuaudio.name].sound;
                                        timuaudio.singleInstance = true;
                                        timuaudio.play();
                                        makeTips();//提示倒计时
                                        dutisetTimeout = setTimeout(function(){
                                            if(jiaosecontainer.children.length>0){
                                                if(question.sources[store.state.pageNumber].feedback0[0].defaultanimation&&question.sources[store.state.pageNumber].feedback0[0].defaultshow&&question.feedbackAnimate.show&&question.feedbackAnimate.name){
                                                    let jiaoseAnimation1 = jiaoseAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback0[0].defaultanimation, true);
                                                    jiaoseAnimationCon.state.timeScale = 1;
                                                    jiaoseAnimationCon.interactive=true;
                                                    jiaoseAnimationCon.alpha=1
                                                }
                                            }
                                        },timuaudio.duration*1000)
                                    }else{
                                        if(question.feedbackAnimate.show&&question.feedbackAnimate.name){
                                            if(question.sources[store.state.pageNumber].feedback0[0].defaultanimation&&question.sources[store.state.pageNumber].feedback0[0].defaultshow){
                                                let jiaoseAnimation1 = jiaoseAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback0[0].defaultanimation, true);
                                                jiaoseAnimationCon.state.timeScale = 1;
                                                jiaoseAnimationCon.interactive=true;
                                                jiaoseAnimationCon.alpha=1
                                            }
                                        }
                                    }
                                }
                                let dutifunction2 = function(){
                                    if(question.sources[store.state.pageNumber].feedback0[0].timuaudio.name){
                                        if(tishiaudio!=null){
                                            clearTimeout(tishiaudiofunction)
                                            tishiaudio.pause();
                                        }
                                        if(rightaudio!=null){
                                            rightaudio.pause();
                                        }
                                        if(smallrightaudio!=null){
                                            smallrightaudio.pause();
                                        }
                                        
                                        timuaudio = res[question.sources[store.state.pageNumber].feedback0[0].timuaudio.name].sound;
                                        timuaudio.singleInstance = true;
                                        timuaudio.play();
                                        dutisetTimeout = setTimeout(function(){
                                            if(jiaosecontainer.children.length>0){
                                                if(question.sources[store.state.pageNumber].feedback0[0].defaultanimation&&question.sources[store.state.pageNumber].feedback0[0].defaultshow&&question.feedbackAnimate.show&&question.feedbackAnimate.name){
                                                    let jiaoseAnimation1 = jiaoseAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback0[0].defaultanimation, true);
                                                    jiaoseAnimationCon.state.timeScale = 1;
                                                    jiaoseAnimationCon.interactive=true;
                                                    jiaoseAnimationCon.alpha=1
                                                }
                                            }
                                        },timuaudio.duration*1000)
                                    }else{
                                        if(question.feedbackAnimate.show&&question.feedbackAnimate.name){
                                            if(question.sources[store.state.pageNumber].feedback0[0].defaultanimation&&question.sources[store.state.pageNumber].feedback0[0].defaultshow){
                                                jiaoseAnimationCon.interactive=true;
                                            }
                                        }
                                    }
                                }
                                //读题动画
                                let dutianimationfunction = function(){
                                    let jiaoseAnimation1 = jiaoseAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback0[0].dutishuohuaanimation, true);
                                    jiaoseAnimationCon.state.timeScale = 1;
                                    jiaoseAnimationCon.interactive=false;
                                    jiaoseAnimationCon.x = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].x)
                                    jiaoseAnimationCon.y = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].y)
                                    jiaoseAnimationCon.scale.x = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].scale)
                                    jiaoseAnimationCon.scale.y = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].scale)
                                    jiaosecontainer.addChild(jiaoseAnimationCon)
                                    jiaoseAnimationCon.alpha=1
                                }

                                if(question.feedbackAnimate.show&&question.feedbackAnimate.name){
                                    if(question.sources[store.state.pageNumber].feedback0[0].defaultanimation&&question.sources[store.state.pageNumber].feedback0[0].defaultshow){
                                        jiaoseAnimationCon.on("pointerdown",function(){
                                            if(jiaoseAnimationCon.interactive==true){
                                                jiaoseAnimationCon.interactive=false
                                                let i = 1
                                                while(i<numberArr2.length){
                                                    if(numberArr2[numberArr3.indexOf(i.toString())]=="0"){
                                                        if(question.sources[store.state.pageNumber].feedback0[0].timuaudio.name){
                                                            if(wrongaudio!=null){
                                                                wrongaudio.pause();
                                                            }
                                                            if(wrongaudio2!=null){
                                                                wrongaudio2.pause();
                                                            }
                                                            if(rightaudio!=null){
                                                                rightaudio.pause();
                                                            }
                                                            if(smallrightaudio!=null){
                                                                smallrightaudio.pause();
                                                            }
                                                            if(question.sources[store.state.pageNumber].feedback0[0].dutishuohuaanimation&&question.sources[store.state.pageNumber].feedback0[0].dutishuohuashow&&question.feedbackAnimate.show&&question.feedbackAnimate.name){
                                                                let jiaoseAnimation2 = jiaoseAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback0[0].dutishuohuaanimation, true);
                                                                jiaoseAnimationCon.state.timeScale = 1;
                                                                jiaoseAnimationCon.alpha=1
                                                            } 
                                                            dutifunction2();
                                                        } 
                                                        return
                                                    }
                                                i++
                                                } 
                                            }
                                            
                                        })
                                    }
                                    //读题动画加音频
                                    if(question.sources[store.state.pageNumber].feedback0[0].timuaudio.name){
                                        if(question.sources[store.state.pageNumber].feedback0[0].dutishuohuaanimation&&question.sources[store.state.pageNumber].feedback0[0].dutishuohuashow){
                                            if(question.sources[store.state.pageNumber].feedback0[0].defaultanimation&&question.sources[store.state.pageNumber].feedback0[0].defaultshow){
                                                let jiaoseAnimation2 = jiaoseAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback0[0].dutishuohuaanimation, true);
                                                jiaoseAnimationCon.state.timeScale = 1;
                                                jiaoseAnimationCon.alpha=1
                                            }else{
                                                dutianimationfunction(); 
                                            }
                                        }
                                        dutifunction();
                                    }else{
                                        dutifunction();
                                        makeTips();//提示倒计时
                                    }  
                                }else{
                                    dutifunction();
                                }
                                //矩阵按钮
                                
                                let numberBtn;
                                for (let i = 0; i < Math.pow(LENGHT,2); i++) {
                                    numberBtn = new Sprite.fromImage(res[question.sources[store.state.pageNumber].square.NAME[0].name].url);
                                    if(numberArr2[i]==0){
                                        numberBtn.interactive=true;
                                        numberBtn.buttonMode=true;
                                    }else{
                                        numberBtn = new Sprite.fromImage(res[question.sources[store.state.pageNumber].number1[numberArr2[i]-1].NAME[0].name].url);
                                    }
                                    numberBtn.anchor.set(.5,.5);
                                    numberBtn.width = parseFloat(question.sources[store.state.pageNumber].square.width);
                                    numberBtn.height = parseFloat(question.sources[store.state.pageNumber].square.height);
                                    numberBtn.x= parseFloat(question.sources[store.state.pageNumber].square.x)+parseFloat(question.sources[store.state.pageNumber].square.width)/2+(parseFloat(question.sources[store.state.pageNumber].ranks.width)+parseFloat(question.sources[store.state.pageNumber].square.width))*(i%LENGHT)
                                    numberBtn.y= parseFloat(question.sources[store.state.pageNumber].square.y)+parseFloat(question.sources[store.state.pageNumber].square.height)/2+(parseFloat(question.sources[store.state.pageNumber].ranks.height)+parseFloat(question.sources[store.state.pageNumber].square.height))*parseInt(i/LENGHT)
                                    numbersBtn.push(numberBtn)
                                    game.addChild(numberBtn)
                                }


                                if(question.sources[store.state.pageNumber].feedback2[0].rightanimation[0].componentName&&question.sources[store.state.pageNumber].feedback2[0].rightanimation[0].name){
                                    game.addChild(rightAnimationCon)
                                }
                                if(question.sources[store.state.pageNumber].feedback2[0].wronganimation[0].componentName&&question.sources[store.state.pageNumber].feedback2[0].wronganimation[0].name){
                                    game.addChild(wrongAnimationCon)
                                }

                                
                                numbersBtn.map((item,index)=>{
                                    item.on("pointerdown",function(){
                                        let number0lenght = 0
                                        for (let i = 0; i < numbersBtn.length; i++) {
                                            if(numberArr2[i]==0){
                                                number0lenght++
                                                numbersBtn[i].texture=res[question.sources[store.state.pageNumber].square.NAME[0].name].texture;
                                            }
                                        }

                                        if(numberArr2[index]==0){
                                            item.texture=res[question.sources[store.state.pageNumber].square.NAME[1].name].texture;
                                            INDEX2=index
                                        }
                                    })
                                })

                                //选项按钮
                                let optionsButton = []
                                let optionButton
                                let optionButtoninteractive = true
                                let optionButtoninteractive2 = true
                                for (let i = 0; i < LENGHT; i++) {
                                    optionButton = stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).getChildByName('componentContainer').getChildByName('option'+i);
                                    optioncontainer.addChild(optionButton)
                                    optionButton.interactive=true;
                                    optionButton.buttonMode=true;
                                    optionButton.alpha = 1
                                    optionButton.x=parseFloat(question.sources[store.state.pageNumber].option[i].x)+parseFloat(question.sources[store.state.pageNumber].option[i].width)/2
                                    optionButton.y=parseFloat(question.sources[store.state.pageNumber].option[i].y)+parseFloat(question.sources[store.state.pageNumber].option[i].height)/2
                                    optionButton.anchor.set(.5,.5);
                                    optionsButton.push(optionButton);
                                    if(question.sources[store.state.pageNumber].option[0].number!="4"){
                                        let TYPE = ["bounceInDown","bounceInUp","bounceIn","fadeIn","leftAndRight","upAndDown"];
                                        let DELAY = (Math.random()*0.5).toFixed(1)
                                        new AnimateClass(optionButton,{//需要动画的元素  必填
                                            time:0.6,                  //动画时间 默认0.6  可不配置
                                            type:TYPE[parseFloat(question.sources[store.state.pageNumber].option[0].number)],         //动画名字 默认zoomIn 可不配置
                                            delay:DELAY,               //延时 默认 0 可不配置
                                            onComplete:()=>{
                                                //动画执行后回调 如非必须 可不配置
                                            }
                                        });
                                    }
                                }

                                let INDEX=null
                                let smallrightaudionumber=-1;
                                let wrongaudio2number=-1;
                                let setTimeoutfankui;
                                let wrongaudio = null;
                                let wrongaudio2 = null;
                                let rightaudio= null;
                                let smallrightaudio= null

                                //提交数据
                                let tijiaofunction = function(){
                                    if(question.help.show&&question.sources[store.state.pageNumber].feedback4[0].helpaudio.name){
                                        helpaudio.speed = 0;
                                        let helpAnimation4 = helpAnimationCon.state.setAnimation(0, 'animation', false);
                                        helpAnimationCon.state.timeScale = 0;
                                    }
                                    if(store.state.pageNumber<question.sources.length-1){
                                        store.state.pageNumber++
                                        Refresh();
                                    }else{
                                        if(bgvoice!=null&&click==false){
                                            bgvoice.pause()
                                        } 
                                        if(question.endAnimate.show&&question.endAnimate.animate.name){
                                            givemefivefunction(); 
                                        }else{
                                            answer.submitAnswer();
                                        }
                                    }
                                }
                                let smallrightaudiotimeout = 0
                                let wrongaudio2timeout = 0
                                let rightaudiotimeout = 0
                                optionsButton.map((item,index)=>{
                                    item.on("pointerover",function(){
                                        item.width=question.sources[store.state.pageNumber].option[0].width*1.1
                                        item.height=question.sources[store.state.pageNumber].option[0].height*1.1
                                    })
                                    item.on("pointerout",function(){
                                        item.width=question.sources[store.state.pageNumber].option[0].width
                                        item.height=question.sources[store.state.pageNumber].option[0].height
                                    })
                                    item.on("pointerdown",function(){
                                        optionButtoninteractive2 = false
                                        item.width=question.sources[store.state.pageNumber].option[0].width*0.9
                                        item.height=question.sources[store.state.pageNumber].option[0].height*0.9
                                        if(optionButtoninteractive){
                                            tishing=false
                                            INDEX=INDEX2
                                            if(INDEX!=null){
                                                if(question.sources[store.state.pageNumber].feedback0[0].timuaudio.name){
                                                    clearTimeout(dutisetTimeout)
                                                    if(timuaudio!=null){
                                                        timuaudio.pause();
                                                    }
                                                }
                                                if(rightArr[INDEX]!=(index+1).toString()){   
                                                    for (let ii = 0; ii < numberArr2.length; ii++) {
                                                        if(numberArr2[ii]!=0){
                                                            numberBtn = new Sprite.fromImage(res[question.sources[store.state.pageNumber].number1[numberArr2[ii]-1].NAME[0].name].url);
                                                        }
                                                        //块区域等值的数
                                                        if(numberArr1[ii]==numberArr1[INDEX]){
                                                            if(numberArr2[ii]==(index+1).toString()){
                                                                numbersBtn[ii].texture=res[question.sources[store.state.pageNumber].number1[index].NAME[1].name].texture;
                                                                // setTimeout(function(){
                                                                //     numbersBtn[ii].texture=res[question.sources[store.state.pageNumber].number1[index].NAME[0].name].texture;
                                                                // },1000)
                                                            }
                                                        }
                                                        //行区域等值的数
                                                        for (let j = 0; j < problemArr.length; j++) {
                                                            if(parseInt(ii/LENGHT)==parseInt(INDEX/LENGHT)){
                                                                if(numberArr2[ii]==(index+1).toString()){
                                                                    numbersBtn[ii].texture=res[question.sources[store.state.pageNumber].number1[index].NAME[1].name].texture;
                                                                    setTimeout(function(){
                                                                        numbersBtn[ii].texture=res[question.sources[store.state.pageNumber].number1[index].NAME[0].name].texture;
                                                                    },1000)
                                                                }
                                                            }
                                                        }
                                                        //列区域等值的数
                                                        for (let j = 0; j < problemArr.length; j++) {
                                                            if(parseInt(ii%LENGHT)==parseInt(INDEX%LENGHT)){
                                                                if(numberArr2[ii]==(index+1).toString()){
                                                                    numbersBtn[ii].texture=res[question.sources[store.state.pageNumber].number1[index].NAME[1].name].texture;
                                                                    setTimeout(function(){
                                                                        numbersBtn[ii].texture=res[question.sources[store.state.pageNumber].number1[index].NAME[0].name].texture;
                                                                    },1000)
                                                                }
                                                            }
                                                        }
                                                    }
                                                    numbersBtn[INDEX].texture=res[question.sources[store.state.pageNumber].number1[index].NAME[2].name].texture;
                                                    setTimeout(function(){
                                                        if(INDEX!=null){
                                                            TweenMax.to(numbersBtn[INDEX],0.3,{
                                                                alpha:0
                                                            })
                                                        }
                                                        setTimeout(function(){
                                                            if(INDEX!=null){
                                                                TweenMax.to(numbersBtn[INDEX],0.3,{
                                                                    alpha:1
                                                                })
                                                            }
                                                        },300)
                                                    },300)
                                                    wrongaudio2timeout = 0
                                                    if(question.sources[store.state.pageNumber].feedback2[0].wrongaudio.name){
                                                        wrongaudio = res[question.sources[store.state.pageNumber].feedback2[0].wrongaudio.name].sound;
                                                        wrongaudio.singleInstance = true;
                                                        wrongaudio.play();
                                                        
                                                        if(tishiaudio!=null){
                                                            clearTimeout(tishiaudiofunction)
                                                            tishiaudio.pause();
                                                        }
                                                        if(rightaudio!=null){
                                                            rightaudio.pause();
                                                        }
                                                        if(smallrightaudio!=null){
                                                            smallrightaudio.pause();
                                                        }
                                                    }
                                                    
                                                    if(question.sources[store.state.pageNumber].feedback2[0].wronganimation[0].componentName&&question.sources[store.state.pageNumber].feedback2[0].wronganimation[0].name){
                                                        let wrongAnimation1 = wrongAnimationCon.state.setAnimation(0, 'animation', false);
                                                        wrongAnimationCon.x=numbersBtn[INDEX].x
                                                        wrongAnimationCon.y=numbersBtn[INDEX].y
                                                        wrongAnimationCon.state.timeScale = 1;
                                                        wrongAnimationCon.alpha=1
                                                    }
                                                    if(question.sources[store.state.pageNumber].feedback0[0].wrongaudio[0].audio){
                                                        if(wrongaudio2!=null){
                                                            wrongaudio2.pause();
                                                        }
                                                        wrongaudio2 = res[question.sources[store.state.pageNumber].feedback0[0].wrongaudio[wrongaudio2number+=1].audio].sound;
                                                        if(wrongaudio2number==question.sources[store.state.pageNumber].feedback0[0].wrongaudio.length-1){
                                                            wrongaudio2number=-1
                                                        }
                                                        wrongaudio2.singleInstance = true;
                                                        wrongaudio2.play(); 
                                                        if(wrongaudio2timeout<wrongaudio2.duration*1000){
                                                            wrongaudio2timeout=wrongaudio2.duration*1000
                                                        } 
                                                        if(tishiaudio!=null){
                                                            clearTimeout(tishiaudiofunction)
                                                            tishiaudio.pause();
                                                        }
                                                        if(rightaudio!=null){
                                                            rightaudio.pause();
                                                        }
                                                        if(smallrightaudio!=null){
                                                            smallrightaudio.pause();
                                                        }
                                                    }
                                                    
                                                    if(question.sources[store.state.pageNumber].feedback0[0].wronganimation&&question.sources[store.state.pageNumber].feedback0[0].wrongshow&&question.feedbackAnimate.show&&question.feedbackAnimate.name){
                                                        if(jiaosecontainer.children.length>0){
                                                            let jiaoseAnimation2 = jiaoseAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback0[0].wronganimation, false);
                                                            jiaoseAnimationCon.state.timeScale = 1;
                                                            jiaoseAnimationCon.interactive=false
                                                            jiaoseAnimationCon.alpha=1
                                                        }else{
                                                            let jiaoseAnimation1 = jiaoseAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback0[0].wronganimation, false);
                                                            jiaoseAnimationCon.state.timeScale = 1;
                                                            jiaoseAnimationCon.interactive = false;
                                                            jiaoseAnimationCon.x = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].x)
                                                            jiaoseAnimationCon.y = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].y)
                                                            jiaoseAnimationCon.scale.x = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].scale)
                                                            jiaoseAnimationCon.scale.y = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].scale)
                                                            jiaosecontainer.addChild(jiaoseAnimationCon)
                                                            jiaoseAnimationCon.interactive=false
                                                            jiaoseAnimationCon.alpha=1
                                                        }
                                                        if(wrongaudio2timeout<jiaoseAnimationCon.state.tracks[0].animationEnd*1000){
                                                            wrongaudio2timeout=jiaoseAnimationCon.state.tracks[0].animationEnd*1000
                                                        } 
                                                    }
                                                    let daojishifunction = function(){
                                                        if(question.sources[store.state.pageNumber].feedback0[0].defaultanimation&&question.sources[store.state.pageNumber].feedback0[0].defaultshow&&question.feedbackAnimate.show&&question.feedbackAnimate.name){
                                                            let jiaoseAnimation1 = jiaoseAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback0[0].defaultanimation, true);
                                                            jiaoseAnimationCon.state.timeScale = 1;
                                                            jiaoseAnimationCon.interactive=true;
                                                            jiaoseAnimationCon.alpha=1
                                                        }
                                                    }
                                                    clearTimeout(setTimeoutfankui)
                                                    setTimeoutfankui = setTimeout(function(){
                                                        if(tishing==false){
                                                            daojishifunction();
                                                        }
                                                    },wrongaudio2timeout)

                                                    
                                                    setTimeout(function(){
                                                        for (let ii = 0; ii < numberArr2.length; ii++) {
                                                            if(numberArr2[ii]!=0){
                                                                numbersBtn[ii].texture = res[question.sources[store.state.pageNumber].number1[numberArr2[ii]-1].NAME[0].name].texture
                                                            }
                                                            if(numbersBtn[ii].alpha==0){
                                                                TweenMax.to(numbersBtn[ii],0.3,{
                                                                    alpha:1
                                                                })   
                                                            }
                                                        }
                                                        if(numberArr2[INDEX]==0){
                                                            if(INDEX!=INDEX2){

                                                            }else{
                                                                numbersBtn[INDEX].texture=res[question.sources[store.state.pageNumber].square.NAME[1].name].texture;
                                                            }
                                                            
                                                        }
                                                    },1000)
                                                }else{
                                                    numbersBtn[INDEX].texture=res[question.sources[store.state.pageNumber].number1[index].NAME[0].name].texture;
                                                    numberArr2[INDEX]=(index+1).toString()
                                                    numbersBtn[INDEX].interactive=false;

                                                    smallrightaudiotimeout = 0
                                                    rightaudiotimeout = 0
                                                    if(question.sources[store.state.pageNumber].feedback2[0].rightaudio.name){
                                                        rightaudio = res[question.sources[store.state.pageNumber].feedback2[0].rightaudio.name].sound;
                                                        rightaudio.singleInstance = true;
                                                        rightaudio.play();

                                                        if(rightaudiotimeout<rightaudio.duration*1000){
                                                            rightaudiotimeout=rightaudio.duration*1000
                                                        }
                                                        
                                                        if(tishiaudio!=null){
                                                            clearTimeout(tishiaudiofunction)
                                                            tishiaudio.pause();
                                                        }
                                                        if(wrongaudio!=null){
                                                            wrongaudio.pause();
                                                        }
                                                        if(wrongaudio2!=null){
                                                            wrongaudio2.pause();
                                                        }
                                                    }

                                                    
                                                    if(question.sources[store.state.pageNumber].feedback0[0].smallrightaudio[0].audio){
                                                        if(smallrightaudio!=null){
                                                            smallrightaudio.pause();
                                                        }
                                                        smallrightaudio = res[question.sources[store.state.pageNumber].feedback0[0].smallrightaudio[parseInt(smallrightaudionumber+=1)].audio].sound;
                                                        if(smallrightaudionumber==question.sources[store.state.pageNumber].feedback0[0].smallrightaudio.length-1){
                                                            smallrightaudionumber=-1
                                                        }
                                                        smallrightaudio.singleInstance = true;
                                                        smallrightaudio.play(); 
                                                        if(smallrightaudiotimeout<smallrightaudio.duration*1000){
                                                            smallrightaudiotimeout=smallrightaudio.duration*1000
                                                        }
                                                        if(tishiaudio!=null){
                                                            clearTimeout(tishiaudiofunction)
                                                            tishiaudio.pause();
                                                        }    
                                                        if(wrongaudio!=null){
                                                            wrongaudio.pause();
                                                        }
                                                        if(wrongaudio2!=null){
                                                            wrongaudio2.pause();
                                                        }
                                                    }
                                                    
                                                    if(question.sources[store.state.pageNumber].feedback0[0].smallrightanimation&&question.sources[store.state.pageNumber].feedback0[0].smallrightshow&&question.feedbackAnimate.show&&question.feedbackAnimate.name){
                                                        if(jiaosecontainer.children.length>0){
                                                            let jiaoseAnimation2 = jiaoseAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback0[0].smallrightanimation, false);
                                                            jiaoseAnimationCon.state.timeScale = 1;
                                                            jiaoseAnimationCon.interactive=false
                                                            jiaoseAnimationCon.alpha=1

                                                        }else{
                                                            let jiaoseAnimation1 = jiaoseAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback0[0].smallrightanimation, false);
                                                            jiaoseAnimationCon.state.timeScale = 1;
                                                            jiaoseAnimationCon.interactive = false;
                                                            jiaoseAnimationCon.x = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].x)
                                                            jiaoseAnimationCon.y = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].y)
                                                            jiaoseAnimationCon.scale.x = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].scale)
                                                            jiaoseAnimationCon.scale.y = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].scale)
                                                            jiaosecontainer.addChild(jiaoseAnimationCon)
                                                            jiaoseAnimationCon.interactive=false
                                                            jiaoseAnimationCon.alpha=1
                                                        } 
                                                        if(smallrightaudiotimeout<jiaoseAnimationCon.state.tracks[0].animationEnd*1000){
                                                            smallrightaudiotimeout=jiaoseAnimationCon.state.tracks[0].animationEnd*1000
                                                        }
                                                    }

                                                    let daojishifunction = function(){
                                                        if(question.sources[store.state.pageNumber].feedback0[0].defaultanimation&&question.sources[store.state.pageNumber].feedback0[0].defaultshow&&question.feedbackAnimate.show&&question.feedbackAnimate.name){
                                                            let jiaoseAnimation1 = jiaoseAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback0[0].defaultanimation, true);
                                                            jiaoseAnimationCon.state.timeScale = 1;
                                                            jiaoseAnimationCon.interactive=true;
                                                            jiaoseAnimationCon.alpha=1
                                                        }
                                                    }
                                                    clearTimeout(setTimeoutfankui)
                                                    setTimeoutfankui = setTimeout(function(){
                                                        if(tishing==false){
                                                            daojishifunction();
                                                        }
                                                    },smallrightaudiotimeout) 

                                                                                        
                                                    if(question.sources[store.state.pageNumber].feedback2[0].rightanimation[0].componentName&&question.sources[store.state.pageNumber].feedback2[0].rightanimation[0].name){
                                                        let rightAnimation1 = rightAnimationCon.state.setAnimation(0, 'animation', false);
                                                        rightAnimationCon.x=numbersBtn[INDEX].x
                                                        rightAnimationCon.y=numbersBtn[INDEX].y
                                                        rightAnimationCon.state.timeScale = 1;
                                                        rightAnimationCon.alpha=1
                                                        if(rightaudiotimeout<rightAnimationCon.state.tracks[0].animationEnd*1000){
                                                            rightaudiotimeout=rightAnimationCon.state.tracks[0].animationEnd*1000
                                                        }
                                                    }
                                                    if(rightaudiotimeout<smallrightaudiotimeout){
                                                        rightaudiotimeout=smallrightaudiotimeout
                                                    }
                                                    let xiaotikong=0 
                                                    for (let i = 0; i < numberArr2.length; i++) {
                                                        if(numberArr2[i]==0){
                                                            xiaotikong++
                                                        }
                                                    }
                                                    if(xiaotikong>0){
                                                        clearInterval(makeTipsSettimeout)
                                                        makeTips();
                                                    }
                                                    if(xiaotikong==0){
                                                        clearInterval(makeTipsSettimeout)
                                                        if(tishiaudio!=null){
                                                            clearTimeout(tishiaudiofunction)
                                                            tishiaudio.pause();
                                                            tishiaudio.speed = 0;
                                                        }

                                                        if(store.state.pageNumber<question.sources.length-1){
                                                            answer.init({
                                                                id:0,
                                                                text:''
                                                            });
                                                        }else{
                                                            answer.init({
                                                                id:0,
                                                                text:''
                                                            });
                                                        }
                                                        
                                                        setTimeout(function(){
                                                            if(window.forceSubmit!=true){
                                                                let bigrightaudiotimeout = 0
                                                                if(question.sources[store.state.pageNumber].feedback0[0].bigrightanimation&&question.sources[store.state.pageNumber].feedback0[0].bigrightshow&&question.feedbackAnimate.show&&question.feedbackAnimate.name){
                                                                    if(jiaosecontainer.children.length>0){
                                                                        let jiaoseAnimation2 = jiaoseAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback0[0].bigrightanimation, false);
                                                                        jiaoseAnimationCon.state.timeScale = 1;
                                                                        jiaoseAnimationCon.alpha=1
                                                                    }else{
                                                                        let jiaoseAnimation1 = jiaoseAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback0[0].bigrightanimation, false);
                                                                        jiaoseAnimationCon.state.timeScale = 1;
                                                                        jiaoseAnimationCon.x = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].x)
                                                                        jiaoseAnimationCon.y = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].y)
                                                                        jiaoseAnimationCon.scale.x = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].scale)
                                                                        jiaoseAnimationCon.scale.y = parseInt(question.sources[store.state.pageNumber].feedback0[0].role[0].scale)
                                                                        jiaosecontainer.addChild(jiaoseAnimationCon)
                                                                        jiaoseAnimationCon.alpha=1
                                                                    } 
                                                                    bigrightaudiotimeout=jiaoseAnimationCon.state.tracks[0].animationEnd*1000
                                                                }
                                                                let bigrightaudio
                                                                if(question.sources[store.state.pageNumber].feedback0[0].bigrightaudio.name){
                                                                    bigrightaudio = res[question.sources[store.state.pageNumber].feedback0[0].bigrightaudio.name].sound;
                                                                    bigrightaudio.singleInstance = true;
                                                                    bigrightaudio.play();     
                                                                    if(bigrightaudiotimeout<bigrightaudio.duration*1000){
                                                                        bigrightaudiotimeout=bigrightaudio.duration*1000
                                                                    }
                                                                }
                                                                if(question.sources[store.state.pageNumber].feedback1[0].tigananimation[0].show&&question.sources[store.state.pageNumber].feedback1[0].tigananimation[0].componentName&&question.sources[store.state.pageNumber].feedback1[0].tigananimation[0].name&&question.sources[store.state.pageNumber].feedback1[0].bigrightanimation&&question.sources[store.state.pageNumber].feedback1[0].bigrightshow){
                                                                    let tiganAnimation1 = tiganAnimationCon.state.setAnimation(0,question.sources[store.state.pageNumber].feedback1[0].bigrightanimation, false);
                                                                    tiganAnimationCon.state.timeScale = 1;
                                                                    tiganAnimationCon.alpha=1;
                                                                    if(bigrightaudiotimeout<tiganAnimationCon.state.tracks[0].animationEnd*1000){
                                                                        bigrightaudiotimeout=tiganAnimationCon.state.tracks[0].animationEnd*1000
                                                                    }
                                                                }
                                                                setTimeout(function(){
                                                                    if(window.forceSubmit!=true){
                                                                        //提交数据
                                                                        tijiaofunction();
                                                                    }
                                                                },bigrightaudiotimeout)
                                                            }
                                                        },rightaudiotimeout)
                                                        
                                                    }
                                                INDEX2=null;
                                                }
                                            }
                                        }
                                    })
                                    item.on("pointerup",function(){
                                        item.width=question.sources[store.state.pageNumber].option[0].width
                                        item.height=question.sources[store.state.pageNumber].option[0].height
                                    })
                                    window.stage.on("pointerup",function(){
                                        optionsButton[index].width=question.sources[store.state.pageNumber].option[0].width
                                        optionsButton[index].height=question.sources[store.state.pageNumber].option[0].height
                                    })
                                })
                            }   
                        },ruchangtimes)
                        
                        answer.questionInfo({
                            id: store.state.pageNumber,
                            currentTotalOption: 1,
                            totalQuestion: testNum
                        });
                    }
                    
                    //开始页
                    let bgvoice = null
                    let click = false
                    let startContainer = new PIXI.Container();
                    window.stage.getChildByName('GAME').getChildByName('GAME'+store.state.pageNumber).addChild(startContainer)
                    let beginAnimationCon
                    let startBtnAnimationCon
                    if(question.startAnimate.show){
                        beginAnimationCon = getAnimation(question.startAnimate.startBg.name);
                        let beginAnimation = beginAnimationCon.state.setAnimation(0, 'idle', true);
                        beginAnimationCon.state.timeScale = 1;
                        beginAnimationCon.x = question.startAnimate.startBg.x;
                        beginAnimationCon.y = question.startAnimate.startBg.y;
                        beginAnimationCon.scale.x = question.startAnimate.startBg.scale;
                        beginAnimationCon.scale.y = question.startAnimate.startBg.scale;
                        startContainer.addChild(beginAnimationCon);

                        startBtnAnimationCon = getAnimation(question.startAnimate.startBtn.name);
                        let startBtnAnimation = startBtnAnimationCon.state.setAnimation(0, 'idle', true);
                        startBtnAnimationCon.state.timeScale = 1;
                        startBtnAnimationCon.x = question.startAnimate.startBtn.x;
                        startBtnAnimationCon.y = question.startAnimate.startBtn.y;
                        startBtnAnimationCon.scale.x = question.startAnimate.startBtn.scale;
                        startBtnAnimationCon.scale.y = question.startAnimate.startBtn.scale;
                        startBtnAnimationCon.interactive=true;
                        startBtnAnimationCon.buttonMode=true;
                        startContainer.addChild(startBtnAnimationCon);

                        //声音按钮
                        var soundimage
                        if(question.startAnimate.muteButton.default.name&&question.startAnimate.muteButton.default.name){
                            soundimage = new Sprite.fromImage(res[question.startAnimate.muteButton.default.name].url);
                            startContainer.addChild(soundimage);
                            soundimage.anchor.set(.5,.5);
                            soundimage.width=question.startAnimate.muteButton.width;
                            soundimage.height=question.startAnimate.muteButton.height;
                            soundimage.x=question.startAnimate.muteButton.x+question.startAnimate.muteButton.width/2;
                            soundimage.y=question.startAnimate.muteButton.y+question.startAnimate.muteButton.height/2;
                            soundimage.interactive=true;
                            soundimage.buttonMode=true;
                            if(question.startAnimate.bgSound.name){
                                bgvoice = res[question.startAnimate.bgSound.name].sound;
                                bgvoice.singleInstance = true;
                                bgvoice.loop=true;
                            }
                            
                            soundimage.on("pointerover",function () {
                                soundimage.width=question.startAnimate.muteButton.width*1.1
                                soundimage.height=question.startAnimate.muteButton.height*1.1
                            });
                            soundimage.on("pointerout",function () {
                                soundimage.width=question.startAnimate.muteButton.width
                                soundimage.height=question.startAnimate.muteButton.height
                            });
                            soundimage.on("pointerdown",function () {
                                if(click==false){
                                    click=true;
                                    soundimage.texture = res[question.startAnimate.muteButton.click.name].texture;
                                }else {
                                    click=false
                                    soundimage.texture = res[question.startAnimate.muteButton.default.name].texture
                                }
                            });
                        }
                        
                        startBtnAnimationCon.on("pointerdown",function(){
                            let clickAudio
                            if(question.startAnimate.clickAudio.name){
                                clickAudio = res[question.startAnimate.clickAudio.name].sound;
                                clickAudio.singleInstance = true;
                                clickAudio.loop=false;
                                clickAudio.play();
                            }

                    
                            startContainer.removeChild(startBtnAnimationCon);
                            startContainer.removeChild(soundimage);
                            let beginAnimation = beginAnimationCon.state.setAnimation(0, 'touch', false);
                            beginAnimationCon.state.timeScale = 1; 
                            setTimeout(function(){
                                Refresh();
                                startContainer.removeChild(beginAnimationCon); 
                                if(bgvoice!=null&&click==false){
                                    bgvoice.play()
                                }   
                            },beginAnimationCon.state.tracks[0].animationEnd*1000)
                        })
                    }else{
                        Refresh();
                    }


                    if(self.$route.query.startStatus){
                        if(window.question.one.start.show&&self.$route.query.startStatus=='true'){
                            stage.addChild(start);
                            start.button(()=>{
                                stage.removeChild(start);
                                stage.getChildByName('gameBgSound')?stage.setChildIndex(stage.getChildByName('gameBgSound'),stage.children.length-1):"";
                                
                            });
                        }else{
                            
                        }
                    }else{
                        if(window.question.one.start.show){
                            stage.addChild(start);
                            start.button(()=>{
                                stage.removeChild(start);
                                stage.getChildByName('gameBgSound')?stage.setChildIndex(stage.getChildByName('gameBgSound'),stage.children.length-1):"";
                                
                            });
                        }else{
                           
                        }
                    }
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
        font-family: "xueersi cuyuan bold"
    }
    canvas{
        font-family: "xueersi cuyuan bold";
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