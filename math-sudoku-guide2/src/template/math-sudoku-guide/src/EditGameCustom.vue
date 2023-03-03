<template>
    <div v-if="!startStatus">
        <div v-for="(item,index) in allData.sources" v-if="index === pageNumber" :key="index" style="color: #fff;position: absolute">
            <!-- {{`第${index+1}页`}} -->
            <!--自定义代码区域-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "EditGameCustom",
        props:['allData','resourceData'],
        data(){
          return{
              pageNumber:0
          }
        },
        mounted(){
            console.log(stage, '6666666666666666666')

        },
        computed:{
            startStatus(){
                return store.state.startStatus;
            },
            pageNum(){
                return store.state.pageNumber;
            }
        },
        watch:{
            startStatus(newVal,oldVal){
                console.log(newVal)
            },
            pageNum(newVal,oldVal){
                if(newVal !== -1){
                    this.pageNumber = newVal;
                }
            }
        }
    }
</script>

<style scoped>

</style>