define(function(require,exports,module){
	require("zepto");
	require("tap");
	require("iscroll");
	require("swiper");
	var template = require("artTamplate"),
		common = require("./common");
	$.get("assets/api/mineLi.json",function(data){
		var html = template("mineLi",data);
		$(".photoes").html(html)
		var length = $(".photoes").find("img").length;
		$(".sum").html(length);
	})
	var swiper = new Swiper(".swiper-container",{
		// 分页
		pagination:'.swiper-pagination',
		paginationClickable:true,
		bulletClass : 'div',
		bulletActiveClass : 'active',
		paginationBulletRender:function(index,className){
			var arr = ["照片","关注","粉丝"];
			return '<li class="' + className + '">' + arr[index] +'(<span class="sum"></span>)'+ '</li>';
		}
	})

	// 初始化高度
	$(".iscroll-wrap").height(window.innerHeight-($("header").height()+$(".title").height()+$(".select").height()+$('footer').height()))
	// 上下滑动
		var flag = null,
			maxScroll = 0,
			num = 0,
			upTag = $("#upTag");
		var iScroll = new IScroll("#is0",{
			probeType:2
		})
		iScroll.on('scroll', function(){
		 	if(this.directionY && !flag && this.y <this.maxScrollY-40){
		 		flag = "up";
		 		upTag.html("释放加载");
		 		this.maxScrollY = this.maxScrollY-40;
		 	}else if(this.directionY==-1&&flag=="up"&&this.y>this.maxScrollY-40){
		 		flag="";
		 		upTag.html("上拉");
		 		this.maxScrollY = this.maxScrollY+40;
		 	}
		})
		iScroll.on("scrollEnd",function(){
			if(flag=="up"){
				upTag.html("加载中");
				var _this = this;
				$.get("assets/api/mineLi.json",function(data){
					var html = template("mineLi",data);
					$(".photoes").append(html);
					upTag.html("上拉");
					flag="";
					_this.refresh();
				})
			}
		})
		setTimeout(function(){
			iScroll.refresh();
		},100)
})