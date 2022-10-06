<template>
	<view class="my-container">
		<view class="my-top">
			<image src="../../static/logo.png" mode="widthFix" class="my-img"></image>
			<view class="my-text-box">
				<view class="my-name">{{ nickName }}</view>
				<view class="my-motto">{{ motto }}</view>
			</view>
		</view>
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
			<view class="my-func-item" @click="changeMotto()">
				<view class="my-item-content">
					<image
						class="my-title-img"
						src="../../static/icon/motto.svg"
						mode="widthFix"
					></image>
					<view class="my-text-content">修改个性签名</view>
				</view>
			</view>
			<uni-popup ref="inputDialogMotto" type="dialog">
				<uni-popup-dialog
					ref="inputClose"
					mode="input"
					title="修改个性签名"
					value=""
					placeholder="请输入新签名"
					@confirm="dialogInputMottoConfirm"
				></uni-popup-dialog>
			</uni-popup>

			<!-- 修改用户名 -->
			<view class="my-func-item" @click="changeUsername()">
				<view class="my-item-content">
					<image
						class="my-title-img"
						src="../../static/icon/rename.svg"
						mode="widthFix"
					></image>
					<view class="my-text-content">修改用户名</view>
				</view>
			</view>
			<uni-popup ref="inputDialogUsername" type="dialog">
				<uni-popup-dialog
					ref="inputClose"
					mode="input"
					title="修改用户名"
					value=""
					placeholder="请输入新用户名"
					@confirm="dialogInputUsernameConfirm"
				></uni-popup-dialog>
			</uni-popup>
			<!-- 修改密码 -->
			<view class="my-func-item" @click="changePassword()">
				<view class="my-item-content">
					<image
						class="my-title-img"
						src="../../static/icon/password.svg"
						mode="widthFix"
					></image>
					<view class="my-text-content">修改密码</view>
				</view>
			</view>
			<uni-popup ref="inputDialogPassword" type="dialog">
				<uni-popup-dialog
					ref="inputClose"
					mode="input"
					title="修改密码"
					value=""
					placeholder="请输入新密码"
					@confirm="dialogInputPasswordConfirm"
				></uni-popup-dialog>
			</uni-popup>
			<!-- 确认密码 -->
			<uni-popup ref="inputDialogPasswordTwo" type="dialog" @change="watchPasswordState">
				<uni-popup-dialog
					ref="inputClose"
					mode="input"
					title="确认密码"
					value=""
					placeholder="请再次确认密码"
					@confirm="dialogInputPasswordTwoConfirm"
				></uni-popup-dialog>
			</uni-popup>

			<!-- 使用指南 -->
			<view class="my-func-item" @click="direction('center')">
				<view class="my-item-content">
					<image
						class="my-title-img"
						src="../../static/icon/direction.svg"
						mode="widthFix"
					></image>
					<view class="my-text-content">使用指南</view>
				</view>
			</view>

			<uni-popup ref="popupDirection" background-color="#fff" @change="change">
				<view class="popup-content">
					<view class="my-popup-title">使用指南</view>
					<view class="my-popup-text">
						使用指南的指南只是用于使用的指南，但是使用指南的指南只是用于使用的指南，不只是指南的使用还是指南使用的使用指南。
					</view>
				</view>
			</uni-popup>

			<!-- 关于我们 -->
			<view class="my-func-item" @click="aboutUs('center')">
				<view class="my-item-content">
					<image
						class="my-title-img"
						src="../../static/icon/help.svg"
						mode="widthFix"
					></image>
					<view class="my-text-content">关于我们</view>
				</view>
			</view>
			<uni-popup
				ref="popupAboutUs"
				class="my-popup-center"
				background-color="#fff"
				@change="change"
			>
				<view class="popup-content">
					<view class="my-popup-title">关于我们</view>
					<view class="my-popup-text">
						关于我们的关于我们，但是关于我们的关于我们不是我们的关于我们。
					</view>
				</view>
			</uni-popup>
		</view>

		<button type="warn" @click="signOut()">退出登录</button>
		<tab-bar :current="1"></tab-bar>
	</view>
</template>

