$(function () {
  // 点击账号账号
  $('#link_reg').on('click', function () {
    $('.reg_box').show()
    $('.login_box').hide()
  })
  // 点击去登录
  $('#link_login').on('click', function () {
    $('.reg_box').hide()
    $('.login_box').show()
  })
  // 设置获取layui对象的form 和layer属性
  var form = layui.form // 表单
  var layer = layui.layer // 提示框
  form.verify({
    // 自定义pwd表单验证，密码需输入6-12位字符才能提交
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      let pwd = $('#pwd').val()
      if (pwd !== value) {
        return '前后密码输入不一致，请重新输入'
      }
    }
  })
  // 监听注册表单事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: "POST",
      url: "/api/reguser",
      data: $(this).serialize(),// 快速获取表单数据
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('注册成功');
        $('#link_login').click()
      }
    })
  })
  // 监听提交事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize()
    }),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败')
        }
        layer.msg('登录成功')
        location.href = 'index.html'
      }
  })

})
