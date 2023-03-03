import {Sprite} from 'pixi.js';
const PIXI_SPINE = require('pixi-spine');
let projectName = process.env.PROJECT_NAME;
let resourcePath = '';
if(process.env.NODE_ENV === 'production'){
    resourcePath = '.'
}else{
    resourcePath = projectName;
}
let loader = PIXI.loader;
console.log(`public/${projectName}/resource/content.json`);
export function load(aRes = [{name:"resources",fileName:"resource"}]) {
    if(!window.res){
        console.info(1);
        return new Promise((resolve, reject) => {
            console.log('env: ',process.env.NODE_ENV);
            console.log('question: ',`${resourcePath}/resource/content.json`);
            
            loader.add('question',`${resourcePath}/resource/content.json`);
            aRes.forEach(elememt=>{
                loader.add(elememt.name,`${resourcePath}/resource/${elememt.fileName}.json`);
            });
            loader.load(() => {
                console.log(PIXI.loader.resources,111111111111);
                aRes.forEach(element=>{
                    let content = PIXI.loader.resources[element.name].data;
                    content.forEach(value => {
                        try{
                            loader.add(value.key, value.path);
                        }catch(e){
                            console.log(e);
                        }
                    });
                });
                loader.load((l,r) =>{
                    window.res = r;
                    resolve(r)
                });
                loader.onError.add((e) => {
                    console.log(e,11111111111);
                });
                loader.onProgress.add((e) => {
                    // console.log("loader加载进程中");
                    document.getElementsByClassName('runner')[0].style.width = e.progress*6.8/100+'rem'
                });
                loader.onComplete.add((e) => {

                    // console.log("loader加载完成");
                    window.$$templateEndTime  = new Date();
                });
            });
        })
    }
    else{
        return new Promise((resolve, reject) => {
            console.info(2);
            resolve(window.res)
        })
    }
}

export function getAnimation(animationStr) {

    return new PIXI.spine.Spine(res[animationStr].spineData)
}

export function getSound(resourceStr) {
    return res[resourceStr].data;
}

export function createSprite(texture) {
    return new Sprite(texture);
}

export function getOptionTexture(resourceJsonStr,texture) {
    return res[resourceJsonStr].textures[texture];
}
export function getTexture(resourceStr) {
    return res[resourceStr].texture;
}