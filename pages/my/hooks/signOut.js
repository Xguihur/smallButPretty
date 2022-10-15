export const signOut = () => {
	// 登出
	uni.showModal({
		title: '提示',
		content: '是否确定退出登录？',
		success: function(res) {
			if (res.confirm) {
				console.log('用户点击确定-登出')
				uni.setStorageSync('token', '')
				uni.showToast({
					icon: 'success',
					title: '登出成功！'
				})
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}, 800)
			} else if (res.cancel) {
				console.log('用户点击取消')
			}
		}
	})
}
