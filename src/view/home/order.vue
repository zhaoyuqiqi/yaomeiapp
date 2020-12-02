<template>
<scroller :on-infinite="infinite"  :on-refresh = "refresh" :noDataText="noDataText" ref="my_scroller">
    <div>
        <van-nav-bar title="我的推荐代理订单" left-arrow @click-left="onClickLeft"/>

       <div v-if="info.length!=0">
                  <div class="crd" v-for="item in info">
                 <router-link :to="{name:'ord', params:{id:item.order_no}}">                                                       
             <ul>                  
                 <li>
                     <div>
                     <img src="./../../assets/i/home/1.png" alt=""><span>{{item.get_user.name}} | {{item.consignee}}</span>
                     </div>
                     <small>{{item.create_time}}</small>
                     <strong>{{item.status}}</strong>
                 </li>
                 <li>
                     <!-- <p>混批</p> -->
                     <h4>{{item.sum}}包商品</h4>
                     <p>￥{{item.price}}</p>
                 </li>
                 <li>
                     <em>订单号：{{item.order_no}}</em>
                     <div class="stat">                       
                     </div>
                 </li>
             </ul>
                 </router-link>             
         </div>
       </div>
       <div v-else='info.length==0'>
           <nodata></nodata>
       </div>
       
    </div>
      </scroller>
</template>
<script>
  import Vue from 'vue'
  import {Toast} from 'vant'
  import nodata from '../../components/noData'
  
  Vue.use(Toast);
export default {
    data(){
      return{
          info:[],
            page_num:0,
          noDataText:"--我也是有底线的--", 
      }  
    },
    components:{
      nodata
    },
    methods:{
          getData(done){
       this.apiPost("AuditOrder/gen_order", {
          token: localStorage.getItem("token"),
          page_num: this.page_num
        }).then(res => {
          console.log(res.data.data);
          if(res.data.data.length<1){
              this.page_num--;
            done(true);
            return 
          }else{
              if (done){
                done();
              } 
          }
          if (this.page_num == 1) {
              this.info = res.data.data   //如果是想下滑动，刷新数据 就让items等于最新数据
            } else {
              this.info = this.info.concat(res.data.data) //否则就把数据拼接
            }          
        });
    },
    infinite(done) {
      this.page_num++;
      this.getData(done);
    },

    //done()表示这次异步加载数据完成，加载下一次
    //因为这个是同步的，加了setTimeout就是异步加载数据；
    //因为涉及到this指向问题，所以将他放在一个变量里。
    refresh (done) { //这是向下滑动的时候请求最新的数据
      this.page_num = 1
      this.getData(done)
    },
        onClickLeft(){
            // this.$ruter.push(-1)
            this.$router.back(-1)
        },
        reject(data){
            this.apiPost('AuditOrder/rejected_order',{
                order_no:data,
                token:localStorage.getItem('token')
            }).then(res=>{
                // console.log('驳回',res)
                if(res.data.code==200){
                      Toast(res.data.message)
                    //  this.$router.push('order')
                      location.reload()
                }else{
                    Toast(res.data.message)
                }
               
            })    
        },
        adopt(data){
            this.apiPost('AuditOrder/audit_order',{
                order_no:data,
                token:localStorage.getItem('token')
            }).then(res=>{
                // console.log('TG',res.data.message)
                if(res.data.code==200){
                    Toast(res.data.message)
                    location.reload()
                }else{
                    Toast(res.data.message)
                }
            })
        }
    },
    mounted(){
        // this.apiGet('AuditOrder/gen_order',{
        //     token:localStorage.getItem('token')
        // }).then(res=>{
        //     console.log(res.data.data,11)
        //     this.info=res.data.data
        // })
    }
}
</script>
<style scoped>
    .crd{
        /* color: gr; */
        margin: 1em;
        background-color: #fff;
        padding: 0 1em;
        font-size: 13px;
        border-radius: .5em;
        box-shadow: 0 0 .5em .1em #ccc;
    }
    .crd ul li{
        text-align: left;
        display:flex;
        justify-content: space-between;
        padding: 1em 0;
        border-bottom: 1px solid #f8f8f8;
        color: #000;
    }
    .crd ul li img{
        width: 1em;
        vertical-align: middle;
        margin: 0 .5em;
    }
    .crd ul li span{
        vertical-align: middle;
    }
    .crd ul li em{
        font-style: normal;
        font-size: 12px;
        color: #ccc;
    }
    small{
        font-size: 12px;
        color: #ccc;
    }
    .stat span{
        padding: .3em 1em;
        background-color: #b43e3a;
        color: white;
        margin: 0 .3em;
        border-radius: 1em;
    }
    .stat span:first-child{
        background: green;
    }
</style>
