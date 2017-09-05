
$(function(){
	var userid = getCookie("userid");
	
	var itemIndex = 0;
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
	            domNoData : '<div class="dropload-noData">数据加载完毕</div>'
	        },
	        loadDownFn : function(me){
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
			        		var result=result ||'' 
				                for(var i = 0; i < data.length; i++){
				                	//console.log(data)
				                    result += '<li class="clearfix">'
									      		+'<a href="/followAwait.html?taskid='+(data[i].taskid==undefined?"":data[i].taskid)+'">'
									      			+'<div class="agency-right">'
									            		+'<div class="right-box">'
									            			+'<p class="follow-person">流程名称：<span class="fr follr" style="width: 18%;overflow: hidden;text-overflow: ellipsis; white-space: nowrap;">'+(data[i].taskname==undefined?"":data[i].taskname)+'</span></p>'
									            			+'<p class="follow-person">流程编号：<span class="fr follr">'+(data[i].instanceid==undefined?"":data[i].instanceid)+'</span></p>'
									           				+'<p class="follow-person">发送人：<span class="fr follr">'+(data[i].sendername==undefined?"":data[i].sendername)+'</span></p>'
									           				+'<p class="follow-person">创建时间：<span class="fr follr">'+(data[i].createtime==undefined?"":data[i].createtime)+'</span></p>'
									           				+'<p class="follow-person">流程发起部门：<span class="fr follr">'+(data[i].startorg==undefined?"":data[i].startorg)+'</span></p>'
									           				+'<p class="follow-person">流程发起人：<span class="fr follr">'+(data[i].startname==undefined?"":data[i].startname)+'</span></p>'
									           			+'</div>'
									           		+'</div>'
									           	+'</a>'	
									      	+'</li>'
			                }
			        		//console.log(result)
			                $('.agency-list ul').append(result);
			                
			        	}else{
			        		$('.conSearch').text()
			        	}
			        	   
			             	// 锁定
		                    me.lock();
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
									      		+'<a href="/followAwait.html?taskid='+data[i].taskid+'">'
									      			+'<div class="agency-right">'
									            		+'<div class="right-box">'
									            			+'<p class="follow-person">流程名称：<span class="fr follr">'+data[i].taskname+'</span></p>'
									            			+'<p class="follow-person">流程编号：<span class="fr follr">'+data[i].instanceid+'</span></p>'
									           				+'<p class="follow-person">发送人：<span class="fr follr">'+data[i].sendername+'</span></p>'
									           				+'<p class="follow-person">创建时间：<span class="fr follr">'+data[i].createtime+'</span></p>'
									           				+'<p class="follow-person">流程发起部门：<span class="fr follr">'+data[i].startorg+'</span></p>'
									           				+'<p class="follow-person">流程发起人：<span class="fr follr">'+data[i].startname+'</span></p>'
									           			+'</div>'
									           		+'</div>'
									           	+'</a>'	
									      	+'</li>'
			                }
			                $('.agency-list ul').append(result);
			                
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
	
	
	/*$this.index()*/
	$('.tab .item').on('click',function(){
		$('.followInfo').css('display','block')
		var $this = $(this);
		$('.agency-list ul').html('')
	    getList($this.index())
	    $this.addClass('cur').siblings('.item').removeClass('cur');
	    $('.agency-list').eq(itemIndex).show().siblings('.agency-list').hide();
	    
	    /*if(itemIndex == '0'){
		    $.ajax({
		        type: 'GET',
		        url: '/workflow/getSplitRead',
		        data:{
		        	userid:userid,
		        	start:0,
		        	limit:10000,
		        	hasread:0
		        },
		        dataType: 'json',
		        success: function(data){
		        	if(data!=""){
		        		var result=''
			                for(var i = 0; i < data.length; i++){
			                    result +=   '<li class="clearfix">'
								      		+'<a href="/followAwait.html?taskid='+data[i].taskid+'">'
								      			+'<div class="agency-right">'
								            		+'<div class="right-box">'
								            			+'<p class="follow-person">流程编号：<span class="fr follr">'+data[i].instanceid+'</span></p>'
								           				+'<p class="follow-person">发送人：<span class="fr follr">'+data[i].sendername+'</span></p>'
								           				+'<p class="follow-person">创建时间：<span class="fr follr">'+data[i].createtime+'</span></p>'
								           				+'<p class="follow-person">流程发起部门：<span class="fr follr">'+data[i].startorg+'</span></p>'
								           				+'<p class="follow-person">流程发起人：<span class="fr follr">'+data[i].startname+'</span></p>'
								           			+'</div>'
								           		+'</div>'
								           	+'</a>'	
								      	+'</li>'
		                }
		                $('.agency-list').append(result);
		                $('.followInfo').css('display','none');
		                
		        	}else{
		        		$('.conSearch').text()
		        		$('.agency-list').append('<div class="conText">暂无数据</div>')
		        		$('.followInfo').css('display','none')
		        	}
		        				            
	        		},
	        		error: function(err){
	        		    console.log(err);
	        		}
				});
	// 加载菜单二的数据
		}else if(itemIndex == '1'){
			$('.followInfo').css('display','block')
		    $.ajax({
		        type: 'GET',
		        url: '/workflow/getSplitRead',
		        data:{
		        	userid:userid,
		        	start:0,
		        	limit:10000,
		        	hasread:1
		        },
		        dataType: 'json',
		        success: function(data){
		        	
		        	if(data!=""){
		        		var result = '';
			            for(var i = 0; i < data.length; i++){
			                result +=   '<li class="clearfix">'
						                	+'<a href="/followAlready.html?instanceid='+data[i].instanceid+'">'
								      			+'<div class="agency-right">'
								            		+'<div class="right-box">'
								            			+'<p class="follow-person">流程编号：<span class="fr follr">'+data[i].instanceid+'</span></p>'
								           				+'<p class="follow-person">发送人：<span class="fr follr">'+data[i].sendername+'</span></p>'
								           				+'<p class="follow-person">创建时间：<span class="fr follr">'+data[i].createtime+'</span></p>'
								           				+'<p class="follow-person">流程发起部门：<span class="fr follr">'+data[i].startorg+'</span></p>'
								           				+'<p class="follow-person">流程发起人：<span class="fr follr">'+data[i].startname+'</span></p>'
								           				
								           			+'</div>'
								           		+'</div>'
								           	+'</a>'
										+'</li>'
			            }
			            $('.agency-list').append(result);
			           
		        	}else{
		        		$('.conSearch').text()
		        		$('.agency-list').append('<div class="conText">暂无数据</div>')
		        		
		        	}
		        	$('.followInfo').css('display','none')
		        },
		        error: function(err){
		            console.log(err);
		        }
		    })
		}*/
	})
	//$('.tab .item').eq(0).click()
})






