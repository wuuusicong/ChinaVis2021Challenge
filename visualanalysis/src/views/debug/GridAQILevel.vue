<template>
    <div class="map-container">
        <transition-group name="sm-trans" tag="div" class="transContainer">
            <svg v-for="item in this.$store.state.pic" class="map" :id="item.id" v-bind:key="item.id"
                v-bind:style="{top:item.pos[1]+'px',left:item.pos[0]+'px'}"
                 :width="itemSize" :height="itemSize"
                 >
<!--                <image :xlink:href="item.src"  :width="itemSize" :height="itemSize" :id="item.imgId" />-->
            </svg>
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
            
            drawMap(mapId,data){
                let mapG = d3.select(mapId)

                // mapG.append("rect")
                // console.log(svg)
                // let mapG = svg.append('g')
                    // .attr("transform", `translate(${x},${y})`);

                // let projection = d3.geoMercator()
                //     .center([107,31])
                //     .scale(50)
                //     .translate([itemSize/2,itemSize/2])
                let projection = d3.geoMercator()
                    .fitSize([this.itemSize,this.itemSize],data)

                const path = d3.geoPath().projection(projection)

                mapG.selectAll('g')
                    .data(data.features)
                    .enter()
                    .append("g")
                    .append('path')
                    .attr('d', path)
                    .attr('stroke', '#272823')
                    .attr('stroke-width', 1)
                    .attr('opacity', 0.6)
                // .attr('fill', function(d, i) {
                //     return color[i % 10];
                // })
            },
            
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

            let mapData = await d3.json("china.json")
            data.forEach((item,index) => {
                let itemID = '#grid'+index
                // console.log(d3.select(itemID))
                if(index>600)return
                this.drawMap(itemID,mapData)
            })


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
        height: 100%;
        /*flex-wrap: wrap;*/
    }

    .map {
        display: inline-block;
        position: absolute;
    }

    .sm-trans-move {
        transition: transform 1s;
    }
    .itemImg{
        margin: auto;
    }
</style>