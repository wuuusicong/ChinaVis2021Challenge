<template>
    <div class="date-picker">
        <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y
            max-width="290px" min-width="auto">
            <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="dateFormatted" persistent-hint prepend-icon="mdi-calendar" v-bind="attrs"
                     v-on="on" class="ma-0" color="white"></v-text-field>
            </template>
            <v-date-picker v-model="date" type="month" no-title @input="menu1 = false" color="green lighten-1"
                           header-color="primary"></v-date-picker>
        </v-menu>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                date: new Date().toISOString().substr(0, 10),
                dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
                menu1: false,
            }
        },
        watch: {
            date(val) {
                this.dateFormatted = this.formatDate(this.date)
                this.$emit('dateChange',val);
            },
        },
        methods: {
            formatDate(date) {
                if (!date) return null

                const [year, month, day] = date.split('-')                
                return `${month}/${year}`
            },
            parseDate(date) {
                if (!date) return null
                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
        },
    }
</script>
<style scoped>
    .date-picker {
        width: 122px;
        color:white;
    }
    .theme--light{
        color:white;
    }
    .theme--light.v-input input{
        color: white;
    }
</style>