/**
 * 获取工程根目录
 * @returns
 */
function getRootPath() {
    //获取当前网址，如： http://localhost:8088/test/test.jsp  
    var curPath = window.document.location.href;
    //获取主机地址之后的目录，如： test/test.jsp  
    var pathName = window.document.location.pathname;
    var pos = curPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8088  
    var localhostPaht = curPath.substring(0, pos);
    //获取带"/"的项目名，如：/test  
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}
 
/*
 * 用来遍历指定对象所有的属性名称和值 obj 需要遍历的对象 author: Jet Mah website:
 * http://www.javatang.com/archives/2006/09/13/442864.html
 */
function allPrpos(obj) {
    // 用来保存所有的属性名称和值
    var props = "";
    // 开始遍历
    for ( var p in obj) {
        // 方法
        if (typeof (obj[p]) == "function") {
            // obj[p]();
        } else {
            // p 为属性名称，obj[p]为对应属性的值
            props += p + "=" + obj[p] + "\r\n";
        }
    }
    // 最后显示所有的属性
    alert(props);
}
 
function returnHome() {
    $('.page-sidebar .ajaxify.start').click();
}
 
function canUpdateSingle(curLoginName, curLoginName, item) {
    if (curLoginName == 'admin') {
        return true;
    } else {
        var info = item.val();
        var infoArr = info.split(',');
        var userid = infoArr[1];
        var canDel = true;
        if (curLoginName != userid) {
            canDel = false;
        }
        return canDel;
    }
}
function getSingleId(item) {
    var info = item.val();
    var infoArr = info.split(',');
    var id = infoArr[0];
    return id
}
function canDeleteMulti(curLoginName, curLoginName, items) {
    if (curLoginName == 'admin') {
        return true;
    } else {
        var canDel = true;
        items.each(function() {
            var info = $(this).val();
            var infoArr = info.split(',');
            var userid = infoArr[1];
            if (curLoginName != 'admin' && curLoginName != userid) {
                canDel = false;
            }
        });
        return canDel;
    }
 
}
 
function getMultiIds(items) {
    var ids = new Array();
    items.each(function() {
        var info = $(this).val();
        var infoArr = info.split(',');
        var id = infoArr[0];
        ids.push(id);
    });
    return ids;
}

function jumpPageByUrl(url){
	$.ajax({
		type : "GET",
		cache : false,
		url : url,
		dataType : "html",
		async:false,
		success : function(res) {
			jQuery('.page-content').html(res);
		},
        error: function(xhr, ajaxOptions, thrownError) {
        	$(".page-content").html('<h4>Could not load the requested content.</h4>');
        }
	});
}

