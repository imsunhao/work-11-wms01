<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- <div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">
	你知道吗？亲！<br>layer ≠ layui<br>
	<br>layer只是作为Layui的一个弹层模块，由于其用户基数较大，所以常常会有人以为layui是layerui<br>
	<br>layer虽然已被 Layui 收编为内置的弹层模块，但仍然会作为一个独立组件全力维护、升级。<br>
	<br>我们此后的征途是星辰大海 ^_^
</div> -->
<style>
	.owl-item {
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    -webkit-transform: translate3d(0,0,0);
    -moz-transform: translate3d(0,0,0);
    -ms-transform: translate3d(0,0,0);
}
.post-slide {
    margin: 0 15px;
}
.post-slide .post-img {
    overflow: hidden;
}
.post-slide .post-content {
    background: #fff;
    padding: 20px;
}.post-slide .post-description {
    font-size: 15px;
    color: #676767;
    line-height: 24px;
    margin-bottom: 14px;
}.post-slide .post-bar {
    padding: 0;
    margin-bottom: 15px;
    list-style: none;
}
</style>
<div class="owl-item" style="width: 390px;"><div class="post-slide">
    <div class="post-img">
    </div>
    <div class="post-content">
        <h3 class="post-title"><a href="#">${activeUser.username }</a></h3>
        <p class="post-description">
            hi!${activeUser.username } 你的登录账户为${activeUser.loginName } 。
            <hr/>
			你的角色权限：
			<c:forEach items="${activeUser.roles }" var="role">
				${role.name }
			</c:forEach>
			<br/>
			你的客户访问权限：
			<c:forEach items="${activeUser.clients }" var="client">
				${client.cname }
			</c:forEach>
			<br/>
			你的仓库访问权限：
			<c:forEach items="${activeUser.arehouses }" var="arehouse">
				${arehouse.name }
			</c:forEach>
			 <hr/>
        </p>
        <ul class="post-bar">
            <li><i class="fa fa-calendar"></i> ${nowtime }</li>
            <!-- <li>
                <i class="fa fa-folder"></i>
                <a href="#">Mockup</a>
                <a href="#">Graphics</a>
                <a href="#">Flayers</a>
            </li> -->
        </ul>
    </div>
</div></div>