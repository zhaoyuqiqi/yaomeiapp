<template>
<scroller :on-infinite="infinite"  :on-refresh = "refresh" :noDataText="noDataText" ref="my_scroller">
    <div>
    <van-nav-bar title="代理销量排行" left-arrow @click-left="onClickLeft"/>
    <div v-if="info.length!=0">
  <input type="text" name="" id="" placeholder="请输入代理名字或者手机号" v-model="nameorphone" >

    <div class="agent">
        <ul>
              <li v-for="item in info">
               <router-link  :to="{name:'sale', params:{id:item.user_id}}">
                  
                <div class="agent_l">
                <img src="./../../assets/i/01/02.png" alt="">
                <div>
                    <p>{{item.get_user.name}}</p>
                    <small>{{item.get_user.phone}}</small>
                </div>
                </div>
                <div class="agent_r">  
                        <p>{{item.sum}}包</p>
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
      nameorphone: "",
      page_num: 0,
       noDataText:"--我也是有底线的--", 
    };
  },
  components: {
    nodata
  },
  watch: {
    nameorphone(data) {
      // console.log(data)
      this.apiPost("team/rankings", {
        search: data,
        start_time: this.$route.query.time,
        end_time: this.$route.query.end_time,
        token: localStorage.getItem("token")
      })
        .then(res => {
          console.log(res.data, 111);

          if (res.data.data.length > 0) {
            this.info = res.data.data;
          } else {
            (this.info = {}), Toast("没有匹配的用户");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    getData(done) {
      this.apiPost("team/rankings", {
        token: localStorage.getItem("token"),
        start_time: this.$route.query.time,
        end_time: this.$route.query.end_time,
        page_num: this.page_num
      }).then(res => {
        console.log(res.data.data);
        if (res.data.data.length < 1) {
          this.page_num--;
          done(true);
          return;
        } else {
          if (done) {
            done();
          }
        }
        if (this.page_num == 1) {
          this.info = res.data.data; //如果是想下滑动，刷新数据 就让items等于最新数据
        } else {
          this.info = this.info.concat(res.data.data); //否则就把数据拼接
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
      this.$router.back(-1);
    }
  },
  mounted() {
    // this.apiPost("team/rankings", {
    //   token: localStorage.getItem("token"),
    //   start_time: this.$route.query.time,
    //   end_time: this.$route.query.end_time,
    //   page_num: this.page_num
    // }).then(res => {
    //   console.log("yuexiaol", res);
    //   if (res.data.code == 200) {
    //     // console.log(res.data)
    //     console.log(res.data.data);
    //     this.info = res.data.data;
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
  padding: 0.5em 3em 0.5em 0;
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
