/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */


var RoleAddArehouse = function() {
	var findBaseArehouseByRoleId = function(){
		var rid = $("input[name='rolePageArehouse']").val();
		$.ajax({
			url : getRootPath() + "/authority/findBaseArehouseByRoleId",
			type : 'post',
			data : {
				rid:rid
			},
			success : function(data) {
				$.each(data,function(n,obj){
					
					var arehouseId = obj.arehouseId;
					$("input[name='"+arehouseId+"']").attr("checked","checked");
				});
			},
			error : function(data) {
				alert("网络异常");
			},
			dataType : "json"
		});
	}
	
	var roleAddArehouseAjax = function(){
		
		$("button.roleAddArehouseAjax").on("click",function(){
			var arehouse_ids = [];
			$("input:checked").each(function(){
				arehouse_ids.push($(this).val());
			});
			if (arehouse_ids.length > 0) {
				layer.confirm('你勾选了' + arehouse_ids.length + '个仓库,确认继续？', {
					btn : [ '确认修改客户配置！', '取消操作' ]
				//按钮
				}, function() {
					var rid = $("input[name='rolePageArehouse']").val();
					$.ajax({
						url : getRootPath() + "/authority/roleAddArehouseAjax",
						type : 'post',
						data : {
							rid:rid,
							arehouse_ids:arehouse_ids
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
						icon : 1
					});
				});
			}else{
				layer.msg('你没有勾选任何数据！', {
					icon : 5
				});
			}
		});
	}
	
	return {

		init : function() {
			findBaseArehouseByRoleId();
			roleAddArehouseAjax();
		}

	};

}();
