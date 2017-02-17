/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */

var IconReset = function() {
	
	
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
			rules : {
				docName : {
					required : true
				},
				goodsName : {
					required : true,
				},
				goodsCount : {
					required : true,
				},
				goodsBatch : {
					required : true,
				},
				uploadFilePath : {
					required : true,
				}
				
			},
			messages : {
				docName : {
					required : "<i class=\"fa fa-bolt \"></i> 必填内容！"
				},
				goodsName : {
					required : "<i class=\"fa fa-bolt \"></i> 必填内容！"
				},
				goodsCount : {
					required : "<i class=\"fa fa-bolt \"></i> 必填内容！"
				},
				goodsBatch : {
					required : "<i class=\"fa fa-bolt \"></i> 必填内容！"
				},
				uploadFilePath : {
					required : "<i class=\"icon fa fa-meh-o \"></i> 必须进行文件的上传！"
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
				var docNanme =  $("input[name='docName']").val();
				var goodsName =  $("input[name='goodsName']").val();
				var goodsCount =  $("input[name='goodsCount']").val();
				var goodsBatch =  $("input[name='goodsBatch']").val();
				var uploadFilePath =  $("input[name='uploadFilePath']").val();
				alert(docNanme+"--"+goodsName+"--"+goodsCount+"--"+goodsBatch+"--"+uploadFilePath);
				
				/*$.ajax({
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
				});*/

			}
		});
	}
	
	/* alert(client_id); */
	var uploader = function() {

		$("#uploadify").uploadify({
			'uploader' : getRootPath() + '/header/profile/uploadBasicHead;jsessionid='+$('#sessionId').val(),
			'swf' : getRootPath() + '/plug/uploadify/uploadify.swf',
			'cancelImg' : getRootPath() + '/plug/uploadify/uploadify-cancel.png',
			'auto' : false,// 点击上传
			'method' : 'PSOT', // post
			'buttonText' : '选择文件(仅能查询xls,xlsx格式的文件)',
			'preventCaching' : true, // 防止浏览器缓存
			'removeCompleted' : false,// 是否移除掉队列中已经完成上传的文件。false为不移除
			'height' : 30,
			'width' : 270,
			'fileTypeExts' : '*.jpg; *.gif',
			'queueID' : 'fileQueue',
			'queueSizeLimit' : 5,
			'fileObjName' : 'file',
			'multi' : true,
			'onUploadSuccess' : function(file, data, response) {
				
				   /*var json =  eval("("+data+")");//解析返回的json  
		           var imageCode = json.imageCode;  
		           alert(imageCode);
		           if(imageCode!='-1'){  
		             $("#showImg").attr("src", imageCode);   
		             //$("#input_photo").val(imageCode);  
		               
		           }else{  
		             alert("上传失败！只允许上传图片类型(jpg,gif,png)且小于1M的照片");  
		           }*/
				$("#imgHead").attr("src",getRootPath() + "/header/profile/readImage?imagePath="+data.imagePath);  
		        $('#basicHeadUrl').val(data.imagePath); 
				
				var uploadFilePathHtml = $("input[name='uploadFilePath']").val();
				if(uploadFilePathHtml==null||uploadFilePathHtml==''||uploadFilePathHtml==undefined){
					$("input[name='uploadFilePath']").val(data);
				}else{
					$("input[name='uploadFilePath']").val(uploadFilePathHtml+"-"+data);
				}
				
				
				layer.alert('文件上传成功！', {
				  icon: 1,
				  skin: 'layer-ext-moon'
				})
			}
		});
	}
	
	/*//上传头像，触发click方法  
	$('#uploadBasicInfoHead').on('click',function(){  
	 $('#basicInfoHead').click();  
	});  

	function uploadHead(){  
	  $.ajaxFileUpload({  
	      url:getRootPath() + "/header/profile/uploadBasicHead",//需要链接到服务器地址   
	      secureuri:false,  
	      fileElementId:"basicInfoHead",//文件选择框的id属性  
	      dataType: 'json',   //json  
	      success: function (data) {  
	    	  console.log(data);
	    	  $('#basicHeadUrl').val(data.imagePath);
	    	  alert($('#basicHeadUrl').val(data.imagePath));
	         $("#imgHead").attr("src",getRootPath() + "/header/profile/readImage?imagePath="+data.imagePath);  
	        // $('#basicHeadUrl').val(data.imagePath);
	      },error:function(XMLHttpRequest, textStatus, errorThrown){  
	     alert('上传失败！');  
	   }  
	  });  
	};*/
	var ajaxFileUpload = function() {
		/* var uploadUrl = getRootPath() + '/header/ajaxfileupload';   */
		$(function(){  
		    $('#upload').click(function(e){  
		        var username = $('#username').val();  
		        var password = $('#password').val();  
		        var isValidate = false;  
		        if(username == '' || password == '') {  
		              $('#prompt').html('<span style="color:red">用户名和密码是必填项!</span>');  
		        } else {  
		            isValidate = true;  
		        }  
		        if(isValidate) {  
		            $.ajaxFileUpload({  
		                url: getRootPath() + "/header/ajaxTestUp",  
		                secureuri:false,  
		                //文件选择框的id属性.  
		                fileElementId:'photo',  
		                //dataType: 'json',  
		                dataType: 'jsonp',
		                jsonp:'callback',
		                data:{  
		                    username:username,  
		                    password:password     
		                },   
		                //注意:这里的success方法代表的是前台成功接收了后台返回的数据.  
		                success: function (data) { 
		                	data = data.replace("<PRE>", '');  //ajaxFileUpload会对服务器响应回来的text内容加上<pre>text</pre>前后缀
                            data = data.replace("</PRE>", '');
                            data = data.replace("<pre>", '');
                            data = data.replace("</pre>", ''); //本例中设定上传文件完毕后,服务端会返回给前台[0`filepath]
                            //将String字符串转换成json
                            var dataset = $.parseJSON(data);
		                	
		                    if(dataset.code == "success") {  
		                    	$(".modal-backdrop").remove();
								layer.alert('操作成功！', {
									icon : 6, time : 900
								});
								//jumpPageByUrl(getRootPath() + "/ppOT6p");
		                    } else {  
		                    	layer.alert('操作失败！', {
									icon : 6,time : 900
								});
		                    }  
		                 },  
		                 //注意:如果后前台没有成功接收后台返回的数据,则认为上传失败.  
		                 //换句话说如果后台的异常没有捕获到,则认为是error.  
		                 /*error: function (s, xml, status, e){  
		                    console.info('上传图片失败:未知异常!');  
		                 } */
/*		                 error:function(XMLHttpRequest, textStatus, errorThrown){  
		                     alert('上传失败！'); 
		                 }*/
		                 error : function(data) {
								alert("网络异常");
						},
		            });  
		         }  
		    });  
		});  
		  
		
	}
	
	
	return {

		init : function() {
			uploader();
			//uploadIcon();
			//uploadIconTest();
			ajaxFileUpload();
			//uploadHead();
			docAddFormFun();
			
			//nnn
//			upLoad();
//			uploadCoursePoster();
		}

	};

}();

