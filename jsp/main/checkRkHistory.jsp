<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<style>

.point-time {
  content: "";
  position: absolute;
  width: 13px;
  height: 13px;
  top: 17px;
  left: 20%;
  background: #1c87bf;
  margin-left: -4px;
  border-radius: 50%;
  box-shadow: 0 0 0 5px #fff;
}

.text-red {
  color: #f6393f;
}

.text-blue {
  color: #1c87bf;
}

.text-green {
  color: #95c91e;
}

.text-yellow {
  color: #ffb902;
}

.text-purple {
  color: #d32d93;
}

.point-red {
  background-color: #f6393f;
}

.point-blue {
  background-color: #1c87bf;
}

.point-green {
  background-color: #95c91e;
}

.point-yellow {
  background-color: #ffb902;
}

.point-purple {
  background-color: #d32d93;
}

.content {
  width: 970px;
  margin: 30px auto;
}
.content article {
  position: relative;
}
.content article > h3 {
  width: 15%;
  height: 20px;
  line-height: 20px;
  text-align: right;
  font-size: 1.4em;
  color: #1d1d1d;
  padding: 10px 0 20px;
}
.content article section {
  padding: 0 0 17px;
  position: relative;
}
.content article section:before {
  content: "";
  width: 5px;
  top: 17px;
  bottom: -17px;
  left: 20%;
  background: #e6e6e6;
  position: absolute;
}
.content article section:last-child:before {
  display: none;
}
.content article section time {
  width: 15%;
  display: block;
  position: absolute;
}
.content article section time > span {
  display: block;
  text-align: right;
}
.content article section aside {
  color: #3a3a38;
  margin-left: 25%;
  padding-bottom: 15px;
}
.content article section .brief {
  color: #9f9f9f;
}

</style>
<div class="widget">
	<div class="widget-header bordered-left bordered-darkorange">
		<span class="widget-caption">入库单据记录查询</span>
	</div>
	<div class="widget-body bordered-left bordered-warning">
		
		
<div class="content">
	<article>
		<c:if test="${empty histories }">--没有发现数据--</c:if>
		<c:forEach var="historie" items="${histories }">
					
			<section>
				<span class="point-time point-blue"></span>
				<time>
					<span> <fmt:formatDate value="${historie.modalCreatetime }" pattern="yyyy/MM/dd" /></span>
					<span> <fmt:formatDate value="${historie.modalCreatetime }" pattern="HH:mm:ss" /></span>
				</time>
				<aside>
					<p class="things">${historie.modalText }</p>
					<p class="brief"><span class="text-red">${historie.userName }</span> (${historie.userLoginname })</p>
				</aside>
			</section>
		</c:forEach>
	</article>
	
</div>
	
	
	
		
	</div>
</div>

<!-- <script src="page/js/main/rkdjcxmanager.js" type="text/javascript"></script>
<script type="text/javascript">
	jQuery(document).ready(function() {
		Rkdjcxmanager.init();
	});
</script> -->