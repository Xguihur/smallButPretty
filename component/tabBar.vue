<template>
	<view class="tarbar">
		<view
			class=".tarbar-list"
			:style="{
				background: tabBar.backgroundColor,
				color: tabBar.color,
				'border-top':
					tabBar.position == 'bottom' ? '1rpx solid ' + tabBar.borderStyle : 0,
				'border-bottom':
					tabBar.position == 'top' ? '1rpx solid ' + tabBar.borderStyle : 0
			}"
		>
			<view class="tarbar-list-ul">
				<view
					class="tarbar-list-li"
					v-for="(item, index) in tabBar.list"
					:key="index"
					@click="setSelected(index)"
				>
					<block>
						<view class="tarbar-list-li-icon">
							<image
								:src="item.selectedIconPath"
								v-if="selected == index"
							></image>
							<image :src="item.iconPath" v-else></image>
						</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabBar: {
				color: '#999999',
				borderStyle: 'white',
				backgroundColor: '#fff',
				position: 'bottom',
				list: [
					{
						pagePath: 'pages/index/index',
						iconPath: '../../static/tabbar/list.png',
						selectedIconPath: '../../static/tabbar/list-m.png'
					},
					{
						pagePath: 'pages/my/my',
						iconPath: '../../static/tabbar/my.png',
						selectedIconPath: '../../static/tabbar/my-m.png'
					}
				]
			},
			selected: this.current //当前激活项
		}
	},
	props: {
		current: {
			type: [Number, String],
			default: 0
		}
	},
	methods: {
		setSelected(index) {
			this.selected = index
			console.log(this.selected, index)
			if (index == 1) {
				uni.switchTab({
					url: '/pages/my/my'
				})
			} else if (index == 0) {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	},
	watch: {}
}
</script>

<style>
.tarbar {
	z-index: 9999;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}

.tarbar-list {
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
	padding: 0rpx 60rpx;
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
	width: 40rpx;
	height: 40rpx;
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
</style>
