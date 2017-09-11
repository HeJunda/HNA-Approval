new Vue({
    el:'#app',
    data:{
      date:{},
      dataes:'',
      number:'',
      itemInd:'',
      loading:false
    },
    created:function(){
    	if(sessionStorage.getItem('count')){
    		this.number = sessionStorage.getItem('count')
    	}
    		var users=getCookie('userid')
        	var _this=this;
        	//var token=window.hna.SsoToken;
    		var token="6666";
        	if(token!=''){
        		_this.loading=true;
    			removeCookie('userid')
    			/*axios.get("/user/getSSOInfo",{params:{token:token}}).then(function(response){
             	_this.date=response.data.UserAccount;*/
             	document.cookie = 'userid'+'='+'6666';
             	var user=getCookie('userid')
        			axios.get('/user/testBohaiLoginNOPWD',{params:{userid:user}}).then(function(response){  
           	        _this.dataes=response.data;
           	   		
	           	   	axios.get('/workflow/getAwaitTotalNum',{params:{userid:user}}).then(function(response){
	            		
	           	   		_this.number=response.data;
		           	   	sessionStorage.setItem('count',_this.number)
//	            		_this.itemInd = sessionStorage.getItem('flasn')
	            		_this.loading=false;
	           	    }).catch(function(error){
	           	        console.log(error);
	           	    });
           	    }).catch(function(error){
           	        console.log(error);
           	    });
             /*}).catch(function(error){
                 console.log(error);
             });*/
    		}else{
    			axios.get('/workflow/getAwaitTotalNum',{params:{userid:user}}).then(function(response){
    				
            		_this.number=response.data;
    				_this.loading=false;
            		/*sessionStorage.setItem('flasn',_this.number)
            		_this.itemInd = sessionStorage.getItem('flasn')*/
            		
           	    }).catch(function(error){
           	        console.log(error);
           	    });
    			_this.dataes=true;
      	   		_this.loading=false;
    		}	
    },
    methods:{
    	agency:function(){
    		if(this.dataes=true && this.loading==false){
    			window.location.href='agenList.html'
    	    }
    	},
    	follow:function(){
    		if(this.dataes=true && this.loading==false){
    			window.location.href='follow.html'
    			sessionStorage.setItem('flag',0)
    	    }
    	},
    	message:function(){
    		if(this.dataes=true && this.loading==false){
    			window.location.href='message.html'
    	    }
        },
        project:function(){
        	if(this.dataes=true && this.loading==false){
    			window.location.href='project.html'
    			sessionStorage.setItem('flag',0)
    	    }
        },
        search:function(){
        	if(this.dataes=true&&this.loading==false){
    			window.location.href='search.html'
    			sessionStorage.setItem('flag',0)
    	    }
        }
    }
})