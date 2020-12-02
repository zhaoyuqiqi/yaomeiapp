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
            <p v-if="!isGeneralAgent">{{info.name}}</p>
            <div class="name" v-else>
                <input type="text" v-model="info.name" >
            </div>
            <span>{{info.grade}}</span>
        </div>

    <div class="set_list">
        <ul>  <li>
                <div>
                    <img src="../../assets/i/01/14.png" alt="">
                    <span v-if="!isGeneralAgent">手机号码:{{info.phone}}</span>
                    <span v-else>
                         <span>手机号码:</span>
                        <span><input type="number" v-model="info.phone"> </span>
                    </span>
                   

                </div>
            </li>
    
             <li>
                <div>
                    <img src="../../assets/i/01/15.png" alt="">
                    <span>身份证:{{info.id_card}}</span>
                    <!-- <span>身份证:</span>
                    <span><input type="text" v-model="info.id_card"></span> -->
                </div>
            </li>
               <li class="arr">
                   <router-link :to="{name:'lower',params:{id:info.id}}">
                       <div class="agent">
                                         <div>
                    <img src="../../assets/i/01/分享.png" alt="">
                    <span>推荐人数</span>
                     </div>
             
                <span>{{info.num}}人</span>
                       </div>

                   </router-link>
            </li>
            
        </ul>
    <div class="save" @click="save" v-if="isGeneralAgent">保存修改信息</div>
    </div>
       <router-link :to="{path:'/detail', query:{id:info.id}}"> <button>查看代理业绩</button> </router-link> 
    </div>
</template>
<script>
import Vue from "vue";
import { NavBar } from 'vant';

Vue.use(NavBar);

export default {
data(){
        return{
          info:{},
          isGeneralAgent:false
        }
    },
    methods:{
        onClickLeft(){
            this.$router.back(-1)
        },
        save(){
            if(this.info!={}){
                console.log(this.info.phone,this.info.name);
                console.log(this.info,"修改后的信息");
            }
        }
    },
    mounted(){
        this.apiGet('agent/myagent_info',{
            id:this.$route.params.id,
            token:localStorage.getItem('token')
        }).then(res=>{
          console.log(res.data.data,111)
          this.info=res.data.data
        })
        this.isGeneralAgent= localStorage.getItem("isGeneralAgent")
    }
}
</script>
<style scoped>
.name{
    padding:1.333vw 0;
}
.name input{
    border: none;
    outline: none;
    text-align: center;

}
.save{
    background-color:#b43e3a;
    width: 80vw;
    margin: 0 auto;
    color: #fff;
    border-radius:5.333vw ;
    height: 10.667vw;
    line-height:10.667vw;
}
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
       padding: 0 2em 0 0;
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
       width: 80%;
       background-color:#b43e3a;
       color: white;
       border: none;
       outline: none;
       padding: .5em;
       border-radius: 3em;
       margin: 3em 0;
   }
   .arr{
       /* background:url('../'); */
        background: url('../../assets/i/01/arrl.png')no-repeat center right 3%/3%;
       
   }
   .set_list a{
       color: black;
       display: block;
       width: 100%;
   }
   .set_list a>div{
       display: flex;
       justify-content: space-between;
   }
</style>
