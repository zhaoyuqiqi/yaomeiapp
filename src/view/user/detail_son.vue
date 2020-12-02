<template>
    <div>
          <van-nav-bar :title="name+'的业绩'" left-arrow @click-left="onClickLeft"/>
          <!-- <div class="time"><input type="text" v-model="date_time" @click="tshow"></div> -->
          <div class="time"   @click="tshow()"><span>{{date_time}}</span></div>          

          <van-popup v-model="show" position="bottom" :overlay='true'>
                 <van-datetime-picker v-model="currentDate" type="year-month"  :max-date="maxDate" @cancel='close' @confirm='determine'/>
          </van-popup>
         
         <div class="tab">
            <div class="circular" :class="{active:num==0}">
              <img src="../../assets/i/01/11.png" alt="">
              <p>￥{{info.price_sum}}</p>
              <small>业绩金额</small>
            </div>
           <div class="circular" :class="{active:num==1}">
              <img src="../../assets/i/01/10.png" alt="">
              <p>{{info.goods_num}}包</p>
              <small>商品数量</small>
            </div>

            <div class="list">
            <ul v-for="(item,index) in tab">
              <li :class="{active:index==num}" @click="tabstyle(index)">{{item}}</li>
            </ul>
            </div>
             <!-- 列表-->
             <div class="person_list">
               <ul>
                 <li>
                   <div>
                   <img src="../../assets/i/01/06.png" alt="">
                   <span>拿货总额</span>
                   </div>
                  <p>￥{{info.price_goods}}</p>
                 </li>
                 <li>
                   <div>
                   <img src="../../assets/i/01/07.png" alt="">
                   <span>返利总额</span>
                   </div>
                  <p>￥{{info.first_money}}</p>
                 </li>
                 <li>
                   <div>
                   <img src="../../assets/i/01/08.png" alt="">
                   <span>个人销售</span>
                   </div>
                  <p>{{info.goods_num}}包</p>
                 </li>
                  <li>                 
                 <router-link :to="{name:'sale', params:{id:id}}">
                   <div>
                   <img src="../../assets/i/01/09.png" alt="">
                   <span>销售明细</span>
                   </div>
                  <p><img src="../../assets/i/01/arrl.png" alt=""></p>
                 </router-link>
                 </li>             
               </ul>
             </div>
         </div>
    </div>
</template>
<script>
import Vue from "vue";
import { Tabbar, TabbarItem,DatetimePicker, Popup,Toast} from "vant";
Vue.use(Tabbar).use(TabbarItem).use(DatetimePicker).use( Popup).use(Toast);
export default {
  data() {
    return {
     currentDate: new Date(),
     show : false,
     maxDate: new Date(),
     tab:['业绩金额','商品数量'],
     num:0,
     info:{},
     name:'',
     id:this.$route.params.id
    };
  },
  computed:{
    date_time(){
       var date=new Date(this.currentDate);
      return date.getFullYear() + '-' + this.add((date.getMonth() + 1))
    }
  },
  watch:{
    date_time(data){
      this.apiPost('achievement/personal',{
        second_time:data,
        token:localStorage.getItem('token')
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })


    }
  },
  methods:{
     add(obj){
      if(obj<10) return '0'+obj;
      else return obj
    },
    tshow(){
      this.show=true;
    },
    close(){
      this.show=false;
    },
    determine(){
      this.show=false;
    },
    tabstyle(index){
      this.num=index;
    },
    onClickLeft(){
      this.$router.back(-1)
    }
  },
  mounted(){
    this.apiPost('achievement/personal',{
      id:this.id,
      token:localStorage.getItem('token')
    }).then(res=>{
      var list=res.data
      console.log(res)
      if(list.code == 200){
    //  Toast(list.message)        
      this.info=list.data
      this.name=list.data.name
      }else{
        Toast(list.message)
      }
    }).catch(err=>{
        Toast('出现错误')
    })
  }
};
</script>

<style scoped>
.time span{
  text-align: center;
  border-style: none;
  background: url('../../assets/i/01/arr.png') no-repeat right/8%;
  padding: .5em 0;
  width: 40%;
  display: inline-block;
}
.time{
  background-color: #fff;
  padding: 1em 0 .2em 0;
  border-bottom: 1px solid #f4f4f4;
}
.circular{
  display: none;
  width: 8em;
  height: 8em;
  border-radius: 50%;
  background-color: #fff;
  margin: 2em auto;
  box-shadow: 0 0 1em .1em #ccc;
}
.circular img{
  width: 2em;
  margin-top: 1em
}
.active{
  display: block;
}
.list{
  display: flex;
  font-size: 14px;
  justify-content: center;
  /* border-radius: .2em;     */
}
.list ul{
  border: 1px solid #b43e3a;
}
.list ul li{
  /* float: left; */
  padding: .1em .3em;
}
.list li.active{
  background-color: #b43e3a;
  color: white;
}

/* 列表样式 */
.person_list{
background-color: #fff;
margin: 2em 0 8em 0;
padding: 0 1em;
}
.person_list ul li{
  display: flex;
  justify-content: space-between;
  padding: .5em 0;
  border-bottom: 1px solid #f4f4f4;
}
.person_list ul li a{
  display: flex;
  width: 100%;
  justify-content: space-between;  
}
.person_list ul li div img{
  vertical-align: middle;
  width: 1.5em;
  margin: 0 .5em;
}
.person_list ul li div span{
  vertical-align: middle;
  color: #777;
  font-size: .9em;
}
.person_list ul li p{
 display: flex;
 align-items: center;
}
</style>
