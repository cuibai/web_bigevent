/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2022-08-16 21:03:57
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2022-08-17 21:45:53
 * @FilePath: \web移动端\Node的学习\The_big_event\d01\assets\js\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by cuibai 2367736060@qq.com, All Rights Reserved. 
 */

$(function(){
    getUserInfo()
    var layer = layui.layer

    //设置 退出按键的点击事件
    $('#btnLoginout').on('click', function(){
    
        // 配置退出提示框
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //清空本地存储的 token
            localStorage.removeItem('token')
            //重新跳转到登录页
            location.href = './login.html'
            //关闭提示框
            layer.close(index);
        });
    })

})




/**获取用户信息 */
function getUserInfo(){
    $.ajax({
        /*ajax 请求 会调用 baseAPI的 文件 */
        url:'/my/userinfo',
        method:'GET',
        /**请求头的 配置对象 */
        // headers:{
        //     /**从本地存储中获取 token的 值 */
        //     Authorization: locationStorage.getItem('token')||''
        // },
        success:function(res){
            console.log(res)
            // 验证判断
            if(res.status !== 0 ){
                layui.layer.msg('获取信息失败!!')

            }
            //渲染 头像  使用 renderAvatar ()  函数
            renderAvatar(res.data)
        },
        /*优化设计  在用户没有取得权限(token)的情况下 禁止从login 界面跳转到 index 界面,使用 jqurey 的complete 函数 即在函数的请求 不管是否成功 都会返回的回调函数*/
        complete: function(res) {
            console.log('执行了 complete 回调：')
            console.log(res)
            // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '/login.html'
        }
        }        

    })

}

// 渲染 头像 
function renderAvatar(user){
    //由于 在配置用户名的信息时 会返回两个参数 : 昵称 用户名  在显示使用时,这两个需要有优先级 
    var name = user.nickname || user.username 
    //获取元素设置欢迎的文本
    $('#welcome').html('欢迎&nbsp; &nbsp;'+ name+'&nbsp;')  
    // 按需渲染 用户的头像  有自定义头像 user_pic 不是none ,没有使用文本头像渲染 
    //先 检测是否 有指定类
    if(user.user_pic !== null){
        //显示 自定义的  隐藏 默认的
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('text-avatar').hide()
    }else{
        //默认
        $('.layui-nav-img').hide()
        // 文本内容使用 用户的第一个字符
        var first = name[0].toUpperCase() // 转大写
        $('text-avatar').html(first).show()
    }
}