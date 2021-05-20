import Vue from 'vue'
import App from './App.vue'
import mapBoxGl from 'mapbox-gl'
import VueRouter from 'vue-router'
import routes from './router'
import Viser from 'viser-vue'
Vue.use(Viser)

Vue.prototype.$mapboxgl = mapBoxGl
Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes,
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')