<template>
	<view class="my-function">
		<view class="my-func-item" @click="changeMotto()">
			<view class="my-item-content">
				<image
					class="my-title-img"
					:src="myIcon"
					mode="widthFix"
				></image>
				<view class="my-text-content">{{title}}</view>
			</view>
		</view>
		<uni-popup ref="inputDialogMotto" type="dialog">
			<uni-popup-dialog
				ref="inputClose"
				mode="input"
				:title="title"
				value=""
				:placeholder="tips"
				@confirm="dialogInputMottoConfirm"
			></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import { toChangeMsg } from '../hooks/changeMsg.js'
export default {
	props: {
		// 传参必须传类型进来,可选参数有:motto 和  username
		dialogType: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			title:'',
			tips:'',
			myIcon:''
		}
	},
	methods: {
		// 根据组件类型初始化数据
		initDataForComponent(){
			switch(this.dialogType){
				case 'motto':
				this.title='修改个性签名'
				this.tips = '请填写您的签名'
				this.myIcon='/static/icon/motto.svg'
				break
				case 'username':
				this.title='修改用户名'
				this.tips = '请填写用户名'
				this.myIcon='/static/icon/rename.svg'
				break
				default:
				console.log('未识别的组件类型')
				break
			}
		},
		// 修改个性签名
		changeMotto() {
			console.log('修改信息提示框拉起')
			this.$refs.inputDialogMotto.open()
		},
		
		async dialogInputMottoConfirm(val) {
			// console.log(val)
			// 根据组件类型封装接口需要的参数类型
			let modifyData ={}
			if(this.dialogType==='motto'){
				modifyData = {
					intro: val
				}
			}
			if(this.dialogType==='username'){
				if (val.length > 10) {
					uni.showToast({
						icon: 'error',
						title: '最大长度为10'
					})
					return
				}
				modifyData = {
					nickname: val
				}
			}
			console.log(modifyData)
			// 调用修改接口,判断是否修改成功
			const myState = await toChangeMsg(modifyData)
			// console.log(myState);
			if (myState) {
				// 修改成功之后应该渲染数据
				this.$emit('changeMsg')
			}
		}
	},
	mounted(){
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
