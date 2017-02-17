var Main = function() {

	var findUserHistoryBy6 = function() {
		$.ajax({
			url : getRootPath() + "/history/findUserHistoryBy6",
			type : "post",
			data : null,
			dataType : "json",
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			success : function(data) {
				$("div.tickets-container ul.tickets-list").empty();
				$.each(data,function(n,obj){
					var username = obj.hUsername;
					var time = new Date(obj.createtime).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
					var model = obj.hDomodel;
					$("div.tickets-container ul.tickets-list").append('<li class="ticket-item"><div class="row"><div class="ticket-user col-lg-6 col-sm-12"><img src="page/img/avatars/adam-jansen.jpg" class="user-avatar"> <span class="user-name">'+username+'</span> <span class="user-at">at</span> <span class="user-company">Microsoft</span></div><div class="ticket-time col-lg-4 col-sm-6 col-xs-12"><div class="divider hidden-md hidden-sm hidden-xs"></div><i class="fa fa-clock-o"></i> <span class="time">'+time+'</span></div><div class="ticket-type col-lg-2 col-sm-6 col-xs-12"><span class="divider hidden-xs"></span> <span class="type">'+model+'</span></div><div class="ticket-state bg-palegreen"><i class="fa fa-check"></i></div></div></li>');
				});
			}
		});

	}
	
	var indexFun = function(){
        //-------------------------Visitor Sources Pie Chart----------------------------------------//
        var data = [
            {
                data: [[1, 21]],
                color: '#fb6e52'
            },
            {
                data: [[1, 12]],
                color: '#e75b8d'
            },
            {
                data: [[1, 11]],
                color: '#a0d468'
            },
            {
                data: [[1, 10]],
                color: '#ffce55'
            },
            {
                data: [[1, 46]],
                color: '#5db2ff'
            }
        ];
        
        var placeholder = $("#dashboard-pie-chart-sources");
        placeholder.unbind();

        $.plot(placeholder, data, {
            series: {
                pie: {
                    innerRadius: 0.45,
                    show: true,
                    stroke: {
                        width: 4
                    }
                }
            }
        });
        
	}
	
	return {

		init : function() {
			findUserHistoryBy6();
			indexFun();
        	$('[data-sparkline=line]').sparkline([6,5,9,4,3,7], {
                type: 'line',
                disableHiddenCheck: true,
                height: 126,
                width: 803,
                fillColor: getcolor('#37c2e2'),
                lineColor: getcolor('#37c2e2'),
                spotRadius: 0,
                lineWidth: 2,
                spotColor: getcolor('#fafafa'),
                minSpotColor: getcolor('#fafafa'),
                maxSpotColor: getcolor('#ffce55'),
                highlightSpotColor: getcolor('#f5f5f5'),
                highlightLineColor: getcolor('#f5f5f5')
            });
		}
	};

}();