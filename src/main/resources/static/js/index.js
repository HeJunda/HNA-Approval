new Vue({
    el:'#app',
    data:{
      date:{},
      dataes:'',
      number:'',
      loading:false,
      Ishow:false
    },
    created:function(){
    		var users=getCookie('userid')
        	var _this=this;
        	var token='6666';
        	if(token!=''){
        		_this.loading=true;
    			removeCookie('userid')
//    			axios.get("/user/getSSOInfo",{params:{token:token}}).then(function(response){
//             	_this.date=response.data.UserAccount;
             	document.cookie = 'userid'+'='+'6666';
             	var user=getCookie('userid')
        			axios.get('/user/testBohaiLoginNOPWD',{params:{userid:user}}).then(function(response){  
           	        _this.dataes=response.data;
           	   		_this.loading=false;
	           	   	axios.get('/workflow/getAwaitTotalNum',{params:{userid:user}}).then(function(response){
	            		_this.number=response.data;
	            		_this.Ishow=true
	           	    }).catch(function(error){
	           	        console.log(error);
	           	    });
           	    }).catch(function(error){
           	        console.log(error);
           	    });
//             }).catch(function(error){
//                 console.log(error);
//             });
    		}else{
    			_this.dataes=true;
      	   		_this.loading=false;
    		}	
    },
    methods:{
    	agency:function(){
    		if(this.dataes=true){
    			window.location.href='agenList.html'
    	    }
    	},
    	follow:function(){
    		if(this.dataes=true){
    			window.location.href='follow.html'
    	    }
    	},
    	message:function(){
    		if(this.dataes=true){
    			window.location.href='message.html'
    	    }
        },
        project:function(){
        	if(this.dataes=true){
    			window.location.href='project.html'
    	    }
        },
        search:function(){
        	if(this.dataes=true){
    			window.location.href='search.html'
    	    }
        }
    }
})