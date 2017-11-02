 	var itemIndex = sessionStorage.getItem('flag')
 	var projects = false;
	var projectName = '';
	var startLi = 0;
    $('.searNav').eq(itemIndex).addClass('cur')
	var userid = getCookie("userid");
    $('.tab .item').on('click',function(){
    	if(projects){
    		sessionStorage.setItem('flag',$(this).index());
            itemIndex = sessionStorage.getItem('flag');
            projectName = "";
            $('.agency-list').find('ul').html('');
            $('#gulpwork').val(''); // 清空输入框
            $(this).addClass('cur').siblings().removeClass('cur');
            startLi = 0;
            dropload.unlock(); // 解锁位置
            dropload.noData(false);
            dropload.resetload();
    	}
	});
	//实现搜索
	function sear(){ //点击
        if(projects){
            projectName = $('#gulpwork').val();
            $('.agency-list').find('ul').html('');
            itemIndex = sessionStorage.getItem('flag');
            startLi = 0;
            dropload.unlock(); // 解锁位置
            dropload.noData(false);
            dropload.resetload();
        }
	}
    var dropload=$('.js-lists').dropload({
        scrollArea : window,
        distance: 50,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑释放更新</div>',
            domLoad    : '<div class="dropload-load">加载中...</div>'
        },
        domDown : {
            domClass : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
            domLoad : '<div class="dropload-load">加载中...</div>',
            domNoData : '<div class="dropload-noData">暂无更多数据</div>'
        },
        loadUpFn : function(me){
            projects = false; // 不能点击列表
            var urls = itemIndex == 0?'/project/getProjectList/':'/project/getMyDeptProjectList/';
            $.ajax({
                type: 'GET',
                url: urls,
                agency: false,
                autoLoad: false,
                data:{
                    start:0,
                    limit:10,
                    userid:userid,
                    projectname: projectName
                },
                dataType: 'json',
                success: function(data){
                    var ahtml = "";
                    if(data.length>0){
                        for(var i=0;i<data.length;i++){
                            ahtml += '<li class="clearfix">'
                                +'<a class="proList" href="/project-detail.html?projectcode='+data[i].projectcode+'&maxyield='+data[i].predictmaxyield+'">'
                                +'<div class="agency-left">'
                                +'<div class="lucre-name">'
                                +'<p class="project-price">'+(data[i].predictmaxyield==undefined?"":data[i].predictmaxyield)+'%</p>'
                                +'<p class="project-lucre">预计收益</p>'
                                +'</div>'
                                +'</div>'
                                +'<div class="list-right">'
                                +'<div class="right-box">'
                                +'<h3 class="agency-title">'+(data[i].projectname==undefined?"":data[i].projectname)+'</h3>'
                                +'<p class="projtext">'+(data[i].dptname==undefined?"":data[i].dptname)+'</p>'
                                +'</div>'
                                +'</div>'
                                +'</a>'
                                +'</li>'
                                +'<p class="space"></p>'
                        }
                        $('.agency-list').find('ul').html(ahtml||'');
                    }
                    projects=true; // 可以点击列表
                    if(data.length<10){
                        me.noData(true);
                    }
                    me.resetload(); // 每次数据加载完，必须重置
                }
            })
            startLi = 10; // up 后 startLi从10开始
        },
        loadDownFn : function(me){
            projects = false; // 不能点击列表
            var urls = itemIndex == 0?'/project/getProjectList/':'/project/getMyDeptProjectList/';
            $.ajax({
                type: 'GET',
                url: urls,
                agency: false,
                autoLoad: false,
                data:{
                    start:startLi,
                    limit:10,
                    userid:userid,
                    projectname: projectName
                },
                dataType: 'json',
                success: function(data){
                    var ahtml = "";
                    if(data.length>0){
                        for(var i=0;i<data.length;i++){
                            ahtml += '<li class="clearfix">'
                                +'<a class="proList" href="/project-detail.html?projectcode='+data[i].projectcode+'&maxyield='+data[i].predictmaxyield+'">'
                                +'<div class="agency-left">'
                                +'<div class="lucre-name">'
                                +'<p class="project-price">'+(data[i].predictmaxyield==undefined?"":data[i].predictmaxyield)+'%</p>'
                                +'<p class="project-lucre">预计收益</p>'
                                +'</div>'
                                +'</div>'
                                +'<div class="list-right">'
                                +'<div class="right-box">'
                                +'<h3 class="agency-title">'+(data[i].projectname==undefined?"":data[i].projectname)+'</h3>'
                                +'<p class="projtext">'+(data[i].dptname==undefined?"":data[i].dptname)+'</p>'
                                +'</div>'
                                +'</div>'
                                +'</a>'
                                +'</li>'
                                +'<p class="space"></p>'
                        }
                        $('.agency-list').find('ul').append(ahtml||'');
                    }
                    if(data.length<10){
                        me.lock(); // 锁定 位置
                        me.noData(true);// 显示无数据
                    }
                    projects=true; // 可以点击列表
                    me.resetload(); // 每次数据加载完，必须重置
                }
            })
            startLi +=10 ; // 每次加10
        }
    })



































