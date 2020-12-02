<template>
	<div>
		<div>
			<div v-if="userInfo.grade == 1"><use-A :list="userInfo"></use-A></div>
			<!-- 总代 -->
			<div v-else-if="userInfo.grade == 0"><useT :list="userInfo"></useT></div>
		</div>

		<!-- 底部标签栏 -->

		<!-- <van-tabbar> -->
		<div class="footer">
			<ul>
				<li>
					<router-link to="home">
						<img src="../../assets/i/01/a01.png" alt="" />
						<br />
						<span>主页</span>
					</router-link>
				</li>

				<li>
					<router-link to="person">
						<img src="../../assets/i/01/a02.png" alt="" />
						<br />
						<span>个人业绩</span>
					</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'shop', params: { id: id } }">
						<span><img src="../../assets/i/01/00.png" alt="" /></span>
					</router-link>
				</li>
				<li>
					<router-link to="team">
						<img src="../../assets/i/01/a03.png" alt="" />
						<br />
						<span>团队</span>
					</router-link>
				</li>
				<li class="active">
					<router-link to="user">
						<img src="../../assets/i/01/b04.png" alt="" />
						<br />
						<span>我的</span>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
import useA from '../../components/user_com';
import useT from '../../components/user_total';
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);
export default {
	components: {
		useA,
		useT
	},
	data() {
		return {
			userInfo: {},
			id: localStorage.getItem('id')
		};
	},
	mounted() {
		// var id= localStorage.getItem('id');
		this.apiGet('member/info', {
			id: localStorage.getItem('id'),
			token: localStorage.getItem('token')
		}).then(res => {
			console.log(res.data.code);
			if (res.data.code == 200) {
				this.userInfo = res.data.data;
			} else {
				localStorage.clear('token')
				this.$router.go(0);
			}
		});
	}
};
</script>

<style scoped></style>
