var start = -10;
var rows = 10;
var userid = getCookie("userid");
var keywork=[];
function tab(index){
	$("#tab-nav").find("p").eq(index).addClass("cur").siblings('p').removeClass('cur');
	start = -10;
	$(".agency-list").html("<ul></ul>");
	pullLoadData();
}

tab(0);
function pullLoadData(){
	
    $('#active').dropload({
        scrollArea : window,
        domDown : {
			domClass : 'dropload-down',
			domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
			domLoad : '<div class="dropload-load">加载中...</div>',
			domNoData : '<div class="dropload-noData">暂无数据</div>'
		},
        loadDownFn : function(me){
                $.ajax({
                    type: 'GET',
                    url: '/project/getProjectList',
                    data:{
                    	start:start+=10,
                    	limit:10,
                    	userid:userid
                    },
                    dataType: 'json',
                    success: function(data){
                       var ahtml = "";
                       if(data==null){
							me.lock('up');
			                me.lock('down')
			                me.noData(true);
						}
                       if(data.length>0){
                    	   for(var i=0;i<data.length;i++){
                    		   ahtml=  ahtml+ '<li class="clearfix">'
					  		                        +'<a class="proList" href="/project-detail.html?projectcode='+data[i].projectcode+'&maxyield='+data[i].predictmaxyield+'">'
								                        +'<div class="agency-left">'
								                            +'<div class="lucre-name">'
								                             +'<p class="project-price">'+data[i].predictmaxyield+'%</p>'
								                             +'<p class="project-lucre">预计收益</p>'
								                            +'</div>'
								                        +'</div>'
								                        +'<div class="list-right">'
								                         	+'<div class="right-box">'
								                           	    +'<h3 class="agency-title">'+data[i].dptname+'</h3>'
								                           		+'<p>'+data[i].projectname+'</p>'
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
                       			var name=[]
                       			for(var i=0;i<data.length;i++){
                       				name=data[i].dptname
                       				keywork.push(name)
                       			}     
                       			me.resetload();
                       		},1000);
                       		
                    	},
                    	error: function(xhr, type){
                        //alert('Ajax error!');
                        me.resetload();
                    }
                });
        	}
    });
}

//实现搜索

function sear(){//点击
    // dropload
	console.log(keywork)
	var lis=document.getElementsByTagName('li')
	var gulpval=document.getElementById('gulpwork')
	var txt = gulpval.value
	console.log(txt)
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














