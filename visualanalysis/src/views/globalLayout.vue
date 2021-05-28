<template>
    <div id="layoutContainer">
        <div class="left">

        </div>
        <div class="main">
            <div class="status-control">

            </div>
            <div class="layout" ref="layout">
                <GridAQILevel :gridWidth="gridWidth" :gridHeight="gridHeight" :posLayout="posLayout" :positionChange="positionChange"/>
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
        methods: {                  
            upDateLayout(PosData) {
               this.posLayout = PosData
            },
        },
        mounted() {                    
            this.gridWidth = this.$refs.layout.offsetWidth;
            this.gridHeight = this.$refs.layout.offsetHeight;
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
        width: 200px;
        height: 100%;
        background-color: skyblue;
    }

    .right {
        float: left;
        width: 200px;
        height: 100%;
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
        background-color: yellow;
    }

    .layout{
        height: 100%;
        position: relative;
    }
</style>