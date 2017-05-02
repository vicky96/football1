define(function(require,exports,module){
	require("zepto");
	require("tap");
	require("iscroll");
	var template = require("artTamplate"),
		common = require("./common");
	// 加载模板
	$.get("assets/api/myList.json",function(data){
		var html = template("myList",data);
		$(".content").html(html);
		attention()
		iScroll.refresh();
	})

	// 搜索
	var searchInput = $("#search_input"),
		searchBtn = $("#search_btn");
	searchBtn.on("tap",function(){
		// var val = searchInput.val();
		// $.get("assets/api/myList.json",{name:val},function(data){
		// 	for(var i in data.myList){
		// 		var arr = data.myList[i].name;
		// 		var str = arr.indexOf(val);
		// 		if(str==-1 || val==""){
		// 			$(".content").eq(0).html("");
		// 			$(".nothing").eq(0).show();
		// 			break;
		// 		}else{
		// 			var html = template("myList",data);
		// 			$(".content").eq(0).html(html);
		// 			$(".nothing").eq(0).hide();
		// 			console.log($(".content").eq(0).eq(0))
		// 			break;
		// 		}
		// 	}
		var val = searchInput.val().trim(),//trim()去掉空格
			arr = {"myList":[]};
		$.get("assets/api/myList.json",function(data){
			for(var i=0;i<data.myList.length;i++){
				var na = data.myList[i].name;
				var str = na.indexOf(val);
				if(str!=-1){
					arr.myList.push(data.myList[i]);
				}
			}
			var html = template("myList",arr);
			$(".content").html(html);
			iScroll.refresh();
			attention()
		})
	})

	// 点击关注
	function attention(){
		var content = $(".content"),
			atten = content.find(".atten");
		atten.on("tap",function(event){
			event.preventDefault();
			$(this).toggleClass('active');
		})
	}

	// 初始化高度
	$(".iscroll-wrap").height(window.innerHeight-($("header").height()+$(".search").height()+$('footer').height()))
	// 上下滚动
	var iScroll = new IScroll("#iscroll",{
		probeType:2
	})
	setTimeout(function(){
		iScroll.refresh();
	},10)
})