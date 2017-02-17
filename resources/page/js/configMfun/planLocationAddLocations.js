/**
 * Author:26309358@qq.com
 * Data: 2016.12
 * 
 */

var PlanLocationAddLocations = function() {
	
	var ajaxSendAddLocations = function(){
		$("button.submit").on("click",function(){
			var group_id = $("#e1").val();
			var arelocations_ = $("input[name='arelocations_']").val();
			$.ajax({
				url : getRootPath() + "/plan/locationUpdateLocationGroup",
				type : "GET",  
				contentType: 'application/json',
				data : {
					group_id:group_id,
					arelocations_:arelocations_
				},
				success : function(data) {
					alert(data.code);
				},
				error : function(data) {
					alert("网络异常");
				}
			});
		});
		
	}
	
	
	return {

		init : function() {
			$("#e1").select2();
			ajaxSendAddLocations();
		}

	};

}();
