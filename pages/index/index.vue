<template>
	<view class="container">
		<view class="tab-bar">
			<view class="logo-wrap">
				<!-- <image src="../../static/logo.png" mode="" class="one-list"></image> -->
				<text>OneList</text>
			</view>
			<view class="search-wrap">
				<input type="text">
				<view class="search-title">搜索计划</view>
				<view class="search logo"></view>
			</view>
		</view>
		<view class="list-wrap first">
			<view class="list-title">
				<view class="circle"></view>
				<view class="title">重要且紧急</view>
				<view class="logo"></view>
			</view>
			<view class="list-item">
				<view class="r-wrap">
					<view class="r"></view>
				</view>
				<text class="content">参加会议啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</text>
				<text class="time">9：00~10：00</text>
			</view>
			<view class="list-item done">
				<view class="r-wrap">
					<view class="r"></view>
				</view>
				<text class="content">参加会议</text>
				<text class="time">9：00~10：00</text>
			</view>
		</view>
		<view class="sss">
			
		</view>
		<view class="list-wrap second">
			<view class="list-title">
				<view class="circle"></view>
				<view class="title">重要但不紧急</view>
				<view class="logo"></view>
			</view>
			<view class="list-item">
				<view class="r-wrap">
					<view class="r"></view>
				</view>
				<text class="content">参加会议啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</text>
				<text class="time">9：00~10：00</text>
			</view>
			<view class="list-item done">
				<view class="r-wrap">
					<view class="r"></view>
				</view>
				<text class="content">参加会议</text>
				<text class="time">9：00~10：00</text>
			</view>
		</view>
		<view class="list-wrap third">
			<view class="list-title">
				<view class="circle"></view>
				<view class="title">重要且紧急</view>
				<view class="logo"></view>
			</view>
			<view class="list-item">
				<view class="r-wrap">
					<view class="r"></view>
				</view>
				<text class="content">参加会议啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</text>
				<text class="time">9：00~10：00</text>
			</view>
			<view class="list-item done">
				<view class="r-wrap">
					<view class="r"></view>
				</view>
				<text class="content">参加会议</text>
				<text class="time">9：00~10：00</text>
			</view>
		</view>
		<view class="list-wrap fourth">
			<view class="list-title">
				<view class="circle"></view>
				<view class="title">重要且紧急</view>
				<view class="logo"></view>
			</view>
			<view class="list-item">
				<view class="r-wrap">
					<view class="r"></view>
				</view>
				<text class="content">参加会议啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</text>
				<text class="time">9：00~10：00</text>
			</view>
			<view class="list-item done">
				<view class="r-wrap">
					<view class="r"></view>
				</view>
				<text class="content">参加会议</text>
				<text class="time">9：00~10：00</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {},
	};
</script>

<style lang="less">
	.container {
		padding: 40rpx;
		font-size: 28rpx;
		background-color: #f1f2f3;
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
		text{
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
				width: 400rpx;
				position: absolute;
			}

			.search-title {
				position: absolute;
				top: 0;
				left: 80rpx;
				font-size: 24rpx;
				line-height: 60rpx;
				color: #9c9c9c;
				pointer-events:none;
			}
		}
	}

	.list-wrap {
		width: 100%;
		background-color: #fff;
		margin-top: 30rpx;
		border-radius: 25rpx;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

		.list-title {
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
		}

		.list-item {
			display: flex;
			box-sizing: border-box;
			padding: 25rpx 25rpx;
			height: 80rpx;
			justify-content: space-around;
			.r-wrap {
				flex: 1;
				padding-left: 15rpx;
				.r {
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
					border: 2rpx solid #A1A1A1 !important;  	
					}
				}
				.content{
					color:  #A1A1A1;
				}
				.time{
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
