var follow=new Vue({
	el:'#app',
	data:{
		dataes:[],
		activeClass:1,
		userid:''
	},		
	methods:{
		person:function(value){
			this.activeClass=value;
			console.log("111111");
			 var user=getCookie('userid');
			axios.get("/workflow/getDoneMessage",{params:{userid:this.userid,start:0,limit:10}}).then(function(response){
		  		  //this.dataes=response.data
				follow.dataes.push.apply(follow.dataes,res.data);
		  	  }).catch(function(error){
		  		  console.log(error);
		  	  });
		},
		approval:function(value){
			this.activeClass=value;
			console.log("222222");
			 var user=getCookie('userid');
			axios.get("/workflow/getDoneMessage",{params:{userid:this.userid,start:0,limit:10}}).then(function(response){
				follow.dataes.push.apply(follow.dataes,res.data);
		  	  }).catch(function(error){
		  		  console.log(error);
		  	  });
		}
	},
	created:function(){
  	  var _this=this;
  	  var user=getCookie('userid');
	  this.userid=user;
  	  axios.get("/workflow/getDoneMessage",{params:{userid:user,start:0,limit:10}}).then(function(response){
  		  _this.dataes=response.data
  		  console.log(_this.dataes)
  	  }).catch(function(error){
  		  console.log(error);
  	  });
  }
})
  var myScroller=new IScroll("#List",{
	mouseWheel: true,  
    scrollbars: true  
  });
  myScroller.on('scrollEnd', function(){
	var len=follow.dataes.length;
	console.log(len)
	var user=getCookie('userid')
	axios.get("/workflow/getDoneMessage",{params:{userid:user,start:len,limit:10}}).then(function(res){
		if(res.data.length!=0)
		//vm.datas.concat(res.data);	
		follow.dataes.push.apply(follow.dataes,res.data)
		console.log("____"+JSON.stringify(res.data))
		}).catch(function(error){
	    console.log(error);
	});
  });    