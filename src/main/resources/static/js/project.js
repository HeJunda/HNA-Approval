
 	var itemIndex = sessionStorage.getItem('flag')
 	var projects = false;
    $('.searNav').eq(itemIndex).addClass('cur')
	function getList(item){
		$('.agency-list').find('ul').html('');
		isSear = false;
		itemIndex = item;
		start=0;
		// 解锁
		var urls = itemIndex == 0?'/project/getProjectList/':'/project/getMyDeptProjectList/';
//		console.log(itemIndex)
        dropload.unlock();
        dropload.noData(false);
     	// 重置
        dropload.resetload();
	}
	var start = 0;
	var rows = 10;
	var userid = getCookie("userid");
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
			domNoData : '<div class="dropload-noData">暂无数据</div>'
		},
		loadUpFn : function(me){
			var urls = itemIndex == 0?'/project/getProjectList/':'/project/getMyDeptProjectList/';
            $.ajax({
                type: 'GET',
                url: urls,
                timeout:10000,
                data:{
                	start:0,
                	limit:10,
                	userid:userid
                },
                dataType: 'json',
                success: function(data){
                	var ahtml = "";
             	    for(var i=0;i<data.length;i++){
             		   ahtml=ahtml+ '<li class="clearfix">'
		  		                        +'<a class="proList" href="/project-detail.html?projectcode='+data[i].projectcode+'&maxyield='+data[i].predictmaxyield+'">'
					                        +'<div class="agency-left">'
					                            +'<div class="lucre-name">'
					                             +'<p class="project-price">'+data[i].predictmaxyield+'%</p>'
					                             +'<p class="project-lucre">预计收益</p>'
					                            +'</div>'
					                        +'</div>'
					                        +'<div class="list-right">'
					                         	+'<div class="right-box">'
					                           	    +'<h3 class="agency-title">'+data[i].projectname+'</h3>'
					                           		+'<p class="projtext">'+data[i].dptname+'</p>'
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
                	error: function(error){
                		console.log(error)
                		me.resetload();
	                }
	            });
	    	},
	        loadDownFn : function(me){
	        	projects=false
	        	var urls = itemIndex == 0?'/project/getProjectList/':'/project/getMyDeptProjectList/';
                $.ajax({
                    type: 'GET',
                    url: urls,
                    settimeout:3000,
                    data:{
                    	start:start,
                    	limit:10,
                    	userid:userid
                    },
                    dataType: 'json',
                    success: function(data){
//                    	console.log(data)
                    		var ahtml = "";
                    		keywork=[];
                            if(data.length>0){
                         	   for(var i=0;i<data.length;i++){
                         		   ahtml=  ahtml+ '<li class="clearfix">'
     					  		                        +'<a class="proList" href="/project-detail.html?projectcode='+data[i].projectcode+'&maxyield='+data[i].predictmaxyield+'">'
     								                        +'<div class="agency-left">'
     								                            +'<div class="lucre-name">'
     								                             +'<p class="project-price">'+(data[i].predictmaxyield==undefined?"":data[i].predictmaxyield)+'%</p>'
     								                             +'<p class="project-lucre">预计收益</p>'
     								                            +'</div>'
     								                        +'</div>'
     								                        +'<div class="list-right">'
     								                         	+'<div class="right-box">'
     								                           	    +'<h3 class="agency-title">'+(data[i].projectname==undefined?"":data[i].projectname)+'</h3>'
     								                           		+'<p class="projtext">'+(data[i].dptname==undefined?"":data[i].dptname)+'</p>'
     								                           	+'</div>'
     								                        +'</div>'
     							                        +'</a>'
     					   		                  +'</li>'
     					   		                  +'<p class="space"></p>'
                         	   			}
                                	}else if(data.length==0){
                            			me.lock('down');
                            			me.noData();
                            		}
                            		
                            		setTimeout(function(){
                            			$('.agency-list').find('ul').append(ahtml);
                            			start+=10;
                            			var name=[]
                            			for(var i=0;i<data.length;i++){
                            				name=data[i].projectname
                            				keywork.push(name)
                            			}     
                            			projects=true
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
                    	error: function(error){
                    		console.log(111)
                    	console.log(error)
                        me.resetload();
                    }
                });
        	}
	    	
    });
    $('.tab .item').on('click',function(){
    	if(projects){
    		var gulpval=document.getElementById('gulpwork')
    		sessionStorage.setItem('flag',$(this).index())
    		$('.followInfo').css('display','block')
    		var $this = $(this);
//    		console.log($this.index())
    		$('.agency-list ul').html('')
    	    getList($this.index())
    	    $this.addClass('cur').siblings('.item').removeClass('cur');
    	    $('.agency-list').eq(itemIndex).show().siblings('.agency-list').hide();
    	    keywork=[];
    	    gulpval.value="";
    	}
	})

var isSear = false;
//实现搜索
function sear(){//点击
    // dropload
	var lis=$('li')
	var gulpval=document.getElementById('gulpwork')
	var txt = gulpval.value
	if(txt=='') {
		getList(itemIndex);
		isSear = true;
	}
	for(i=0;i<lis.length;i++){
		lis.eq(i).css("display","none");
	}
//	console.log(lis.length)
//	console.log(keywork.length)
	for(var i=0; i<keywork.length; i++){
		if(keywork[i].indexOf(txt)>-1){
			lis.eq(i).css("display","block");
		}
	}
	if(!isSear){
 	   dropload.lock();
 	   dropload.noData();
 	   dropload.resetload();
    }
}