//上传头像，触发click方法  
$('#uploadBasicInfoHead').on('click',function(){  
 $('#basicInfoHead').click();  
});  

function uploadHead(){  
  $.ajaxFileUpload({  
      url:getRootPath() + "/header/upphoto",//需要链接到服务器地址   
      secureuri:false,  
      fileElementId:"file",//文件选择框的id属性  
      dataType: 'text',   //json  
      success: function (data) { 
    	  console.log(data);
    	  if(data.code=='success'){
    		  console.log(data);
	    	  var basicHeaderUrl = $('#basicHeadUrl').val(data.imagePath);
	    	  alert(basicHeaderUrl);
	         $("#imgHead").attr("src",getRootPath() + "/header/profile/readImage?imagePath="+data.imagePath);  
	         $('#basicHeadUrl').val(data.imagePath);
				$(".modal-backdrop").remove();
				//jumpPageByUrl(getRootPath() + "/configmfun/clientmanager");
				layer.msg('配置成功！', {icon: 1});
			}else{
				layer.msg('配置失败！', {icon: 1});
			}
      },error:function(XMLHttpRequest, textStatus, errorThrown){  
     alert('上传失败！');  
   }  
  });  
}; 

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/* var uploadUrl = getRootPath() + '/header/ajaxfileupload';   
$(function(){  
    $('#upload').click(function(e){  
        var username = $('#username').val();  
        var password = $('#password').val();  
        var isValidate = false;  
        if(username == '' || password == '') {  
              $('#prompt').html('<span style="color:red">用户名和密码是必填项!</span>');  
        } else {  
            isValidate = true;  
        }  
        if(isValidate) {  
            $.ajaxFileUpload({  
                url: getRootPath() + "/header/ajaxTestUp",  
                secureuri:false,  
                //文件选择框的id属性.  
                fileElementId:'photo',  
                dataType: 'json',  
                data:{  
                    username:username,  
                    password:password     
                },   
                //注意:这里的success方法代表的是前台成功接收了后台返回的数据.  
                success: function (data, status) { 
                	console.log(data);
                	console.log(status);
                	alert(data+"261:"+data.length);
                	
                    if(data.result == 'success') {  
                        //alert(data.message);  
                        //继续成功的逻辑...  
                    } else {  
                        alert(data.message);  
                        //继续失败的逻辑...  
                    }  
                 },  
                 //注意:如果后前台没有成功接收后台返回的数据,则认为上传失败.  
                 //换句话说如果后台的异常没有捕获到,则认为是error.  
                error: function (s, xml, status, e){  
                    console.info('上传图片失败:未知异常!');  
                 }   
            });  
         }  
    });  
});  
  
//重点:图片预览.  
function preview(file){    
    var preview = document.getElementById('preview');    
    if (file.files && file.files[0]) {    
        var reader = new FileReader();    
        reader.onload = function(event){    
            preview.innerHTML = '<img src="' + event.target.result + '" width="100px" height="100px"/>';    
        };     
        reader.readAsDataURL(file.files[0]);    
    } else {    
        //没有用IE6~9进行测试.  
        preview.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';    
    }    
}*/

//重点:图片预览.  
function preview(file){    
    var preview = document.getElementById('preview');    
    if (file.files && file.files[0]) {    
        var reader = new FileReader();    
        reader.onload = function(event){    
            preview.innerHTML = '<img src="' + event.target.result + '" width="100px" height="100px"/>';    
        };     
        reader.readAsDataURL(file.files[0]);    
    } else {    
        //没有用IE6~9进行测试.  
        preview.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';    
    }    
}
