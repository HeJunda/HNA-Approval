var imgUrl;
function showIcon(type){
	if(type=="10000"){
		imgUrl = 'images/two.png';
	}else if(type=="10003"){
		imgUrl = 'images/four.png';
	}else if(type=="11932"){
		imgUrl = 'images/siex.png';
	}else if(type=="10001"){
		imgUrl = 'images/five.png';
	}else if(type=="11781"){
		imgUrl = 'images/three.png';
	}else if(type=="33812"){
		imgUrl = 'images/one.png';
	}else if(type=="23178"){
		imgUrl = 'images/siex.png';
	}
}


var user=getCookie('userid')
$(".js-body").dropload({
	scrollArea : window,
	domUp : {
        domClass   : 'dropload-up',
        domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
        domUpdate  : '<div class="dropload-update">↑释放更新</div>',
        domLoad    : '<div class="dropload-load">加载中...</div>'
    },
	domDown : {
		domClass : 'dropload-down',
		domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
		domLoad : '<div class="dropload-load">加载中...</div>',
		domNoData : '<div class="dropload-noData">暂无更多数据</div>'
	},

	loadUpFn : function(me){
		$.ajax({
            type: 'GET',
            async: true,
            url: '/workflow/getAwaitSortList',
            data:{
            	userid:user
            },
            dataType: 'json',

            success: function(data){
            		var ahtml = "";
        	    	for(var i=0;i<data.length;i++){
        	    		showIcon(data[i].flowtype);
            		    ahtml= ahtml+ '<li class="clearfix">'
			                	        +'<a href="agency.html?flowtype='+data[i].flowtype+'">'
			             	               +'<div class="agenLeft-agency">'
			             	                   +'<span><img src="'+imgUrl+'"/></span>'
			             	               +'</div>'
			             	               +'<div class="agenRight-agency">'
			             	                 +'<div class="agenleftBox">'
			             		                 +'<h3 class="agency-title-anency">'+data[i].flowtypename+'</h3>'
			             		                 +'<p class="agenp-agency">'+data[i].firsttaskname+'</p>'
			             		                 +'<span class="number frs">'+data[i].tasknum+'</span>'
			             	                 +'</div>'
			             	               +'</div>'
			             	            +'</a>'
			             	        +'</li>'
        	    	}
        	    	$('.agenLists').find('ul').html(ahtml);
        	    	me.resetload();
        	    	 me.unlock();
                     me.noData(false);

            },
            error: function(err){
                me.resetload();
            }
        });
    },
	loadDownFn : function(me){
		$.ajax({
            type: 'GET',
            async: true,
            url: '/workflow/getAwaitSortList',
            data:{
            	userid:user
            },
            dataType: 'json',

            success: function(data){
        		var ahtml = "";
    	    	for(var i=0;i<data.length;i++){
    	    		showIcon(data[i].flowtype);
        		    ahtml= ahtml+ '<li class="clearfix">'
		                	        +'<a href="agency.html?flowtype='+data[i].flowtype+'">'
		             	               +'<div class="agenLeft-agency">'
		             	                   +'<span><img src="'+imgUrl+'"/></span>'
		             	               +'</div>'
		             	               +'<div class="agenRight-agency">'
		             	                 +'<div class="agenleftBox">'
		             		                 +'<h3 class="agency-title-anency">'+data[i].flowtypename+'</h3>'
		             		                 +'<p class="agenp-agency">'+data[i].firsttaskname+'</p>'
		             		                 +'<span class="number frs">'+data[i].tasknum+'</span>'
		             	                 +'</div>'
		             	               +'</div>'
		             	            +'</a>'
		             	        +'</li>'
    	    	}
    	    	$('.agenLists').find('ul').html(ahtml);

    	    	 me.lock();
           	     me.noData();
           	     me.resetload();
            },
            error: function(err){
                me.resetload();
            }
        });
	}
})

