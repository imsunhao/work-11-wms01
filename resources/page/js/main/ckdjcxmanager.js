/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */

var Ckdjcxmanager = function() {
	
	var oTable;
	var InitiateSearchableDataTable = function() {
		oTable = $('#searchable').dataTable({
			"sDom" : "Tflt<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
			"aaSorting" : [ [ 0, 'asc' ] ],
			"aLengthMenu" : [ [ 5, 10, 15, 20, 500 ], [ 5, 10, 15, 20, "All" ] ],
			"iDisplayLength" : 10,
			"processing" : true,//打开数据加载时的等待效果
			"serverSide" : true,//打开后台分页 
			"oLanguage" : {
				"sLengthMenu" : "_MENU_",
				"sProcessing" : "处理中...",
				"sZeroRecords" : "没有匹配结果",
				"sInfo" : "显示第 _START_ 至 _END_ 项结果，共( _TOTAL_)项",
				"sInfoEmpty" : "显示第 0 至 0 项结果，共 0 项",
				"sInfoFiltered" : "(由 _MAX_ 项结果过滤)",
				"sInfoPostFix" : "",
				"sSearch" : "",
				"sUrl" : "",
				"sEmptyTable" : "<i class='fa fa-meh-o'></i> 暂时没有匹配数据...",
				"sLoadingRecords" : "载入中...",
				"sInfoThousands" : ",",
				"oPaginate" : {
					"sFirst" : "首页",
					"sPrevious" : "上页",
					"sNext" : "下页",
					"sLast" : "末页"
				},
				"oAria" : {
					"sSortAscending" : ": 以升序排列此列",
					"sSortDescending" : ": 以降序排列此列"
				}
			},
			"oTableTools" : {
				"sRowSelect" : "multi",
				"aButtons" : [ {
					"sExtends" : "print",
					"sButtonText" : "打印"
				} ]
			},
			"colReorder" : {
				reorderCallback : function() {
				}
			},
			"ajax" : function(data, callback, settings) {
				var status = $('input[name="status"]').val();
				var arehouseId = $('input[name="arehouseId"]').val();
				if(status==undefined||status==''||status==0){
					status = null;
				}
				if(arehouseId==undefined||arehouseId==''||arehouseId==0){
					arehouseId = null;
				}
//				alert(arehouseId);
				$.ajax({
					type : "GET",
					url : getRootPath() + "/main/findMfunckDocListByPage",
					cache : false,
					data : {
						pageNum : (data.start / data.length) + 1,
						pageSize : data.length,
						draw : data.draw,
						status:status,
						search:$("input[type='search']").val(),
						arehouseId:arehouseId
					},
					dataType : "json",
					success : function(result) {
						var returnData = {};
						returnData.draw = data.draw;
						returnData.recordsTotal = result.recordsTotal;
						returnData.recordsFiltered = result.recordsTotal;
						returnData.data = result.data;
						callback(returnData);
						ajaxButtonFun();
					}
				});
			},
			"columns" : [ {
				"data" : "ckdjId",
				"bSortable" : false
			}, {
				"data" : "ckdjNo",
				"bSortable" : false
			}, {
				"data" : "ckdjClientno",
				"bSortable" : false
			}, {
				"data" : "ckdjClientname",
				"bSortable" : false
			}, {
				"data" : "adress",
				"bSortable" : false
			}, {
				"data" : "contacts",
				"bSortable" : false
			}, {
				"data" : "tel",
				"bSortable" : false
			}, {
				"data" : "status",
				"bSortable" : false
			}, {
				"data" : "xdsj",
				"bSortable" : false
			}, {
				"data" : "yfhsj",
				"bSortable" : false
			}, {
				"data" : "remarks",
				"bSortable" : false
			}, {
				"data" : "ckdjId",
				"bSortable" : false
			} ],
			"columnDefs" : [ {
				"targets" : [ 0 ],
				"render" : function(data, type, full) {
					return "<input name='mfunckdoc' value='" + data + "' style='display:none' />";
				}
			}, {
				"targets" : [ 1 ],
				"render" : function(data, type, full) {
					if (data == '' || data == null) {
						data = '----';
					}
					return data;
				}
			}, {
				"targets" : [ 7 ],
				"render" : function(data, type, full) {
					// 1:初始订单 2:部分分配 3:完全分配 4:部分收货
					// 5:完全收货
					var chushihua = '<span class="label label-azure">初始订单</span>';
					var bufenfenpei = '<span class="label label-warning">部分分配</span>';
					var wanquanfenpei = '<span class="label label-sky">完全分配</span>';
					var bufenshouhuo = '<span class="label label-orange">部分收货</span>';
					var wanquanshouhuo = '<span class="label label-sky">完全收货</span>';
					if (data == 1) {
						return chushihua;
					} else if (data == 21) {
						return bufenfenpei;
					} else if (data == 22) {
						return wanquanfenpei;
					} else if (data == 31) {
						return bufenshouhuo;
					} else if (data == 31) {
						return wanquanshouhuo;
					} else {
						return '<span class="label label-danger graded">状态异常</span>';
					}
				}
			}, {
				"targets" : [ 8 ],
				"render" : function(data, type, full) {
					return new Date(data).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
				}
			}, {
				"targets" : [ 9 ],
				"render" : function(data, type, full) {
					return new Date(data).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
				}
			}, {
				"targets" : [ 11 ],
				"render" : function(data, type, full) {
					var delDocById = '<a href="javascript:void(0);" class="btn btn-danger btn-xs checkRkHistory" data=' + data + '><i class="fa fa-minus"></i> 跟踪日志信息</a> ';
					return delDocById;
				}
			} ],
			initComplete : initComplete
		});
	}

	function initComplete(data) {
//		console.log(oTable);
		
	}

	var ajaxButtonFun = function() {
		
		/**
		 * 追加功能按钮
		 */
		$("div.DTTT.btn-group").empty();
		var statusFun ='<div class="btn-group" id="statusChange"><a class="btn btn-blue status" href="javascript:void(0);" data="0">全部单据</a> <a class="btn btn-blue dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);" aria-expanded="false"><i class="fa fa-angle-down"></i></a><ul class="dropdown-menu dropdown-inverse"><li><a href="javascript:void(0);" class="status" data="1"><i class="fa fa-align-justify"></i> 初始入库单据</a></li><li class="divider"></li><li><a href="javascript:void(0);" class="status" data="21"><i class="fa fa-star-o"></i> 部分分配</a></li><li><a href="javascript:void(0);" class="status" data="22"><i class="fa fa-star"></i> 完全分配</a></li><li class="divider"></li><li><a href="javascript:void(0);" class="status" data="31"><i class="fa fa-square-o"></i> 部分上架</a></li><li><a href="javascript:void(0);" class="status" data="32"><i class="fa fa-square"></i> 完全上架</a></li></ul></div>';
		$("div.DTTT.btn-group").append(statusFun);//status
		$.ajax({
			url:getRootPath() + "/main/findArehouseInfoByActiveUser",
			type:"GET",
			cache : false,
			data : {},
			dataType : "json",
			success : function(result) {
				$("div.DTTT.btn-group").append('<div class="btn-group"> <a class="btn btn-primary" href="javascript:void(0);"> -选择权限仓库(默认展示第一个)- </a><a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);"><i class="fa fa-angle-down"></i></a><ul class="dropdown-menu arehouses"></ul></div>');
				$.each(result,function(n,obj){
					$("ul.arehouses").append('<li><a class="arehouse_id" href="javascript:void(0);" data="'+obj.arehouseId+'" nameVal="'+obj.name+'">'+obj.name+'</a></li>');
				});
				
				/**
				 * 仓库参数
				 */
				$('a.arehouse_id').on("click",function(){
					var arehouse_id = $(this).attr("data");
					$('input[name="arehouseId"]').val(arehouse_id);
					oTable.api().ajax.params();
					oTable.api().ajax.reload();
					var nameVal = $(this).attr("nameVal");
					$("div.paramInfo span.arehouseid_").empty();
					$("div.paramInfo span.arehouseid_").append("| 仓库搜索参数："+nameVal);
				});
			}
		});
		
		/**
		 * 状态参数
		 */
		$("#statusChange").find("a.status").on("click",function(){
			var data = $(this).attr("data");
			$('input[name="status"]').val(data);
			oTable.api().ajax.params();
			oTable.api().ajax.reload();
			$("div.paramInfo span.status_").empty();
			$("div.paramInfo span.status_").append("| 状态搜索参数："+data);
		});
		
		/**
		 * 弹出历史记录
		 */
		$("a.checkCkHistory").on("click", function() {
			var ckdj_id = $(this).attr("data");
			$("#checkCkHistory").modal({
				remote : getRootPath() + "/main/checkCkHistory?ckdj_id="+ckdj_id
			});
		});

		$("#checkCkHistory").on("hidden.bs.modal", function() {
			$(this).removeData("bs.modal");
			$(".modal-backdrop").remove();
		});
	}

	return {

		init : function() {
			InitiateSearchableDataTable();
		}

	};

}();
