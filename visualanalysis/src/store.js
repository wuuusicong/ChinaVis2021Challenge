import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const pic = []
const contexts = require.context('@/assets/heatmapDataAll/', true, /\.jpg$/);
contexts.keys().forEach((item, index) => {
  pic[index] = {}
  pic[index]["src"] = contexts(item);
  pic[index]["id"] = 'grid' + index
});


export default new Vuex.Store({
  state: {
    count: 0,
    pic,
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})