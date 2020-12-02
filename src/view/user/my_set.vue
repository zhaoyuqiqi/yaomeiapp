<template>
    <div>
        <van-nav-bar left-arrow @click-left="onClickLeft" title="修改信息"/>
        <div class="set_img">
         <div v-if="list.sex == 2">
            <img src="../../assets/i/01/d1.png" alt="">                
            </div>
            <div v-else-if="list.sex != 2 ">
            <img src="../../assets/i/01/d2.png" alt="">                
                
            </div>
            <p>{{name}}</p>
           <router-link :to="{name:'modify', params:{id:id}}"> <span>修改密码</span></router-link>
        </div>

    <div class="set_list">
        <ul>
            <li>
                <div>
                    <img src="../../assets/i/01/14.png" alt="">
                    <span>手机：</span>
                    <input type="number" v-model="tel" placeholder="请输输入手机号码">
                </div>
                <input type="button" :value="but" @click="vcode" :disabled="btnCodeDisabled">
            </li>
             <li class="ID">
                <div>
                    <img src="../../assets/i/01/15.png" alt="">
                    <span>身份证：</span>
                    <input type="number" v-model="ID" placeholder="请输入身份证号码">
                </div>
                <!-- <input type="button" value="发送验证码"> -->
            </li>
              <li>
                <div>
                    <img src="../../assets/i/01/15.png" alt="">
                    <span>验证码：</span>
                    <input type="text" v-model="code" placeholder="请输入验证码">
                </div>
                <!-- <input type="button" value="发送验证码"> -->
            </li>
        </ul>

    </div>
         <button @click="modify">修改信息</button>
    </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Toast } from "vant";

Vue.use(NavBar).use(Toast);

export default {
  data() {
    return {
      name: "",
      tel: "",
      ID: "",
      code: "",
      id: "",
      list:{},
       but:'获取验证码',
        btnCodeDisabled:false
    };
  },
  methods: {
    
    onClickLeft() {
      this.$router.back(-1);
    },
    modify() {
      if(!this.tel){
        Toast('手机号码不能为空')
        return
      }
      if(!this.code)
      {
        Toast('验证码不能为空')
        return
      }
      this.apiPost("member/info", {
        phone:this.tel,
        code:this.code,
        id_card:this.ID,
        token:localStorage.getItem("token")
      }).then(res => {
        // console.log(res.data);
        var list=res.data
        Toast(list.message)
        console.log(list)
        this.tel=list.data.phone,
        this.ID=list.data.id_card;
        // this.$router.push("/user");        
      }).catch(err=>{
          console.log(err)
      });
    },
    vcode() {
       let time =60;
            this.btnCodeDisabled = true;
            let clearId = setInterval(()=>{
                if(time>0){
                    time--;                    
                    this.but= time +"s 后重试";
                }else{
                    this.but = "获取验证码";
                    clearInterval(clearId);
                    this.btnCodeDisabled = false;
                }
            },1000)
      this.apiPost("member/sendSms", {
        phone: this.tel,
        token: localStorage.getItem("token")
      }).then(res => {
        Toast(res.data.message);
      });
    }
  },
  mounted() {
    this.apiGet("member/info", {
      id: localStorage.getItem("id"),
      token: localStorage.getItem("token")
    }).then(res => {
      // console.log("修改用户详情", res.data.data);
      if(res.data.code==200){
            var info = res.data.data;
      this.tel = info.phone;
      this.ID = info.id_card;
      this.name = info.name;
      this.id = info.id;
      this.list=res.data.data
      }else{
        Toast(res.data.message)
        this.$router.push('user')
      }
   
    });
  }
};
</script>
<style scoped>
.set_img {
  background-color: #fff;
  padding: 1em 0;
  border-bottom: 1px solid #f4f4f4;
}
.set_img img {
  width: 6em;
  height: 6em;
  border-radius: 3em;
}
.set_img p {
  margin: 0 0 0.5em 0;
}
.set_img span {
  font-size: 0.8em;
  border: 1px solid #b43e3a;
  padding: 0.3em 1em;
  border-radius: 1em;
  color: #b43e3a;
}

/* /// */
.set_list {
  margin: 1em 0;
}
.set_list ul li {
  display: flex;
  justify-content: space-between;
  line-height: 3em;
  background-color: #fff;
  /* padding: 0  0 0 em; */
  /* box-sizing: border-box; */
  font-size: 0.8em;
  margin: 0.2em 0;
}
.set_list ul li div img {
  width: 2em;
  vertical-align: middle;
  margin: 0 1em;
}
.set_list ul li div span {
  vertical-align: middle;
}
.set_list ul li div input {
  vertical-align: middle;
  border-style: none;
  outline: none;
  border: 0px;
        -webkit-appearance:none;
  
}
.set_list ul li > input {
  display: inline-block;
  padding: 0 1.5em;
  box-sizing: border-box;
  vertical-align: middle;
  border-style: none;
  outline: none;
  border: 0px;
  background-color: #b43e3a;
  color: white;
        -webkit-appearance:none;  
}
button {
  width: 80%;
  background-color: #b43e3a;
  color: white;
  border: none;
  outline: none;
  padding: 0.5em;
  border-radius: 3em;
  margin: 3em 0;
}
/* .ID{

} */
</style>
