/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */

var Mfunckdocmanager = function() {
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
				if(status==undefined||status==''||status==0){
					status = null;
				}
				$.ajax({
					type : "GET",
					url : getRootPath() + "/mfunckdoc/mfunck/selectMfunckDocByPage",
					cache : false,
					data : {
						pageNum : (data.start / data.length) + 1,
						pageSize : data.length,
						draw : data.draw,
						status:status,
						search:$("input[type='search']").val()
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
				"data" : "ckdjClientname",
				"bSortable" : false
			}, {
				"data" : "isauto",
				"bSortable" : false
			}, {
				"data" : "xdsj",
				"bSortable" : false
			}, {
				"data" : "yfhsj",
				"bSortable" : false
			}, {
				"data" : "status",
				"bSortable" : false
			}, {
				"data" : "ckdjId",
				"bSortable" : false
			} ],
			"columnDefs" : [ {
				"targets" : [ 0 ],
				"render" : function(data, type, full) {
					return "<input name='groupId' value='" + data + "' style='display:none' />";
					
				}
			}, {
				"targets" : [ 1 ],
				"render" : function(data, type, full) {
					if (data == '' || data == null) {
						data = '----';
					}
					return '<a class="btn btn-link mfunckdocCheck" data="'+full.ckdjId+'">'+data+'</a>';
				}
			}, {
				"targets" : [ 3 ],
				"render" : function(data, type, full) {
					if (data == '1') {
						data = '<span class="label label-maroon">手动录入</span>';
					} else if(data == '2'){
						data = '<span class="label label-darkpink">文件导入</span>';
					} else if(data == '3'){
						data = '<span class="label label-purple">接口导入</span>';
					} else{
						data = '<span class="label label-Default">未知</span>';
					}
					return data;
				}
			},  {
				"targets" : [ 4 ],
				"render" : function(data, type, full) {
					return new Date(data).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
				}
			}, {
				"targets" : [ 5 ],
				"render" : function(data, type, full) {
					return new Date(data).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
				}
			}, {
				"targets" : [ 6 ],
				"render" : function(data, type, full) {
					// 1:初始订单 2:部分分配 3:完全分配 4:部分收货
					// 5:完全收货
					var chushihua = '<span class="label label-azure">初始订单</span>';
					var bufenfenjian = '<span class="label label-warning">部分分拣</span>';
					var bufenfenjian2 = '<span class="label label-warning">部分分拣</span>';
					var quanbufenjian = '<span class="label label-sky">全部分拣</span>';
					
					var chukuwancheng = '<span class="label label-orange">出库完成</span>';
					if (data == 1) {
						return chushihua;
					} else if (data == 2) {
						return bufenfenjian;
					} else if (data == 3) {
						return bufenfenjian2;
					} else if (data == 4) {
						return quanbufenjian;
					} else if (data == 5) {
						return chukuwancheng;
					} else {
						return '<span class="label label-danger graded">状态异常</span>';
					}
				}
			}, {
				"targets" : [ 7 ],
				"render" : function(data, type, full) {
					var delDocById = '<a href="javascript:void(0);" class="btn btn-danger btn-xs delDocById" data=' + data + '><i class="fa fa-minus"></i> 删除</a> ';
					var editDocById = '<a href="javascript:void(0);" class="btn btn-primary btn-xs editDocById" data=' + data + '><i class="fa fa-edit"></i> 编辑</a> ';
					var checkDocInfo = '<a href="javascript:void(0);" class="btn btn-info btn-xs checkDocInfo" data=' + data + '> 查看</a> ';
					var fenjian = '<a href="javascript:void(0);" class="btn btn-magenta btn-xs fenjian" data=' + data + '>分拣</a> ';
					var bujian = '<a href="javascript:void(0);" class="btn btn-warning btn-xs bujian" data=' + data + '>补拣</a> ';
					var xiajia = '<a href="javascript:void(0);" class="btn btn-success btn-xs xiajia" data=' + data + '>下架</a> ';
					if (full.status == 1) {
						return delDocById + editDocById + checkDocInfo + fenjian
					} else if (full.status == 2) {
						return checkDocInfo + bujian + xiajia;
					} else if (full.status == 3) {
						return checkDocInfo + bujian;
					} else if(full.status == 4){
						return checkDocInfo + xiajia
					} else if(full.status == 5){
						return checkDocInfo 
					} else {
						return "";
					}
					return data;
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
		var statusFun ='<div class="btn-group" id="statusChange"><a class="btn btn-blue status" href="javascript:void(0);" data="0">全部单据</a> <a class="btn btn-blue dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);" aria-expanded="false"><i class="fa fa-angle-down"></i></a><ul class="dropdown-menu dropdown-inverse"><li><a href="javascript:void(0);" class="status" data="1"><i class="fa fa-align-justify"></i> 初始入库单据</a></li><li class="divider"></li><li><a href="javascript:void(0);" class="status" data="2"><i class="fa fa-star-o"></i> 部分分拣</a></li><li><a href="javascript:void(0);" class="status" data="3"><i class="fa fa-star"></i> 全部分拣</a></li><li class="divider"></li><li><a href="javascript:void(0);" class="status" data="4"><i class="fa fa-square-o"></i> 出库完成</a></li><li><a href="javascript:void(0);" class="status" data="5"><i class="fa fa-square"></i> 完全上架</a></li></ul></div>';
		var addMfunckDoc = '<button class="btn btn-default btn-palegreen mfunckdocAdd"><i class="fa fa-plus"></i> 新增出库单</button>'
		var addMfunckDocByExcel = '<button class="btn btn-default btn-purple mfunckdocAddByExcel"><i class="fa fa-share-square"></i> excel导入</button>';
		var exportMfunckdocByExcel = '<button class="btn btn-default btn-darkorange exportMfunckdocByExcel"><i class="fa fa-share-square"></i> excel导出</button>'
		
		$("div.DTTT.btn-group").append(statusFun);//status
		$("div.DTTT.btn-group").append(addMfunckDoc); //手动新增
		$("div.DTTT.btn-group").append(addMfunckDocByExcel); //excel 导入
		$("div.DTTT.btn-group").append(exportMfunckdocByExcel);//导出excel
//		$("div.DTTT.btn-group").append('<input type="text" name="status" value="1" />');
//		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-darkorange deleteGroup"><i class="fa fa-minus"></i> 批量删除</button>');
//		$("div.DTTT.btn-group").append('<input type="text" class="form-control" id="reservation" />');
		
		$("a.fenpeichuwei").on("click", function() {
			var ckdjId = $(this).attr("data");
			$("#aboutMfunckdocEditLocation").modal({
				remote : getRootPath() + "/mfunckdoc/fenpeichuwei?ckdjId=" + ckdjId
			});
		});
		
		$("#statusChange").find("a.status").on("click",function(){
			var data = $(this).attr("data");
			$('input[name="status"]').val(data);
			oTable.api().ajax.params();
			oTable.api().ajax.reload();
		});
		
		/**
		 * 新增一些出库单 通过excel
		 */
		$("button.mfunckdocAddByExcel").on("click", function() {
			$("#aboutMfunckdocFun").modal({
				remote : getRootPath() + "/mfunckdoc/mfunckdocAddByExcel"
			});
		});
		
		/**
		 * 以Excel形式导出
		 */
		
		$('button.exportMfunckdocByExcel').on("click",function(){
			
			var keys=[];
			$('#searchable tbody tr.active').find("input[name='groupId']").each(function() {
				var key = $(this).val();
				keys.push(key);
				
			});
			if(keys.length ==0){layer.msg("没有选择任何数据！",{icon:9, time:1200});return;}
				window.location.href = getRootPath() + "/mfunckdoc/exportMfunckdocByExcel?keys=" + keys;

		});
		
		
		/**
		 * 新增出库单
		 */
		$("button.mfunckdocAdd").on("click", function() {
			$("#aboutMfunckdocFun").modal({
				remote : getRootPath() + "/mfunckdoc/mfunckdocAdd"
			});
		});	
		
		$(".checkDocInfo").on("click",function(){
			var data = $(this).attr("data");
			$("#aboutMfunckdocFun").modal({
				remote : getRootPath() + "/mfunckdoc/mfunckdocCheck?ckdj_id="+data
			});
		});
		
		$("a.mfunckdocCheck").on("click", function() {
			var data = $(this).attr("data");
			$("#aboutMfunckdocFun").modal({
				remote : getRootPath() + "/mfunckdoc/mfunckdocCheck?ckdj_id="+data
			});
		});

		$("#aboutMfunckdocFun").on("hidden.bs.modal", function() {
			$(this).removeData("bs.modal");
			$(".modal-backdrop").remove();
		});
		
		$("#aboutMfunckdocEdit").on("hidden.bs.modal", function() {
			$(this).removeData("bs.modal");
			$(".modal-backdrop").remove();
		});
		
		$("button.mfunrkdocAddByExcel").on("click", function() {
			$("#aboutMfunrkdocFun").modal({
				remote : getRootPath() + "/mfunckdoc/mfunckdocAddByExcel"
			});
		});
		
		exportMfunckdocByExcel
		
		$(".editDocById").on("click",function(){
			var data = $(this).attr("data");
			$("#aboutMfunckdocEdit").modal({
				remote : getRootPath() + "/mfunckdoc/mfunckEditById?ckdj_id="+data
			});
		});
		
		
		//批量删除
//		$('button.deleteGroup').on("click", function() {
//			var keys = [];
//			$('#searchable tbody tr.active').find("input[name='groupId']").each(function() {
//				var key = $(this).val();
//				keys.push(key);
//			});
//			if (keys.length > 0) {
//				layer.confirm('你要删除这' + keys.length + '条数据?', {
//					btn : [ '确认删除！', '取消操作' ]
//				//按钮
//				}, function() {
//					$.ajax({
//						url : getRootPath() + "/mfunckdoc/deleteMfunckByIds",
//						type : 'post',
//						data : {
//							keys:keys
//						},
//						success : function(data) {
//							if(data.code=='success'){
//								$(".modal-backdrop").remove();
//								jumpPageByUrl(getRootPath() + "/mfunck/mfunckdocmanager");
//								layer.msg('删除成功！', {icon: 1,time: 1200});
//							}
//						},
//						error : function(data) {
//							alert("网络异常");
//						},
//						dataType : "json"
//					});
//				}, function() {
//					layer.msg('取消操作', {
//						icon: 9,time: 1200
//					});
//				});
//			}else{
//				layer.msg('你没有选择任何数据', {
//					icon: 6,time: 1200
//				});
//			}
//		});
		
		//单条数据删除
		$(".delDocById").on("click",function(){
			var ckdj_id = $(this).attr("data");
			layer.confirm('确认删除？', {
				  btn: ['确认','取消'] //按钮
				}, function(){
					
					$.ajax({
						type : "GET",
						url : getRootPath() + "/mfunckdoc/delDocById",
						cache : false, // 禁用缓存
						data : {ckdj_id:ckdj_id}, // 传入组装的参数
						dataType : "json",
						success : function(result) {
							if(result.code=="1"){
								jumpPageByUrl(getRootPath() + "/mfunckdoc/mfunck/mfunckdocmanager");
								$(".modal-backdrop").remove();
								layer.alert('操作成功！', {icon: 6});
							}else{
								layer.msg("删除失败", {icon: 2, time: 1200});
							}
						}
					});
					
				}, function(){
					layer.msg("取消操作！", {icon: 1, time: 900});
				});
		});
		
		$("#aboutMfunckdocEditLocation").on("hidden.bs.modal", function() {
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
