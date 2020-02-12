import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './assets/styles/reset.css'
import './assets/styles/common.css'
import './plugins/element.js'
import './plugins/vcharts.js'
import 'swiper/dist/css/swiper.css'
import '@/assets/icons/iconfont.css'


//2.引入axios
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'https://card.pplm1996.com:10086';
axios.defaults.withCredentials=true;
axios.interceptors.response.use(
    response => {
        console.log('成功响应：', response)
        return response
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 (未授权) 清除 token 并跳转到登录页面
                    console.log("返回 401 (未授权) 清除 token 并跳转到登录页面\n")
                   // store.commit('BIND_LOGOUT')
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    })
                    break
                // default:
                //     console.log('服务器出错，请稍后重试！')
                //     alert('服务器出错，请稍后重试！')
            }
        }

         return Promise.reject(error) // 返回接口返回的错误信息
    }
)




Vue.prototype.$http = axios;//将axios改写到vue原型属性,调用方式例如this.$http.post(xxx)
Vue.config.productionTip = false
//5.引入moment,表格日期格式化
import moment from 'moment'
Vue.prototype.$moment=moment;//设置到vue原型属性,调用方式this.$moment(date).format("YYYY-MM-DD HH:mm:ss");

Vue.use(VueAwesomeSwiper)

import {setCookie,getCookie,delCookie} from './utils/cookieUtil.js'
Vue.prototype.$cookieStore = {setCookie,getCookie,delCookie}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')


