/**
 * Author:26309358@qq.com
 * Data: 2016.12
 * 
 */

var Arehousemanager = function() {

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
					url : getRootPath() + "/arehouse/findBaseArehousesByPage",
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
						ajaxClickFun();
					}
				});
			},
			"columns" : [ {
				"data" : "arehouseId",
				"bSortable" : false
			}, {
				"data" : "name",
				"bSortable" : false
			}, {
				"data" : "jc",
				"bSortable" : false
			}, {
				"data" : "addr",
				"bSortable" : false
			}, {
				"data" : "scontacts",
				"bSortable" : false
			}, {
				"data" : "worktype",
				"bSortable" : false
			}, {
				"data" : "arehouseId",
				"bSortable" : false
			} ],
			"columnDefs" : [ {
				"targets" : [ 0 ],
				"render" : function(data, type, full) {
					return "<input name='arehouseId' value='" + data + "' style='display:none' />";
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
				"targets" : [ 5 ],
				"render" : function(data, type, full) {
					var pingmiancang = '<span class="label label-blueberry">平面仓 </span>';
					var liticang = '<span class="label label-sky">立体仓</span>';
					var hunhecang = '<span class="label label-purple">混合仓库</span>';
					var weizhi = '<span class="label label-darkorange">未知属性</span>';
					if(data==1){
						return pingmiancang;
					}else if(data==2){
						return liticang;
					}else if(data==3){
						return hunhecang;
					}else{
						return weizhi;
					}
				}
			}, {
				"targets" : [ 6 ],
				"render" : function(data, type, full) {
					var whichClient =  '<button class="btn btn-purple btn-xs arehouseWhichClient" data="' + data + '"><i class="fa fa-circle"></i> 客户归属</button> ';
					var arehouseAddPlan = '<button class="btn btn-magenta btn-xs arehouseAddPlan" data="' + data + '"><i class="fa fa-cogs"></i> 关联图纸</button>';
					return whichClient+arehouseAddPlan;
				}
			}]
		});

		/**
		 * 追加功能按钮
		 */
		$("div.DTTT.btn-group").empty();
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-palegreen addArehouse"><i class="fa fa-plus"></i> 新增仓库数据</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-darkorange deleteArehouses"><i class="fa fa-minus"></i> 批量删除</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-magenta editArehouse"><i class="fa fa-edit"></i>编辑</button>');
		
		/**
		 * 新增仓库
		 */
		$('button.addArehouse').on("click", function() {
			$("#aboutArehouseModal").modal({
				remote : getRootPath() + "/arehouse/arehouseAdd"
			});
		});
		
		/**
		 * 批量删除仓库
		 */
		$('button.deleteArehouses').on("click", function() {
			var keys = [];
			$('#searchable tbody tr.active').find("input[name='arehouseId']").each(function() {
				var key = $(this).val();
				keys.push(key);
			});
			if (keys.length > 0) {
				layer.confirm('你要删除这' + keys.length + '条数据?', {
					btn : [ '确认删除！', '取消操作' ]
				//按钮
				}, function() {
					$.ajax({
						url : getRootPath() + "/arehouse/deleteArehouses",
						type : 'post',
						data : {
							keys:keys
						},
						success : function(data) {
							if(data.code=='success'){
								$(".modal-backdrop").remove();
								jumpPageByUrl(getRootPath() + "/configmfun/arehousemanager");
								layer.msg('删除成功！', {icon: 1,time: 1200});
							}
						},
						error : function(data) {
							alert("网络异常");
						},
						dataType : "json"
					});
				}, function() {
					layer.msg('取消操作', {
						icon: 9,time: 1200
					});
				});
			}else{
				layer.msg('你没有选择任何数据', {
					icon: 6,time: 1200
				});
			}
		});
		
		/**
		 * 编辑仓库
		 */
		$('button.editArehouse').on("click", function() {
			var arehouseIds = [];
			$('#searchable tbody tr.active').find("input[name='arehouseId']").each(function() {
				var arehouseId = $(this).val();
					arehouseIds.push(arehouseId);
			});
			if (arehouseIds.length ==1 ) {
				var arehouseId = arehouseIds[0];
				$("#aboutArehouseModal").modal({
					remote : getRootPath() + "/arehouse/arehouseEdit?arehouseId=" + arehouseId
				});
			}else{
				layer.msg('请选择 1 条数据！', {
					icon: 6,time: 1200
				});
			}
		});

		var ajaxClickFun = function(){
			//为客户 配置仓库
			$('button.aboutGoodsModal').on("click", function() {
				var client_id = $(this).attr("data");
				$("#aboutClientModal").modal({
					remote : getRootPath() + "/client/clientAddArehouseJumpModal?client_id=" + client_id
				});
			});
			
			//为客户配置货物
			$('button.clientAddGoodsJumpModal').on("click", function() {
				var client_id = $(this).attr("data");
				$("#aboutGoodsModal").modal({
					remote : getRootPath() + "/client/clientAddGoodsJumpModal?client_id=" + client_id
				});
			});
		}
		
		
		$("#aboutGoodsModal").on("hidden.bs.modal", function() {
			$(this).removeData("bs.modal");
		});
		
	}

	return {

		init : function() {
			InitiateSearchableDataTable();
		}

	};

}();
