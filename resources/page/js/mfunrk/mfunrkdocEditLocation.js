/**
 * Author:26309358@qq.com
 * Data: 2016.12
 * 
 */

var MfunrkdocEditLocation = function() {
	var ajaxTable = function(){
		var oTable = $('#editabledatatable').dataTable({
            "aLengthMenu": [
                [5, 15, 20, 100, -1],
                [5, 15, 20, 100, "All"]
            ],
            "iDisplayLength": 15,
            "sPaginationType": "bootstrap",
            "sDom": "Tflt<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
            "oTableTools": {
                "aButtons": [
			        "copy",
			        "print",
			        {
			            "sExtends": "collection",
			            "sButtonText": "Save <i class=\"fa fa-angle-down\"></i>",
			            "aButtons": ["csv", "xls", "pdf"]
			        }],
                "sSwfPath": "assets/swf/copy_csv_xls_pdf.swf"
            },
            "language": {
                "search": "",
                "sLengthMenu": "_MENU_",
                "oPaginate": {
                    "sPrevious": "上一页",
                    "sNext": "下一页"
                }
            },
            "aoColumns": [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null
            ]
        });
		
		$(".DTTT.btn-group").empty();
		
	}
	var submitInfoFun = function(){
		$('button.submitInfo').on('click',function(){
			
			var planIds = [];
			$('input[name="planId"]').each(function(){
				var planId = $(this).val();
				planIds.push(planId);
			});
			
			var locationLnos = [];
			$('input[name="locationLno"]').each(function(){
				locationLnos.push($(this).val());
			});
			
			var locationLnames = [];
			$('input[name="locationLname"]').each(function(){
				locationLnames.push($(this).val());
			});
			
			var goodsNos = [];
			$('td[name="goodsNo"]').each(function(){
				goodsNos.push($(this).get(0).innerHTML);
			});
			
			var goodsNames = [];
			$('td[name="goodsName"]').each(function(){
				goodsNames.push($(this).get(0).innerHTML);
			});
			
			var distributionlistCounts = [];
			$('input[name="distributionlistCount"]').each(function(){
				distributionlistCounts.push($(this).val());
			});
			
			var distributionlistBatchs = [];
			$('input[name="distributionlistBatch"]').each(function(){
				distributionlistBatchs.push($(this).val());
			});
			
			var createusers = [];
			$('td[name="createuser"]').each(function(){
				createusers.push($(this).get(0).innerHTML);
			});
			
			var paramObjs = [];
			var obj;
			var rkdjId = $('input[name="rkdjId"]').val();
			for(var i=0;i<createusers.length;i++){
				var planId = planIds[i];
				var locationLno = locationLnos[i];
				var locationLname = locationLnames[i];
				var goodsNo = goodsNos[i];
				var goodsName = goodsNames[i];
				var distributionlistCount = distributionlistCounts[i];
				var distributionlistBatch = distributionlistBatchs[i];
				var createuser = createusers[i];
				var code = $('#'+(i+1)+' option:selected').val();
				obj={rkdjId:rkdjId,planId:planId,locationLno:locationLno,locationLname:locationLname,goodsNo:goodsNo,goodsName:goodsName,distributionlistCount:distributionlistCount,distributionlistBatch:distributionlistBatch,createuser:createuser,status:1,code:code};
				paramObjs.push(obj);
			}
			var mfunrkDistributionlists = JSON.stringify(paramObjs);
			console.log(mfunrkDistributionlists);
			
			
			layer.confirm('确定提交这些数据？', {
			  btn: ['提交(暂未编写验证规则)','取消'] //按钮
			}, function(){
				//submitInfo
				$.ajax({
					url : getRootPath() + "/mfunrkdoc/submitInfo",
					type : "POST",  
					contentType: 'application/json;charset=utf-8',
					cache : false,
					data : mfunrkDistributionlists,
					bRetrieve:true,
					dataType : "json",
					success : function(result) {
						var code = result.code;
						if(code=='success'){
							jumpPageByUrl(getRootPath() + "/mfunin/docmanager");
							$(".modal-backdrop").remove();
							layer.alert('操作成功！', {
								icon : 6
							});
						}else{
							layer.alert('操作失败！', {
								icon : 3
							});
						}
					},
					error:function(result){
						console.log(result);
					}
				});
				
			});
			
		});
	}
	var aboutSettingLocationJumpModal = function(){
		$('a.lookPlan').on("click", function() {
			
			var plan_id = $(this).attr("data");
			$.ajax({
				url : getRootPath() + "/mfunrkdoc/mfunrkLookPlan?plan_id="+plan_id,
				type : "GET",  
				contentType: 'application/json',
				data:null,
				success : function(res) {
					layer.open({
					  type: 1,
					  title: false,
					  closeBtn: 0,
					  shadeClose: true,
					  fixed: false, //不固定
					  skin: 'yourclass',
					  area: ['80%', '70%'], //宽高
					  content: res
					});
				},
		        error: function(data) {
		        	alert("openModalAddLocation is error!");
		        }
			});
		});
	}
	
	return {

		init : function() {
			aboutSettingLocationJumpModal();
			ajaxTable();
			submitInfoFun();
		}

	};

}();
