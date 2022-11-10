$(function () {
    form.verify({
        nickname: function (value) {
            if (value.length > 10) {
                return '昵称长度必须在1-10个字符之间'
            }
        }

    })
})
// 获取所需要的layui属性对象
var form = layui.form
var layer = layui.layer

// 调用用户信息
initUserInfo()

// 初始化用户信息
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            // 调用form.val()快速为表单赋值
            form.val('formUserInfo', res.data)
        }
    })
}


// 提交修改表单数据(监听事件)
$('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('更新用户信息失败')
            }
            layer.msg('更新用户信息成功')
            window.parent.getUserInfo()
        }
    })
})

// 重置表单数据
$('#btnReset').on('click', function (e) {
    // 阻止表单默认的重置行为
    e.preventDefault()
    // 重新调用用户信息
    initUserInfo()
})