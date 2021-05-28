<template>
    <div id="layoutContainer">
        <div class="left">

        </div>
        <div class="main">
            <div class="status-control">

            </div>
            <div class="layout">
                <GridAQILevel/>
            </div>
        </div>
        <div class="right">

        </div>
    </div>
    <!-- <div id="demo"></div> -->
</template>

<script>    
    // import SmallMultiples from "@/components/sicong/SmallMultiples_Canvas";
    import * as d3 from "d3"
    import GridAQILevel from "./GridAQILevel";
    export default {
        data() {
            return {
                positionChange: true,
                renderCanvas: false,
                // mapJsonData:{},
                // svgSizeData:{},
                gridWidth: 0,
                gridHeight: 0,
                posLayout:[]
            }
        },
        components: {      
            GridAQILevel
        },

        mounted() {                    
            
        }
    };
</script>

<style>
    html,
    body {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
    }

    #layoutContainer {
        width: 100%;
        height: 100%;
    }

    .left {
        float: left;
        width: 199px;
        height: 100%;        
        border-right: 1px solid #ddd;
    }

    .right {
        float: left;
        width: 199x;
        height: 100%;
        border-left: 1px solid #ddd;
        background-color: red
    }

    .main {
        float: left;
        width: calc(100% - 400px);
        height: 100%;
        position: relative;
    }

    .status-control{
        height: 100px;
        border-bottom: 1px solid #ddd;
    }

    .layout{
        height: 100%;
        position: relative;
    }
</style>