/*(function(){
	var html='<div class="popup" id="popup"><h3 class="popup-title">资金划付</h3><div class="popup-content"><p>范德萨发生的</p><p><span>发起人：</span>张江</p><p><span>发起时间：</span>2017-05-12</p><p class="btn"><a href="#" no type="0" class="cance">取消</a><a yes type="1" class="ensure" href="agency.html">确定</a></p></p></div></div>';
var index=layer.open({
	type:1,
    content: html,
    shadeClose: false
}); 
var node=document.querySelector(".cance");
	node.addEventListener("touchend", function(){
	layer.close(index);
});
})()*/
var vm=new Vue({
	el:"#app",
	data:{
		data:[]
	},
	created:function(){
		var _this=this;
		var user=getCookie('userid');
		var page = 0;
		
		/*$('#message').dropload({
	        scrollArea : window,
	        loadDownFn : function(me){
	            page++;
	            var result = '';
	            $.ajax({
	                type: 'GET',
	                url: '/message/getMessageList?userid='+user+'&start='+page+'&limit=10',
	                dataType: 'json',
	                success: function(data){
	                    var arrLen = data.length;
	                    if(arrLen > 0){
	                        for(var i=0; i<arrLen; i++){
	                            result += '<ul class="msg-list">'
				                               +'<li class="clearfix" v-on:click="add('+i+')">'
				                                  +'<div class="agency-right">'
				                                    +'<div class="right-box">'
				                 	                 +'<h3 class="agency-title">'+data[i].title+'</h3>'
				                 	                 +'<p>'+data[i].content+'</p>'
				                 	                 +'<span class="time fr">'+data[i].sendDate+'</span>'
				                                    +'</div>'
				                                  +'</div>'
				                               +'</li>'
				                            +'</ul>'
	                            
	                        }
	                    }else{
	                        me.lock();
	                        me.noData();
	                    }
	                    setTimeout(function(){
	                        $('.agency-list').append(result);
	                        me.resetload();
	                    },1000);
	                },
	                error: function(xhr, type){
	                    alert('Ajax error!');
	                    me.resetload();
	                }
	            });
	        }
		})*/
		$("#message").dropload({
			scrollArea : window,
			loadDownFn : function(me){
				var result = '';
				axios.get("/message/getMessageList",{params:{userid:user,start:page++,limit:10}}).then(function(response){
					console.log(response.data)
					_this.data=response.data
					
					if(_this.data.length>0){
						//console.log(_this.data)
						vm.data.push.apply(vm.data,response.data)
				 	}else{
	                	me.lock();
	                   	me.noData();
					}
					setTimeout(function(){
	                    $('.agency-list').append(vm.data);
	                    me.resetload();
	                },1000);
				}).catch(function(error){
				 	console.log(error);
					me.resetload();
				});
			}
		})
	},
	methods:{
		add:function(i){
			layer.open({
			    title: [
			      '消息提醒',
			      'background-color: #FFC800; color:#fff;'
			    ],
			    content:this.data[i].content
			});
		}
	}
})