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


})