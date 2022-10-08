// 导入封装好的request
import request from "./common.js"
// return request('/user/add',registerForm,'post')  第一个参数必选（url），第二个参数可选（待传的参数）,第三个参数可选（默认get请求，可写成post）

// 用户注册
export const reqRegister = (registerForm) => {
	return request('/user/add', registerForm, 'post')
}

// 用户登录
export const reqLogin = (loginForm) => {
	return request('/user/login', loginForm, 'post')
}


// 查看个人信息
export const reqShowMsg = () => {
	return request('/user/myinformation')
}


// 修改个人信息
export const reqModifyMsg = (modifyData) => {
	return request('/user/update', modifyData, 'put')
}

//添加待办
export const reqAddList = (addForm) => {
	return request('/list/add', addForm, 'post')
}
//查询待办
export const reqAllList = () => {
	return request('/user/allList')
}
//修改待办
export const reqChangeList = (changeForm) => {
	return request('/list/update', changeForm, 'put')
}

//搜索计划
 export const reqSearchList = (keyWord) => {
	return request('/search',keyWord,'post')
}

//验证密码
export const reqCheckPassword = (password) => {
	return request('/user/safe', password, 'post')
}

//注销用户
export const reqDeleteUser = (password) => {
	return request('/user/delete', password, 'DELETE')

}
