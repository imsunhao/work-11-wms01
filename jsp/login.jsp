<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-cmn">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>仓库管理系统(v1.0)</title>
<style>
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font: inherit;
	font-size: 100%;
	vertical-align: baseline
}

html {
	line-height: 1
}

ol, ul {
	list-style: none
}

table {
	border-collapse: collapse;
	border-spacing: 0
}

caption, th, td {
	text-align: left;
	font-weight: normal;
	vertical-align: middle
}

q, blockquote {
	quotes: none
}

q:before, q:after, blockquote:before, blockquote:after {
	content: "";
	content: none
}

a img {
	border: none
}

article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
	display: block
}

a {
	text-decoration: none
}

body {
	margin-top:0px;
	margin-right:0px;
	margin-bottom:0px;
	margin-left:0px;
	background-color:#CCDAF7;
	background-image:url('page/img/bg.jpg');
	background-repeat:no-repeat;
	background-position:top;
	background-attachment:fixed;
}

body, input, button, a {
	font-family: "微软雅黑"
}

a, button, input[type="checkbox"] {
	cursor: pointer
}

.box-1, .box-2, .box-3, .box-4, .box-5, .box-6 {
	background-image: url("page/img/box-sa5e333d0b0.png");
	background-repeat: no-repeat
}

.box-1 {
	background-position: 0 0
}

.box-2 {
	background-position: 0 -114px
}

.box-3 {
	background-position: 0 -228px
}

.box-4 {
	background-position: 0 -342px
}

.box-5 {
	background-position: 0 -456px
}

.box-6 {
	background-position: 0 -570px
}

.center {
	position: absolute;
	right: 0;
	left: 0;
	bottom: 0;
	top: 0;
	margin: auto;
	margin-top: 15%;
	width: 600px;
	height: 324px;
	background-color: #fff;
	box-shadow: 0 0 5px 0 #ddd, 0 5px 7px 0 #ddd;
	overflow: hidden;
	*zoom: 1
}

.center .left, .center .right {
	position: relative;
	width: 50%;
	height: 100%;
	float: left
}

.center .left {
	text-align: center
}

.center .left .box {
	position: absolute;
	width: 114px;
	height: 114px;
	top: 66px;
	left: 96px;
	transform-style: preserve-3d
}

.center .left .box li {
	height: 114px;
	width: 114px;
	position: absolute
}

.center .left .box li:nth-child(1) {
	transform: rotateX(90deg) translateZ(57px)
}

.center .left .box li:nth-child(2) {
	transform: rotateX(90deg) rotateY(180deg) translateZ(57px)
}

.center .left .box li:nth-child(3) {
	transform: rotateY(90deg) translateZ(-57px)
}

.center .left .box li:nth-child(4) {
	transform: rotateY(90deg) translateZ(57px)
}

.center .left .box li:nth-child(5) {
	transform: translateZ(57px)
}

.center .left .box li:nth-child(6) {
	transform: translateZ(-57px) rotateX(180deg)
}

.center .left h3 {
	padding-top: 247px;
	line-height: 16px;
	font-size: 14px;
	color: #555
}

.center .left p {
	padding-top: 5px;
	line-height: 13px;
	font-size: 11px;
	color: #bbb
}

.center .right:before {
	content: "";
	position: absolute;
	right: 0;
	top: 43px;
	display: block;
	width: 44px;
	height: 18px;
	background-color: #f0d748
}

.center .right:after {
	content: "";
	width: 1px;
	height: 100%;
	background-color: #ddd;
	position: absolute;
	display: block;
	left: -1px;
	top: 0
}

.center .right .inner {
	margin: 0 60px
}

.center .right .inner h3 {
	color: #4b89b4;
	margin-top: 40px;
	line-height: 20px;
	font-size: 18px
}

.center .right .inner p {
	padding-top: 5px;
	font-size: 14px;
	color: #aaa
}

.center .right .inner p a {
	float: right;
	font-size: 11px;
	color: #bbb
}

.center .right .inner form {
	padding-top: 15px
}

.center .right .inner form>div {
	margin-top: 24px;
	font-size: 14px;
	color: #ccc;
	height: 32px;
	overflow: hidden;
	*zoom: 1;
	border-bottom: 2px solid #4b89b4
}

.center .right .inner form>div label {
	display: block;
	padding-right: 5px;
	line-height: 32px;
	float: left
}

.center .right .inner form>div input {
	width: 125px;
	line-height: 32px;
	display: block;
	font-size: 14px;
	border: none;
	outline: none;
	float: left
}

.center .right .inner form input[type="submit"] {
	border: none;
	outline: none;
	margin-top: 28px;
	line-height: 32px;
	height: 32px;
	display: block;
	width: 100%;
	background-color: #4b89b4;
	color: #fff;
	font-size: 14px;
	cursor: pointer;
}

.center .right .inner form .ac {
	color: #4b89b4
}

.center .right .inner form .ac input:-moz-placeholder {
	color: #4b89b4
}

.center .right .inner form .ac input::-moz-placeholder {
	color: #4b89b4
}

.center .right .inner form .ac input:-ms-input-placeholder {
	color: #4b89b4
}

.center .right .inner form .ac input::-webkit-input-placeholder {
	color: #4b89b4
}

@
keyframes box3d {
	form {transform: rotateX(0deg) rotateY(0deg)
}

to {
	transform: rotateX(360deg) rotateY(360deg)
}
}
</style>
</head>
<body style="padding: 0px; margin: 0px;">
	<div class="center">
		<div class="left">
			<ul class="box" style="transform: rotateX(75deg) rotateY(75deg);">
				<li class="box-1"></li>
				<li class="box-2"></li>
				<li class="box-3"></li>
				<li class="box-4"></li>
				<li class="box-5"></li>
				<li class="box-6"></li>
			</ul>
			<h3>仓库管理系统是通过入库业务</h3>
			<p>- 按住鼠标左键拖动</p>
		</div>
		<div class="right">
			<div class="inner">
				<h3>乐速科技</h3>
				<p>仓库管理系统(v1.0)</p>
				<form action="login" method="post">
					<div class="ac">
						<label for="username">账号</label> <input id="username" type="text" placeholder="登录账户" name="username">
					</div>
					<div>
						<label for="password">密码</label> <input id="password" type="password" placeholder="账户密码" name="password">
					</div>
					<input type="submit" value="立刻登录">
				</form>
				<p>
					<a href="javaScript:void(0);">忘记密码？</a>
				</p>
			</div>
		</div>
	</div>

	<canvas width="1899" height="419" style="position: absolute; top: 0px; left: 0px; z-index: -1;"></canvas>
	<script src="plug/jquery.min.js"></script>
	<script src="page/js/index/login.js"></script>
	<script type="text/javascript">
		jQuery(document).ready(function() {
			Login.init();
		});
	</script>
</body>

</html>