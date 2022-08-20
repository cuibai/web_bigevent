/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2022-08-19 23:14:38
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2022-08-20 18:55:28
 * @FilePath: \web移动端\Node的学习\The_big_event\d01\assets\js\user\user_info.js
 * @Description: 
 * 
 * Copyright (c) 2022 by cuibai 2367736060@qq.com, All Rights Reserved. 
 */
$(function(){
    var form = layui.form
    var layer = layui.layer
    
    form.verify({
        /**设置 用户修改的规则 */
        /*nickname */
        nickname:function(){
            if(value.length >6){
                layui.layer.msg("用户名长度过长,请修改")
            }
        }
    })
    //调用 layui
    initUserInfo()
    
    /**初始化用户的基本信息 */
    function initUserInfo(){
        /**ajax -get */
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                /**判断 */
                if(res.status !== 0){
                    layui.layer.msg("获取用户信息失败")
                }
                console.log('获取信息成功')
                console.log(res)
                // 调用 layui 中的 form.val() 方法 快速表单进行赋值
                /**
                 * 在取值过程中,需要 设置对用的赋值区域的 name 对应 data 的元素值 
                 */
                form.val('formUserInfo',res.data)
                /**
                 * 当用户信息完成修改后,需要主动提交信息,但是 我们并不希望 在页面中看到信息提交的过程,需要使用到 隐藏域 
                 */
            }
        })
    }

    //绑定 重置 按钮功能
    $('#btnReset').on('click',function(e){
        //阻止 默认行为
        e.preventDefault();
        //重置后,需要重置用户原有的信息,就重新进行一个 请求 ,获取用户的后台数据
        initUserInfo()
        //监听表单的 提交事件,对 表单进行绑定事件
    })
    $('.layui-form').on('submit',function(e){
        console.log('监听到 提交行为')
        //阻止 默认行为
        e.preventDefault();
        //发起 ajax 请求 post
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data:$(this).serialize(),//快速 获取当前表单的全部元素
            success:function(res){
                if(res.status !==0){
                    layer.msg('修改用户信息失败')
                    return
                }
                layer.msg('信息更新成功! ')
                $('.layui-form')[0].reset()
                /**在提交完用户信息后, 需要在欢迎页面实时 更新 用户的名称,
                 * 由于更新信息的是子窗口 需要显示的是父窗口
                 * 需要调用父页面的方法,重新渲染用户的头像和用户的信息
                 * window : 当前窗口
                 * parent : 依附的 父窗口
                 * parent. getUserInfo()  父窗口的方法
                */
                window.parent. getUserInfo() 

                
            }

        })
    })
})