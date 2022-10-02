<template>
	<view class="my-container">
		<view class="my-top">
			<image src="../../static/logo.png" mode="widthFix" class="my-img"></image>
			<view class="my-name">{{ username }}</view>
		</view>
		<view class="my-function">
			<view class="my-func-item" @click="changeImg()"><view class="my-item-content">
					<image class="my-title-img" src="../../static/icon/imglogo.svg" mode="widthFix"></image>
					<view class="my-text-content">
						更换头像
					</view>
				</view></view>

			<!-- 修改用户名 -->
			<view class="my-func-item" @click="changeUsername()"><view class="my-item-content">
					<image class="my-title-img" src="../../static/icon/rename.svg" mode="widthFix"></image>
					<view class="my-text-content">
						修改用户名
					</view>
				</view></view>
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
			<view class="my-func-item" @click="changePassword()"><view class="my-item-content">
					<image class="my-title-img" src="../../static/icon/password.svg" mode="widthFix"></image>
					<view class="my-text-content">
						修改密码
					</view>
				</view></view>
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

			<!-- 使用指南 -->
			<view class="my-func-item" @click="direction('center')"><view class="my-item-content">
					<image class="my-title-img" src="../../static/icon/direction.svg" mode="widthFix"></image>
					<view class="my-text-content">
						使用指南
					</view>
				</view></view>
			
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
					<image class="my-title-img" src="../../static/icon/help.svg" mode="widthFix"></image>
					<view class="my-text-content">
						关于我们
					</view>
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

		<button type="warn" @click="signOut()">登出</button>
	</view>
</template>

<script>
// import tabBar from '../../component/tabBar.vue'
export default {
	data() {
		return {
			username: '用户名'
		}
	},
	components: {
		// tabBar
	},
	methods: {
		// 登出
		signOut() {
			uni.showModal({
				title: '提示',
				content: '是否确定登出？',
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定-登出')
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
				success: function (res) {
					// 成功后将数据发送到后台完成上传
					console.log(JSON.stringify(res.tempFilePaths));
				}
			});
		},

		// 修改用户名
		changeUsername() {
			console.log('修改用户名')
			this.$refs.inputDialogUsername.open()
		},
		dialogInputUsernameConfirm(val) {
			console.log(val)
			this.username = val
			uni.showToast({
				icon: 'success',
				title: '修改成功！'
			})
		},

		// 修改密码
		changePassword() {
			console.log('修改密码')
			this.$refs.inputDialogPassword.open()
		},
		dialogInputPasswordConfirm(val) {
			console.log(val)
			// 调用后端接口修改密码
			uni.showToast({
				icon: 'success',
				title: '修改密码成功！'
			})
		},

		// 使用指南
		direction(type) {
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
	}
	.my-function {
		margin: 20rpx 0 50rpx;
		.my-func-item {
			text-indent: 20rpx;
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: solid 2rpx #ccc;
			
			.my-item-content{
				display: flex;
				
			.my-title-img{
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
