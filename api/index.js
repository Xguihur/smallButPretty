import requests from "./request.js"

// post请求
export const reqExamplePost = () => {
  return requests({
    url: '',
    method: 'post'
  })
}

// get请求
export const reqExampleGet = () => {
  return requests({
    url: '',
    method: 'get'
  })
}

// 用户注册
export const reqRegister = (registerForm) => {
  return requests({
    url: '/user/add',
    method: 'post',
		data:registerForm
  })
}

// 用户登录
export const reqLogin = (loginForm) => {
  return requests({
    url: '/user/login',
    method: 'post',
		data:loginForm
  })
}


// 查看个人信息
export const reqShowMsg = () => {
  return requests({
    url: '/user/myinformation',
    method: 'get'
  })
}
//查看全部列表
export const reqAllList= (token) => {
  return requests({
    url: '/user/daylist',
    method: 'get',
	headers:{
		token
	}
  })
}
//新增任务
export const reqAddList= (token,addForm) => {
  return requests({
    url: '/list/add',
    method: 'post',
	data:addForm,
	headers:{
		token
	}
  })
}