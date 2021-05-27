<template>
    <div id="layoutContainer">
        <div class="left">

        </div>
        <div class="main">
            <div class="btn-container">
                <button @click="changePosition">change</button>
                <button v-on:click="shuffle" v-bind:style="{zIndex:9999}">shuffle</button>
                <button v-on:click="calendar" v-bind:style="{zIndex:9999}">calendar</button>
                <button v-on:click="t_sne" v-bind:style="{zIndex:9999}">t_sne</button>
            </div>
            <div class="layout" ref="layout">
                <GridAQILevel :gridWidth="gridWidth" :gridHeight="gridHeight" :posLayout="posLayout" />
            </div>
        </div>
        <div class="right">

        </div>
    </div>
    <!-- <div id="demo"></div> -->
</template>

<script>
    import * as P from 'popojs'
    // import SmallMultiples from "@/components/sicong/SmallMultiples_Canvas";
    import * as d3 from "d3"
    import GridAQILevel from "./GridAQILevel";
    // import GridAQILevel_Canvas from "./GridAQILevel_Canvas";
    export default {
        data() {
            return {
                renderCanvas: false,
                // mapJsonData:{},
                // svgSizeData:{},
                gridWidth: 0,
                gridHeight: 0,
                posLayout:[]
            }
        },
        components: {
            // GridAQILevel_Canvas,            
            GridAQILevel
        },
        methods: {
            // changePosition() {
            //     this.positionChange = !this.positionChange
            //     console.log(this.positionChange)
            // },
            shuffle: function () {
                // console.log("动画？？")
                let gridPos2 = _.shuffle(this.gridPos2)
                this.pic = this.pic.map((item, index) => {
                    return {
                        ...item,
                        pos: gridPos2[index]
                    }
                })
                // this.drawSM(this.newGridPos)
            },
            t_sne: async function () {
                let t_sneData = await d3.json("PCA50-t-sne_AQI.json")
                let t_snePos = this.t_sneLayout(t_sneData)
                this.upDateLayout(t_snePos)
            },
            calendar: async function () {
                let formatDate = d3.utcFormat("%x")

                let timeData = await d3.json("timeAllJson.json")
                let calendarPos = this.calendarLayout(timeData)
                this.upDateLayout(calendarPos)
            },
            t_sneLayout(data) {
                return data.map((item) => {
                    return [item[0] * this.gridWidth, item[1] * this.gridHeight, ]
                })
            },
            upDateLayout(PosData) {
               this.posLayout = PosData
            },
        },
        mounted() {
            console.log(this.$store)
            console.log(this.$refs.layout.offsetHeight)
            this.gridWidth = this.$refs.layout.offsetWidth;
            this.gridHeight = this.$refs.layout.offsetHeight;

            // d3.json("map.json").then((data)=>{
            //     this.mapJsonData = data
            // })
            // this.$nextTick().then(() => {
            //     let popo = P.init({
            //         container: 'layoutContainer',
            //         layout: [
            //             [12, [2, [18, [2, 10]], 4]]
            //         ],
            //         panel: {
            //             enable: true,

            //         },
            //         dev: {
            //             enable: true,
            //             panel: {
            //                 background: '#fff'
            //                 // size:true,
            //                 // enable:true
            //                 // custom:[{panels:[1]}]
            //                 // background:'#ccc',
            //                 // show:false
            //                 // id:true
            //             },
            //             guideline: {
            //                 show: false
            //             }
            //         }
            //     });
            //     this.gridWidth = popo.$width("3");
            //     this.gridHeight = popo.$height("3");
            // this.svgSizeData = {...this.svgSizeData,svgWidth,svgHeight}
            // console.log(this.svgSizeData["svgWidth"])
            // console.log("svgSizeData:",this.svgSizeData)
            // })
            // this.renderCanvas = true
        }
    };
</script>

<style>
    html,
    body {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
    }

    #layoutContainer {
        width: 100%;
        height: 100%;
    }

    .left {
        float: left;
        width: 200px;
        height: 100%;
        background-color: skyblue;
    }

    .right {
        float: left;
        width: 200px;
        height: 100%;
        background-color: red
    }

    .main {
        float: left;
        width: calc(100% - 400px);
        height: 100%;
        position: relative;
    }

    .btn-container{
        height: 200px;
    }
    .layout{
        height: calc(100% - 200px);
        position: relative;
    }
</style>