<template>
	<!-- 注册 -->
		<view class="lg-input">
			<view class="lg-input-box">
				<image
					class="lg-input-logo"
					src="../../../static/icon/my.svg"
					mode="widthFix"
				></image>
				<view class="lg-input-text"></view>
				<input
					class="uni-input lg-inputText"
					focus
					placeholder="请设置您的账号"
					v-model="pNumber"
					@input="updateNumber"
				/>
			</view>
			<view class="lg-input-box">
				<image
					class="lg-input-logo"
					src="../../../static/icon/lock.svg"
					mode="widthFix"
				></image>
				<view class="lg-input-text"></view>
				<input
					class="uni-input lg-inputText"
					focus
					placeholder="请设置您的密码"
					v-model="pPassword"
					password
					maxlength="30"
					@input="updatePassword"
				/>
			</view>
		</view>
</template>

<script>
	export default {
		props:{
			number:{
				type:[Number,String],
				default:''
			},
			password:{
				type:[Number,String],
				default:''
			}
		},
		watch:{
			number:function(newVal,oldVal){
				console.log(newVal);
				this.pNumber =newVal
			},
			password:function(newVal,oldVal){
				console.log(newVal);
				this.pPassword =newVal
			},
		},
		
		data() {
			return {
				pNumber: '',
				pPassword: '',
			}
		},
		methods: {
			initNumber(){
				this.pnumber = this.number
				this.pPassword = this.password
			},
			updateNumber(){
				// console.log(this.pNumber);
				this.$emit('updateNum',this.pNumber)
			},
			updatePassword(){
				// console.log(this.pPassword);
				this.$emit('updatePas',this.pPassword)
			}
		},
		onShow:{
		}
	}
</script>

<style scoped lang="less">
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
</style>
