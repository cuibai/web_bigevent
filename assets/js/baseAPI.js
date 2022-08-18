/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2022-08-15 20:54:18
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2022-08-18 19:37:27
 * @FilePath: \web移动端\Node的学习\The_big_event\d01\assets\js\baseAPI.js
 * @Description: 
 * 
 * Copyright (c) 2022 by cuibai 2367736060@qq.com, All Rights Reserved. 
 */
// 调用 其他方法
/**
 * 每次调用 get post ajax 之前 会先调用 下面的函数
 * 会拿到给ajax 配置的对象
 * 是链接地址的 自动补全
 * 
*/
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url

    //统一给 有权限的接口 配置 headers 请求头
    // 判断 所访问的 地址是否需要权限 (判断指定字符)
    if(options.url.indexOf('/my') !== -1){
        options.headers = {
        Authorization: localStorage.getItem('token') || ''
    }
    }
    //全局统一挂载 complete 方法
    options.complete = function(res){
        console.log('执行了 complete 回调：')
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = './login.html'
        }
    }
    


})

