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
})