<template>
	<view class="tarbar">
		<view class=".tarbar-list" :style="{
				background: tabBar.backgroundColor,
				color: tabBar.color,
				'border-top':
					tabBar.position == 'bottom' ? '1rpx solid ' + tabBar.borderStyle : 0,
				'border-bottom':
					tabBar.position == 'top' ? '1rpx solid ' + tabBar.borderStyle : 0
			}">
			<view class="tarbar-list-ul">
				<view class="tarbar-list-li" v-for="(item, index) in tabBar.list" :key="index"
					@click="setSelected(index)">
					<block>
						<view class="tarbar-list-li-icon">
							<image :src="item.selectedIconPath" v-if="selected == index"></image>
							<image :src="item.iconPath" v-else></image>
						</view>
					</block>
				</view>
			</view>
		</view>
		<view class="plus-wrap" @click="addList">+</view>
		<uni-popup ref="addList" type="bottom" mask-background-color="rgba(0,0,0,0)" v-show="!showPicker">
			<view class="add-wrap">
				<button size="mini" type="default" @click="submit">发布</button>
				<input type="text" placeholder="准备做什么?"  v-model="form.name">
				<textarea name="" id="" auto-height placeholder="描述一下吧!" 
				v-model="form.description"></textarea>
				<view class="option-wrap">
					<view class="item-calendar" @click="calendarClick(1)">
						<picker class="wrap" mode="time" value="" @change="canlendarStarChange" @cancel="canlendarStarCancel">
							<image src="/static/icon/calendar.svg" mode=""></image>
							<text class="time">{{showStarTime}}</text>
						</picker>
					</view>
					<view class="item-calendar" @click="calendarClick(0)">
						<picker class="wrap" mode="time" value="" @change="canlendarEndChange" @cancel="canlendarEndCancel">
							<image src="/static/icon/calendar.svg" mode=""></image>
							<text class="time">{{showEndTime}}</text>
						</picker>
					</view>
					<view class="item-flag">
						<view class="wrap" @click="openFlag">
							<image :src="require('static/icon/flag-'+form.priority+'.svg')" mode="" ></image>
							<text class="content" :class="'color'+form.priority">{{priority}}</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="itemFlag" type="bottom">
			<view class="flag-wrap">
				<view class="item" @click="chooseType(1)">
					<image src="/static/icon/flag-1.svg" mode="" ></image>
					<text style="color: #DF2E2E;">重要且紧急</text>
				</view>
				<view class="item"  @click="chooseType(2)">
					<image src="/static/icon/flag-2.svg" mode="" ></image>
					<text style="color: #ffbb00;">重要但不紧急</text>
				</view>
				<view class="item" @click="chooseType(3)">
					<image src="/static/icon/flag-3.svg" mode=""  ></image>
					<text style="color: #4772fa;">不重要但紧急</text>
				</view>
				<view class="item"  @click="chooseType(4)">
					<image src="/static/icon/flag-4.svg" mode="" ></image>
					<text style="color: #a3a3a3;">不重要不紧急</text>
				</view>
			</view>
		</uni-popup>
		<uni-calendar 
			ref="calendar1"
			:insert="false"
			@confirm="StarConfirm"
			:showMonth="false"
			 />
			 <uni-calendar
			 	ref="calendar0"
			 	:insert="false"
			 	@confirm="EndConfirm"
				:showMonth="false"
			 	 />
	</view>
</template>

<script>
	import moment from "moment"
	import {
		reqAddList
	} from "../api/index.js"
	export default {
		data() {
			return {
				tabBar: {
					color: '#999999',
					borderStyle: 'white',
					backgroundColor: '#fff',
					position: 'bottom',
					list: [{
							pagePath: 'pages/index/index',
							iconPath: '/static/tabbar/list.png',
							selectedIconPath: '/static/tabbar/list-m.png'
						},
						{
							pagePath: 'pages/my/my',
							iconPath: '/static/tabbar/my.png',
							selectedIconPath: '/static/tabbar/my-m.png'
						}
					]
				},
				selected: this.current ,//当前激活项
				showPicker:false,
				showStarTime:"开始时间",
				showEndTime:"结束时间",
				form:{
					priority:4,
				},//提交表单
				priority:'不重要不紧急' //任务优先级
			}
		},
		props: {
			current: {
				type: [Number, String],
				default: 0
			}
		},
		methods: {
			// tabbar跳转
			setSelected(index) {
				if (index == 1) {
					uni.switchTab({
						url: '/pages/my/my'
					})
				} else if (index == 0) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
				if (this.$route.meta.pagePath == 'pages/index/index') {
					this.selected == 0;
				} else {
					this.selected == 1
				}
			},
			// 打开添加列表
			addList(item) {
				if(item.type){
					this.$refs.addList.open()
				}else{
					this.$refs.addList.open()
					this.form = item
					this.showStarTime = moment(item.starTime).format('hh:mm')
					this.showEndTime = item.endTime
				}

			},
			//打开任务状态列表
			openFlag() {
				this.$refs.itemFlag.open()
			},
			chooseType(e){
			this.form.priority = e
				if(e==1) {
				this.priority = "重要且紧急"
				}else if (e==2){
					this.priority = "重要但不紧急"
				}else if (e==3){
					this.priority = "不重要但紧急"
				}else if (e==4){
					this.priority = "不重要不紧急"
				}
			this.$refs.itemFlag.close()
			},
			//打开日历
			calendarClick(e){
				if(e==1){
					this.$refs.calendar1.open();
				}else{
					this.$refs.calendar0.open();
				}
				this.showPicker=true
			},
			//日历确认
			StarConfirm(e){
				this.form.startTime = e.fulldate
			},
			EndConfirm(e){
				this.form.endTime = e.fulldate
			},
			canlendarStarChange(e){
				this.showStarTime = e.detail.value
			    this.form.startTime =  this.form.startTime +' '+ e.detail.value+':00'
				this.showPicker=false
			},
			canlendarEndChange(e){
				this.showEndTime = e.detail.value
			    this.form.endTime =  this.form.endTime +' '+ e.detail.value+':00'
				this.showPicker=false
			},
			canlendarStarCancel(){
				this.showPicker=false
				this.form.starTime = undefined
			},
			canlendarEndCancel(){
				this.showPicker=false
				this.form.endTime = undefined
			},
			//提交事件
			submit() {
				let {name,description,startTime,endTime,priority} = this.form
				if(!name){
					uni.showToast({
						title: '请输入待办',
						icon:"error"
					});
					return
				}else if(!startTime) {
					uni.showToast({
						title: '请选择开始时间',
						icon:"error"
					});
					return
				}else if(!endTime){
					uni.showToast({
						title: '请选择结束时间',
						icon:"error"
					});
					return
				}else {
					const addForm = {
						name,
						description,
						startTime,
						priority,
						endTime
					}
					reqAddList(addForm).then(res=>{
						uni.showToast({
							title:"创建成功",
							icon:"success"
						})
					})
				}
				
			}
		},
		mounted() {
			if (this.$route.meta.pagePath == 'pages/index/index') {
				this.selected == 0;
			} else {
				this.selected == 1
			}
		},
		watch: {},
	}
