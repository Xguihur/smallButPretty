<template>
	<view class="lg-container">
		<view class="lg-logo">
			<text>One</text>
			<text>List</text>
		</view>
		<view class="lg-state">新一代简洁清单软件</view>
		<!-- 注册 -->
		<view class="lg-input" v-show="regOrSign === 0">
			<view class="lg-input-box">
				<image
					class="lg-input-logo"
					src="../../static/icon/my.svg"
					mode="widthFix"
				></image>
				<view class="lg-input-text"></view>
				<input
					class="uni-input lg-inputText"
					focus
					placeholder="请设置您的账号"
					v-model="number"
				/>
			</view>
			<view class="lg-input-box">
				<image
					class="lg-input-logo"
					src="../../static/icon/lock.svg"
					mode="widthFix"
				></image>
				<view class="lg-input-text"></view>
				<input
					class="uni-input lg-inputText"
					focus
					placeholder="请设置您的密码"
					v-model="password"
					password
					maxlength="30"
				/>
			</view>
		</view>
		<!-- 登录 -->
		<view class="lg-input" v-show="regOrSign === 1">
			<view class="lg-input-box">
				<image
					class="lg-input-logo"
					src="/static/icon/my.svg"
					mode="widthFix"
				></image>
				<view class="lg-input-text"></view>
				<input
					class="uni-input lg-inputText"
					focus
					placeholder="请输入账号"
					v-model="number"
				/>
			</view>
			<view class="lg-input-box">
				<image
					class="lg-input-logo"
					src="/static/icon/lock.svg"
					mode="widthFix"
				></image>
				<view class="lg-input-text"></view>
				<input
					class="uni-input lg-inputText"
					focus
					placeholder="请输入密码"
					v-model="password"
					password
					maxlength="30"
				/>
			</view>
		</view>
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
import { reqRegister } from '../../api/index.js'
import { reqLogin } from '../../api/index.js'
export default {
	data() {
		return {
			number: '',
			password: '',
			regOrSign: 1
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
	methods: {
		register() {
			if (this.regOrSign === 1) {
				this.regOrSign = 0
			} else {
				let registerForm = {}
				registerForm.username = this.number
				registerForm.password = this.password
				// 执行接口
				reqRegister(registerForm).then(res => {
						if (res) {
							if (res.statusCode === 200) {
								if (res.data.state) {
									// 注册成功
									uni.showToast({
										icon: 'success',
										title: res.data.msg
									})
									setTimeout(() => {
										this.regOrSign = 1
									}, 800)
									
								} else {
									// 注册失败
									uni.showToast({
										icon: 'error',
										title: res.data.msg
									})
								}
							} else {
								console.log('res.statusCode:', res.statusCode)
							}
						} else {
							console.log('res不存在')
						}
				})
			}
			// 无论是切换标签还是注册都清空
			this.number = ''
			this.password = ''
		},
		signIn() {
			if (this.regOrSign === 0) {
				this.regOrSign = 1
			} else {
				console.log('登录')
				let loginForm = {}
				loginForm.username = this.number
				loginForm.password = this.password
				// 执行接口
				reqLogin(loginForm).then(res=>{
						if (res) {
							console.log(res)
							if (res.statusCode === 200) {
								let token = res.data.token
								if (token !== '' && token !== null && token !== undefined) {
									uni.setStorageSync('token', token)
									uni.showToast({
										icon: 'success',
										title: '登录成功！'
									})
									setTimeout(() => {
										uni.switchTab({
											url: '/pages/index/index'
										})
									}, 1000)
								} else {
									console.log(res.data.msg)
									uni.showToast({
										icon: 'error',
										title: res.data.msg
									})
								}
							} else {
								console.log('res.statusCode:',res.statusCode)
							}
						} else {
							console.log('找不到res')
						}
				})
			}
			// 无论是切换标签还是登录都清空
			this.number = ''
			this.password = ''
		}
	}
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
	.lg-input {
		margin-bottom: 100rpx;
		margin-left: 20rpx;


		.lg-input-box {
					position: relative;
			display: flex;
			
			.lg-input-text {
				position: absolute;
				left: 88rpx;
				top: 13%;
				background-color: #ccc;
				width: 2rpx;
				height: 50rpx;
			}
			.lg-input-logo {
				width: 45rpx;
				position: absolute;
				top: 14.5%;
				left: 35rpx;
			}
			.lg-inputText {
				border-radius: 50rpx;
				margin-bottom: 70rpx;
			}
			.uni-input {
				flex: 1;
				padding: 20rpx 30rpx 20rpx 98rpx;
				border: solid 2rpx #ddd;
				background-color: #fff;
			}
		}
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
