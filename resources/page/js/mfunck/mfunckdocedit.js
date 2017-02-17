/**
 * Author:26309358@qq.com
 * Data: 2016.12
 * 
 */

var MfunckdocEdit = function() {

	var userEditFormFun = function() {
		var userEditForm = $("#mfunckdocEditForm");
		// 字符验证 
		userEditForm.validate({
			errorElement : 'span',
			errorPlacement : function(error, element) {
				error.appendTo(element.parent().parent());
			},
			errorClass : 'help-block help-block-error col-sm-offset-2 col-sm-10',
			focusInvalid : false,
			ignore : "",
			rules : {
				rkdjNo : {
					maxlength : 255,
					required : true
				},
				rkdjComeinfo : {
					maxlength : 255
				},
//				tags : {
//					required : true
//				}
				
				
			},
			messages : {
				rkdjNo : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于255个字符！",
					required : "<i class=\"fa fa-bolt \"></i> 必填内容！"
				},
				rkdjComeinfo : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于255个字符！"
				},
//				tags : {
//					required : "<i class=\"fa fa-bolt \"></i> 必填内容！"
//				}

			},

			highlight : function(element) {
				$(element).closest('.form-group').addClass('has-error');
			},

			unhighlight : function(element) {
				$(element).closest('.form-group').removeClass('has-error');
			},

			success : function(label) {
				label.closest('.form-group').removeClass('has-error');
			},

			submitHandler : function(form) {
				var addGoodsTypeList = "";
				$("#editGoodsTable tbody").find("tr").each(function(){
					
					var tdArr = $(this).children();
					
					goodsCount = tdArr.eq(0).text()+"-"+
								 tdArr.eq(1).text()+"-"+
								 tdArr.eq(2).text()+"-"+
								 tdArr.eq(3).find('input').val();
								 
						         
					
					addGoodsTypeList = addGoodsTypeList+goodsCount + ",";
					
				});
				
				var arehouse_id = $('#arehouse_id').val();
				var ckdjId = $("input[name='ckdjId']").val();
				var ckdjNo = $("input[name='ckdjNo']").val();
				var ckdjClientno = $("input[name='ckdjClientno']").val();
				var ckdjClientname = $("input[name='ckdjClientname']").val();
				var adress = $("input[name='adress']").val();
				var contacts = $("input[name='contacts']").val();
				var tel = $("input[name='tel']").val();
				var yfhsj = $("input[name='yfhsj']").val();
				var remarks = $("input[name='remarks']").val();
				
				$.ajax({
					url : getRootPath() + "/mfunckdoc/editMfunckDocAndDocs",
					type : 'post',
					data : {
						"arehouse_id":arehouse_id,
						"ckdjNo" : ckdjNo,
						"ckdjId" : ckdjId,
						"ckdjClientno" : ckdjClientno,
						"ckdjClientname" : ckdjClientname,
						"adress" : adress,
						"contacts" : contacts,
						"tel" : tel,
						"yfhsj" : yfhsj,
						"remarks" : remarks,
						"addGoodsTypeList" : addGoodsTypeList
					},
					success : function(data) {
						console.log(data);
						if (data.code == 'success') {
							jumpPageByUrl(getRootPath() + "/mfunckdoc/mfunck/mfunckdocmanager");
							$(".modal-backdrop").remove();
							layer.alert('操作成功！', {
								icon : 6
							});
						} else if(data.code== 'exception'){
							layer.alert(data.msg, {
								icon : 6
							});
						} else{
							layer.alert('失败！', {
								icon : 6
							});
						}
					},
					error : function(data) {
						alert("网络异常");
					},
					dataType : "json"
				});

			}
		});
	}
	
