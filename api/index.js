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