
	$("#active").height($(window).height()-108).css("overflow-y","auto").width("100%")
 	var itemIndex = sessionStorage.getItem('flag')
 	var projects = false;
    $('.searNav').eq(itemIndex).addClass('cur')
    //初始化下拉插件
	function getList(item){
		$('.agency-list').find('ul').html('');
		itemIndex = item;
		keywork = [];
		start=0;
		// 解锁
		var urls = itemIndex == 0?'/project/getProjectList/':'/project/getMyDeptProjectList/';
        dropload.unlock();
        dropload.noData(false);
     	// 重置
        dropload.resetload();
	}
	var start = 0;
	var userid = getCookie("userid");
	var keywork=[];
	var isload=false;
	var loadSize=0;
	var dropload=$('#active').dropload({
    	
        /*scrollArea : window,*/
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
		/*下拉刷新*/
		loadUpFn : function(me){
			projects = false;
			keywork=[];
			var urls = itemIndex == 0?'/project/getProjectList/':'/project/getMyDeptProjectList/';
			var gulpval=document.getElementById('gulpwork');
			gulpval.value="";
            $.ajax({
                type: 'GET',
                url: urls,
                agency: false,
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
                            var name=[]
                			for(var i=0;i<data.length;i++){
                				name=data[i].projectname
                				keywork.push(name)
                			}  
                            projects = true;
                            // 解锁loadDownFn里锁定的情况
                            me.unlock();
                            me.noData(false);
                        },1000);
                	},
                	error: function(error){
                		console.log(error)
                		me.resetload();
	                }
	            });
	    	},
	    	/*上拉加载*/
	        loadDownFn : function(me){
	        	projects=false;
	        	var urls = itemIndex == 0?'/project/getProjectList/':'/project/getMyDeptProjectList/';
	        	$.ajax({
                    type: 'GET',
                    url: urls,
                    agency: false,
                    autoLoad: false,
                    data:{
                    	start:start,
                    	limit:10,
                    	userid:userid
                    },
                    dataType: 'json',
                    success: function(data){
                    	if(!isload){
                    		isload=true;
                    	}
                    	console.log(isload);
                            if(data.length>0){
                               var ahtml = "";
                         	   for(var i=0;i<data.length;i++){
                         		   ahtml += '<li class="clearfix">'
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
		                         	  if(loadSize!=1){
		                         		 start+=10;
		                         	  }
                                	}else{
                                		 // 锁定
                                        me.lock();
                                        // 无数据
                                        me.noData()
                                	}
                            		
                            		setTimeout(function(){
                            			console.log(loadSize)
                            			if(loadSize!=1){
	                            			$('.agency-list').find('ul').append(ahtml||'');
	                            			var name=[]
	                            			for(var i=0;i<data.length;i++){
	                            				name=data[i].projectname
	                            				keywork.push(name)
	                            			}  
	                            			
                            			}
                            			loadSize+=1;
                            			projects=true;
                            			me.resetload();
                            		},1000);
                    	},
                    	error: function(error){
                    		console.log(error)
                    		me.resetload();
                    	}
                })
	        }
    	})
	

  /*  var urls = itemIndex == 0?'/project/getProjectList/':'/project/getMyDeptProjectList/';
	
	$.ajax({
        type: 'GET',
        url: urls,
        agency: false,
        autoLoad: false,
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
             		   ahtml += '<li class="clearfix">'
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
         	   		start+=10; 	
         	   		$('.agency-list').find('ul').append(ahtml||'');
	         	   	var name=[]
	    			for(var i=0;i<data.length;i++){
	    				name=data[i].projectname
	    				keywork.push(name)
	    			}  
            	}
                projects=true;
                drop();		
        	},
        	error: function(error){
        		console.log(error)
        		
        	}
    })*/
    $('.tab .item').on('click',function(){
    	if(projects){
    		var gulpval=document.getElementById('gulpwork')
    		sessionStorage.setItem('flag',$(this).index())
    		$('.followInfo').css('display','block')
    		var $this = $(this);
    		$('.agency-list ul').html('')
    	    getList($this.index())
    	    $this.addClass('cur').siblings('.item').removeClass('cur');
    	    $('.agency-list').eq(itemIndex).show().siblings('.agency-list').hide();
    	    keywork=[];
    	    gulpval.value="";
    	}
	});
	
	//实现搜索
	function sear(){//点击
	    // dropload
		if(projects){//这个才是不能点击   好吧    是不是下拉的时候不能点击了
			var lis=$('li')
			var gulpval=document.getElementById('gulpwork')
			var txt = gulpval.value
			if(txt=='') {
				getList(itemIndex);
			}else{
				for(i=0;i<lis.length;i++){
					lis.eq(i).css("display","none");
					lis.eq(i).next('p').css("display","none");
				}
				var blockLength=0;
				for(var i=0; i<keywork.length; i++){
					if(keywork[i].indexOf(txt)>-1){
						lis.eq(i).css("display","block");
						lis.eq(i).next('p').css("display","block");
						blockLength++;
					}
				}
					if(blockLength<10){
						$(".dropload-refresh").text("暂无更多数据")
					}
			 	   dropload.lock();
			 	   dropload.noData();
			 	   dropload.resetload();
				
			}
			
		}
	}
