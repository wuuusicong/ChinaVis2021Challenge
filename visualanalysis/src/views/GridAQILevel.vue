<template>
    <div ref="layout" class="layoutContainer">

        
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
            <svg id="mainSvg" style='top:0;left: 0'></svg>
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
                }else if(newV =='t-sne'){
                    this.t_sne()
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
                    .paddingOuter(3)
                    .paddingTop(19)
                    .paddingInner(1)
                    .round(true);
                const root = d3.hierarchy(tree_Data).sum(d=>d.AQI);                
                const tree = treemap(root)
                console.log(tree)
                console.log("node?")
                const color = d3.scaleOrdinal(d3.schemeCategory10);
                //头结点
                // let nodeSvg = $("<svg id='GridNode' class='map' style='top: 0;left: 0;'></svg>")
                // $('.transContainer').append(nodeSvg)
                // $("#GridNode").attr("width",tree["x1"]-tree["x0"])
                //                 .attr("height",tree["y1"]-tree["y0"])
                //                 .attr("background",'#000')
                let node2 = d3.select("#mainSvg")
                .selectAll(".node2")
                .data(tree.children)
                .enter()
                .append("g")
                .attr("transform", d => `translate(${d.x0},${d.y0})`);
                node2
                .append("rect")
                .attr("fill", d => '#e86161')
                .attr("width", d => d.x1 - d.x0)
                .attr("height", d => d.y1 - d.y0);
                node2.append("text")
                    .attr("class",".node2Text")
                    .attr("dy",15)
                    .text(d => d.data.name);
                // tree.children.forEach((item,index)=>{
                //     let itemID = 'GridNode'+index
                //     let node2Svg = $("<svg class='map2'></svg>")
                //     node2Svg.id = itemID;
                //     $(itemID).attr("width",item["x1"]-item["x0"])
                //         .attr("height",item["y1"]-item["y0"])
                //         .attr("top",item["y0"])
                //         .attr("left",item["x0"]);
                //     $('.transContainer').append(node2Svg)
                // })

                const leaves = tree.leaves()                
                let treePos = []

                console.log("tree??")
                console.log(d3.group(root, d => d.height))
                if(this.itemType==='rect'){
                    console.log(leaves)

                    leaves.forEach((item,index)=>{


                        treePos[item["data"]["index"]] = [item.x0,item.y0]
                        let imgId = '#img'+item["data"]["index"]
                        let gridId = '#grid'+item["data"]["index"]


                        // d3.select(imgId).append("text")
                        //     .text(d=>item["data"]["name"])
                        //     .attr("dy",15);


                        let imgSize = d3.min([(item.x1-item.x0),(item.y1-item.y0)])
                        // console.log($(imgId))

                        let tmpWidth = item.x1-item.x0-1;
                        let tmpHeight = item.y1-item.y0-1;
                        $(imgId).attr("width",tmpWidth)
                        $(imgId).attr("height",tmpHeight)
                        $(gridId).attr("fill",color(item.parent.data.name))
                        $(gridId).attr("width",tmpWidth)
                        $(gridId).attr("height",tmpHeight+10)
                    })
                }else {
                    leaves.forEach((item,index)=>{
                        treePos[item["data"]["index"]] = [item.x0,item.y0]
                        let imgId = '#img'+item["data"]["index"]
                        let gridId = '#grid'+item["data"]["index"]


                        // d3.select(gridId).append("text")
                        // .text(d=>item["data"]["name"])
                        //     .attr("dy",15)
                        //     .attr("fontSize",5);



                        let imgSize = d3.min([(item.x1-item.x0),(item.y1-item.y0)])
                        // console.log($(imgId))
                        $(imgId).attr("width",imgSize)
                        $(imgId).attr("height",imgSize)
                        $(gridId).attr("fill",color(item.parent.data.name))
                        $(gridId).attr("width",imgSize)
                        $(gridId).attr("height",imgSize+10)
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
                d3.selectAll(".map")
                    .attr("width",this.itemSize)
                    .attr("height",this.itemSize);

                d3.selectAll(".map")
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
                d3.selectAll(".map")
                    .append("image")
                    .attr("id",(item,index)=>'img'+index)
                    .attr("x",0)
                    .attr("y",0)
                    .attr("width",this.itemSize)
                    .attr("height",this.itemSize)
                    .attr("xlink:href",(item,index)=>this.$store.state.pic[index].src)
            },
            clearSvg(){
                d3.selectAll("svg>*")
                    .remove();
            },

            upDateLayout(PosData) {
                if(this.layoutCategory!=='tree'){
                    this.clearSvg()
                }
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
    .map2 {
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
    #mainSvg{
        height: 100%;
        width: 100%;
    }
    .layoutContainer{
        position: relative;
        width: 100%;
        height: 100%;
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