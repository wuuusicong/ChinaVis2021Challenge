<template>
    <div>
        <v-rating v-model="rating" size="25" length="6" :background-color="color" :color="color"></v-rating>
    </div>
</template>
<script>
    export default {
        data: () => ({
            rating: 1,
            color: 'green'
        }),
        watch:{
            rating(newV){
                switch (newV){
                    case 1:
                        this.color = '#64DD17';
                        break;
                    case 2:
                        this.color = '#D4E157';
                        break;
                    case 3:
                        this.color = '#FFAB00';
                        break;
                    case 4: 
                        this.color = '#FF7043';
                        break;
                    case 5: 
                        this.color = '#FF3D00';
                        break;
                    case 6:
                        this.color = '#BF360C';
                        break;
                }
                this.$emit('ratingChange',newV);
            }
        }
    }
</script>
<style scoped>

</style>