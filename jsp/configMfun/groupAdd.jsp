<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link rel="stylesheet" type="text/css" href="plug/jQuery-Tags-Input-master/dist/jquery.tagsinput.min.css" />

<div class="widget">
	<div class="widget-header bordered-bottom bordered-palegreen">
		<span class="widget-caption">新增储位组</span>
	</div>
	<div class="widget-body">
		<div>
			<form class="form-horizontal form-bordered" role="form" id="addGroupForm">

				<div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label no-padding-right">储位组编号</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="groupNo" placeholder="储位组编号">
					</div>
				</div>
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label no-padding-right">储位组名称</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="groupName" placeholder="储位组名称">
					</div>
				</div>
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label no-padding-right">排序规则</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="gorder" placeholder="排序规则">
					</div>
				</div>
				<!-- <div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label no-padding-right"></label>
					<div class="checkbox col-sm-10">
						<label> <input type="checkbox" class="colored-blue" name="status" value="1"> <span class="text">是否启用该储位组?</span>
						</label>
					</div>
				</div> -->


				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="submit" class="btn btn-palegreen">提交</button>
						<button type="reset" class="btn default">重置信息</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<script src="plug/select2/select2.js"></script>
<script src="plug/jQuery-Tags-Input-master/dist/jquery.tagsinput.min.js" type="text/javascript"></script>
<script src="plug/jquery-validation/js/jquery.validate.min.js"></script>
<script src="page/js/configMfun/groupAddForm.js" type="text/javascript"></script>
<script type="text/javascript">
	jQuery(document).ready(function() {
		GroupAddForm.init();
	});
</script>
