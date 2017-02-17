<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- Page Breadcrumb -->
<div class="page-breadcrumbs">
	<ul class="breadcrumb">
		<li><i class="fa fa-cog"></i> <a href="#">系统资源</a></li>
		<li class="active">功能展示页</li>
	</ul>
</div>
<!-- /Page Breadcrumb -->
<!-- Page Header -->
<div class="page-header position-relative">
	<!-- <div class="header-title">
		<h1>
			Forms <small> <i class="fa fa-angle-right"></i> Wizards
			</small>
		</h1>
	</div> -->
	<!--Header Buttons-->
	<div class="header-buttons">
		<a class="sidebar-toggler" href="#"> <i class="fa fa-arrows-h"></i>
		</a> <a class="refresh" id="refresh-toggler" href="#"> <i class="glyphicon glyphicon-refresh"></i>
		</a> <a class="fullscreen" id="fullscreen-toggler" href="#"> <i class="glyphicon glyphicon-fullscreen"></i>
		</a>
	</div>
	<!--Header Buttons End-->
</div>
<!-- /Page Header -->
<div class="page-body">
	<div class="row">
		<div class="col-xs-12 col-md-12 col-lg-12">
			<div class="widget">
				<div class="widget-header ">
					<span class="widget-caption">"系统资源"功能操作说明</span>
					<div class="widget-buttons">
						<a href="#" data-toggle="maximize"> <i class="fa fa-expand"></i>
						</a> <a href="#" data-toggle="collapse"> <i class="fa fa-minus"></i>
						</a> <a href="#" data-toggle="dispose"> <i class="fa fa-times"></i>
						</a>
					</div>
				</div>
				<div class="widget-body">
					<div class="row pricing-container">
                        <div class="col-xs-12 col-sm-6 col-md-3">
                            <div class="plan">
                                <div class="header bordered-yellow">Enterprise</div>
                                <div class="price yellow">$59</div>
                                <div class="monthly">per month</div>
                                <ul>
                                    <li><b>10GB</b> Disk Space</li>
                                    <li><b>100GB</b> Monthly Bandwidth</li>
                                    <li><b>20</b> Email Accounts</li>
                                    <li><b>Unlimited</b> subdomains</li>
                                </ul>
                                <a class="signup bg-yellow" href="#">Sign up</a>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-3">
                            <div class="plan"><!--  popular-plan animated bounce -->
                                <div class="header bordered-palegreen">Professional</div>
                                <div class="price palegreen">$29</div>
                                <div class="monthly">per month</div>
                                <ul>
                                    <li><b>5GB</b> Disk Space</li>
                                    <li><b>50GB</b> Monthly Bandwidth</li>
                                    <li><b>10</b> Email Accounts</li>
                                    <li><b>Unlimited</b> subdomains</li>
                                </ul>
                                <a class="signup bg-palegreen" href="#">Sign up</a>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-3">
                            <div class="plan">
                                <div class="header bordered-orange">Standard</div>
                                <div class="price orange">$19</div>
                                <div class="monthly">per month</div>
                                <ul>
                                    <li><b>3GB</b> Disk Space</li>
                                    <li><b>25GB</b> Monthly Bandwidth</li>
                                    <li><b>5</b> Email Accounts</li>
                                    <li><b>Unlimited</b> subdomains</li>
                                </ul>
                                <a class="signup bg-orange" href="#">Sign up</a>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-3">
                            <div class="plan">
                                <div class="header bordered-azure">Basic</div>
                                <div class="price azure">$9</div>
                                <div class="monthly">per month</div>
                                <ul>
                                    <li><b>1GB</b> Disk Space</li>
                                    <li><b>10GB</b> Monthly Bandwidth</li>
                                    <li><b>2</b> Email Accounts</li>
                                    <li><b>Unlimited</b> subdomains</li>
                                </ul>
                                <a class="signup bg-azure" href="#">Sign up</a>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- /Page Body -->

<script src="page/js/index/configsys.js"></script>
<script type="text/javascript">
   jQuery(document).ready(function() {
	   Configsys.init();
});
</script>
