<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="widget">
    <div class="widget-header bordered-bottom bordered-blue">
        <span class="widget-caption">配置用户角色</span>
    </div>
    <div class="widget-body">
        <div>
            <form role="form">
            	<h5>请尽量为用户配置一个角色权限！</h5><hr/>
                <div class="form-group">
                    <c:forEach var="allRmsRole" items="${allRmsRoles }">
						<div class="checkbox">
		                     <label>
		                         <input type="checkbox" class="colored-blue" value="${allRmsRole.rid }" name="${allRmsRole.rid }">
		                         <span class="text">${allRmsRole.name }</span>
		                     </label>
		                 </div>
					</c:forEach>
                </div>
                <button type="button" class="btn btn-blue userAddRoleSubmit">修改权限</button>
            </form>
        </div>
    </div>
</div>

<input type="text" value="${uid }" name="uidPageRole" style="display:none"/>
<script src="page/js/configsys/userAddRole.js" type="text/javascript"></script>
<script type="text/javascript">
	jQuery(document).ready(function() {
		UserAddRole.init();
	});
</script>