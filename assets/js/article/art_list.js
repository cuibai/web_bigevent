/*
 * @Author: cuibai 2367736060@qq.com
 * @Date: 2022-08-24 22:40:03
 * @LastEditors: cuibai 2367736060@qq.com
 * @LastEditTime: 2022-09-01 20:47:45
 * @FilePath: \d01\assets\js\article\art_list.js
 * @Description: 
 * 
 * Copyright (c) 2022 by cuibai 2367736060@qq.com, All Rights Reserved. 
 */
$(function () {

    var form = layui.form
    var layer = layui.layer
    var laypage = layui.laypage

    // 定义一个 美化时间的过滤器
    template.defaults.imports.dateFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = dt.getMonth() + 1
        var d = dt.getDate()

        var hh = dt.getHours()
        var mm = dt.getMinutes()
        var ss = dt.getSeconds()

        var h = hh < 10 ? '0' + hh : hh
        var m = mm < 10 ? '0' + mm : mm
        var s = ss < 10 ? '0' + ss : ss

        return y + '-' + m + '-' + d + '-' + hh + ':' + mm + ':' + ss


    }


    /**定义一个请求对象 请求对象时会把对象发送到服务器 */
    var q = {
        pagenum: 1, // 页码值
        pagesize: 2, //每一条显示多少数据
        cate_id: '', // 文章分类的 id
        state: '', //文章的状态 可选值L:已经发布  在编辑

    }
    initTable()
    initCate()

    // 获取文章 列表数据
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {

                    return layer.msg('访问接口失败 ! ')
                }
                console.log(res)
                //使用 模板 引擎渲染数据
                layer.msg('访问接口成功 ! ')
                // 使用 template
                //TOOD: 使用在后面 先禁用掉 
                var htmlStr = template('#tpl-table', res)
                $('tbody').html(htmlStr)

                //页面被渲染完 在渲染页码 根据数量进行渲染
                renderPage(res.total)
            }
        })
    }


    // 初始化 文章分类的 状态
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('数据 获取失败')
                }
                //console.log(res)
                // 调用模板引擎console.log(res)
                var htmlStr = template('#tpl-cate', res)
                console.log(htmlStr)
                $('[name = cate_id]').html(htmlStr)
                form.render()

            }

        })
    }

    //为筛选表单绑定 事件的提交按钮
    $('#form=search').on('submit', function (e) {
        //阻止 默认行为
        e.preventDefault()
        //获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        //返回值  为查询参数  Q 中 对应参数的属性赋值
        q.cate_id = cate_id
        q.state = state
        //再次 调用 初始化函数
        initTable()
    })


    //定义 渲染分页的 方法
    function renderPage(total) {
        //console.log(total);
        //调用 layui 方法 
        layui.use('laypage', function () {
            var laypage = layui.laypage;

            //执行一个laypage实例
            laypage.render({
                elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
                count: total, //数据总数，从服务端得到\
                limit: q.pagesize,  // 每一页显示 几个数据
                curr: q.pagenum,  // 设置 默认被选中的分页
                //新增配件
                layout: ['page', 'next', 'prev'],
                //重新定义每一页所要展示的值  
                limits: [2, 3, 5, 10, 20,],
                //分页 发生切换函数
                jump: function (obj, first) {
                    //obj包含了当前分页的所有参数，比如：
                    // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    //页码值 反向赋值 给 q 的数组中
                    q.pagenum = obj.curr
                    //console.log(obj.limit); //得到每页显示的条数
                    /**触发 jump 回调的方法
                     * 1. 点击页码的时候  
                     * 2. 调用 laypage.render() 方法 就会被触发会陷入循环
                     */

                    //当页面的 的条目数 分类发生改变后,把新的数据返回到 q 中
                    q.pagesize = obj.limit
                    //为了防止自循环  使用 first 判断 first true: 方式2 触发   false L方式1 触发 
                    if (!first) {
                        initTable()
                    }
                }

            });
        });

    }


    //通过代理的形式 给删除按钮 绑定代理事件
    $('tbody').on('click', '.btn-delete', function () {
        console.log('delete clicked ')
        //获取当前页面 删除 按钮的长度
        var lrn = $('.btn-delete').length
        //接收数据  Id
        var id = $(this).attr('data-id');
        //删除 按钮被点击 开启询问弹窗
        //设置询问事件
        layer.confirm('确认删除 ?', { icon: 3, title: '提示' }, function (index) {
            // TODO: 删除的动作
            $.ajax({
                type: 'GET',
                url: '/my/article/delete' + id,
                success: function (res) {
                    if (res !== 0) {
                        layer.msg('删除失败');

                    }
                    layer.msg('删除 成功 ')
                    //重新加载数据
                    //initTable()
                    /***bug
                     * 删除某一页全部的数据后,页码值会减少,
                     * 但是页码的内容却不会更新  ,
                     * 解决需要加一个数据的判断 判断当前页码值是否还存在数据
                     *  把当前页面的 删除按钮的个数作为判断条件  删除完毕 就没有数据,删除按钮也没有  
                     */
                    if (len === 1) {
                        // TODO:    len 的值为1  当前页面没有数据
                        //页码值 最小值为一,不能存在小于1 的情况
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1

                    }
                    initTable()


                }
            })

            layer.close(index);
        });

    })
})