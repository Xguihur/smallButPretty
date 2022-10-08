<template>
	<view class="container">
		<view class="tab-bar">
			<view class="logo-wrap"><text>OneList</text></view>
			<view class="search-wrap">
				<input type="text" v-model="keyWord"   placeholder="搜索计划" />
				<image class="search logo" src="/static/icon/search.svg"></image>
			</view>
			<button  @click="searchClick()"  class="searchCss">搜索</button>
		</view>
		<view :class="{'list-wrap':true,'first':true}" :style="{maxHeight:wrap[0].openHeight}">
			<view class="wrap">
				<view class="list-title" @click="open(0)">
					<view class="circle"></view>
					<view class="title">重要且紧急</view>
					<image class="open-icon logo" src="/static/icon/up.svg" :class="{'rotating':!wrap[0].isOpen}">
					</image>
				</view>

				<view :class="{'list-item':true,'done':item.state==1}" v-for="item in state.list1" :key="item.id">
					<view class="r-wrap" @click="swichClick(item)">
						<view class="r" v-show="item.state == 0"></view>
						<image src="/static/icon/yes.svg" v-show="item.state == 1" mode="widthFix" class="logo"></image>
					</view>
					<text class="content" @click="itemClick(item)">{{ item.name }}</text>
					<text class="time" @click="itemClick(item)">
						{{
							item.startTime === item.endTime
								? item.showStartTime
								: `${item.showStartTime}~${item.showEndTime}`
						}}
					</text>
				</view>
			</view>
		</view>
		<view :class="{'list-wrap':true,'second':true}" :style="{maxHeight:wrap[1].openHeight}">
			<view class="wrap">
				<view class="list-title" @click="open(1)">
					<view class="circle"></view>
					<view class="title">不重要但紧急</view>
					<image class="open-icon logo" src="/static/icon/up.svg" :class="{'rotating':!wrap[1].isOpen}">
					</image>
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
		</view>
		<view :class="{'list-wrap':true,'third':true}" :style="{maxHeight:wrap[2].openHeight}">
			<view class="wrap">
				<view class="list-title" @click="open(2)">
					<view class="circle"></view>
					<view class="title">重要但不紧急</view>
					<image class="open-icon logo" src="/static/icon/up.svg" :class="{'rotating':!wrap[2].isOpen}">
					</image>
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
		</view>
		<view :class="{'list-wrap':true,'fourth':true}" :style="{maxHeight:wrap[3].openHeight}">
			<view class="wrap">
				<view class="list-title" @click="open(3)">
					<view class="circle"></view>
					<view class="title">不重要不紧急</view>
					<image class="open-icon logo" src="/static/icon/up.svg" :class="{'rotating':!wrap[3].isOpen}">
					</image>

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
			</view>
			<tab-bar :current="0" ref="tabBars" @fresh="getList"></tab-bar>
		</view>
		<view class="btn" @click="btnClick()">{{ btnContent }}</view>
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
				keyWord:null,
				wrap: [{
					isOpen: true,
					openHeight: '30000rpx'
				}, {
					isOpen: true,
					openHeight: '30000rpx'
				}, {
					isOpen: true,
					openHeight: '30000rpx'
				}, {
					isOpen: true,
					openHeight: '30000rpx'
				}],
				btnContent: "今日",
				btnFlag: true
			}
		},
		mounted() {},
		onShow() {
			this.getList(0)
		},
		methods: {
			searchClick() {
				uni.navigateTo({
					url: '/pages/search/search?keyWord='+this.keyWord
				})
				
				
			},
			async open(e) {
				const query = uni.createSelectorQuery().in(this)

				function getHeight(index) {
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							query.selectAll('.wrap').boundingClientRect(rect => {
								resolve(rect[index].height)
							}).exec()
						}, 100)
					})
				}
				const height = await getHeight(e)
				const target = this.wrap[e]
				target.isOpen = !target.isOpen
				if (target.isOpen) {
					target.openHeight = height * 2 + 'rpx'
				} else {
					target.openHeight = '60rpx'
				}
			},
			// 发送请求
			getList(e) {
				this.wrap.forEach(item=>{
					item.isOpen = true
					item.openHeight= '30000rpx'
				})
				if (e == 1) {
					reqAllList().then(res => {
						let list = res.data.lists
						this.state = {
							list1: [],
							list2: [],
							list3: [],
							list4: []
						}
						list&&list.forEach((item) => {
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
							list4: []
						}
						let afterList = list&&list.filter(item => {
							return item.startTime !== item.endTime ?
								moment().isBetween(item.startTime, item.endTime) ://开始时间不等于结束时间，
								moment().isSame(item.startTime, 'day')//时间相等
						})
						afterList&&afterList.forEach(item => {
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
					this.wrap.forEach(item=>{
						item.isOpen = true
						item.openHeight= '30000rpx'
					})
				} else {
					return
				}
			},
			swichClick(item) {
				let {
					id,
					state,
				} = item
				if (state == 0) {
					state = 1
					item.state = 1
				} else {
					state = 0
					item.state = 0
				}
				let changeForm = {
					id,
					state
				}
				reqChangeList(changeForm).then(() => {
					if (this.btnFlag) {
						this.getList(0)
					} else {
						this.getList(1)
					}
				})
			},
			itemClick(item) {
				if (item.state == 0) {
					this.$refs.tabBars.addList(item)
				} else {
					return
				}
			},
			swichClick(item) {
				let {
					id,
					state
				} = item
				if (state == 0) {
					state = 1
					item.state = 1
				} else {
					state = 0
					item.state = 0
				}
				let changeForm = {
					id,
					state
				}
				reqChangeList(changeForm).then(() => {
					if (this.btnFlag) {
					      this.getList(0)
					     } else {
					      this.getList(1)
					     }
				})
			},
			btnClick() {
				if (this.btnFlag) {
					this.getList(1)
					this.btnContent = '全部'
					this.btnFlag = false
				} else {
					this.getList(0)
					this.btnContent = '今日'
					this.btnFlag = true
				}
				this.wrap.forEach(item=>{
					item.isOpen = true
					item.openHeight= '30000rpx'
				})
			},
		}
	}
</script>

<style lang="less">
	.searchCss{
		margin-left: 12rpx;
		margin-top: -2rpx;
		font-size: 28rpx;
		border-radius: 12rpx;
		line-height: 65rpx;
		color: #fff;
		height: 65rpx;
		background-color: #2643fc;
	}
	.container {
		padding: 40rpx;
		font-size: 28rpx;
		padding-bottom: 150rpx;
		background-color: #f1f2f3;
	}

	.logo {
		width: 40rpx;
		height: 40rpx;
		transition: all 0.2s;

		&:hover {
			width: 50rpx;
			height: 50rpx;
		}

	}

	.rotating {
		transform: rotate(180deg);
	}

	.tab-bar {
		display: flex;

		.logo-wrap {
			flex: 1;

			text {
				color: #2643fc;
				font-size: 40rpx;
				line-height: 60rpx;
				font-weight: 700;
			}
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
		transition: all .5s;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

		.wrap {
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
		}

		.list-item {
			height: 60rpx;
			display: flex;
			line-height: 60rpx;
			font-size: 30rpx;
			padding: 20rpx;

			.r-wrap {
				flex: 2;
				position: relative;

				.r {
					position: absolute;
					top: 50%;
					transform: translate(50%, -50%);
					width: 30rpx;
					height: 30rpx;
					transition: all .1s;

					&:hover {
						width: 35rpx;
						height: 35rpx;
						transform: translate(45%, -50%);
					}
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
				line-height: 60rpx;
				text-align: center;
				color: #82b3e2;
			}

			&.done {
				.r-wrap {
					image {
						position: absolute;
						width: 40rpx;
						height: 40rpx;
						transition: all .1s;
						position: absolute;
						top: 50%;
						transform: translate(35%, -50%);

						&:hover {
							width: 50rpx;
							height: 50rpx;
							transform: translate(20%, -50%);
						}
					}
				}

				.content {
					color: #a1a1a1;
				}

				.time {
					color: #a1a1a1;
				}
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
				background-color: #ffb000;
			}

			.title {
				color: #ffb000;
			}
		}

		.list-item {
			.r-wrap {
				.r {
					border: 2rpx solid #ffb000;
				}
			}
		}
	}

	&.third {
		.list-title {
			.circle {
				background-color: #4772fa;
			}

			.title {
				color: #4772fa;
			}
		}

		.list-item {
			.r-wrap {
				.r {
					border: 2rpx solid #4772fa;
				}
			}
		}
	}

	&.fourth {
		.list-title {
			.circle {
				background-color: #a3a3a3;
			}

			.title {
				color: #a3a3a3;
			}
		}

		.list-item {
			.r-wrap {
				.r {
					border: 2rpx solid #a3a3a3;
				}
			}
		}
	}

	.btn {
		height: 100rpx;
		width: 100rpx;
		background-color: #2643fc;
		border-radius: 100%;
		position: fixed;
		bottom: 200rpx;
		right: 20rpx;
		line-height: 100rpx;
		text-align: center;
		color: #fff;
		transition: all .2s;
		box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

		&:hover {
			height: 110rpx;
			width: 110rpx;
			line-height: 110rpx;
			bottom: 195rpx;
			right: 15rpx;
		}
	}
</style>
