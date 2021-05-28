<template>
    <div id="layoutContainer">
        <div class="left">

        </div>
        <div class="main">
            <div class="status-control">
                <div class="date-picker">
                    <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition"
                        offset-y max-width="290px" min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="dateFormatted" persistent-hint
                                prepend-icon="mdi-calendar" v-bind="attrs" @blur="date = parseDate(dateFormatted)"
                                v-on="on" class="ma-0"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </div>
            </div>
            <div class="layout">
                <GridAQILevel />
            </div>
        </div>
        <div class="right">

        </div>
    </div>
    <!-- <div id="demo"></div> -->
</template>

<script>
    // import SmallMultiples from "@/components/sicong/SmallMultiples_Canvas";
    import GridAQILevel from "./GridAQILevel";
    export default {
        components: {
            GridAQILevel
        },

        data() {
            return {
                renderCanvas: false,
                // mapJsonData:{},
                // svgSizeData:{},
                date: new Date().toISOString().substr(0, 10),
                dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
                menu1: false,
            }
        },

        computed: {
            computedDateFormatted() {
                return this.formatDate(this.date)
            },
        },

        watch: {
            date(val) {
                this.dateFormatted = this.formatDate(this.date)
            },
        },

        mounted() {

        },

        methods: {
            formatDate(date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            parseDate(date) {
                if (!date) return null

                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
        },
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

    .status-control {
        height: 100px;
        border-bottom: 1px solid #ddd;
    }

    .layout {
        height: 100%;
        position: relative;
    }

    .date-picker{
        width: 130px;
    }
</style>