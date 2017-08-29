new Vue({
    el:'#app',
    data:{
      date:{},
      dataes:{},
      loading:true
    },
    created:function(){
    		var users=getCookie('userid')
        	var _this=this;
        	var token=window.hna.SsoToken;
        	if(token!=''){
    			removeCookie('userid')
    		}else{
    			_this.dataes==true;
      	   		_this.loading=false;
    		}
           	axios.get("/user/getSSOInfo",{params:{token:token}}).then(function(response){
             	_this.date=response.data.UserAccount;
             	document.cookie = 'userid'+'='+_this.date;
             	var user=getCookie('userid')
        			axios.get('/user/testBohaiLoginNOPWD',{params:{userid:user}}).then(function(response){  
           	        _this.dataes=response.data;
           	   		_this.loading=false;
           	    }).catch(function(error){
           	        console.log(error);
           	    });
             }).catch(function(error){
                 console.log(error);
             });
        	
    },
    methods:{
    	agency:function(){
    		if(this.dataes==true){
    			window.location.href='agenList.html'
    	    }
    	},
    	follow:function(){
    		if(this.dataes==true){
    			window.location.href='follow.html'
    	    }
    	},
    	message:function(){
    		if(this.dataes==true){
    			window.location.href='message.html'
    	    }
        },
        project:function(){
        	if(this.dataes==true){
    			window.location.href='project.html'
    	    }
        },
        search:function(){
        	if(this.dataes==true){
    			window.location.href='search.html'
    	    }
        }
    }
})