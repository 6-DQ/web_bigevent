$(function () {
    // 调用getUserInfo获取用户基本信息
    getUserInfo()
    var layer = layui.layer
    // 点击退出实现退出功能 跳转回登录页面
    $('#btnLoginOut').on('click', function () {
        layer.confirm('确认退出吗？亲', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });

    })
})
// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
       

    })
}
// 设置renderAvatar()用户头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 获取用户头像
    // 判断条件
    // 如果用户没有上传图片则使用文字头像，否知反之(文字头像用ID第一个字母：大写)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}