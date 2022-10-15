<template>
	<view>
		<view class="my-func-item" @click="changePassword()">
			<view class="my-item-content">
				<image
					class="my-title-img"
					src="/static/icon/password.svg"
					mode="widthFix"
				></image>
				<view class="my-text-content">修改密码</view>
			</view>
		</view>
		<uni-popup ref="inputDialogPasswordCheck" type="dialog">
			<uni-popup-dialog
				ref="inputClose"
				mode="input"
				title="验证密码"
				value=""
				placeholder="请输入您的密码"
				@confirm="dialogInputPasswordConfirmCheck"
			></uni-popup-dialog>
		</uni-popup>
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
		<uni-popup ref="inputDialogPasswordTwo" type="dialog">
			<uni-popup-dialog
				ref="inputClose"
				mode="input"
				title="确认密码"
				value=""
				placeholder="请再次确认密码"
				@confirm="dialogInputPasswordTwoConfirm"
				@close="watchPasswordState"
			></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import { toCheckPassword, toChangePassword } from '../hooks/changePassword.js'
export default {
	data() {
		return {
			newPassword: ''
		}
	},
	methods: {
		// 验证密码
		changePassword() {
			console.log('验证密码')
			this.$refs.inputDialogPasswordCheck.open()
		},
		// 验证密码是否正确
		async dialogInputPasswordConfirmCheck(val) {
			console.log(val)
			const password = {
				password: val
			}
			// 执行验证密码的接口
			const checkState = await toCheckPassword(password)
			console.log(checkState)
			if (checkState) {
				this.$refs.inputDialogPassword.open()
			}
		},
		dialogInputPasswordConfirm(val) {
			console.log(val)
			if (val === '' || val === null) {
				// 密码输入错误
				uni.showToast({
					icon: 'error',
					title: '密码不能为空！'
				})
			} else {
				// 将第一次输入的密码存入data
				this.newPassword = val
				// 确认密码 弹出输入框
				this.$refs.inputDialogPasswordTwo.open()
			}
		},
		dialogInputPasswordTwoConfirm(val) {
			if (val === this.newPassword) {
				// 两次密码正确,调用后端接口修改密码
				const modifyData = {
					password: val
				}
				// 执行接口修改密码
				toChangePassword(modifyData)
			} else {
				// 清空输入框的密码以及之前输入的密码
				this.newPassword = ''
				val = ''
				// 密码输入错误
				uni.showToast({
					icon: 'error',
					title: '两次密码不一致！'
				})
			}
		},
		// 第二次输入密码时点击取消的状态
		watchPasswordState() {
			// 用户点击取消清空当前data中的新密码
			this.newPassword = ''
		}
	}
}
</script>

<style scoped lang="less">
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
</style>
