var vm=new Vue({
	el:'#app',
	data:{
      showDom:false,
      showLayer:false,
      showuser:false,
      showLange:false,
      showHis:true,
      digital:{},
      ObjInfo:{},
      temes:[],
      annex:'',
      attach:'',
      histry:[],
      aclist:'',
      list:'',
      person:'',   	  
      opinion:'',
      activeName:'',
      status:'',
      actionlist:[],  
      comeback:'',
      dates:[],
      parms:[],
      noname:'',
      personStr:'',
      personUser:'',
      moom:[],
      add:'',
      language:[]
	},
	/*过滤ICON图标*/
	filters:{
		showTubiao:function(value){
			if(value=="同意"){
				return 'submit';
			}else if(value=="否决"){
				return 'overrule';
			}else if(value=="打回"){
				return 'ballBack';
			}else if(value=="分阅"){
				return 'report';
			}else if(value=="协作"){
				return 'cooperation';
			}
		}
	},
	created:function(){
		var taskId=localurl('taskid')
		var user=getCookie('userid')
		var _this=this;
		axios.get("/workflow/getAwaitDetail",{params:{userid:user,taskid:taskId}}).then(function(response){
			_this.digital=response.data[0];
			_this.add=response.data[0].instanceid;
			var instance=_this.add;
			var user=getCookie('userid');
			axios.get("/workflow/getHistoricalApproval",{params:{userid:user,start:0,limit:10000,instanceid:instance}}).then(function(response){
				_this.histry=response.data
				var att=_this.histry[0].attach
				_this.annex=JSON.parse(att);
			}).catch(function(error){
			    console.log(error);
			});
			
		}).catch(function(error){
		    console.log('服务错误');
		});		
	},
	computed:{
		showHistory:function(){
			var _this=this;
		}
	},
	methods:{
		/*点击更多详情*/
		showDiv:function(event){
			var _this=this;
			var user=getCookie('userid')
			var instance=this.digital.instanceid;
			console.log(instance)
			axios.get("/workflow/getProcessInformation",{params:{userid:user,instanceid:instance}}).then(function(response){
				console.log(response.data)
				_this.dates=response.data[0];
				var info=JSON.parse(_this.dates.flowinfo)
				//var bsicInfo=JSON.stringify(JSON.parse(info['0|基本信息']))
				_this.ObjInfo=info
				//console.log(_this.dates.attach);
				var tem=_this.dates.attach
				_this.temes=JSON.parse(tem);
			}).catch(function(error){
			    console.log(error);
			});
				this.showDom=!this.showDom;
			},
		showNode:function(){
			this.showHis=!this.showHis 
		},
		showTip:function(){
			this.showLayer=!this.showLayer;
			var _this=this;
			var taskId=_this.digital.taskid;
			var user=getCookie('userid')
			axios.get("/workflow/getAwaitDetail",{params:{userid:user,taskid:taskId}}).then(function(response){
				_this.aclist=response.data;
				_this.list=JSON.parse(_this.aclist[0].actionlist)
				console.log(_this.list);
			}).catch(function(error){
			    console.log(error);
			});
		},
		hideDiv:function(){
			this.showLayer=!this.showLayer;
		},
		/*处理*/
		showIcon:function(name){
			var _this=this;
			this.showLayer=!this.showLayer;
	        this.activeName = name.name;
	        this.status=name.name;
	        this.parms=name;
	        var names=name.value;
	        var taskId=this.digital.taskid;
	        /*弹出框(一)*/
	        if(name.comeback!='0' && name.comeback!=""){
	        	this.comeback=name.comeback;
	        	var html='';
	        	if(this.comeback==1){
	        		html='<div class="comeback"><p><input type="radio" checked="true" name="Comeback" value="0">下一步按原流程重新提交逐级审批</p><p><input type="radio" name="Comeback" value="1">下一步直接提交至本节点</p><p><input type="radio" name="Comeback" value="2">由下一步处理人选择提交</p></div>';
	        	}else if(this.comeback==2){
	        		html='<div class=""><p><input type="radio" name="Comeback" value="0">下一步按原流程重新提交逐级审批</p><p><input type="radio" checked="true" name="Comeback" value="1">下一步直接提交至本节点</p><p><input type="radio" name="Comeback" value="2">由下一步处理人选择提交</p></div>';
	        	}else if(this.comeback==3){
	        		html='<div class=""><p><input type="radio" name="Comeback" value="0">下一步按原流程重新提交逐级审批</p><p><input type="radio" name="Comeback" value="1">下一步直接提交至本节点</p><p><input type="radio" checked="true" name="Comeback" value="2">由下一步处理人选择提交</p></div>';
	        	}
	        	var index=layer.open({
	        	    content: html,
	        	    btn: ['确定','取消'],
	        	    yes: function(index){
	        	    	 var check=document.querySelectorAll("input[name='Comeback']");
	        	    	 console.log(check)
	        	    	 for(var i=0;i<check.length;i++){
	        	    		 if(check[i].checked){
	            	    		 this.comeback=check[i].value;
	            	    	 }	
	        	    	 }
	        	    	 layer.close(index);
	        	    },
	        	    no: function(){
	        	    	_this.status="";
	        	    	_this.parms="";
	        	    	actionname:"";
	        	    }
	        	  });   	
	        }else{
	        	this.comeback=name.comeback;
	        }
	        /*人物弹出框(二)*/
	        if(name.type==2||name.type==3||name.type==4||name.type==7||name.type==9){
	        	document.querySelector(".person-item").style.display="block";
	        	console.log(name.type)
	        	var _this=this;
	        	if(name.type==2){
	        		var user=getCookie('userid')
	        		axios.get("/workflow/getNextNode",{params:{userid:user,actionvalue:names,taskid:taskId}}).then(function(response){
	        			console.log(response.data)
	            		_this.noname=response.data.nodename
	            		console.log(_this.noname)
	            	},function(err){
	            		console.log(err)
	            	})
	        	}else{
	            	_this.noname=""
	        	}
	        }else{
	        	document.querySelector(".person-item").style.display="none";
	        } 
		},
		/*点击选人*/
		showUser:function(parame){
			$("content li").removeClass('bg');
			$(".content ul").off("click",'li');
			this.personStr=[]
			this.showuser=!this.showuser;
			var taskId=this.digital.taskid;
			var parm=this.parms.type;
			var names=this.parms.value;
			var instance=this.digital.instanceid;
			var noname=this.noname;
			
			var _this=this
			var user=getCookie('userid')
			axios.get('/workflow/selectPerson',{params:{userid:user,start:0,taskid:taskId,actionvalue:names,nodename:noname,actiontype:parm,instanceid:instance}}).then(function(response){
				_this.person=response.data;
				var personList=[];
				var personName=[];
				_this.person.forEach(function(i,index,array){
					var arrUser=i.userid;
					var arrName=i.username;
					personList.push(arrUser);
					personName.push(arrName);
				})
				
				$(".content ul").on("click",'li',function(){
					
					var ind=$(this).index()
					if($(this).hasClass('bg')){
						$(this).removeClass('bg')
						$(this).removeAttr('data-id')
					}else{
						$(this).addClass('bg')
						$(this).attr('data-id',personList[ind])
					}
				})
				
			},function(err){
				console.log(err)
			});
		},
		/*点击确定*/
		showok:function(){
			this.showuser=!this.showuser;
			this.personUser='';
			var _this=this;
			
			var lis=$(".content li");
			var personArr=[];
			var personName=[];
			for(var i=0;i<lis.length;i++){
				if(lis.eq(i).hasClass('bg')){
					personName.push(lis.eq(i).text());
				}
				if(lis.eq(i).attr('data-id')!=undefined){
					personArr.push(lis.eq(i).attr('data-id'));
				}
			}
			_this.personStr=personName
			_this.personUser=personArr.join(',')
			console.log(_this.personUser)
			
			if($(".bg").length=="0"){
				layer.open({
				    content: '请添加选择人',
				    skin: 'msg',
				    style: 'background-color:#ccc; color:#fff; border:none;',
				    time: 1
				});
			}
			lis.removeClass('bg')
		},
			
		/*常用语*/
		lane:function(){
			var _this=this;
			var user=getCookie('userid');
			axios.get("/workflow/getCommonlanguage",{params:{userid:user}}).then(function(response){
    			console.log(response.data)
    			var html='';
    			$.each(response.data,function(i,val){
    				html+='<div class="option" value="'+response.data[i].phrase+'">'+response.data[i].phrase+'</div>'
    			});
				var L=layer.open({
					style: 'width: 80%;height: 240px;border-bottom: 1px solid #ccc',
					content: html
    			})
    			$(document).on("click",".option",function(){
    				var value=$(this).text()
    				$("#sele").val(value)
    				_this.div=value;
    				layer.close(L)
    			}); 
        		
        	},function(err){
        		console.log(err)
        	})
		},
		/*点击提交*/
		submit:function(){
			/*if($("#sele").val==""){
				layer.open({
				    content: '输入不能为空',
				    skin: 'msg',
				    style: 'background-color:#ccc; color:#fff; border:none;',
				    time: 3 
				  });
			}*/
			var _this=this;
			var str=this.opinion;
			var parm=this.parms;
			var comebacks=this.comeback;
			var formtypes=this.digital.formtype;
			var taskId=this.digital.taskid;
			var personStrs=this.personUser;
			var nonames=this.noname;
			console.log(nonames)
			var user=getCookie('userid')
			console.log(user)
			axios.post("/workflow/processProcessing",{userid:user,taskid:taskId,remark:str,nextopermap:nonames,actionname:parm.name,actiontype:parm.type,actionvalue:parm.value,comeback:comebacks,formtype:formtypes,receiveuserids:personStrs}).then(function(response){
				console.log(response.data)
				console.log(response.data[0].code)
				if(response.data[0].code=='1'){
					layer.open({
					    content: '提交成功',
					    skin: 'msg',
					    style: 'background-color:#ccc; color:#fff; border:none;',
					    time: 3 
					  });
					window.location.href='agency.html';
				}else{
					layer.open({
					    content: response.data[0].result,
					    style: 'background-color:#ccc; color:#fff; border:none;',
					    skin: 'msg',
					    time: 3 
					});
				}
			}).catch(function(response){
				console.log(response)
				layer.open({
				    content: response.result,
				    style: 'background-color:#ccc; color:#fff; border:none;',
				    skin: 'msg',
				    time: 3 
				});
			})
		}
	}
})
