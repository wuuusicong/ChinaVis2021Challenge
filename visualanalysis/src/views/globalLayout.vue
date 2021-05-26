<template>
    <div id="layoutContainer">
        <panel target="2" title="Panel 2">
            <div>
                <button @click="changePosition">change</button>
            </div>
        </panel>
        <panel target="3" title="Panel 3">
            <div><GridAQILevel :gridWidth="gridWidth" :gridHeight="gridHeight" :positionChange="positionChange"/></div>
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
    // import SmallMultiples from "@/components/sicong/SmallMultiples_Canvas";
    import *as d3 from "d3"
    import GridAQILevel from "./GridAQILevel";
    // import GridAQILevel_Canvas from "./GridAQILevel_Canvas";
    export default {
        data(){
            return {
                renderCanvas:false,
                // mapJsonData:{},
                // svgSizeData:{},
                gridWidth:0,
                gridHeight:0,
                positionChange:true
            }
        },
        components:{
            // GridAQILevel_Canvas,
            Panel,
            GridAQILevel
        },
        methods: {
            changePosition(){
                this.positionChange = !this.positionChange
                console.log(this.positionChange)
            }
        },
        mounted() {
            console.log(this.$store)
            // d3.json("map.json").then((data)=>{
            //     this.mapJsonData = data
            // })
            this.$nextTick().then(() => {
                let popo = P.init({
                    container:'layoutContainer',
                    layout:[[12,[2,[18,[2,10]],4]]],
                    panel:{
                        enable:true,

                    },
                    dev:{
                        enable:true,
                        panel:{
                            background:'#fff'
                            // size:true,
                            // enable:true
                            // custom:[{panels:[1]}]
                            // background:'#ccc',
                            // show:false
                            // id:true
                        },
                        guideline:{
                            show:false
                        }
                    }
                });
                this.gridWidth = popo.$width("3");
                this.gridHeight = popo.$height("3");
                // this.svgSizeData = {...this.svgSizeData,svgWidth,svgHeight}
                // console.log(this.svgSizeData["svgWidth"])
                // console.log("svgSizeData:",this.svgSizeData)
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