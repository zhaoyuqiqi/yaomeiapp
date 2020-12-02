<template>
    <div style="background-color: #fff">
        <!-- 顶部 -->
        <van-nav-bar left-arrow @click-left="onClickLeft" title="用户注册"/>
        <div class="login_bgc"></div>
        <div class="box">
            <div class="login_box" >
                 <span>手机号:</span>
            <input type="number" pattern="[0-9]*" placeholder="请输入手机号" v-model="phone">
                
            </div>
              <div class="login_box" >
                 <span>姓名:</span>
            <input type="text" placeholder="请输入真实姓名" v-model="name">
                
            </div>
              <div class="login_box" >
                 <span>身份证:</span>
            <input type="text" :placeholder="userInfo.idcard" v-model="ID">
                
            </div>
            <div class="login_box" >
                 <span>推荐人:</span>
            <input type="number" pattern="[0-9]*" placeholder="请输入推荐人手机号" v-model="refereePhone" @blur="pson">                
            </div>
            <div class="login_box" >
                 <span>推荐人:</span>
            <input type="text" placeholder="推荐人姓名" v-model="rec_names" disabled>  
            </div>
            <div class="login_box" >
                 <span>总代:</span>
            <input type="text" placeholder="总代姓名" v-model="total" disabled>  
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
                <input type="button" :value="but" @click="code" :disabled="btnCodeDisabled">
           </div>
            <div class="longin_reg">
            <router-link to="#"></router-link>
            <router-link to="login">已有账号，去登录</router-link> 
            </div>
            <input type="submit" value="立即注册" @click="reg"/>
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
        name:'',
        ID:'',
        refereePhone:'',
        total:'',
        password:'',
        enterPassword:'',
        verification:'',
        but:'获取验证码',
        btnCodeDisabled:false,
        rec_names:'',
        userInfo:''
     }
    },
    mounted(){
      this.apiGet('member/idcardmsg',{
      }).then(
        res=>{
          console.log(res.data.data)
          this.userInfo=res.data.data
        }
      )
  },
    methods:{
   onClickLeft(){
       this.$router.back(-1)
   },
   pson(){
    //    console.log(1)
    this.apiPost('member/automatic',{
        rec_id:this.refereePhone
    }).then(res=>{
        console.log(res.data.data)
        if(res.data.code==200){
          this.rec_names=res.data.data.rec_names 
          this.total=res.data.data.gen_phone            
        }else{
            Toast(res.data.message)
        }
    })
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
           if(res.data.code==200){
               Toast(res.data.message)
           }
       }).catch(err=>{
           Toast(res.data.message)
       }
       )
        
        

   },
   reg(){
       if(!this.phone){
           Toast('手机号码不能为空')
           return
       }else{
          var pattern = /^0{0,1}(1[0-9][0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
          str = this.phone;
          if (!pattern.test(str)){
            Toast('请输入正确的手机号码')
            return
          }
        }
       if(!this.name){
           Toast('姓名不能为空')
           return
       }
       // if(!this.ID){
       //     Toast('身份证不能为空')
       //     return
       // }
       if(!this.refereePhone){
           Toast('推荐人手机号不能为空')
           return
       }
       if(!this.password){
           Toast('请设置您的密码')
           return
       }
       if(!this.enterPassword){
           Toast('请确认您的密码')
           return
       }
       if(this.password != this.enterPassword){
           Toast('确认密码不一致')
           return
       }
       if(!this.verification){
           Toast('请输入验证码')
           return
       }
       this.apiPost('member/register',{
            phone:this.phone,
            password:this.password,
            code:this.verification,
            name:this.name,
            id_card:this.ID,
            rec_id:this.refereePhone,
            gen_id:this.total,
            password_confirm:this.enterPassword
       }).then(res=>{
        //    console.log(res)
        if(res.data.code==200){
            Toast('注册成功，去登录')
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
        color: #88a8ff;
        text-decoration:underline;
    }
     input[type='submit']{
        background-color: #37c437;
        margin: 4em 0 7em 0;
        padding: .5em 0 .5em 0 ;
        color: #fff;
    }
    .login_box{
        position: relative;
    }
    .login_box span{
        position: absolute;
        left: 3em;
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
        /*padding-right: 6em;*/
    }
</style>

