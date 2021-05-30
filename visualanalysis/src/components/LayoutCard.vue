<template>
    <div v-for="initTheme" >

    </div>
</template>

<script>
    export default {
        name: "LayoutCard",
        data(){
            return {
                initTheme:[
                        {
                        "name":"大气污染时空态势",
                        "layout": [{"name":"calendar","src":"demo.jpg"}]
                        },
                    {
                        "name":"大气污染时空态势",
                        "layout": [{"name":"calendar","src":"demo.jpg"}]
                    }, {
                        "name":"大气污染时空态势",
                        "layout": [{"name":"calendar","src":"demo.jpg"}]
                    }, {
                        "name":"大气污染时空态势",
                        "layout": [{"name":"calendar","src":"demo.jpg"}]
                    },
                        ]
            }
        }
    }
</script>

<style scoped>

</style>