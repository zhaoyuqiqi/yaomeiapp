<template>
    <div  style="background-color: #fff">
        <!-- 顶部 -->
        <van-nav-bar left-arrow @click-left="onClickLeft" title="忘记密码"/>
        <div class="login_bgc"></div>
        <div class="box">
            <div class="login_box" >
                 <span>手机号:</span>
            <input type="number" pattern="[0-9]*" placeholder="请输入手机号" v-model="phone">
                <input type="button" :value="but" @click="code" :disabled="btnCodeDisabled">
            </div>
            <div class="login_box" >
                 <span>设置密码:</span>
            <input type="password" placeholder="设置您的密码" v-model="password">
                
            </div>
             <div class="login_box" >
                 <span>确认密码:</span>
            <input type="password" placeholder="确认您的密码" v-model="enterPassword">
                
            </div>
            <div class="login_box">
                 <span>验证码:</span>
            <input type="number" pattern="[0-9]*" name="" id="" placeholder="请输入验证码" v-model="verification">

           </div>
            <input type="submit" value="找回密码" @click="reg"/>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { NavBar,Toast } from 'vant';
Vue.use(NavBar).use(Toast);
export default {
    data(){
     return{
        phone:'',
        password:'',
        enterPassword:'',
        verification:'',
         but:'获取验证码',
        btnCodeDisabled:false
     }
    },
    methods:{
   onClickLeft(){
       this.$router.back(-1)
   },
   code(){
          if(!this.phone){
           Toast('手机号码不能为空')
           return
       }
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
       this.apiPost('member/sendSms',{
           phone:this.phone
       }).then(res=>{
           console.log(res)
       })
      
   },
   reg(){
      if(!this.phone){
          Toast('手机号不能为空')
          return
      }
      if(!this.password){
          Toast('设置密码不能为空')
          return
      }
      if(!this.enterPassword){
          Toast('请确认你输入的密码')
          return
      }
      if(!this.verification){
          Toast('请输入验证码')
          return
      }
      if(!this.password != !this.enterPassword){
          Toast('两次密码输入的不一致')
          return
      }
      this.apiPost('member/forgetPassword',{
          phone:this.phone,
          password:this.password,
          code:this.verification
      }).then(res=>{
          if(res.data.code==200){
          Toast('修改密码成功，去登录')
          this.$router.push('login')
          }else{
              Toast(res.data.message)
          }
      
      })
   }

    }
}
</script>
<style scoped>
    .login_bgc{
        background: url('../../assets/i/home/11.png')no-repeat center bottom/40%;
        height: 7em;
    }
    form{
        margin: 1em 0;
    }
    input{
        width: 80%;
        margin: .5em 0;
        border-radius: 1em;
        outline: none;
        border-style: none;
        border:1px solid #ccc;
        padding: .5em 0 .5em 5.5em ;
        box-sizing: border-box;
        vertical-align: middle;
        background-color: #fff;
        -webkit-appearance:none;
    }
     .longin_reg{
        margin-left: 10%;
        width: 80%;        
         display: flex;
        justify-content: space-between;
    }
      a{
        color: blue;
        text-decoration:underline;
    }
     input[type='submit']{
        background-color: #37c437;
            margin: 8em 0 17em 0;
        padding: .5em 0 .5em 0 ;
        color: #fff;
    }
    .login_box{
        position: relative;
    }
    .login_box span{
        position: absolute;
        left: 3.5em;
        top:50%;
        transform: translateY(-50%)
    }
    input[type='button']{
        position: absolute;
        padding: .5em 0 .5em 0 ;
        top: 0;
        right: 10%; 
        width: 6em;    
        color: white;
        background-color: #37c437;   
    }
    div:first-child input[type='number']{
        padding-right: 6em;
    }
</style>