<script>
import { reqShowMsg, reqModifyMsg } from '../../api/index.js'
import tabBar from '../../component/tabBar.vue'
export default {
	data() {
		return {
			nickName: '用户名',
			motto: '这个人很懒啥也不写...',
			newPassword:''
		}
	},
	components: {
		tabBar
	},
	methods: {
		initPersonMsg(){
			// 初始化用户名和签名
			reqShowMsg().then(res=>{
				console.log(res)
				if(res&&res.statusCode === 200){
					if(res.data.state){
						
				this.nickName = res.data.user.nickname
				this.motto = res.data.user.intro
					}
				}
			})
		},
		// 登出
		signOut() {
			uni.showModal({
				title: '提示',
				content: '是否确定退出登录？',
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定-登出')
						uni.setStorageSync('token', '')
						uni.showToast({
							icon: 'success',
							title: '登出成功！'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}, 800)
					} else if (res.cancel) {
						console.log('用户点击取消')
					}
				}
			})
		},

		// 更换头像
		changeImg() {
			console.log('更换头像')
			// 选择本地相册
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					// 成功后将数据发送到后台完成上传
					console.log(JSON.stringify(res.tempFilePaths))
				}
			})
		},

		// 修改用户名
		changeUsername() {
			console.log('修改用户名')
			this.$refs.inputDialogUsername.open()
		},
		dialogInputUsernameConfirm(val) {
			console.log(val)
			const modifyData = {
				nickname: val
			}
			console.log(modifyData)

			reqModifyMsg(modifyData).then(res => {
				console.log(res)
				if (res.data.state === true) {
					uni.showToast({
						icon: 'success',
						title: res.data.msg
					})
					// 修改之后应该重新渲染一下数据
					this.initPersonMsg()
				} else {
					uni.showToast({
						icon: 'error',
						title: res.data.msg
					})
				}
			})
		},

		// 修改密码
		changePassword() {
			console.log('修改密码')
			this.$refs.inputDialogPassword.open()
		},
		dialogInputPasswordConfirm(val) {
			console.log(val)
			if(val===''||val===null){
				// 密码输入错误
				uni.showToast({
					icon:"error",
					title:"密码不能为空！"
				})
			}else{
				// 将第一次输入的密码存入data
				this.newPassword = val
				// 确认密码 弹出输入框
										this.$refs.inputDialogPasswordTwo.open()
			}
		},
		dialogInputPasswordTwoConfirm(val) {
			console.log(val)
			if(val===''||val===null){
				// 密码输入错误
				uni.showToast({
					icon:"error",
					title:"密码不能为空！"
				})
			}
			else if(val === this.newPassword){
				// 两次密码正确,调用后端接口修改密码
				const modifyData = {
					password: val
				}
				console.log(modifyData)
						
				reqModifyMsg(modifyData).then(res => {
					console.log(res)
					if (res.data.state === true) {
						uni.showToast({
							icon: 'success',
							title: res.data.msg
						})
						// 修改之后应该退出登陆
						uni.setStorageSync('token', '')
						uni.showToast({
							icon: 'success',
							title: '修改密码成功！'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}, 800)
					} else {
						uni.showToast({
							icon: 'error',
							title: res.data.msg
						})
					}
				})
			}else{
				// 密码输入错误
				uni.showToast({
					icon:"error",
					title:"两次密码不一致！"
				})
			}
		},
		// 第二次输入密码时点击取消的状态
		watchPasswordState(e){
			// console.log('当前模式：' + e.type + ',状态：' + e.show)
			// 用户点击取消或者确定都清空当前data中的新密码
			if(!e.show){
				this.newPassword = ''
			}
		},
		// 修改个性签名
		changeMotto() {
			console.log('修改个性签名')
			this.$refs.inputDialogMotto.open()
		},
		dialogInputMottoConfirm(val) {
			console.log(val)

			// 调用后端接口修改密码
			const modifyData = {
				intro: val
			}
			console.log(modifyData)

			reqModifyMsg(modifyData).then(res => {
				console.log(res)
				if (res.data.state === true) {
					uni.showToast({
						icon: 'success',
						title: res.data.msg
					})
					// 修改之后应该渲染数据
					this.initPersonMsg()
				} else {
					uni.showToast({
						icon: 'error',
						title: res.data.msg
					})
				}
			})
		},

		// 使用指南
		direction(type) {
			// 测试查看个人信息的接口
			reqShowMsg().then(res => {
				console.log(res)
			})

			console.log('使用指南')
			this.$refs.popupDirection.open(type)
		},
		// 关于我们
		aboutUs(type) {
			console.log('关于我们页面')
			this.$refs.popupAboutUs.open(type)
		},
		// 改变 关于我们 或者 使用指南 的状态
		change(e) {
			console.log('当前模式：' + e.type + ',状态：' + e.show)
		}
	},
	onShow(){
		this.initPersonMsg()
	}
}
</script>

<style lang="less">
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
		margin: 20rpx 0 50rpx;
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
}
</style>
