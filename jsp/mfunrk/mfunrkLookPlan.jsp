<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="widget flat radius-bordered">
	<div class="widget-header bg-sky">
		<span class="widget-caption" id="plan_name"></span>
	</div>

	<div class="widget-body">
		<div class="registration-form">
			<div class="form-title">
				<i class="fa fa-exchange"></i> 示例
			</div>
			<div class="row">
				<div id="legend"></div>
			</div>
		</div>
		<div class="registration-form" style="padding-bottom: 20px">
			<div class="form-title">
				<i class="fa fa-credit-card"></i> 平面图<strong>储位占用</strong>分布图
			</div>
			<div class="row">
				<div id="seat-map-demo"></div>
			</div>
		</div>

		<div class="registration-form" id="planEditTableDiv" style="display: none">
			<div class="form-title">
				<i class="fa fa-flask"></i> 区域添加储位信息(点击未定义的区域开始！)
			</div>
			<div class="row">
				<div class="col-xs-12 col-md-12">
					<div class="flip-scroll">
						<div class="col-xs-10 col-md-10">
							<div class="well with-header  with-footer">
								<div class="header bg-darkorange">选择区域可用储位(手动)</div>
								<table class="table table-hover table-bordered arelocations">
									<thead>
										<tr>
											<th>#</th>
											<th>区域编号</th>
											<th>储位名称</th>
											<th>托盘数量</th>
										</tr>
									</thead>
									<tbody class="FFF">
									</tbody>
								</table>
								<div class="footer">
									<a href="javascript:void(0);" class="btn btn-darkorange drawInfoToTable">确认选择</a>
                                </div>
							</div>
						</div>

						<div class="col-xs-10 col-md-10">
							<div class="well with-header with-footer">
								<div class="header bg-blue">分配单区域信息</div>
								<table class="table table-bordered table-hover distributionlists">
									<thead>
										<tr>
											<th>#</th>
											<th>区域编号</th>
											<th>储位名称</th>
											<th>货品编号</th>
											<th>货品名称</th>
											<th>单位储位货品量</th>
											<th>批次</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>

						</div>

						<div class="col-xs-10 col-md-10">
							<div class="well with-header with-footer">
								<div class="header bg-palegreen">库存表区域信息</div>
								<table class="table table-bordered table-hover mfunRepertorys">
									<thead>
										<tr>
											<th>#</th>
											<th>区域编号</th>
											<th>储位名称</th>
											<th>货品编号</th>
											<th>货品名称</th>
											<th>单位储位货品量</th>
											<th>冻结数量</th>
											<th>批次</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<input type="text" value="${plan_id }" name="plan_id" style="display: none">
<input type="text" value="${trindex }" name="trindex" style="display: none">

<script src="plug/jquery-seatCharts/jquery.seat-charts.min.js" type="text/javascript"></script>
<script src="page/js/mfunrk/mfunrkLookPlan.js" type="text/javascript"></script>
<script type="text/javascript">
	jQuery(document).ready(function() {
		MfunrkLookPlan.init();
	});
</script>