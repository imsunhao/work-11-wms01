/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */

var ClientAddGoods = function() {
	

	/**
	 * 通过client_id 获取对应已拥有的权限仓库
	 */
	var findGoodsListByClientId = function(){
		var client_id = $("input[name='clientAddGoods']").val();
		$.ajax({
			url : getRootPath() + "/client/findGoodsListByClientId",
			type : 'post',
			data : {
				client_id:client_id
			},
			success : function(data) {
				$.each(data,function(n,obj){
					var goodsId = obj.goodsId;
					$("input[name='"+goodsId+"']").attr("checked","checked");
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
	var clientAddGoodsSubmit = function(){
		

		$("button.clientAddGoodsSubmit").on("click",function(){
			var goods_ids= [];
			$("input:checked").each(function(){
				goods_ids.push($(this).val());
			});
			if (goods_ids.length > 0) {
				layer.confirm('你勾选了' + goods_ids.length + '个货品(重复的货品按最新的设置进行配置),确认继续？', {
					btn : [ '确认修改客户配置！', '取消操作' ]
				//按钮
				}, function() {
					var client_id = $("input[name='clientAddGoods']").val();
					$.ajax({
						url : getRootPath() + "/client/clientAddGoodsAjax",
						type : 'post',
						data : {
							client_id:client_id,
							goods_ids:goods_ids
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
			findGoodsListByClientId();
			clientAddGoodsSubmit();
		}

	};

}();
