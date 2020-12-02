<template>
<scroller :on-infinite="infinite"  :on-refresh = "refresh" :noDataText="noDataText" ref="my_scroller">
    <div>
        <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft"/>
    
        <van-tabs v-model="active">
            <van-tab v-for="(items,index) in list" :title='items' :key=index>
    <div v-if="info.length!=0">
           <div class="crd"  v-for="item in info" >
                 <router-link :to="{name:'ord', params:{id:item.order_no}}">                                                                               
             <ul>
                 <li>
                     <div>
                     <img src="./../../assets/i/home/1.png" alt=""><span>{{item.get_user.name}} | {{item.consignee}}</span>
                     </div>
                     <small>{{item.create_time}}</small>
                     <strong>
                        <div v-if="item.status==1"> 
                          总代{{items}}
                        </div>
                        <div v-else-if="item.status==2"> 
                          后台{{items}}
                        </div>
                        <div v-else>
                          {{items}}
                        </div>
                     </strong>
                 </li>
                 <li> 
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
    <div v-if="info.length==0">
        <nodata></nodata>
    </div>
     

  </van-tab>
        </van-tabs>

    </div>
    </scroller>
</template>
<script>
import Vue from "vue";
import { Tab, Tabs, Toast } from "vant";
import nodata from "../../components/noData";
Vue.use(Tab)
  .use(Tabs)
  .use(Toast);
export default {
  data() {
    return {
      active: this.$route.params.index,
      info: [],
      list: ["待审核", "已审核", "被驳回"],
      noDataText:"--我也是有底线的--", 
      page_num:0,
    };
  },
  components: {
    nodata
  },
  watch: {
    active(res) {
      this.page_num=1;
      this.apiPost("AuditOrder/my_order", {
        token: localStorage.getItem("token"),
        status: res,
        page_num:this.page_num
      }).then(res => {
        if (res.data.code == 200) {
          this.info = res.data.data;
        } else {
          Toast(res.data.message);
        }
      });
    }
  },
  methods: {
      getData(done){
       this.apiPost("AuditOrder/my_order", {
          token: localStorage.getItem("token"),
          status: this.active,
          page_num: this.page_num
        }).then(res => {
          console.log(res.data.data);
          if(res.data.data.length<1){
            this.page_num --
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
    onClickLeft() {
      this.$router.push("/home");
    }
  },
  mounted() {
    // this.apiPost("AuditOrder/my_order", {
    //   token: localStorage.getItem("token"),
    //   status: this.$route.params.index,
    //   page_num:this.page_num
    // }).then(res => {
    //   if (res.data.code == 200) {
    //     this.info = res.data.data;
    //   } else {
    //     Toast(res.data.message);
    //   }
    // });
  }
};
</script>
<style scoped>
.crd {
  margin: 1em;
  background-color: #fff;
  padding: 0 1em;
  font-size: 13px;
  border-radius: 0.5em;
  box-shadow: 0 0 0.1em 0.1em #ccc;
}
.crd ul li {
  text-align: left;
  display: flex;
  justify-content: space-between;
  padding: 1em 0;
  border-bottom: 1px solid #f8f8f8;
  color: #000;
}
.crd ul li img {
  width: 1em;
  vertical-align: middle;
  margin: 0 0.5em;
}
.crd ul li span {
  vertical-align: middle;
}
.crd ul li em {
  font-style: normal;
  font-size: 12px;
  color: #ccc;
}
small {
  font-size: 12px;
  color: #ccc;
}
.stat span {
  padding: 0.3em 1em;
  background-color: #b43e3a;
  color: white;
  margin: 0 0.3em;
  border-radius: 1em;
}
.stat span:first-child {
  background: green;
}
</style>


