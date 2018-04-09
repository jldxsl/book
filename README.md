## 项目 用到less
```
npm install less less-loader axios vuex bootstrap 
```
- mock 模拟数据
- api 代表的是所有接口
- base 基础组件
- components 页面组件

## 热门图书的功能
- 先写服务端 确保数据能正常返回
- 增加api的方法，实现调取数据的功能
- 在哪个组件中应用这个api，如果是一个基础组件需要用这些数据，在使用这个组件的父级中调用，将数据传递给基础组件
- 写一个基础组件 
    - 1.创建一个.vue文件
    - 2.在需要使用这个组件的父级中引用这个组件
    - 3.在组件中注册
    - 4.以标签的形式引入
## 路由元信息

## 下拉加载   自己模拟/page
 - 默认每次给5条 ，前端告诉后台现在从第几条给我
 - /page?offset=5
 - 后台返回还要告诉前端是否还有更多数据  hasMore:false/true
 
 ## coding split 代码分割