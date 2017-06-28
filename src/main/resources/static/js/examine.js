new Vue({
	el:'#app',
	data:{
      showDom:false,
      showHistory:false,
      showLayer:false,
      showuser:false,
      digital:{},
      histry:'',
      aclist:'',
      list:'',
      person:'',   	  
      opinion:'',
      activeName:'',
      status:'',
      actionlist:[],  
      comeback:'',
      parms:[],
      noname:[],
      personStr:'',
      moom:[],
      message:''
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
	methods:{
		/*点击更多详情*/
		showDiv:function(event){
			var _this=this;
			var user=getCookie('userid')
			var instance=this.digital.instanceid;
			axios.get("/workflow/getProcessInformation",{params:{userid:user,instanceid:instance}}).then(function(response){
				_this.dates=response.data;
				console.log(_this.dates)
			}).catch(function(error){
			    console.log(error);
			});
			
			this.showDom=!this.showDom;
				
			},
		/*点击选人*/
		showUser:function(parame){
			this.showuser=!this.showuser;
			var taskId=this.digital.taskid;
			var parames=parame.value;
			var paramename=parame.nodename;
			var parm=this.parms.type;
			var names=this.parms.value;
			var instance=this.digital.instanceid;
			var noname=this.noname;
			/*if(parm==2){
				nodename=this.noname;
			}else{
				nodename=""
			}*/
			
			var _this=this
			var user=getCookie('userid')
			axios.get('/workflow/selectPerson',{params:{userid:user,taskid:taskId,actionvalue:names,nodename:noname,actiontype:parm,instanceid:instance}}).then(function(response){
				_this.person=response.data;
				console.log(_this.person)
				var personList=[];
				_this.person.forEach(function(i,index,array){
					var arrUser=i.userid
					personList.push(arrUser);
				})
				console.info(personList)
				
				$(".content ul").on("click",$(".content li"),function(ev){
					var ev = ev || window.event;
					var target = ev.target || ev.srcElement;
					console.log($(target));
					if(target.nodeName.toLowerCase() == "li"){
						if ($(target).children().hasClass('bg')) {
							$(target).children('.bg').remove();
							$(target).removeAttr('data-id');
						}else{
							var lis=document.createElement('span')
							lis.setAttribute("class","bg");
							lis.innerHTML="√";
							if(target.nodeName.toLowerCase() == "li"){
								var ind=$(".content li").index($(target));
								console.log(ind);
								$(target).append(lis).attr('data-id',personList[ind]);
							}
						}
					}
				})
			},function(err){
				console.log(err)
			});
		},
		/*点击确定*/
		showok:function(){
			this.showuser=!this.showuser;
			var _this=this;
			var lis=$(".content li")
			var personArr=[];
			for(var i=0;i<lis.length;i++){
				if(lis.eq(i).attr('data-id')!=undefined){
					personArr.push(lis.eq(i).attr('data-id'));
				}
			}
			console.log(personArr)
			_this.personStr=personArr.join(",")
			console.log(_this.personStr)
			
		},
		
		/*历史记录*/
		showNode:function(){
			var _this=this;
			var instance=this.digital.instanceid;
			var user=getCookie('userid')
			axios.get("/workflow/getHistoricalApproval",{params:{userid:user,instanceid:instance}}).then(function(response){
				_this.histry=response.data;
				console.log(_this.histry)
				
			}).catch(function(error){
			    console.log(error);
			});
			this.showHistory=!this.showHistory;
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
		showIcon:function(name){
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
            		html=html='<div class=""><p><input type="radio" name="Comeback" value="0">下一步按原流程重新提交逐级审批</p><p><input type="radio" name="Comeback" value="1">下一步直接提交至本节点</p><p><input type="radio" checked="true" name="Comeback" value="2">由下一步处理人选择提交</p></div>';
            	}
            	var index=layer.open({
            	    content: html,
            	    btn: ['确定','取消'],
            	    yes: function(index){
            	    	var check=document.querySelectorAll("input[name='Comeback']");
            	    	for(var i=0;i<check.length;i++){
            	    		if(check[i].checked){
                	    		this.comeback=check[i].value;
                	    	}	
            	    	}
            	    	layer.close(index);
            	      }
            	  });   	
            }else{
            	this.comeback=name.comeback;
            } 
            /*人物弹出框(二)*/
            if(name.type==2||name.type==3||name.type==4||name.type==7||name.type==9){
            	document.querySelector(".person-item").style.display="block";
            	//console.log(name.type)
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
            	
            }else{document.querySelector(".person-item").style.display="none";}          
		},
		/*点击提交*/
		submit:function(){
			if(this.opinion=="" || this.activeName==""){
				layer.open({
				    content: '输入不能为空',
				    skin: 'msg',
				    style: 'background-color:#ccc; color:#fff; border:none;',
				    time: 3 
				  });
			}
			var _this=this;
			var str=this.opinion;
			var parm=this.parms;
			var comebacks=this.comeback;
			//console.log(comebacks)
			var formtypes=this.digital.formtype;
			var taskId=this.digital.taskid;
			var personStrs=this.personStr;
			var nonames=this.noname;
			var user=getCookie('userid')
			//console.log(nonames)
			axios.post("/workflow/processProcessing",{userid:user,taskid:taskId,nextopermap:"",actionname:parm.name,remark:str,actiontype:parm.type,actionvalue:parm.value,comeback:comebacks,formtype:formtypes,receiveuserids:personStrs}).then(function(response){
				console.log(response.data)
				console.log(response.data[0].code)
				if(response.data[0].code=='1'){
					alert(123)
					window.location.href='agency.html';
				}else{
					layer.open({
					    content: response.data.result,
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
		
	},
	created:function(){
		var taskId=localurl('taskid')
		//console.log(taskId)
		var user=getCookie('userid')
		console.log(user)
		var _this=this;
		axios.get("/workflow/getAwaitDetail",{params:{userid:user,taskid:taskId}}).then(function(response){
			_this.digital=response.data[0];
			//_this.actionlist=JSON.parse(response.data.actionlist);
		}).catch(function(error){
		    console.log('服务错误');
		});		
	}
});