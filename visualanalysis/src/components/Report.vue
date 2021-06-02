<template>
    <div id="news_province">
        <div class="option">
            <select id="pro_name" v-model="province_name">
                <option v-for="x in p_name" :value="x.value">{{x.name}}</option>
            </select><br>
        </div>
        <div class="news_list">
            <ul v-for="item in loadReportData(province_name)" :key="item.id" class="news">
                <li><a :href="item.url" target="_blank">{{item.title}}</a></li>
                <li>来源： {{item.source}}</li>
                <li>位置： {{item.province+(item.city == 'None'?'':item.city)}}</li>
                <li>日期： {{item.date}}</li>
                <li>关键词： {{item.key1}},{{item.key2}},{{item.key3}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import * as d3 from "d3"
    import report from '@/assets/report.json'
    export default {
        name: "First",
        props: ['dateRange'],
        data() {
            return {
                p_name: this.load_name(),
                province_name: ' ',
                report_list: this.loadReportData(' ')
            };
        },
        methods: {
            //返回展示数据
            loadReportData(p_n) {
                // p_n为当前选择的地区名
                let r_data = report.report;
                let data = [];
                r_data.forEach(function (v) {
                    // 取来自选择区域的报告
                    if (v.province == p_n) {
                        data.push({
                            title: v.title,
                            url: v.url,
                            source: v.source,
                            province: v.province,
                            city: v.city,
                            date: v.date,
                            abstract: v.abstract,
                            key1: v.k1,
                            key2: v.k2,
                            key3: v.k3
                        });
                    } else if (p_n == ' ') {
                        data.push({
                            title: v.title,
                            url: v.url,
                            source: v.source,
                            province: v.province,
                            city: v.city,
                            date: v.date,
                            abstract: v.abstract,
                            key1: v.k1,
                            key2: v.k2,
                            key3: v.k3
                        });
                    }
                })
                // 按时间排序
                data = data.sort(this.sortDownDate);
                return data
            },
            sortDownDate(a, b) {
                return Date.parse(a.date) - Date.parse(b.date);
            },
            load_name() {
                let r_data = report.report;
                let data = [];
                let name = [];
                r_data.forEach(function (v) {
                    if (name.indexOf(v.province) == -1) {
                        name.push(v.province)
                        data.push({
                            name: v.province,
                            value: v.province
                        });
                    }
                })
                return data
            }
        }
    }
</script>

<style scoped>
    .news {
        margin: 10px auto;
        width: 200px;
        height: 200px;
        background: linear-gradient(gray, gray) left top,
            linear-gradient(gray, gray) left top,
            linear-gradient(gray, gray) right top,
            linear-gradient(gray, gray) right top,
            linear-gradient(gray, gray) left bottom,
            linear-gradient(gray, gray) left bottom,
            linear-gradient(gray, gray) right bottom,
            linear-gradient(gray, gray) right bottom;
        background-repeat: no-repeat;
        background-size: 1px 24px, 24px 1px;
        padding-inline-start: 0;
        padding: 10px;
    }

    li {
        list-style: none;
    }

    .news_list {
        margin: 0 auto;
        font-size: 15px;        
        /* width: 250px;         */
    }

    #news_province{
        height: 100vh;
        overflow: scroll;
    }

    .option {
        margin: 10px;
        width: 140px;
        height: 40px;
        border: 1px solid #cccccc;
        position: relative;
    }

    .option select {
        border: none;
        outline: none;
        width: 100%;
        height: 40px;
        line-height: 40px;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        padding-left: 20px;
    }
</style>