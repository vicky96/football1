define(function(require,exports,module){
	var footUl = $(".foot-ul"),
		aFootLi = $("li",footUl);
	aFootLi.on("tap",function(){
		$(this).addClass('active').siblings().removeClass('active');
		if($(this).attr("id")=="exit"){
			console.log(11)
			location.href="login.html"
		}else{
			location.href=$(this).attr("id")+".html"
		}
		
	})
})