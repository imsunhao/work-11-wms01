/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */

var importMfunck = function() {
	
	var docAddFormFun = function() {
		
		var docAddForm = $("#docAddForm");
		// 字符验证 
		docAddForm.validate({
			errorElement : 'span',
			errorPlacement : function(error, element) {
				error.appendTo(element.parent().parent());
			},
			errorClass : 'col-md-10 col-md-offset-2 help-block help-block-error',
			focusInvalid : false,
			ignore : "",
//			rules : {
//				docName : {
//					required : true
//				},
//				goodsName : {
//					required : true,
//				},
//				goodsCount : {
//					required : true,
//				},
//				goodsBatch : {
//					required : true,
//				},
//				goodsDw : {
//					required : true,
//				},
//				goodsRow : {
//					digits : true,
//					required : true,
//				}/*,
//				uploadFilePath : {
//					required : true,
//				}*/
//				
//			},
//			messages : {
//				docName : {
//					required : "<i class=\"fa fa-bolt \"></i> 必填内容！"
//				},
//				goodsName : {
//					required : "<i class=\"fa fa-bolt \"></i> 必填内容！"
//				},
//				goodsCount : {
//					required : "<i class=\"fa fa-bolt \"></i> 必填内容！"
//				},
//				goodsBatch : {
//					required : "<i class=\"fa fa-bolt \"></i> 必填内容！"
//				},
//				goodsDw : {
//					required : "<i class=\"fa fa-bolt \"></i> 必填内容！"
//				},
//				goodsRow : {
//					digits : "<i class=\"fa fa-bolt \"></i> 必须是数字(整数)！",
//					required : "<i class=\"fa fa-bolt \"></i> 必填内容！"
//				}/*,
//				uploadFilePath : {
//					required : "<i class=\"icon fa fa-meh-o \"></i> 必须选择一个文件！"
//				}*/
//
//			},

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
//				var docNo =  $("input[name='docNo']").val();
//				var goodsNo =  $("input[name='goodsNo']").val();
//				var goodsCount =  $("input[name='goodsCount']").val();
//				var goodsBatch =  $("input[name='goodsBatch']").val();
//				
//				var goodsDw =  $("input[name='goodsDw']").val();
//				var goodsRow =  $("input[name='goodsRow']").val();
//				var arehouse_id = $("#arehouse_id").val();
				
//				var uploadFilePath =  $("input[name='uploadFilePath']").val();
//				$('#uploadify').uploadify('settings', 'formData', { 
//					'docNo' : docNo, 
//					'goodsNo':goodsNo,
//					'goodsCount' : goodsCount, 
//					'goodsBatch' : goodsBatch,
//					'goodsDw' : goodsDw, 
//					'goodsRow' : goodsRow,
//					'arehouse_id' : arehouse_id
//				});
//				alert(docNo+"--"+goodsNo+"--"+goodsCount+"--"+goodsBatch+"--"+goodsDw+"--"+goodsRow+"--"+arehouse_id);
				$('#uploadify').uploadify('upload','*');
			}
		});
	}
	
	/* alert(client_id); */
	var uploader = function() {

		$("#uploadify").uploadify({
			'uploader' : getRootPath() + '/mfunckdoc/uplodeExcelAndImportInfo',
			'swf' : getRootPath() + '/plug/uploadify/uploadify.swf',
			'cancelImg' : getRootPath() + '/plug/uploadify/uploadify-cancel.png',
			'auto' : false,// 点击上传
			'method' : 'PSOT', // post
			'buttonText' : '选择文件(仅能查询xls)',
			'preventCaching' : true, // 防止浏览器缓存
			'removeCompleted' : false,// 是否移除掉队列中已经完成上传的文件。false为不移除
			'height' : 30,
			'width' : 270,
			'fileTypeExts' : '*.xls;',
			'queueID' : 'fileQueue',
			'queueSizeLimit' : 5,
			'fileObjName' : 'file',
			'multi' : true,
			'onUploadSuccess' : function(file, data, response) {
				/*var uploadFilePathHtml = $("input[name='uploadFilePath']").val();
				if(uploadFilePathHtml==null||uploadFilePathHtml==''||uploadFilePathHtml==undefined){
					$("input[name='uploadFilePath']").val(data);
				}else{
					$("input[name='uploadFilePath']").val(uploadFilePathHtml+"-"+data);
				}*/
				
				
				jumpPageByUrl(getRootPath() + "/mfunckdoc/mfunck/mfunckdocmanager");
				$(".modal-backdrop").remove();
				layer.alert('操作成功！', {
					icon : 6
				});
			}
		});
	}

	return {

		init : function() {
			uploader();
			docAddFormFun();
//			$("#arehouse_id").select2();
		}

	};

}();
