<template>
  <div id="app">
    <router-view/>
    <End v-if="isShow"/>
    <Pend v-if="pisShow"/>
  </div>
</template>
<script>

import {Container,Sprite,Graphics} from 'pixi.js';
import End from 'xes-tem-end';//不带解析结果页
import Pend from 'xes-tem-pend';//平台结果页
require('./store.js');
export default {
    name: 'App',
    data () {
        return {
        }
    },
    components:{
        End,
        Pend
    },
    computed:{
        isShow(val,value){
            return store.state.isShow
        },
        pisShow(val,value){
            return store.state.pisShow
        }
    },
    mounted() {
        console.log("APP组件加载完成");
    }
}
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: black;
  }

  #app {
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
</style>
