<template>
    <div>
        <van-nav-bar left-arrow @click-left="onClickLeft"/>
        <div class="set_img">
            <div v-if="info.sex == 2">
                <img src="../../assets/i/01/d1.png" alt="">                
                 </div>
                 <div v-else-if="info.sex != 2 ">
                <img src="../../assets/i/01/d2.png" alt="">                    
                 </div>
            <p>{{info.name}}</p>
        </div>

    <div class="set_list">
        <ul>  <li>
                <div>
                    <img src="../../assets/i/01/14.png" alt="">
                    <span>手机号码：{{info.phone}}</span>
                </div>
            </li>
    
             <li>
                <div>
                    <img src="../../assets/i/01/15.png" alt="">
                    <span>身份证：{{info.id_card}}</span>
                </div>
            </li>
            <li>
               <span>推荐人：{{info.rec_id}}</span>
               <span>总代：{{info.gen_id}}</span>
            </li>
        </ul>

    </div>
         <button @click="modify">拒绝</button> 
         <button @click="enter">通过</button>


    </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Toast } from 'vant';

Vue.use(NavBar);

export default {
data(){
        return{
            info:{}
        }
    },
    methods:{
        onClickLeft(){
            this.$router.back(-1)
        },
        modify(){
            this.apiGet('user/del_user',{
                token:localStorage.getItem('token'),
                id:this.info.id,
            }).then(
                res=>{
                  if(res.data.code==200){
                      Toast(res.data.message)
                     this.$router.push('/user') 
                  }else{
                    Toast(res.data.message)
                  }
                                    
                }
            )
        },
        enter(){
            this.apiGet('user/examine',{
                token:localStorage.getItem('token'),
                user_id:this.info.id,
                status:1
            }).then(
                res=>{
                   Toast(res.message)
                   this.$router.push('/user')                    
                }
            )
        }
    },
    mounted(){
        this.apiGet('user/examine_details',{
            user_id:this.$route.params.id,
            token:localStorage.getItem('token')
        }).then(res=>{
            if(res.data.code){
                 this.info=res.data.data
            console.log(this.info,213133333333333)
            }else{
              Toast('意外错误')
            }
           
        })
    }
}
</script>
<style scoped>
    .set_img{
    background-color: #fff;
    padding: 1em 0;
    border-bottom: 1px solid #f4f4f4;
       }
        .set_img img{
            width: 6em;
            height: 6em;
            border-radius: 3em;
        }
        .set_img p{
            margin: 0 0 .5em 0;
        }
    .set_img span{
        font-size: .8em;
        border: 1px solid #b43e3a;
        padding: .3em 1em;
        border-radius: 1em;
        color: #b43e3a;
    }

    /* /// */
    .set_list{
        margin: 1em 0;
    }
   .set_list ul li{
       display: flex;
       justify-content: space-between;
       line-height: 3em;
       background-color: #fff;
       /* padding: 0  0 0 em; */
       /* box-sizing: border-box; */
       font-size:.8em;
       margin: .2em 0;
   }
    .set_list ul li:last-child{
        justify-content: space-around;
    }
   .set_list ul li div img{
       width: 2em;
       vertical-align: middle;
       margin: 0 1em;
   }
   .set_list ul li div span{
       vertical-align: middle;
   }
   .set_list ul li div input{
     vertical-align: middle;
     border-style: none;
     outline: none;
     border: 0px;
   }
   .set_list ul li>input{
       display:inline-block;
       padding:0 1.5em;
       box-sizing: border-box;
         vertical-align: middle;
       border-style: none;
     outline: none;
     border: 0px;
     background-color: #b43e3a;
     color: white;
   }
   button{
       width: 40%;
       background-color:#b43e3a;
       color: white;
       border: none;
       outline: none;
       padding: .5em;
       border-radius: 3em;
       margin: 3em 0;
   }
   button:last-child{
       background-color: green;
   }
</style>
