import axios from 'axios'
const requests = axios.create({

	baseURL: ''
	// 代表请求超时的时间为5s
	timeout: 5000
})

// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在发请求之前做一些事情
requests.interceptors.request.use(config => {
	return config
})

// 响应拦截器
requests.interceptors.response.use(
	res => {
		return res
	},
	error => {
		// 响应失败的回调函数
		console.log(error)
		return Promise.reject(new Error(error))
	}
)

// 对外暴露
export default requests
