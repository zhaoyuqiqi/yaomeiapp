<template>
    <div class="sale">
       <van-nav-bar title="销售明细" left-arrow  @click-left="onClickLeft"/>
       <div v-if="sum>0" >
          <div class="sale_list">
            <h4>普通批发</h4>
        <ul  v-for="item in info2">
            <li>
                <div class="sale_left">
               <img :src="item.img" alt="">
                <div>
                    <h2>{{item.name}}</h2>
                    <small>拿货价 ￥{{item.price}}</small>
                </div>
                </div>
               
                <div class="sale_rigth">
                    <h2>{{item.sum}}包</h2>
                </div>
            </li>
            <!-- ////// -->
        </ul>
        </div>
<!-- 混批 -->
   <div class="sale_list total">
            <h4>混批</h4>
        <ul  v-for="item in info1">
            <li>
                <div class="sale_left">
               <img :src="item.img" alt="">
                <div>
                    <h2>{{item.name}}</h2>
                    <small>拿货价 ￥{{item.price}}</small>
                </div>
                </div>
               
                <div class="sale_rigth">
                    <h2>{{item.sum}}包</h2>
                </div>
            </li>
            <!-- ////// -->
        </ul>
        </div>
        <!-- 底部结算 -->
        <footer>
           <div>
                    <h5>
                普通批发总计:
            </h5>
            <p>
                {{goods_num2}}包
            </p>
            </div>
                <div>
                <h5>
                混批总计:
            </h5>
            <p>
                {{goods_num1}}包
            </p>
            </div>
            
        </footer>
       </div>
       <div v-else='sum==0'>
           <nodata></nodata>
       </div>
  
    </div>
</template>
<script>
import Vue from 'vue';
import { NavBar, Toast } from 'vant';
import nodata from '../../components/noData'
Vue.use(NavBar);
export default {
    name:'sale',
    data(){
        return{
            info1:{},
            info2:[],
            goods_num1:'',
            goods_num2:'',
            sum:'',
            date:''
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
        console.log(123);
        var date = this.$route.query.date;

        this.apiGet('achievement/sales_details',
        {
            date:date,
            token:localStorage.getItem('token'),
            start_time:this.$route.query.time,
            end_time:this.$route.query.end_time
        }
            

        ).then(res=>{
        
            var list=res.data;
            console.log(res,2222)
            if(list.code==200){
            this.info1=list.data.god,
            this.info2=list.data.good,            
            this.goods_num1=list.data.goods_num1;
            this.goods_num2=list.data.goods_num2;
            this.sum=this.info1.length+this.info2.length
            }else{
                Toast('意外的错误')
            }
        })
    }
}
</script>
<style scoped>
.sale_list{
    background-color: #fff;
    padding:0 .5em;
}
/* .sale_left:last-child{
    margin: 1em 0 5em 0;
    
} */
.total{
    margin: 0em 0 5em 0;

}
.sale_list h4{
    font-size: .9em;
    text-align: left;
    margin: 0 .5em;
    border-bottom: 1px solid #f4f4f4;
    padding: 0.3em 0;
}
.sale_list ul li{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #f4f4f4;
    padding: .5em 0;
}
.sale_list ul li .sale_left{
    display: flex;
    flex-direction: row;
}
.sale_list ul li img{
    display:block;
    width: 4em;
    height: 4em;
    background-color: #ccc;
    margin: 0 .5em;
}
.sale_list ul li h2{
    font-weight: normal;
    font-size: 1.2em;
}
.sale_list ul li p{
    color: #b43e3a;
    font-size: .9em;
}
.sale_list ul li div{
    text-align: left;
}
.sale_list small{
    color: #ccc;
}
.sale_left div{
    display: flex;
    flex-direction: column;
    justify-content: space-around
}
.sale_rigth{
    display: flex;
    flex-direction: column;
    justify-content:center;
}

footer{
    position: fixed;
    width: 100%;
    line-height: 3em;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    bottom: 0;
    background-color: #fff;
    font-size: 1em;
    /* padding: 0 1em; */
}
footer>div{
    display: flex;
}
footer p{
    color: #b43e3a;
    font-size: .9em;
}
footer span{
    color: #ccc;
    font-weight: normal;
    margin: 0 .5em;
}
</style>
