<template>
    <div>
          <van-nav-bar title="个人业绩"/>
          <!-- <div class="time"><input type="text" v-model="date_time" @click="tshow()" disabled></div> -->
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
                   <div>
                   <img src="../../assets/i/01/08.png" alt="">
                   <span>个人销售</span>
                   </div>
                  <p>{{info.goods_num}}包</p>
                 </li>
                  <li>                 
                 <router-link :to='{path:"/Psale",query:{time:date_time, end_time:date_time1}}'>
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
        <!-- 底部标签栏 -->
              <div class="footer">
        <ul>
            <li  >
              <router-link to="home" >
              <img src="../../assets/i/01/a01.png" alt=""><br>
              <span>主页</span>
              </router-link>
            </li>
            <li class="active">
             <router-link to="person">
              <img src="../../assets/i/01/b02.png" alt=""><br>                   
              <span>个人业绩</span>
             </router-link>
            </li>
            <li>
              <router-link :to="{name:'shop',params:{id:id}}">
              <span>
              <img src="../../assets/i/01/00.png" alt="">
            </span>
              </router-link>
            </li>
                 <li>
              <router-link to="team">                   
              <img src="../../assets/i/01/a03.png" alt=""><br>                               
              <span>团队</span>
              </router-link>
            </li>
                 <li>
              <router-link to="user">                   
              <img src="../../assets/i/01/a04.png" alt=""><br>                                      
              <span>我的</span>
              </router-link>
            </li>
        </ul>
       </div>
    </div>
</template>
<script>
import Vue from "vue";
import { Tabbar, TabbarItem,DatetimePicker, Popup} from "vant";
Vue.use(Tabbar).use(TabbarItem).use(DatetimePicker).use( Popup);
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
     info:[],
     id:localStorage.getItem('id')
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
      console.log(data,'查看时间')
      this.apiGet('achievement/personal',{
        start_time:data,
        end_time:date2,
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
      console.log(data,'查看时间')
      this.apiGet('achievement/personal',{
        start_time:date1,
        end_time:data,
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
    }
  },
  mounted(){
    this.apiPost('achievement/personal',{
      token:localStorage.getItem('token')
    }).then(res=>{
      console.log(res.data.data)
      this.info=res.data.data
    })
  }
};
</script>

<style scoped>
.time span{
  border-style: none;
  background: url('../../assets/i/01/arr.png') no-repeat right/10%;
  padding: .4em 0;
  width: 35%;
  display: inline-block;
  box-sizing: border-box;
}
.time span:first-child{
  margin-left: -1em;
}
.time{
  display: flex;
  justify-content: space-around;
}
.time{
  padding:.4em 0;
  background-color: #fff;
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
  /* color: #777; */
  font-size: .9em;
  color: #000;
}
.person_list ul li p{
 display: flex;
 align-items: center;
}
</style>
