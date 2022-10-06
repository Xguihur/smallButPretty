<template>
	<view class="container">
		<view class="tab-bar">
			<view class="logo-wrap">
				<text>OneList</text>
			</view>
			<view class="search-wrap">
				<input type="text" placeholder="搜索计划">
				<image class="search logo" src="/static/icon/search.svg"></image>
			</view>
		</view>
		<view :class="{'list-wrap':true,'first':true,'close':open1}">
				<view class="list-title" @click="ani">
					<view class="circle"></view>
					<view class="title">重要且紧急</view>
					<image class="open-icon logo" src="/static/icon/up.svg" v-if="!open1"></image>
					<image class="open-icon logo" src="/static/icon/down.svg" v-else></image>
				</view>
	<uni-transition ref="ani" :show="open1" modeClass="fade" >
				<view :class="{'list-item':true,'done':item.state==1}" v-for="item in state.list1" :key="item.id">
					<view class="r-wrap" @click="swichClick(item)">
						<view class="r" v-show="item.state==0"></view>
						<image src="/static/icon/yes.svg" v-show="item.state==1" mode="widthFix" class="logo"></image>
					</view>
					<text class="content" @click="itemClick(item)">{{item.name}}</text>
					<text class="time"
						@click="itemClick(item)">{{item.startTime===item.endTime?item.showStartTime:`${item.showStartTime}~${item.showEndTime}`}}</text>
				</view>
			</uni-transition>
		</view>
		<view :class="{'list-wrap':true,'second':true,'close':open2}">
			<view class="list-title" @click="open2=!open2">
				<view class="circle"></view>
				<view class="title">不重要但紧急</view>
				<image class="open-icon logo" src="/static/icon/up.svg" v-if="!open2"></image>
				<image class="open-icon logo" src="/static/icon/down.svg" v-else></image>
				<view class="logo"></view>
			</view>
			<view :class="{'list-item':true,'done':item.state==1}" v-for="item in state.list2" :key="item.id">
				<view class="r-wrap" @click="swichClick(item)">
					<view class="r" v-if="item.state==0"></view>
					<image src="/static/icon/yes.svg" v-else mode="widthFix" class="logo"></image>
				</view>
				<text class="content" @click="itemClick(item)">{{item.name}}</text>
				<text class="time"
					@click="itemClick(item)">{{item.startTime===item.endTime?item.showStartTime:`${item.showStartTime}~${item.showEndTime}`}}</text>
			</view>
		</view>
		<view :class="{'list-wrap':true,'third':true,'close':open3}">
			<view class="list-title" @click="open3=!open3">
				<view class="circle"></view>
				<view class="title">重要但不紧急</view>
				<image class="open-icon logo" src="/static/icon/up.svg" v-if="!open3"></image>
				<image class="open-icon logo" src="/static/icon/down.svg" v-else></image>
				<view class="logo"></view>
			</view>
			<view :class="{'list-item':true,'done':item.state==1}" v-for="item in state.list3" :key="item.id">
				<view class="r-wrap" @click="swichClick(item)">
					<view class="r" v-if="item.state==0"></view>
					<image src="/static/icon/yes.svg" v-else mode="widthFix" class="logo"></image>
				</view>
				<text class="content" @click="itemClick(item)">{{item.name}}</text>
				<text class="time"
					@click="itemClick(item)">{{item.startTime===item.endTime?item.showStartTime:`${item.showStartTime}~${item.showEndTime}`}}</text>
			</view>
		</view>
		<view :class="{'list-wrap':true,'fourth':true,'close':open4}">
			<view class="list-title" @click="open4=!open4">
				<view class="circle"></view>
				<view class="title">不重要不紧急</view>
				<image class="open-icon logo" src="/static/icon/up.svg" v-if="!open4"></image>
				<image class="open-icon logo" src="/static/icon/down.svg" v-else></image>
				<view class="logo"></view>
			</view>
			<view :class="{'list-item':true,'done':item.state==1}" v-for="item in state.list4" :key="item.id">
				<view class="r-wrap" @click="swichClick(item)">
					<view class="r" v-if="item.state==0"></view>
					<image src="/static/icon/yes.svg" v-else mode="widthFix" class="logo"></image>
				</view>
				<text class="content" @click="itemClick(item)">{{item.name}}</text>
				<text class="time"
					@click="itemClick(item)">{{item.startTime===item.endTime?item.showStartTime:`${item.showStartTime}~${item.showEndTime}`}}</text>
			</view>
			<tab-bar :current="0" ref="tabBars" @fresh="getList"></tab-bar>
		</view>
		<view class="btn" @click="btnClick()">{{btnContent}}</view>
	</view>
