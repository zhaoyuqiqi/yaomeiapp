<template>
    <div>
         <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft"/>
         <div class="sale_list">
             <ul>
                <li v-for="item in info.get_goods">
                <div class="sale_left">
               <img :src="item.img" alt="">
                <div>
                    <h2>{{item.goods_name}}</h2>
                    <!-- <p>￥50</p> -->
                    <small>{{item.price}}元 x {{item.sum}}包</small>
                </div>
                </div>
                <div class="sale_rigth">
                   <p>￥{{item.price * item.sum}}</p>
                </div>
            </li>
            <li>
                <h5>包数：</h5>
                <h2><p>{{info.sum}}包</p></h2>
            </li>
            <li>
                <h5>邮费：</h5>
                <h2><p>￥{{info.postage}}</p></h2>
            </li>
              <li>
                <h5>总计：</h5>
                <h2><p> ￥{{info.price}}</p></h2>
            </li>
             </ul>
          
         </div>
         <!-- 收货人信息 -->
         <div class="consignee">
              <ul>
                 <li>
                     <h5>收货人</h5>
                     <input type="text" placeholder="请输入收货人姓名" v-model="info.consignee" disabled>
                 </li>
                 <li>
                     <h5>联系方式</h5>
                     <input type="text" placeholder="请输入收货人联系方式" v-model="info.phone" disabled>
                 </li>
                    <li>
                      <h5>收货地址</h5>
                      <div class="ord">
                      <input type="text" class="input" @click.prevent="address" v-model="info.province+info.city+info.area" disabled> <br>
                      <input type="text" v-model="info.address_deta" disabled>
                      </div>
                    </li>
                    <li>
                      <h5>选择快递</h5>                        
                      <input type="text"  class="input" @click.prevent="express" v-model="info.log_type" disabled> <br> 
                    </li>
                    <li>
                      <h5>备注</h5>                        
                      <input type="text"  placeholder="" v-model="info.log_name" disabled> <br> 
                    </li>
             </ul>
         </div>
            <!-- 收货人信息end -->
            <!-- 弹出收货人地址 -->
            <van-popup v-model="show" position="bottom" :overlay="true" >
                <van-area :area-list="areaList" @confirm='ok' @cancel='no'/>
            </van-popup>
            <!-- 弹出快递选择 -->
            <van-popup v-model="isshow" position="bottom" :overlay="true">
                <van-picker :columns="columns" @change="onChange" />
            </van-popup>
    </div>
</template>
<script>
import Vue from 'vue';
import { NavBar,Popup,Picker,Area  } from 'vant';
import area from './../../assets/js/area.js'
Vue.use(NavBar).use(Popup).use(Picker).use(Area);
export default {
    data(){
        return{
            name:'',         //收货人姓名
            name_tel:'',     //收货人联系电话
            detail_drs:'',  //收货人详细地址
            show:false,
            isshow:false,
            value:'',
            values:'',
            columns: ['普通快递', '顺丰快递', '顺丰空运','无需快递'],
            areaList:area,
            info:[]
        }
    },
    methods:{
        onClickLeft(){
            this.$router.back(-1)
        },
        // 地址选择
        address(){
            this.show=true
        },
        express(){
            this.isshow=true
        },
         onChange(picker, value, index) {
            this.value=value,
            this.isshow=false
        },
        log_name(){
            this.isshow=true
        },
      ok(value){
        // console.log(1)
        this.show=false;
        // this.values=value
        // console.log(value.code)
             var list='';
        
         value.forEach(item => {
             list +=item.name+" ";
            //  console.log(item.name);
            //  list+=item.name
            
         });
             this.values=list
         console.log(this.values)
        console.log(typeof this.values)
      },
      no(){
        // console.log(2)
        this.show=false
      }

    },
    mounted(){
        this.apiPost('AuditOrder/order_details',{
            token:localStorage.getItem('token'),
            order_no:this.$route.params.id
        }).then(res=>{
            console.log(1111,res.data.data)
            this.info=res.data.data
        })
    }
}
</script>
<style scoped>
.sale_list{
    background-color: #fff;
    padding:0 .5em;
    margin: .5em 0 .5em 0;
}
.sale_list h4{
    font-size: .9em;
    text-align: left;
    margin: 0 .5em;
    border-bottom: 1px solid #f4f4f4;
    padding: 0.3em 0;
}
.sale_list h5{
    display: flex;
    align-items: center;
    margin:0 0.5em ;
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
    justify-content: space-between;
}
.sale_rigth{
    display: flex;
    flex-direction: column;
    justify-content:flex-end;
}
.consignee ul li{
    display: flex;
    padding: 1em 1.5em;
    background-color: #fff;
    border-bottom: 1px solid #f4f4f4;
}
.consignee ul li h5{
    flex: 1;
    text-align: left;
    display: flex;
    font-size: 1.2;
    /* justify-content: center;
     */
     align-items: center;
}
.consignee ul li input{
    flex: 4;
    vertical-align: middle;
    border-style: none;
    border-bottom: 1px solid #f4f4f4;
    font-size: .9em;
}
.consignee ul li .ord{
    flex: 4;
    width: 100%;
}
.consignee ul li .ord h5{
    flex: 1;
    text-align: left;
    display: flex;
    font-size: 1.2;
    flex-basis: top;
}
.consignee ul li .ord input{
    width: 100%;
    padding: .5em 0;
    background-color: white;
}

button{
    border-style: none;
    background-color: #b43e3a;
    color: white;
    width: 80%;
    border-radius: 2em;
    padding: .5em;
    margin: 2em 0;
}
button, input, textarea{
    background-color: white;
}
</style>
