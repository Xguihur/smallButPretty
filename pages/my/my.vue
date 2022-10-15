<template>
	<view class="my-container">
		<!-- 顶部头像签名 -->
		<view class="my-top">
			<image
				:src="img || '../../static/logo.png'"
				mode="widthFix"
				class="my-img"
			></image>
			<view class="my-text-box">
				<view class="my-name">{{ nickName }}</view>
				<view class="my-motto">{{ motto }}</view>
			</view>
		</view>

		<!-- 下面功能栏 -->
		<view class="my-function">
			<view class="my-func-item" @click="changeImg()">
				<view class="my-item-content">
					<image
						class="my-title-img"
						src="../../static/icon/imglogo.svg"
						mode="widthFix"
					></image>
					<view class="my-text-content">更换头像</view>
				</view>
			</view>

			<!-- 修改个性签名 -->
			<changeMsg @changeMsg="initPersonMsg" dialogType="motto"></changeMsg>

			<!-- 修改用户名 -->
			<changeMsg @changeMsg="initPersonMsg" dialogType="username"></changeMsg>

			<!-- 修改密码 -->
			<changePassword></changePassword>

			<!-- 使用指南 -->
			<showMsg dialogType="direction"></showMsg>

			<!-- 关于我们 -->
			<showMsg dialogType="about"></showMsg>

			<!-- 注销用户 -->
			<deleteUser></deleteUser>
		</view>
		<button type="warn" @click="mySighOut()" class="signOut">退出登录</button>
		<tab-bar :current="1"></tab-bar>
	</view>
</template>

<script>
import {reqShowMsg} from '../../api/index.js'
import tabBar from '../../component/tabBar.vue'
import changeMsg from './components/changeMsg.vue'
import changePassword from './components/changePassword.vue'
import showMsg from './components/showMsg.vue'
import deleteUser from './components/deleteUser.vue'

import {signOut} from  './hooks/signOut.js'
import {reqChangeImg} from  './hooks/updateImg.js'

export default {
	data() {
		return {
			nickName: '',
			motto: '',
			img: ''
		}
	},
	components: {
		tabBar,
		changeMsg,
		showMsg,
		changePassword,
		deleteUser
	},
	methods: {
		initPersonMsg() {
			// 初始化用户名和签名
			reqShowMsg().then(res => {
				if (res && res.statusCode === 200) {
					if (res.data.state) {
						this.nickName = res.data.user.nickname || '用户名'
						this.motto = res.data.user.intro || '这个人很懒啥也不写...'
						this.username = res.data.user.username
						this.img = uni.getStorageSync('img') || res.data.user.img
					}
				}
			})
		},
		// 登出
		mySighOut(){
			signOut()
		},
		
		//更换头像
		changeImg() {
			console.log('更换头像') 
			// 执行oss图片上传接口获取图片路径   
			reqChangeImg(this.username)
			// 这里不知道为什么就是拿不到图片路径,函数里面也传不出来有点麻烦，现在就是改了头像得刷新一下才能切换了
			// setTimeout(()=>{
			// 	this.initPersonMsg() 
			// },2500)
				// let myimg = uni.getStorageSync('img')
				// console.log(myimg);  
				// this.initPersonMsg()
				// this.onShow()
		}
	},
	onShow() {
		this.initPersonMsg()
	}
}
</script>

<style lang="less" scoped>
.my-container {
	padding: 40rpx;
	.my-top {
		height: 150rpx;
		display: flex;
		align-items: center;

		.my-img {
			width: 100rpx;
			border-radius: 50%;
			margin-right: 30rpx;
		}
		.my-text-box {
			.my-name {
				font-size: 40rpx;
				color: #000000;
				margin-bottom: 16rpx;
			}
			.my-motto {
				font-size: 28rpx;
				color: #666;
			}
		}
	}
	.my-function {
		margin: 20rpx 0 0rpx;
		.my-func-item {
			text-indent: 20rpx;
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: solid 2rpx #ccc;

			.my-item-content {
				display: flex;

				.my-title-img {
					width: 40rpx;
					margin-left: 30rpx;
					margin-top: 20rpx;
					// margin-right: 20rpx;
				}
			}
		}

		.popup-content {
			width: 75vw;
			padding: 30rpx;
			font-size: 30rpx;
			min-height: 300rpx;
			max-height: 1000rpx;
			overflow: auto;

			.my-popup-title {
				font-size: 36rpx;
				font-weight: 600;
				text-align: center;
				margin-bottom: 30rpx;
			}
		}
	}
	
	.signOut{
		margin-top: 50rpx;
	}
}
</style>
