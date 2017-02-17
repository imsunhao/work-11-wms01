/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */

var Userlogininfo = function() {

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
					// console.log('callback');
				}
			},
			"ajax" : function(data, callback, settings) {
				var param = {};
				param.pageSize = data.length;
				param.pageNum = (data.start / data.length) + 1;
				param.draw = data.draw;
				// console.log(data);
				$.ajax({
					type : "GET",
					url : getRootPath() + "/syslog/userlogininfoByPage",
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
						// ajaxClickFun();
					}
				});
			},
			"columns" : [ {
				"data" : "historyId",
				"bSortable" : false
			}, {
				"data" : "hLoginname",
				"bSortable" : false
			}, {
				"data" : "hUsername",
				"bSortable" : false
			}, {
				"data" : "hIp",
				"bSortable" : false
			}, {
				"data" : "hDomodel",
				"bSortable" : false
			}, {
				"data" : "createtime",
				"bSortable" : false
			} ],
			"columnDefs" : [ {
				"targets" : [ 0 ],
				"render" : function(data, type, full) {
					return "<input name='historyId' value='" + data + "' style='display:none' />";
				}
			}, {
				"targets" : [ 1 ],
				"render" : function(data, type, full) {
					if (data.length < 10) {
						if (data.length == 0)
							return "----";
						return data;
					} else {
						return data.substring(1, 10) + "...";
					}
				}
			}, {
				"targets" : [ 3 ],
				"render" : function(data, type, full) {
					if(data==''|| data==null){
						return "----";
					}else{
						return data;
					}
				}
			},{
				"targets" : [ 5 ],
				"render" : function(data, type, full) {
					return new Date(data).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
				}
			} ]
		});
		
//		findLoginNameDISTINCTAjax();
		
		/**
		 * 追加功能按钮
		 */
		$("div.DTTT.btn-group").empty();
		
		var modalFun ='<div class="btn-group"><a class="btn btn-blue dropdown-toggle" data-toggle="dropdown" aria-expanded="false">按照操作方式查询 <i class="fa fa-angle-down"></i></a><ul class="dropdown-menu"><li><a href="javascript:void(0);">Action</a></li></ul></div>';
		var userFun ='<div class="btn-group"><a class="btn btn-purple dropdown-toggle" data-toggle="dropdown" aria-expanded="false">按照用户查询方式查询 <i class="fa fa-angle-down"></i></a><ul class="dropdown-menu"><li><a href="javascript:void(0);">Action</a></li></ul></div>';
		
		$("div.DTTT.btn-group").append(modalFun);
		$("div.DTTT.btn-group").append(userFun);
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-darkorange deleteArehouses"><i class="fa fa-minus"></i> 批量删除</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-magenta editArehouse"><i class="fa fa-edit"></i>编辑</button>');

		var findLoginNameDISTINCTAjax = function(){
			$.ajax({
				url:getRootPath() + "/syslog/findLoginNameDISTINCTAjax",
				type:"POST",
				cache : false,
				data : param,
				dataType : "json",
				success : function(result) {
					console.log(result);
					
				}
				
			});
		}
		
		/*
		 * var ajaxClickFun = function(){ //为客户 配置仓库
		 * $('button.aboutGoodsModal').on("click", function() { var client_id =
		 * $(this).attr("data"); $("#aboutClientModal").modal({ remote :
		 * getRootPath() + "/client/clientAddArehouseJumpModal?client_id=" +
		 * client_id }); });
		 * 
		 * //为客户配置货物 $('button.clientAddGoodsJumpModal').on("click", function() {
		 * var client_id = $(this).attr("data"); $("#aboutGoodsModal").modal({
		 * remote : getRootPath() + "/client/clientAddGoodsJumpModal?client_id=" +
		 * client_id }); }); }
		 * 
		 * 
		 * $("#aboutGoodsModal").on("hidden.bs.modal", function() {
		 * $(this).removeData("bs.modal"); });
		 */
	}

	return {

		init : function() {
			InitiateSearchableDataTable();
		}

	};

}();
