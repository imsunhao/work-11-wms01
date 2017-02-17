/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */

var MfunrkdocEditLocation_ = function() {
	var initFun = function() {
		
		/**
		 * 想通过select2下拉数据
		 */
		/*var rkdjId = $('input[name="rkdjId"]').val();
		var datas = [];
		$.ajax({
			type : "POST",
			url : getRootPath() + "/mfunrkdoc/findArelocationsByRkdjId",
			cache : false,
			data : {
				"rkdjId":rkdjId
			},
			dataType : "json",
		    success:function(data){
		    	
		    	$.each(data,function(n,obj){
		    		var lname = obj.lname;
		    		var lno = obj.lno;
		    		var locationId = obj.locationId;
		    		var planId = obj.planId;
		    		datas.push({id:planId,text:lname});  //[{id:planId,text:lname},{id:planId,text:lname},{id:planId,text:lname}]
		    	});
		    	
		    }
			
		});*/
		
		$('button.addTr').on('click',function(){
			var goodno = $(this).parent().parent().children('td').eq(0).get(0).innerText;
			var goodname = $(this).parent().parent().children('td').eq(1).get(0).innerText;
			var goodcount = $(this).parent().parent().children('td').eq(2).get(0).innerText;
			var goodunit = $(this).parent().parent().children('td').eq(3).get(0).innerText;
			var dataCount = 0;
			 $('input[name="'+goodname+'count"]').each(function(){
				 var data=new Number($(this).val());
				 dataCount+=data;
			 });
			 var chazhi = goodcount-dataCount;
			 if(chazhi<0){
				 chazhi=0;
			 }
			 
			var planId = $('input[name="planId"]').val();
			
			 $("tbody.data_").append('<tr><td><a class="btn btn-darkorange btn-xs lookPlan" data="'+planId+'">查询仓库占用</a></td><td><input type="text" class="form-control input-small" name="lno"></td><td><input type="text" class="form-control input-small" name="lname"></td><td><input type="text" class="form-control input-small count" name="'+goodname+'count" style="width:130px" value="'+chazhi+'"></td><td>'+goodunit+'</td>    <td><input type="text" class="form-control input-small" name="pc"></td>   <td>'+goodno+'</td>  <td>'+goodname+'</td><td><button class="btn btn-danger btn-xs deleteOneRow">删除</button></td></tr>') ;
			 $('button.deleteOneRow').on('click',function(){
				$(this).parent().parent().remove(); 
			});
			/* $('select.lname').select2({
				 data: datas,
				  placeholder:'请选择',
				  allowClear:true
			 });*/
			 
			 
			 aboutSettingLocationJumpModal();
		});
		
		
		var aboutSettingLocationJumpModal = function(){
			
			$('a.lookPlan').on("click", function() {
				
				var plan_id = $(this).attr("data");
				$.ajax({
					url : getRootPath() + "/mfunrkdoc/mfunrkLookPlan?plan_id="+plan_id,
					type : "GET",  
					contentType: 'application/json',
					data:null,
					success : function(res) {
						layer.open({
						  type: 1,
						  title: false,
						  closeBtn: 0,
						  shadeClose: true,
						  fixed: false, //不固定
						  skin: 'yourclass',
						  area: ['80%', '70%'], //宽高
						  content: res,
						  end: function () {
							  console.log(location);
				            }
						});
					},
			        error: function(data) {
			        	alert("openModalAddLocation is error!");
			        }
				});
			});
		}
		
	
	}
	return {
		init : function() {
			initFun();
			
			
			$('button.submitInfo').on('click',function(){
				
				/*var data_goods = []
				$('#goods').find('tr').each(function(){
					var goodsno = $(this).children('td').eq(0).get(0).innerText;
					var goodsname = $(this).children('td').eq(1).get(0).innerText;
					var goodscount = $(this).children('td').eq(2).get(0).innerText;
					var goodsunit = $(this).children('td').eq(3).get(0).innerText;
					
					data_goods.push({goodsno:goodsno,goodsname:goodsname,goodscount:goodscount,goodsunit:goodsunit});
				});*/
				
				var data_array = [];
				var rkdjId = $('input[name="rkdjId"]').val();
				$('.data_').find('tr').each(function(){
					
					var planId = $(this).children('td').eq(0).find('a').attr('data');
					var lno = $(this).children('td').eq(1).find('input[name="lno"]').val();
					var lname = $(this).children('td').eq(2).find('input[name="lname"]').val();
					var count = $(this).children('td').eq(3).find('input').val();
					var unit = $(this).children('td').eq(4).get(0).innerText;
					var pc = $(this).children('td').eq(5).find('input').val();
					var goodno = $(this).children('td').eq(6).get(0).innerText;
					var goodname = $(this).children('td').eq(7).get(0).innerText;
					
					data_array.push({rkdjId:rkdjId,planId:planId,locationLno:lno,locationLname:lname,distributionlistCount:count,distributionlistUnit:unit,distributionlistBatch:pc,goodsNo:goodno,goodsName:goodname,status:1});
					
				});
				
				var mfunrkDistributionlists = JSON.stringify(data_array);
				layer.confirm('确定提交这些数据？', {
					  btn: ['提交(暂未编写验证规则)','取消'] //按钮
					}, function(){
						//submitInfo
						$.ajax({
							url : getRootPath() + "/mfunrkdoc/submitInfo_",
							type : "POST",  
							contentType: 'application/json;charset=utf-8',
							cache : false,
							data : mfunrkDistributionlists,
							bRetrieve:true,
							dataType : "json",
							success : function(result) {
								var code = result.code;
								if(code=='success'){
									jumpPageByUrl(getRootPath() + "/mfunin/docmanager");
									$(".modal-backdrop").remove();
									layer.alert('操作成功！', {
										icon : 6
									});
								}else{
									layer.alert('操作失败！', {
										icon : 3
									});
								}
							},
							error:function(result){
								console.log(result);
							}
						});
						
					});
			});
		}
	};

}();
