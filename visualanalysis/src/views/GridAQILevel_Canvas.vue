<template>
       <canvas id="canvasContainer" :width="gridWidth" :height="gridHeight"></canvas>
</template>

<script>
    import *as d3 from "d3"
    import * as $ from 'jquery'
    const pic = []
    const contexts = require.context('@/assets/heatmapDataAll/', true, /\.jpg$/);
    contexts.keys().forEach((item,index) => {
        pic[index] = {}
        pic[index]["src"] = contexts(item);
        pic[index]["id"] = 'grid'+index
    });
    export default {
        name: "GridAQILevel_Canvas",
        props:['gridWidth','gridHeight'],
        methods:{
            gridLayout(dataNum,itemSize,width,height,padding={widthGap:10,heightGap:2}){
                let itemNum = parseInt(width/(itemSize+padding["widthGap"]))
                let gridPos = []
                new Array(dataNum).fill('').forEach((item,index)=>{
                    let tmp = []
                    tmp[0] = (index%itemNum)*(itemSize+padding["widthGap"])+padding["widthGap"]/2
                    tmp[1] = (parseInt(index/itemNum))*(itemSize+padding["heightGap"])+padding["heightGap"]
                    gridPos.push(tmp)
                })
                return gridPos
            },
            drawCanvas(pic){
                var canvas = document.getElementById("canvasContainer");
                var ctx=canvas.getContext("2d")
                pic.forEach((item,index)=>{
                    let img = new Image();
                    img.src = item.src;
                    let itemY = item.pos[1]+2
                    let itemX = item.pos[0]+2
                    console.log(itemX,itemY)
                    window.onload = function (){
                           ctx.drawImage(img,itemX,itemY,this.itemSize,this.itemSize)
                    }
                })
                console.log(pic)
            },
        },
        mounted() {
            console.log(pic)
            console.log(this.gridWidth)
            d3.json("AQIImg.json").then((data)=>{
                // console.log(data)
                data.forEach((item)=>{
                    let srcTmp = item
                    this.position.push(srcTmp)
                })

                let gridPos = this.gridLayout(data.length,this.itemSize,this.gridWidth,this.gridHeight)
                let newpic = this.pic.map((item,index)=>{
                    return {
                        ...item,
                        pos:gridPos[index]
                    }
                })
                this.drawCanvas(newpic)
            })
        },
        data() {
            return {
                position: [],
                pic,
                itemSize:18
            };
        },
    }
</script>

<style scoped>
    .map-container {
        /*display: flex;*/
        /*flex-direction: row;*/
        width: 100%;
        /*flex-wrap: wrap;*/
    }

    .map{
        display: inline-block;
        position: absolute;
    }
</style>