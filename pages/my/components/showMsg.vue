<template>
	<view>
		<!-- 使用指南 -->
		<view class="my-func-item" @click="direction('center')">
			<view class="my-item-content">
				<image
					class="my-title-img"
					:src="myIcon"
					mode="widthFix"
				></image>
				<view class="my-text-content">{{title}}</view>
			</view>
		</view>

		<uni-popup ref="popupDirection" background-color="#fff">
			<view class="popup-content">
				<view class="my-popup-title">{{title}}</view>
				<view class="my-popup-text">
					{{text}}
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
// import { reqShowMsg } from '../../../api/index.js'
export default {
	props: {
		// 传参必须传类型进来,可选参数有:direction 和  about
		dialogType: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			title:'',
			text:'',
			myIcon:''
		}
	},
	methods: {
		// 根据组件类型初始化数据
		initDataForComponent(){
			switch(this.dialogType){
				case 'direction':
				this.title='使用指南'
				this.text = '一个清单是一款简洁清单软件，您只需要在清单页面发布自己即将完成的任务，并且选择事件紧急程度即可发布并且展示在页面上！'
				this.myIcon='/static/icon/direction.svg'
				break
				case 'about':
				this.title='关于我们'
				this.text = '一个清单是一款" 简洁清单项目 "，帮你高效完成任务和规划时间的应用，合理安排一天中的任务安排。如需要联系我们请发送邮件至：329179227@qq.com!'
				this.myIcon='/static/icon/help.svg'
				break
				default:
				console.log('未识别的组件类型')
				break
			}
		},
		direction(type) {
			// 测试查看个人信息的接口
			// reqShowMsg().then(res => {
			// 	console.log(res)
			// })
			this.$refs.popupDirection.open(type)
		}
	},
	mounted(){
		// 初始化数据
		this.initDataForComponent()
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
