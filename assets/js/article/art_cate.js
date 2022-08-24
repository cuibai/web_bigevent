/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2022-08-22 21:38:39
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2022-08-24 22:35:50
 * @FilePath: \web移动端\Node的学习\The_big_event\d01\assets\js\article\art_cate.js
 * @Description:
 *
 * Copyright (c) 2022 by cuibai 2367736060@qq.com, All Rights Reserved.
 */
$(function () {
    //获取文章的分类列表
    var form = layui.form;
    var layer = layui.layer;

    initArtCateList()

    // 拉起请求
    function initArtCateList() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                console.log('获取到后台数据 res');
                var htmlStr = template('tpl-table', res)
                //数据填充 
                console.log(res);
                $('tbody').html(htmlStr)
            }
        })
    }
    //创建索引 
    var indexAdd = null
    // 添加类别
    $('#btnAddCate').on('click', function () {
        //赋值 当前弹出层
        indexAdd = layer.open({
            // 指定类型
            type: 1,
            title: "添加文章类别",
            area: ['500px', '250px'],
            content: $("#dilog-add").html()
        })
    })

    /**使用 代理事件 给页面添加一个submit1 的事件
     * 2. 由于是 form 发起的submit 事件,代理需要给到form 
     * 3. 但是 form  是由js 进行渲染上去的,在程序的开始状态下是不存在的,不能对一个不存在的对象进行编辑
     * 4. 需要使用事件代理  绑定在固有的元素上 body 代理 form 的功能    
     */
    $('body').on('submit', '#form-add', function (e) {
        //阻止默认行为
        e.preventDefault();
        console.log('获取到主页的form 表单的数据')
        // 发起 ajax 请求,上传数据
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.close(indexadd)
                    return layer.msg('获取接口失败,请重新上传数据! ')

                }
                initArtCateList()
                layer.close(indexAdd)
                layer.msg('添加成功')
                //关闭当前弹窗, 完成当前次 操作 

            }
        })
    })

    var indexEdit = null
    /**配置 编辑和删除按钮  同样使用代理 事件  */
    $('tbody').on('click', '.btn-edit', function (e) {
        e.preventDefault()
        //弹出一个 修改文章类型的 窗口 

        //赋值 当前弹出层
        indexEdit = layer.open({
            // 指定类型
            type: 1,
            title: "修改文章类别",
            area: ['500px', '250px'],
            content: $("#dilog-edit").html()
        })
        // 协议里表示数据的编号是id, 在获取数据并惊醒渲染时 需要拿到数据所代表的id
        var Id = $(this).attr('data-id')
        //console.log(Id)
        //根据 id 获取数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                //console.log(res);
                // 设置 规则 
                form.val('form-edit', res.data)
            }
        })
    })

    /**通过 代理的方法 给表单的编辑按钮 添加事件  */
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate/',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
            //console.log(
        })
    })

    //通过代理的形式 给删除 按钮绑定事件
    $('tbody').on('click', '.btn-dalete', function (e) {
        e.preventDefault();
        var deleteId = $(this).attr('data-id'); //获取 id 的值
        layer.confirm('是否确定删除', { icon: 3, title: '警告' }, function (index) {
            //do something
            //发起请求,删除数据

            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + deleteId,
                success: function (res) {
                    if (res.status !== 0) {
                        layer.msg('删除 失败 !')
                    }
                    console.log(res)
                    layer.msg('删除成功')
                    layer.close(index);
                    initArtCateList()
                }
            })



        });
    })


});
