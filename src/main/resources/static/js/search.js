var start = -10;//开始位置初始化
var rows = 10;//每页显示条数
var userid = getCookie("userid");//用户id
var keywork=[];
var ind = 0;

function tab(index){
	ind = index;
	console.log(ind)
	$("#tab-nav").find("p").eq(index).addClass("cur").siblings('p').removeClass('cur');
	//重新初始化变量
	start = -10;
	//重新初始化容器
	$(".agency-list").html("<ul></ul>");
	pullLoadData();
}
//初始加载
tab(0);
//实现下拉加载
function pullLoadData(){
	var urls = ind == 0?'/workflow/getDoneMessage/':'/workflow/getMyInitiatedProcess/';
	
    $('#active').dropload({
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
            // 加载菜单一的数据
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
                	    	var startname = ind == 0 ? data[i].starter : data[i].startername;
                    		var startorg = ind == 0 ? data[i].startorg : data[i].starterorgname;
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
                	   }
                	// 为了测试，延迟1秒加载
                       setTimeout(function(){
                           $('.agency-list').find('ul').html(ahtml);
                           var name=[]
                           for(var i=0;i<data.length;i++){
                        	   name=data[i].flowname
                           	   keywork.push(name)
                           } 
                           // 每次数据加载完，必须重置
                            start=0;
	   		                me.resetload();
	   		                if(data.length>=10){
	   		                	me.noData();
	                               me.unlock();
	   		                }
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
            // 加载菜单一的数据
                $.ajax({
                    type: 'GET',
                    url: urls,
                    data:{
                    	start:start+=10,
                    	limit:10,
                    	userid:userid
                    },
                    dataType: 'json',
                    success: function(data){
                    	console.log(data)
                    	
                    		var ahtml = "";
                    	    if(data.length>0){
                    	    for(var i=0;i<data.length;i++){
                    	    	var startname = ind == 0?data[i].starter:data[i].startername;
                        		var startorg = ind == 0?data[i].startorg:data[i].starterorgname;
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
		
                    	   }
                    	   }else{
                        	   me.lock('down');
                        	   me.noData();

                           }
                    	// 为了测试，延迟1秒加载
                           setTimeout(function(){
                               $('.agency-list').find('ul').append(ahtml);
                               var name=[]
                               for(var i=0;i<data.length;i++){
                            	   name=data[i].flowname
                               	   keywork.push(name)
                               } 
                               // 每次数据加载完，必须重置
                               me.resetload();
                           },1000);
                    	
                        
                    },
                    error: function(xhr, type){
                        //alert('Ajax error!');
                        // 即使加载出错，也得重置
                        me.resetload();
                    }
                });
        	}
    });
}


//实现搜索
function sear(){
	var lis=document.getElementsByTagName('li')
	var gulpval=document.getElementById('gulpwork')
	var txt = gulpval.value
	if(txt==''){
		pullLoadData();
		$('.dropload-down').eq(0).remove()
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