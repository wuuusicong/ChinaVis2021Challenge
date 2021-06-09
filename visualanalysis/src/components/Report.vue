<template>
    <div id="news_province">
        <div class="news_list">
            <ul v-for="item in loadReportData(province_name, dateRange, pollution_item)" :key="item.id" class="news">
                <li  class="news_title"><a :href="item.url" target="_blank">{{item.title}}</a></li>
                <li class="report_cotent">来源： {{item.source}}</li>
                <li class="report_cotent">位置： {{item.province+(item.city == 'None'?'':item.city)}}</li>
                <li class="report_cotent">日期： {{item.date}}</li>
                <li class="report_cotent">关键词： {{item.key1}},{{item.key2}},{{item.key3}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import * as d3 from "d3"
    import report from '@/assets/report.json'
    export default {
        name: "Report",
        props: ['dateRange', 'pollution_item', 'province_name'],
        data() {
            return {
                p_name: this.load_name()
            };
        },
        methods: {
            //返回展示数据
            loadReportData(p_n, d_range, pollution_item) {
                // p_n为当前选择的地区名
                let r_data = report.report;
                let data = [];
                let p_item = this.item_represent(pollution_item);
                // 按时间排序
                r_data = r_data.sort(this.sortDownDate);
                r_data.forEach(function (v) {
                    // 按选择时间区间检索
                    // 早于起始时间跳过
                    if (Date.parse(v.date) < Date.parse(d_range.StartDate))
                        return true;
                    else {
                        if (Date.parse(v.date) <= Date.parse(d_range.EndDate)) {
                            // 取来自选择区域的报告
                            if (v.province == p_n || p_n == ' ') {
                                if (Date.parse(v.date) >= Date.parse(d_range.StartDate) && Date.parse(v.date) <= Date.parse(d_range.EndDate)) {
                                    // 污染物筛选
                                    if (v.k1 == p_item || v.k2 == p_item || v.k3 == p_item || p_item == ' ') {
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
                                }
                            }
                        }
                        // 晚于终止时间结束
                        else
                            return false;
                    }
                })
                return data
            },
            sortDownDate(a, b) {
                return Date.parse(a.date) - Date.parse(b.date);
            },
            load_name() {
                let r_data = report.report;
                let data = [];
                let name = [];
                data.push({
                    name: '请选择',
                    value: ' '
                });
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
            },
            item_represent(p_i) {
                if (p_i == ' ')
                    return ' '
                else if (p_i == 'pm2.5')
                    return 'PM2.5'
                else if (p_i == 'pm10')
                    return 'PM10'
                else if (p_i == 'CO2')
                    return '二氧化碳'
                else if (p_i == 'SO2')
                    return '二氧化硫'
                else if (p_i == 'O3')
                    return '臭氧'
                else if (p_i == 'NOx')
                    return '氮氧化物'
            }
        }
    }
</script>

<style scoped>
    .news {
        margin: 10px auto;
        width: 210px;
        height: 200px;
        /*background-color: rgba(212, 211, 198, 0.5);*/
        background-color: rgba(35, 34, 24, 0.5);
        -moz-box-shadow: 10px 10px 5px rgba(255, 242, 204, 0.3); /* 老的 Firefox */
        box-shadow: 10px 10px 5px rgba(255, 242, 204, 0.4);
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

    .news_title{
        margin-bottom: 10px;
    }

    .news_title a{
        /*text-decoration:none;*/
        color: #FFF2CC;;
        /*font-weight: bold;*/
    }

    .news_title a:hover{
        text-decoration:underline;
    }

    .report_cotent{
        color: gold;
    }
</style>