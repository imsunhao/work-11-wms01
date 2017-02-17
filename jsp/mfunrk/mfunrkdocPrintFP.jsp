<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link rel="stylesheet" type="text/css" href="plug/jQuery-Tags-Input-master/dist/jquery.tagsinput.min.css" />

<link href="page/css/configMfun/planEdit.css" rel="stylesheet" type="text/css" />

<div class="widget flat radius-bordered">
	<div class="widget-header bg-danger">
		<span class="widget-caption">打印分配单</span>
	</div>

	<div class="widget-body">

		<div class="table-scrollable">
			<table class="table table-striped table-bordered table-hover">
				<thead>
					<tr>
						<th scope="col">仓库平面图</th>
						<th scope="col">仓库区域编号</th>
						<th scope="col">仓库区域储位名称</th>
						<th scope="col">货品编号</th>
						<th scope="col">货品名称</th>
						<th scope="col">货品数量</th>
						<th scope="col">批次编号</th>
						<th scope="col">创建者</th>
						<th scope="col">数据生成时间</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${mfunrkDistributionlist}" var="mfunrkDistributionlist">
					<tr>
						<td>${mfunrkDistributionlist.planId }</td>
						<td>${mfunrkDistributionlist.locationLno }</td>
						<td>${mfunrkDistributionlist.locationLname }</td>
						<td>${mfunrkDistributionlist.goodsNo }</td>
						<td>${mfunrkDistributionlist.goodsName }</td>
						<td>${mfunrkDistributionlist.distributionlistCount }</td>
						<td>${mfunrkDistributionlist.distributionlistBatch }</td>
						<td>${mfunrkDistributionlist.createuser }</td>
						<td>${mfunrkDistributionlist.createtime }</td>
					</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
		<hr/>
		<button class="btn btn-danger" style="width:500px"> 打印分配单 </button>
	</div>
</div>
	<input type="text" value="${rkdjId }" name="rkdjId" style="display: none;" />

	<script src="plug/select2/select2.js"></script>
	<script src="plug/jQuery-Tags-Input-master/dist/jquery.tagsinput.min.js" type="text/javascript"></script>
	<script src="plug/jquery-validation/js/jquery.validate.min.js"></script>
	<script src="page/js/mfunrk/mfunrkdocEditLocation.js" type="text/javascript"></script>
	<script src="plug/jquery.liveeditor.min.js" type="text/javascript"></script>
	<script type="text/javascript">
		jQuery(document).ready(function() {
			/* MfunrkdocEditLocation.init(); */
		});
	</script>