import Vue from 'vue'
import App from './App.vue'
import mapBoxGl from 'mapbox-gl'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store'


Vue.prototype.$mapboxgl = mapBoxGl
Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes,
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')