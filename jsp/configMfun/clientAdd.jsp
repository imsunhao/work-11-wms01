<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="widget flat radius-bordered" style="width: 600px;">
	<div class="widget-header bg-palegreen">
		<span class="widget-caption">新增客户</span>
	</div>
	<div class="widget-body">
		<div id="registration-form">
			<form id="addClientForm">
				<div class="form-title">客户基本信息</div>
				<div class="form-group">
					<span class="input-icon icon-right"> <input type="text" class="form-control" placeholder="客户编号..." name="cno"> <i class="glyphicon glyphicon-user circular"></i>
					</span>
				</div>
				<div class="form-group">
					<span class="input-icon icon-right"> <input type="text" class="form-control" placeholder="客户名称..." name="cname"> <i class="fa fa-envelope-o circular"></i>
					</span>
				</div>
				<div class="form-group">
					<span class="input-icon icon-right"> <input type="text" class="form-control" placeholder="客户地址..." name="caddr"> <i class="fa fa-lock circular"></i>
					</span>
				</div>
				<div class="form-group">
					<span class="input-icon icon-right"> <input type="text" class="form-control" placeholder="客户联系方式..." name="ctel"> <i class="fa fa-lock circular"></i>
					</span>
				</div>

				<div class="form-actions">
					<button type="submit" class="btn default">确认新增</button>
					<button type="reset" class="btn default">重置信息</button>
				</div>
			</form>
			
		</div>
	</div>
</div>

<script src="plug/jquery-validation/js/jquery.validate.min.js"></script>
<script src="page/js/configMfun/clientAddForm.js" type="text/javascript"></script>
<script type="text/javascript">
	jQuery(document).ready(function() {
		ClientAddForm.init();
	});
</script>