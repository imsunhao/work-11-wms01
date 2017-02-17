<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link rel="stylesheet" type="text/css" href="plug/jQuery-Tags-Input-master/dist/jquery.tagsinput.min.css" />
<link rel="stylesheet" type="text/css" href="plug/select2/dist/css/select2.min.css" />
<link href="page/css/configMfun/planEdit.css" rel="stylesheet" type="text/css" />

<style>
	.shSelect{position:relative}.shSelect input[type="text"]{position:relative}.shSelect .shContent{position:absolute;display:none;width:90%;border:1px solid #eee;border-radius:5px;top:42px;left:12px;background-color:#fff;padding:10px}.shSelect .shContent li{margin-top:2px;font-size:14px;list-style:none;cursor:pointer}.shSelect .shContent li:hover{background-color:#eee}.shSelect .shActive{display:block}
</style>

<div class="widget flat radius-bordered">
	<div class="widget-header bg-danger">
		<span class="widget-caption">对入库单据进行储位分配(手动方式)</span>
	</div>

	<div class="widget-body">

		<div id="registration-form">
			<div class="form-title">
				<i class="fa fa-exchange"></i> 入库单清单预览
			</div>
			<div class="row">
				<div class="col-xs-6 col-md-6">
					<table class="table table-bordered table-hover">
						<thead>
							<tr>
								<th>整合货品明细编号</th>
								<th>整合货品明细名称</th>
								<th>整合货品明细数量</th>
								<th>整合货品明细单位</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody id="goods">
							<c:forEach items="${result}" var="mfunrkDocs">
								<tr>
									<td class="goodsNo">${mfunrkDocs.goodsno}</td>
									<td class="goodsName">${mfunrkDocs.goodsname}</td>
									<td class="goodsValue">${mfunrkDocs.goodscount}</td>
									<td class="goodsUnit">${mfunrkDocs.goodsunit}</td>
									<td><button class="btn btn-palegreen btn-xs addTr">关联储位</button></td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
				</div>
			</div>

			<div class="form-title">
				<i class="fa fa-exchange"></i> 关联信息
			</div>
			<div class="row">

				<div class="col-xs-12 col-md-12">
					<table class="table table-bordered table-hover">
						<thead>
							<tr>
								<th>平面图</th>
								<th>储位所在区域</th>
								<th>储位名称</th>
								<th>货品数量</th>
								<th>货品单位</th>
								<th>批次</th>
								<th>货品编号</th>
								<th>货品名称</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody class="data_">

						</tbody>
					</table>
				</div>
			</div>


		</div>



		<div>
			<button class="btn btn-default submitInfo">确认分配</button>
		</div>

	</div>

	<input type="text" value="${rkdjId }" name="rkdjId" style="display: none;" /> 
	<input type="text" value="${planId }" name="planId" style="display: none;" />

	<script src="plug/select2/dist/js/select2.full.min.js"></script>
	<script src="plug/jquery-validation/js/jquery.validate.min.js"></script>
	<script src="page/js/mfunrk/mfunrkdocEditLocation_.js" type="text/javascript"></script>
	<script type="text/javascript">
		jQuery(document).ready(function() {
			MfunrkdocEditLocation_.init();
		});
	</script>