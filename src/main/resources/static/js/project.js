
	$("#active").height($(window).height()-108).css("overflow-y","auto").width("100%")
 	var itemIndex = sessionStorage.getItem('flag')
 	var projects = false;
	var projectName = '';
    $('.searNav').eq(itemIndex).addClass('cur')
	function getList(item){
        $('.agency-list').find('ul').html('');
        itemIndex = item;
        renderLi();
	}
	var userid = getCookie("userid");

	function renderLi(){
        var urls = itemIndex == 0?'/project/getProjectList/':'/project/getMyDeptProjectList/';
        $.ajax({
            type: 'GET',
            url: urls,
            agency: false,
            autoLoad: false,
            data:{
                start:0,
                limit:10000,
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
                projects=true;
                $('.js-loading-info').html('没有更多数据');
            }
        })
	}
    // 渲染列表
    renderLi();
    $('.tab .item').on('click',function(){
    	if(projects){
            projects = false; // 重置为  false
    		sessionStorage.setItem('flag',$(this).index())
            $('.agency-list ul').html('');
            $(this).addClass('cur').siblings('.item').removeClass('cur');
            $('#gulpwork').val('');
            projectName = "";
            $('.js-loading-info').html('正在加载')
            getList($(this).index())
    	}
	});

	//实现搜索
	function sear(){ //点击
        if(projects){
            $('.js-loading-info').html('正在加载')
            projectName = $('#gulpwork').val();
            getList(sessionStorage.getItem('flag'));
        }
	}
