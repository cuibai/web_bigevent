/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2022-08-15 20:50:28
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2022-08-15 20:52:35
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
$.ajaxPrefilter(function(options){
    console.log(options.url)
})