import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.filter('formatCount',function (val){
    if (val > 10000 && val <= 100000000) {
        val /= 1000 ;
        return val.toFixed(1)+ '万';
    }
    else if (val > 100000000){
        val /=100000000;
        return val.toFixed(1) + '亿';
    }
    else {
        return val;
    }
})
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif