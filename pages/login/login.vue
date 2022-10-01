<template>
	<view class="lg-container">
		<view class="lg-logo">
			<text>One</text>
			<text>List</text>
		</view>
		<view class="lg-state">新一代简介清单软件</view>
		<view class="lg-input">
			<uni-easyinput placeholder="请输入账号" class="lg-inputText"></uni-easyinput>
			<uni-easyinput placeholder="请输入密码" class="lg-inputText"></uni-easyinput>
		</view>
		<view class="lg-button">
			<button type="primary">注册</button>
			<button type="primary" class="lg-button-active">登录</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {}
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
		.lg-inputText {
			margin-bottom: 70rpx;
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
