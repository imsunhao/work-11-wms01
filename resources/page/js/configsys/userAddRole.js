/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */


var UserAddRole = function() {
	
	var findRmsRoleByUserId = function(){
		var uid = $("input[name='uidPageRole']").val();
		$.ajax({
			url : getRootPath() + "/authority/findRmsRoleByUserId",
			type : 'post',
			data : {
				uid:uid
			},
			success : function(data) {
				$.each(data,function(n,obj){
					var rid = obj.rid;
					$("input[name='"+rid+"']").attr("checked","checked");
				});
			},
			error : function(data) {
				alert("网络异常");
			},
			dataType : "json"
		});
	}
	
	var userAddRoleAjax = function(){
		
		$("button.userAddRoleSubmit").on("click",function(){
			var rids = [];
			$("input:checked").each(function(){
				rids.push($(this).val());
			});
			if (rids.length > 0) {
				layer.confirm('你勾选了' + rids.length + '个角色,确认继续？', {
					btn : [ '确认修改角色配置！', '取消操作' ]
				//按钮
				}, function() {
					var uid = $("input[name='uidPageRole']").val();
					$.ajax({
						url : getRootPath() + "/authority/userAddRoles",
						type : 'post',
						data : {
							uid:uid,
							rids:rids
						},
						success : function(data) {
							if(data.code=='success'){
								$(".modal-backdrop").remove();
								jumpPageByUrl(getRootPath() + "/configsys/authority/usermanager");
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
					icon : 1
				});
			}
		});
	}

	return {

		init : function() {
			findRmsRoleByUserId();
			userAddRoleAjax();
		}

	};

}();
