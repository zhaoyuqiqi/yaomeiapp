<template>
<scroller :on-infinite="infinite"  :on-refresh = "refresh" :noDataText="noDataText" ref="my_scroller">
    <div>
    <van-nav-bar title="代理列表" left-arrow @click-left="onClickLeft"/>
    <input type="text" name="" id="" placeholder="请输入代理名字或者手机号"  v-model="search"/>
    <div v-if="info.length!=0">
  

    <div class="agent">
        <ul>
            <li v-for="item in info">
            <router-link :to="{path:'/detail', query:{id:item.id,start_time:start_time,end_time:end_time}}"> 
            <!-- <router-link :to='{path:"/detail",query:{id:item.id, time:date_time, end_time:date_time1}}'>                    -->
                <div class="agent_l" >
                <img src="./../../assets/i/01/02.png" alt="">
                <div>
                    <p>{{item.name}}</p>
                    <small>{{item.phone}}</small>
                </div>
                </div>
                <div class="agent_r">           
                    <p>个人销量：{{item.order.sum}}包</p>
                    <span v-if="grade==0">获得返利: ￥{{item.rebate_price.price}}</span>
                    <span v-if="grade==1">贡献返利: ￥{{item.rebate_price.price}}</span>
                </div>
            </router-link>
            </li>
        </ul>
    </div>
    </div>
    <div v-else='info.length==0'>
        <nodata></nodata>
    </div>
    </div>
  </scroller>
</template>
<script>
import Vue from "vue";
import { NavBar, Toast } from "vant";
import nodata from "../../components/noData";
Vue.use(NavBar).use(Toast);
export default {
  data() {
    return {
      info: [],
      search: "",
      grade: "",
      start_time: "",
      end_time: "",
      page_num: 0,
      noDataText: "--我也是有底线的--"
    };
  },
  components: {
    nodata
  },
  watch: {
    search(data) {
      this.apiPost("team/rebate_deta", {
        search: this.search,
        start_time: this.$route.query.time,
        end_time: this.$route.query.end_time,
        token: localStorage.getItem("token")
      })
        .then(res => {

          if (res.data.code == 200) {
            this.info = res.data.data.data;
            var arr = [];
            for (var i in this.info) {
              arr.push(this.info[i]);
            }
            // console.log(arr.length)
            for (var i = 0; i < arr.length; i++) {
              // console.log(arr[i].rebate_price.price)
              for (var j = i + 1; j < arr.length; j++) {
                if (arr[i].rebate_price.price < arr[j].rebate_price.price) {
                  var flag = arr[i];
                  arr[i] = arr[j];
                  arr[j] = flag;
                }
              }
            }
            this.info = arr;
          } else {
            (this.info = []), Toast("没有匹配的用户");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    getData(done) {
        console.log(done)
      this.apiPost("team/rebate_deta", {
        token: localStorage.getItem("token"),
        start_time: this.$route.query.time,
        end_time: this.$route.query.end_time,
        page_num: this.page_num
      }).then(res => {
        console.log(res.data.data.data);
        var arr = [];
        for(var i in res.data.data.data){
          arr.push(res.data.data.data[i])
        }
         for (var i = 0; i < arr.length; i++) {
              // console.log(arr[i].rebate_price.price)
              for (var j = i + 1; j < arr.length; j++) {
                if (arr[i].rebate_price.price < arr[j].rebate_price.price) {
                  var flag = arr[i];
                  arr[i] = arr[j];
                  arr[j] = flag;
                }
              }
            }
        if (arr.length < 1) {
          this.page_num--;
          done(true);
          return;
        } else {
          if (done) {
            done();
          }
        }
        
        if (this.page_num == 1) {
          this.info = arr; //如果是想下滑动，刷新数据 就让items等于最新数据
        } else {
          this.info = this.info.concat(arr); //否则就把数据拼接
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
    refresh(done) {
      //这是向下滑动的时候请求最新的数据
      this.page_num = 1;
      this.getData(done);
    },
    onClickLeft() {
      this.$router.back(-1);
    }
  },
  mounted() {
    console.log(this.$route.query);
    // this.apiPost("team/rebate_deta", {
    //   token: localStorage.getItem("token"),
    //   start_time: this.$route.query.time,
    //   end_time: this.$route.query.end_time,
    //   page_num: this.page_num
    // }).then(res => {
    //   console.log(res.data, "aa");
    //   if (res.data.code == 200) {
    //     this.info = res.data.data.data;
    //     console.log(res.data.data.data)
    //     var arr = [];
    //     for (var i in this.info) {
    //       arr.push(this.info[i]);
    //     }
    //     // console.log(arr.length)
    //     for (var i = 0; i < arr.length; i++) {
    //       // console.log(arr[i].rebate_price.price)
    //       for (var j = i + 1; j < arr.length; j++) {
    //         if (arr[i].rebate_price.price < arr[j].rebate_price.price) {
    //           var flag = arr[i];
    //           arr[i] = arr[j];
    //           arr[j] = flag;
    //         }
    //       }
    //     }
    //     this.info = arr;
    //     this.grade = res.data.data.grade;
    //     // console.log(this.info)
    //     // console.log(this.grade)
    //   }
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
.agent ul li a {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff url("./../../assets/i/01/arrl.png") no-repeat 95% center/3%;
  padding: 0.5em 2.5em 0.5em 0;
  margin: 0.3em 0;
}
.agent ul li .agent_l {
  display: flex;
  flex-direction: row;
  text-align: left;
  /* flex-basis: content; */
}
.agent ul li .agent_l div {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.agent ul li .agent_l img {
  margin: 0 0.5em;
  width: 3em;
  height: 3em;
}
.agent ul li .agent_l small {
  color: #ccc;
}
.agent ul li .agent_r {
  display: flex;
  flex-direction: column;
  text-align: right;
  justify-content: space-around;
}
.agent ul li .agent_r span {
  color: #b43e3a;
  font-size: 0.9em;
}
</style>
