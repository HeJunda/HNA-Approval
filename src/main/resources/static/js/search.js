	$("#active").height($(window).height()-108).css("overflow-y","auto").width("100%")
	var itemIndex = sessionStorage.getItem('flag');
 	var searchs=false;
 	var flowName = "";
    $('.searNav').eq(itemIndex).addClass('cur')
    function getList(item){
		$('.agency-list').find('ul').html('');
		itemIndex = item;
        renderLi();
	}
	var userid = getCookie("userid");//用户id
	function renderLi(){
        var urls = itemIndex == 0?'/workflow/getMyInitiatedProcess/':'/workflow/getDoneMessage/';
        $.ajax({
            type: 'GET',
            url: urls,
            data:{
                start:0,
                limit:10000,
                userid:userid,
                flowname: flowName
            },
            dataType: 'json',
            success: function(data){
                var ahtml = "";
                if(data.length>0){
                    for(var i=0;i<data.length;i++){
                        var startname = itemIndex == 0 ? data[i].startername : data[i].starter;
                        var startorg = itemIndex == 0 ? data[i].starterorgname : data[i].startorg;
                        ahtml+= '<li class="clearfix">'
                            +'<a href="/searchDetail.html?instance='+data[i].instanceid+'">'
                            +'<div class="agency-right">'
                            +'<div class="right-box">'
                            +'<h3 class="agenText">'+data[i].flowname+'</h3>'
                            +'<p class="follow-person">流程编号：<span class="fr">'+data[i].instanceid+'</span></p>'
                            +'<p class="follow-person">发起人：<span class="fr">'+startname+'</span></p>'
                            +'<p class="follow-person">发起时间：<span class="fr">'+data[i].starttime+'</span></p>'
                            +'<p class="follow-person">当前审批人：<span class="fr" style="width:65%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right">'+data[i].assigneename+'</span></p>'
                            +'<p class="follow-person">当前审批部门：<span class="fr">'+startorg+'</span></p>'
                            +'<span class="prompt fr">'+data[i].flowstatus+'</span>'
                            +'</div>'
                            +'</div>'
                            +'</a>'
                            +'</li>'
                            +'<p class="space"></p>'
                    }
                    $('.agency-list').find('ul').append(ahtml||'');
                }
                searchs=true;
                $('.js-loading-info').html('没有更多数据');
            }
        });
	}
	// 渲染列表
    renderLi();
    $('.tab .item').on('click',function(){
    	if(searchs){
            searchs=false; // 重置为  false
    		sessionStorage.setItem('flag',$(this).index());
    		$('.agency-list ul').html('');
            $(this).addClass('cur').siblings('.item').removeClass('cur');
            $('#gulpwork').val('');
            flowName = "";
            $('.js-loading-info').html('正在加载')
    	    getList($(this).index())
    	}
	})
	//实现搜索
	function sear(){
		if(searchs){
			$('.js-loading-info').html('正在加载')
            flowName = $('#gulpwork').val();
			getList(sessionStorage.getItem('flag'));
		}
	}
	