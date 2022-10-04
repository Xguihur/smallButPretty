// import Vue from 'vue'

// import Router, {
// 	RouterMount
// } from 'uni-simple-router'
// import pages from '../pages.js'

// Vue.use(Router)

// const myRouter =
// 	pages().pages.map(item => ({
// 		path: `/${item.path}`,
// 		meta: item.meta || {}
// 	}))
// //初始化
// const router = new Router({
// 	routes: myRouter
// });

// // 全局路由前置守卫
// router.beforeEach((to, from, next) => {
// // 判断是否存在token，但是为进行验证是否过期
//   if (uni.getStorageSync('token') !== null && uni.getStorageSync('token') !== ''&&uni.getStorageSync('token')!== undefined) {
//     next()
//   } else {
//     if (to.path === '/pages/login/login') {
//       next()
//     } else {
// 			uni.showToast({
// 				icon:'error',
// 				title:'请先进行登录！'
// 			})
// 			setTimeout(()=>{
// 				next({ path: '/pages/login/login' })
// 			},1500)
//     }
//   }
// })
// export default router;