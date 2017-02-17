<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="widget flat radius-bordered" style="width: 600px;">
	<div class="widget-header bg-palegreen">
		<span class="widget-caption">新增角色</span>
	</div>
	<div class="widget-body">
		<div id="registration-form">
			<form id="addRoleForm">
				<div class="form-title">角色基本信息</div>
				<div class="form-group">
					<span class="input-icon icon-right"> <input type="text" class="form-control" placeholder="角色名称..." name="name"> <i class="glyphicon glyphicon-user circular"></i>
					</span>
				</div>
				<div class="form-group">
					<span class="input-icon icon-right"> <input type="text" class="form-control" placeholder="备注信息" name="remark"> <i class="fa fa-envelope-o circular"></i>
					</span>
				</div>

				<div class="form-group">
					<div class="checkbox">
						<label> <input type="checkbox" class="colored-blue" name="status" value="1"> <span class="text">是否启用角色?</span>
						</label>
					</div>
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
<script src="page/js/configsys/roleAddForm.js" type="text/javascript"></script>
<script type="text/javascript">
	jQuery(document).ready(function() {
		RoleAddForm.init();
	});
</script>