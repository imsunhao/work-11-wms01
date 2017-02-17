<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link href="main/global/plugins/uploadify/uploadify.css" rel="stylesheet" type="text/css" />

<div class="widget flat radius-bordered">
	<div class="widget-header bg-purple">
		<span class="widget-caption">Excel主要字段导入设置</span>
	</div>
	<div class="widget-body">
	
		<form class="form-horizontal form-bordered" role="form" id="docAddForm">
			<div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label no-padding-right"></label>
                <div class="col-sm-10">
                	<i class="fa-fw fa fa-warning"></i>尽量用复制的方式进行录入,请仔细比对上传文件的列名！
                </div>
            </div>
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label no-padding-right">入库单号映射</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="docName" placeholder="execl文件的入库单号的列名">
                </div>
            </div>
            <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label no-padding-right">货品名称映射</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="goodsName" placeholder="excel文件的货品名称的列名">
                </div>
            </div>
            <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label no-padding-right">货品数量映射</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="goodsCount" placeholder="excel文件的货品数量的列名">
                </div>
            </div>
            <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label no-padding-right">货品批次映射</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="goodsBatch" placeholder="excel文件的货品批次的列名">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-10">
                    <input type="hidden" class="form-control" name="excelpath">
                </div>
            </div>
            <div class="form-group">
            	<label for="inputPassword3" class="col-sm-2 control-label no-padding-right">必要操作</label>
                <div class="col-sm-10">
                	<input type="text" name="uploadFilePath" style="display: none;"/>
			        <input type="file" name="uploadify" id="uploadify" />
			        <%--用来作为文件队列区域--%>
			        <div id="fileQueue">
			        </div>
			        <p>
			            <a href="javascript:$('#uploadify').uploadify('upload')">单文件上传</a> | 
			            <!-- <a href="javascript:$('#uploadify').uploadify('cancel')">取消上传</a>| -->
			            <a href="javascript:$('#uploadify').uploadify('upload','*')">上传所有</a> | 
			            <a href="javascript:$('#uploadify').uploadify('cancel','*')">取消所有</a>
			        </p>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-purple btn-block">导入(请确认已经完成文件上传)</button>
                </div>
            </div>
        </form>
        
	</div>
</div>

<script src="main/global/plugins/uploadify/jquery.uploadify.js" type="text/javascript"></script>
<script src="main/global/plugins/jquery-validation/js/jquery.validate.min.js"></script>
<script src="js/app/storageout/importStorageOut.js" type="text/javascript"></script>
<script type="text/javascript">
	jQuery(document).ready(function() {
		importMfunckdoc.init();
	});
</script>