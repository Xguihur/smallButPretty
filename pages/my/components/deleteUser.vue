<template>
	<view>
		<view class="my-func-item" @click="deleteUser()">
			<view class="my-item-content">
				<image
					class="my-title-img"
					src="../../../static/icon/switch.svg"
					mode="widthFix"
				></image>
				<view class="my-text-content">注销用户</view>
			</view>
		</view>
		<uni-popup ref="inputDeleteUser" type="dialog">
			<uni-popup-dialog
				ref="inputClose"
				mode="input"
				title="注销用户"
				value=""
				placeholder="请输入您的密码"
				@confirm="inputDialogDeleteConfirm"
			></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {reqCheckPassword} from '../../../api/index.js'
	import {toDeleteUser} from '../hooks/deleteUser.js'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 注销用户
			deleteUser() {
				console.log('注销用户')
				this.$refs.inputDeleteUser.open()
			},
			async inputDialogDeleteConfirm(val) {
				// 执行密码验证进行比对
				const password = {
					password: val
				}
				const res = await reqCheckPassword(password)
					if (res) {
						if (res.data.state) {
							// 调用接口删除用户
							toDeleteUser()
						} else {
							uni.showToast({
								icon: 'error',
								title: '密码错误！'
							})
						}
					} else {
						uni.showToast({
							icon: 'error',
							title: '请求失败！'
						})
						console.log(res)
					}
			},
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
