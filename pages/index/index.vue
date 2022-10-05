<template>
	<view class="container">
		<view class="tab-bar">
			<view class="logo-wrap">
				<text>OneList</text>
			</view>
			<view class="search-wrap">
				<input type="text">
				<view class="search-title">搜索计划</view>
				<image class="search logo" src="/static/icon/search.svg"></image>
			</view>
		</view>
		<view :class="{'list-wrap':true,'first':true,'close':open1}">
			<view class="list-title"  @click="open1=!open1">
				<view class="circle"></view>
				<view class="title">重要且紧急</view>
				<image class="open-icon logo" src="/static/icon/up.svg"></image>
			</view>
			<view :class="{'list-item':true,'done':item.state==1}" v-for="item in List1" :key="item.id">
				<view class="r-wrap">
					<view class="r" v-if="item.state==0"></view>
					<image src="/static/icon/yes.svg" v-else mode="widthFix" class="logo"></image>
				</view>
				<text class="content">{{item.name}}</text>
				<text class="time">{{item.startTime}}~{{item.endTime}}</text>
			</view>
		</view>
		<view :class="{'list-wrap':true,'second':true,'close':open2}" >
			<view class="list-title" @click="open2=!open2">
				<view class="circle"></view>
				<view class="title">重要但不紧急</view>
				<image class="open-icon logo" src="/static/icon/up.svg"></image>
				<view class="logo"></view>
			</view>
			<view :class="{'list-item':true,'done':item.state==1}" v-for="item in List2" :key="item.id">
				<view class="r-wrap">
					<view class="r" v-if="item.state==0"></view>
					<image src="/static/icon/yes.svg" v-else mode="widthFix" class="logo"></image>
				</view>
				<text class="content">{{item.name}}</text>
				<text class="time">{{item.startTime}}~{{item.endTime}}</text>
			</view>
		</view>
	<view :class="{'list-wrap':true,'third':true,'close':open3}" >
			<view class="list-title" @click="open3=!open3">
				<view class="circle"></view>
				<view class="title">不重要但紧急</view>
				<image class="open-icon logo" src="/static/icon/up.svg"></image>
				<view class="logo"></view>
			</view>
			<view :class="{'list-item':true,'done':item.state==1}" v-for="item in List3" :key="item.id">
				<view class="r-wrap">
					<view class="r" v-if="item.state==0"></view>
					<image src="/static/icon/yes.svg" v-else mode="widthFix" class="logo"></image>
				</view>
				<text class="content">{{item.name}}</text>
				<text class="time">{{item.startTime}}~{{item.endTime}}</text>
			</view>
		</view>
	<view :class="{'list-wrap':true,'fourth':true,'close':open4}">
			<view class="list-title"  @click="open4=!open4">
				<view class="circle"></view>
				<view class="title">不重要不紧急</view>
				<image class="open-icon logo" src="/static/icon/up.svg"></image>
				<view class="logo"></view>
			</view>
			<view :class="{'list-item':true,'done':item.state==1}" v-for="item in List4" :key="item.id">
				<view class="r-wrap">
					<view class="r" v-if="item.state==0"></view>
					<image src="/static/icon/yes.svg" v-else mode="widthFix" class="logo"></image>
				</view>
				<text class="content">{{item.name}}</text>
				<text class="time">{{item.startTime}}~{{item.endTime}}</text>
			</view>
		</view>
		<tab-bar :current="0"></tab-bar>
	</view>
</template>

