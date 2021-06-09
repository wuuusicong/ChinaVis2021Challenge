import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const pic = {}


import DateImg from '@/assets/AQIImg.json'
import eventDataAll from '@/assets/eventData_type_NPC.json'
import AQIImg from '@/assets/AQIImg.json'
console.log("event")
let eventData =eventDataAll["event"]
for(let key in eventData){
  eventData[key]["select"] = 0;
}

const provinceFolder = ['China','Hebei','Beijing']
let opacityGroup = []
provinceFolder.forEach((item1,index)=>{
  pic[item1] = []
  let route = '@/assets/heatMapData/China/'
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
console.log("pic")
console.log(pic)

let dateArray = AQIImg.map((item,index)=> item.split(".")[0])


export default new Vuex.Store({
  state: {
    count: 0,
    pic,
    itemSize:18,
    eventData:eventData,
    barData:eventDataAll["barChat"],
    opacityGroup,
    dateArray
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})