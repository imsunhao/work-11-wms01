/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */

var ClientAddArehouse = function() {
	
	/**
	 * 通过client_id 获取对应已拥有的权限仓库
	 */
	var findArehousesByClientId = function(){
		var client_id = $("input[name='clientAddArehouseCid']").val();
		$.ajax({
			url : getRootPath() + "/client/findArehousesByClientId",
			type : 'post',
			data : {
				client_id:client_id
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
	
	/**
	 * 
	 */
	var clientAddArehouseSubmit = function(){
		

		$("button.clientAddArehouseSubmit").on("click",function(){
			var arehouse_ids = [];
			$("input:checked").each(function(){
				arehouse_ids.push($(this).val());
			});
			if (arehouse_ids.length > 0) {
				layer.confirm('你勾选了' + arehouse_ids.length + '个仓库,确认继续？', {
					btn : [ '确认修改客户配置！', '取消操作' ]
				//按钮
				}, function() {
					var client_id = $("input[name='clientAddArehouseCid']").val();
					$.ajax({
						url : getRootPath() + "/client/clientAddArehouseAjax",
						type : 'post',
						data : {
							client_id:client_id,
							arehouse_ids:arehouse_ids
						},
						success : function(data) {
							if(data.code=='success'){
								$(".modal-backdrop").remove();
								jumpPageByUrl(getRootPath() + "/configmfun/clientmanager");
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
			findArehousesByClientId();
			clientAddArehouseSubmit();
		}

	};

}();
