import {
		reqModifyMsg,
		reqCheckPassword
	} from '../../../api/index.js'

	// 二次封装验证密码的接口
	export const toCheckPassword = async (password) => {
		let state = false
		const res = await reqCheckPassword(password)
		// console.log(res)
		if (res) {
			if (res.data.state) {
				// 验证成功就修改state,给外面去执行下一步操作
				state = true
				console.log('验证成功');
			} else {
				uni.showToast({
					icon: 'error',
					title: '密码错误！'
				})
			}
		} else {
			uni.showToast({
				icon: 'error',
				title: '请求失败！'
			})
		}
		// 将验证后的布尔值返回出去用于判断是否通过验证
		// quetion:不知道为什么使用 async和await 能够在验证成功后成功赋值这个state,但是使用es6的 .then ,同样的赋值却一直无法将 state 变成 true
		return state
	}

	export const toChangePassword = async (modifyData) => {
		const res = await reqModifyMsg(modifyData)
			if (res.data.state === true) {
				uni.showToast({
					icon: 'success',
					title: res.data.msg
				})
				// 修改之后应该退出登陆
				uni.setStorageSync('token', '')
				uni.showToast({
					icon: 'success',
					title: '修改密码成功！'
				})
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
	}
