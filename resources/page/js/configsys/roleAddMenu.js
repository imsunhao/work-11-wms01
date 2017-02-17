/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */

var RoleAddMenu = function() {
	var zTreeObj;
	var zNodesByAjax = function(){
		$.ajax({
			url : getRootPath() + "/authority/findAllBaseMenus",
			type : 'post',
			data : {},
			success : function(data) {
				var zNodes=[];
				$.each(data,function(n,obj){
					var menuId = obj.menuId;
					var parentMenuId = obj.parentMenuId;
					var menuName = obj.menuName;
					zNodes.push({"id":menuId,"pId":parentMenuId,"name":menuName,"open":true});
				});
				drawTree1(zNodes);
			},
			error : function(data) {
				alert("网络异常");
			},
			dataType : "json"
		});
	}
	var drawTree1 = function(zNodes) {
		var setting = {
			showLine : true,
			checkable : true,
			check: {
				enable: true
			},
			callback: {
				/*onClick : function(event, treeId, treeNode){
					 var node = zTreeObj.getNodeByParam("id", treeNode.id, null);
					 zTreeObj.checkNode(node, true, true);
				}*/
			},
			data : {
				simpleData : {
					enable : true
				}
			}
		};
		var zNodes = zNodes;
		
		zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
		checkSomeNodeByRoleId();
		
		//提价修改
		$("button.submitAllCheck").on("click",function(){
			var allCheckedNodes = zTreeObj.getCheckedNodes(true);
			var menu_ids = [];
			$.each(allCheckedNodes,function(n,obj){
				menu_ids.push(obj.id);
			});
			if (menu_ids.length > 0) {
				layer.confirm('勾选了'+menu_ids.length+'条菜单数据，是否继续？', {
					btn : [ '确认修改菜单权限配置！', '取消操作' ]
				//按钮
				}, function() {
					var rid = $("input[name='roleAddMenu']").val();
					$.ajax({
						url : getRootPath() + "/authority/roleAddMenusAjax",
						type : 'post',
						data : {
							rid:rid,
							menu_ids:menu_ids
						},
						success : function(data) {
							if(data.code=='success'){
								$(".modal-backdrop").remove();
								jumpPageByUrl(getRootPath() + "/configsys/authority/rolemanager");
								layer.msg('配置成功！', {icon: 1});
							}else{
								layer.msg('配置失败！', {icon: 1});
							}
						},
						error : function(data) {
							alert("网络异常");
						},
						dataType : "json"
					});
				}, function() {
					layer.msg('取消操作成功', {
						icon : 6
					});
				});
			}else{
				layer.msg('你没有勾选任何数据！', {
					icon : 2
				});
			}
		});
		//全选
		$("button.checkAllNodes").on("click",function(){
			zTreeObj.checkAllNodes(true);
		});
		//取消全选
		$("button.noCheckAllNodes").on("click",function(){
			zTreeObj.checkAllNodes(false);
		});
		
	}
	
	/**
	 * 通过角色id获取这个角色已经存在的菜单权限 并勾选
	 */
	var checkSomeNodeByRoleId = function(){
		var rid = $("input[name='roleAddMenu']").val();
		$.ajax({
			url : getRootPath() + "/authority/checkSomeNodeByRoleId",
			type : 'post',
			data : {
				rid:rid
			},
			success : function(data) {
				$.each(data,function(n,obj){
					var menuId = obj.menuId;
					var node = zTreeObj.getNodeByParam("id", menuId, null);
					if(!node.isParent){
						zTreeObj.checkNode(node, true, true);
					}
				});
			},
			error : function(data) {
				alert("网络异常");
			},
			dataType : "json"
		});
	}
	
	

	return {

		init : function() {
			zNodesByAjax();
		}

	};

}();
