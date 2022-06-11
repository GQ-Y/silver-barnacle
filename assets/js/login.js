$(function(){
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })
    // 从layui中获取form对象
    var form = layui.form;
    form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                return '用户名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
                return '用户名首尾不能出现下划线\'_\'';
            }
            if(/^\d+\d+\d$/.test(value)){
                return '用户名不能全为数字';
            }
        }
        ,password: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ]
        ,repassword: function(value){
            if(value !== $('#pwd').val()){
                return '两次密码输入不一致';
            }
        }
    });
    //监听注册表单提交事件
    $('#form-reg').on('submit',function(e){
        e.preventDefault();
        $.post('/api/reguser',{username: $('#form-reg [name=username]').val(),password: $('#form-reg [name=password]').val()},
            function(res){
                if(res.status != 0){
                    layer.msg(res.message)
                }
                layer.msg('注册成功，请登录',{icon:1,time:2000},function(){
                    $('.login-box').show();
                    $('.reg-box').hide();
                }
                );
            }
        )
    })

    //监听登陆表单提交事件
    $('#form-login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
          url: '/api/login',
          method: 'POST',
          // 快速获取表单中的数据
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('登录失败！')
            }
            layer.msg('登录成功！')
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem('token', res.token)
            // // 跳转到后台主页
            location.href = '/index.html'
          }
        })
      })

})