<script>
	import tabBar from '../../component/tabBar.vue';
	import moment from 'moment';
	import {
		reqAllList
	} from "../../api/index.js"
	export default {
		components: {
			tabBar
		},
		data() {
			return {
				List1: [],
				List2: [],
				List3: [],
				List4: [],
				open1: true,
				open2: true,
				open3: true,
				open4: true,
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			// 发送请求
			getList() {
				reqAllList().then(res => {
					let list = res.data.lists
					list.forEach((item) => {
						if (item.priority === 1) {
							this.List1.push({
								...item,
								startTime: moment(item.startTime).format('hh:mm'),
								endTime: moment(item.endTime).format('hh:mm')
							})
						}
						if (item.priority === 2) {
							this.List2.push({
								...item,
								startTime: moment(item.startTime).format('hh:mm'),
								endTime: moment(item.endTime).format('hh:mm')
							})
						}
						if (item.priority === 3) {
							this.List3.push({
								...item,
								startTime: moment(item.startTime).format('hh:mm'),
								endTime: moment(item.endTime).format('hh:mm')
							})
						}
						if (item.priority === 4) {
							this.List4.push({
								...item,
								startTime: moment(item.startTime).format('hh:mm'),
								endTime: moment(item.endTime).format('hh:mm')
							})
						}
					})
				})
			}
		},
	}
</script>

<style lang="less">
	.container {
		padding: 40rpx;
		font-size: 28rpx;
		background-color: #f1f2f3;
	}

	.close {
		height: 80rpx;
		transition: all .2s;
	}

	.logo {
		width: 40rpx;
		height: 40rpx;
	}

	.tab-bar {
		display: flex;
		justify-content: space-between;

		.logo-wrap {
			flex: 1;
			text-align: center;

			.one-list {
				width: 55rpx;
				height: 55rpx;
			}
		}

		text {
			color: #2643FC;
			font-size: 40rpx;
			line-height: 60rpx;
			font-weight: 700;
		}

		.search-wrap {
			flex: 2;
			height: 60rpx;
			background-color: #fff;
			border-radius: 26rpx;
			position: relative;
			box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

			input {
				margin-left: 80rpx;
				margin-top: 6rpx;
				height: 50rpx;
				font-size: 24rpx;
				width: 300rpx;
				position: absolute;
			}

			.search-title {
				position: absolute;
				top: 0;
				left: 80rpx;
				font-size: 24rpx;
				line-height: 60rpx;
				color: #9c9c9c;
				pointer-events: none;
			}

			.search {
				position: absolute;
				right: 20rpx;
				top: 12rpx;
			}
		}
	}

	.list-wrap {
		overflow: hidden;
		transition: all .2s;
		width: 100%;
		background-color: #fff;
		margin-top: 30rpx;
		border-radius: 25rpx;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

		.list-title {
			position: relative;
			width: 90%;
			margin: 0 auto;
			height: 50rpx;
			padding-top: 10rpx;
			border-bottom: 1rpx solid #d8d8d8;

			.circle {
				width: 40rpx;
				height: 40rpx;
				float: left;
				border-radius: 100%;
			}

			.title {
				line-height: 40rpx;
				padding-left: 70rpx;
				font-weight: 700;
			}

			.open-icon {
				position: absolute;
				right: 0;
				top: 15rpx;
			}
		}

		.list-item {
			display: flex;
			box-sizing: border-box;
			padding: 25rpx;
			height: 85rpx;
			justify-content: space-around;

			.r-wrap {
				flex: 1;
				padding-left: 15rpx;

				.r {
					margin-left: 4rpx;
					width: 30rpx;
					height: 30rpx;
				}
			}

			.content {
				flex: 8;
				text-align: left;
				line-height: 35rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}

			.time {
				flex: 4;
				font-size: 22rpx;
				line-height: 35rpx;
				text-align: center;
				color: #82B3E2;
			}

			&.done {
				.r-wrap {
					.r {
						border: none !important;
					}
				}

				.content {
					color: #A1A1A1;
				}

				.time {
					color: #a1a1a1;
				}
			}
		}

		&.first {
			.list-title {
				.circle {
					background-color: #df2e2e;
				}

				.title {
					color: #df2e2e;
				}
			}

			.list-item {
				.r-wrap {
					.r {
						border: 2rpx solid #df2e2e;
					}
				}
			}
		}

		&.second {
			.list-title {
				.circle {
					background-color: #FFB000;
				}

				.title {
					color: #FFB000;
				}
			}

			.list-item {
				.r-wrap {
					.r {
						border: 2rpx solid #FFB000;
					}
				}
			}
		}

		&.third {
			.list-title {
				.circle {
					background-color: #4772FA;
				}

				.title {
					color: #4772FA;
				}
			}

			.list-item {
				.r-wrap {
					.r {
						border: 2rpx solid #4772FA;
					}
				}
			}
		}

		&.fourth {
			.list-title {
				.circle {
					background-color: #A3A3A3;
				}

				.title {
					color: #A3A3A3;
				}
			}

			.list-item {
				.r-wrap {
					.r {
						border: 2rpx solid #A3A3A3;
					}
				}
			}
		}
	}
</style>
