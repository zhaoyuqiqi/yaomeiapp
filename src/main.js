// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import { router } from './router';
import VueClipboard from 'vue-clipboard2'
import axios from 'axios';
import Mui from 'vue-awesome-mui';
import { AddressList, AddressEdit } from 'vant';
Vue.use(Mui).use(AddressList).use(AddressEdit);
import VueAxios from 'vue-axios';
import querystring from 'querystring';
import Loading from './assets/js/loding.js'
Vue.config.productionTip = false
Vue.use(VueClipboard)

let bindToGlobal = obj => {
    window._GLOBAL = {};
    for (let key in obj) {
        window._GLOBAL[key] = obj[key]
    }
}
bindToGlobal({ showLoading: false });

Vue.prototype.$http = axios
    //阻止启动时生成的生产指令
    // Vue.config.productionTip = false
    //配置域名
axios.defaults.baseURL = 'http://yaomei.weilang.top/api/v2/'
    // axios.defaults.baseURL = 'http://www.51yaomei.com/api/v2/'
    // axios.defaults.headers.token = localStorage.getItem('token');  

Vue.prototype.axios = axios
axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded'
const instance_axios = axios.create({
    baseURL: 'http://yaomei.weilang.top/api/v2/',
    // baseURL: 'http://www.51yaomei.com/api/v2/',
    timeout: 6000,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },

    showLoading: true, // 默认启用加载
});

instance_axios.interceptors.request.use(
    conf => {
        // eventHub.$emit('before-request');
        if (conf.showLoading) {
            Loading.show();
        }
        return conf;
    },
    error => {
        // eventHub.$emit('request-error');
        Loading.clear();
        return Promise.reject(error);
    }
);
instance_axios.interceptors.response.use(
    response => {
        // eventHub.$emit('after-response');
        Loading.clear();
        return response;
    },
    error => {
        // eventHub.$emit('response-error');
        Loading.clear();
        return Promise.reject(error);
    }
);
//下拉加载
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.use(VueAxios, instance_axios);

var apiGet = (url, query = null, config = null) => {
    if (!config) {
        config = { showLoading: true }
    }
    return Vue.axios.get(url, { params: query, config });
}

var apiPost = (url, data = null, config = null) => {
    if (!config) {
        config = { showLoading: true }
    }
    if (data) {
        data = querystring.stringify(data);
    }
    return Vue.axios.post(url, data, config);
}

Vue.apiGet = apiGet;
Vue.apiPost = apiPost;
Vue.prototype.apiGet = apiGet;
Vue.prototype.apiPost = apiPost;




new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})