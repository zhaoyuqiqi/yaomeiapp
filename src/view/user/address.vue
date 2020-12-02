<template>
    <div>
             <van-nav-bar title="地址管理" left-arrow @click-left="onClickLeft"/>
            <address-item></address-item>
            <div class="add-address" @click="addAddress"><div>新增地址</div></div>
    </div>
    
</template>

<script>
import addressItem from '@/components/address_item';
    export default {
        components: {
            addressItem,
        },
        methods: {
            onClickLeft(){
                        this.$router.back(-1)
                },
            addAddress(){
                this.$router.push("/add_address")
            }
        },
    }
</script>

<style  scoped>
.add-address{
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