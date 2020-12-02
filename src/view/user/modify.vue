<template>
    <div>
        <van-nav-bar left-arrow @click-left="onClickLeft"/>
        <div class="set_img">
             <div v-if="info.sex == 2">
            <img src="../../assets/i/01/d1.png" alt="">                
            </div>
            <div v-else-if="info.sex != 2 ">
            <img src="../../assets/i/01/d2.png" alt="">                    
            </div>
            <p>{{name}}</p>
           <!-- <router-link to="modify" > <span>修改密码</span></router-link> -->
        </div>

    <div class="set_list">
        <ul>
             <li>
                <div>
                    <img src="../../assets/i/01/20.png" alt="">
                    <span>旧密码：</span>
                    <input type="password" v-model="odd" placeholder="请输入旧密码">
                </div>
    
            </li>
              <li>
                <div>
                    <img src="../../assets/i/01/18.png" alt="">
                    <span>新密码：</span>
                    <input type="password" v-model="new_pas" placeholder="请输入新密码">
                </div>
            </li>
                 <li>
                <div>
                    <img src="../../assets/i/01/19.png" alt="">
                    <span>确认密码：</span>
                    <input type="password" v-model="enter_pas" placeholder="请再次输入密码">
                </div>
            </li>
        </ul>

    </div>
         <button @click="modify">确认修改</button>


    </div>
</template>
<script>
import Vue from "vue";
import { NavBar,Toast } from 'vant';

Vue.use(NavBar).use(Toast);

export default {
data(){
        return{
           name:"",
           odd:'',
           new_pas:'',
           enter_pas:'',
           info:{}
        }
    },
    methods:{
        onClickLeft(){
            this.$router.back(-1)
        },
        modify(){
            if(!this.odd){
                Toast('请输入旧密码')
                return
            };
            if(!this.new_pas){
                Toast('要设置的密码不能为空')
                return
            };
            if(!this.enter_pas){
                Toast('再次确认密码不能为空')
                return
            }else{
                if(this.new_pas != this.enter_pas){
                    Toast('确认密码跟设置的密码不一致')
                    return
                }
            }
            var data = {
                old_password:this.odd,
                password:this.new_pas,
                password_confirm:this.enter_pas,
                token:localStorage.getItem('token')
            }
            console.log(localStorage.getItem('token')+1111);
            this.apiPost('member/changePassword',data).then(res=>{
                // console.log('112312',res)
                console.log(this.$router)
                Toast(res.data.message)
                localStorage.removeItem('token');
                this.$router.push({path:'/login'})
            })
        }
    },
    mounted(){
        this.apiGet('member/info',{
            id:localStorage.getItem('id'),
            token:localStorage.getItem('token')
        }).then(res=>{
            // console.log(res,11212)
            if(res.data.code==200){
                 var list=res.data.data
            this.name=list.name
            this.info=res.data.data
            }else{
                Toast(res.data.message)
            }
           
        }).catch(err=>{
            Toast('意外的错误')
        })
    }
}
</script>
<style scoped>
    .set_img{
    background-color: #fff;
    padding: 1em 0;
    border-bottom: 1px solid #f4f4f4;
       }
        .set_img img{
            width: 6em;
            height: 6em;
            border-radius: 3em;
        }
        .set_img p{
            margin: 0 0 .5em 0;
        }
    .set_img span{
        font-size: .8em;
        border: 1px solid #b43e3a;
        padding: .3em 1em;
        border-radius: 1em;
        color: #b43e3a;
    }

    /* /// */
    .set_list{
        margin: 1em 0;
    }
   .set_list ul li{
       display: flex;
       justify-content: space-between;
       line-height: 3em;
       background-color: #fff;
       /* padding: 0  0 0 em; */
       /* box-sizing: border-box; */
       font-size:.8em;
       margin: .2em 0;
   }
   .set_list ul li div img{
       width: 2em;
       vertical-align: middle;
       margin: 0 1em;
   }
   .set_list ul li div span{
       vertical-align: middle;
   }
   .set_list ul li div input{
     vertical-align: middle;
     border-style: none;
     outline: none;
     border: 0px;
   }
   .set_list ul li>input{
       display:inline-block;
       padding:0 1.5em;
       box-sizing: border-box;
         vertical-align: middle;
       border-style: none;
     outline: none;
     border: 0px;
     background-color: #b43e3a;
     color: white;
   }
   button{
       width: 80%;
       background-color:#b43e3a;
       color: white;
       border: none;
       outline: none;
       padding: .5em;
       border-radius: 3em;
       margin: 3em 0;
   }
</style>
