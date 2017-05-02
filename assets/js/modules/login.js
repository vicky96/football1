// 定义模块
define(function(require,exports,module){
	// 加载zepto和tap
	require("zepto");
	require("tap");
	// 引入common.js
	var common = require("./common");

	// 用户名和密码检测
	var tel = $("#tel"),
		pwd = $("#pwd"),
		sp1 = $(".sp1"),
		sp2 = $(".sp2"),
		submit = $("#submit");
	$("input").on("touchstart",function(){
		if($(this).is("#tel")){
			sp1.text("请输入11位手机号").css("color","#0dc441")
		}
		if($(this).is("#pwd")){
			sp2.text("请输入6位数密码").css("color","#0dc441")
		}
	})
	$("input").on("blur",function(){
		if($(this).is("#tel")){
			sp1.text("")
		}
		if($(this).is("#pwd")){
			sp2.text("")
		}
	})
	submit.on("tap",function(){
		var params = {};
		params.tel = tel.val().trim();
		params.pwd = pwd.val();
		var t=/^1[3|5|7|8|][0-9]{9}$/,
			p=/[0-9a-zA-Z]{6,20}/;
		if(t.test($("#tel").val())&&p.test($("#pwd").val())){
			$.get("assets/api/login.json",params,function(res){
				if(res.code == 0){
					location.href = "footindex.html"
				}else{
					sp1.text("输入不正确").css("color","blue")
				}
			})
		}else{
			if(!t.test($("#tel").val())){
				sp1.text("输入不正确").css("color","red")
			}
			if(!p.test($("#pwd").val())){
				sp2.text("输入不正确").css("color","red")
			}
			
		}
		
	})
	$(".register").find("a").on("tap",function(){
		location.href = "register.html"
	})
})