/* 
* storeJs开发注意事项
* 此文件为公共文件，如有功能需要在此开发，写好注释和开发者，不得修改原有内容。
*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import {postAnswer, AnswerInfo} from 'xes-answer';
const state = {
    postArr: [],//答题数据
    resultArr: [],//平台结果处理后结果
    pisShow: false,//平台结果页是否出现

    goldnum: 0,//金币数
    testNum: 1,//题数
    result: [],//服务端返回数据
    isShow: false,//是否显示结果页
    pageNumber: 0,//记录当面页数
    startStatus:false,//开始页的状态(切换编辑开始页/内容页状态，开始页状态时EditGameCustom组件不显示)
    complete:false,//加载完成的状态(EditGameCustom组件，为防止loader完成前操作舞台)
};
const actions = {
    postAnswer({state}) {
        console.log(state.postArr, "整体答题数据");
        postAnswer(state.postArr, state.testNum);
    },
    defaultPushToPostArr({state}, value) {
        state.postArr.push(value);
    },
    /* 
    * increment:增加内容页页数
    * decrement:减少内容页页数
    * setPageNumber:设置内容页页数
    */
    increment({state}) {
        state.pageNumber++;
    },
    decrement({state}) {
        state.pageNumber--;
    },
    setPageNumber({state}, value) {
        state.pageNumber = value;
    },
    pushToPostArr({state}, value) {
        console.log(value, "第" + value.id + "道题答题数据");
        state.postArr.splice(value.id, 1, value);
    },
    //开始页的状态(切换编辑开始页/内容页状态，开始页状态时EditGameCustom组件不显示)
    setStartStatus({state},value){
        state.startStatus = value;
    },
    //加载完成的状态(EditGameCustom组件，为防止loader完成前操作舞台)
    setComplete({state},value){
        state.complete = value;
    }
};
const mutations = {
    setIsPost(state, value) {
        state.isShow = value;
    },
    setpIsPost(state, value) {
        state.pisShow = value;
    }
};
window.store = new Vuex.Store({
    state,
    actions,
    mutations,
});
