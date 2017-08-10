var vm=new Vue({
		el:"#app",
		data:{
			datas:[]
		},
		methods:{
            getTitleHref:function(val){
                return '/examine.html?taskid='+val;
            } 
        },
		created:function(){
			document.cookie = 'userid'+'='+6666;
			var user=getCookie('userid')
			var _this=this;
			var page = 0;
			var size = 10;
			$('#clearList').dropload({
		        scrollArea : window,
		        loadDownFn : function(me){
		            page++;
		            var result = '';
		            $.ajax({
		                type: 'GET',
		                url: '/workflow/getAwaitMessage?userid='+user+'&start='+page+'&limit='+size,
		                dataType: 'json',
		                success: function(data){
		                    var arrLen = data.length;
		                    if(arrLen > 0){
		                        for(var i=0; i<arrLen; i++){
		                            result +=   '<div class="agency-list AgList">'
						                            +'<ul>'
						                               +'<li class="clearfix">'
						                                	+'<a href="/examine.html?taskid='+data[i].taskid+'">'
						                                  	+'<div class="agency-right">'
						                                    		+'<div class="right-box">'
						                 	                 		+'<h3 class="agency-title">'+data[i].flowname+'</h3>'
						                 	                 		+'<p>'+data[i].nodename+'</p>'
						                                    		+'</div>'
						                                  	+'</div>'
						                            	  	+'</a>'
						                               +'</li>'
						                            +'</ul>'
						                 	     +'</div>'
		                            
		                        }
		                    }else{
		                        me.lock();
		                        me.noData();
		                    }
		                    setTimeout(function(){
		                        $('.AgList').append(result);
		                        me.resetload();
		                    },1000);
		                },
		                error: function(xhr, type){
		                    alert('Ajax error!');
		                    me.resetload();
		                }
		            });
		        }
		    });
			/*axios.get("/workflow/getAwaitMessage",{params:{userid:user,start:0,limit:10}}).then(function(response){
				_this.datas=response.data;
				console.log(_this.datas)
				}).catch(function(error){
			    console.log(error);
			});*/
			/*$("#clearList").dropload({
				scrollArea : window,
				loadDownFn : function(me){
					start=0;
					limit=10;
					var result = '';
					axios.get("/workflow/getAwaitMessage",{params:{userid:user,start:start++,limit:limit}}).then(function(response){
						console.log(response.data)
						_this.data=response.data
						
						if(_this.data.length>0){
							
					 	}else{
		                	me.lock();
		                   	me.noData();
						}
						setTimeout(function(){
		                    $('.AgList').append(result);
		                    me.resetload();
		                },1000);
					}).catch(function(error){
					 	console.log(error);
						me.resetload();
					});
				}
			})*/
		}
})

/*var myScroll = new IScroll('#clearfix', {  
    mouseWheel: true,  
    scrollbars: true  
});  
myScroll.on('scrollEnd', function(){
	var len=vm.datas.length;
	//console.log(len)
	document.cookie = 'userid'+'='+6666;
	var user=getCookie('userid')
	axios.get("/workflow/getAwaitMessage",{params:{userid:user,start:len,limit:10}}).then(function(res){
		if(res.data.length!=0)
		//vm.datas.concat(res.data);	
		vm.datas.push.apply(vm.datas,res.data)
		//console.log("____"+JSON.stringify(res.data))
		}).catch(function(error){
	    console.log(error);
	});
});  */