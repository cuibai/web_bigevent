/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2022-08-21 14:03:51
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2022-08-21 15:10:47
 * @FilePath: \web移动端\Node的学习\The_big_event\d01\assets\js\user\user_avatar.js
 * @Description: 
 * 
 * Copyright (c) 2022 by cuibai 2367736060@qq.com, All Rights Reserved. 
 */
/**更改 头像的 配置  */
$(function(){


    var form = layui.form
    var layer = layui.layer


    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    //
    $('#btnChooseImage').on('click', function(e){
        // 上传 按钮的 点击事件
        $('#file').click()
    })
    /**把选择的文件 进行更换 */
    $('#file').on('change', function(e){
        //获取用户选择的文件
        var filelist = e.target.files
        if(filelist.length === 0){
            return layer.msg('未选择照片 ')

        }
        /**操作 已经选择到的文件
         * 1. 拿到已选择的文件
         * 2. 将文件转换为 路径
         * 3.重新初始化 裁剪区
         */
        //01
        var file = e.target.files[0];
        //02
        var newImgURL = URL.createObjectURL(file)
        //03
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 设置 确定 按钮的 上传功能
    $('#btnUpload').on('click', function(){
        // 拿到 裁剪 后的 头像
        var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 链接接口 上传
        $.ajax({
            method:"post",
            url:'/my/update/avatar',
            data:{
                avatar: dataURL,
            },
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更改失败 ! ')
                }
                layer.msg('更新成功')
                window.parent. getUserInfo()  // 在子窗口 调用 父窗口的 函数  更新
            }
        })
    })
})