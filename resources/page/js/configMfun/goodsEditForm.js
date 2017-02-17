/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */

var GoodsEditForm = function() {
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
	var GoodsEditFormVali = function() {
		var editGoodsForm = $("#goodsEditForm");
		// 字符验证 
		editGoodsForm.validate({
			errorElement : 'span',
			errorPlacement : function(error, element) {
				error.appendTo(element.parent().parent());
			},
			errorClass : 'help-block help-block-error',
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
				var status =  $("input[name='status']:checked").val();
				var sex = $("input[name='sex']:checked").val();
				
				var baseContainer_ = $('#baseContainer_').val();
				var baseBulk_ = $('#baseBulk_').val();
				
				$.ajax({
					url : getRootPath() + "/goods/editGoodsForm",
					type : 'post',
					data : {
						"goodsId" : $("input[name='goods_Id']").val(),
						"no" : $("input[name='goodsNo']").val(),
						"nameJc" : $("input[name='name_jc']").val(),
						"name" : $("input[name='goodsName']").val(),
						"tit" : $("input[name='tit']").val(),
						"tii" : $("input[name='tii']").val(),
//						"tih" : $("input[name='tih']").val(),
						"hsl" : $("input[name='hsl']").val(),
						"zxdw" : baseContainer_,
						"szdw" : baseBulk_,
//						"dw" : $("input[name='dw']").val(),
//						"status" : $("input[name='status']:checked").val()
					},
					success : function(data) {
						if (data.code == 'success') {
							$(".modal-backdrop").remove();
							jumpPageByUrl(getRootPath() + "/configmfun/goodsmanager");
							layer.alert('操作成功！', {
								icon : 6, time : 1200
							});
						} else {
							layer.alert('操作失败！', {
								icon : 6,time : 1200
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
			GoodsEditFormVali();
		}

	};

}();
