var vm=new Vue({
	el:'#app',
	data:{
      showDom:false,
      showLayer:false,
      showuser:false,
      showLange:false,
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
			//console.log(_this.digital)
			//_this.actionlist=JSON.parse(response.data.actionlist);
			//console.log("@@@@@"+response.data[0].instanceid);
			_this.add=response.data[0].instanceid;
			vm.showHistory();
		}).catch(function(error){
		    console.log('服务错误');
		});		
	},
	computed:{
		showHistory:function(){
			$('.dropload-down').remove();
			var _this=this;
			var instance=_this.add;
			var user=getCookie('userid');
			var start=0;
			$("#history").dropload({
				scrollArea : window,
				loadDownFn : function(me){
					if(_this.histry.length>=10){
						start=_this.histry.length;
					}
					axios.get("/workflow/getHistoricalApproval",{params:{userid:user,start:start,limit:10,instanceid:instance}}).then(function(response){
						if(response.data.length>0){
							_this.histry=_this.histry.concat(response.data)
 							var att=_this.histry[0].attach
 							_this.annex=JSON.parse(att);
						 	}else{
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
	        	    	_this.status=""
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
			this.showuser=!this.showuser;
			var taskId=this.digital.taskid;
			//var parames=parame.value;
			//var paramename=parame.nodename;
			var parm=this.parms.type;
			var names=this.parms.value;
			var instance=this.digital.instanceid;
			var noname=this.noname;
			
			var _this=this
			var user=getCookie('userid')
			axios.get('/workflow/selectPerson',{params:{userid:user,start:0,taskid:taskId,actionvalue:names,nodename:noname,actiontype:parm,instanceid:instance}}).then(function(response){
				_this.person=response.data;
				console.log(_this.person)
				var personList=[];
				_this.person.forEach(function(i,index,array){
					var arrUser=i.userid
					personList.push(arrUser);
				})
				
				$(".content ul").on("click",$(".content li"),function(ev){
					var ev = ev || window.event;
					var target = ev.target || ev.srcElement;
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
			_this.personStr=personArr.join(",")
			//console.log(_this.personStr)
			if($(".bg").length=="0"){
				layer.open({
				    content: '请添加选择人',
				    skin: 'msg',
				    style: 'background-color:#ccc; color:#fff; border:none;',
				    time: 1
				});
			}
		},
			
		/*常用语*/
		lane:function(){
			var _this=this;
			var user=getCookie('userid');
			axios.get("/workflow/getCommonlanguage",{params:{userid:user}}).then(function(response){
    			console.log(response.data)
        		/*_this.language=response.data
        		console.log(_this.language)*/
    			var html='';
    			$.each(response.data,function(i,val){
    				html+='<option class="option" value="'+response.data[i].phrase+'">'+response.data[i].phrase+'</option>'
    			});
    				var L=layer.open({
    					type: 1,
    					anim: 'up',
    					style: 'position:fixed; bottom:0; left:0; width: 100%; height: 200px; padding:10px 0; border:none;box-shadow: 0;',
    					content: html+"<p class='option'>取消</p>"
    			})
    			$(document).on("click","option",function(){  
    				var value=$(this).val()
    				console.log(value)
    				$("#sele").val(value)
    				layer.close(L)
    			}); 
				$(document).on("click","p",function(){  
    				layer.close(L)
    			}); 
        		
        	},function(err){
        		console.log(err)
        	})
		},
		/*点击提交*/
		submit:function(){
			/*if(this.opinion=="" || this.activeName==""){
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
			console.log(comebacks)
			var formtypes=this.digital.formtype;
			var taskId=this.digital.taskid;
			var personStrs=this.personStr;
			var nonames=this.noname;
			console.log(nonames)
			var user=getCookie('userid')
			axios.post("/workflow/processProcessing",{userid:user,taskid:taskId,nextopermap:nonames,actionname:parm.name,remark:str,actiontype:parm.type,actionvalue:parm.value,comeback:comebacks,formtype:formtypes,receiveuserids:personStrs}).then(function(response){
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
