function setCookie (name,value,iDay) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+iDay);
	document.cookie = name+'='+value+';expires='+oDate;
}

function getCookie(name){
	var arr = document.cookie.split('; ');
	for (var i = 0; i < arr.length; i++) {
		var arr2 = arr[i].split('=');
		if (arr2[0] == name) {
			return arr2[1];
		};
	};
	return '';
}

function removeCookie(name){
	setCookie(name,1,-1)
}

function localurl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var url=window.location.search;
    var r = url.substr(1).match(reg);
    if (r != null) return (r[2]);
    return "";
}