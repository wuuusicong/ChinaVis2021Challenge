import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const pic = {}


const provinceFolder = ['China','Hebei','Beijing']
const route = {}
provinceFolder.forEach((item1,index)=>{
  pic[item1] = []
  let route = '@/assets/heatMapData/China/'
  console.log(route)
  let contexts = require.context('@/assets/heatMapData/China/', true, /\.png$/);
  contexts.keys().forEach((item, index) => {
    if(index>500)return
    pic[item1][index] = {}
    pic[[item1]][index]["src"] = contexts(item);
    pic[[item1]][index]["id"] = 'grid' + index
    pic[[item1]][index]["imgId"] = 'img'+index
  });
})



export default new Vuex.Store({
  state: {
    count: 0,
    pic,
    itemSize:18
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})