<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <keep-alive> 
    <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
    </router-view>
</keep-alive>
 
<router-view v-if="!$route.meta.keepAlive">
    <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
</router-view>

  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';

Vue.use(NavBar);
export default {
  // name: 'App'

  //根组件定义微信分享  
  
}
</script>

<style>
#app {
  font-family: '微软雅黑','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
/* 所有页面的背景颜色 */
:root {
  background-color: #f8f8f8;
  /* width: 100%; */
  /* height: 100%; */
}
/* 所有页面的背景颜色end*/
/* 底部样式 */

.van-nav-bar{
  background-color: #b43e3a !important;
  color: white;
}
.van-icon-arrow:before{
  color: white;
}
.van-icon-share:before{
  color: white
}
.footer {
  /* box-shadow: 0 1px 30px 0px #ccc; */
  position:fixed;
  bottom: 0;
  width: 100%;
  height: 70px;  
  background:url('./assets/i/01/but.png')no-repeat bottom center/100% !important;
}
.footer ul {
  display: flex;
  flex-direction: row;
  width: 100%;
  font-size: 0.7em;
}
/* .footer a{
  display: block;
} */
.footer ul li {
  width: 20%;
  padding: 10px 0;
  box-sizing: border-box;
}
.footer ul li:nth-child(3) a{
  width: 100px;
  height: 100px;

  
}
.footer ul li:nth-child(3) {
  width: 20%;
}
.footer ul li:nth-child(3) img {
  width: 3em;
  height: 3em;
}
.footer ul li:nth-child(3) span {
  display: inline-block;
  background-color: #b43e3a;
  padding: 1.5em 1.5em;
  border-radius: 50%;
  position: absolute;
  top: -33%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  /* border: 1em solid #f8f8f8; */
  /* box-shadow: 0 11px 30px 0px #ccc; */
}
/* [class*=van-hairline]::after{
  border: none;
} */
.footer img {
  width: 2.8em;
}
.footer ul li.active a{
  color: #b43e3a;
}
/* 底部样式end */


/* rest样式 */
*{
  padding: 0;
  margin: 0;
}
a{
  color: #888;
}
li{
  margin: 0;
  padding: 0;
}
li img{
  width: 8px;
}
</style>
