<template>
    <scroller :on-infinite="infinite"  :on-refresh = "refresh" :noDataText="noDataText" ref="my_scroller">
    <div>
        <van-nav-bar title="代理订单" left-arrow @click-left="onClickLeft"/>

            <van-tabs v-model="active">

            <van-tab v-for="(items,index) in list" :title='items' :key=index>
               <input type="text" name="" id="" placeholder="请输入订单号/收货人姓名或手机"  v-model="search"/>
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
                        <div v-if="item.status==2"> 
                          后台待审核
                        </div>
                        <div v-else-if="item.status==3" style="color:green"> 
                          {{items}}
                        </div>
                        <div v-else>
                          {{items}}
                        </div>
                      </strong>
                 </li>
                 <li> 
                     <h4>{{item.sum}}包商品</h4>
                     <p>￥{{item.goods_price_one + item.postage}}</p>
                 </li>
                 <li>
                     <em>订单号：{{item.order_no}}</em>
                     <div v-if="item.status==1"> 
                         <div class="stat">
                               <span @click.prevent="adopt(item.order_no)">通过</span>
                               <span @click.prevent="reject(item.order_no)">驳回</span> 
                        </div>
                     </div>
                     <div v-else="item.status!=1">
                         <div class="stat">
                     </div>
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
      search:''
    };
  },
  components: {
    nodata
  },
  watch: {
    search(){
       this.page_num=1;
      this.apiPost("AuditOrder/lower_order", {
        token: localStorage.getItem("token"),
        status: this.active,
        page_num: this.page_num,
        order_num:this.search
      }).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.info = res.data.data;
        } else {
          Toast(res.data.message);
        }
      });
    
    },
    active(res) {
      this.page_num=1;
      this.apiPost("AuditOrder/lower_order", {
        token: localStorage.getItem("token"),
        status: res,
        order_num:this.search,
        page_num: this.page_num
      }).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.info = res.data.data;
        } else {
          Toast(res.data.message);
        }
      });
    }
  },
  methods: {
    getData(done){
       this.apiPost("AuditOrder/lower_order", {
          token: localStorage.getItem("token"),
          status: this.active,
          page_num: this.page_num,
          order_no:this.search
        }).then(res => {
          if(res.data.data.length<1){
            this.page_num --;
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
    },
    reject(data) {
      this.apiPost("AuditOrder/rejected_order", {
        order_no: data,
        token: localStorage.getItem("token")
      }).then(res => {
        // console.log('驳回',res)
        if (res.data.code == 200) {
          Toast(res.data.message);
          //  this.$router.push('order')
          location.reload();
          this.$router.push("/sub/2");
        } else {
          Toast(res.data.message);
        }
      });
    },
    adopt(data) {
      this.apiPost("AuditOrder/audit_order", {
        order_no: data,
        token: localStorage.getItem("token")
      }).then(res => {
        // console.log('TG',res.data.message)
        if (res.data.code == 200) {
          location.reload();
          this.$router.push("/sub/1");
        }
      });
    }
  },
  mounted() {
    // this.apiPost("AuditOrder/lower_order", {
    //   token: localStorage.getItem("token"),
    //   status: this.$route.params.index,
    //   page_num: 1
    // }).then(res => {
    //   this.info = res.data.data;
    // });
  }
};
</script>
<style scoped>
input {
  margin: 1em 0;
  padding: 0.5em 3em 0.5em 1em;
  width: 70%;
  border-radius: 2em;
  border-style: none;
  border: 1px solid #cccccc;
  background: #fff url("../../assets/i/01/so.png") no-repeat 95% center/7%;
  text-align: center;
}
.crd {
  margin: 1em;
  background-color: #fff;
  padding: 0 1em;
  font-size: 13px;
  border-radius: 0.5em;
  box-shadow: 0 0 0.5em 0.2em #ccc;
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


