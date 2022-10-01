<template>
	<view class="my-container">
		<view class="my-top">
			<image src="../../static/logo.png" mode="widthFix" class="my-img"></image>
			<view class="my-name">用户名</view>
		</view>
		<view class="my-function">
			<view class="my-func-item">设置</view>
			<view class="my-func-item">登出</view>
			<view class="my-func-item">关于我们</view>
		</view>
	</view>
</template>

<script>
	import tabBar from '../../component/tabBar.vue'
	export default {
		components:{
			tabBar
		}
	}
</script>

<style lang="less">
.my-container {
	padding: 40rpx;
	.my-top{
		height: 150rpx;
		display: flex;
		align-items: center;
		
		.my-img{
			width: 100rpx;
			border-radius: 50%;
			margin-right: 30rpx;
		}
	}
	.my-function{
		margin-top: 20rpx;
		.my-func-item{
			text-indent: 40rpx;
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: solid 2rpx #ccc;
		}
	}
}
</style>
