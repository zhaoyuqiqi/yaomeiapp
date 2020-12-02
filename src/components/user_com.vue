<template>
    <div>
        <div class="use_top">
               <div v-if="list.sex==2">
            <img src="../assets/i/01/d1.png" alt="">                
            </div>
            <div v-else='list.sex!=2'>
            <img src="../assets/i/01/d2.png" alt="">                
                
            </div>
            <h3>{{list.name}}</h3>
            <span>一级代理</span>
        </div>
    <div class="use_list">
        <ul>
            <li>
                <div><img src="../assets/i/01/14.png" alt=""><span>手机号码：{{list.phone}}</span></div>
            </li>
            <li>
                <div v-if="list.id_card!=''"><img src="../assets/i/01/15.png" alt=""><span>身份证号：{{list.id_card}}</span></div>
                <div v-else='list.id_card=='''><img src="../assets/i/01/15.png" alt=""><span>身份证号：暂未绑定</span></div>
            </li>
              <router-link to='my_agent'>
            <li >
                <div class="arr"><img src="../assets/i/01/16.png" alt=""><span>我的代理</span></div>
            </li>
            </router-link>
            <router-link to="set">
            <li>
                <div class="arr"><img src="../assets/i/01/18.png" alt=""><span>我的设置</span></div>
            </li>
            </router-link>            
        </ul>
    </div>
    <button @click="out">退出登录</button>
    </div>
</template>
<script>
import Vue from 'vue';
import { Toast } from 'vant';
export default {
    props:['list'],
    data(){
        return{

        }
    },
    methods:{
       out(){
        this.apiPost('member/logout',{
            token:localStorage.getItem('token')
        }).then(res=>{
            // localStorage.removeItem('token');
            if(res.data.code==200){
                var storage = window.localStorage;
                      storage.clear();
                     this.$router.push('login')
            }else{
                Toast(res.data.message)
            }
        })
      }
    }
}
</script>
<style scoped>
.use_top{
    padding: 3em 0;
    /* border-bottom: 1px solid #ccc; */
    background-color: #fff;
    margin-bottom: .5em;
}
.use_top img{
    width: 4em;
    height: 4em;
    border-radius: 50%;
}
.use_top h3{
    font-weight: normal;
    margin: 0 0 .3em 0;
}
.use_top span{
    color: #b43e3a;
    border: 1px solid #b43e3a;
    padding: .1em 1em;
    border-radius: 1.5em;
}

/* list */
.use_list{
    background-color: #fff;
    padding: 0  1.5em;
}
.use_list ul li div{
    /* text-align: none; */
    text-align: left;
   position: relative;
   color: #000;
}
.use_list ul li{
    padding: .5em 0;
    border-bottom:1px solid #f8f8f8;
}
.use_list ul a{
    border-bottom:1px solid #f8f8f8;
    display: block;
}
.use_list ul li:last-child{
    border-bottom: none;
}
.use_list ul li img{
width: 1.5em;
    vertical-align: middle;
    margin: 0 1em 0 0;
}
.use_list ul li span{
    vertical-align: middle;
    /* color: #999; */
    font-size: .9em
}
/* 按钮 */
button{
    border-style: none;
    outline: none;
    background-color: #b43e3a;
    width: 80%;
    border-radius: 1em;
    padding: .5em 0;
    color: #fff;
    margin:2em 0 8em 0
}
.arr{
    background: #fff url('../assets/i/01/arrl.png') no-repeat center right/3%;
}
</style>
