define(function(require,exports,module){
	require("zepto");
	require("tap");
	var common = require("./common");
	var tel = $("#tel"),
		pwd = $("#pwd"),
		userName = $("#username"),
		submit = $("#submit"),
		sp1 = $(".sp1"),
		sp2 = $(".sp2"),
		sp3 = $(".sp3");
	// 获得焦点
	$("input").on("touchstart",function(){
		if($(this).is("#tel")){
			sp1.text("请输入11位手机号").css("color","#0dc441")
		}
		if($(this).is("#pwd")){
			sp2.text("请输入6位数密码").css("color","#0dc441")
		}
		if($(this).is("#username")){
			sp3.text("请输入至少两个字符").css("color","#0dc441")
		}
	})
	// 失去焦点
	$("input").on("blur",function(){
		// 手机号
		if($(this).is("#tel")){            
			var t=/^1[3|5|7|8|][0-9]{9}$/;
			if($("#tel").val()!=""){
				if(!(t.test($("#tel").val()))){
					$(".sp1").text("请输入正确手机号").css("color","red");
					return false;
				}else if(t){
					$(".sp1").text("");
					return true;
				}
			}else{
				$(".sp1").text("不能为空").css("color","red");
			}
		}
		// 密码
		if($(this).is("#pwd")){  
			var p=/[0-9a-zA-Z]{6,20}/;
			if($("#pwd").val()!=""){
				if(!(p.test($("#pwd").val()))){
					$(".sp2").text("至少6位数字或字母").css("color","red");
					return false;
				}else if(p){
					$(".sp2").text("");
					return true;
				}
			}else{
				$(".sp2").text("不能为空").css("color","red");
			}
		}
		if($(this).is("#username")){
			// var u=/[\\u4E00-\\u9FA5\\uF900-\\uFA2D\\w]{2,10}$/;
			var u=/^[\u4e00-\u9fa5a-zA-Z0-9_]{2,10}$/;
			if($("#username").val()!=""){
				if(!(u.test($("#username").val()))){
					$(".sp3").text("最少2个字符").css("color","red");
					return false;
				}else if(u){
					$(".sp3").text("");
					return true;
				}
			}else{
				$(".sp3").text("不能为空").css("color","red");
			}
			
		}
	})

	submit.on("tap",function(){
		// var params = {};
		// params.tel = tel.val();
		// params.pwd = pwd.val();
		// params.userName = userName.val();
		// if(!common.checkTel(params.tel)){
		// 	alert("号码输入错误");
		// 	return
		// }

		// $.get("assets/api/login.json",params,function(res){
		// 	if(res.code == 0){
		// 		location.href = "login.html"
		// 	}    
		// })
		var t=/^1[3|5|7|8|][0-9]{9}$/,
			p=/[0-9a-zA-Z]{6,20}/,
			u=/^[\u4e00-\u9fa5a-zA-Z0-9_]{2,10}$/;
		if(t.test($("#tel").val())&&p.test($("#pwd").val())&&u.test($("#username").val())){
			$.get("assets/api/login.json",{tel:tel.val(),pwd:pwd.val(),username:userName.val()},function(res){
				location.href = "login.html"
			})	
		}else{
			return false
		}
		
	})
})