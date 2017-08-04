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
			axios.get("/workflow/getAwaitMessage",{params:{userid:user,start:0,limit:10}}).then(function(response){
				_this.datas=response.data;
				console.log(_this.datas)
				}).catch(function(error){
			    console.log(error);
			});
		}
})

var myScroll = new IScroll('#clearfix', {  
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
});  