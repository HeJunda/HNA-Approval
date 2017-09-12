
 	var itemIndex = sessionStorage.getItem('flag')
 	var searchs=false;
     //$this.addClass('cur').siblings('.item').removeClass('cur');
    $('.searNav').eq(itemIndex).addClass('cur')
    function getList(item){
		$('.agency-list').find('ul').html('');
		isSear = false;
		itemIndex = item;
		start=0;
		// 解锁
		var urls = itemIndex == 0?'/workflow/getMyInitiatedProcess/':'/workflow/getDoneMessage/';
		console.log(itemIndex)
        dropload.unlock();
        dropload.noData(false);
     	// 重置
        dropload.resetload();
        
	}

	var start = 0;//开始位置初始化
	var userid = getCookie("userid");//用户id
	var keywork=[];
	
	var dropload=$('#active').dropload({
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
			var urls = itemIndex == 0?'/workflow/getMyInitiatedProcess/':'/workflow/getDoneMessage/';
			var gulpval=document.getElementById('gulpwork');
			gulpval.value="";
			$.ajax({
                type: 'GET',
                url: urls,
                data:{
                	start:0,
                	limit:10,
                	userid:userid
                },
                dataType: 'json',
                success: function(data){
                		var ahtml = "";
                		
                	    for(var i=0;i<data.length;i++){
                	    	var startname = itemIndex == 0 ? data[i].startername : data[i].starter;
                    		var startorg = itemIndex == 0 ? data[i].starterorgname : data[i].startorg;
                		   ahtml= ahtml+ '<li class="clearfix">'
				                             +'<a href="/searchDetail.html?instance='+data[i].instanceid+'">'
				                           		  +'<div class="agency-right">'
				                           		  +'<div class="right-box">'
				                              		+'<h3 class="agenText">'+data[i].flowname+'</h3>'
				                              		+'<p class="follow-person">流程编号：<span class="fr">'+data[i].instanceid+'</span></p>'
				                              		+'<p class="follow-person">发起人：<span class="fr">'+startname+'</span></p>'
				                              		+'<p class="follow-person">发起时间：<span class="fr">'+data[i].starttime+'</span></p>'
				                              		+'<p class="follow-person">当前审批人：<span class="fr">'+data[i].assigneename+'</span></p>'
				                              		+'<p class="follow-person">当前审批部门：<span class="fr">'+startorg+'</span></p>'
				                              		+'<span class="prompt fr">'+data[i].flowstatus+'</span>'
				                                  +'</div>'
				                                  +'</div>'
				                             	+'</a>'
				                           +'</li>'
				                           +'<p class="space"></p>'
                	   }
                	    setTimeout(function(){
                	    	$('.agency-list').find('ul').html(ahtml);
                            // 每次数据加载完，必须重置
                            me.resetload();
                            // 重置页数，重新获取loadDownFn的数据
                            start = 10;
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
        	searchs=false;
            // 加载菜单一的数据
        	var urls = itemIndex == 0?'/workflow/getMyInitiatedProcess/':'/workflow/getDoneMessage/';
        	
                $.ajax({
                    type: 'GET',
                    url: urls,
                    timeout:10000,
                    data:{
                    	start:start,
                    	limit:10,
                    	userid:userid
                    },
                    dataType: 'json',
                    success: function(data){
                    		var ahtml = "";
                    		
                    	    if(data!=''){
                    	    	for(var i=0;i<data.length;i++){
	                    	    	var startname = itemIndex == 0?data[i].startername:data[i].starter;
	                        		var startorg = itemIndex == 0?data[i].starterorgname:data[i].startorg;
	                        		var one= '/searchDetail.html?instance='+data[i].instanceid+''
				                	var two= '/searchAwait.html?instance='+data[i].instanceid+''
				                	var hrefs = itemIndex == 0 ? one: two;
	                    		    ahtml= ahtml+ '<li class="clearfix">'
						                             +'<a href="'+hrefs+'">'
						                           		  +'<div class="agency-right">'
						                           		  +'<div class="right-box">'
						                              		+'<h3 class="agenText">'+(data[i].flowname==undefined?"":data[i].flowname)+'</h3>'
						                              		+'<p class="follow-person">流程编号：<span class="fr">'+(data[i].instanceid==undefined?"":data[i].instanceid)+'</span></p>'
						                              		+'<p class="follow-person">发起人：<span class="fr">'+startname+'</span></p>'
						                              		+'<p class="follow-person">发起时间：<span class="fr">'+(data[i].starttime==undefined?"":data[i].starttime)+'</span></p>'
						                              		+'<p class="follow-person">当前审批人：<span class="fr">'+(data[i].assigneename==undefined?"":data[i].assigneename)+'</span></p>'
						                              		+'<p class="follow-person">当前审批部门：<span class="fr">'+startorg+'</span></p>'
						                              		+'<span class="prompt fr">'+data[i].flowstatus+'</span>'
						                                  +'</div>'
						                                  +'</div>'
						                             	+'</a>'
						                           +'</li>'
						                           +'<p class="space"></p>'
                    	    	}
                    	   }else{
                        	   me.lock();
                        	   me.noData();

                           }
                    	// 为了测试，延迟1秒加载
                           setTimeout(function(){
                               $('.agency-list').find('ul').append(ahtml);
                               start+=10;
                               var name=[]
                               for(var i=0;i<data.length;i++){
                            	   name=data[i].flowname
                               	   keywork.push(name)
                               } 
                               searchs=true;
                               // 每次数据加载完，必须重置
                               me.resetload();
                               if(isSear){
                            	   dropload.lock();
                            	   dropload.noData();
                            	   dropload.resetload();
                               }
                           },1000);
                    	
                        
                    },
                    complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
                	　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
                	 　　　　　 ajaxTimeoutTest.abort();
                	　　　　　  layer.open({
	                		    content: '请求超时'
	                		        ,skin: 'msg'
	                		        ,time: 2 //2秒后自动关闭
	                		      });
                	　　　　}
                	　　},
                    error: function(xhr, type){
                        //alert('Ajax error!');
                        // 即使加载出错，也得重置
                        me.resetload();
                    }
                });
        	}
    });
    $('.tab .item').on('click',function(){
    	console.log(searchs)
    	if(searchs){
    		var gulpval=document.getElementById('gulpwork')
    		sessionStorage.setItem('flag',$(this).index())
    		$('.followInfo').css('display','block')
    		var $this = $(this);
    		console.log($this.index())
    		$('.agency-list ul').html('')
    	    getList($this.index())
    	    console.log($this.index())
    	    $this.addClass('cur').siblings('.item').removeClass('cur');
    	    $('.agency-list').eq(itemIndex).show().siblings('.agency-list').hide();
    	    keywork=[];
    	    gulpval.value=""
    	}
	})

var isSear = false;
//实现搜索
function sear(){
	if(searchs){
	var lis=$('li')
	var gulpval=document.getElementById('gulpwork')
	var txt = gulpval.value
	if(txt==''){
		getList(itemIndex)
		isSear = true;
	}
	
	for(i=0;i<lis.length;i++){
		lis.eq(i).css("display","none");
	}
//	console.log(lis.length)
//	console.log(keywork.length)
	for(var i=0; i<keywork.length; i++){
		if(keywork[i].indexOf(txt)>-1){
//			console.log(lis[i])
			lis.eq(i).css("display","block");
		}
	}
	if(!isSear){
 	   dropload.lock();
 	   dropload.noData();
 	   dropload.resetload();
    }
	}
}