<template>
    <div>
    <van-nav-bar title="我的代理" left-arrow @click-left="onClickLeft"/>

    <div v-if="list_info.length!=0">
   <input type="text" name="" id="" placeholder="请输入代理名字或者手机号" v-model="nameorphone" >

    <div class="agent">
      <h5 @click='checkTJ'>推荐代理（{{list_info.count2}}）<van-icon name="wap-nav" class='fr'/></h5>        
        <div  v-for="(item,index) in list_info.res" v-if="item.type == 1" >
        <ul v-show='hasTJ'>
            <router-link :to="{name:'son', params:{id:item.id}}">
              <li>
                <div class="agent_l">
                  <div v-if="item.sex == 2">
                <img src="../../assets/i/01/d1.png" alt="">                
                 </div>
                 <div v-else-if="item.sex != 2 ">
                <img src="../../assets/i/01/d2.png" alt="">                    
                 </div>
                <div>
                    <p>{{item.name}}</p>
                    <small>{{item.phone}}</small>
                </div>
                </div>
                <div class="agent_r">                
                </div>
            </li>
            </router-link>
        </ul>
        </div>
        <!-- //////直属代理 -->
          <h5 @click='checkZS'>直属代理（{{list_info.count1}}）<van-icon name="wap-nav" class='fr'/></h5>        
        <div  v-for="(item,index) in list_info.res" v-if="item.type == 2">
        <ul v-show='hasZS'>
            <router-link :to="{name:'son', params:{id:item.id}}">
              <li>
                <div class="agent_l">
               <div v-if="item.sex == 2">
                <img src="../../assets/i/01/d1.png" alt="">                
                 </div>
                 <div v-else-if="item.sex != 2 ">
                <img src="../../assets/i/01/d2.png" alt="">                    
                 </div>
                <div>
                    <p>{{item.name}}</p>
                    <small>{{item.phone}}</small>
                </div>
                </div>
                <div class="agent_r">  
                </div>
            </li>
            </router-link>
    <!-- //// -->
        </ul>
        </div>
         
    </div>
    </div>
    <div v-else-if='list_info.length == 0'>
       <nodata></nodata>
    </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Toast} from 'vant';
import nodata from '../../components/noData'
Vue.use(NavBar);
export default {
    data(){
        return{
            nameorphone:'',
            list_info:[],
            hasTJ:false,
            hasZS:false,
        }
    },
    components:{
        nodata
    },
    watch:{
        nameorphone(data){
              this.apiPost('agent/myagent',
        {
            nameorphone:data,
            token:localStorage.getItem('token')
        }).then(res=>{
            if(res.data.data.length>0){
            this.list_info.res=res.data.data   
            console.log(this.list_info)           
            }else{
                this.list_info={},
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
        },
        checkZS(){
            if(this.hasZS){
                this.hasZS=false
            }else{
                this.hasZS=true
            }
        },
        checkTJ(){
            if(this.hasTJ){
                this.hasTJ=false
            }else{
                this.hasTJ=true
            }
        }
    },
    mounted(){
        
        this.apiGet('agent/myagent',
        {
            token:localStorage.getItem('token'),
            id:localStorage.getItem('id')
        }).then(res=>{
            console.log(res.data.data,11)
            if(res.data.code==200){
                this.list_info=res.data.data;
                console.log(this.list_info,'22')
            }else{
                Toast(res.data.message)
            }
    

        }).catch(err=>{
            console.log(err)
        })
    }
}
</script>
<style scoped>
.fr{
    float:right;
    padding-right:.5em;
    padding-top:.8em;
}
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
p{
    color: #000
}
.agent ul li{
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
.agent h5{
    display: block;
    height:2.5em;
    line-height: 2.5em;
    text-align: left;
    background-color: #fff;
    margin: 1em 0 .05em 0;
    padding: .3em 1em;
}
</style>

