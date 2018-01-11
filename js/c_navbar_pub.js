var app_id = GetParameter('app_id');

//获取商家信息
function get_appmesg_param() {
	var _param = {};
	var _data = {};
	var app_id = GetParameter('app_id');

	_data.app_id = app_id;

	_param.action_sort = "901211";
	_param.data = _data;
	_param = JSON.stringify(_param);
	//console.log("输出", _param)
	return _param;
}

function get_appmesg() {
	$.ajax({
		type: 'post',
		dataType: "json",
		contentType: "application/json",
		data: get_appmesg_param(),
		url: "pubConfig",
		async: false,
		success: function(data) {
			obj = data;
			//console.log("信息", data)
			flag_val = data.Flag;
			msg_val = data.Msg;
			if(flag_val == 1) {
				logo_url = data.Data.app_logo;
				app_name = data.Data.app_banner;
				$("title").html(data.Data.app_name);
				banner_background_color = data.Data.banner_background_color;
				navber_add(logo_url, app_name);
				$(".background_blue").css("background-color", banner_background_color);
				$(".weui-tab").show();
			} else {
				$.alert(msg_val);
			}
		},
		error: function() {
			$.alert("服务器忙碌，请稍候重试！");
		},
		complete: function() {
			back_index_js();
		}
	});
}

function navber_add(logo_url, app_name, share_logo_url) {
	var navber_content = $(".weui-tab");
	navber_content.prepend(
		"<div class='weui-navbar background_blue'>" +
		"<div class='weui-flex width_all'>" +
		/*"<img id='back_index' src='img/Back.png' class='back_style'/>" +*/
		"<div id='back_index' class='logo_box'>" +
		"<img src='" + logo_url + "' class='logo_style' />" +
		"</div>" +
		"<div class='weui-flex__item'>" +
		"<div class='name_box'>" +
		"<img id='back_menu' src='" + app_name + "' class='name_style' />" +
		"</div>" +
		/*"<div id='back_menu' class='company_namebox'>" + app_name + "</div>" +*/
		"</div>" +
		"</div>" +
		"</div>"

	);
}

//获取url参数
function GetParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return decodeURIComponent(r[2]);
	return null;
}

function back_index_js() {
	//返回按钮
	$("#back_index").click(function() {
		window.history.back(-1);
	})
	//返回商家主页
	$("#back_menu").click(function() {
		var num = Math.random();
		window.location.href = "c_company_menu.html?app_id=" + app_id + "&random=" + num;
	})
}

//flag参数判断,后台用
function flag_type(flag_val, msg_val) {
	var url = window.location.href; //获取带参数文件名
	var page = url.substring(url.lastIndexOf('/') + 1, url.length);
	if(flag_val == -11) {
		window.location.href = "redirectPage_prod.jsp?page=" + page;
	} else {
		$.alert(msg_val);
	}
}

var app_id = GetParameter('app_id');
//返回主目录
$(".merchant_nav_title label").click(function() {
	window.location.href = "c_homepage_prod.html?app_id=" + app_id;
})

$(".out_homepage").click(function() {
	window.location.href = "c_homepage_prod.html?app_id=" + app_id;
})
//返回按钮
$(".history_back").click(function() {
	window.history.back(-1);
})