//	function delgoodsById(data){
//		var id = data;
//		alert(id);
//	}
//	
//	$(".delgoodsByDjId").on("click",function(){
//		var ckmxId = $(".delgoodsByDjId").val();
//		alert("货品id:" + ckmxId);
//		var n;
//		if(ckmxId != null){
//			alert("feikong");
//			layer.confirm('确认删除？', {
//				  btn: ['确认','取消'] //按钮
//				}, function(){
//					
//					$.ajax({
//						type : "GET",
//						url : getRootPath() + "/mfunckdoc/mfunck/deleteGoodsByckdjId",
//						cache : false, // 禁用缓存
//						data : {ckmxId:ckmxId}, // 传入组装的参数
//						dataType : "json",
//						success : function(result) {
//							if(result.code=="1"){
//								n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
//					            $("#editGoodsTable").find("tr:eq("+n+")").remove();
//								layer.alert('操作成功！', {icon: 6});
//							}else{
//								layer.msg("删除失败", {icon: 2, time: 1200});
//							}
//						}
//					});
//					
//				}, function(){
//					layer.msg("取消操作！", {icon: 1, time: 900});
//				});
//		}else{
//			layer.confirm('确认删除？', {
//				  btn: ['确认','取消'] //按钮
//				}, function(){
//					n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
//		            $("#editGoodsTable").find("tr:eq("+n+")").remove();
//					layer.alert('操作成功！', {icon: 6});
//				});
//		}
//		
//	});
	
	var tagsinputfun = function(){
		$('#tags').tagsInput({
            width:'auto',
            defaultText:'清单信息',
            onAddTag:function(tag){
//                console.log('增加了'+tag)
            },
            onRemoveTag:function(tag){
//                console.log('删除了'+tag)
            }
        });
	}
	
//	$("button.addTags").on("click",function(){
//		var goodsName = $("#e1").val();
//		var goodsCount = $("input[name='goodsCount']").val();
//		var goodsDw = $("#e4").val();
//	
//		if(goodsName==''||goodsCount==''||goodsDw==''||goodsDw==undefined){
//			layer.alert('内容不能为空！')
//		}else{
//			var strarry = goodsName+"-"+goodsCount+"-"+goodsDw;
//			//name no count dw
//			var docs = strarry.split("-");
//			$('#tags').addTag(docs[0]+"-"+docs[2]+"-"+$.trim(docs[3])+"-"+docs[1]);
//		}
//	});
	
	$("button.addTags").bind('click',function(){
		var trs=$('#editGoodsTable').html();
		var goodsName = $("#e1").val();
		var goodsCount = $("input[name='goodsCount']").val();
		var goodsDw = $("#e4").val();
		
		if(goodsName==''||goodsCount==''||goodsDw==''||goodsDw==undefined){
			layer.alert('内容不能为空！')
		}else{
			var strarry = goodsName+"-"+goodsCount+"-"+goodsDw;
			//name no count dw
			var docs = strarry.split("-");

			var insertText = "<tr><td>"+docs[1]+"</td><td>"+docs[0]+"</td><td>"+$.trim(docs[3])+"</td><td><input type='text' name = 'cin' maxlength='value' value="+docs[2]+"></td><td><button type='button' class='btn btn-danger delgoodsByDjId' onclick='delgoodsByDjId();' value='"+docs[1]+"'>删除</button></td></tr>";
			var all=trs+insertText;
			   document.getElementById("editGoodsTable").innerHTML=all;
//			   deleteGoodsList();
		}


		
	});
	
	var selectdwFun = function(){
		$("#e3").change(function(){
			var e3Val = $(this).val();
			$.ajax({
				url:getRootPath() + "/mfunrkdoc/selectDw",
				type:"POST",
				dataType : "json",
				data:{
					code:e3Val
				},
				success:function(data){
					$("#e4").empty(); 
					$.each(data,function(n,obj){
						$("#e4").append('<option value="'+obj+'">'+obj+'</option>');
					});
				},
				error:function(data){
					alert('网络异常！');
				}
				
			});
		});
	}
	
	return {

		init : function() {
			selectdwFun();
//			$('#tags').tagsInput();
			userEditFormFun();
			tagsinputfun();
			var data = [{ id: 0, text: 'enhancement' }, { id: 1, text: 'bug' }, { id: 2, text: 'duplicate' }, { id: 3, text: 'invalid' }, { id: 4, text: 'wontfix' }];

			$("#e1").select2();
			$("#arehouse_id").select2();
			$("#e3").select2();
			$("#e4").select2();
//			 $("#e1").select2();
//			$('#tags').addTag('foo');
//			$('#tags').val();
		}

	};

}();
