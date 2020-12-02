<template>
    <div>
    <van-nav-bar title="推荐总代团队业绩" left-arrow @click-left="onClickLeft"/>
    <input type="text" name="" id="" placeholder="请输入代理名字或者手机号" v-model="nameorphone" >
     <div v-if="info.length!=0">
     <div class="agent">
        <ul>
            <li v-for="item in info">
                <div class="agent_l">
                <img src="./../../assets/i/01/02.png" alt="">
                <div>
                    <p>{{item.name}}</p>
                    <small>{{item.phone}}</small>
                </div>
                </div>
                <div class="agent_r" v-for="ac in item.ach">
                    <p v-if="ac.sum == null">包数：0包</p>
                    <p v-if="ac.sum != null">包数：{{ac.sum}}包</p>
                    <span>货款总额：￥{{ac.price+0}}</span>
                    <span>除去邮费：￥{{ac.price-ac.postage}}</span>
                </div>

            </li>
            <!-- //// -->
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
            nameorphone:''
        }
    },
    components:{
        nodata
    },
    watch:{
        nameorphone(data){
            // console.log(data)
                 this.apiPost('team/rec_gen',
        {
            search:data,
            start_time:this.$route.query.time,
            end_time:this.$route.query.end_time,            
            token:localStorage.getItem('token')
        }).then(res=>{
            console.log(res.data,111)
            
            if(res.data.data.length>0){
            this.info=res.data.data                
            }else{
                this.info={},
                Toast('没有匹配的用户')
            }
        }).catch(err=>{
            console.log(err)
        })
        }
    },
    methods:{
        onClickLeft(){
            this.$router.back(-1)
        }
    },
    mounted(){
        this.apiPost('team/rec_gen',{
            token:localStorage.getItem('token'),
            start_time:this.$route.query.time,
            end_time:this.$route.query.end_time            
        }).then(res=>{
            console.log(res.data,'推荐总代月业绩')
            if(res.data.code==200){
                // Toast(res.data.message)
                // console.log(res.data.data)
                this.info=res.data.data
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
.agent ul li{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #fff;
    padding: .5em;
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
    /* color: red; */
    /*color: #ccc;*/
    font-size: .9em;
}

</style>