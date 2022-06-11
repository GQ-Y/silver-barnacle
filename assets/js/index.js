$(function(){
    getUserInfo();

    $('#tuichu').on('click',function(){
        layer.confirm('您确定要退出吗？', {
            icon: 3, 
            title:'提示'
        }, 
        function(index){
            //删除token
            localStorage.removeItem('token');
            //跳转到登录页面
            location.href = '/login.html';
            layer.close(index);
        });
    })

})


//获取用户的基本信息
function getUserInfo(){
    $.ajax({
        url:'/my/userinfo',
        method:'GET',
        success:function(res){
            if(res.status === 0){
                renderAvatar(res.data);   
            }else{
                layui.use('layer',function(){
                    var layer = layui.layer;
                    layer.msg(res.msg);
                })
            }
        }
    })
}

//渲染用户头像昵称
function renderAvatar(user){
    var name = user.nickname || user.username;
    $('wellcome-user').html('欢迎&nbsp&nbsp' + name);
    if(user.user_pic != null){
        $('.layui-nav-img').attr('src',user.user_pic);
        $('.text-avatar').hide();
    }else{
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first);
    }
}

//更新用户信息 

function updateUserInfo(id,nickname,email){
    // 请求
    $.ajax({
        url:'/my/userinfo',
        method:'POST',
        data:{
            id:id,
            nickname:nickname,
            email:email
        },
        success:function(res){
            if(res.status === 0){
                layui.use('layer',function(){
                    var layer = layui.layer;
                    layer.msg('修改成功');
                })
            }else{
                layui.use('layer',function(){
                    var layer = layui.layer;
                    layer.msg(res.msg);
                })
            }
        }
    })
}