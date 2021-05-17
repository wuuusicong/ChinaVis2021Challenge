<template>
    <div id="svgContainer">
        <canvas id="draw_SM">
        </canvas>
    </div>
</template>

<script>
    import * as d3 from "d3";

    export default {
        props:['mapJsonData','svgSizeData'],
        name: "SmallMultiples",
        methods:{
            async loadDataDrawMap(){
                let data = await d3.json("china.json")
                let colNum = 12
                let rowNum = 6
                // console.log(this.svgSizeData['svgWidth'])
                let itemSize = this.svgSizeData['svgWidth']/colNum;
                let canvas = document.getElementById('draw_SM')
                console.log(canvas)
                console.log(123)
                const ctx = canvas.getContext('2d')
                // ctx.fillStyle="#FF0000";
                // ctx.fillRect(0,0,150,75);
                this.drawCanvasMap(100,data,ctx)
                // let gridLayoutPos =  this.gridLayout(this.svgSizeData['svgWidth'],this.svgSizeData['svgHeight'])
                //                          .forEach((item)=>this.drawMap(item[0],item[1],item[2],data))
            },
            gridLayout(width,height){
                let gridPos = [];
                let colNum = 100
                let rowNum = 6
                let itemXPadding = 2
                let itemSize= width/colNum

                let itemYPadding = (height/(rowNum))-itemSize
                for (let i=0;i<rowNum;i++){
                    for(let j=0;j<colNum;j++){
                        gridPos.push([j*itemSize,i*itemSize+itemYPadding,itemSize])
                    }
                }
                return gridPos
            },
            drawCanvasMap(itemSize=870,data,canvasContext){
                var projection = d3.geoMercator().fitExtent([
                    [0, 0],
                    [1430, itemSize]
                ], data); // 设置经纬度转换


                const path = d3.geoPath()
                            .projection(projection)
                            .context(canvasContext);
                    const features = data.features;
                    const color = '#3399cc'
                    features.forEach((element) => {
                        console.log(element)
                        canvasContext.beginPath();
                        canvasContext.fillStyle = color;
                        canvasContext.fill()
                        canvasContext.stroke();
                        path(element);
                    });
                console.log("mapCanvas?")
            },
            drawSvgMap(x,y,itemSize,data){
                    let svg = d3.select("#draw_SM")
                    let mapG = svg.append('g')
                        .attr("transform", `translate(${x},${y})`);
                    // let projection = d3.geoMercator()
                    //     .center([107,31])
                    //     .scale(50)
                    //     .translate([itemSize/2,itemSize/2])
                    let projection = d3.geoMercator()
                                        .fitSize([itemSize,itemSize],data)


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
            drawSvg(){
                d3.select("#draw_SM")
                    .attr("height",this.svgSizeData['svgHeight'])
                    .attr("width",this.svgSizeData['svgWidth']);
            }
        },
        watch:{
            svgSizeData:function (newData) {
                this.svgSizeData = newData;
                this.drawSvg()
            }
        },
        mounted() {
            console.log(this.svgSizeData)
            // this.loadMapData()
            // console.log(d3.select("#draw_SM"))
            // this.drawMap()
            this.loadDataDrawMap()
            this.drawSvg()
        }

    }
</script>

<style scoped>
#svgContainer{
    width: 100%;
    height: 100%;
}
</style>