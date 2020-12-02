<template>
    <div>
        <van-nav-bar title="提交成功"/>
        <img src="../../assets/i/home/11.png" alt="">
        <h3>等待后台审核中···</h3>
    </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Toast } from 'vant';
Vue.use(NavBar);
export default {
}
</script>
<style scoped>
    img{
        margin-top: 5em;
    }
    h3{
        color: #ccc;
        margin-top: 2em;
    }
</style>
