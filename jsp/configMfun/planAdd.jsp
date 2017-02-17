<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="widget flat radius-bordered" style="width: 600px">
	<div class="widget-header bg-info">
		<span class="widget-caption">新增平面图结构</span>
	</div>
	<div class="widget-body">
		<div id="registration-form">
			<form role="form" id="planAddForm">
				<div class="form-title">
                   <div class="alert alert-warning fade in">
                       <button class="close" data-dismiss="alert">
                           ×
                       </button>
                       <i class="fa-fw fa fa-warning"></i>
                       <strong>注意:</strong> 请仔细阅读平面图创建规则 !
                   </div>
	            </div>
				<div class="row">
					<div class="col-sm-12">
						<div class="form-group">
							<label for="pname">图纸名称</label> <span class="input-icon icon-right"> <input type="text" class="form-control" name="pname" placeholder="图纸名称"> <i class="fa fa-tag blue"></i>
							</span>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<div class="form-group">
							<label for="exampleInputEmail2">图纸结构代码</label> <span class="input-icon icon-right"> <textarea class="form-control" name="pgroupinfo" rows="15" placeholder="a代表区域存在 _代表区域空缺 !"></textarea> <i class="glyphicon glyphicon-briefcase info"></i>
							</span>
							<!-- <p class="help-block"></p> -->
						</div>

					</div>
				</div>
			<!-- 	<div class="form-group">
					<div class="checkbox">
						<label> <input type="checkbox" class="colored-danger"> <span class="text">Notify me through E-mail</span>
						</label>
					</div>
				</div> -->
				<button type="submit" class="btn btn-info">确认提交</button>
			</form>
		</div>
	</div>
</div>

<script src="plug/jquery-validation/js/jquery.validate.min.js"></script>
<script src="page/js/configMfun/planAddForm.js" type="text/javascript"></script>
<script type="text/javascript">
	jQuery(document).ready(function() {
		PlanAddForm.init();
	});
</script>