</script>

<style lang="less">
	.color1{
		color: #df2e2e;
	}
	.color2{
		color: #ffb000;
	}
	.color3{
		color: #4772fa;
	}
	.color4{
		color: #a3a3a3;
	}
	.tarbar {
		z-index: 9999;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.tarbar-list {
		position: relative;
		width: 100%;
		height: 400rpx;
		background: #4d586f;
		position: fixed;
		left: 0;
		bottom: 0;
	}

	.tarbar-list-ul {
		width: 100%;
		height: 100%;
		padding: 0rpx 100rpx;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.tarbar-list-li {
		width: 100rpx;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.tarbar-list-li-icon {
		width: 100rpx;
		height: 80rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tarbar-list-li-icon image {
		width: 50rpx;
		height: 50rpx;
	}

	.tarbar-list-li-name {
		width: 100%;
		text-align: center;
		line-height: 30upx;
		font-size: 24upx;
		height: 30upx;
	}

	.tarbar-list-li-center {
		width: 100upx;
	}

	.plus-wrap {
		position: absolute;
		width: 110rpx;
		height: 110rpx;
		background-color: #2643FC;
		bottom: 3rpx;
		left: 50%;
		color: #fff;
		font-size: 100rpx;
		text-align: center;
		line-height: 100rpx;
		border-radius: 100%;
		transform: translate(-50%);
	}

	.add-wrap {
		border-top: 2rpx solid #afafaf;
		background-color: #fff;
		border-radius: 31rpx;
		position: relative;
		button {
			position: absolute;
			right: 70rpx;
            top: 15rpx;
			z-index: 999;
			background-color: #2643FC;
			color: #fff;
		}
		input {
			box-sizing: border-box;
			height: 24rpx;
			width: 80%;
			margin: 20rpx auto;
			color: #6f6f6f;
		}
		textarea {
			position: relative;
			height: 300rpx;
			width: 80%;
			border-top: 2px solid #efefef;
			margin: 0 auto;
			padding:20rpx;
			color: #6f6f6f;
		}

		.option-wrap {
			position: relative;
			width: 100%;
			height: 60rpx;
			font-size: 24rpx;
			text-align: center;
			line-height: 50rpx;
			display: flex;

			.item-calendar {
				position: relative;
				flex: 2;
				width: 40%;
				.wrap {
					display: flex;
					background-color: #efefef;
					width: 70%;
					height: 45rpx;
					margin: 0 auto;
					justify-content: center;
					border-radius: 10rpx;		
					.time{
						vertical-align: top;
						color: #6f6f6f;
					}
				}
		
			}

			.item-flag {
				position: relative;
				flex: 3;
				color: #6f6f6f;
				.wrap {
					display: flex;
					background-color: #efefef;
					width: 70%;
					height: 45rpx;
					margin: 0 auto;
					justify-content: center;
					border-radius: 10rpx;
				}
			}
		}

		image {
			width: 40rpx;
			height: 40rpx;
			transform: translate(-10%, 10%);
		}
	}

	.flag-wrap {
		width: 500rpx;
		height: 400rpx;
		position: absolute;
		top: -50vh;
		left: 50%;
		font-weight: 700;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: #fff;
		border-radius: 10rpx;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
		font-size: 38rpx;
		margin: 0 auto;

		.item {
			display: flex;
			flex: 1;
			box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 3px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

			image {
				flex: 1;
			}

			text {
				flex: 2;
				line-height: 100rpx;
				text-align: center;
			}
		}

		image {
			width: 60rpx;
			height: 60rpx;
			transform: translate(0, 40%);
		}
	}
</style>
