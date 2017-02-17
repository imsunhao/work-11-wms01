/**
 * Author:26309358@qq.com 
 * Data: 2016.12
 * 
 */


var RoleAddClient = function() {
	
	var findBaseClientByRoleId = function(){
		var rid = $("input[name='roldPageRid']").val();
		$.ajax({
			url : getRootPath() + "/authority/findBaseClientByRoleId",
			type : 'post',
			data : {
				rid:rid
			},
			success : function(data) {
				$.each(data,function(n,obj){
					var clientId = obj.clientId;
					$("input[name='"+clientId+"']").attr("checked","checked");
				});
			},
			error : function(data) {
				alert("网络异常");
			},
			dataType : "json"
		});
	}
	
	var roleAddClientAjax = function(){
		
		$("button.roleAddClientSubmit").on("click",function(){
			var client_ids = [];
			$("input:checked").each(function(){
				client_ids.push($(this).val());
			});
			if (client_ids.length > 0) {
				layer.confirm('你勾选了' + client_ids.length + '个客户,确认继续？', {
					btn : [ '确认修改客户配置！', '取消操作' ]
				//按钮
				}, function() {
					var rid = $("input[name='roldPageRid']").val();
					$.ajax({
						url : getRootPath() + "/authority/roleAddClientAjax",
						type : 'post',
						data : {
							rid:rid,
							client_ids:client_ids
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
			findBaseClientByRoleId();
			roleAddClientAjax();
		}

	};

}();
