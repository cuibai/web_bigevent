/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2022-08-20 18:07:54
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2022-08-20 18:56:11
 * @FilePath: \web移动端\Node的学习\The_big_event\d01\assets\js\user\user_pwd.js
 * @Description: 
 * 
 * Copyright (c) 2022 by cuibai 2367736060@qq.com, All Rights Reserved. 
 */
// 自定义密码的 校验规则
$(function(){
    var form = layui.form
    var layer= layui.layer


    // 创建 规则 密码的正则
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'] ,
        // 新密码 不能和之前的密码 相同
        samePwd:function(value){
            //获取 value ,比较 value
            if(value === $('[name=oldPwd]').val()){
                console.log('null')
                return '新旧密码重复, 请重新输入 '
                
            }
        },
        //校验 新密码 和确认密码的 一致性
        rePwd:function(value){
            //获取 value ,比较 value
            if(value !== $('[name=newPwd]').val()){
                console.log('null')
                return '密码不一致, 请重新输入 '
            }

        }
    })

    //绑定 提交事件 修改后端密码
    $('.layui-form').on('submit', function(e){
        // 阻止事件
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    layer.msg('Error: 更新失败' )
                }
                layer.msg('Success: 更新成功' )
                //重置表单,清空数据
                $('.layui-form')[0].reset()
                //当密码更新成功后 应该直接退出到初始的登录页面进行 重新登录

            }
        })
    })
})