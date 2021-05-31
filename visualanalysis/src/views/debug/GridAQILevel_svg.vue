<template>
    <svg id="canvasContainer" :width="gridWidth" :height="gridHeight"></svg>
</template>

<script>
    import * as d3 from "d3"
    import * as $ from 'jquery'
    import _ from "loadsh"
    import {fabric} from "fabric"
    export default {
        name: "GridAQILevel_svg",
        props: ['gridWidth', 'gridHeight', 'positionChange'],
        // watch: {
        //     positionChange(newV){
        //         if(newV == true){
        //             this.upDateLayout(this.gridPos)
        //         }else{
        //             this.upDateLayout(this.calendarPosition)
        //         }
        //     }
        // },
        methods: {
            gridLayout(dataNum, itemSize, width, height, padding = {
                widthGap: 10,
                heightGap: 2
            }) {
                let itemNum = parseInt(width / (itemSize + padding["widthGap"]))
                let gridPos = []
                new Array(dataNum).fill('').forEach((item, index) => {
                    let tmp = []
                    tmp[0] = (index % itemNum) * (itemSize + padding["widthGap"]) + padding["widthGap"] / 2
                    tmp[1] = (parseInt(index / itemNum)) * (itemSize + padding["heightGap"]) + padding[
                        "heightGap"]
                    gridPos.push(tmp)
                })
                return gridPos
            },


            upDateLayout(PosData) {
                this.$store.state.pic = this.$store.state.pic.map((item, index) => {
                    return {
                        ...item,
                        pos: PosData[index]
                    }
                })
            },
            animateCanvas(imageAll,StaticCanvas,position){
                console.log(imageAll)
                console.log(455)
               console.log(d3.selectAll(imageAll))
                d3.selectAll(imageAll)
                .transition()
                .duration(2000)
                .attr("transform",(item)=>`translate(200,100)`)

                // .attr("transform",(item)=>`translate(200,100`);

                // imageAll.forEach((item,index)=>console.log(index))
            },


            async drawCanvas(pic,StaticCanvas){
                let that = this;
                let imageAll = []
                console.log(StaticCanvas)

                let proAll = []
                // pic.forEach((item,index)=>{
                //     // console.log(1234)
                //     proAll.push(this.loadImage(pic,item,index))
                //     // console.log(12345)
                //     // console.log(image2)
                //
                // })
                let img_gAll = StaticCanvas.selectAll("img_g")
                .data(pic)
                .enter()
                .append("g")
                .attr("id",(item)=>item.id)
                .attr("class","img_g")
                .attr("transform",(item)=>`translate(${item["pos"][0]},${item["pos"][1]})`);
                img_gAll
                    .append("image")
                    .attr("id",(item)=>item.imgId)
                    .attr("x",0)
                    .attr("y",0)
                    .attr("width",this.itemSize)
                    .attr("height",this.itemSize)
                    .attr("xlink:href",(item)=>item.src)
                // let results = await Promise.all(proAll)
                // results.forEach((item,index)=>StaticCanvas.add(item))
                // imageAll.push(results)
                console.log(555)
                // console.log(results)
                return img_gAll
                    // if(index>1)return
                    // let imgElement = document.createElement('img')
                    // imgElement.src = item.src;
                    // imgElement.width = 10
                    // imgElement.height = this.itemSize
                    // var imgInstance = new fabric.Image(imgElement, {
                    //     left:50,
                    //     top: 0,
                    //     scaleX: 300 / Img.width,
                    //     // height:18
                    // });
                    // StaticCanvas.add(imgInstance);

                    // console.log(itemX,itemY)
                    // ctx.drawImage(img,itemX,itemY,this.itemSize,this.itemSize)
            },
            //手动设置图片的位置
            // drawSM(gridPos){
            //     gridPos.forEach((item,index)=>{
            //         $(`#grid${index}`).css("top",item[1])
            //         $(`#grid${index}`).css("left",item[0])
            //     })
            //     this.gridPos2 = gridPos
            // },



        },
        async mounted() {
            // console.log(pic)
            // console.log(this.gridWidth)
            //加载图像
            let data = await d3.json("AQIImg.json")
            data.forEach((item) => {
                let srcTmp = item
                this.position.push(srcTmp)
            })

            // let timeData = await d3.json("timeAllJson.json")
            // this.calendarPosition = this.calendarLayout(timeData)

            this.gridPos = this.gridLayout(data.length, this.itemSize, this.gridWidth, this.gridHeight)

            let newpic = this.$store.state.pic.map((item,index)=>{
                return {
                    ...item,
                    pos:this.gridPos[index]
                }
            })
            let StaticCanvas = d3.select("#canvasContainer");

            let imageAll =  await this.drawCanvas(newpic,StaticCanvas)
            console.log(imageAll)
            this.animateCanvas(imageAll,StaticCanvas)


            // console.log(12324)
            // console.log(gridPos)
            // this.upDateLayout(this.gridPos)

        },
        data() {
            return {
                position: [],
                pic: '',
                itemSize: 18,
                gridPos: '',
                calendarPosition: '',
                gridPos2: [],
                imageAll:[]
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

    .map {
        display: inline-block;
        position: absolute;
    }

    .sm-trans-move {
        transition: transform 1s;
    }
</style>