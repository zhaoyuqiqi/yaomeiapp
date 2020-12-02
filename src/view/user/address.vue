<template>
    <div>
             <van-nav-bar title="收货地址" left-arrow @click-left="onClickLeft"/>
            <!-- <address-item></address-item> -->
            <van-address-list
                v-model="chosenAddressId"
                :list="list"
                default-tag-text="默认"
                add-button-text ="新增收货地址"
                @add="onAdd"
                @edit="onEdit"
                @click-item="onClick"
                />
            <!-- <div class="add-address" @click="addAddress"><div>新增地址</div></div> -->
    </div>
    
</template>

<script>
import addressItem from '@/components/address_item';
import { Toast } from 'vant';
    export default {
        data() {
             return {
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true,
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号',
        },
      ]
    };
        },
        components: {
            addressItem,
        },
        methods: {
            onClickLeft(){
                        this.$router.back(-1)
                },
            onClick(){
                Toast('点击:选择收货地址');
            },
            addAddress(){
                this.$router.push("/add_address")
            },
            onAdd() {
                Toast('新增地址');
                this.$router.push("/add_address")
            },
            onEdit(item, index) {
                Toast('编辑地址:' + index);
            },
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
    background-color:#b43e3a;
    margin: 8vw auto 0 auto;
}



</style>