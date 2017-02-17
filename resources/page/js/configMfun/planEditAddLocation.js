/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */

var PlanEditAddLocation = function() {
	
	var addLocationForm = function(){
		var userAddForm = $("#addLocationForm");
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
				lname : {
					maxlength : 20,
					required : true
				},ltray : {
					maxlength : 11,
					required : true
				}
			},
			messages : {
				lname : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于20个字符！",
					required : "<i class=\"fa fa-bolt \"></i> 不能为空！"
				},ltray : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于11个字符！",
					required : "<i class=\"fa fa-bolt \"></i> 不能为空！"
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
					url : getRootPath() + "/plan/planAddLocation",
					type : 'post',
					data : {
						"lname" : $("input[name='lname']").val(),
						"ltray" : $("input[name='ltray']").val(),
						"regionInfo" : $("input[name='regionInfo']").val()
					},
					success : function(data) {
						if (data.code == 'success') {
//							$(".modal-backdrop").remove();
//							jumpPageByUrl(getRootPath() + "/configsys/authority/usermanager");
							bootbox.hideAll();
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
			addLocationForm();
		}

	};

}();
