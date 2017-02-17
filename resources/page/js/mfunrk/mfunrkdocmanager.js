/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */

var Mfunrkdocmanager = function() {
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
				var reservation = $('input[name="reservation"]').val();
				if (status == undefined || status == '' || status == 0) {
					status = null;
				}
				if(reservation == undefined || reservation == '' || reservation == 0){
					reservation = null;
				}
				$.ajax({
					type : "GET",
					url : getRootPath() + "/mfunrkdoc/findMfunrkDocListByPage",
					cache : false,
					data : {
						pageNum : (data.start / data.length) + 1,
						pageSize : data.length,
						draw : data.draw,
						status : status,
						search : $("input[type='search']").val(),
						reservation : reservation
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
				"data" : "rkdjId",
				"bSortable" : false
			}, {
				"data" : "rkdjNo",
				"bSortable" : false
			}, {
				"data" : "createtime",
				"bSortable" : false
			}, {
				"data" : "isauto",
				"bSortable" : false
			}, {
				"data" : "status",
				"bSortable" : false
			}, {
				"data" : "rkdjId",
				"bSortable" : false
			} ],
			"columnDefs" : [ {
				"targets" : [ 0 ],
				"render" : function(data, type, full) {
					return "<input name='mfunrkdoc' value='" + data + "' style='display:none' />";
				}
			}, {
				"targets" : [ 1 ],
				"render" : function(data, type, full) {
					if (data == '' || data == null) {
						data = '----';
					}
					return '<a class="btn btn-link mfunrkdocCheck" data="' + full.rkdjId + '">' + data + '</a>';
				}
			}, {
				"targets" : [ 2 ],
				"render" : function(data, type, full) {
					return new Date(data).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
				}
			}, {
				"targets" : [ 3 ],
				"render" : function(data, type, full) {
					if (data == '1') {
						data = '<span class="label label-maroon">手动录入</span>';
					} else if (data == '2') {
						data = '<span class="label label-darkpink">文件导入</span>';
					} else if (data == '3') {
						data = '<span class="label label-purple">接口导入</span>';
					} else {
						data = '<span class="label label-Default">未知</span>';
					}
					return data;
				}
			}, {
				"targets" : [ 4 ],
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
					} else if (data == 32) {
						return wanquanshouhuo;
					} else {
						return '<span class="label label-danger graded">状态异常</span>';
					}
				}
			}, {
				"targets" : [ 5 ],
				"render" : function(data, type, full) {
					var delDocById = '<a href="javascript:void(0);" class="btn btn-danger btn-xs delDocById" data=' + data + '><i class="fa fa-minus"></i> 删除</a> ';
					var editDocById = '<a href="javascript:void(0);" class="btn btn-primary btn-xs editDocById" data=' + data + '><i class="fa fa-edit"></i> 编辑</a> ';
					var fenpeichuwei = '<a href="javascript:void(0);" class="btn btn-purple btn-xs fenpeichuwei" data=' + data + '><i class="fa fa-download"></i> 分配储位</a> ';
					var shangjia = '<a href="javascript:void(0);" class="btn btn-magenta btn-xs shangjia" data=' + data + '>上架</a> ';
					var relfenpeichuwei = '<a href="javascript:void(0);" class="btn btn-purple btn-xs relfenpeichuwei" data=' + data + '>取消分配</a> ';
					var printFenPeiDan = '<a href="javascript:void(0);" class="btn btn-magenta btn-xs printFenPeiDan" data=' + data + '>打印分配单</a> ';
					var relshangjia = '<a href="javascript:void(0);" class="btn btn-purple btn-xs relshangjia" data=' + data + '>取消上架</a> ';
					if (full.status == 1) {
						return delDocById + editDocById + fenpeichuwei;
					} else if (full.status == 21 || full.status == 22) {
						return shangjia + relfenpeichuwei+printFenPeiDan;
					} else if (full.status == 31 || full.status == 32) {
						return relshangjia;
					} else {
						return "---";
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
		var statusFun = '<div class="btn-group" id="statusChange"><a class="btn btn-blue status" href="javascript:void(0);" data="0">全部单据</a> <a class="btn btn-blue dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);" aria-expanded="false"><i class="fa fa-angle-down"></i></a><ul class="dropdown-menu dropdown-inverse"><li><a href="javascript:void(0);" class="status" data="1"><i class="fa fa-align-justify"></i> 初始入库单据</a></li><li class="divider"></li><li><a href="javascript:void(0);" class="status" data="21"><i class="fa fa-star-o"></i> 部分分配</a></li><li><a href="javascript:void(0);" class="status" data="22"><i class="fa fa-star"></i> 完全分配</a></li><li class="divider"></li><li><a href="javascript:void(0);" class="status" data="31"><i class="fa fa-square-o"></i> 部分上架</a></li><li><a href="javascript:void(0);" class="status" data="32"><i class="fa fa-square"></i> 完全上架</a></li></ul></div>';
		var addMfunrkDoc = '<button class="btn btn-default btn-palegreen mfunrkdocAdd"><i class="fa fa-plus"></i> 新增入库单</button>'
		var addMfunrkDocByExcel = '<button class="btn btn-default btn-purple mfunrkdocAddByExcel"><i class="fa fa-share-square"></i> excel导入</button>';
		
		$("div.DTTT.btn-group").append(statusFun);//status
		$("div.DTTT.btn-group").append(addMfunrkDoc); //手动新增
		$("div.DTTT.btn-group").append(addMfunrkDocByExcel); //excel 导入
		
		$("a.fenpeichuwei").on("click", function() {
			var rkdjId = $(this).attr("data");
			$("#aboutMfunrkdocEditLocation").modal({
				remote : getRootPath() + "/mfunrkdoc/fenpeichuwei?rkdjId=" + rkdjId
			});
		});

		$("a.printFenPeiDan").on("click", function() {
			var rkdjId = $(this).attr("data");
			$("#aboutMfunrkdocEditLocation").modal({
				remote : getRootPath() + "/mfunrkdoc/printFenPeiDan?rkdjId=" + rkdjId
			});
		});
		
		$("a.delDocById").on("click", function() {
			var rkdjId = $(this).attr("data");
			$.ajax({
				type : "POST",
				url : getRootPath() + "/mfunrkdoc/delDocById",
				cache : false,
				data : {
					"rkdjId":rkdjId
				},
				dataType : "json",
				success : function(data) {
					if(data.code=='success'){
						jumpPageByUrl(getRootPath() + "/mfunin/docmanager");
						$(".modal-backdrop").remove();
						layer.alert('操作成功！', {
							icon : 6
						});
					}else{
						layer.alert('操作失败！', {
							icon : 6
						});
					}
				}
			});
		});
		
		$("a.shangjia").on("click", function() {
			var rkdjId = $(this).attr("data");
			alert(rkdjId);
			$.ajax({
				type : "POST",
				url : getRootPath() + "/mfunrkdoc/shangjia",
				cache : false,
				data : {
					"rkdjId":rkdjId
				},
				dataType : "json",
				success : function(data) {
					if(data.code=='success'){
						jumpPageByUrl(getRootPath() + "/mfunin/docmanager");
						$(".modal-backdrop").remove();
						layer.alert('操作成功！', {
							icon : 6
						});
					}else{
						layer.alert('操作失败！', {
							icon : 6
						});
					}
				}
			});
		});
		
		$("#statusChange").find("a.status").on("click", function() {
			var data = $(this).attr("data");
			$('input[name="status"]').val(data);
			oTable.api().ajax.params();
			oTable.api().ajax.reload();
		});
		

		/**
		 * 新增一些入库单 通过excel
		 */
		$("button.mfunrkdocAddByExcel").on("click", function() {
			$("#aboutMfunrkdocFun").modal({
				remote : getRootPath() + "/mfunrkdoc/mfunrkdocAddByExcel"
			});
		});

		/**
		 * 新增入库单
		 */
		$("button.mfunrkdocAdd").on("click", function() {
			$("#aboutMfunrkdocFun").modal({
				remote : getRootPath() + "/mfunrkdoc/mfunrkdocAdd"
			});
		});

		$("a.mfunrkdocCheck").on("click", function() {
			var data = $(this).attr("data");
			$("#aboutMfunrkdocFun").modal({
				remote : getRootPath() + "/mfunrkdoc/mfunrkdocCheck?rkdj_id=" + data
			});
		});

		$("#aboutMfunrkdocFun").on("hidden.bs.modal", function() {
			$(this).removeData("bs.modal");
			$(".modal-backdrop").remove();
		});

		$("#aboutMfunrkdocEditLocation").on("hidden.bs.modal", function() {
			$(this).removeData("bs.modal");
			$(".modal-backdrop").remove();
		});

		/**
		 * 状态参数
		 */
		$("#statusChange").find("a.status").on("click", function() {
			var data = $(this).attr("data");
			$('input[name="status"]').val(data);
			oTable.api().ajax.params();
			oTable.api().ajax.reload();
			/*if(data==0){
				$("a.status").html('全部单据');
			}else if(data==1){
				$("a.status").html('<i class="fa fa-align-justify"></i> 初始入库单据');
			}*/
		});

		$('#reservation').daterangepicker({  
			//minDate: '01/01/2012',    //最小时间  
			maxDate : moment(), //最大时间   
			dateLimit : {
				days : 30
			}, //起止时间的最大间隔  
			showDropdowns : true,
			showWeekNumbers : false, //是否显示第几周  
//			timePicker : true, //是否显示小时和分钟  
			timePickerIncrement : 60, //时间的增量，单位为分钟  
			timePicker12Hour : false, //是否使用12小时制来显示时间  
			ranges : {
				
			   //'清空': [null, null],
	           '今天': [moment().startOf('day'), moment().endOf('day')],
			   '昨天' : [ moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day') ],
	           '最近7天': [moment().subtract(7, 'days'), moment()],
	           '最近30天': [moment().subtract(30, 'days'), moment()],
	           //'这个月': [moment().startOf('month'), moment().endOf('month')],
	           //'上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			
			},
			opens : 'right', //日期选择框的弹出位置  
			buttonClasses : [ 'btn btn-default' ],
			applyClass : 'btn-small btn-primary blue',
			cancelClass : 'btn-small',
			format : 'YYYY-MM-DD', //控件中from和to 显示的日期格式  
			separator : ' to ',
			locale: {
	           applyLabel: '确定',
	           cancelLabel: '取消',
	           fromLabel: '起始时间',
	           toLabel: '结束时间',
	           customRangeLabel: '自定义',
	           daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
	           monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
	               '七月', '八月', '九月', '十月', '十一月', '十二月'],
	           firstDay: 1
		    },
		    startDate: moment().add(1, 'day'),  
			endDate: moment().add(1, 'day')
		}, function(start, end, label) {//格式化日期显示框 
			$('button.timeChange_').html(start.format('YYYY-MM-DD') + '--' + end.format('YYYY-MM-DD'));
			$('input[name="reservation"]').val(start.format('YYYY-MM-DD') + '--' + end.format('YYYY-MM-DD'));
			//oTable.api().ajax.params();
			oTable.api().ajax.reload();
		});
	}

	return {

		init : function() {
			InitiateSearchableDataTable();

		}

	};

}();
