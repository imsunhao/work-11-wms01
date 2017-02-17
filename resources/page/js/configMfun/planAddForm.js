/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */


var PlanAddForm = function() {
	
	var jqueryValidate = function(){
		jQuery.validator.addMethod("isPlanPro", function(value, element) {
			var aaa = /^[a_|\n]+$/;
			return this.optional(element) || aaa.test(value);
		}, "请使用 a _ | 组成的字符串");
	}
	var PlanAddFormVali = function() {
		var userAddForm = $("#planAddForm");
		// 字符验证 
		userAddForm.validate({
			errorElement : 'span',
			errorPlacement : function(error, element) {
				error.appendTo(element.parent().parent());
			},
			errorClass : 'help-block help-block-error',
			focusInvalid : false,
			ignore : "",
			rules : {
				pname : {
					maxlength : 32,
					required : true
				},
				pgroupinfo : {
					maxlength : 500,
					required : true,
					isPlanPro : true
				}
			},
			messages : {
				pname : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于32个字符！",
					required : "<i class=\"fa fa-bolt \"></i> 必填内容！"
				},
				pgroupinfo : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于500个字符！",
					required : "<i class=\"fa fa-bolt \"></i> 必填内容！",
					isPlanPro : "<i class=\"fa fa-bolt \"></i> 请使用 'a'、'_'、'|' 组成的字符串！",
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
				$.ajax({
					url : getRootPath() + "/plan/addPlan",
					type : 'post',
					data : {
						"pname" : $("input[name='pname']").val(),
						"pgroupinfo" : $("textarea[name='pgroupinfo']").val()
					},
					success : function(data) {
						if (data.code == 'success') {
							jumpPageByUrl(getRootPath() + "/configmfun/arehouseplanmanager");
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
			jqueryValidate();
			PlanAddFormVali();
		}

	};

}();
