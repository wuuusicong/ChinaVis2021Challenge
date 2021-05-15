<template>
    <div id="svgContainer">
        <svg id="draw_SM">
        </svg>
    </div>
</template>

<script>
    import * as d3 from "d3";

    export default {
        props:['mapJsonData','svgSizeData'],
        name: "SmallMultiples",
        methods:{
            loadMapData(){
                d3.json("map.json").then(data=>{
                    console.log(data)
                })
            },
            drawMap(x,y,itemSize){
                let svg = d3.select("#draw_SM")
                let mapG = svg.append('g')
                    .attr("transform", `translate(${x},${y})`);

                let projection = d3.geoMercator()
                    .center([107,31])
                    .scale(400)
                    .translate([itemSize/2,itemSize/2])

                const path = d3.geoPath().projection(projection)

                mapG.selecetAll('g')
                    .data(data.features)
                    .enter()
                    .append("g")
                    .append('path')
                    .attr('stroke', '#000')
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
            this.loadMapData()
            // console.log(d3.select("#draw_SM"))

            // this.drawMap()
        }

    }
</script>

<style scoped>
#svgContainer{
    width: 100%;
    height: 100%;
}
</style>