/**
 * Author:26309358@qq.com Data: 2016.12
 * 
 */

var MenuManager = function() {
	var zTreeObj;
	var zNodesByAjax = function() {
		$.ajax({
			url : getRootPath() + "/authority/findAllBaseMenus",
			type : 'post',
			data : {},
			success : function(data) {
				var zNodes = [];
				$.each(data, function(n, obj) {
					var menuId = obj.menuId;
					var parentMenuId = obj.parentMenuId;
					var menuName = obj.menuName;
					zNodes.push({
						"id" : menuId,
						"pId" : parentMenuId,
						"name" : menuName,
						"open" : true
					});
				});
				drawTree1(zNodes);
			},
			error : function(data) {
				alert("网络异常");
			},
			dataType : "json"
		});
	}
	var drawTree1 = function(zNodes) {
		var setting = {
				
			view: {
				addHoverDom: addHoverDom,
				removeHoverDom: removeHoverDom,
				selectedMulti: false
			},

			edit : {
				drag: {
					autoExpandTrigger: true,
					prev: dropPrev,
					inner: dropInner,
					next: dropNext
				},
				enable: true,
				editNameSelectAll: true,
				showRemoveBtn: showRemoveBtn,
				showRenameBtn: showRenameBtn
			},
			callback : {
				beforeDrag: beforeDrag,
				beforeEditName: beforeEditName,
				beforeRemove: beforeRemove,
				beforeRename: beforeRename,
				onRemove: onRemove,
				onRename: onRename
			},
			data : {
				simpleData : {
					enable : true
				}
			}
		};
		var zNodes = zNodes;

		zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
		
		var log, className = "dark", curDragNodes, autoExpandNode;
		
		//拖拽功能
		function dropPrev(treeId, nodes, targetNode) {
			var pNode = targetNode.getParentNode();
			if (pNode && pNode.dropInner === false) {
				return false;
			} else {
				for (var i=0,l=curDragNodes.length; i<l; i++) {
					var curPNode = curDragNodes[i].getParentNode();
					if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {
						return false;
					}
				}
			}
			return true;
		}
		function dropInner(treeId, nodes, targetNode) {
			/*console.log("dropInner");
			console.log(treeId);
			console.log(nodes);//拖拽过来的节点//系统维护
			console.log(targetNode);//放置给的节点
*/			
			if(targetNode.level){
			   
			} else if (targetNode && targetNode.dropInner === false) {
				return false;
			} else {
				for (var i=0,l=curDragNodes.length; i<l; i++) {
					if (!targetNode && curDragNodes[i].dropRoot === false) {
						return false;
					} else if (curDragNodes[i].parentTId && curDragNodes[i].getParentNode() !== targetNode && curDragNodes[i].getParentNode().childOuter === false) {
						return false;
					}
				}
			}
			return true;
		}
		function dropNext(treeId, nodes, targetNode) {
//			alert("dropNext");
//			/*console.log(treeId);
//			console.log(nodes);
//			console.log(targetNode);*/
			var pNode = targetNode.getParentNode();
			
			ceng = targetNode.level;
			console.log("现有层数："+ceng);
			
			//拖拽过来的节点的层数Level
			var nodesLevel;
			
			//是否有子节点、子节点的个数
			var childrenLength=curDragNodes.length;
			console.log("拖拽过来的第一子节点的长度"+childrenLength);
			for(var i=0;i<childrenLength;i++){
				if(nodes[i].isParent){
					nodesLevel=2;
					console.log("拖拽节点为深度为2了 01"+nodesLevel);
					for(var j=0;j<nodes[i].length;j++){
						console.log("进入 判断");
						if(nodes[i][j].isParent){
							nodesLevel=3;
							console.log("拖拽过来的节点深度超过3"+nodesLevel);
							//return false;
						}
					}
				}
			}
			
			if (pNode && pNode.dropInner === false) {
				return false;
			} else {
				for (var i=0,l=curDragNodes.length; i<l; i++) {
					var curPNode = curDragNodes[i].getParentNode();
					if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {
						return false;
					}
				}
			}
			return true;
		}

		
		function beforeDrag(treeId, treeNodes) {
			className = (className === "dark" ? "":"dark");
			showLog("[ "+getTime()+" beforeDrag ]&nbsp;&nbsp;&nbsp;&nbsp; drag: " + treeNodes.length + " nodes." );
			for (var i=0,l=treeNodes.length; i<l; i++) {
				if (treeNodes[i].drag === false) {
					curDragNodes = null;
					return false;
				} else if (treeNodes[i].parentTId && treeNodes[i].getParentNode().childDrag === false) {
					curDragNodes = null;
					return false;
				}
			}
			curDragNodes = treeNodes;
			return true;
		}
		function beforeDragOpen(treeId, treeNode) {
			autoExpandNode = treeNode;
			return true;
		}
		function beforeDrop(treeId, treeNodes, targetNode, moveType, isCopy) {
			className = (className === "dark" ? "":"dark");
			showLog("[ "+getTime()+" beforeDrop ]&nbsp;&nbsp;&nbsp;&nbsp; moveType:" + moveType);
			showLog("target: " + (targetNode ? targetNode.name : "root") + "  -- is "+ (isCopy==null? "cancel" : isCopy ? "copy" : "move"));
			return true;
		}
		function onDrag(event, treeId, treeNodes) {
			className = (className === "dark" ? "":"dark");
			showLog("[ "+getTime()+" onDrag ]&nbsp;&nbsp;&nbsp;&nbsp; drag: " + treeNodes.length + " nodes." );
		}
		function onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
			className = (className === "dark" ? "":"dark");
			showLog("[ "+getTime()+" onDrop ]&nbsp;&nbsp;&nbsp;&nbsp; moveType:" + moveType);
			showLog("target: " + (targetNode ? targetNode.name : "root") + "  -- is "+ (isCopy==null? "cancel" : isCopy ? "copy" : "move"))
		}
		function onExpand(event, treeId, treeNode) {
			if (treeNode === autoExpandNode) {
				className = (className === "dark" ? "":"dark");
				showLog("[ "+getTime()+" onExpand ]&nbsp;&nbsp;&nbsp;&nbsp;" + treeNode.name);
			}
		}

		function showLog(str) {
			if (!log) log = $("#log");
			log.append("<li class='"+className+"'>"+str+"</li>");
			if(log.children("li").length > 8) {
				log.get(0).removeChild(log.children("li")[0]);
			}
		}

		
		
		
		
		//增删改查 操作
		function beforeEditName(treeId, treeNode) {
			className = (className === "dark" ? "":"dark");
			showLog("[ "+getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.selectNode(treeNode);
			setTimeout(function() {
				if (confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？")) {
					setTimeout(function() {
						zTree.editName(treeNode);
					}, 0);
				}
			}, 0);
			return false;
		}
		
		function beforeRemove(treeId, treeNode) {
			className = (className === "dark" ? "":"dark");
			showLog("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.selectNode(treeNode);
			
			var confirmFlag = false;
			if(treeNode.isParent){
				confirmFlag = confirm("确认删除 该节点吗 该节点包含多个子节点 -- " + treeNode.name + " 吗？");
			}else {
				confirmFlag = confirm("确认删除 该节点吗 -- " + treeNode.name + " 吗？");
			}
			
            var confirmVal = false;
            if(confirmFlag){
                 var data = {id:treeNode.id};
                $.ajax({
                     async: false,
                     type: "post",
                     data:data,
                     url: getRootPath() + "/authority/deleteTreeNode",
                     success: function(json){
                            if(json.code == "success" ){
                                confirmVal = true;
                                alert('亲，删除成功！');
                           } else{
                        	   alert('亲，删除失败！');
                           }
                     },
                     error: function(){
                           alert('亲，删除失败！');
                     }
                });
           }
            return confirmVal;
			
		}
		function onRemove(e, treeId, treeNode) {
			showLog("[ "+getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
		}
		
		function beforeRename(treeId, treeNode, newName, isCancel) {
			className = (className === "dark" ? "":"dark");
			showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
			console.log((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
			if (newName.length == 0) {
				setTimeout(function() {
					var zTree = $.fn.zTree.getZTreeObj("treeDemo");
					zTree.cancelEditName();
					alert("节点名称不能为空.");
				}, 0);
				return false;
			}
			return true;
		}
		function onRename(e, treeId, treeNode, isCancel) {
			showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
			
           var data = {id:treeNode.id,level_id:treeNode.level,pid:treeNode.pId,name:treeNode.name};
           $.ajax({
               async: false,
               type: "post",
               data:data,
               url: getRootPath() + "/authority/renameTreeNode",
               success : function(json){
                     if(json.code == "success" ){
			   alert('操作成功!');
                    } else{
			   alert('亲，操作失败，请稍后再试！');
                    }
               },
               error : function()    {
		     alert('亲，网络有点不给力呀！');
               }
          });
			
		}

		function showRemoveBtn(treeId, treeNode) {
//			alert("showRemoveBtn");
//			return !treeNode.isFirstNode;
			return treeNode;
		}
		function showRenameBtn(treeId, treeNode) {
//			alert("showRenameBtn");
//			return !treeNode.isLastNode;
			return treeNode;
		}
		function showLog(str) {
			if (!log) log = $("#log");
			log.append("<li class='"+className+"'>"+str+"</li>");
			if(log.children("li").length > 8) {
				log.get(0).removeChild(log.children("li")[0]);
			}
		}
		function getTime() {
			var now= new Date(),
			h=now.getHours(),
			m=now.getMinutes(),
			s=now.getSeconds(),
			ms=now.getMilliseconds();
			return (h+":"+m+":"+s+ " " +ms);
		}

		var newCount = 1;
		function addHoverDom(treeId, treeNode) {
			var sObj = $("#" + treeNode.tId + "_span");
			
			if ((treeNode.editNameFlag) || ($("#addBtn_"+treeNode.tId).length>0) || (treeNode.level == 2)) return;
			var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
				+ "' title='add node' onfocus='this.blur();'></span>";
			sObj.after(addStr);
			var btn = $("#addBtn_"+treeNode.tId);
			
			var data = {pId:treeNode.id, name:"new node" + (newCount++),status : 1};
			
			if (btn) btn.bind("click" , function(){
               var zTree = $.fn.zTree.getZTreeObj("treeDemo");
               
               $.ajax({
                    async: false,
                    type: "post",
                    data : data,
                    url: getRootPath() + "/authority/addTreeNode",
                    success : function(json){
                           if(json.code == "success" ){
                        	   var nodes = zTree.addNodes(treeNode, {pId:treeNode.id, name:"new node" + (newCount++)});
                        	   //window.location.reload();
                               zTree.reAsyncChildNodes(null, "refresh");
                               //jumpPageByUrl(getRootPath() + "/configsys/menu");
                               zNodesByAjax();
                          }
                    },
                    error : function(){
                          alert('亲，网络有点不给力呀！');
                    }
               });
                return false;
          });
			
		};
		function removeHoverDom(treeId, treeNode) {
			$("#addBtn_"+treeNode.tId).unbind().remove();
		};
		function selectAll() {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
		}

		
		function setRemoveBtn(treeId, treeNode) {
//			alert("setRemoveBtn");
			return !treeNode.isParent;
		}
		
		// checkSomeNodeByRoleId();

		// 提价修改
		$("button.submitAllCheck").on("click", function() {
			var allCheckedNodes = zTreeObj.getCheckedNodes(true);
			var menu_ids = [];
			$.each(allCheckedNodes, function(n, obj) {
				menu_ids.push(obj.id);
			});
			if (menu_ids.length > 0) {
				layer.confirm('勾选了' + menu_ids.length + '条菜单数据，是否继续？', {
					btn : [ '确认修改菜单权限配置！', '取消操作' ]
				// 按钮
				}, function() {
					var rid = $("input[name='roleAddMenu']").val();
					$.ajax({
						url : getRootPath() + "/authority/roleAddMenusAjax",
						type : 'post',
						data : {
							rid : rid,
							menu_ids : menu_ids
						},
						success : function(data) {
							if (data.code == 'success') {
								$(".modal-backdrop").remove();
								jumpPageByUrl(getRootPath() + "/configsys/authority/rolemanager");
								layer.msg('配置成功！', {
									icon : 1
								});
							} else {
								layer.msg('配置失败！', {
									icon : 1
								});
							}
						},
						error : function(data) {
							alert("网络异常");
						},
						dataType : "json"
					});
				}, function() {
					layer.msg('取消操作成功', {
						icon : 6
					});
				});
			} else {
				layer.msg('你没有勾选任何数据！', {
					icon : 2
				});
			}
		});
		// 全选
		$("button.checkAllNodes").on("click", function() {
			zTreeObj.checkAllNodes(true);
		});
		// 取消全选
		$("button.noCheckAllNodes").on("click", function() {
			zTreeObj.checkAllNodes(false);
		});

	}

	/**
	 * 通过角色id获取这个角色已经存在的菜单权限 并勾选
	 */
	var checkSomeNodeByRoleId = function() {
		var rid = $("input[name='roleAddMenu']").val();
		$.ajax({
			url : getRootPath() + "/authority/checkSomeNodeByRoleId",
			type : 'post',
			data : {
				rid : rid
			},
			success : function(data) {
				$.each(data, function(n, obj) {
					var menuId = obj.menuId;
					var node = zTreeObj.getNodeByParam("id", menuId, null);
					if (!node.isParent) {
						zTreeObj.checkNode(node, true, true);
					}
				});
			},
			error : function(data) {
				alert("网络异常");
			},
			dataType : "json"
		});
	}

	return {

		init : function() {
			zNodesByAjax();
		}

	};

}();
