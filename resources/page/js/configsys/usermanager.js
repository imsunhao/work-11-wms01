/**
 * Author:26309358@qq.com
 * Data: 2016.12
 * 
 */

var Usermanager = function() {

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
					url : getRootPath() + "/authority/findRmsUserListByPage",
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
						addRole();
						liveOrdie();
						/*live();
						die();*/
						//  						userRoloManager();
						/*updatePlan();
						$('input').iCheck({
							checkboxClass : 'icheckbox_minimal-blue',
							radioClass : 'iradio_minimal-blue',
							increaseArea : '20%'
						});*/
						//  						console.log(returnData);
					}
				});
			},
			"columns" : [ {
				"data" : "uid",
				"bSortable" : false
			}, {
				"data" : "userName",
				"bSortable" : false
			}, {
				"data" : "loginName",
				"bSortable" : false
			}, {
				"data" : "phone",
				"bSortable" : false
			}, {
				"data" : "status",
				"bSortable" : false
			}, {
				"data" : "createTime",
				"bSortable" : false
			}, {
				"data" : "lastModifiedTime",
				"bSortable" : false
			}, {
				"data" : "uid",
				"bSortable" : false
			} ],
			"columnDefs" : [ {
				"targets" : [ 0 ],
				"render" : function(data, type, full) {
					return "<input name='uid' value='" + data + "' style='display:none' />";
				}
			}, {
				"targets" : [ 3 ],
				"render" : function(data, type, full) {
					if (data == '') {
						data = '----';
					}
					return data;
				}
			}, {
				"targets" : [ 4 ],
				"render" : function(data, type, full) {
					/*var live = '<span class="label label-blueberry live">已启用</span>';
					var die = '<span class="label label-darkorange die">被禁用</span>';*/
					var live = '<a class="btn btn-primary btn-xs liveOrdie" data="' + full.uid + '">已启用</a>';
					var die = '<a class="btn btn-primary btn-xs liveOrdie" data="' + full.uid + '">被禁用</a>';
					if (full.uid != 1) {
						if (data == 1) {
							return live;
						} else if (data == 0) {
							return die;
						} else {
							return "超出范围";
						}
					}else {
						return '----';
					}
				}
			}, {
				"targets" : [ 5 ],
				"render" : function(data, type, full) {
					return new Date(data).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
				}
			}, {
				"targets" : [ 6 ],
				"render" : function(data, type, full) {
					return new Date(data).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
				}
			}, {
				"targets" : [ 7 ],
				"render" : function(data, type, full) {
					if (data != 1) {
						return '<a class="btn btn-primary btn-xs addRole" data="' + data + '"><i class="fa fa-gear"></i> 配置角色</a>';
					} else {
						return '----';
					}

				}
			} ]
		});

		/**
		 * 追加功能按钮
		 */
		$("div.DTTT.btn-group").empty();
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-palegreen addUser"><i class="fa fa-plus"></i> 新增用户</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-darkorange deleteUsers"><i class="fa fa-minus"></i> 批量删除</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-maroon resetPd"><i class="fa fa-share-square"></i> 重置密码</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-magenta editUser"><i class="fa fa-edit"></i>编辑</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-sky live">启用账户</button>');
		$("div.DTTT.btn-group").append('<button class="btn btn-default btn-purple die">禁用账户</button>');

		/**
		 * 新增用户
		 */
		$('button.addUser').on("click", function() {
			$("#aboutUserModal").modal({
				remote : getRootPath() + "/authority/userAdd"
			});
		});
		
		/**
		 * 删除用户
		 */
		$('button.deleteUsers').on("click", function() {
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
		 * 重置密码
		 */
		$('button.resetPd').on("click", function() {
			var uids = [];
			$('#searchable tbody tr.active').find("input[name='uid']").each(function() {
				var uid = $(this).val();
				if (uid != 1)
					uids.push(uid);
			});
			if (uids.length > 0) {
				layer.confirm('你确定将这' + uids.length + '个用户的密码重置为123456吗?', {
					btn : [ '确认重置！', '取消操作' ]
				//按钮
				}, function() {
					$.ajax({
						url : getRootPath() + "/authority/resetPwd",
						type : 'post',
						data : {
							uids:uids
						},
						success : function(data) {
							if(data.code=='success'){
								$(".modal-backdrop").remove();
								jumpPageByUrl(getRootPath() + "/configsys/authority/usermanager");
								layer.msg('密码重置成功！', {icon: 1,time: 1200});
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
		 * 编辑用户
		 */
		$('button.editUser').on("click", function() {
			var uids = [];
			$('#searchable tbody tr.active').find("input[name='uid']").each(function() {
				var uid = $(this).val();
				if (uid != 1)
					uids.push(uid);
			});
			if (uids.length ==1 ) {
				var uid = uids[0];
				$("#aboutUserModal").modal({
					remote : getRootPath() + "/authority/userEdit?uid=" + uid
				});
			}else{
				layer.msg('请选择 1 条数据！', {
					icon: 6,time: 1200
				});
			}
		});
		
		/**
		 * 启用或禁用单个用户账户
		 */
			var liveOrdie = function() {
				$("a.liveOrdie").on("click", function() {
					var uid = $(this).attr("data");
					layer.confirm('确认修改用户状态？', {
						btn : [ '确认', '取消' ]
					//按钮
					}, function() {

						$.ajax({
							url : getRootPath() + "/authority/liveOrdieUserByUid",
							type : 'post',
							data : {
								uid : uid
							},
							success : function(data) {
								if(data.code=='success'){
									$(".modal-backdrop").remove();
									jumpPageByUrl(getRootPath() + "/configsys/authority/usermanager");
									layer.msg('修改成功！', {icon: 1,time: 1200});
								}
							},
							error : function(data) {
								alert("网络异常");
							},
							dataType : "json"
						});

					}, function() {
						layer.msg("取消操作！", {
							icon : 9,
							time : 1200
						});
					});
				});
			}
		
		/**
		 * 批量启用用户
		 */
			$('button.live').on("click", function() {
				var uids = [];
				$('#searchable tbody tr.active').find("input[name='uid']").each(function() {
					var uid = $(this).val();
					if (uid != 1)
						uids.push(uid);
				});
				if (uids.length > 0) {
					layer.confirm('你要启用这' + uids.length + '条数据(超级管理员无法被编辑)?', {
						btn : [ '确认启用！', '取消操作' ]
					//按钮
					}, function() {
						$.ajax({
							url : getRootPath() + "/authority/liveUsersByUids",
							type : 'post',
							data : {
								uids:uids
							},
							success : function(data) {
								if(data.code=='success'){
									$(".modal-backdrop").remove();
									jumpPageByUrl(getRootPath() + "/configsys/authority/usermanager");
									layer.msg('启用成功！', {icon: 1,time: 1200});
								}
							},
							error : function(data) {
								alert("网络异常");
							},
							dataType : "json"
						});
					}, function() {
						layer.msg('取消操作成功', {
							icon : 9,
							time : 1200
						});
					});
				}else{
					layer.msg('你没有选择任何数据！', {
						icon: 6,time: 1200
					});
				}
			});
			
		/**
		 * 批量禁用用户
		 */
			$('button.die').on("click", function() {
				var uids = [];
				$('#searchable tbody tr.active').find("input[name='uid']").each(function() {
					var uid = $(this).val();
					if (uid != 1)
						uids.push(uid);
				});
				if (uids.length > 0) {
					layer.confirm('你要禁用这' + uids.length + '条数据(超级管理员无法被编辑)?', {
						btn : [ '确认禁用！', '取消操作' ]
					//按钮
					}, function() {
						$.ajax({
							url : getRootPath() + "/authority/dieUsersByUids",
							type : 'post',
							data : {
								uids:uids
							},
							success : function(data) {
								if(data.code=='success'){
									$(".modal-backdrop").remove();
									jumpPageByUrl(getRootPath() + "/configsys/authority/usermanager");
									layer.msg('禁用成功！', {icon: 1,time: 1200});
								}
							},
							error : function(data) {
								alert("网络异常");
							},
							dataType : "json"
						});
					}, function() {
						layer.msg('取消操作成功', {
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
		 * 为用户配置角色
		 */
		var addRole = function() {
			$('a.addRole').on("click", function() {
				var user_id = $(this).attr("data");
				$("#aboutUserModal").modal({
					remote : getRootPath() + "/authority/userAddRole?uid=" + user_id
				});
			});
		}
		
		$("#aboutUserModal").on("hidden.bs.modal", function() {
			$(this).removeData("bs.modal");
			/*layer.msg('缓存清空！', {
				time: 100,
				icon : 3
			});*/
		});

		
		
		
		
		/*		 $("tfoot input").keyup(function () {
		 oTable.fnFilter(this.value, $("tfoot input").index(this));
		 });
		 $('#searchable tbody').on( 'click', 'tr', function () {
		 //			 var data = oTable.row(this).data();
		 console.log(oTable);
		 alert( 'You clicked on '+data[0]+'\'s row' );
		 } );
		
		 $('#button').click( function () {
		 alert( table.rows('.selected').data().length +' row(s) selected' );
		 } );*/
	}

	return {

		init : function() {
			InitiateSearchableDataTable();
		}

	};

}();
