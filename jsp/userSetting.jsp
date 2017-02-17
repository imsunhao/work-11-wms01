<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="plug/jquery.min.js"></script>
<link href="plug/uploadify/uploadify.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="plug/ajaxfileupload.js"></script>

<head>  
     <%-- <base href="<%=basePath%>">  --%> 
    <title>test</title>  
    <meta http-equiv="pragma" content="no-cache">  
    <meta http-equiv="cache-control" content="no-cache">  
    <meta http-equiv="expires" content="0">      
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">  
    <meta http-equiv="description" content="This is my page">  
    <meta http-equiv="X-UA-Compatible" content="IE=edge">  
    <meta name="viewport" content="width=device-width, initial-scale=1">  
    <%-- <script src="${pageContext.request.contextPath}/js/jquery-1.11/jquery.min.js"></script> --%>  
    <script src="plug/ajaxfileupload.js"></script>  
     
  </head>  
  <body>  
    <form id="form" method="post" enctype="multipart/form-data">  
        <input id="username" name="username" type="text" value="请输入姓名"/>  
        <input id="password" name="password" type="password" value="请输入密码"/>  
        <input id="photo" name="photo" type="file" onchange="preview(this)"/>  
        <div id="preview"></div>  
        <input id="upload" type="button" class="btn btn-danger" value="上传"/>  
        <!-- <button type="submit" id="upload" class="btn btn-danger">Submit</button> -->
    </form>  
    <div id="prompt"></div>                               
  </body>  
    
<script src="plug/uploadify/jquery.uploadify.js" type="text/javascript"></script>
<script src="plug/jquery-validation/js/jquery.validate.min.js"></script>
<!-- <script type="text/javascript" src="page/js/iconReset/ajaxfileupload.js"></script> -->
<script src="page/js/iconReset.js" type="text/javascript"></script>
<script type="text/javascript">
	jQuery(document).ready(function() {
		IconReset.init();
	});
	  
</script>