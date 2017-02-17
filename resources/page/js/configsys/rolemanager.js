/**
 * Author:26309358@qq.com
 * Data: 2016.12
 * 
 */

var Rolemanager = function() {

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
					url : getRootPath() + "/authority/findRmsRoleListByPage",
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
						forAjaxClick();
					}
				});
			},
			"columns" : [ {
				"data" : "rid",
				"bSortable" : false
			}, {
				"data" : "name",
				"bSortable" : false
			}, {
				"data" : "remark",
				"bSortable" : false
			}, {
				"data" : "createtime",
				"bSortable" : false
			}, {
				"data" : "rid",
				"bSortable" : false
			} ],
			"columnDefs" : [ {
				"targets" : [ 0 ],
				"render" : function(data, type, full) {
					return "<input name='rid' value='" + data + "' style='display:none' />";
				}
			}, {
				"targets" : [ 2 ],
				"render" : function(data, type, full) {
					if (data == '') {
						data = '----';
					}
					return data;
				}
			}, {
				"targets" : [ 3 ],
				"render" : function(data, type, full) {
					return new Date(data).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
				}
			}, {
				"targets" : [ 4 ],
				"render" : function(data, type, full) {
					var roleAddMenu = '<a class="btn btn-magenta btn-xs roleAddMenu" data="' + data + '"><i class="fa fa-building-o"></i> 配置菜单</a> ';
					var roleAddClient = '<a class="btn btn-purple btn-xs roleAddClient" data="' + data + '"><i class="fa fa-group"></i> 配置客户</a> ';
					var roleAddArehouse = '<a class="btn btn-maroon btn-xs roleAddArehouse" data="' + data + '"><i class="fa fa-bolt"></i> 配置仓库</a>';
					return roleAddMenu+roleAddClient+roleAddArehouse;
				}
			} ]
		});

		/**
		 * 追加功能按钮
		 */
		$("div.DTTT.btn-group").empty();
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-palegreen addRole"><i class="fa fa-plus"></i> 新增角色</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-darkorange deleteRoles"><i class="fa fa-minus"></i> 批量删除</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-maroon editRole"><i class="fa fa-edit"></i> 编辑</button>');
		
		/**
		 * 新增角色
		 */
		$('button.addRole').on("click", function() {
			$("#aboutRoleModal").modal({
				remote : getRootPath() + "/authority/roleAdd"
			});
		});
		
		/**
		 * 批量删除角色
		 */
		$('button.deleteRoles').on("click", function() {
			var rids = [];
			$('#searchable tbody tr.active').find("input[name='rid']").each(function() {
				var rid = $(this).val();
					rids.push(rid);
			});
			if (rids.length > 0) {
				layer.confirm('你要删除这' + rids.length + '条数据(超级管理员无法被删除)?', {
					btn : [ '确认删除！', '取消操作' ]
				//按钮
				}, function() {
					$.ajax({
						url : getRootPath() + "/authority/deleteRoles",
						type : 'post',
						data : {
							rids:rids
						},
						success : function(data) {
							if(data.code=='success'){
								$(".modal-backdrop").remove();
								jumpPageByUrl(getRootPath() + "/configsys/authority/rolemanager");
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
		 * 编辑角色
		 */
		$('button.editRole').on("click", function() {
			var rids = [];
			$('#searchable tbody tr.active').find("input[name='rid']").each(function() {
				var rid = $(this).val();
				if (rid != 1)
					rids.push(rid);
			});
			if (rids.length ==1 ) {
				var rid = rids[0];
				$("#aboutRoleModal").modal({
					remote : getRootPath() + "/authority/roleEdit?rid=" + rid
				});
			}else{
				layer.msg('请选择 1 条数据！', {
					icon: 6,time: 1200
				});
			}
		});
		
		var forAjaxClick = function(){
			$('a.roleAddMenu').on("click", function() {
				var rid = $(this).attr("data");
				$("#aboutRoleModal").modal({
					remote : getRootPath() + "/authority/roleAddMenu?rid=" + rid
				});
			});
			$('a.roleAddClient').on("click", function() {
				var rid = $(this).attr("data");
				$("#aboutRoleModal").modal({
					remote : getRootPath() + "/authority/roleAddClient?rid=" + rid
				});
			});
			$('a.roleAddArehouse').on("click", function() {
				var rid = $(this).attr("data");
				$("#aboutRoleModal").modal({
					remote : getRootPath() + "/authority/roleAddArehouse?rid=" + rid
				});
			});
			
		}
		
		$("#aboutRoleModal").on("hidden.bs.modal", function() {
			$(this).removeData("bs.modal");
		/*	layer.msg('缓存清空！', {
				time: 100,
				icon : 3
			});*/
		});

	}

	return {

		init : function() {
			InitiateSearchableDataTable();
		}

	};

}();
