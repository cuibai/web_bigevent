/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2022-09-01 20:49:40
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2022-09-02 22:19:01
 * @FilePath: \d01\assets\js\article\art_pub.js
 * @Description: 
 * 
 * Copyright (c) 2022 by cuibai 2367736060@qq.com, All Rights Reserved. 
 */
$(function () {
    var form = layui.form
    var layer = layui.layer


    //定义加载 文章分类的 方法
    initCate()
    // 初始化富文本编辑器
    initEditor()

    function initCate() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('请求 失败')
                }
                layer.msg('请求 成功');
                console.log(res)
                // TODO: 调用模板引擎 渲染下拉菜单
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                //渲染完毕  调用form.render 方法 重新渲染
                form.render()


            }
        })
    }
    //配置图片的上传和 裁剪方法
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 为选择封面的按钮，绑定点击事件处理函数
    $('#btnChooseImage').on('click', function () {
        //使用按钮 模拟点击事件
        $('#coverFile').click()
    })

    // 监听 coverFile 的 change 事件，获取用户选择的文件列表
    $('#coverFile').on('change', function (e) {
        // 获取到文件的列表数组
        var files = e.target.files
        // 判断用户是否选择了文件
        if (files.length === 0) {
            return
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    //默认 编辑完的状态为 发布
    var art_status = '已发布'
    //给存为草稿 添加状态
    $('#btnSave2').on('click', function () {
        console.log('触发存为草稿')
        art_status = '草稿'
    })

    //给最外层 表单注册 提交事件
    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        // TODO: 基于表单 创建 formdata 对象  存入所有的数据
        var fd = new FormData($(this)[0]);

        //因为fd 的数据里只有 3个键值  没有 状态  需要额外添加一个数据上去
        fd.append('state', art_status)
        // // TODO: 遍历数组 获取键值对
        // fd.forEach(function (v, k) {
        //     // k: 键  v : 值 
        //     console.log(k, v);
        // })

        //把 封面 裁剪的图片 先输出为一个数据  在上传到云端
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                // 5 个参数全部配置好 ,发起请求 上传数据
                puslishArticle(fd)
            })
    })

    //定义一个发布文章的 方法
    function puslishArticle(fd) {
        console.log('收集完所有数据 发起请求')
        $.ajax({
            method: "POST",
            url: "/my/article/add",
            data: fd,
            //向 服务器提交的是 formdata 的数据 必须添加两个数据项
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    console.log(res)
                    return layer.msg("发布文章失败")
                }
                layer.msg("发布文章成功 !")
                // TODO: 发布成功  自动跳转到 文章的列表页面 
                location.href = '/article/art_list.html'
            }
        })
    }
})



