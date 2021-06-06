import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const pic = {}


import DateImg from '@/assets/AQIImg.json'
import eventData from '@/assets/eventData.json'
console.log("event")

for(let key in eventData){
  eventData[key]["select"] = 0;
}
console.log(eventData)

const provinceFolder = ['China','Hebei','Beijing']
let opacityGroup = []
provinceFolder.forEach((item1,index)=>{
  pic[item1] = []
  let route = '@/assets/heatMapData/China/'
  console.log(route)
  let contexts = require.context('@/assets/heatMapData/China/', true, /\.png$/);
  contexts.keys().forEach((item, index) => {
    // if(index>500)return
    pic[item1][index] = {}
    pic[[item1]][index]["src"] = contexts(item);
    pic[[item1]][index]["id"] = 'grid' + index
    pic[[item1]][index]["imgId"] = 'img'+index;
    pic[[item1]][index]["date"] = DateImg[index].split(".")[0];
    pic[[item1]][index]["data"] = eventData[pic[[item1]][index]["date"]];
    pic[[item1]][index]["number"] = index;
    opacityGroup[index] = {date:pic[[item1]][index]["date"],opacity:1};

    // pic[[item1]][index]["data"] =
  });
})



export default new Vuex.Store({
  state: {
    count: 0,
    pic,
    itemSize:18,
    eventData,
    opacityGroup
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})