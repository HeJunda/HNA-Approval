var start = -10;//开始位置初始化
var rows = 10;//每页显示条数
var userid = getCookie("userid");//用户id
var keywork=[];
function tab(index){
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
	
    $('#active').dropload({
        scrollArea : window,
        loadDownFn : function(me){
            // 加载菜单一的数据
                $.ajax({
                    type: 'GET',
                    url: '/workflow/getMyInitiatedProcess',
                    data:{
                    	start:start+=10,
                    	limit:10,
                    	userid:userid
                    },
                    dataType: 'json',
                    success: function(data){
                       var ahtml = "";
                    	   if(data.length>0){
                    	   for(var i=0;i<data.length;i++){
                    		   ahtml= ahtml+ '<li class="clearfix">'
					                             +'<a href="/searchDetail.html?index='+i+'">'
					                           		  +'<div class="agency-right">'
					                           		  +'<div class="right-box">'
					                              		+'<h3 class="agency-title">'+data[i].flowname+'</h3>'
					                              		+'<p class="follow-person">发起人：<span class="fr">'+data[i].startername+'</span></p>'
					                              		+'<p class="follow-person">发起时间：<span class="fr">'+data[i].starttime+'</span></p>'
					                              		+'<p class="follow-person">当前审批人：<span class="fr">'+data[i].assigneename+'</span></p>'
					                              		+'<p class="follow-person">当前审批部门：<span class="fr">'+data[i].starterorgname+'</span></p>'
					                              		+'<span class="prompt fr">'+data[i].flowstatus+'</span>'
					                                  +'</div>'
					                                  +'</div>'
					                             	+'</a>'
					                           +'</li>'
		
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
                          
                       }else if(data.length<=0||data==null){
                    	   console.log(123)
	   				 		me.lock('up');
	   		                me.lock('down')
	   		                me.noData(true);
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
}

//实现搜索
function sear(){
	var lis=document.getElementsByTagName('li')
	var gulpval=document.getElementById('gulpwork')
	var txt = gulpval.value
	if(txt=='') return;
	for(i=0;i<lis.length;i++){
		lis[i].style.display="none";
	}
	for(var i=0; i<keywork.length; i++){
		if(keywork[i].indexOf(txt)>-1){
			lis[i].style.display = 'block';
		}
	}
}