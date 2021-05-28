<template>
    <div ref="layout">
        <div class="btn-container">
            <span>layout:</span>
            <button class="btn" @click="grid">grid</button>
            <button class="btn" @click="shuffle">shuffle</button>
            <button class="btn" @click="calendar">calendar</button>
            <button class="btn" @click="t_sne">t_sne</button>
        </div>

        <div class="SmallMultiple">
            <transition-group name="sm-trans" tag="div" class="transContainer">
                <div v-for="item in pic" class="map" :id="item.id" v-bind:key="item.id"
                    v-bind:style="{top:item.pos[1]+'px',left:item.pos[0]+'px'}">
                    <img :src="item.src" :width="itemSize" :height="itemSize">
                </div>
            </transition-group>
        </div>
    </div>

</template>

<script>
    import * as d3 from "d3"
    import * as $ from 'jquery'
    import _ from "loadsh"
    export default {
        name: "GridAQILevel",        
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

            calendarLayout(timeData, padding = {
                widthGap: 10,
                heightGap: 2
            }) {
                let tmpYears = d3.groups(timeData, d => new Date(d).getUTCFullYear()).reverse()
                let calendarPos = []
                for (let i in tmpYears) {
                    let yearGap = (this.itemSize + 2) * 7 * parseInt(i) + 20
                    tmpYears[i][1].forEach((item2) => {
                        let tmp = []
                        tmp[0] = d3.utcSunday.count(d3.utcYear(new Date(item2)), new Date(item2)) * (this
                            .itemSize);
                        tmp[1] = new Date(item2).getUTCDay() * this.itemSize + padding["heightGap"] + yearGap
                        calendarPos.push(tmp)
                    })
                }
                return calendarPos
            },
            grid(){
                this.upDateLayout(this.gridPos)
            },
            t_sne: async function () {
                let t_sneData = await d3.json("PCA50-t-sne_AQI.json")
                let t_snePos = t_sneData.map((item) => {
                    return [item[0] * this.gridWidth, item[1] * this.gridHeight, ]
                })
                this.upDateLayout(t_snePos)
            },
            calendar: async function () {
                let formatDate = d3.utcFormat("%x")
                let timeData = await d3.json("timeAllJson.json")
                let calendarPos = this.calendarLayout(timeData)
                this.upDateLayout(calendarPos)
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

            upDateLayout(PosData) {
                this.PosData
                this.pic = this.$store.state.pic.map((item, index) => {
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
        // async mounted() {
        //     this.gridWidth = this.$refs.layout.offsetWidth;
        //     this.gridHeight = this.$refs.layout.offsetHeight;
        //     //加载图像
        //     let data = await d3.json("AQIImg.json")
        //     data.forEach((item) => {
        //         let srcTmp = item
        //         this.position.push(srcTmp)
        //     })
        //     this.gridPos = this.gridLayout(data.length, this.itemSize, this.gridWidth, this.gridHeight)
        //     this.upDateLayout(this.gridPos)            
        // },
        data() {
            return {
                position: [],
                itemSize: 18,
                pic: '',
                gridPos: '',                
                gridPos2: []
            };
        },
    }
</script>

<style scoped>
    .map {
        display: inline-block;
        position: absolute;
    }

    .sm-trans-move {
        transition: transform 1s;
    }

    .btn-container {
        box-sizing: border-box;
        padding: 10px 10px;
        height: 100px;
    }

    .SmallMultiple{
        position: relative;
    }

    .btn{
        display: inline-block;
        width: 70px;
        height: 30px;
        /* padding: 3px 3px; */
        margin: 0px 5px;
    }
</style>