</template>

<script>
	import tabBar from '../../component/tabBar.vue';
	import moment from 'moment';
	import {
		reqChangeList
	} from "../../api/index"
	import {
		reqAllList
	} from "../../api/index.js"
	export default {
		components: {
			tabBar
		},
		data() {
			return {
				state: {},
				open1: false,
				open2: false,
				open3: false,
				open4: false,
				btnContent: "今日",
				btnFlag: true
			}
		},
		mounted() {},
		onShow() {
			this.getList(0)
		},
		methods: {
			ani() {
				this.open1 = !this.open1
				this.$refs.ani.run()
			},
			// 发送请求
			getList(e) {
				if (e == 1) {
					reqAllList().then(res => {
						let list = res.data.lists
						this.state = {
							list1: [],
							list2: [],
							list3: [],
							list4: [],
						}
						list.forEach((item) => {
							this.state[`list${item.priority}`].push({
								...item,
								showStartTime: moment(item.startTime).format('HH:mm'),
								showEndTime: moment(item.endTime).format('HH:mm')
							})
						})
					})
				} else {
					reqAllList().then(res => {
						let list = res.data.lists
						this.state = {
							list1: [],
							list2: [],
							list3: [],
							list4: [],
						}
						let afterList = list.filter((item) => {
							return item.startTime !== item.endTime ?
								moment().isBetween(item.startTime, item.endTime) :
								moment().isSame(item.startTime, 'day')
						})
						afterList.forEach((item) => {
							this.state[`list${item.priority}`].push({
								...item,
								showStartTime: moment(item.startTime).format('HH:mm'),
								showEndTime: moment(item.endTime).format('HH:mm')
							})
						})
					})
				}
			},
			itemClick(item) {
				if (item.state == 0) {
					this.$refs.tabBars.addList(item)
				} else {
					return
				}
			},
			swichClick(item) {
				console.log(item);
				let {
					id,
					state,
				} = item
				if (state == 0) {
					state = 1
				} else {
					state = 0
				}
				let changeForm = {
					id,
					state
				}
				reqChangeList(changeForm).then(() => {
					this.getList()

				})
			},
			btnClick() {
				if (this.btnFlag) {
					this.getList(1)
					this.btnContent = "全部"
					this.btnFlag = false
				} else {
					this.getList(0)
					this.btnContent = "今日"
					this.btnFlag = true
				}

			}
		},
	}
</script>

<style lang="less">
	.container {
		padding: 40rpx;
		font-size: 28rpx;
		padding-bottom: 150rpx;
		background-color: #f1f2f3;
	}

	.close {}

	.logo {
		width: 40rpx;
		height: 40rpx;
		transition: all .2s;

		&:hover {
			width: 50rpx;
			height: 50rpx;
		}
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
			padding: 0 25rpx;
			margin: 20rpx, 0;
			height: 80rpx;
			line-height: 80rpx;
			justify-content: space-around;

			.r-wrap {
				flex: 2;
				padding-left: 15rpx;
				position: relative;

				.r {
					margin-left: 4rpx;
					width: 30rpx;
					height: 30rpx;
					transition: all .2s;
					position: absolute;
					top: 50%;
					transform: translate(0, -50%);

					&:hover {
						width: 40rpx;
						height: 40rpx;
					}
				}

				image {
					position: absolute;
					top: 50%;
					transform: translate(0, -50%);
				}
			}

			.content {
				flex: 8;
				text-align: left;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}

			.time {
				flex: 4;
				font-size: 22rpx;
				line-height: 80rpx;
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

	.btn {
		height: 100rpx;
		width: 100rpx;
		background-color: #2643FC;
		border-radius: 100%;
		position: fixed;
		bottom: 200rpx;
		right: 20rpx;
		line-height: 100rpx;
		text-align: center;
		color: #fff;
		box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
	}
</style>
