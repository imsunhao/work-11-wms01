/**
 * Author:26309358@qq.com
 * Data: 2016.12
 * 
 */

var Planmanager = function() {

	var InitiateSearchableDataTable = function() {
		var oTable = $('#searchable').dataTable({
			"sDom" : "Tflt<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
			"aaSorting" : [ [ 2, 'asc' ] ],
			"aLengthMenu" : [ [ 5, 15, 20, -1 ], [ 5, 15, 20, "All" ] ],
			"iDisplayLength" : 15,
			"language" : {
				"search" : "",
				"sLengthMenu" : "_MENU_",
				"oPaginate" : {
					"sPrevious" : "上页",
					"sNext" : "下页"
				}
			},
			"oTableTools" : {
				"sRowSelect" : "multi",
				"aButtons" : [ {
					"sExtends" : "print",
					"sButtonText" : "打印"
				} ]
			},
			"serverSide" : true,
			"colReorder" : {
				reorderCallback : function() {
					//  					console.log('callback');
				}
			},
			"ajax" : function(data, callback, settings) {
				var param = {};
				param.pageSize = data.length;
				param.pageNum = (data.start / data.length) + 1;
				param.draw = data.draw;
				//  				console.log(data);
				$.ajax({
					type : "GET",
					url : getRootPath() + "/plan/findPlansByPage",
					cache : false,
					data : param,
					dataType : "json",
					success : function(result) {
						var returnData = {};
						returnData.draw = data.draw;
						returnData.recordsTotal = result.recordsTotal;
						returnData.recordsFiltered = result.recordsTotal;
						returnData.data = result.data;
						callback(returnData);
						
						planEdit();
					}
				});
			},
			"columns" : [ {
				"data" : "planId",
				"bSortable" : false
			}, {
				"data" : "pname",
				"bSortable" : false
			}, {
				"data" : "createtime",
				"bSortable" : false
			}, {
				"data" : "pstatus",
				"bSortable" : false
			}, {
				"data" : "planId",
				"bSortable" : false
			} ],
			"columnDefs" : [ {
				"targets" : [ 0 ],
				"render" : function(data, type, full) {
					return "<input name='planId' value='" + data + "' style='display:none' />";
				}
			}, {
				"targets" : [ 1 ],
				"render" : function(data, type, full) {
					if(data.length<10){
						if(data.length==0) return "----";
						return data;
					}else{
						return data.substring(1,10)+"...";
					}
				}
			}, {
				"targets" : [ 2 ],
				"render" : function(data, type, full) {
					return new Date(data).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
				}
			}, {
				"targets" : [ 3 ],
				"render" : function(data, type, full) {
					var caogao =  '<button class="btn btn-magenta btn-xs" data="' + data + '">草稿</button>';
					var used =  '<button class="btn btn-magenta btn-xs" data="' + data + '">被使用</button>';
					if(data==1){
						return caogao;
					}else if(data==2){
						return used;
					}else{
						return "error";
					}
				}
			}, {
				"targets" : [ 4 ],
				"render" : function(data, type, full) {
					var draw =  '<button class="btn btn-magenta btn-xs planEdit" data="' + data + '">绘制图纸</button>';
//					var planEditLocation = '<button class="btn btn-sky btn-xs arehouseAddPlan" data="' + data + '">列表展示</button>';
//					var arehouseAddLocationGroup = '<button class="btn btn-sky btn-xs arehouseAddPlan" data="' + data + '">查询储位组</button>';
					return draw;
				}
			} ]
		});

		/**
		 * 追加功能按钮
		 */
		$("div.DTTT.btn-group").empty();
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-palegreen addPlanJumpJsp"><i class="fa fa-plus"></i>新增平面图结构</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-purple addPlanInfo"><i class="fa fa-minus"></i> 创建规则?</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-darkorange deletePlans"><i class="fa fa-minus"></i> 批量删除</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-magenta editPlan"><i class="fa fa-edit"></i>编辑</button>');

		/**
		 * 批量删除仓库平面图
		 */
		$('button.deletePlans').on("click", function() {
			var keys = [];
			$('#searchable tbody tr.active').find("input[name='planId']").each(function() {
				var key = $(this).val();
				keys.push(key);
			});
			if (keys.length > 0) {
				layer.confirm('你要删除这' + keys.length + '条数据?', {
					btn : [ '确认删除！', '取消操作' ]
				//按钮
				}, function() {
					$.ajax({
						url : getRootPath() + "/plan/deletePlans",
						type : 'post',
						data : {
							keys:keys
						},
						success : function(data) {
							if(data.code=='success'){
								$(".modal-backdrop").remove();
								jumpPageByUrl(getRootPath() + "/configmfun/arehouseplanmanager");
								layer.msg('删除成功！', {icon: 1,time: 900});
							}
						},
						error : function(data) {
							alert("网络异常");
						},
						dataType : "json"
					});
				}, function() {
					layer.msg('取消操作', {
						icon: 9,time: 900
					});
				});
			}else{
				layer.msg('你没有选择任何数据', {
					icon: 6,time: 900
				});
			}
		});
		
		//跳转新增平面图
		$('button.addPlanJumpJsp').on("click", function() {
			$("#aboutArehousePlanModal").modal({
				remote : getRootPath() + "/plan/addPlanJumpJsp"
			});
		});
		
		//跳转到仓库平面图编辑
		var planEdit = function(){
			$('button.planEdit').on("click", function() {
				var plan_id = $(this).attr("data");
				$("#planEditModal").modal({
					remote : getRootPath() + "/plan/planEdit?plan_id=" + plan_id
				});
			});
		}
		
		/**
		 * 编辑用户
		 */
		$('button.editPlan').on("click", function() {
			var planIds = [];
			$('#searchable tbody tr.active').find("input[name='planId']").each(function() {
				var planId = $(this).val();
				planIds.push(planId);
			});
			if (planIds.length ==1 ) {
				var planId = planIds[0];
				$("#aboutArehousePlanModal").modal({
					remote : getRootPath() + "/plan/arehousePlanEdit?planId=" + planId
				});
			}else{
				layer.msg('请选择 1 条数据！', {
					icon: 6,time: 1200
				});
			}
		});
	
		
		
		$("#aboutArehousePlanModal").on("hidden.bs.modal", function() {
			$(this).removeData("bs.modal");
		});
		$("#planEditModal").on("hidden.bs.modal", function() {
			$(this).removeData("bs.modal");
		});
	}

	return {

		init : function() {
			InitiateSearchableDataTable();
		}

	};

}();
