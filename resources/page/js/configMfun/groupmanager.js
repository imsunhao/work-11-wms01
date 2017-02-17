/**
 * Author:26309358@qq.com
 * Data: 2016.12
 * 
 */

var Groupmanager = function() {

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
					url : getRootPath() + "/group/findGroupsByPage",
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
			} ]
		});

		/**
		 * 追加功能按钮
		 */
		$("div.DTTT.btn-group").empty();
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-palegreen addGroup"><i class="fa fa-plus"></i> 新增储位组</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-darkorange deleteGroup"><i class="fa fa-minus"></i> 批量删除</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-magenta editGroup"><i class="fa fa-edit"></i>编辑</button>');
		
		/**
		 * 新增储位组
		 */
		$('button.addGroup').on("click", function() {
			$("#aboutGroupModal").modal({
				remote : getRootPath() + "/group/groupAdd"
			});
		});

		/**
		 * 批量删除储位组
		 */
		$('button.deleteGroup').on("click", function() {
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
						url : getRootPath() + "/group/deleteGroup",
						type : 'post',
						data : {
							keys:keys
						},
						success : function(data) {
							if(data.code=='success'){
								$(".modal-backdrop").remove();
								jumpPageByUrl(getRootPath() + "/configmfun/groupmanager");
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
		 * 编辑储位组
		 */
		$('button.editGroup').on("click", function() {
			var groupIds = [];
			$('#searchable tbody tr.active').find("input[name='groupId']").each(function() {
				var groupId = $(this).val();
				groupIds.push(groupId);
			});
			if (groupIds.length ==1 ) {
				var groupId = groupIds[0];
				$("#aboutGroupModal").modal({
					remote : getRootPath() + "/group/groupEdit?groupId=" + groupId
				});
			}else{
				layer.msg('请选择 1 条数据！', {
					icon: 6,time: 1200
				});
			}
		});
		
		
		$("#aboutGroupModal").on("hidden.bs.modal", function() {
			$(this).removeData("bs.modal");
		});
		

	}

	return {

		init : function() {
			InitiateSearchableDataTable();
		}

	};

}();
