 var itemIndex = 0;
	function getList(item){
		$('.agency-list').find('ul').html('');
		itemIndex = item;
		start=0;
		// 解锁
		var urls = itemIndex == 0?'/workflow/getDoneMessage/':'/workflow/getMyInitiatedProcess/';
		console.log(itemIndex)
        dropload.unlock();
        dropload.noData(false);
     	// 重置
        dropload.resetload();
	}
	var start = 0;
	var rows = 10;
	var userid = getCookie("userid");
	var keywork=[];

/*function tab(index){
	$("#tab-nav").find("p").eq(index).addClass("cur").siblings('p').removeClass('cur');
	start = -10;
	$(".agency-list").html("<ul></ul>");
	pullLoadData();
	$('.conText').remove()
}

tab(0);*/
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
            $.ajax({
                type: 'GET',
                url: '/project/getProjectList',
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
             	   		}
                		setTimeout(function(){
                			$('.agency-list').find('ul').html(ahtml);
                			var name=[]
                			for(var i=0;i<data.length;i++){
                				name=data[i].projectname
                				keywork.push(name)
                			}     
    		                start=0;
    		                me.resetload();
    		                if(data.length>=10){
    		                	me.noData();
                                me.unlock();
    		                }
                		},1000);
                	},
                	error: function(xhr, type){
                		me.resetload();
	                }
	            });
	    	},
	        loadDownFn : function(me){
                $.ajax({
                    type: 'GET',
                    url: '/project/getProjectList',
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
                            			me.resetload();
                            		},1000);
                    	},
                    	error: function(xhr, type){
                        me.resetload();
                    }
                });
        	}
	    	
    });
    $('.tab .item').on('click',function(){
		$('.followInfo').css('display','block')
		var $this = $(this);
		console.log($this.index())
		$('.agency-list ul').html('')
	    getList($this.index())
	    $this.addClass('cur').siblings('.item').removeClass('cur');
	    $('.agency-list').eq(itemIndex).show().siblings('.agency-list').hide();
	})

//实现搜索
function sear(){//点击
    // dropload
	var lis=document.getElementsByTagName('li')
	var gulpval=document.getElementById('gulpwork')
	var txt = gulpval.value
	if(txt=='') {
		getList();
	}
	for(i=0;i<lis.length;i++){
		lis[i].style.display="none";
	}
	for(var i=0; i<keywork.length; i++){
		if(keywork[i].indexOf(txt)>-1){
			lis[i].style.display = 'block';
		}
	}
}














