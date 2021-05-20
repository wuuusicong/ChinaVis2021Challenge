<template>
    <div class="container">
        <div v-for="i in 3 ">
            <SmallMultiples :mapJsonData="mapJsonData" :svgSizeData="svgSizeData" class="flex-item" />
        </div>
    </div>
</template>
<script>
    import SmallMultiples from "@/components/sicong/SmallMultiples_Canvas";
    import * as d3 from "d3"
    export default {
        components: {
            SmallMultiples
        },
        data() {
            return {
                mapJsonData: {},
                svgSizeData: {
                    svgHeight: 500, 
                    svgWidth: 500
                }
            }
        },
        mounted() {
            d3.json("map.json").then((data) => {
                this.mapJsonData = data
            })
        }
    }
</script>
<style>
    .container {
        display: flex;
    }

    .flex-item {
        flex: 1 0 auto;
        align-items: center;
        justify-content: center;
    }
</style>