// 导入封装好的request
import request from "./common.js"
// return request('/user/add',registerForm,'post')  第一个参数必选（url），第二个参数可选（待传的参数）,第三个参数可选（默认get请求，可写成post）

// 用户注册
export const reqRegister = (registerForm) => {
	return request('/user/add',registerForm,'post')
}

// 用户登录
export const reqLogin = (loginForm) => {
	return request('/user/login',loginForm,'post')
}


// 查看个人信息
export const reqShowMsg = () => {
	return request('/user/myinformation')
}