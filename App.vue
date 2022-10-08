<script>
export default {
	onLaunch: function() {
		uni.hideTabBar()
	},
	onShow: function() {
	},
	onHide: function() {
	}
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import '@/uni_modules/uview-ui/index.scss';
/*每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';
/* #ifndef APP-NVUE */
@import '@/static/customicons.css';
// 设置整个项目的背景色
page {
	background-color: #f1f2f3;
}

/* #endif */
.example-info {
	font-size: 14px;
	color: #333;
	padding: 10px;
}
</style>
