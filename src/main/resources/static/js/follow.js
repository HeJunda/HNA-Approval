//就是这个页面

$(function(){
	var userid = getCookie("userid");
	var follows = false;
 	var itemIndex = sessionStorage.getItem('flag')
 	
    //$this.addClass('cur').siblings('.item').removeClass('cur');
   $('.searNav').eq(itemIndex).addClass('cur')
	function getList(item){
		itemIndex = item;
		// 解锁
        dropload.unlock();
        dropload.noData(false);
     	// 重置
        dropload.resetload();
	}
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
	            domNoData : '<div class="dropload-noData">暂无数据</div>'
	        },
	        loadDownFn : function(me){
	        	follows=false
	        	$('.agency-list ul').html('')
	            $.ajax({
			        type: 'GET',
			        url: '/workflow/getSplitRead',
			        data:{
			        	userid:userid,
			        	start:0,
			        	limit:10000,
			        	hasread:itemIndex
			        },
			        dataType: 'json',
			        success: function(data){
			        	
			        	if(data!=""){
			        		console.log(data)
			        		console.log(data[0].taskname)
			        		var result='' ;
				                for(var i = 0; i < data.length; i++){
				                	var one= '/followAwait.html?taskid='+data[i].taskid+''
				                	var two= '/followAlready.html?instanceid='+data[i].instanceid+''
				                		var hrefs = itemIndex == 0 ? one: two;
				                	//console.log(data)
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
			            	//console.log(data);
			            	 $('.agency-list ul').append($(result));
			            	 follows=true
			        	}else{
			        		$('.conSearch').text()
			        		
			        	}
			        	
			        		// 锁定
		                    me.lock();//
		                    // 无数据
		                    me.noData();
							// 每次数据加载完，必须重置
			                me.resetload();            
		        		},
		        		error: function(err){
		        		    console.log(err);
		        		}
					});
	             
	        },
	        loadUpFn : function(me){
	            $.ajax({
			        type: 'GET',
			        url: '/workflow/getSplitRead',
			        data:{
			        	userid:userid,
			        	start:0,
			        	limit:10000,
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
			                
			        	}else{
			        		$('.conSearch').text()
			        	}
			        	// 每次数据加载完，必须重置
                        me.resetload();		            
		        		},
		        		error: function(err){
		        		    console.log(err);
		        		}
					});
	        }
	    });
	
	$('.tab .item').on('click',function(){
		if(follows){
			sessionStorage.setItem('flag',$(this).index())
			$('.followInfo').css('display','block')
			var $this = $(this);
			$('.agency-list ul').html('')
		    getList($this.index())
		    $this.addClass('cur').siblings('.item').removeClass('cur');
		    $('.agency-list').eq(itemIndex).show().siblings('.agency-list').hide();
		}
		
	})
})






