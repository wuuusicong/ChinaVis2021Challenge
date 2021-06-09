import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const pic = {}


import DateImg from '@/assets/AQIImg.json'
import eventDataAll from '@/assets/eventData_type_NPC.json'
import AQIImg from '@/assets/AQIImg.json'
console.log("event")
let eventData = eventDataAll["event"]
for (let key in eventData) {
  eventData[key]["select"] = 0;
}

let provinceFolder = {};
let opacityGroup = []
// provinceFolder.forEach((item1,index)=>{

// let route = '@/assets/heatMapData/China/'
let contexts = require.context('@/assets/heatMapData/', true, /\.png$/);

contexts.keys().forEach((item) => {
  let reg = /\/(.+)\//;
  let province = item.match(reg)[1];
  
  if(!provinceFolder.hasOwnProperty(province)){
    pic[province] = []
    provinceFolder[province] = 0;
  }else{
    provinceFolder[province]++;
  }
  let index = provinceFolder[province];
  if(index>500)return
  pic[province][index] = {}
  pic[province][index]["src"] = contexts(item);
  pic[province][index]["id"] = 'grid' + index
  pic[province][index]["imgId"] = 'img' + index;
  pic[province][index]["date"] = DateImg[index].split(".")[0];
  pic[province][index]["data"] = eventData[pic[[province]][index]["date"]];
  pic[province][index]["number"] = index;
  opacityGroup[index] = {
    date: pic[[province]][index]["date"],
    opacity: 1
  };

});
// })
console.log("pic")
console.log(pic)

let dateArray = AQIImg.map((item, index) => item.split(".")[0])


export default new Vuex.Store({
  state: {
    count: 0,
    pic,
    itemSize: 18,
    eventData: eventData,
    barData: eventDataAll["barChat"],
    opacityGroup,
    dateArray
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})