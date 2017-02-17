/**
 * Author:26309358@qq.com
 * Data: 2016.12
 * 
 */

var Index = function() {
	
/*	var getActiveUser = function(){
		$.ajax({
			url: getRootPath()+"/authority/getActiveUser",
			type:"post",
			data:null,
			dataType:"json",
			contentType:"application/x-www-form-urlencoded; charset=UTF-8",
			success: function(avticeUser){
				var activeUser = avticeUser;
			}
		});
	}*/
	
	
	/**
	 * 通过用户id查询相应的权限菜单(user_id)
	 */
	var getAllMenuRoot = function() {
		$.ajax({
			url: getRootPath()+"/authority/findHeaderMenus",//查询用户下的所有header等级的菜单
			type:"post",
			data:{
				user_id:1
			},
			dataType:"json",
			contentType:"application/x-www-form-urlencoded; charset=UTF-8",
			success: function(data){ //返回对应权限的header级别菜单
				if(data.length==0) {
					alert('您没有任何权限，请联系管理员！');
				}else{
					redirect(data);
				}
				
				/**
				 * 点击header切换widget1菜单
				 */
				$("div.navbar-page-chino ul").find("li").on('click',function(){
					$(this).addClass("active");
					$(this).siblings().removeClass("active");
					var url=getRootPath()+$(this).attr("url");
					jumpPage(url);
					$.ajax({
						url: getRootPath()+"/authority/findWidget1Menus",//获取
						type:"post",
						data:{
							user_id:1,
							parent_menu_id:$(this).attr("liid")
						},
						dataType:"json",
						contentType:"application/x-www-form-urlencoded; charset=UTF-8",
						success: function(widget1){ //返回对应权限的widget1级别菜单(包含widget2级别的菜单)
							
							$("ul.sidebar-menu").empty();
							$("ul.sidebar-menu").append('<li class="active"><a href="javascript:void(0);"> <i class="menu-icon glyphicon glyphicon-bell"></i> <span class="menu-text" id=""> 手册 </span></a></li>');
							$.each(widget1,function(n,obj){
								var childrens = obj.childrens;
								if(childrens.length==0){
									$("ul.sidebar-menu").append('<li><a href="javascript:void(0);" class="jumpa" url="'+obj.url+'"> <i class="'+obj.menuIcon+'"></i> <span class="menu-text"> '+obj.menuName+'</span></a></li>');
								}else if(childrens.length>0){
									var html_start = '<li url="'+obj.url+'"><a href="javascript:void(0);" class="menu-dropdown"><i class="'+obj.menuIcon+'"></i><span class="menu-text">  '+obj.menuName+'</span><i class="menu-expand"></i></a> <ul class="submenu">';
									var html_li = '';
									var html_end = '</ul></li>';
									
									$("ul.sidebar-menu").append();
									$.each(childrens,function(n,obj){
										html_li+=('<li><a href="javascript:void(0);" class="jumpa" url="'+obj.url+'"><span class="menu-text">'+obj.menuName+'</span></a></li>');
									});
									$("ul.sidebar-menu").append(html_start+html_li+html_end);
								}else{
									alert('wrong!');
								}
							});
							$("a.jumpa").on('click',function(){
								var url = $(this).attr("url");
								jumpPage(url);
								
							});
						}
					});
				});
			}
		});
		
	};
	
	/**
	 * 首次加载菜单
	 */
	var redirect = function(data) {
		$.each(data,function(n,obj){
			var menuIcon = obj.menuIcon;
			var menuName = obj.menuName;
			var url = obj.url;
			$("div.navbar-page-chino ul").append('<li url="'+url+'" liid="'+obj.menuId+'"><i class="'+menuIcon+'"></i> &nbsp;'+menuName+'</li>');
			if(n==0) {
				$.ajax({
					url: getRootPath()+"/authority/findWidget1Menus",
					type:"post",
					data:{
						user_id:1,
						parent_menu_id:obj.menuId
					},
					dataType:"json",
					contentType:"application/x-www-form-urlencoded; charset=UTF-8",
					success: function(widget1){
						$("ul.sidebar-menu").empty();
						$("ul.sidebar-menu").append('<li class="active"><a href="javascript:void(0);"> <i class="menu-icon glyphicon glyphicon-bell"></i> <span class="menu-text" id=""> 手册 </span></a></li>');
						$.each(widget1,function(n,obj){
							var childrens = obj.childrens;
							if(childrens.length==0){
								$("ul.sidebar-menu").append('<li><a href="javascript:void(0);" class="jumpa" url="'+obj.url+'"> <i class="'+obj.menuIcon+'"></i> <span class="menu-text"> '+obj.menuName+'</span></a></li>');
							}else if(childrens.length>0){
								var html_start = '<li url="'+obj.url+'"><a href="javascript:void(0);" class="menu-dropdown"><i class="'+obj.menuIcon+'"></i><span class="menu-text">  '+obj.menuName+'</span><i class="menu-expand"></i></a> <ul class="submenu">';
								var html_li = '';
								var html_end = '</ul></li>';
								
								$("ul.sidebar-menu").append();
								$.each(childrens,function(n,obj){
									html_li+=('<li><a href="javascript:void(0);" class="jumpa" url="'+obj.url+'"><span class="menu-text">'+obj.menuName+'</span></a></li>');
								});
								$("ul.sidebar-menu").append(html_start+html_li+html_end);
							}else{
								alert('wrong!');
							}
						});
						$("a.jumpa").on('click',function(){
							var url = $(this).attr("url");
							jumpPage(url);
						});
					}
				});
				jumpPage(getRootPath()+"/main");
			}
		});
		$("div.navbar-page-chino ul li:first").addClass("active");
		
		/*jQuery('.sub-menu li.nav-item').find('a').on('click',function(){
			var url = $(this).attr("data");
			
			NProgress.configure({parent:'.page-content', minimum: 0.3});
			NProgress.start();
			
			$.ajax({
				type : "GET",
				cache : false,
				url : url,
				dataType : "html",
				async:false,
				success : function(res) {
					jQuery('.page-content').html(res);
					//NProgress.set(1);
					NProgress.done();
					NProgress.remove();
				}
			});
		})*/
	};
	var jumpPage = function(url){
		$.ajax({
			type : "GET",
			cache : false,
			url : url,
			dataType : "html",
			async:false,
			success : function(res) {
				jQuery('.page-content').html(res);
			}
		});
	}
	
	var wholeAjax = function(){
		$.ajaxSetup({  
		    contentType:"application/x-www-form-urlencoded;charset=utf-8",  
		    complete:function(XMLHttpRequest,textStatus){  
		        //通过XMLHttpRequest取得响应头，sessionstatus，  
		        var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");   
		        if(sessionstatus=="timeout"){  
		        //如果超时就处理 ，指定要跳转的页面  
		            window.location = getRootPath()+"/login";  
		        }  
		    }  
		});  
	}
/*	
	var openMessage = function(){
		
		
		
		layer.open({
	        type: 1
	        ,title: false //不显示标题栏
	        ,closeBtn: false
	        ,area: '300px;'
	        ,shade: 0.8
	        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
	        ,btn: ['火速围观', '残忍拒绝']
	        ,moveType: 1 //拖拽模式，0或者1
	        ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">你知道吗？亲！<br>layer ≠ layui<br><br>layer只是作为Layui的一个弹层模块，由于其用户基数较大，所以常常会有人以为layui是layerui<br><br>layer虽然已被 Layui 收编为内置的弹层模块，但仍然会作为一个独立组件全力维护、升级。<br><br>我们此后的征途是星辰大海 ^_^</div>'
	        ,success: function(layero){
	          var btn = layero.find('.layui-layer-btn');
	          btn.css('text-align', 'center');
	          btn.find('.layui-layer-btn0').attr({
	            href: 'http://www.layui.com/'
	            ,target: '_blank'
	          });
	        }
	      });
	}*/
	var openUserModal = function(){
		$.ajax({
			url : getRootPath() + "/getUserInfo",
			type : "GET",  
			contentType: 'application/json',
			data : {},
			success : function(res) {
				 bootbox.dialog({
			        message:res,
			        buttons: {
			            /*success: {
			                label: "Send",
			                className: "btn-blue",
			                callback: function () { }
			            },*/
			            "关闭窗口": {
			                className: "btn-danger",
			                callback: function () { }
			            }
			        }
			    });
			},
	        error: function(data) {
	        	alert("openModalAddLocation is error!");
	        }
		});
	}
	
	var openUserSettingModal = function(){
		$("a.userSetting").on("click",function(){
			$.ajax({
				url : getRootPath() + "/userSetting",
				type : "GET",  
				contentType: 'application/json',
				data : {},
				success : function(res) {
					 bootbox.dialog({
				        message:res,
				        buttons: {
				            /*success: {
				                label: "Send",
				                className: "btn-blue",
				                callback: function () { }
				            },*/
				            "关闭窗口": {
				                className: "btn-danger",
				                callback: function () { }
				            }
				        }
				    });
				},
		        error: function(data) {
		        	alert("openModalAddLocation is error!");
		        }
			});
		});
		
		
		
	}
	
	return {
        init: function() {
        	wholeAjax();
        	getAllMenuRoot();
//        	getActiveUser();
//        	openMessage();
        	openUserModal();
        	openUserSettingModal();
        }
    };
	
}();