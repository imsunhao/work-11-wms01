/**
 * Author:26309358@qq.com
 * Data: 2016.12
 * 
 */

var Toclientmanager = function() {
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
				/*var param = {};
				param.pageSize = data.length;
				param.pageNum = (data.start / data.length) + 1;
				param.draw = data.draw;*/
				//  				console.log(data);
				$.ajax({
					type : "GET",
					url : getRootPath() + "/receipt/findReceiptsByPage",
					cache : false,
					data : {
						receiptName:"",
						status:1,
						draw:data.draw,
						pageNum:(data.start / data.length) + 1,
						pageSize:data.length
					},
					dataType : "json",
					success : function(result) {
						var returnData = {};
						returnData.draw = data.draw;
						returnData.recordsTotal = result.recordsTotal;
						returnData.recordsFiltered = result.recordsTotal;
						returnData.data = result.data;
						callback(returnData);
					}
				});
			},
			"columns" : [ {
				"data" : "receiptId",
				"bSortable" : false
			}, {
				"data" : "receiptName",
				"bSortable" : false
			}, {
				"data" : "receiptAddr",
				"bSortable" : false
			}, {
				"data" : "createtime",
				"bSortable" : false
			}, {
				"data" : "receiptId",
				"bSortable" : false
			} ],
			"columnDefs" : [ {
				"targets" : [ 0 ],
				"render" : function(data, type, full) {
					return "<input name='receiptId' value='" + data + "' style='display:none' />";
				}
			}, {
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
				"targets" : [ 3 ],
				"render" : function(data, type, full) {
					return new Date(data).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
				}
			}, {
				"targets" : [ 4 ],
				"render" : function(data, type, full) {
					var whichClient =  '<button class="btn btn-magenta btn-xs clientAddArehouseJumpModal" data="' + data + '">查询客户</button>';
					return whichClient;
				}
			} ]
		});

		/**
		 * 追加功能按钮
		 */
		$("div.DTTT.btn-group").empty();
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-palegreen addReceipt"><i class="fa fa-plus"></i> 新增收货方</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-darkorange deleteReceipt"><i class="fa fa-minus"></i> 批量删除</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-magenta editReceipt"><i class="fa fa-edit"></i>编辑</button>');

		
		/**
		 * 新增收货方
		 */
		$('button.addReceipt').on("click", function() {
			$("#aboutReceiptModal").modal({
				remote : getRootPath() + "/receipt/receiptAdd"
			});
		});
		
		/**
		 * 批量删除收货方
		 */
		$('button.deleteReceipt').on("click", function() {
			var keys = [];
			$('#searchable tbody tr.active').find("input[name='receiptId']").each(function() {
				var key = $(this).val();
				keys.push(key);
			});
			if (keys.length > 0) {
				layer.confirm('你要删除这' + keys.length + '条数据?', {
					btn : [ '确认删除！', '取消操作' ]
				//按钮
				}, function() {
					$.ajax({
						url : getRootPath() + "/receipt/deleteReceipt",
						type : 'post',
						data : {
							keys:keys
						},
						success : function(data) {
							if(data.code=='success'){
								$(".modal-backdrop").remove();
								jumpPageByUrl(getRootPath() + "/configmfun/toclientmanager");
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
		
		/**
		 * 编辑收货方
		 */
		$('button.editReceipt').on("click", function() {
			var receiptIds = [];
			$('#searchable tbody tr.active').find("input[name='receiptId']").each(function() {
				var receiptId = $(this).val();
				receiptIds.push(receiptId);
			});
			if (receiptIds.length ==1 ) {
				var receiptId = receiptIds[0];
				$("#aboutReceiptModal").modal({
					remote : getRootPath() + "/receipt/receiptEdit?receiptId=" + receiptId
				});
			}else{
				layer.msg('请选择 1 条数据！', {
					icon: 6,time: 900
				});
			}
		});
		
		
	}

	return {

		init : function() {
			InitiateSearchableDataTable();
		}

	};

}();
