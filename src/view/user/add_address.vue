<template>
    <div>
        <van-nav-bar title="添加地址" left-arrow @click-left="onClickLeft"/>
        <div class="consignee">
         <ul>
                <li>
                    <h5>收货人</h5>
                     <input type="text" placeholder="请输入收货人姓名" v-model="info.consignee">
                 </li>
                 <li>
                     <h5>联系方式</h5>
                     <input type="number" pattern="[0-9]*" placeholder="请输入收货人联系方式" v-model="info.phone" >
                 </li>
                    <li>
                    <h5>收货地址</h5>
                    <div class="ord">
                    <!-- <input type="text" placeholder="           省           市            区            "  class="input" @click="address()" v-model="values"> -->
                    <pre class="input" @click="address()">{{values}}</pre>
                    <br>
                    <input type="text" placeholder="请输入收货人的详细地址" v-model="address_deta">
                    </div>
                    </li>
            </ul>
        </div>
        <div class="ai">
            <h5>智能识别</h5>
            <textarea name="" id="" cols="35" rows="3" placeholder="请粘贴详细收货信息(收货人 联系方式 收货地址)" @input="aiAddress($event)"></textarea>
        </div>
        
        <div class="save" @click="save"><div>保存</div></div>

                    <!-- 弹出收货人地址 -->
            <van-popup v-model="show" position="bottom" :overlay="true" >
                <van-area :area-list="areaList" @confirm='ok' @cancel='no'/>
            </van-popup>
    </div>
</template>

<script>
import { NavBar,Popup,Picker,Area, Toast, Tabbar  } from 'vant';
import area from '@/assets/js/area.js';
import smart from 'address-smart-parse'
    export default {
        data() {
            return {
                show: false,
                areaList:area,
                values:'      省       市      区',
                info:{
                    consignee:'',         //收货人姓名
                    phone:'',     //收货人联系电话
                    address_detail:"",//收货人详细地址
                    province_code:"",
                    city_code:"",
                    area_code:""
                },
                address_deta:"",
                //点击保存时拿到的字符串合并的地址
                
            }
        },
        methods: {
            aiAddress(e){
                // 智能解析地址
                let {name,phone,province,city,county,address,provinceCode,countyCode,cityCode}= smart(e.target.value)
                if(provinceCode&&countyCode&&cityCode&&address&&county&&city&&province&&phone&&name){
                        this.info.consignee = name;
                        this.info.phone = phone;
                    while(provinceCode.length<6 ||cityCode.length<6 ||countyCode.length<6){
                        //判断代码长度是否是6位,如果不足在后面补0
                        if(provinceCode.length<6){
                            provinceCode+="0"
                        }
                        if(cityCode.length<6){
                            cityCode+="0"
                        }
                        if(countyCode.length<6){
                            countyCode+="0"
                        }
                }
                
                this.info.province_code = provinceCode;
                this.info.city_code = cityCode;
                this.info.area_code = countyCode;
                province!=undefined?this.values =`${province}  ${city}  ${county}`:this.values ='      省       市      区'
                this.address_deta = address;
                }
            },
            onClickLeft() {
                this.$router.go(-1)
            },
            address(){
                 this.show=true;
             // ev.preventDefault()
             },
            ok(values){
                // console.log(1)
                this.show=false;
                var list='';
                this.address_value = values
                values.forEach(item => {
                    list +=item.name+" ";
                });
                    this.info.province_code=values[0].code
                    this.info.city_code=values[1].code
                    this.info.area_code=values[2].code
                    this.values=list
                    
            },
            no(){
                // console.log(2)
                this.show=false
            },

            save(){
                    if(!this.info.consignee){
                        Toast('收货人姓名不能为空')
                        return
                    }
                    if(!this.info.phone){
                        Toast('收货人电话不能为空')
                        return
                    }else{
                        var pattern = /^0{0,1}(1[0-9][0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
                        str = this.info.phone;
                        if (!pattern.test(str)){
                        Toast('请输入正确的手机号码')
                        return
                        }
                    }
                    if(!this.info.province_code){
                        Toast('收货省份不能为空')
                        return
                    }
                        if(this.info.city_code<1){
                        Toast('收货城市不能为空')
                        return
                    }
                        if(this.info.area_code<1){
                        Toast('收货地区不能为空不能为空')
                        return
                    }
                    if(!this.address_deta){
                        Toast('详细地址不能为空')
                        return
                    }
                      this.info.address_detail =(this.values+ this.address_deta).replace(/\s*/g,"")

                     console.log(this.info.address_detail,"地址详细信息");
                    //  console.log(this.info);
                 }
                                   
        },
        mounted () {
        },
    }
</script>

<style scoped>
.ai{
    box-sizing: border-box;
    display: flex;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #f4f4f4;
    font-size: 1.2;
    padding: 1em 1.5em;
}
.ai h5{
    flex: 1;
    text-align: left;
}
textarea{
    flex: 4;
    resize: none;
    border: none;
    outline: none;
    vertical-align: middle;
    border-style: none;
}
textarea::placeholder{
    font-size: 3.733vw;
}
.consignee ul li{
    display: flex;
    padding: 1em 1.5em;
    background-color: #fff;
    border-bottom: 1px solid #f4f4f4;
}
.consignee ul li h5{
    flex: 1;
    text-align: left;
    display: flex;
    font-size: 1.2;
    /* justify-content: center;
     */
     align-items: center;
}
.consignee ul li input{
    flex: 4;
    vertical-align: middle;
    border-style: none;
    border-bottom: 1px solid #f4f4f4;
    font-size: .9em;
}
.consignee ul li .ord{
    flex: 4;
    width: 100%;
}
.consignee ul li .ord h5{
    flex: 1;
    text-align: left;
    display: flex;
    font-size: 1.2;
    flex-basis: top;
}
.consignee ul li .ord input{
    width: 100%;
    padding: .5em 0;
}

.input{
    background:url('../../assets/i/01/arr.png') no-repeat right/7%;
    border-bottom: 1px solid #f4f4f4;
    /* height: ;     */
    text-align: left;
    color: #666;
    font-size: 1.1em;
    flex: 4
}
button{
    border-style: none;
    background-color: #b43e3a;
    color: white;
    width: 80%;
    border-radius: 2em;
    padding: .5em;
    margin: 2em 0;
    
}
.save{
        width: 80vw;
    height: 10vw;
    border-radius: 5vw;
    line-height: 10vw;
    text-align: center;
    color: #fff;
    background-color: rgb(115, 248, 144);
    margin: 8vw auto 0 auto;
    
}
</style>