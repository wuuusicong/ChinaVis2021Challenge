<template>
    <div ref="layout" class="layoutContainer">
        <div class="btn-container">
            <span>layout:</span>                   
            <!-- <button class="changeLayout" @click="calendar">calendar</button> -->
            <button class="changeLayout" @click="t_sne">t_sne</button>            
            <button class="changeLayout" @click="itemRect">rect</button>
            <button class="changeLayout" @click="itemMap">Map</button>
        </div>
        
        <div class="mouth" v-if="layoutCategory == 'calendar'">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>June</span>
            <span>July</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
        </div>
        
        <div class="SmallMultiple" v-show="show">
            <div class="year" v-if="layoutCategory == 'calendar'">
                <template v-for="year in calendarYears">
                    <span>{{year}}</span>
                </template>
            </div>
            <transition-group name="sm-trans" tag="div" class="transContainer">
                <svg v-for="item in pic" class="map" :id="item.id" v-bind:key="item.id"
                    :style="{top:item.pos[1]+'px',left:item.pos[0]+'px'}"
                     :width="itemSize" :height="itemSize"
                >
                <!-- <div v-for="item in pic" class="map" :id="item.id" v-bind:key="item.id"
                    :style="{transform:'translate('+item.pos[0]+'px,'+item.pos[1]+'px)'}"> -->
                    <image :xlink:href="item.src"  :width="itemSize" :height="itemSize" :id="item.imgId" />
                </svg>
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
        props: ['layoutCategory'],
        watch: {
            layoutCategory(newV){
                if(newV == 'tree'){
                    this.treeLayout()
                }else if(newV == 'grid'){
                    this.grid()
                }else if(newV == 'calendar'){
                    this.calendar()
                }
            }
        },
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
            treeLayout: async function (){
                let tree_Data = await d3.json("treeDataNew.json")                
                let padding = {"left":20,"top":20}
                const treemap = d3.treemap()
                    .tile(d3.treemapBinary)
                    .size([this.$refs.layout.offsetWidth,this.$refs.layout.offsetHeight])
                const root = d3.hierarchy(tree_Data).sum(d=>d.AQI);                
                const tree = treemap(root)
                const leaves = tree.leaves()                
                let treePos = []
                const color = d3.scaleOrdinal(d3.schemeCategory10);
                if(this.itemType==='rect'){

                    leaves.forEach((item,index)=>{
                        treePos[item["data"]["index"]] = [item.x0,item.y0]
                        let imgId = '#img'+item["data"]["index"]
                        let gridId = '#grid'+item["data"]["index"]
                        let imgSize = d3.min([(item.x1-item.x0),(item.y1-item.y0)])
                        // console.log($(imgId))
                        let tmpWidth = item.x1-item.x0-1;
                        let tmpHeight = item.y1-item.y0-1;
                        $(imgId).attr("width",tmpWidth)
                        $(imgId).attr("height",tmpHeight)
                        $(gridId).attr("fill",color(item.parent.data.name))
                        $(gridId).attr("width",tmpWidth)
                        $(gridId).attr("height",tmpHeight)
                    })
                }else {
                    leaves.forEach((item,index)=>{
                        treePos[item["data"]["index"]] = [item.x0,item.y0]
                        let imgId = '#img'+item["data"]["index"]
                        let gridId = '#grid'+item["data"]["index"]
                        let imgSize = d3.min([(item.x1-item.x0),(item.y1-item.y0)])
                        // console.log($(imgId))
                        $(imgId).attr("width",imgSize)
                        $(imgId).attr("height",imgSize)
                        $(gridId).attr("fill",color(item.parent.data.name))
                        $(gridId).attr("width",imgSize)
                        $(gridId).attr("height",imgSize)
                    })
                }

                this.upDateLayout(treePos)
                // console.log(treemap)
            },

            calendarLayout(timeData, padding = {
                widthGap: 10,
                heightGap: 2
            }) {
                let tmpYears = d3.groups(timeData, d => new Date(d).getUTCFullYear()).reverse()
                let calendarPos = []
                let containerWidth = this.$refs.layout.offsetWidth;
                let leftOffset = (containerWidth - 954) / 2;
                this.calendarYears = tmpYears.map((v)=>{return v[0]})
                for (let i in tmpYears) {
                    let yearGap = (this.itemSize + 2) * 7 * parseInt(i) + 20
                    tmpYears[i][1].forEach((item2) => {
                        let tmp = []
                        tmp[0] = d3.utcSunday.count(d3.utcYear(new Date(item2)), new Date(item2)) * (this
                            .itemSize) + leftOffset;
                        tmp[1] = new Date(item2).getUTCDay() * this.itemSize + padding["heightGap"] + yearGap
                        calendarPos.push(tmp)
                    })
                }
                return calendarPos
            },
            grid() {
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

            itemRect: function () {
                // console.log("动画？？")
                d3.selectAll("svg>*")
                    .remove();
                d3.selectAll("svg")
                    .attr("width",this.itemSize)
                    .attr("height",this.itemSize);

                d3.selectAll("svg")
                    .append("rect")
                    .attr("id",(item,index)=>'img'+index)
                    .attr("width",this.itemSize)
                    .attr("height",this.itemSize)
                    .attr("x",0)
                    .attr("y",0);
                this.itemType = 'rect';
                console.log(this.itemType)
                // this.drawSM(this.newGridPos)
            },
            itemMap:function (){
                d3.selectAll("svg>*")
                    .remove();
                d3.selectAll("svg")
                    .append("image")
                    .attr("id",(item,index)=>'img'+index)
                    .attr("x",0)
                    .attr("y",0)
                    .attr("width",this.itemSize)
                    .attr("height",this.itemSize)
                    .attr("xlink:href",(item,index)=>this.$store.state.pic[index].src)
            },

            upDateLayout(PosData) {
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
        async mounted() {
            this.gridWidth = this.$refs.layout.offsetWidth;
            this.gridHeight = this.$refs.layout.offsetHeight;
            //加载图像
            let data = await d3.json("AQIImg.json")
            data.forEach((item) => {
                let srcTmp = item
                this.position.push(srcTmp)
            })
            console.log('dd')
            this.gridPos = this.gridLayout(data.length, this.itemSize, this.gridWidth, this.gridHeight)
            this.upDateLayout(this.gridPos)
        },
        data() {
            return {
                show: true,
                calendarYears: [],
                position: [],
                itemSize: 18,
                pic: '',
                gridPos: '',
                gridPos2: [],
                itemType:''
            };
        },
    }
</script>

<style scoped>
    .map {
        display: inline-block;
        will-change: top,left;
        /* transform: translateZ(0); */
        position: absolute;
    }

    .sm-trans-move {
        transition: transform 1s;
    }

    .btn-container {
        box-sizing: border-box;
        padding: 10px 10px;
        height: 60px;
    }

    .SmallMultiple {
        position: relative;
        height: 100%;
    }
    .layoutContainer{
        position: relative;
        width: 100%;
        height: 100%;
    }

    .changeLayout {
        display: inline-block;
        width: 70px;
        height: 30px;
        border: 1px solid #aaa;
        border-radius: 4px;
        /* padding: 3px 3px; */
        margin: 0px 5px;
    }

    .changeLayout:hover {
        background-color: #eee;
    }
    /*#itemRect{*/
    /*    background: black;*/
    /*}*/

    .mouth{
        margin: 0 auto;
        width: 954px;
        display: flex;
        justify-content: space-around;
    }

    .year{
        position: absolute;
        left: 20px;
        display: flex;
        flex-direction: column;
    }

    .year span{
        height: 145px;
        line-height: 145px;
        text-align: center;
    }
</style>