	var userid = getCookie("userid");
	var follows = false;
 	var itemIndex = sessionStorage.getItem('flag');
 	var startLi = 0;
    $('.searNav').eq(itemIndex).addClass('cur')
	var dropload = $('.agency-list').dropload({
        scrollArea:window,
	        distance:50,
	        domUp : {
	            domClass   : 'dropload-up',
	            domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
	            domUpdate  : '<div class="dropload-update">↑释放更新</div>',
	            domLoad    : '<div class="dropload-load">加载中...</div>'
	        },
	        domDown:{
	            domClass : 'dropload-down',
	            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
	            domLoad : '<div class="dropload-load">加载中...</div>',
	            domNoData : '<div class="dropload-noData">暂无更多数据</div>'
	        },
         	loadUpFn : function(me){
             follows=false;
             $.ajax({
                 type: 'GET',
                 url: '/workflow/getSplitRead',
                 data:{
                     userid:userid,
                     start:0,
                     limit:10,
                     hasread:itemIndex
                 },
                 dataType: 'json',
                 success: function(data){
                     if(data!=""){
                         var result=''
                         for(var i = 0; i < data.length; i++){
                             result +=   '<li class="clearfix">'
                                 +'<a href="/followAwait.html?taskid='+(data[i].taskid==undefined?"":data[i].taskid)+'">'
                                 +'<div class="agency-right">'
                                 +'<div class="right-box">'
                                 +'<p class="follow-person">流程名称：<span class="fr follr" style="width: 65%;overflow: hidden;text-overflow: ellipsis; white-space: nowrap;text-align:right">'+data[i].taskname+'</span></p>'
                                 +'<p class="follow-person">流程编号：<span class="fr follr">'+(data[i].instanceid==undefined?"":data[i].instanceid)+'</span></p>'
                                 +'<p class="follow-person">发送人：<span class="fr follr">'+(data[i].sendername==undefined?"":data[i].sendername)+'</span></p>'
                                 +'<p class="follow-person">创建时间：<span class="fr follr">'+(data[i].createtime==undefined?"":data[i].createtime)+'</span></p>'
                                 +'<p class="follow-person">流程发起部门：<span class="fr follr">'+(data[i].startorg==undefined?"":data[i].startorg)+'</span></p>'
                                 +'<p class="follow-person">流程发起人：<span class="fr follr">'+(data[i].startname==undefined?"":data[i].startname)+'</span></p>'
                                 +'</div>'
                                 +'</div>'
                                 +'</a>'
                                 +'</li>'
                                 +'<p class="space"></p>'
                         }
                         $('.agency-list ul').html(result);
                     }
                     follows=true;
                     if(data.length<10){
                         me.noData(true);
                     }else{
                         me.resetload();// 每次数据加载完，必须重置
                         me.unlock(); // 解锁位置
                         me.noData(false);
                     }
                     me.resetload(); // 每次数据加载完，必须重置
                 },
                 error: function(err){
                     me.resetload(); // 每次数据加载完，必须重置
                 }
             });
             startLi = 10;
         },
	        loadDownFn : function(me){
	        	follows=false;
	            $.ajax({
			        type: 'GET',
			        url: '/workflow/getSplitRead',
			        data:{
			        	userid:userid,
			        	start:startLi,
			        	limit:10,
			        	hasread:itemIndex
			        },
			        dataType: 'json',
			        success: function(data){
			        	if(data.length>0){
			        		var result='' ;
			                for(var i = 0; i < data.length; i++){
			                	var one= '/followAwait.html?taskid='+data[i].taskid+''
			                	var two= '/followAlready.html?instanceid='+data[i].instanceid+''
			                		var hrefs = itemIndex == 0 ? one: two;
			                    result += '<li class="clearfix">'
								      		+'<a href="'+hrefs+'">'
								      			+'<div class="agency-right">'
								            		+'<div class="right-box">'
								            			+'<p class="follow-person">流程名称：<span class="fr follr" style="width: 65%;overflow: hidden;text-overflow: ellipsis; white-space: nowrap;text-align:right">'+data[i].taskname+'</span></p>'
								            			+'<p class="follow-person">流程编号：<span class="fr follr">'+data[i].instanceid+'</span></p>'
								           				+'<p class="follow-person">发送人：<span class="fr follr">'+data[i].sendername+'</span></p>'
								           				+'<p class="follow-person">创建时间：<span class="fr follr">'+data[i].createtime+'</span></p>'
								           				+'<p class="follow-person">流程发起部门：<span class="fr follr">'+data[i].startorg+'</span></p>'
								           				+'<p class="follow-person">流程发起人：<span class="fr follr">'+data[i].startname+'</span></p>'
								           			+'</div>'
								           		+'</div>'
								           	+'</a>'
								           +'</li>'
								      	+'<p class="space"></p>'
					                }
				            	 $('.agency-list ul').append(result);
				        	}
			        		follows=true
							if(data.length<10){
								me.lock(); // 锁定 位置
								me.noData(true);// 显示无数据
							}
							me.resetload(); // 每次数据加载完，必须重置
		        		},
		        		error: function(err){
                            me.resetload(); // 每次数据加载完，必须重置
		        		}
					});
	        	startLi +=10;
	             
	        }
	    });
    $('.tab .item').on('click',function(){
        if(follows){
            sessionStorage.setItem('flag',$(this).index());
            itemIndex = sessionStorage.getItem('flag');
            $('.agency-list').find('ul').html('');
            $(this).addClass('cur').siblings().removeClass('cur');
            startLi = 0;
            dropload.unlock(); // 解锁位置
            dropload.noData(false);
            dropload.resetload();
        }
    });






