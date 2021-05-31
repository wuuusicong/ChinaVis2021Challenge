<template>
    <div id="layoutContainer">
        <div class="left">

        </div>
        <div class="main">
            <div class="btn-container">
                <button @click="changePosition">change</button>
                <button @click="shuffle" :style="{zIndex:9999}">shuffle</button>
                <button @click="calendar" :style="{zIndex:9999}">calendar</button>
                <button @click="t_sne" :style="{zIndex:9999}">t_sne</button>
                <button @click="t_sne" :style="{zIndex:9999}">lineChart</button>
                <button @click="treeLayout" :style="{zIndex:9999}">tree</button>
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
    import $ from "jquery"
    // import SmallMultiples from "@/components/sicong/SmallMultiples_Canvas";
    import * as d3 from "d3"
    import GridAQILevel from "./GridAQILevel";
    import GridAQILevel_can from "./GridAQILevel_can";
    import GridAQILevel_svg from "./GridAQILevel_svg";
    // import GridAQILevel_Canvas from "./GridAQILevel_Canvas";
    export default {
        data() {
            return {
                renderCanvas: false,
                // mapJsonData:{},
                // svgSizeData:{},
                gridWidth: 0,
                gridHeight: 0,
                itemSize: 18,
                posLayout:[]
            }
        },
        components: {
            GridAQILevel_svg,
            GridAQILevel_can,
            // GridAQILevel_Canvas,
            GridAQILevel
        },
        methods: {
            changePosition() {
                this.positionChange = !this.positionChange
                console.log(this.positionChange)
            },
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
                let t_snePos = t_sneData.map((item) => {
                    return [item[0] * this.gridWidth, item[1] * this.gridHeight, ]
                })
                this.upDateLayout(t_snePos)
            },
            treeLayout: async function (){
                let tree_Data = await d3.json("treeDataNew.json")
                console.log(tree_Data)
                const treemap = d3.treemap()
                                .tile(d3.treemapBinary)
                                .size([this.gridWidth,this.gridHeight])
                const root = d3.hierarchy(tree_Data).sum(d=>d.AQI);
                const tree = treemap(root)
                const leaves = tree.leaves()
                console.log(leaves)
                let treePos = []
                const color = d3.scaleOrdinal(d3.schemeCategory10);
                leaves.forEach((item,index)=>{
                    treePos[item["data"]["index"]] = [item.x0,item.y0]
                    let imgId = '#img'+item["data"]["index"]
                    let gridId = '#grid'+item["data"]["index"]
                    let imgSize = d3.min([(item.x1-item.x0),(item.y1-item.y0)])
                    // console.log($(imgId))
                    $(imgId).css("width",imgSize)
                    $(imgId).css("height",imgSize)
                    $(gridId).css("background",color(item.parent.data.name))
                    $(gridId).css("border",'#000')
                })
                this.upDateLayout(treePos)
                // console.log(treemap)
            },
            calendarLayout(timeData,padding = {
                widthGap: 10,
                heightGap: 2
            }) {
                // let data = await d3.json("timeAllJson.json")
                // console.log(timeData)
                // console.log("年月日")
                let years = d3.groups(timeData, d => new Date(d).getUTCFullYear()).reverse()
                // console.log(typeof years)
                // console.log(years)
                let calendarPos = []
                let tmpYears = years
                for (let i in tmpYears) {
                    let yearGap = (this.itemSize + 2) * 7 * parseInt(i) + 20
                    // console.log(yearGap)
                    tmpYears[i][1].forEach((item2) => {
                        let tmp = []
                        // console.log(d3.utcYear(new Date(item2)), new Date(item2))
                        tmp[0] = d3.utcSunday.count(d3.utcYear(new Date(item2)), new Date(item2)) * (this
                            .itemSize) + 200;
                        tmp[1] = new Date(item2).getUTCDay() * this.itemSize + padding["heightGap"] + yearGap
                        calendarPos.push(tmp)
                    })
                }
                // console.log(calendarPos)
                return calendarPos
            },
            calendar: async function () {
                console.log(21321)
                let formatDate = d3.utcFormat("%x")
                let timeData = await d3.json("timeAllJson.json")
                let calendarPos = this.calendarLayout(timeData)
                console.log(calendarPos)
                this.upDateLayout(calendarPos)
            },
            upDateLayout(PosData) {
                console.log("update")
                this.$store.state.pic = this.$store.state.pic.map((item, index) => {
                    return {
                        ...item,
                        pos: PosData[index]
                    }
                })
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

<style scoped>
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
    .btn-container button{
        margin-left: 20px;
        border: #000000;
    }
    .layout{
        height: calc(100% - 200px);
        position: relative;
    }
</style>