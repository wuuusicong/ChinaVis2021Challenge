<template>
    <div id="layoutContainer">
        <div class="left">
            <div class="main-layout-nav" @click="changeLayout" data-name="grid">
                <img :src="grid" alt=""  width="190">
                <span class="layout-name">Grid</span>
            </div>
            <div class="main-layout-nav" @click="changeLayout" data-name="tree">
                <img :src="tree" alt=""  width="190">
                <span class="layout-name">tree</span>
            </div>
            <div class="main-layout-nav" @click="changeLayout" data-name="calendar">
                <img :src="tree" alt=""  width="190">
                <span class="layout-name">calendar</span>
            </div>
            <div class="main-layout-nav" @click="changeLayout" data-name="t-sne">
                <img :src="tree" alt=""  width="190">
                <span class="layout-name">t-sne</span>
            </div>
        </div>
        <div class="main">
            <div class="status-control">
                <div class="status-control-first">
                    <div class="date">
                        <span class="control-category-title">时间：</span>
                        <DatePicker @dateChange="getDate"></DatePicker>
                        <span style="margin:0px 8px"> -- </span>
                        <DatePicker @dateChange="getDate"></DatePicker>
                    </div>
                    <div class="pollution-events">
                        <span class="control-category-title">污染等级：</span>
                        <Rating @ratingChange="getRating"></Rating>
                    </div>
                    <div class="pollution-category">
                        <span class="control-category-title">污染物：</span>
                        <ul class="pollution-list" @click="getPollutionItem">
                            <li class="pollution-item" data-item="pm2.5"><input id="pm2.5" type="radio" name="pollution-item" data-item="pm2.5"> <label for="pm2.5">pm2.5</label></li>
                            <li class="pollution-item" data-item="pm10"><input id="pm10" type="radio" name="pollution-item" data-item="pm10"> <label for="pm10">pm10</label></li>
                            <li class="pollution-item" data-item="CO2"><input id="CO2" type="radio" name="pollution-item" data-item="CO2"> <label for="CO2">CO2</label></li>
                            <li class="pollution-item" data-item="SO2"><input id="SO2" type="radio" name="pollution-item" data-item="SO2"> <label for="SO2">SO2</label></li>
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
                    <div class="btn-container">
                        <span>item:</span>
                        <!-- <button class="changeLayout" @click="calendar">calendar</button> -->
                        <!--            <button class="changeLayout" @click="t_sne">t_sne</button>            -->
<!--                        <button class="changeLayout" @click="itemRect">rect</button>-->
<!--                        <button class="changeLayout" @click="itemMap">Map</button>-->
                    </div>
                    
                </div>
            </div>
            <div class="layout">
                <GridAQILevel :layoutCategory="layoutCategory"></GridAQILevel>
            </div>
        </div>
        <div class="right">
           <Report></Report>
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
    import Report from '@/components/Report'
    export default {
        components: {
            GridAQILevel,
            DatePicker,
            Rating,
            Report
        },

        data() {
            return {
                tree,
                grid,
                renderCanvas: false,
                value: 0,
                layoutCategory: 'grid'
            }
        },
        methods: {
            changeLayout(e){
                let category = e.currentTarget.dataset['name'];
                console.log(category)
                this.layoutCategory = category;
            },
            getDate(date){
                console.log(date)
            },
            getRating(rating){
                console.log(rating)
            },
            getPollutionItem(e){
                if (e.target.tagName === 'LABEL') {return;}
                let item = e.target.dataset['item']
                console.log(item)
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
        position: relative;
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
        height: 15vh;
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
        height: 84vh;
        position: relative;
    }
    .changeLayout {
        display: inline-block;
        width: 70px;
        height: 30px;
        border: 1px solid #aaa;
        border-radius: 4px;
        /* padding: 3px 3px; */
        margin: 0px 5px;
    }
    .node2Text{
        font-size: 10px;
    }
</style>