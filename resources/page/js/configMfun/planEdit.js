/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */


var PlanEdit = function() {
	var plan_id = $("input[name='planEdit']").val();
	var getPlanByPlanId = function(){
		$.ajax({
			type : "POST",
			url : getRootPath() + "/plan/getPlanByPlanId",
			cache : false,
			data : {
				"plan_id":plan_id
			},
			dataType : "json",
			success : function(data) {
				var pname = data.pname;
				$("#plan_name").html(pname+" 的平面图编辑");
				var pgroupinfo = data.pgroupinfo;
				var mapdate = pgroupinfo.split("|");
				drawPlan(mapdate);
			}
		});
	}
	
	var drawPlan = function(mapdate) {
		var $cart = $('#selected-seats'), // Sitting Area
		$counter = $('#counter'), // Votes
		$total = $('#total'); // Total money

		var sc = $('#seat-map-demo').seatCharts({
			map : mapdate,
			naming : {
				top : true,
				left : true,
				getId : function(character, row, column) {
					return row + '_' + column;
				},
				getLabel : function(character, row, column) {
					return column;
				}
			},
			legend : { // Definition legend
				node : $('#legend'),
				items : [ [ 'a', 'available', '未定义' ], [ 'a', 'cunchuqu', '存储区' ], [ 'a', 'fenjianqu', '分拣区' ],['a','zancunqu','暂存区'],['a','buhegequ','不合格区'], [ 'a', 'selected', '选中状态' ] ]
			},
			click : function() { // Click event
				
				if (this.status() == 'available') {
					//未定义的状态，点击后选中，成为选中的状态
					return 'selected';
				} else if (this.status() == 'selected') {
					//选中的状态，点击则取消选中，成为未定义的状态
					return 'available';
				} else if (this.status() == 'cunchuqu') { // sold
					//已经被分配为存储区的区域，点击显示本区域下的储位信息(一个为平面货架，多个为N层立体货架)
					
					askJumpWhere(this.settings.id+" 区域设置",this.settings.id,plan_id);
					sc.find("selected").status("available");
					return 'cunchuqu';
				} else if(this.status() == 'fenjianqu'){
					//已经被分配为分拣区的区域，点击显示本区域下的储位信息(分拣区的储位)
					alert(this.settings.id);
					sc.find("selected").status("available");
					return "fenjianqu";
				} else {
					return this.style();
				}
			}
		});
		
		/**
		 * 设置存储区按钮
		 */
		$("a.planAddCunChuqu").on("click",function(){
			var baseRegions = new Array();
			sc.find("selected").each(function(){
				baseRegions.push({"regionNo":this.settings.id,"status":1,"planId":plan_id});
			});
			
			setRegionFun(baseRegions,'存储区');
		});
		
		/**
		 * 设置分拣区按钮
		 */
		$("a.planAddFenJianQu").on("click",function(){
			var baseRegions = new Array();
			sc.find("selected").each(function(){
				baseRegions.push({"regionNo":this.settings.id,"status":2,"planId":plan_id});
			});
			
			setRegionFun(baseRegions,'分拣区');
		});
		
		/**
		 * 设置暂存区按钮
		 */
		$("a.planAddZanCunQu").on("click",function(){
			var baseRegions = new Array();
			sc.find("selected").each(function(){
				baseRegions.push({"regionNo":this.settings.id,"status":3,"planId":plan_id});
			});
			
			setRegionFun(baseRegions,'暂存区');
		});
		
		/**
		 * 设置不合格区按钮
		 */
		$("a.planAddBuHeGeQu").on("click",function(){
			var baseRegions = new Array();
			sc.find("selected").each(function(){
				baseRegions.push({"regionNo":this.settings.id,"status":4,"planId":plan_id});
			});
			
			setRegionFun(baseRegions,'不合格区');
		});
		
		findRegionFun(sc,getRootPath() + "/plan/findRegionFun",1,"cunchuqu");
		findRegionFun(sc,getRootPath() + "/plan/findRegionFun",2,"fenjianqu");
		findRegionFun(sc,getRootPath() + "/plan/findRegionFun",3,"zancunqu");
		findRegionFun(sc,getRootPath() + "/plan/findRegionFun",4,"buhegequ");
	}
	
	/**
	 * 设置存储区新增区域数据过程函数
	 */
	var setRegionFun = function(baseRegions,msg){
		var baseRegionsJson = JSON.stringify(baseRegions);
		if (baseRegions.length > 0) {
			layer.confirm('你确认将这' + baseRegions.length + '个区域设置为'+msg+'？', {
				btn : [ '确认修改客户配置！', '取消操作' ]
			//按钮
			}, function() {
				$.ajax({
					url : getRootPath() + "/plan/insertBaseRegion",
					type : "POST",  
					contentType: 'application/json;charset=utf-8',
					data : baseRegionsJson,
					success : function(data) {
						if(data.code=='success'){
							$(".modal-backdrop").remove();
//							jumpPageByUrl(getRootPath() + "/plan/insertBaseRegion");
							getPlanByPlanId();
							layer.msg('配置成功！', {icon: 1});
						}else{
							layer.msg('配置失败！', {icon: 1});
						}
					},
					error : function(data) {
						alert("网络异常");
					},
					dataType : "json"
				});
			}, function() {
				layer.msg('取消操作成功', {
					icon : 1
				});
			});
		}else{
			layer.msg('你没有选择任何信息 ！', {
				icon : 5
			});
		}
	}
	
	/**
	 * 初始化存储区、分拣区 (获取分拣区/存储区 信息列表)
	 */
	var findRegionFun = function(sc,url,status,name){
		$.ajax({
			url : url,
			type : "GET",  
			contentType: 'application/json',
			data : {
				"status":status,
				"plan_id":plan_id
			},
			success : function(data) {
				var regionNos = new Array();
				
				$.each(data,function(n,obj){
					regionNos.push(obj.regionNo);
				});
				sc.get(regionNos).status(name);
				
			},
			error : function(data) {
				alert("findFenJianQuQusFun is error!");
			},
			dataType : "json"
		});
	}
	
	/**
	 * 点击区域提示的信息 跳转去哪里
	 */
	var askJumpWhere = function(title,regionNo,plan_id){
		layer.confirm('你想要对存储区区域进行的操作？', {
		  btn: ['新增储位信息','查询区域内储位'] //按钮
		}, function(){
			layer.msg('完成跳跃 ^_^', {time: 2000,icon: 1});
			openModalAddLocation(title,regionNo,plan_id)
		}, function(){
			layer.msg('数据加载完毕 ^_^', {time: 1000,icon: 1});
			openModalEditLocationByRegion(title,regionNo,plan_id);
		});
	}
	
	/**
	 * 跳转至区域->新增储位页面
	 */
	var openModalAddLocation =function(title,regionNo,plan_id) {
		$.ajax({
			url : getRootPath() + "/plan/openModalAddLocation",
			type : "GET",  
			contentType: 'application/json',
			data : {
				"regionNo":regionNo,
				"plan_id":plan_id
			},
			success : function(res) {
				 bootbox.dialog({
			        message:res,
			        title: title,
			        className: "modal-darkorange",
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
	
	/**
	 * 查询出来的某个区域内的储位信息列表
	 */
	var openModalEditLocationByRegion = function(title,regionNo,plan_id){
		$.ajax({
			url : getRootPath() + "/plan/openModalEditLocationByRegion",
			type : "GET",  
			contentType: 'application/json',
			data : {
				"regionNo":regionNo,
				"plan_id":plan_id
			},
			success : function(data) {
				initLocationTale(data);
			},
	        error: function(data) {
	        	alert("openModalAddLocation is error!");
	        }
		});
	}
	
	/**
	 * 查询所有储位信息
	 */
	$("a.findAllArelocation").on("click",function(){
		$.ajax({
			url : getRootPath() + "/locations/findBaseArelocationsByPage",
			type : "GET",  
			contentType: 'application/json',
			data : {
				"plan_id":plan_id
			},
			success : function(data) {
				initLocationTale(data);
				$("a.relplanAddLocations").on("click",function(){
					initLocationTale(data);
				});
				
			},
	        error: function(data) {
	        	alert("openModalAddLocation is error!");
	        }
		});
	});
	
	
	var initLocationTale = function(data){
		$("#planEditTableDiv").show();
//		$("table.EE").append("<button class='btn btn-sky'>123</button>");
		$("thead.EEE tr").empty();
		$("thead.EEE tr").append("<th></th><th>区域编号</th><th>储位名称</th><th>区域类型</th>");
		$("tbody.EEE").empty();
		if(data.length==0){
			$("tbody.EEE").append("<tr><td colspan=4>没有发现数据！</td></tr>");
		} 
		$.each(data,function(n,obj){
			var lno = obj.lno;
			var lname = obj.lname;
			var status = obj.status;
			var arelocationsId = obj.arelocationsId;
			var quyu ='';
			var arelocations='';
			if(status==1){
				quyu = '存储区';
			}else if(status==2){
				quyu = '分拣区';
			}else{
				quyu ='----';
			}
			if(arelocationsId==null||arelocationsId==''){
				
				arelocations= '<input type="text" name="locationId" value="'+obj.locationId+'" style="display:none">';
			}else{
				arelocations = '<font color=red>被储位组占用</font>';
			}
			
			$("tbody.EEE").append("<tr><td>"+arelocations+"</td><td>"+lno+"</td><td>"+lname+"</td><td>"+quyu+"</td></tr>");
			
			
			$("a.planAddLocations").on("click",function(){
				var arelocations_ = [];
				$("tbody.EEE").find("tr.active").each(function(){
					var locationId = $(this).find("input[name='locationId']").val();
					if(locationId!=undefined) arelocations_.push(locationId);
				});
				if (arelocations_.length > 0) {
					layer.confirm('你勾选了' + arelocations_.length + '个有效储位,确认继续？', {
						btn : [ '继续！', '取消操作' ]
					//按钮
					}, function() {
						$.ajax({
							url : getRootPath() + "/plan/locationAddLocations",
							type : "GET",  
							contentType: 'application/json',
							data : {
								plan_id:plan_id,
								arelocations_:arelocations_
							},
							success : function(data) {
								layer.msg('页面跳转成功！', {
									icon : 1
								});
								bootbox.dialog({
							        message:data,
							        title: "123",
							        className: "modal-darkorange",
							        buttons: {
							            "关闭窗口": {
							                className: "btn-danger",
							                callback: function () { }
							            }
							        }
							    });
							},
							error : function(data) {
								alert("网络异常");
							}
						});
					}, function() {
						layer.msg('取消操作成功', {
							icon : 1
						});
					});
				}else{
					layer.msg('你没有勾选任何数据！', {
						icon : 5
					});
				}
			});
		});
		
		$("tbody.EEE").find("tr").on("click",function(){
			$(this).toggleClass("active");
		});
		
		 $("div.holder").jPages({
		    containerID : "itemContainer",
		    previous : "←",
	        next : "→",
	        perPage : 20,
	        delay : 100
		  });
	}
	
	
	return {

		init : function() {
			//
			getPlanByPlanId();
		}

	};

}();
