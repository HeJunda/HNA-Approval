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
		var start = 0;
		$("#message").dropload({
			scrollArea : window,
			loadDownFn : function(me){
				var result = [];
				if(_this.data.length>=10){
					start=_this.data.length;
				}
				axios.get("/message/getMessageList",{params:{userid:user,start:start,limit:10}}).then(function(response){
					if(response.data.length>0){
						_this.data=_this.data.concat(response.data)
					 	}else if(response.data.length==0){
		                	me.lock();
		                   	me.noData();
						}
						setTimeout(function(){
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
		add(index){
			layer.open({
			    title: [
			      '消息提醒',
			      'background-color: #FFC800; color:#fff;'
			    ],
			    content:this.data[index].content
			});
		}
	}
})