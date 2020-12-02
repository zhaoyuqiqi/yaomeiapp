<template>
    <div>
    <van-nav-bar title="代理列表" left-arrow @click-left="onClickLeft"/>
    <div v-if="info.length!=0">
   <!-- <input type="text" name="" id="" placeholder="请输入代理名字或者手机号"  v-model="search"/> -->

    <div class="agent">
        <ul>
              <li v-for="item in info">
            <router-link :to="{path:'/detail', query:{id:item.id}}">                 
                <div class="agent_l">
                <img src="./../../assets/i/01/02.png" alt="">
                <div>
                    <p>{{item.name}}</p>
                    <small>{{item.phone}}</small>
                </div>
                </div>
                <div class="agent_r">           
                        <p>个人月销量：{{item.order.sum}}包</p>
                        <span>贡献返利: ￥{{item.rebate_price.price}}</span>
                </div>
            </router-link>
              </li>
        </ul>
    </div>
    </div>
    <div v-else='info.length==0'>
        <nodata></nodata>
    </div>
 
    </div>
</template>
<script>
import Vue from 'vue'
import { NavBar,Toast} from 'vant';
import nodata from '../../components/noData'
Vue.use(NavBar).use(Toast);
export default {
    data(){
        return{
            info:[],
            // search:''
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
        this.apiPost('team/personal_rebate1',{
            token:localStorage.getItem('token'),
            user_id:this.$route.params.id           
        }).then(res=>{
            console.log(res)
            if(res.data.code==200){
            this.info=res.data.data.data
        
            // console.log(this.info)
            }else{
                Toast(data.res.message)
            }
            
        })
    }
}
</script>
<style scoped>
input{
    margin: 1em 0;
    padding:.5em 3em .5em 1em;
    width: 70%;
    border-radius: 2em;
    border-style: none;
    border: 1px solid #cccccc;
    background: #fff url('../../assets/i/01/so.png')no-repeat 95% center/7%;
    text-align: center;

}
.agent ul li a{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #fff url('./../../assets/i/01/arrl.png')no-repeat 95% center/3%;
    padding: .5em 3em .5em 0;
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

</style>

