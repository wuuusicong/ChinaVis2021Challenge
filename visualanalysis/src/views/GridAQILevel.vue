<template>
    <div class="map-container">
        <div v-for="item in pic" class="map">
            <img  :src="item" width="18" height="18">
        </div>
    </div>

</template>

<script>
    import *as d3 from "d3"
    const pic = {}
    const contexts = require.context('@/assets/heatmapDataAll/', true, /\.jpg$/);
    contexts.keys().forEach(key => {
        pic[key] = contexts(key);
    });
    export default {
        name: "GridAQILevel",
        mounted() {
            console.log(pic)
            d3.json("AQIImg.json").then((data)=>{
                console.log(data)
                data.forEach((item)=>{
                    let srcTmp = item
                    this.position.push(srcTmp)
                })
            })
        },
        data() {
            return {
                position: [],
                pic
            };
        },
    }
</script>

<style scoped>
    .map-container {
        display: flex;
        flex-direction: row;
        width: 80%;
        flex-wrap: wrap;
    }

    .map-container {

    }
</style>