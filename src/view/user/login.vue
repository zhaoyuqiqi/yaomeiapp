<template>
    <div style="background-color: #fff;">
        <div class="login_bgc"></div>
        <div class="box">
            <div class="login_box" >
                 <span>账号：</span>
            <input type="number" pattern="[0-9]*" placeholder="请输入账号" v-model="userinfo.phone">
                
            </div>
           <div class="login_box">
                 <span>密码：</span>
               
            <input type="password" name="" id="" placeholder="请输入密码" v-model="userinfo.password">

           </div>
            <div class="longin_reg">
            <router-link to="reg">立即注册</router-link>
            <router-link to="font">忘记密码</router-link> 
            </div>
                      
            <input type="button" value="立即登录" @click="onLoginClick">
            <div class="banben">版本号：1.920.626</div>
        </div>
        
    </div>
</template>
<script>
import Vue from 'vue';
import { NavBar, Field ,CellGroup,Icon,Button,Toast } from 'vant';
Vue.use(NavBar).use(Field).use(CellGroup).use(Icon).use(Button).use(Toast);
export default {
    data(){
        return{
           userinfo:{
            phone:'',
            password:''
           } 
        }
    },
    methods:{
       onLoginClick() {
			// 用户登陆
			if(!this.userinfo.phone){
				Toast('请输入手机号');
				return;
			}
			if(!this.userinfo.password) {
				Toast('请输入密码');
				return;
			}
            this.apiPost('member/login', 
            {
			 phone: this.userinfo.phone,
		     password: this.userinfo.password
			}).then((res) => {
                // console.log(res)
                var data=res.data
                if(data.code==200){
                    localStorage.setItem('username',this.userinfo.phone)
                    localStorage.setItem('password',this.userinfo.password)
                    Toast(data.message)
                      var user_id=data.data.user.id
                      var token=data.data.token
                      localStorage.setItem('id',user_id);
                      localStorage.setItem('token',token)
                      this.$router.push('home')
                }else{
                    Toast(data.message)
                }
            }).catch(
                (err)=>{
                    Toast('意外错误:'+err.message)
                }
            )
		}
    },
    mounted(){
        this.apiPost('member/login',{
            phone:localStorage.getItem('username'),
            password:localStorage.getItem('password')
        }).then(res=>{
            if(res.data.code==200){
            this.$router.push('home')
            }else{
                this.$router.push('login')
            }
        }).catch(err=>{
            Toast('发生错误：'+err)
        })
    }
}
</script>


<style scoped>
    /* html{
        background-color: #fff ;
    } */
    .login_bgc{
        background: url('../../assets/i/home/11.png')no-repeat center/40%;
        height: 15em;
    }
     input{
        width: 80%;
        margin: 1em 0;
        border-radius: 1em;
        outline: none;
        border-style: none;
        border:1px solid #ccc;
           padding: .5em 0 .5em 3.2em;
        box-sizing: border-box;
        vertical-align: middle;
        -webkit-appearance:none;
        /* background-color: #f8f8f8; */
        outline: none;
    }
     .longin_reg{
        margin:0 13% 0 13%;
        width:74%;        
         display: flex;
        justify-content: space-between;
    }
      a{
        color: #88a8ff;
        text-decoration:underline;
    }
     input[type='button']{
        background-color: #37c437;
        margin: 6em 0 1em 0;
        padding: .5em 0 .5em 0 ;
        color: #fff;
    }
    .banben{
        background-color: #fff;
        padding: 0 0 14em 0;
        font-style:italic;
        font-size: 14px;
        color: #aaa; 
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
</style>

