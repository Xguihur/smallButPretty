import {
	reqModifyMsg
} from '../../../api/index.js'
import {
	uploadFile
} from '../../../utils/sts.js'
export const reqChangeImg = (username) => {
	uni.chooseImage({
		count: 1, //默认9
		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album'], //从相册选择
		success: async function(file) {
			let imgUrl = ''
			const fileTypeArr = file.tempFiles[0].path.split('/')
			const fileType = fileTypeArr[fileTypeArr.length - 1].split('.')[1]
			console.log(file.tempFiles[0])
			console.log(fileType)
			const res = await uploadFile({
				host: 'https://p-onelist.oss-cn-hangzhou.aliyuncs.com/', // 阿里云地址
				folder: `avatar/${username}${Date.now()}.${fileType}`, // 阿里云存放文件夹
				filePath: file.tempFilePaths[0]
			})
			console.log('oss返回连接：', res.url)
			reqModifyMsg({
				img: res.url
			}) //修改 api
			uni.setStorageSync('img', res.url)

			uni.showToast({
				title: '头像更新成功',
				icon: 'success'
			})
			imgUrl = res.url
			// console.log(imgUrl);
			return imgUrl
		}
	})
}
