<template>
    <div id="layoutContainer">
      <panel target="3" title="Panel 3">
        <SmallMultiples :mapJsonData="mapJsonData" :svgSizeData="svgSizeData"/>
      </panel>
<!--      <div v-bind:data-popo="popoDataID2">34214213</div>-->
    </div>
    <!-- <div id="demo"></div> -->
</template>

<script>
  // import createPilingJs, {
  // 	createImageRenderer
  // } from 'piling.js';
  import *as P from 'popojs'
  import Panel from 'popo-vue-panel'
  import SmallMultiples from "./components/sicong/SmallMultiples";
  import *as d3 from "d3"
  export default {
    data(){
      return {
        renderCanvas:false,
        mapJsonData:{},
        svgSizeData:{}
      }
    },
    components:{
        Panel,
        SmallMultiples
    },
    mounted() {
        d3.json("map.json").then((data)=>{
            this.mapJsonData = data
        })
        this.$nextTick().then(() => {
            let popo = P.init({
                container:'layoutContainer',
                layout:[[12,[4,[18,[2,10]],2]]],
                panel:{
                    enable:true
                },
                dev:{
                    enable:true,
                    panel:{
                        // size:true,
                        // enable:true
                        // custom:[{panels:[1]}]
                        background:'#ccc',
                        // show:false
                        // id:true
                    },
                    guideline:{
                        show:true
                    }
                }
            });
            let svgWidth = popo.$width("3");
            let svgHeight = popo.$height("3");
            this.svgSizeData = {...this.svgSizeData,svgWidth,svgHeight}
            console.log(this.svgSizeData["svgWidth"])
            console.log(this.svgSizeData)
        })
       // this.renderCanvas = true
    }
  };
</script>

<style>
  html,body{
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
/*.popo-panel{*/
/*  background: beige;*/
/*}*/
  #layoutContainer{
    width: 100%;
    height: 100%;
  }
</style>