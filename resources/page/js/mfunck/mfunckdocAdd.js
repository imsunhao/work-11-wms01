/**
 * Author:26309358@qq.com
 * Data: 2016.12
 * 
 */

var MfunckdocAdd = function() {

	var userAddFormFun = function() {
		var userAddForm = $("#mfunckdocAddForm");
		// 字符验证 
		userAddForm.validate({
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
				tags : {
					required : true
				}
				
				
			},
			messages : {
				rkdjNo : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于255个字符！",
					required : "<i class=\"fa fa-bolt \"></i> 必填内容！"
				},
				rkdjComeinfo : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于255个字符！"
				},
				tags : {
					required : "<i class=\"fa fa-bolt \"></i> 必填内容！"
				}

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
				var arehouse_id = $('#arehouse_id').val();
				var ckdjNo = $("input[name='ckdjNo']").val();
				var ckdjClientno = $("input[name='ckdjClientno']").val();
				var ckdjClientname = $("input[name='ckdjClientname']").val();
				var adress = $("input[name='adress']").val();
				var contacts = $("input[name='contacts']").val();
				var tel = $("input[name='tel']").val();
				var yfhsj = $("input[name='yfhsj']").val();
				alert("发货时间：" + yfhsj);
				var remarks = $("input[name='remarks']").val();
				var docsStr = $('#tags').val();
				$.ajax({
					url : getRootPath() + "/mfunckdoc/insertMfunckDocAndDocs",
					type : 'post',
					data : {
						"arehouse_id":arehouse_id,
						"ckdjNo" : ckdjNo,
						"ckdjClientno" : ckdjClientno,
						"ckdjClientname" : ckdjClientname,
						"adress" : adress,
						"contacts" : contacts,
						"tel" : tel,
						"yfhsj" : yfhsj,
						"remarks" : remarks,
						"docsStr" : docsStr
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
	
	$("button.addTags").on("click",function(){
		var goodsName = $("#e1").val();
		var goodsCount = $("input[name='goodsCount']").val();
		var goodsDw = $("#e4").val();
	
		if(goodsName==''||goodsCount==''||goodsDw==''||goodsDw==undefined){
			layer.alert('内容不能为空！')
		}else{
			var strarry = goodsName+"-"+goodsCount+"-"+goodsDw;
			//name no count dw
			var docs = strarry.split("-");
			$('#tags').addTag(docs[0]+"-"+docs[2]+"-"+$.trim(docs[3])+"-"+docs[1]);
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
			userAddFormFun();
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
