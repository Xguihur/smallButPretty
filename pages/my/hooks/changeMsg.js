import {
		reqModifyMsg
	} from '../../../api/index.js'

	// 设置执行请求的函数接口,返回值是经过promise包装的布尔类型，判断是否请求成功
	export const toChangeMsg = async (modifyData) => {
		const res = await reqModifyMsg(modifyData)
		console.log( '修改用户名和个性签名：',res)
		if (res.data.state === true) {
			uni.showToast({
				icon: 'success',
				title: res.data.msg
			})
		} else {
			uni.showToast({
				icon: 'error',
				title: res.data.msg
			})
		}
		// 虽然返回的是一个布尔类型,但是还是会被promise封装一层
		return res.data.state
	}
