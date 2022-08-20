/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2022-08-19 23:14:38
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2022-08-19 23:28:54
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
                console.log(res)
            }
        })
    }
})