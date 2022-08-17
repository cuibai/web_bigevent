/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2022-08-11 21:22:06
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2022-08-17 20:50:10
 * @FilePath: \web移动端\Node的学习\The_big_event\d01\assets\js\login.js
 * @Description: 
 * 
 * Copyright (c) 2022 by cuibai 2367736060@qq.com, All Rights Reserved. 
 */
//放置入口函数
$(function() {
    //点击 注册 链接
    $('#link_reg').on('click', function(){
        console.log('link_reg click');
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击登录 链接
    $('#link_login').on('click', function(){
        $('.login-box').show();
        $('.reg-box').hide();

    })

    // 创建自己的规则
    //从 layui 中获取form 对象  自定义修改
    var form = layui.form
    var layer  = layui.layer
    //自定义规则,通过form.verify() 函数来修改
    form.verify({
        //规则统一存放
        //定义密码 正则表达  错误提示  
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
        //新增规则  校验两次 密码输入一致
        repwd:function(value){
            // 确认 形参拿到密码框内的 内容 
            //难道 密码框的值
            //进行比较判断
            //判断失败 进行 提
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value){
                alert('两次密码不一致!')
            }
        }
    })


    //监听注册表单 
    $('#form_reg').on('submit',function(e){
        //组织默认行为
        e.preventDefault();
        // 发起 ajax 请求 post
        $.post(
            '/api/reguser',
            {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},
            function(res){
                if(res.status !== 0){
                    layer.msg(res.message); 
                }
                layer.msg('注册成功 即将转到登录'); 
                console.log(res)
                // 添加自动跳转 功能
                $('#link_login').click()
            }
        )
    })
    // 监听 登录 表单的提交事件
    $('#form_login').submit(function(e){
        //阻止 默认行为
        e.preventDefault()
        // 发起 ajax 请求 post
        $.ajax({
            url:'/api/login',
            method:"post",
            // 一次性获取表单的全部元素
            data:$(this).serialize(),
            success:function(res){
                if(res.status!== 0){
                    layer.msg(res.message); 
                }
                layer.msg('注册成功 即将跳转')
                console.log(res)
                // 保存 返回的 token值 在locationStorage 中
                localStorage.setItem('token',res.token)
                location.href = './index.html'
            }

            
        })
    })

})