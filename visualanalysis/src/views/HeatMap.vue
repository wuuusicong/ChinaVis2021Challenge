<template>
    <div class="map-container">
        <div v-for="item in position" :style="{background:item.month==5?'skyblue':'red',top:item.day*36+'px',left:(item.week*1+1)*47+'px'}" class="map">
            <img :src="pic[item.date]" :alt="item.week" width="47" height="36">
        </div>
        
    </div>
</template>

<script>
    import * as $ from 'jquery'
    const pic = {}
    const contexts = require.context('@/assets/heatmap/', true, /\.jpg$/);
    contexts.keys().forEach(key => {
        pic[key] = contexts(key);
    });

    export default {
        mounted() {
            $.getJSON('./heatmap-6.json', (data) => {
                this.position = data;
                const reg = new RegExp( '-' , "g" )
                this.position.forEach((v,i,arr)=>{
                    arr[i]['date'] = './'+v['date'].replace(reg,'')+'00.jpg';
                })
                console.log(this.position)
            });

        },
        data() {
            return {
                position: [],
                pic
            };
        },
    };
</script>
<style scoped>
    .map {
        display: block;
        padding: 1px;
        height: 37px;
        position: absolute;
    }

    .map-container {
        position: relative;
        margin-top: 200px;
    }
</style>