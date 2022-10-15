<template>
	<view class="lg-container">
		<view class="lg-logo">
			<text>One</text>
			<text>List</text>
		</view>
		<view class="lg-state">新一代简洁清单软件</view>
		<!-- 注册 -->
		<lgInput v-show="regOrSign === 0" :number="number" :password="password"  @updateNum="updateNum" @updatePas="updatePas"></lgInput>
		<lgInput v-show="regOrSign === 1" :number="number" :password="password" @updateNum="updateNum" @updatePas="updatePas"></lgInput>
		<view class="lg-button">
			<button
				type="primary"
				:class="regOrSign === 0 ? 'lg-button-active' : ''"
				@click="register()"
			>
				注册
			</button>
			<button
				type="primary"
				:class="regOrSign === 1 ? 'lg-button-active' : ''"
				@click="signIn()"
			>
				登录
			</button>
		</view>
	</view>
</template>

<script>

import {mySignInReq,myRegisterReq} from './hooks/reqOrLogin.js'
import lgInput from './components/lgInput.vue'
export default {
	data() {
		return {
			number: '',
			password: '',
			regOrSign: 1
		}
	},
	components:{
		lgInput
	},
	methods: {
		// 子组件传入的值用于提交
		updateNum(data){
			this.number = data
		},	
		updatePas(data){
			this.password = data
		},
		async register() {
			if (this.regOrSign === 1) {
				this.regOrSign = 0
			} else {
				// 执行注册的逻辑
				const mystate =await myRegisterReq(this.number,this.password)
				console.log(mystate);
				if(mystate){
					setTimeout(() => {
						this.regOrSign = 1
					}, 800)
				}
			}
			// 无论是切换标签还是注册都清空
			this.number = ''
			this.password = ''
		},
		signIn() {
			if (this.regOrSign === 0) {
				this.regOrSign = 1
			} else {
				// 执行登录的逻辑
			mySignInReq(this.number,this.password)
			}
			// 无论是切换标签还是登录都清空
			this.number = ''
			this.password = ''
			console.log('密码置空啦');
		}
	},
	created() {
		const myToken = uni.getStorageSync('token')
		if (myToken !== null && myToken !== '' && myToken !== undefined) {
			// 执行token验证是否过期接口,来判断是免登录还是重新登陆
			// 现在只进行了验证存在token就自动登录
			uni.showToast({
				icon: 'success',
				title: '正在进行登录...'
			})
			setTimeout(() => {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}, 1500)
			console.log('进入了登录注册页面,但是未验证token')
		}
	},
}
</script>

<style scoped lang="less">
.lg-button-active {
	width: 1200rpx !important;
	background-color: #2643fc !important;
}
.lg-container {
	padding: 20rpx 40rpx;
	.lg-logo {
		color: #324dfc;
		font-weight: 600;
		font-size: 60rpx;
		margin: 90rpx 0;

		text {
			margin-right: 20rpx;
		}
	}
	.lg-state {
		color: #5b5b5b;
		font-weight: 600;
		font-size: 34rpx;
		text-align: center;
		margin: 0 0 150rpx;
	}

	.lg-button {
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;

		button {
			width: 100%;
			border-radius: 50rpx;
			background-color: #82b3e2;
		}

		:nth-child(1) {
			margin-right: 20rpx;
		}
	}
}
</style>
