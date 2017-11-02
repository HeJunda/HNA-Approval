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
showIcon(window.location.search.substring(10));

	var start = 0;//开始位置初始化
	var userid = getCookie("userid");//用户id
	var type = localurl('flowtype');
	var isEnd=true;
	var dropload;
	function drop(){
		dropload=$('.js-bodys').dropload({
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
            // 加载菜单一的数据
				$.ajax({
	                type: 'GET',
	                async: true,
	                url: '/workflow/getAwaitMessage',
	                data:{
	                	start:0,
	                	limit:10,
	                	userid:userid,
	                	flowtype:type
	                },
	                dataType: 'json',
	                success: function(data){
                		var ahtml = "";
                	    for(var i=0;i<data.length;i++){
                		   ahtml += '<li class="clearfix">'
				                           +'<a href="/examine.html?taskid='+data[i].taskid+'">'
					                              +'<div class="agenLeft">'
					                                  +'<span><img src="'+imgUrl+'"/></span>'
					                              +'</div>'
					                              +'<div class="agenRight">'
					                                +'<div class="leftBox">'
					             	                 +'<h3 class="agency-title">'+data[i].flowname+'</h3>'
					             	                 +'<p class="agenptxt"><span>发起人</span><span class="answer">'+data[i].starter+'</span></p>'
					             	                 +'<p class="agenptxt"><span>发起时间</span><span class="answer">'+data[i].starttime+'</span></p>'
					                                +'</div>'
					                              +'</div>'
					                           +'</a>'
					                           +'<p class="space"></p>'
					                           +'</li>'
                	    }
                	    
                	    setTimeout(function(){
                	    	$('.agency-list').find('ul').html(ahtml);
                            // 每次数据加载完，必须重置
                            me.resetload();
                            // 重置页数，重新获取loadDownFn的数据
                            start = 10;
                            isEnd = true;
                            // 解锁loadDownFn里锁定的情况
                            me.unlock();
                            me.noData(false);
                        },1000);
                },
                error: function(xhr, type){
                    //alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
    	},
        loadDownFn : function(me){
        	if(isEnd){
                $.ajax({
                    type: 'GET',
                    async: true,
                    url: '/workflow/getAwaitMessage',
                    data:{
                    	start:start,
                    	limit:10,
                    	userid:userid,
                    	flowtype:type
                    },
                    dataType: 'json',
                    
                    success: function(data){
                    		var ahtml = "";
                    	    if(data.length>0){
                    	    	for(var i=0;i<data.length;i++){
	                    		    ahtml= ahtml+ '<li class="clearfix">'
						                           +'<a href="/examine.html?taskid='+data[i].taskid+'">'
							                              +'<div class="agenLeft">'
							                                  +'<span><img src="'+imgUrl+'"/></span>'
							                              +'</div>'
							                              +'<div class="agenRight">'
							                                +'<div class="leftBox">'
							             	                 +'<h3 class="agency-title">'+data[i].flowname+'</h3>'
							             	                 +'<p class="agenptxt"><span>发起人</span><span class="answer">'+data[i].starter+'</span></p>'
							             	                 +'<p class="agenptxt"><span>发起时间</span><span class="answer">'+data[i].starttime+'</span></p>'
							                                +'</div>'
							                              +'</div>'
							                           +'</a>'
							                           +'<p class="space"></p>'
							                           +'</li>'
                    	    	}
                    	    	start+=10;
                    	    	$('.agency-list').find('ul').append(ahtml);
                    	    	if(data.length<10){
                         		   isEnd = false;
                             	   me.lock();
                             	   me.noData();
                    	    	}
                    	    	 me.resetload();
                    	   }else{
                    		   isEnd = false;
                        	   me.lock()
                        	   me.noData();
                        	   me.resetload();
                           }
                    	},
	                    error: function(err){
	                        me.resetload();
	                    }
                	});
	        	}else{
	          	   me.lock();
	          	   me.noData();
	          	   me.resetload();
	        	}
	        }
	    })
	}

	$.ajax({//我都忘了，这个搜索那个是没有的，不知道你仿那个
		
        type: 'GET',
        async: true,
        url: '/workflow/getAwaitMessage',
        data:{
        	start:start,
        	limit:10,
        	userid:userid,
        	flowtype:type
        },
        dataType: 'json',
        success: function(data){
    		var ahtml = "";
    		if(data.length>0){
    			for(var i=0;i<data.length;i++){
    				ahtml += '<li class="clearfix">'
	                           +'<a href="/examine.html?taskid='+data[i].taskid+'">'
		                              +'<div class="agenLeft">'
		                                  +'<span><img src="'+imgUrl+'"/></span>'
		                              +'</div>'
		                              +'<div class="agenRight">'
		                                +'<div class="leftBox">'
		             	                 +'<h3 class="agency-title">'+data[i].flowname+'</h3>'
		             	                 +'<p class="agenptxt"><span>发起人</span><span class="answer">'+data[i].starter+'</span></p>'
		             	                 +'<p class="agenptxt"><span>发起时间</span><span class="answer">'+data[i].starttime+'</span></p>'
		                                +'</div>'
		                              +'</div>'
		                           +'</a>'
		                           +'<p class="space"></p>'
		                           +'</li>'
    			}
    			$('.messageLoad').remove()
     	    	start+=10;
    			$('.agency-list').find('ul').append(ahtml);
     	    	if(data.length<10){
          		   isEnd = false;
     	    	}
    		}else{
      		   isEnd = false;
            }
     	   	drop();
	    },
	    error: function(err){
	    	console.log(err)
	    }
	});
