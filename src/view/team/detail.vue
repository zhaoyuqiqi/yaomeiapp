<template>
    <div>
          <van-nav-bar :title="name+'的业绩'" left-arrow @click-left="onClickLeft"/>
          <div class="time"><span @click="tshow()">{{date_time}}</span><span @click="tshow1()">{{date_time1}}</span></div>          
          <van-popup v-model="show" position="bottom" :overlay='true'>
                 <van-datetime-picker v-model="currentDate" type="date"  :max-date="maxDate" @cancel='close' @confirm='determine'/>
          </van-popup>
            <van-popup v-model="show1" position="bottom" :overlay='true'>
                 <van-datetime-picker v-model="currentDate1" type="date"  :max-date="maxDate" @cancel='close1' @confirm='determine1'/>
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
                   <span>拿货总额(不含运费)</span>
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
                  <router-link :to="{path:'/tagent', query:{id:id, start_time:date_time,end_time:date_time1}}">
                   <div>
                   <img src="../../assets/i/01/09.png" alt="">
                   <span>返利来源明细</span>
                   </div>
                  <p><img src="../../assets/i/01/arrl.png" alt=""></p>
                 </router-link>
                 </li> 
                          
                 <li>
                   <div>
                   <img src="../../assets/i/01/08.png" alt="">
                   <span>个人销售</span>
                   </div>
                  <p>{{info.goods_num}}包</p>
                 </li>
                          <li>                 
                  <router-link :to="{path:'/sale',query:{id:id, start_time:date_time,end_time:date_time1}}">
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
     currentDate1: new Date(),
     show : false,
     show1: false,
     maxDate: new Date(),
     tab:['业绩金额','商品数量'],
     num:0,
     info:{},
     name:'',
     id:this.$route.query.id,
     date:this.$route.query.date
    };
  },
  computed:{
    date_time(){
      var date=new Date(this.currentDate);
      return date.getFullYear() + '-' + this.add((date.getMonth() + 1)) + '-' + this.add(date.getDate())
    },
    date_time1(){
      var date=new Date(this.currentDate1);
      return date.getFullYear() + '-' + this.add((date.getMonth() + 1)) + '-' + this.add(date.getDate())
    }
  },
  watch:{
   date_time(data){
      this.date1 = data;
      var date2=this.date2;
      var id = this.$route.query.id;
      console.log(data,'查看时间')
      this.apiGet('team/agency_per',{
        start_time:data,
        end_time:date2,
        id:id,
        token:localStorage.getItem('token')
      }).then(res=>{
        console.log(res,'shsas')
        this.info=res.data.data
      }).catch(err=>{
        console.log(err)
      })
    },
    date_time1(data){
      this.date2= data;
      var date1=this.date1;
      var id = this.$route.query.id;
      console.log(data,'查看时间')
      this.apiGet('team/agency_per',{
        start_time:date1,
        end_time:data,
        id:id,
        token:localStorage.getItem('token')
      }).then(res=>{
        console.log(res,'shsas')
        this.info=res.data.data
      }).catch(err=>{
        console.log(err)
      })
    }
  
  },
  methods:{
    tshow(){
      this.show=true;
    },
    close(){
      this.show=false;
    },
    determine(){
      this.show=false;
    },
         tshow1(){
      this.show1=true;
    },
    close1(){
      this.show1=false;
    },
    determine1(){
      this.show1=false;
    },
    tabstyle(index){
      this.num=index;
    },
    onClickLeft(){
      this.$router.back(-1)
    },
  add(obj){
      if(obj<10) return '0'+obj;
      else return obj
    },
  },

  mounted(){
    this.apiGet('team/agency_per',{
      user_id:this.id,
      date_time:this.date,
      start_time:this.$route.query.time,
      end_time:this.$route.query.end_time,
      token:localStorage.getItem('token')
    }).then(res=>{
      var list=res.data
      console.log(list,222)
      if(list.code == 200){
         
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
/* input{
  text-align: center;
  border-style: none;
  background: url('../../assets/i/01/arr.png') no-repeat right/10%;
  padding: .5em 0;
} */
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
.person_list ul li a{
  display: flex;
  width: 100%;
  justify-content: space-between;  
}
</style>
