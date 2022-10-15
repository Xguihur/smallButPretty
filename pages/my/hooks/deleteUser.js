import {
		reqDeleteUser
	} from '../../../api/index.js'

	export const toDeleteUser = async () => {
		const res = await reqDeleteUser()
		if (res) {
			if (res.data.state) {
				uni.showToast({
					icon: 'success',
					title: res.data.msg
				})
				uni.setStorageSync('token', '')
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}, 800)
			} else {
				uni.showToast({
					icon: 'error',
					title: res.data.msg
				})
			}
		} else {
			uni.showToast({
				icon: 'error',
				title: '请求失败！'
			})
		}
	}
