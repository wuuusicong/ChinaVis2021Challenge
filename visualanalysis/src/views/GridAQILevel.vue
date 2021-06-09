<template>
    <div ref="layout" class="layoutContainer" id="layout">

        
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
                <svg v-for="item in this.pic" class="map" :id="item.id" v-bind:key="item.id"
                    :style="{top:item.pos[1]+'px',left:item.pos[0]+'px'}"
                     :width="itemSize" :height="itemSize"
                     :data-date="item.date" @click="itemSelect"
                     :data-number = "item.number"
                     :data-src = "item.src"
                >
                <!-- <div v-for="item in pic" class="map" :id="item.id" v-bind:key="item.id"
                    :style="{transform:'translate('+item.pos[0]+'px,'+item.pos[1]+'px)'}"> -->
                    <image :xlink:href="item.src"  :width="itemSize" :height="itemSize"
                           @mousemove="showItemDate"
                           @mouseout="showNoItemDate"
                           :data-date="item.date" @click="itemSelect"
                           :data-number = "item.number"
                           :data-src = "item.src"
                           :id="item.imgId" class="mapImg"/>
                </svg>
            </transition-group>            
        </div>
    </div>

</template> 

<script>
    import * as d3 from "d3"
    import * as $ from 'jquery'
    import _ from "loadsh"
    import tree_Data from '@/assets/treeData/barChatTree_v2.json'
    import AQI_img from '@/assets/AQIImg.json'
    export default {
        name: "GridAQILevel",
        props: ['layoutCategory','pic'],
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
                }else if(newV =='bar'){
                    this.barLayout()
                }
            }
        },
        methods: {
            initLayout(){
                this.gridWidth = 1453;
                this.gridHeight = 840;

                let initItemPos = [this.gridWidth/2-30,this.gridHeight/2]
                let initPos = AQI_img.map((item,index)=>initItemPos)
                this.upDateLayout(initPos)
            },
            gridLayout(dataNum, itemSize, width=this.gridWidth, height=this.gridHeight, padding = {
                widthGap: 10,
                heightGap: 2
            }) {
                let itemNum = parseInt(width / (itemSize + padding["widthGap"]))
                let gridPos = []
                new Array(dataNum).fill('').forEach((item, index) => {
                    let tmp = []
                    tmp[0] = (index % itemNum) * (itemSize + padding["widthGap"]) + padding["widthGap"] / 2 +15
                    tmp[1] = (parseInt(index / itemNum)) * (itemSize + padding["heightGap"]) + padding[
                        "heightGap"]+20
                    gridPos.push(tmp)
                })
                return gridPos
            },
            treeLayout: function (){         
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
                .attr("class","treeLayoutG")
                .attr("transform", d => `translate(${d.x0},${d.y0})`);
                node2
                .append("rect")
                // .attr("fill", d => 'white')
                .attr("stroke", d => 'white')
                .attr("width", d => d.x1 - d.x0)
                .attr("height", d => d.y1 - d.y0);
                node2.append("text")
                    .attr("class",".node2Text")
                    .attr("dy",15)
                    .text(d => d.data.name)
                    .attr("fill","white")
                    .attr("font-size",10);
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
                console.log("treeData")
                console.log(tree_Data)
                console.log(leaves)
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
                        $(gridId).attr("height",tmpHeight)
                        // $(gridId).css("border","solid")
                        // $(gridId).css("border-color","black")
                        // $(gridId).css("border-width","0.5")
                    })
                }else {
                    leaves.forEach((item,index)=>{
                        treePos[item["data"]["index"]] = [item.x0,item.y0]
                        let imgId = '#img'+item["data"]["index"]
                        let gridId = '#grid'+item["data"]["index"]


                        let tmpWidth = item.x1-item.x0-1;
                        let tmpHeight = item.y1-item.y0-1;

                        let imgSize = d3.min([(item.x1-item.x0),(item.y1-item.y0)]) -2
                        // console.log($(imgId))
                        $(imgId).attr("width",imgSize)
                        $(imgId).attr("height",imgSize)
                        $(gridId).attr("fill",color(item.parent.data.name))
                        $(gridId).attr("width",tmpWidth)
                        $(gridId).attr("height",tmpHeight)
                        $(gridId).css("border","solid")
                        $(gridId).css("border-width",1)
                        $(gridId).css("border-color","white")
                    })
                }

                this.upDateLayout(treePos)
                // console.log(treemap)
            },

            calendarLayout(timeData, padding = {
                widthGap: 10,
                heightGap: 2
            }) {
                let tmpYears = d3.groups(timeData, d => new Date(d).getUTCFullYear())
                let calendarPos = []
                let mainSvg =  d3.select("#mainSvg");

                let containerWidth = this.$refs.layout.offsetWidth;
                let leftOffset = (containerWidth - 954) / 2;
                this.calendarYears = tmpYears.map((v)=>{return v[0]})
                let sum =0
                const days = [0,1,2,3,4,5,6]
                const dayEng = ["S","M","T","W","T","F","S"]
                for (let i in tmpYears) {
                    let yearGap = (this.itemSize + 2) * 7 * parseInt(i) + 20
                    tmpYears[i][1].forEach((item2) => {
                        let tmp = []
                        tmp[0] = d3.utcSunday.count(d3.utcYear(new Date(item2)), new Date(item2)) * (this
                            .itemSize) + leftOffset+new Date(item2).getMonth()*7;

                        // console.log(new Date(item2).getMonth()+1)
                        tmp[1] = new Date(item2).getUTCDay() * this.itemSize + padding["heightGap"] + yearGap
                        calendarPos.push(tmp)
                        // console.log(sum)
                        // console.log(new Date(item2).getUTCDay())
                        sum++;
                    })

                    mainSvg .selectAll(".dateEng")
                      .data(days)
                      .enter()
                      .append("text")
                      .attr("class","calendarG")
                      .text((d,i)=>dayEng[d])
                      .attr("x",(d,i)=>220)
                      .attr("y",(d,i)=>d * this.itemSize + padding["heightGap"] + yearGap)
                      .attr("dy",12)
                      .attr("font-size",10)
                      .attr("stroke","white");


                }
                return calendarPos
            },
            grid() {
                console.log(this.pic)
                // this.gridWidth = this.$refs.layout.offsetWidth;
                // this.gridHeight = this.$refs.layout.offsetHeight;
                this.gridWidth = 1453;
                this.gridHeight = 840;

                //加载图像
                let data = AQI_img
                data.forEach((item) => {
                    let srcTmp = item
                    this.position.push(srcTmp)
                })
                console.log('dd')
                let itemSize = this.itemSize
                let gridPos = this.gridLayout(data.length, itemSize, this.gridWidth, this.gridHeight)
                this.upDateLayout(gridPos);
                // this.upDateLayout(this.gridPos)
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
                this.upDateLayout(calendarPos);
                // this.calendarAnimate();
            },
            calendarAnimate(){
                let initId = 0
                let grid="grid";
                d3.selectAll(".map")
                 .attr("opacity",0.2)
              setInterval(function () {
                    let id = '#'+grid+initId;
                    let preId = '#'+grid+(initId-1);
                  d3.select(preId)
                      .attr("opacity",0.2);
                    d3.select(id)
                      .attr("opacity",1);
                    initId+=1;
              },10)
            },
            barLayout: async function(){
                let data = this.$store.state.barData
                const svg = d3.select("#mainSvg");
                let width = this.gridWidth;
                let height = this.gridHeight;
                let margin = ({top: 20, right: 0, bottom: 10, left: 40})
                let x = d3.scaleBand()
                    .domain(data.map(d => d.name))
                    .range([margin.left, width - margin.right])
                    .padding(0.1);
                let y = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.value)]).nice()
                    .range([height - margin.bottom, margin.top]);
                let y2 = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.value)]).nice()
                    .range([ margin.top,height - margin.bottom]);
                // yAxis = g => g
                //     .attr("transform", `translate(${margin.left},0)`)
                //     .call(d3.axisLeft(y))
                //     .call(g => g.select(".domain").remove())

                const bar = svg.append("g")
                    .attr("fill", "steelblue")
                    .selectAll("rect")
                    .data(data)
                    .join("rect")
                    .style("mix-blend-mode", "multiply")
                    .attr("x", d => x(d.name))
                    .attr("y", d => y(d.value))
                    .attr("height", d => y(0) - y(d.value))
                    .attr("width", 40);


                let eventData = this.eventData;
                for (let item in eventData){
                    const name = eventData[item]["type"];
                    console.log()
                }
                let polu = {}
                data.forEach((item,index)=>polu[item["name"]]=item["value"])
                // let polu = {'PM2.5':0, 'PM10':0, 'CO':0, 'O3':0, 'NO2':0};
                let sum=0;
                let gridPos = this.$store.state.dateArray.map((item,index)=>{
                    let tmp = [];
                    let type = eventData[item]["type"]

                    tmp[0] = x(type)+this.itemSize*(sum%20);

                    tmp[1] =y(polu[type])-this.itemSize;
                    // if(sum===20){
                    //     polu[type]-=1;
                    //     sum=0;
                    // }
                    polu[type]-=1
                    sum+=1;
                    return tmp
                })
                this.upDateLayout(gridPos)
                // const gx = svg.append("g")
                //     .call(xAxis);

                // const gy = svg.append("g")
                //     .call(yAxis);
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
            itemPieChart:async function (){
                d3.selectAll(".map>*")
                    .remove();
                d3.selectAll(".map")
                    .attr("width",this.itemSize)
                    .attr("height",this.itemSize);
                let data = await d3.json("PieChartData.json")
                console.log("pieChartData")
                console.log(data)
                d3.select("#pieChart")
                .attr("width",150)
                .attr("height",50)
                let legendData = data[0]["AQI"]
                let colorScale = d3
                    .scaleOrdinal()
                    .domain(d3.range(0, legendData.length))
                    .range(d3.schemeSet1);
                let legend = d3.select("#pieChart").append('g')
                    .selectAll('g')
                    .data(data[0]["AQI"])
                    .enter()
                    .append('g')
                    .attr('transform', function(d, i) {
                        return 'translate(' + i *18 + ',0)'
                    });
                legend
                    .append('rect')
                    .attr('width', 10)
                    .attr('height', 10)
                    .attr('fill', function(d,index) {
                        console.log(d)
                        return colorScale(index)
                    });
                legend
                    .append('text')
                    .text(function(d) {
                        console.log(d)
                        return d.x
                    })
                    .style('font-size', 8)
                    .attr('y', '3em')
                    .attr('x', '0')
                    .attr('dy', 3)
                    .attr("stroke","white")
                    .attr("stroke-width","1px");




                data.forEach((item,index)=>{
                    let svgId = '#grid'+index;
                    let svg = d3.select(svgId)
                    this.drawOnePie(svg,item["AQI"])
                })

            },
            drawOnePie(svg,data){
              // const [width,height]= this.itemSize;
              let g = svg.append("g")
                  .attr('transform', 'translate( 5, 5 )');
              let radius = this.itemSize*0.8/3;
              let arc = d3.arc()
                    .innerRadius(8)
                    // .outerRadius(radius)
                    .cornerRadius(5);
                let drawData = d3
                    .pie()
                    .value(function(d) {
                        return d.y
                    })
                    .sort(null)
                    .sortValues(null)
                    .startAngle(0)
                    .endAngle(Math.PI * 2)
                    .padAngle(0.05)(data);
                let colorScale = d3
                    .scaleOrdinal()
                    .domain(d3.range(0, data.length))
                    .range(d3.schemeSet1);
                g.append('g')
                    .attr('transform', 'translate( ' + radius + ', ' + radius + ' )')
                    .attr('stroke', 'steelblue')
                    .attr('stroke-width', 1)
                    .selectAll('path')
                    .data(drawData)
                    .enter()
                    .append('path')
                    .attr('fill', function(d) {
                        return colorScale(d.index)
                    })
                    .attr('d', function(d) {
                        d.outerRadius = radius;
                        return arc(d)
                    })

            },
            clearSvg(){
                if(this.layoutCategory!=='tree'){
                    d3.selectAll(".treeLayoutG")
                        .remove();
                    d3.selectAll(".map")
                        .attr("width",this.$store.state.itemSize)
                        .attr("height",this.$store.state.itemSize)
                        .attr("border","none");
                    d3.selectAll(".mapImg")
                        .attr("width",this.$store.state.itemSize)
                        .attr("height",this.$store.state.itemSize);
                }
                if(this.layoutCategory!=='calendar'){
                    d3.selectAll(".calendarG")
                        .remove();
                }

            },
            barChartLayout(data,width,height){
                let y = data["type"]
                let x = data["number"]
            },
            upDateLayout(PosData) {
                this.clearSvg()
                this.pic = this.pic.map((item, index) => {
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


        //    item 交互
            itemSelect(e){
                // console.log(e.currentTarget.dataset);
                // console.log(e.currentTarget.id);
                const itemID = '#'+e.currentTarget.id
                const itemNum = parseInt(e.currentTarget.dataset["number"])
                // console.log(itemNum)
                // console.log( e.currentTarget.dataset["dataset"])
                this.eventData[e.currentTarget.dataset["date"]].select = 1;
                // this.springFestival()
                // this.itemStyleShow(itemID,itemNum)
            },
            showItemDate(e){
                $("#tooltip>*").remove();
                $("#tooltip").text("")
                let src = e.currentTarget.dataset["src"]
                let date = e.currentTarget.dataset["date"]
                var x = e.pageX;
                var y = e.pageY + 30;
                let img = document.createElement("img")
                img.src = src;
                img.width = this.itemSize*10
                img.height = this.itemSize*10
                // console.log(date)
                $("#tooltip").text(date);
                $("#tooltip").append(img)

                $("#tooltip") .css("left",x+"px")
                    .css("top",y+"px")
                    .css("opacity",1.0);
            },
            showNoItemDate(e){
                $("#tooltip>*").remove();
                $("#tooltip").text("")
            },
            itemStyleShow(itemId,itemNum){

                this.currentOpacity = this.currentOpacity.map((item,index)=>
                {
                    // if(item===1)return 1
                    let opacity = 0.2;
                    // console.log(this.eventData[item["date"]])
                    if(this.eventData[item["date"]].select===1)opacity =1
                    if(index===itemNum)opacity =1 ;
                    return  {...item,opacity:opacity};
                }
                )
                // console.log(this.currentOpacity)
                this.opacityShow()
            },
            springFestival(event,eventType){
                // let event = "Spring Festival";
                if(event ==="SF"){
                    event = "Spring Festival";
                }
                console.log(event);
                this.currentOpacity = this.currentOpacity.map((item,index)=>{
                    if(this.eventData[item["date"]][eventType][event]===1){
                        return {...item,opacity:1}
                    }else return {...item,opacity: 0.2}
                })

                console.log(this.currentOpacity)
                this.opacityShow();
            },
            opacityShow(){
                let that = this;
                // console.log("click")
                // console.log(this.currentOpacity)
                d3.selectAll(".map")
                .attr("opacity",(item,index)=>that.currentOpacity[index]["opacity"])
            }

        },
            mounted() {
            this.grid()

        },
        data() {
            return {
                show: true,
                calendarYears: [],
                position: [],
                itemSize: 18,
                gridPos: '',
                gridPos2: [],
                itemType:'',
                currentOpacity:this.$store.state.opacityGroup,
                eventData:this.$store.state.eventData
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

    .sm-trans-move{
        transition: transform 2s ;
    }
    /*.sm-trans-active, .sm-trans-active {*/
    /*    transition: all 1s;*/
    /*}*/
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
    .calendarG{
        color: white;
    }


    .changeLayout:hover {
        background-color: #eee;
    }
    /*#itemRect{*/
    /*    background: black;*/
    /*}*/

    .mouth{
        margin: 0 auto;
        width: 1000px;
        display: flex;
        justify-content: space-around;
        margin-left: 250px;
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
    /*.mapImg,.map{*/
    /*    transition: width 2s, height 2s, transform 2s;*/

    /*}*/
    .mapImg{
        margin: auto;
    }

</style>