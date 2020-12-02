<template>
    <div>
    <van-nav-bar title="下级代理列表" left-arrow @click-left="onClickLeft"/>
   
      <div v-if="info.length !=0 ">
       <div class="agent">
        <!-- <h5>推荐代理</h5> -->
        <ul>
            <li v-for="(item,index) in info" :key="index">
                <div class="agent_l">
                <div v-if="info.sex == 2">
                <img src="../../assets/i/01/d1.png" alt="">                
                 </div>
                 <div v-else-if="info.sex != 2 ">
                <img src="../../assets/i/01/d2.png" alt="">                    
                 </div>
                <div>
                    <p>{{item.name}}</p>
                    <small>{{item.phone}}</small>
                </div>
                </div>
                <div class="agent_r">
                    <router-link :to="{name:'exma_agent', params:{id:item.id}}">
                            <button>审核</button>
                        </router-link>                  
                </div>
            </li>
        </ul>
        <!-- //////直属代理 -->
    </div>
      </div>
    <div v-else-if="info.length==0">
       <nodata></nodata>
    </div>
 
    </div>
</template>
<script>
import Vue from 'vue'
import { NavBar} from 'vant';
import nodata from '../../components/noData'
Vue.use(NavBar);
export default {
    data(){
        return{
            info:{},
        }
    },
    components:{
        nodata
    },
    methods:{
        onClickLeft(){
            this.$router.back(-1)
        }
    },
    mounted(){
        this.apiGet('user/examine_list',{
            token:localStorage.getItem('token')
        }).then(res=>{
            // console.log(res.data.data)
            if(res.data.code){
            this.info=res.data.data 
            console.log(this.info,12131)               
            }
        })
    }
}
</script>
<style scoped>

.agent ul li{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #fff;
    padding: .5em .5em .5em 0;
    margin: .3em 0;
}
.agent ul li .agent_l{
    display: flex;
    flex-direction: row;
    text-align: left;
    /* flex-basis: content; */
    
}
.agent ul li .agent_l div{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.agent ul li .agent_l img{
    margin: 0 .5em;
    width: 3em;
    height: 3em;
}
.agent ul li .agent_l small{
    color: #ccc;
}
.agent ul li .agent_r{
    display: flex;
    flex-direction: column;
    text-align: right;
    justify-content: space-around;
}
.agent ul li .agent_r span{
    color: #b43e3a;
    font-size: .9em;
}
button{
    border-style:none;
    background-color: #b43e3a;
    color: white;
    padding: .3em 1em;
    border-radius: 1em;
}
</style>

