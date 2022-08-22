/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2022-08-22 21:38:39
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2022-08-22 23:19:26
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
                console.log(res);
                var htmlStr = template('tpl-table', res)
                //数据填充 
                console.log(htmlStr);
                $('tbody').html(htmlStr)
            }
        })
    }

    // 添加类别
    $('#btn-add-get').on('click', function () {
        layer.open({
            // 指定类型
            type: 1,
            title: "添加文章类别",
            area: ['500px', '250px'],
            content: $("#dilog-add").html()
        })
    })


});
