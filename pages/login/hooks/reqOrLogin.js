import {
	reqRegister,
	reqLogin
} from '../../../api/index.js'
export const mySignInReq = (number, password) => {
	console.log('登录')
	let loginForm = {}
	loginForm.username = number
	loginForm.password = password
	// 执行接口
	reqLogin(loginForm).then(res => {
		if (res) {
			console.log(res)
			if (res.statusCode === 200) {
				let token = res.data.token
				if (token !== '' && token !== null && token !== undefined) {
					uni.setStorageSync('token', token)
					uni.showToast({
						icon: 'success',
						title: '登录成功！'
					})
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}, 1000)
				} else {
					console.log(res.data.msg)
					uni.showToast({
						icon: 'error',
						title: res.data.msg
					})
				}
			} else {
				console.log('res.statusCode:', res.statusCode)
			}
		} else {
			console.log('找不到res')
		}
	})
}

export const myRegisterReq = async (number, password) => {
	let registerForm = {}
	registerForm.username = number
	registerForm.password = password

	let state = false
	// 执行接口
	const res = await reqRegister(registerForm)
	if (res) {
		if (res.statusCode === 200) {
			if (res.data.state) {
				// 注册成功
				uni.showToast({
					icon: 'success',
					title: res.data.msg
				})
				state = true

			} else {
				// 注册失败
				uni.showToast({
					icon: 'error',
					title: res.data.msg
				})
			}
		} else {
			console.log('res.statusCode:', res.statusCode)
		}
	} else {
		console.log('res不存在')
	}
	return state
}
