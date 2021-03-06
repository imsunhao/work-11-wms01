/**
 * Author:26309358@qq.com
 * Data: 2016.12
 * 
 */

var Locationsmanager = function() {

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
				$.ajax({
					type : "GET",
					url : getRootPath() + "/locations/findBaseArelocationsByPage",
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
//						ajaxClickFun();
					}
				});
			},
			"columns" : [ {
				"data" : "groupId",
				"bSortable" : false
			}, {
				"data" : "groupNo",
				"bSortable" : false
			}, {
				"data" : "groupName",
				"bSortable" : false
			}, {
				"data" : "gorder",
				"bSortable" : false
			}, {
				"data" : "status",
				"bSortable" : false
			}, {
				"data" : "groupId",
				"bSortable" : false
			} ],
			"columnDefs" : [ {
				"targets" : [ 0 ],
				"render" : function(data, type, full) {
					return "<input name='groupId' value='" + data + "' style='display:none' />";
				}
			}/*, {
				"targets" : [ 2 ],
				"render" : function(data, type, full) {
					if(data.length<10){
						if(data.length==0) return "----";
						return data;
					}else{
						return data.substring(1,10)+"...";
					}
				}
			}, {
				"targets" : [ 4 ],
				"render" : function(data, type, full) {
					return new Date(data).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
				}
			}, {
				"targets" : [ 5 ],
				"render" : function(data, type, full) {
					var addArehouse =  '<button class="btn btn-magenta btn-xs clientAddArehouseJumpModal" data="' + data + '">配置仓库</button>';
					var addGoods =  '<button class="btn btn-darkorange btn-xs clientAddGoodsJumpModal" data="' + data + '">配置货品</button>';
					var settings = '<button class="btn btn-sky btn-xs clientSettingsJumpModal" data="' + data + '">客户属性配置</button>';
					return addArehouse+addGoods+settings;
				}
			}*/ ]
		});

		/**
		 * 追加功能按钮
		 */
		$("div.DTTT.btn-group").empty();
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-palegreen addLocations"><i class="fa fa-plus"></i> 新增储位组</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-darkorange deleteLocations"><i class="fa fa-minus"></i> 批量删除</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-magenta editLocations"><i class="fa fa-edit"></i>编辑</button>');
		
		/**
		 * 新增储位组
		 */
		$('button.addLocations').on("click", function() {
			$("#aboutLocationsModal").modal({
				remote : getRootPath() + "/locations/locationsAdd"
			});
		});

		/**
		 * 批量删除客户
		 */
		$('button.deleteLocations').on("click", function() {
			var keys = [];
			$('#searchable tbody tr.active').find("input[name='groupId']").each(function() {
				var key = $(this).val();
				keys.push(key);
			});
			if (keys.length > 0) {
				layer.confirm('你要删除这' + keys.length + '条数据?', {
					btn : [ '确认删除！', '取消操作' ]
				//按钮
				}, function() {
					$.ajax({
						url : getRootPath() + "/locations/deleteLocations",
						type : 'post',
						data : {
							keys:keys
						},
						success : function(data) {
							if(data.code=='success'){
								$(".modal-backdrop").remove();
								jumpPageByUrl(getRootPath() + "/configmfun/locationsmanager");
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
		 * 编辑客户
		 */
		$('button.editLocations').on("click", function() {
			var groupIds = [];
			$('#searchable tbody tr.active').find("input[name='groupId']").each(function() {
				var groupId = $(this).val();
				groupIds.push(groupId);
			});
			if (groupIds.length ==1 ) {
				var groupId = groupIds[0];
				$("#aboutLocationsModal").modal({
					remote : getRootPath() + "/locations/locationsEdit?groupId=" + groupId
				});
			}else{
				layer.msg('请选择 1 条数据！', {
					icon: 6,time: 1200
				});
			}
		});
		
		/*var ajaxClickFun = function(){
			//为客户 配置仓库
			$('button.clientAddArehouseJumpModal').on("click", function() {
				var client_id = $(this).attr("data");
				$("#aboutClientModal").modal({
					remote : getRootPath() + "/client/clientAddArehouseJumpModal?client_id=" + client_id
				});
			});
			
			//为客户配置货物
			$('button.clientAddGoodsJumpModal').on("click", function() {
				var client_id = $(this).attr("data");
				$("#aboutClientModal").modal({
					remote : getRootPath() + "/client/clientAddGoodsJumpModal?client_id=" + client_id
				});
			});
			
			//为客户配置货物
			$('button.clientSettingsJumpModal').on("click", function() {
				var client_id = $(this).attr("data");
				$("#aboutClientModal").modal({
					remote : getRootPath() + "/client/clientSettingsJumpModal?client_id=" + client_id
				});
			});
			
		}*/
		
		
		$("#aboutLocationsModal").on("hidden.bs.modal", function() {
			$(this).removeData("bs.modal");
		});
		
		
		/**
		 * 
		 */
		
		
		/**
		 * 删除用户
		 */
	/*	$('button.deleteUsers').on("click", function() {
			var uids = [];
			$('#searchable tbody tr.active').find("input[name='uid']").each(function() {
				var uid = $(this).val();
				if (uid != 1)
					uids.push(uid);
			});
			if (uids.length > 0) {
				layer.confirm('你要删除这' + uids.length + '条数据(超级管理员无法被删除)?', {
					btn : [ '确认删除！', '取消操作' ]
				//按钮
				}, function() {
					$.ajax({
						url : getRootPath() + "/authority/deleteUsers",
						type : 'post',
						data : {
							uids:uids
						},
						success : function(data) {
							if(data.code=='success'){
								$(".modal-backdrop").remove();
								jumpPageByUrl(getRootPath() + "/configsys/authority/usermanager");
								layer.msg('删除成功！', {icon: 1});
							}
						},
						error : function(data) {
							alert("网络异常");
						},
						dataType : "json"
					});
				}, function() {
					layer.msg('取消操作', {
						icon : 1
					});
				});
			}else{
				layer.msg('你没有选择任何数据', {
					icon : 6
				});
			}
		});*/
		

	}

	return {

		init : function() {
			InitiateSearchableDataTable();
		}

	};

}();
