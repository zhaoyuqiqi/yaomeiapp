<template>
    <div>
         <van-nav-bar title="填写订单" left-arrow @click-left="onClickLeft"/>
         <div class="sale_list">
             <ul>
                <li v-for="(item,index) in goods" :key="index">
                <div class="sale_left">
               <img :src="item.img" alt="">
                <div>
                    <h2>{{item.name}}</h2>
                    <!-- <p>￥50</p> -->
                    <small>{{item.price}}元 x {{item.num}}包</small>
                </div>
                </div>
                <div class="sale_rigth">
                   <p>￥{{item.goods_price}}</p>
                </div>
            </li>
            <li>
                <h5>总计：</h5>
                <h2><p> ￥{{prc}}</p></h2>
            </li>
             </ul>
         </div>
         <!-- 收货人信息 -->
         <div class="consignee">
              <ul>
                 <li>
                     <h5>收货人</h5>
                     <input type="text" placeholder="请输入收货人姓名" v-model="info.consignee">
                 </li>
                 <li>
                     <h5>联系方式</h5>
                     <input type="number" pattern="[0-9]*" placeholder="请输入收货人联系方式" v-model="info.phone">
                 </li>
                    <li>
                      <h5>收货地址</h5>
                      <div class="ord">
                      <!-- <input type="text" placeholder="           省           市            区            "  class="input" @click="address()" v-model="values"> -->
                      <pre class="input" @click="address()">{{values}}</pre>
                       <br>
                      <input type="text" placeholder="请输入收货人的详细地址" v-model="info.address_deta">
                      </div>
                    </li>
                    <li>
                        
                    </li>
                    <li>
                      <h5>选择快递</h5>                        
                      <!-- <input type="text" placeholder="请选择快递方式"  class="input" @contextmenu.prevent="express()" v-model="value"> -->
                      <pre class="input" @click="express()">{{value}}</pre>
                       <br>                        
                    </li>
                    <li>
                       <h5>备注</h5>
                       <input type="text" placeholder="（选填）" v-model="info.log_name">
                   </li>
             </ul>
         </div>
       <button @click="outord">确认订单</button>

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
import { NavBar,Popup,Picker,Area, Toast, Tabbar  } from 'vant';
import area from './../../assets/js/area.js'
Vue.use(NavBar).use(Popup).use(Picker).use(Area);
export default {
    data(){
        return{
         
            show:false,
            isshow:false,
            value:'请选择快递方式',
            values:'      省       市      区',
            columns: ['请选择快递方式','普通快递', '顺丰空运', '顺丰陆运','无需快递'],
            areaList:area,
            goods:[],
            prc:'',
            list:{},
            info:{
                bag:'',
                gen_total_price:'',
                goods:[],
                goods_total_price:'',
                grade:'',
                order_type:'',
                status:'',
                type:'',
                user_id:'',
                province_code:'',
                city_code:'',
                area_code:'',
                log_type:'',  //快递方式
                consignee:'',         //收货人姓名
                phone:'',     //收货人联系电话
                address_deta:'' ,//收货人详细地址
                log_name:'' ,//备注
            }
        }
    },
    methods:{
        onClickLeft(){
            this.$router.back(-1)
        },
        // 地址选择
        address(){
            this.show=true;
            // ev.preventDefault()
        },
        express(){
            this.isshow=true;
            // ev.preventDefault()
        },
        onChange(picker, value, index) {
            this.value=value,
            this.info.log_type=index,
            this.isshow=false
            // console.log(this.nowindex)
        },
        ok(values){
        // console.log(1)
        this.show=false;
        // this.values=value
        console.log(values,111)
             var list='';
        
         values.forEach(item => {
             list +=item.name+" ";
         });
             this.info.province_code=values[0].code
             this.info.city_code=values[1].code
             this.info.area_code=values[2].code
             this.values=list
      },
      no(){
        // console.log(2)
        this.show=false
      },
    outord(){
          if(!this.info.consignee){
            Toast('收货人姓名不能为空')
            return
          }
          if(!this.info.phone){
            Toast('收货人电话不能为空')
            return
          }else{
            var pattern = /^0{0,1}(1[0-9][0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
            str = this.info.phone;
            if (!pattern.test(str)){
              Toast('请输入正确的手机号码')
              return
            }
          }
           if(!this.info.province_code){
            Toast('收货省份不能为空')
            return
          }
             if(this.info.city_code<1){
            Toast('收货城市不能为空')
            return
          }
              if(this.info.area_code<1){
            Toast('收货地区不能为空不能为空')
            return
          }
           if(!this.info.address_deta){
            Toast('详细地址不能为空')
            return
          }
        //   console.log(this.info)
            console.log(this.info,'带过去的参数')            
        
        this.apiPost('order/confirm_sub',{
            // token:localStorage.getItem('token'),
            goods:JSON.stringify(this.info)
        }).then(res=>{
            // console.log(res)
            if(res.data.code==200){
                      
                if(res.data.data.postage!=0){
                    res.data.data.postage-=1;
                     console.log(res.data.data)
                localStorage.setItem('list',JSON.stringify(res.data.data))
                this.$router.push('submit')
                }else{
                Toast('你选择的收货城市暂时不支持此种快递方式，请更换快递方式再尝试')
                }
                // Toast(res.data.message);
            }else{
                Toast(res.data.message)
            }
        })
        }
    },
    mounted(){
    //   console.log(this.areaList)
      if(localStorage.getItem('token')){
               this.apiPost('order/fill_order',{
            token:localStorage.getItem('token'),
            // user_id:localStorage.getItem('id'),
            goods:localStorage.getItem('data')
        }).then(res=>{
            if(res.data.code==200){
                this.goods=res.data.data.goods,
                this.prc=res.data.data.goods_total_price
                this.info=res.data.data
                // console.log(this.info,1231)
            }else{
                Toast('意外的错误')
            }
        })
      }else{
               this.apiPost('order/fill_order',{
            // token:localStorage.getItem('token'),
            user_id:localStorage.getItem('id'),
            goods:localStorage.getItem('data')
        }).then(res=>{
            console.log(res,11111)
            if(res.data.code==200){
                this.goods=res.data.data.goods,
                this.prc=res.data.data.goods_total_price
                this.info=res.data.data
                // console.log(this.info,1231)
            }else{
                Toast('意外的错误')
            }
        })
      }
      this.list = JSON.parse(localStorage.getItem('list'))
       console.log(JSON.parse(localStorage.getItem('list')),"缓存列表")
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
}

.input{
    background:url('../../assets/i/01/arr.png') no-repeat right/7%;
    border-bottom: 1px solid #f4f4f4;
    /* height: ;     */
    text-align: left;
    color: #666;
    font-size: 1.1em;
    flex: 4
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
</style>
