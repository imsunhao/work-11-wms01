/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */

var Rkrbcx = function() {
	
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
				var reservation = $('input[name="reservation"]').val();
				
				if(status==undefined||status==''||status==0){
					status = null;
				}
				if(arehouseId==undefined||arehouseId==''||arehouseId==0){
					arehouseId = null;
				}
				if(reservation == undefined || reservation == '' || reservation == 0){
					reservation = null;
				}
				$.ajax({
					type : "GET",
					url : getRootPath() + "/main/findRBMfunrkDocListByPage",
					cache : false,
					data : {
						pageNum : (data.start / data.length) + 1,
						pageSize : data.length,
						draw : data.draw,
						status:status,
						search:$("input[type='search']").val(),
						arehouseId:arehouseId,
						reservation:reservation
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
					return '<a class="btn btn-link mfunrkdocCheck" data="'+full.rkdjId+'">'+data+'</a>';
				}
			}, {
				"targets" : [ 2 ],
				"render" : function(data, type, full) {
					return new Date(data).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
				}
			}, {
				"targets" : [ 3 ],
				"render" : function(data, type, full) {
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
				"targets" : [ 4 ],
				"render" : function(data, type, full) {
					var delDocById = '<a href="javascript:void(0);" class="btn btn-danger btn-xs checkRkHistory" data=' + data + '><i class="fa fa-minus"></i> 跟踪日志信息</a> ';
					return delDocById;
				}
			} ],
			initComplete : initComplete
		});
	}

	function initComplete(data) {
		
	}

	var ajaxButtonFun = function() {
		
		/**
		 * 追加功能按钮
		 */
		$.ajax({
			url:getRootPath() + "/main/findArehouseInfoByActiveUser",
			type:"GET",
			cache : false,
			data : {},
			dataType : "json",
			success : function(result) {
				$("div.DTTT.btn-group").empty();
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
					$("div.paramInfo span.arehouseid_").append("仓库搜索参数："+nameVal);
				});
			}
		});
		
		/**
		 * 弹出历史记录
		 */
		$("a.checkRkHistory").on("click", function() {
			var rkdj_id = $(this).attr("data");
			$("#checkRkHistory").modal({
				remote : getRootPath() + "/main/checkRkHistory?rkdj_id="+rkdj_id
			});
		});
		
		$("a.mfunrkdocCheck").on("click", function() {
			var data = $(this).attr("data");
			$("#aboutRkrbcxFun").modal({
				remote : getRootPath() + "/main/rkrbcxCheck?rkdj_id=" + data
			});
		});

		$("#checkRkHistory").on("hidden.bs.modal", function() {
			$(this).removeData("bs.modal");
			$(".modal-backdrop").remove();
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
			locale : {
				applyLabel : '确定',
				cancelLabel : '取消',
				fromLabel : '起始时间',
				toLabel : '结束时间',
				customRangeLabel : '自定义',
				daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
				monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ],
				firstDay : 1
			},
			startDate: moment().add(1, 'day'),  
			endDate: moment().add(1, 'day')
		}, function(start, end) {//格式化日期显示框  
			$('button.timeChange_').html(start.format('YYYY-MM-DD') + '--' + end.format('YYYY-MM-DD'));
			$('input[name="reservation"]').val(start.format('YYYY-MM-DD') + '--' + end.format('YYYY-MM-DD'));
			oTable.api().ajax.params();
			oTable.api().ajax.reload();
		});
	}

	return {

		init : function() {
			InitiateSearchableDataTable();
		}

	};

}();
