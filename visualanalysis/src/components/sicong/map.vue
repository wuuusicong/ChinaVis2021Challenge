<template>
    <div>
    </div>
</template>

<script>
    import *as d3 from 'd3'
    export default {
        name: "map",
        methods:{
            drawMap(x,y,itemSize){
                let svg = d3.select("#draw_SM")
                svg.attr("width",width)
                .attr("height",height);
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


            }
        },
        mounted() {
            d3.select("")
        }
    }
</script>

<style scoped>

</style>