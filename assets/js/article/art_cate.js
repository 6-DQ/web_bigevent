$(function () {
    // 调用layer
    var layer = layui.layer
    var form = layui.form
    // 调用文章列表管理
    initArtCateList()

    //   获取文章分类列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 设置索引号indexAdd 以便于关闭弹出层
    var indexAdd = null
    // 为添加按钮添加点击事件
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            title: '添加文章分类' // 弹出层标题
            , content: $('#dialog-add').html(), // 弹出层内容
            type: 1, // 1代表页面层 无确认框效果
            area: ['500px', '250px'] // 给弹出层设置宽高
        });
    })

    // 通过代理的形式为form-add表单绑定submit事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                initArtCateList()
                layer.msg('新增分类成功')
                layer.close(indexAdd) //根据索引关闭弹出层
            }
        })
    })

    // 设置索引号indexEdit
    var indexEdit = null
    // 通过代理的形式为btn-edit表单绑定事件
    $('tbody').on('click', '#btn-edit', function (e) {
        indexEdit = layer.open({
            title: '修改文章分类' // 弹出层标题
            , content: $('#dialog-edit').html(), // 弹出层内容
            type: 1, // 1代表页面层 无确认框效果
            area: ['500px', '250px'] // 给弹出层设置宽高
        });
        var id = $(this).attr('data-id')
        // 发起请求获取对应的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // 快速获取该区域的值
                form.val('form-edit', res.data)
            }
        })
    })

    // 通过代理的形式为form-edit表单绑定事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改分类失败')
                }
                layer.msg('修改分类成功')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    // 通过代理的形式为btn-delete表单绑定点击事件
    $('tbody').on('click', '#btn-delete', function (e) {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除吗？亲', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    layer.close(index);
                    initArtCateList()
                }
            })
        });
    })
})
