const baseUrl = "http://8.130.38.74:6661";


// url自己传入，第二个参数是需要传给服务器的对象数据，第三个参数是请求类型，默认get，第四个参数为header请求头
const request = (url = '', date = {}, type = 'GET', ) => {
    return new Promise((resolve, reject) => {
			let header = {}
			header.token = uni.getStorageSync('token')
			// console.log(header)
        uni.request({
            method: type,
            url: baseUrl + url,
            data: date,
            header: header,
            dataType: 'json',         
        }).then((response) => {
            let [error, res] = response;        
            resolve(res);
        }).catch(error => {
            let [err, res] = error;
            reject(err)
        })
    });
}
export default request
