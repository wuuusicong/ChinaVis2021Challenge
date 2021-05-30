<template>
    <div class="map-container">
        <transition-group name="sm-trans" tag="div" class="transContainer">
            <div v-for="item in this.$store.state.pic" class="map" :id="item.id" v-bind:key="item.id"
                v-bind:style="{top:item.pos[1]+'px',left:item.pos[0]+'px'}">
                <img :src="item.src" :width="itemSize" :height="itemSize">
            </div>
        </transition-group>
        

    </div>

</template>

<script>
    import * as d3 from "d3"
    import * as $ from 'jquery'
    import _ from "loadsh"
    export default {
        name: "GridAQILevel",
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
            // console.log(12324)
            // console.log(gridPos)
            this.upDateLayout(this.gridPos)

        },
        data() {
            return {
                position: [],
                pic: '',
                itemSize: 18,
                gridPos: '',
                calendarPosition: '',
                gridPos2: []
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