<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<div class="widget flat radius-bordered" style="width: 600px;">
	<div class="widget-header bg-palegreen">
		<span class="widget-caption">编辑货品</span>
	</div>
	<div class="widget-body">
		<div>
			<form class="form-horizontal form-bordered" role="form" id="goodsEditForm">

				<div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label no-padding-right">货品编号</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="goodsNo" placeholder="货品编号" value="${goods.no }">
					</div>
				</div>

				<div class="form-group">
					<label for="inputPassword3" class="col-sm-2 control-label no-padding-right">货品名称</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="goodsName" placeholder="货品名称" value="${goods.name }">
					</div>
				</div>
				<div class="form-group">
					<label for="inputPassword3" class="col-sm-2 control-label no-padding-right">货品名简称</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="name_jc" placeholder="货品名简称" value="${goods.nameJc }">
					</div>
				</div>

				<div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label no-padding-right">整箱单位配置</label>
					<div class="col-sm-10">
						<select id="baseContainer_" style="width: 100%;">
							<c:forEach items="${baseContainers }" var="baseContainer">
								<option value="${baseContainer.name }">${baseContainer.name }</option>
							</c:forEach>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label for="inputPassword3" class="col-sm-2 control-label no-padding-right">散支单位配置</label>
					<div class="col-sm-10">
						<select id="baseBulk_" style="width: 100%;">
							<c:forEach items="${baseBulks }" var="baseBulk">
								<option value="${baseBulk.name }">${baseBulk.name }</option>
							</c:forEach>
						</select>
					</div>
				</div>

				<div class="form-group">
					<label for="inputPassword3" class="col-sm-2 control-label no-padding-right">配置T值</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="tit" placeholder="设置T值" value="${goods.tit }">
					</div>
				</div>
				<div class="form-group">
					<label for="inputPassword3" class="col-sm-2 control-label no-padding-right">配置I值</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="tii" placeholder="设置I值" value="${goods.tii }">
					</div>
				</div>
				<div class="form-group">
					<label for="inputPassword3" class="col-sm-2 control-label no-padding-right">配置换算量</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="hsl" placeholder="设置换算量" value="${goods.hsl }">
					</div>
				</div>


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

<input type="text" class="form-control" name="goods_Id" value="${goods.goodsId }" style="display: none"/>
<script src="plug/jquery-validation/js/jquery.validate.min.js"></script>
<script src="page/js/configMfun/goodsEditForm.js" type="text/javascript"></script>
<script type="text/javascript">
	jQuery(document).ready(function() {
		GoodsEditForm.init();
	});
</script>