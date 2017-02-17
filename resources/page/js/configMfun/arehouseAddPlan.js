/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */

var ArehouseAddPlan = function() {
	
	/**
	 * 通过arehouse_id 获取对应已拥有的平面图
	 */
	var findPlansByArehouseId = function(){
		var arehouse_id = $("input[name='arehouseAddPlan']").val();
		$.ajax({
			url : getRootPath() + "/arehouse/findPlansByArehouseId",
			type : 'post',
			data : {
				arehouse_id:arehouse_id
			},
			success : function(data) {
				$.each(data,function(n,obj){
					var planId = obj.planId;
					$("input[id='"+planId+"']").attr("checked","checked");
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
	var arehouseAddPlanSubmit = function(){
		

		$("button.arehouseAddPlanSubmit").on("click",function(){
			var planId = $("input[name='planId']:checked").val();
			if (planId!=null&&planId!=''&&planId!=undefined) {
				layer.confirm('确认提交？', {
					btn : [ '确认修改图纸关联关系！', '取消操作' ]
				//按钮
				}, function() {
					var arehouse_id = $("input[name='arehouseAddPlan']").val();
					$.ajax({
						url : getRootPath() + "/arehouse/arehouseAddPlanAjax",
						type : 'post',
						data : {
							arehouse_id:arehouse_id,
							planId:planId
						},
						success : function(data) {
							if(data.code=='success'){
								$(".modal-backdrop").remove();
								jumpPageByUrl(getRootPath() + "/configmfun/arehousemanager");
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
			findPlansByArehouseId();
			arehouseAddPlanSubmit();
		}

	};

}();
