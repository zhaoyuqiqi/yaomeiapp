<template>
    <div>
        <div v-if="token!=null">
            <van-nav-bar title="添加订单" left-arrow  @click-right="onClickRight" @click-left="onClickLeft" class="nav">
            <van-icon name="share" slot="right" />
            </van-nav-bar>
        </div>
        <div v-else="token==null"> 
            <van-nav-bar title="添加订单"></van-nav-bar>
        </div>
 
 <div class="sale_list">
            <!-- <h4>普通批发</h4> -->
        <ul>
            <li v-for="item in info">
                <div class="sale_left">
               <img :src="item.img" alt="">
                <div v-if="token!=null">
                    <h2>{{item.name}}</h2>
                    <p>￥{{item.price}}</p>
                    <small>拿货价 ￥{{item.price2}}</small>
                </div>
                <div v-else="token==null">
                    <h2>{{item.name}}</h2>
                    <p>￥{{item.price}}</p>
                </div>
                </div>
                <div class="sale_rigth">
                    <van-stepper v-model="item.num" :min="0" :default-value="0"/>
                </div>
            </li>
            <!-- ////// -->
        </ul>
        </div>
        <footer>
            <h5>总计：{{all}}包</h5>
            <p>￥{{product}}</p>
             <p>
              <strong @click="Porder">
                确定
            </strong>
            </p>

        </footer>
        <div class="popup" v-show="isShow">
           <!-- <span>{{url}}{{id}}<img src="../../assets/i//01/关闭.png" alt="" @click="close"></span> -->
           	<textarea  id="biao1">{{url}}{{id}}</textarea>
               <div class="btm">
                <button type='text' v-clipboard:copy="sysAppIds"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError">复制分享链接</button>
                <button @click="close">下次再说</button>
               </div>
                
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { NavBar,Icon,Stepper, Toast} from 'vant';

Vue.use(NavBar).use(Icon).use(Stepper);
export default {
    data(){
        return{
            sysAppIds:'http://51yaomei.com/share/#/shop/'+this.$route.params.id,
              info:[],
              isShow:false,
              url:'http://51yaomei.com/share/#/shop/',
              id:this.$route.params.id,
              token:localStorage.getItem('token')
        }
    },
    computed:{
        all(){
            var allNum=0;
            var that=this;
            for(let i=0;i<that.info.length;i++){
                allNum += that.info[i].num
            }
            return allNum
        },
        product(){
            var all=0;
            var _this=this
            for(let i=0; i<_this.info.length;i++){
                all +=_this.info[i].num*_this.info[i].price2
                
            }
            return all
        }
    },
    methods:{
        onClickRight(){
            this.isShow=true
        },
        onClickLeft(){
            this.$router.back(-1)
        },
        Porder(){
            var listdata=[];
            var list=[];
            var _this=this;
            for(let i=0;i<_this.info.length;i++){
                if(_this.info[i].num != 0){
                list={
                    id:_this.info[i].id,                   
                    num:_this.info[i].num
                }
                listdata.push(list)
                }
            }
            if(listdata.length>0){
                // console.log(listdata)
                // return false
                localStorage.setItem('data',JSON.stringify(listdata));
                this.$router.push('/order_detail')
            }else{
                Toast('请选择商品后再提交')
            }
        },
        close(){
            this.isShow=false
        },
        copy(){
   //          var Url2=document.getElementById("biao1");
			// Url2.select(); // 选择对象
			// document.execCommand("Copy"); // 执行浏览器复制命令
   //          // alert("已复制好，可贴粘。");
   //          this.isShow=false;
   //          Toast('已复制，去粘贴')
   //         
        
        },
        // 复制成功
        onCopy(e){
            // alert("已复制好，可贴粘。");
            this.isShow=false;
            Toast('已复制，去粘贴')
        },
        // 复制失败
        onError(e){
            alert("失败");
        },

    },
    mounted(){
        if(localStorage.getItem('token')){
       this.apiGet('goods/goods_list',{
        token:localStorage.getItem('token')
        }).then(res=>{    
            var datalist=res.data;
            if(datalist.code==200){
                var values=datalist.data
                var list=[]
                var items=[]
                values.forEach(item => {
                    list={
                        name:item.name,
                        price:item.price,
                        price2:item.price2,
                        num:item.num, 
                        id:item.id,
                        img:item.img
                    }
                   items.push(list)
                });
                   this.info=items
            }
        })
        }else{
         this.apiGet('goods/goods_list',{
         user_id:this.$route.params.id
        }).then(res=>{
            localStorage.setItem('id',this.$route.params.id)
            var datalist=res.data;
            if(datalist.code==200){
                var values=datalist.data
                var list=[]
                var items=[]
                values.forEach(item => {
                    list={
                        name:item.name,
                        price:item.price,
                        price2:item.price2,
                        num:item.num,
                        id:item.id,
                        img:item.img
                    }
                   items.push(list)
                });
                   this.info=items
            }
        })
        }
    }
}
</script>
<style scoped>
.nav{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
}
.sale_list{
    background-color: #fff;
    padding:0 .5em;
    margin: 3em 0 5em 0;
}
.sale_list h4{
    font-size: .9em;
    text-align: left;
    margin: 0 .5em;
    border-bottom: 1px solid #f4f4f4;
    padding: 0.3em 0;
}
.sale_list ul li{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #f4f4f4;
    padding: .5em 0;
}

.sale_list ul li .sale_left{
    display: flex;
    flex-direction: row;
}
.sale_list ul li img{
    display:block;
    width: 4em;
    height: 4em;
    background-color: #ccc;
    margin: 0 .5em;
}
.sale_list ul li h2{
    font-weight: normal;
    font-size: 1em;
}
.sale_list ul li p{
    color: #b43e3a;
    font-size: .9em;
}
.sale_list ul li div{
    text-align: left;
}
.sale_list small{
    color: #ccc;
}
.sale_left div{
    display: flex;
    flex-direction: column;
    justify-content: space-around
}
.sale_rigth{
    display: flex;
    flex-direction: column;
    justify-content:center;
}

footer{
    position: fixed;
    width: 100%;
    line-height: 3em;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    bottom: 0;
    background-color: #fff;
    font-size: 1em;
    /* padding: 0 1em; */
}
footer p{
    color: #b43e3a;
    font-size: .9em;
}

footer strong{
padding: .2em 1.5em;
border:1px solid #b43e3a;
border-radius: 1em;
}
.popup{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
}
.popup textarea{
    width: 80%;
    min-height: 50px;
    margin-top:10em;
    /* border-radius: 1em; */
    display: inline-block;
    background-color: #fff;
    /* padding: 30px 20px; */
    padding: 10px;
    white-space:normal;
    word-break:break-all;
    text-align: center;
    position: relative;
}
/* .popup img{
    position: absolute;
    right: 0;
    top:0;
    width: 25px;
} */
.popup button{
    width: 40%;
    padding: 10px 10px;
    background-color: forestgreen;
    color: white;
    outline: none;
    border:none;
}
.btm{
    display: flex;
    width: 80%;
    margin-left: 10%;
    justify-content: space-around;
    
}
.popup button:last-child{
    background-color: #b43e3a;
}
</style>
