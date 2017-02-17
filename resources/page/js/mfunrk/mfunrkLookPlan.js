/**
 * Author:26309358@qq.com
 * Data: 2016.12
 * 
 */

var MfunrkLookPlan = function() {
	var plan_id = $("input[name='plan_id']").val();
	
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
				$("#plan_name").html("<i class='fa-arrow-circle-o-left'></i> "+pname+" 的平面图概览");
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
				items :  [ [ 'a', 'available', '未定义' ], [ 'a', 'cunchuqu', '存储区' ], [ 'a', 'fenjianqu', '分拣区' ],['a','zancunqu','暂存区'],['a','buhegequ','不合格区'], [ 'a', 'selected', '选中状态' ] ]
			},
			click : function() { // Click event
				
				if (this.status() == 'available') {
					//未定义的状态，点击后选中，成为选中的状态
					layer.msg('没有被管理员进行分配的区域！ ^_^', {
					    time: 1500, //20s后自动关闭
					    icon: 6
					  });
					return 'selected';
				} else if (this.status() == 'selected') {
					//选中的状态，点击则取消选中，成为未定义的状态
					return 'available';
				} else if (this.status() == 'cunchuqu') { // sold
					//已经被分配为存储区的区域，点击显示本区域下的储位信息(一个为平面货架，多个为N层立体货架)
					
					findDistributionAndRepertoryByLno(this.settings.id);
					sc.find("selected").status("available");
					layer.msg('数据加载完成！', {
					    time: 2500, //20s后自动关闭
					    icon: 6
					  });
					return 'cunchuqu';
				} else if(this.status() == 'fenjianqu'){
					//已经被分配为分拣区的区域，点击显示本区域下的储位信息(分拣区的储位)
					layer.msg('这里是分拣区！ 什么也不能做啊 ^_^', {
					    time: 2500, //20s后自动关闭
					    icon: 6
					  });
					sc.find("selected").status("available");
					return "fenjianqu";
				} else {
					return this.style();
				}
			}
		});
		
		findRegionFun(sc,getRootPath() + "/plan/findRegionFun",1,"cunchuqu");
		findRegionFun(sc,getRootPath() + "/plan/findRegionFun",2,"fenjianqu");
		findRegionFun(sc,getRootPath() + "/plan/findRegionFun",3,"zancunqu");
		findRegionFun(sc,getRootPath() + "/plan/findRegionFun",4,"buhegequ");
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
	 * 查询 分配单和库存中 关于本储位的情况
	 */
	var findDistributionAndRepertoryByLno = function(region_no){
		$("#planEditTableDiv").show();
		$.ajax({
			type : "POST",
			url : getRootPath() + "/mfunrkdoc/findDistributionAndRepertoryByLno",
			cache : false,
			data : {
				"region_no":region_no,
				"plan_id":plan_id
			},
			dataType : "json",
			success : function(data) {
				$('table.arelocations').find('tbody').empty();
				$('table.distributionlists').find('tbody').empty();
				$('table.mfunRepertorys').find('tbody').empty();
				
				var arelocationsList = data.arelocations;
				if(arelocationsList.length==0){
					$('table.arelocations').find('tbody').append('<tr><td colspan=4>没有发现数据...</td></tr>');
				}else{
					$.each(arelocationsList,function(n,obj){
						$('table.arelocations').find('tbody').append('<tr><td>'+obj.locationId+'</td><td class="objlno">'+obj.lno+'</td><td class="objlname">'+obj.lname+'</td><td>'+obj.ltray+'</td></tr>');
					});
				}
				
				var distributionlists = data.distributionlists;
				if(distributionlists.length==0){
					$('table.distributionlists').find('tbody').append('<tr><td colspan=7>没有发现数据...</td></tr>');
				}else{
					$.each(distributionlists,function(n,obj){
						$('table.distributionlists').find('tbody').append('<tr><td>'+obj.distributionlistId+'</td><td>'+obj.locationLno+'</td><td>'+obj.locationLname+'</td><td>'+obj.goodsNo+'</td><td>'+obj.goodsName+'</td><td>'+obj.distributionlistCount+'</td><td>'+obj.distributionlistBatch+'</td></tr>');
					});
				}
				
				var mfunRepertorys = data.mfunRepertorys;
				if(mfunRepertorys.length==0){
					$('table.mfunRepertorys').find('tbody').append('<tr><td colspan=8>没有发现数据...</td></tr>');
				}else{
					$.each(mfunRepertorys,function(n,obj){
						$('table.mfunRepertorys').find('tbody').append('<tr><td>'+obj.repertoryId+'</td><td>'+obj.regionNo+'</td><td>'+obj.locationName+'</td><td>'+obj.goodsNo+'</td><td>'+obj.goodsName+'</td><td>'+obj.goodsCount+'</td><td>'+obj.frozenCount+'</td><td>'+obj.repertoryBatch+'</td></tr>');
					});
				}
				
				
				clickActiveFun();
				
			}
		});
	}
	
	var clickActiveFun = function(){
		
		$("tbody.FFF").find("tr").on("click",function(){
			$(this).toggleClass("active");
			$(this).siblings().removeClass("active");
		});
		
		
		
		$("a.drawInfoToTable").on("click",function(){
			var lno = $('tbody.FFF tr.active').find("td.objlno").html();
			var lname = $('tbody.FFF tr.active').find("td.objlname").html();
			
			var trindex = $("input[name='trindex']").val();
			//<a href="#" class="btn btn-danger btn-xs lookPlan" data="3"><i class="fa fa-trash-o"></i>选择可用储位</a>
			/*var quyudata =  $('#editabledatatable tbody').find('tr').eq(trindex).find("td").eq(1).find("a").attr('data');
			alert(quyudata);*/
			$('#editabledatatable tbody').find('tr').eq(trindex).find("td").eq(1).html(lno);
			$('#editabledatatable tbody').find('tr').eq(trindex).find("td").eq(2).html(lname);
			layer.closeAll();
		});
	}
	
	
/*	$("button.closeOpenModal").on("click",function(){
		$("#aboutSettingLocation").modal("hide");
	});
	$("#aboutSettingLocation").on("hidden.bs.modal", function() {
		$(this).removeData("bs.modal");
	});*/
	return {

		init : function() {
			getPlanByPlanId();
		}

	};

}();
