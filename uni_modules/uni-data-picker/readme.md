## DataPicker 级联选择

> **组件名：uni-data-picker**
> 代码块： `uDataPicker`
> 关联组件：`uni-data-pickerview`、`uni-load-more`。

`<uni-data-picker>` 是一个选择类[datacom 组件](https://uniapp.dcloud.net.cn/component/datacom)。

支持单列、和多列级联选择。列数没有限制，如果屏幕显示不全，顶部 tab 区域会左右滚动。

候选数据支持一次性加载完毕，也支持懒加载，比如示例图中，选择了“北京”后，动态加载北京的区县数据。

`<uni-data-picker>` 组件尤其适用于地址选择、分类选择等选择类。

`<uni-data-picker>` 支持本地数据、云端静态数据(json)，uniCloud 云数据库数据。

`<uni-data-picker>` 可以通过 JQL 直连 uniCloud 云数据库，配套[DB Schema](https://uniapp.dcloud.net.cn/uniCloud/schema)，可在 schema2code 中自动生成前端页面，还支持服务器端校验。

在 uniCloud 数据表中新建表“uni-id-address”和“opendb-city-china”，这 2 个表的 schema 自带 foreignKey 关联。在“uni-id-address”表的表结构页面使用 schema2code 生成前端页面，会自动生成地址管理的维护页面，自动从“opendb-city-china”表包含的中国所有省市区信息里选择地址。

### [查看文档](https://uniapp.dcloud.io/component/uniui/uni-data-picker)

#### 如使用过程中有任何问题，或者您对 uni-ui 有一些好的建议，欢迎加入 uni-ui 交流群：871950839
