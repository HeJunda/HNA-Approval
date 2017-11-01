//仿的这个，你看一下，我怕写错哪里了
	var start = 0;//开始位置初始化
	var userid = getCookie("userid");//用户id
	var isEnd = true;
	var dropload;
	function drop(){
		dropload = $('body').dropload({
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
                url: '/message/getMessageList',
                data:{
                	start:0,
                	limit:10,
                	userid:userid
                },
                dataType: 'json',
                success: function(data){
                		var ahtml = "";
                	    for(var i=0;i<data.length;i++){
                		   ahtml += '<li class="clearfix" onclick="add(\''+data[i].content+'\',this)">'
				   	                 	+'<div class="agency-right">'
				                   		+'<div class="right-box">'
					                 		+'<h3 class="agency-title">'+data[i].title+'</h3>'
					                 		+'<p>'+data[i].content+'</p>'
					                 		+'<span class="time fr">'+data[i].sendDate+'</span>'
				                   		+'</div>'
				                   		+'</div>'
				                		+'<p class="space"></p>'	
				                	 +'</li>'
                	    }
                	    
                	    setTimeout(function(){
                	    	$('#message .agency-list').find('ul').html(ahtml);
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
                    url: '/message/getMessageList',
                    data:{
                    	start:start,
                    	limit:10,
                    	userid:userid
                    },
                    dataType: 'json',
                    success: function(data){
                    		var ahtml = "";
                    	    if(data.length>0){
                    	    	for(var i=0;i<data.length;i++){
	                    		    ahtml= ahtml+ '<li class="clearfix" onclick="add(\''+data[i].content+'\',this)">'
					        	                 	+'<div class="agency-right">'
					    	                   		+'<div class="right-box">'
					    		                 		+'<h3 class="agency-title">'+data[i].title+'</h3>'
					    		                 		+'<p>'+data[i].content+'</p>'
					    		                 		+'<span class="time fr">'+data[i].sendDate+'</span>'
					    	                   		+'</div>'
					    	                   		+'</div>'
					    	                		+'<p class="space"></p>'	
					    	                	 +'</li>'
                    	    	}
                    	    	start+=10;
                    	    	$('#message .agency-list').find('ul').append(ahtml);
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
    });
	}
	 $.ajax({
         type: 'GET',
         async: false,
         url: '/message/getMessageList',
         data:{
         	start:start,
         	limit:10,
         	userid:userid
         },
         dataType: 'json',
         success: function(data){
         		var ahtml = "";
         	    if(data.length>0){
         	    	for(var i=0;i<data.length;i++){
             		    ahtml= ahtml+ '<li class="clearfix" onclick="add(\''+data[i].content+'\',this)">'
			        	                 	+'<div class="agency-right">'
			    	                   		+'<div class="right-box">'
			    		                 		+'<h3 class="agency-title">'+data[i].title+'</h3>'
			    		                 		+'<p>'+data[i].content+'</p>'
			    		                 		+'<span class="time fr">'+data[i].sendDate+'</span>'
			    	                   		+'</div>'
			    	                   		+'</div>'
			    	                		+'<p class="space"></p>'	
			    	                	 +'</li>'
         	    	}
         	    	$('.messageLoad').remove()
         	    	start+=10;
         	    	$('#message .agency-list').find('ul').append(ahtml);
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
	function add(text,e){
		var ind=$(e).index();
		console.log(text)
		layer.open({
		    title: [
		      '消息提醒',
		      'background-color: #E75732; color:#fff;'
		    ],
		    content:text
		});
	}
	
	
	
	
	
	
	
	
	
	
	