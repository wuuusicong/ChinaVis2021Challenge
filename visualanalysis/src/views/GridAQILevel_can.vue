<template>
    <canvas id="canvasContainer" :width="gridWidth" :height="gridHeight"></canvas>
</template>

<script>
    import * as d3 from "d3"
    import * as $ from 'jquery'
    import _ from "loadsh"
    import {fabric} from "fabric"
    export default {
        name: "GridAQILevel_can",
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
              // imageAll.forEach((item,index)=>console.log(index))
                imageAll.forEach((item,index)=>{
                    console.log(item)
                    item.animate('left',200,{
                        onChange:function render(){
                            console.log("animate??")
                            if(item.lastAdd){
                                fabric.util.requestAnimFrame(render)
                                StaticCanvas.renderAll()
                            }
                        },
                        duration:2000,
                        easing: fabric.util.ease.easeInOutCubic,
                    })
                    item.animate('top',500,{
                        easing: fabric.util.ease.easeInOutCubic,
                        duration:2000
                    })
                })
            },
            // var ctx=canvas.getContext("2d")

            // var rect = new fabric.Rect({
            //     top : item.pos[1],
            //     left : item.pos[0],
            //     width : this.itemSize,
            //     height : this.itemSize,
            //     fill : 'red'
            // });
            // StaticCanvas.add(rect);
            loadImage(pic,item,index) {
                let that = this;
                return new Promise((resolve, reject) => {

                    let imgObj = new Image()
                    imgObj.src = item.src;
                    imgObj.onload = function () {
                        let image2 = new fabric.Image(imgObj);
                        image2.set({
                            top: item.pos[1],
                            left: item.pos[0],
                        })
                        image2.lastAdd = index === (pic.length-1)
                        // console.log(image2)
                        image2.scaleToWidth(that.itemSize)
                        image2.scaleToHeight(that.itemSize)
                        // image2.filters.push(new fabric.Image.filters.Resize({scaleX: 0.2, scaleY: 0.2}));
                        // image2.applyFilters(StaticCanvas.renderAll.bind(StaticCanvas));
                        // StaticCanvas.add(image2);
                        resolve(image2)
                    }
                })
            },
            async drawCanvas(pic,StaticCanvas){
                let that = this;
                let imageAll = []
                console.log(pic)

                let proAll = []
                pic.forEach((item,index)=>{
                    // console.log(1234)
                    proAll.push(this.loadImage(pic,item,index))
                    // console.log(12345)
                    // console.log(image2)

                })
                let results = await Promise.all(proAll)
                results.forEach((item,index)=>StaticCanvas.add(item))
                imageAll.push(results)
                console.log(555)
                console.log(results)
                return results
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
            let StaticCanvas = new fabric.StaticCanvas('canvasContainer');

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