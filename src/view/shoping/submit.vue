<template>
    <div>
        <van-nav-bar title="确认订单" left-arrow  @click-left="onClickLeft"/>
        <h5>请仔细核对订单，确认无误后提交<br>
            <div v-if="info.grade == 1">
                联系总代微信付款发货，谢谢~
            </div>
        </h5>
        <div class="address">
            <ul>
                <li>
                    <img src="../../assets/i/01/23.png" alt="">
                    <span><strong>收货人</strong> {{info.consignee}}</span>
                </li>
                  <li>
                    <img src="../../assets/i/01/22.png" alt="">
                    <span><strong>联系方式</strong>  : {{info.phone}}</span>
                </li>
                  <li>
                    <img src="../../assets/i/01/21.png" alt="">
                    <span><strong>收货人地址</strong> : {{info.province_name}} {{info.city_name}} {{info.area_name}} {{info.address_deta}}</span>
                </li>
            </ul>
        </div>
        <div class="sm_ord">
            <ul>
                <li class="tow">
                    <p>商品数量：{{info.bag}}件商品</p>
                    <h3>￥{{info.goods_total_price}}</h3>
                </li>
                   <li class="tow">
                    <p>选择快递：{{info.postage_name}}</p>
                    <h3>￥{{info.postage}}</h3>
                </li>
                <li>
                    <p>备注：{{info.log_name}}</p>
                </li>
                  <li>
                    <p>订单号：{{info.order_no}}</p>
                </li>
                 <li>
                    <p>下单时间：{{info.time}}</p>
                </li>
            </ul>
        </div>
        
        <footer>
            <ul>
                <li>
                    <span>合计:<strong>￥{{info.goods_total_price + info.postage}}</strong></span>
                </li>
                 <li @click="upOk">
                    提交订单
                </li>
            </ul>
        </footer>
    </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Toast } from 'vant';
Vue.use(NavBar);
export default {
    data(){
        return{
            info:{
            }
        }
    },
  
    methods:{
      onClickLeft(){
          this.$router.back(-1)
      },
      upOk(){
          if(localStorage.getItem('token')){
             this.apiPost('order/sub_order',{
              token:localStorage.getItem('token'),
              goods:localStorage.getItem('list')
           }).then(res=>{
            //    console.log(res)
            if(res.data.code==200){
                this.$router.push('tab/:1')
            }else{
                Toast(res.data.message)
            }
           })
          }else{
             this.apiPost('order/sub_order',{
              user_id:localStorage.getItem('id'),
              goods:localStorage.getItem('list')
           }).then(res=>{
            if(res.data.code==200){
                this.$router.push('Success')
            }else{
                Toast(res.data.message)
            }
           })
          }
      }
    
    },
    mounted(){

        var str=localStorage.getItem('list')
        this.info=JSON.parse(str)
    }
}
</script>
<style scoped>

    h5{
        background-color: #fff;
        color: #ccc;
        padding: 1em;
        margin: .5em 0;
        font-weight: normal;
    }
    .address{
        background-color: #fff;
        text-align: left;
        font-size: .8em;
        padding: .5em 1em;
        line-height: 2        
    }
    .address ul li img{
            width: 2em;
            vertical-align: middle;

    }
    .address ul li span{
        vertical-align: middle;
    }
    .sm_ord{
        font-size: .9em;
        color: #888;
        background-color: #fff;
        padding: 1em;
        margin-top: 1em;
        line-height: 2
    }
    .sm_ord ul li{
        text-align: left;
    }
    .sm_ord ul .tow{
        display: flex;
        justify-content: space-between;
    }
    .sm_ord h3{
        color: #b43e3a;
    }
    footer{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        /* border-top: 1px solid #cccccc; */
        background-color: #fff;
        box-shadow: 0 0 1em .1em #ccc;
        font-size: 1.2em;
    }
    footer ul{
        display: flex;
        flex-direction: row;
    }
    footer ul li{
        width: 50%;
        padding: 1em 0;
    }
    footer ul li:first-child{
        border-right: 1px solid #ccc;
    }
    footer ul li:first-child strong{
        color: #b43e3a;
    }
    footer ul li:last-child{
        background-color: #b43e3a;
        color: white;
    }
</style>
