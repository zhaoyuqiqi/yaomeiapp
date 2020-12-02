<template>
    <div id="home"> 
      <div class="home_top">
        <div class="home_content">
              
              <p>{{info.name}}</p>

        </div>
        <div class="home_tab">
          <ul>
            <li>
              <img src="../../assets/i/01/04.png" alt=""><br>
              <p>代理订单</p>
            </li>
            <li>
              <img src="../../assets/i/01/05.png" alt=""><br>
              <p>我的订单</p>
            </li>
          </ul>
          <div class="home_list">
            <div class="home_list_l" >
            <ol v-for="(item,index) in list">
            <router-link :to='{name:"sub",params:{index:index}}'><li>{{item}} <div :class="{dot_list:arr2[index]==1}"></div></li></router-link>
           </ol>
            </div>
          <div class="home_list_r">
            <ol v-for="(item,index) in list">
             <router-link :to='{name:"tab",params:{index:index}}'><li>{{item}} <div :class="{dot_list:arr1[index]==1}"></div></li> </router-link>
            </ol>
          </div>
          </div>
        </div>
      </div>
        <router-link to="order">
      <div class="home_tips">
        <img src="../../assets/i/home/1.png" alt="">
        <span>顾客订单</span> 
         <span class="dot">{{info.user_order}}</span>
      </div>
      </router-link>
        <router-link to="gen">
      <div class="home_tips_but">
        <img src="../../assets/i/home/1.png" alt="">
        <span>我的推荐代理订单</span> 
         <!-- <span class="dot">{{info.user_order}}</span> -->
      </div>
      </router-link>
        <!-- 底部标签栏 -->
              <div class="footer">
        <!-- <van-tabbar> -->
        <ul>
            <li  class="active">
              <router-link to="home" >
              <img src="../../assets/i/01/b01.png" alt=""><br>
              <span>主页</span>
              </router-link>
            </li>
            <li>
             <router-link to="person">
              <img src="../../assets/i/01/a02.png" alt=""><br>                   
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
import { Tabbar, TabbarItem } from "vant";
Vue.use(Tabbar).use(TabbarItem);
export default {
  data() {
    return {
        info:{},
        list:['待审核','已审核','已驳回'],
        arr1:[],
        arr2:[],
        id:localStorage.getItem('id')
      
    };
  },
  methods:{},
  mounted(){
    this.apiGet('index/index',{
      id:localStorage.getItem('id'),
      token:localStorage.getItem('token')
    }).then(res=>{
       console.log(res.data)
       var datalist=res.data;
       if(datalist.code==200){
         console.log(datalist.data,11111)
         this.info=datalist.data
         var arr1=[];
         var arr2=[];
         arr1[0]=datalist.data.order_red1;
         arr1[1]=datalist.data.order_red2;
         arr1[2]=datalist.data.order_red3;         
         arr2[0]=datalist.data.order_red4;
         arr2[1]=datalist.data.order_red5;
         arr2[2]=datalist.data.order_red6;       
         this.arr1=arr1; 
         this.arr2=arr2;
         console.log(1,this.arr1);
         console.log(2,this.arr2)
       }else{
         Toast("发生错误")
       }
    })
  }
  
};
</script>

<style scoped>
html{
  background-color: #f8f8f8;
}
.home_list ol li{
  /* white-space: nowrap; */
  width: 100%;
  align-items: center;
  border-bottom: 1px solid #f4f4f4;
  position: relative;
}
.dot_list{
  width: .8em;
  height: .8em;
  background-color: #b43e3a;
  border-radius: 50%;
  position: absolute;
  right: 20%;
  /* left: 10%; */
  /* top: 50%;
  
  transform: translateY(-50%) */
  top: 35%;
}
.home_list ol{
  width: 100%;
}
.home_list>div{
  width: 50%;
  text-align: center;
  padding: 0 2em;
}
.home_top{
  background: #b43e3a url('../../assets/i/home/11.png') no-repeat center 25%/35%;
  height: 15em;
  border-radius: 0 0 1em 1em;
  position: relative;
}
.home_top .home_content{
  position: absolute;
  width: 70%;
  margin-left: 15%;  
  bottom: 5em;
  /* background: #fff; */
  color: #fff;
  font-size: 1rem;
}
.home_top .home_content ul{
  display: flex;
  justify-content: space-between;
}
.home_top .home_tab{
width: 90%;
  position: absolute;
  bottom: -85%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: .5em;
  font-size: 13px;
  font-weight: 600;
  color: #999;
  border-radius: 0.5em;
  background-color: #fff;
}
.home_top .home_tab ul{
  border-radius: .5em .5em  0 0;
  padding: 1em 0;
  background-color: #000000;  
  display: flex;
  justify-content: space-around;
  color: #ffffff;  
}

.home_top .home_tab ul img{
  width: 3em;
}
.home_top .home_tab .home_list{
  font-weight: normal;
  display: flex;
  justify-content: space-around;
 box-shadow:  0px 0.5em 1.5em 0.1em #ccc;
  
}

.home_top .home_tab .home_list li{
  padding: 1.5em 0;
      color: #000;
  border-bottom: 1px solid #f4f4f4;
}
.home_tips{
  margin: 14em 0 1em 0;
  padding: 2em 0;
  width: 90%;
  background-color: #fff;
  margin-left: 5%;
  box-shadow: 0 0 1.5em .1em #ccc;
  position: relative;
  border-radius: .5em;
}
.home_tips span{
  vertical-align: middle;
      color: #000;
}
.home_tips img{
  vertical-align: middle;
  margin: 0 .5em;
  width: 1.5em;
}
.home_tips .dot{
  width: 1.5em;
  line-height: 1.5em;
  position: absolute;
  right: 1em;
  top: 50%;
  transform: translateY(-50%);
  background-color: #b43e3a;
  color: white;
  /* padding: .3em; */
  border-radius: 50%;
}
/* ````````````````````````````````````` */
.home_tips_but{
  margin: 1em 0 7em 0;
  padding: 2em 0;
  width: 90%;
  background-color: #fff;
  margin-left: 5%;
  box-shadow: 0 0 1.5em .1em #ccc;
  position: relative;
  border-radius: .5em;
}
.home_tips_but span{
  vertical-align: middle;
      color: #000;
}
.home_tips_but img{
  vertical-align: middle;
  margin: 0 .5em;
  width: 1.5em;
}
/* //// */

</style>
