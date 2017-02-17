/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */

var GoodsAdd = function() {

	var goodsAddForm = function() {
		var userAddForm = $("#goodsAddForm");
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
				goodsNo : {
					maxlength : 255,
					required : true
				},
				goodsName : {
					maxlength : 32
				},
				name_jc : {
					maxlength : 10,
					required : true
				},
				tit : {
					number:true
				},
				tii : {
					number:true
				},
				hsl : {
					number:true
				}

			},
			messages : {
				goodsNo : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于255个字符！",
					required : "<i class=\"fa fa-bolt \"></i> 必填内容！"
				},
				goodsName : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于32个字符！",
				},
				name_jc : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于10个字符！",
					required : "<i class=\"fa fa-bolt \"></i> 必填内容！"
				},
				tit : {
					number : "<i class=\"fa fa-bolt \"></i> 必须是数字！"
				},
				tii : {
					number : "<i class=\"fa fa-bolt \"></i> 必须是数字！"
				},
				hsl : {
					number : "<i class=\"fa fa-bolt \"></i> 必须是数字！"
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
				var baseContainer_ = $('#baseContainer_').val();
				var baseBulk_ = $('#baseBulk_').val();
				
				var goodsNo = $("input[name='goodsNo']").val();
				var goodsName = $("input[name='goodsName']").val();
				var name_jc = $("input[name='name_jc']").val();
				var tit = $("input[name='tit']").val();
				var tii = $("input[name='tii']").val();
				var hsl = $("input[name='hsl']").val();
				
				$.ajax({
					url : getRootPath() + "/goods/insertGoods",
					type : 'post',
					data : {
						"no" : goodsNo,
						"name" : goodsName,
						"nameJc" : name_jc,
						"zxdw" : baseContainer_,
						"szdw" : baseBulk_,
						"tit" : tit,
						"tii" : tii,
						"hsl" : hsl,
						"status" : 1
					},
					success : function(data) {
						if (data.code == 'success') {
							jumpPageByUrl(getRootPath() + "/configmfun/goodsmanager");
							$(".modal-backdrop").remove();
							layer.alert('操作成功！', {
								icon : 6
							});
						} else {
							layer.alert('操作失败！', {
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


	return {

		init : function() {
			goodsAddForm();
			$("#baseContainer_").select2();
			$("#baseBulk_").select2();
		}

	};

}();
