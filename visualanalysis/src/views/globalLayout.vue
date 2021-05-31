<template>
    <div id="layoutContainer">
        <div class="left">
            <div class="main-layout-nav">
                <img :src="grid" alt=""  width="190">
                <span class="layout-name">Grid</span>
            </div>
            <div class="main-layout-nav">
                <img :src="tree" alt=""  width="190">
                <span class="layout-name">tree</span>
            </div>
            
            
        </div>
        <div class="main">
            <div class="status-control">
                <div class="status-control-first">
                    <div class="date">
                        <span class="control-category-title">时间：</span>
                        <DatePicker></DatePicker>
                        <span style="margin:0px 8px"> -- </span>
                        <DatePicker></DatePicker>
                    </div>
                    <div class="pollution-events">
                        <span class="control-category-title">污染等级：</span>
                        <Rating></Rating>
                    </div>
                    <div class="pollution-category">
                        <span class="control-category-title">污染物：</span>
                        <ul class="pollution-list">
                            <li class="pollution-item"><input type="radio" name="pollution-item"> pm2.5</li>
                            <li class="pollution-item"><input type="radio" name="pollution-item"> pm10</li>
                            <li class="pollution-item"><input type="radio" name="pollution-item"> CO2</li>
                            <li class="pollution-item"><input type="radio" name="pollution-item"> SO2</li>
                        </ul>
                    </div>
                </div>
                <div class="status-control-second">
                    <div class="item-slider">
                        <span class="control-category-title">item-num：</span><v-slider v-model="value"></v-slider>    
                    </div>
                    <div class="item-slider">
                        <span class="control-category-title">item-size：</span><v-slider v-model="value"></v-slider>
                    </div>            
                </div>
            </div>
            <div class="layout">
                <GridAQILevel />
            </div>
        </div>
        <div class="right">
            dd
        </div>
    </div>
    <!-- <div id="demo"></div> -->
</template>

<script>
    // import SmallMultiples from "@/components/sicong/SmallMultiples_Canvas";
    import grid from "@/assets/icon/grid.png"
    import tree from "@/assets/icon/tree.jpg"
    import GridAQILevel from "./GridAQILevel";
    import DatePicker from '@/components/DatePicker'
    import Rating from '@/components/Rating'
    export default {
        components: {
            GridAQILevel,
            DatePicker,
            Rating
        },

        data() {
            return {
                tree,
                grid,
                renderCanvas: false,
                value: 0,
                // mapJsonData:{},
                // svgSizeData:{},
            }
        },

        computed: {
            computedDateFormatted() {
                return this.formatDate(this.date)
            },
        },        
    };
</script>

<style scoped>
    html,
    body {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
    }

    .main-layout-nav{
        border: 1px solid #ddd;
        background-color: white;
        text-align: center;
        margin: 10px 0px;
    }

    .main-layout-nav:hover{
        border-color: #999;
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
        background-color: rgb(250, 250, 250);
    }

    .right {
        float: left;
        width: 249px;
        height: 100%;
        border-left: 1px solid #ddd;
    }

    .main {
        float: left;
        width: calc(100% - 450px);
        height: 100%;
        position: relative;
    }

    .control-category-title {
        display: inline-block;
        text-align: center;
        width: 90px;
    }

    .status-control {
        height: 150px;
        border-bottom: 1px solid #ddd;
        background-color: rgb(250, 250, 250);
    }

    .status-control-first {
        padding-right: 30px;
        float: left;
    }

    .status-control-second {
        box-sizing: border-box;
        border-left: 1px solid #ddd;
        width: 300px;
        height: 150px;
        padding-left: 30px;
        padding-top: 10px;
        float: left;
    }

    .status-control .date,
    .status-control .pollution-events,
    .pollution-category{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 50px;
    }

    .item-slider {
        display: flex;
        
    }

    .pollution-list {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        list-style: none;
        padding-left: 0px;
        height: 50px;
    }

    .pollution-item {
        padding: 0px 8px;
    }


    .layout {
        height: 100%;
        position: relative;
    }
</style>