/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */


var RoleEditForm = function() {
	
	var jqueryValidate = function(){
		jQuery.validator.addMethod("stringCheck", function(value, element) {
			return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
		}, "只能包括中文字、英文字母、数字和下划线");

		// 中文字两个字节 
		jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {
			var length = value.length;
			for (var i = 0; i < value.length; i++) {
				if (value.charCodeAt(i) > 127) {
					length++;
				}
			}
			return this.optional(element) || (length >= param[0] && length <= param[1]);
		}, "请确保输入的值在3-15个字节之间(一个中文字算2个字节)");

		// 身份证号码验证 
		jQuery.validator.addMethod("isIdCardNo", function(value, element) {
			return this.optional(element) || idCardNoUtil.checkIdCardNo(value);
		}, "请正确输入您的身份证号码");

		//护照编号验证
		jQuery.validator.addMethod("passport", function(value, element) {
			return this.optional(element) || checknumber(value);
		}, "请正确输入您的护照编号");

		// 手机号码验证 
		jQuery.validator.addMethod("isMobile", function(value, element) {
			var length = value.length;
			var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
			return this.optional(element) || (length == 11 && mobile.test(value));
		}, "请正确填写您的手机号码");

		// 电话号码验证 
		jQuery.validator.addMethod("isTel", function(value, element) {
			var tel = /^\d{3,4}-?\d{7,9}$/; //电话号码格式010-12345678 
			return this.optional(element) || (tel.test(value));
		}, "请正确填写您的电话号码");

		// 联系电话(手机/电话皆可)验证 
		jQuery.validator.addMethod("isPhone", function(value, element) {
			var length = value.length;
			var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
			var tel = /^\d{3,4}-?\d{7,9}$/;
			return this.optional(element) || (tel.test(value) || mobile.test(value));
		}, "请正确填写您的联系电话");

		// 邮政编码验证 
		jQuery.validator.addMethod("isZipCode", function(value, element) {
			var tel = /^[0-9]{6}$/;
			return this.optional(element) || (tel.test(value));
		}, "请正确填写您的邮政编码");
	}
	
	var RoleEditFormVali = function() {
		var editRoleForm = $("#editRoleForm");
		// 字符验证 
		editRoleForm.validate({
			errorElement : 'span',
			errorPlacement : function(error, element) {
				error.appendTo(element.parent().parent());
			},
			errorClass : 'help-block help-block-error',
			focusInvalid : false,
			ignore : "",
			rules : {
				name : {
					minlength : 2,
					maxlength : 50,
					required : true
				},remark : {
					minlength : 2,
					maxlength : 300,
				}
			},
			messages : {
				name : {
					minlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要多于2个字符！",
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于50个字符！",
					required : "<i class=\"fa fa-bolt \"></i> 不能为空！"
				},remark : {
					minlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要多于2个字符！",
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于300个字符！"
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
				
				var status = 0;
				
				if($("input[name='status']").is(':checked') == true){
					status = 1;
				}else{
					status = 0;
				}
				
				$.ajax({
					url : getRootPath() + "/authority/editRoleForm",
					type : 'post',
					data : {
						"rid" : $("input[name='roleId']").val(),
						"name" : $("input[name='name']").val(),
						"status" : status,
						"remark": $("input[name='remark']").val()
					},
					success : function(data) {
						if (data.code == 'success') {
							$(".modal-backdrop").remove();
							jumpPageByUrl(getRootPath() + "/configsys/authority/rolemanager");
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
	
	/*var findRmsRoleByUserId = function(){
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
	}*/

	return {

		init : function() {
			jqueryValidate();
			RoleEditFormVali();
			/*findRmsRoleByUserId();
			userAddRoleAjax();*/
		}

	};

}();
