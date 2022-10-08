
import OssUpload from 'wx-oss-upload' // 上传插件
import { getSts } from '../api/index.js'
//STS上传数据
 const REGION = 'oss-cn-hangzhou'
 const BUCKET = 'p-onelist'



export async function uploadFile(data) {
 let res = await getSts()
 res = JSON.parse(res.data.data)
 console.log(res)
	const {
		accessKeyId,
		accessKeySecret,
		securityToken,
		expiration
	} = res.credentials;
	const ossUpload = new OssUpload({
		accessKeyId,
		accessKeySecret,
		expirationTime: expiration 
	})
 
	return await ossUpload.uploadFile({
		host: data.host,
		folder: data.folder,
		filePath: data.filePath,
		fileName: data.fileName,
		securityToken
	})
}