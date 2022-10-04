import axios from 'axios'
const requests = axios.create({

	baseURL: "http://8.130.38.74:6661",
	// 代表请求超时的时间为5s
	timeout: 5000,
})

// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在发请求之前做一些事情
requests.interceptors.request.use(config => {
	 // 配置所有请求在请求头中携带token
	  const token = uni.getStorageSync('token');
	  if (token !== null && token !== '') {
	    config.headers['token'] = token
	  }
	return config
})

// 响应拦截器
requests.interceptors.response.use(
	res => {
	// 	let data = res.data
	// 	    // 返回401表示令牌校验失败，需要重新登录
	// 	    if (data.code === 401) {
	// 	      // 异常
	// 				console.log("code:401 异常")
	// 	    } else if (data.code === 200) {
	// 	      // 响应正常，将token设置到缓存中
	// 	      let token = data.token
	// 	      if (token !== null && token !== '') {
	// 	        localStorage.setItem('token', token)
	// 	      }
	// 	    }
		    return res
	},error => {
		// 响应失败的回调函数
		console.log(error)
		return Promise.reject(new Error(error))
	}
	
)

// 对外暴露
export default requests
