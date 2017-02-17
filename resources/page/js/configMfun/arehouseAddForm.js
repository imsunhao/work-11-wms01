/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */

var ArehouseAddForm = function() {
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
	var ArehouseAddFormVali = function() {
		var arehouseAddForm = $("#addArehouseForm");
		// 字符验证 
		arehouseAddForm.validate({
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
					maxlength : 20,
					required : true
				},
				jc : {
					maxlength : 10
				},
				no : {
					maxlength : 5
				},
				addr : {
					maxlength : 40,
					required : true
				},
				scity : {
					maxlength : 20,
					required : true
				},
				scontacts : {
					maxlength : 20
				},
				phone1 : {
					maxlength : 20,
					isPhone : true
				},
				phone2 : {
					maxlength : 20,
					isPhone : true
				},
				phone3 : {
					maxlength : 20,
					isPhone : true
				},
				acreage : {
					maxlength : 10,
					required : true
				},
				ctype : {
					maxlength : 8,
					digits : true
				},
				stacking : {
					maxlength : 8,
					digits : true
				},
				humidity : {
					maxlength : 10
				},
				fax : {
					maxlength : 20
				},
				postoffice : {
					maxlength : 20
				},
				worktype : {
					maxlength : 11,
					digits : true
				}
			},
			messages : {
				name : {
					minlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于2个字符！",
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于20个字符！",
					required : "<i class=\"fa fa-bolt \"></i> 请填写内容！"
				},
				jc : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于10个字符！"
				},
				no : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于5个字符！"
				},
				addr : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于40个字符！",
					required : "<i class=\"fa fa-bolt \"></i> 请填写内容！"
				},
				scity : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于20个字符！",
					required : "<i class=\"fa fa-bolt \"></i> 请填写内容！"
				},
				scontacts : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于20个字符！"
				},
				phone1 : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于20个字符！",
					isPhone : "<i class=\"fa fa-bolt \"></i> 请输入正确的联系方式！"
				},
				phone2 : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于20个字符！",
					isPhone : "<i class=\"fa fa-bolt \"></i> 请输入正确的联系方式！"
				},
				phone3 : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于20个字符！",
					isPhone : "<i class=\"fa fa-bolt \"></i> 请输入正确的联系方式！！"
				},
				acreage : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于10个字符！",
					required : "<i class=\"fa fa-bolt \"></i> 请填写内容！"
				},
				ctype : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于8个字符！",
					digits : "<i class=\"fa fa-bolt \"></i> 请输入数字！"
				},
				stacking : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于8个字符！",
					digits : "<i class=\"fa fa-bolt \"></i> 请输入数字！"
				},
				humidity : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于10个字符！"
				},
				fax : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于20个字符！"
				},
				postoffice : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于20个字符！"
				},
				worktype : {
					maxlength : "<i class=\"fa fa-bolt \"></i> 输入字符需要小于11个字符！",
					digits : "<i class=\"fa fa-bolt \"></i> 请输入数字！"
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
				var status =  $("input[name='status']:checked").val();
				var sex = $("input[name='sex']:checked").val();
				
				$.ajax({
					url : getRootPath() + "/arehouse/addArehouse",
					type : 'post',
					data : {
						"name" : $("input[name='name']").val(),
						"jc" : $("input[name='jc']").val(),
						"no" : $("input[name='no']").val(),
						"addr" : $("input[name='addr']").val(),
						"scity" : $("input[name='scity']").val(),
						"scontacts" : $("input[name='scontacts']").val(),
						"phone1" : $("input[name='phone1']").val(),
						"phone2" : $("input[name='phone2']").val(),
						"phone3" : $("input[name='phone3']").val(),
						"acreage" : $("input[name='acreage']").val(),
						"ctype" : $("input[name='ctype']").val(),
						"stacking" : $("input[name='stacking']").val(),
						"humidity" : $("input[name='humidity']").val(),
						"fax" : $("input[name='fax']").val(),
						"status" : 1 ,
						"postoffice" : $("input[name='postoffice']").val(),
						"worktype" : $("input[name='worktype']").val()
					},
					success : function(data) {
						if (data.code == 'success') {
							$(".modal-backdrop").remove();
							jumpPageByUrl(getRootPath() + "/configmfun/arehousemanager");
							layer.alert('操作成功！', {
								icon : 6, time : 900
							});
						} else {
							layer.alert('操作失败！', {
								icon : 6,time : 900
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
			ArehouseAddFormVali();
		}

	};

}();
