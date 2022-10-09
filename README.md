OneList
OneList(一个清单)App端&&微信小程序端仓库
web端仓库请移步 https://github.com/awspi/OneList
项目开发团队：2022 阿里巴巴终端练习生计划小而美项目组
 
项目描述
● 一个基于 uniapp + uni-simple-router 的 " 简洁清单项目 "，帮助您合理安排一天中的任务安排。
● 一个帮你高效完成任务和规划时间的应用，是一款拥有跨设备云同步、清单管理、清晰分类的应用，你可以在Web、Android、微信小程序端使用它

预览
                   

                                         
技术细节
技术栈
● Vue2
● 微信小程序
● Hbuilder
亮点
● esLint + prettier  + commitizen 实现代码和提交规范
● 使用 uni-simple-router 模拟 vue-router
● 封装自定义tabbar组件
● 封装 request , 实现中断请求和前端缓存功能
已完成功能
● 账号注册/登录/注销
● 新建任务/修改/删除任务
● 任务优先级分类显示
● 根据时间和完成情况筛选任务
● 使用aliOSS 前端上传头像
待完成功能
● 日程页面
● 统计页面
● 回收站
● 打卡
模块说明

│  pages
 |  ├─index
│      index.vue
│
├─login
│      login.vue
│
├─my
│      my.vue
│
└─search
        search.vue
#  安装依赖 npm install 
# 运行 使用hbuilder运行在微信小程序 || 直连手机运行在手机基座中 
# 发布 使用微信小程序发布 || 使用Hbuilder打包为apk后发布在各个平台