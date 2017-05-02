define(function(require,exports,module){	
	require("zepto");
	require("tap");
	require("iscroll");
	require("swiper");
	var template = require("artTamplate"),
		common = require("./common");
	var iScroll = [],
		maxScroll = [];

	// 点击热点、关注
	var headLeft = $(".head-left"),
		headRight = $(".head-right"),
		nav = $("nav"),
		onesec = $(".onesec"),
		twosec = $(".twosec");
	// 热点
	headLeft.on("tap",function(){
		headLeft.addClass('active');
		headRight.removeClass('active');
		onesec.css("display","block");
		nav.css("display","block");
		twosec.css("display","none")
	})
	// 关注
	headRight.on("tap",function(){
		headRight.addClass('active');
		headLeft.removeClass('active');
		twosec.css("display","block");
		onesec.css("display","none");
		nav.css("display","none");
		// 获取模板
		List(3);
	})

	
	// 左右滑动
	var swiper = new Swiper(".swiper-container",{
		onInit:function(){
			List(0)
		},
		onSlideChangeEnd:function(swipe){
			List(swipe.activeIndex)
		},
		// 分页
		pagination:'.swiper-pagination',
		paginationClickable:true,
		bulletClass : 'div',
		bulletActiveClass : 'active',
		paginationBulletRender:function(index,className){
			var arr = ["足球现场","足球生活","足球美女"];
			return '<li class="' + className + '">' + arr[index] + '</li>';
		}
	})

	// 加载模板
	function List(page){
		//先判断之前有没有创建iScroll，因为只有第一次需要加载新的模板，如果有就不需要重新加载了
		// iScroll需要加上page，因为每一页的停的位置都不要
		if(!iScroll[page]){
			$.get("assets/api/list"+page+".json",{pages:page},function(data){
				var html = template("list"+page,data);
				$("#page"+page).html(html);
				iScroll[page] = createIscroll(page);
			})
		}
	}

	
	// 热点初始化高度
	$(".iscroll-wrap").height(window.innerHeight-($("header").height()+$('footer').height()));
	// 关注初始化高度
	$(".iscroll-wrap-two").height(window.innerHeight-($("header").height()+$('footer').height()));
	// 上下滑动
	function createIscroll(scrollPage){
		var flag = null,
			maxScroll = 0,
			num = 0,
			upTag = $("#upTag_"+scrollPage);
		if(iScroll){
			iScroll.destroy(iScroll)
		}
		var iScroll = new IScroll("#is"+scrollPage,{
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
				more(scrollPage,num,function(){
					upTag.html("上拉");
					flag="";
					_this.refresh();
					num++;
				})
			}
		})
		setTimeout(function(){
			iScroll.refresh();
		},100)

		return iScroll

	}
	// 加载更多
	function more(scrollPage,num,cb){
		$.get("assets/api/list"+scrollPage+".json",{pages:scrollPage,num:num},function(data){
			var html = template("list"+scrollPage,data);
			$("#page"+scrollPage).append(html);
			cb()
		})
	}
	
})



