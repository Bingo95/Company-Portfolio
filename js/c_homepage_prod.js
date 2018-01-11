var app_id = GetParameter('app_id');

$(function() {
	/*json*/
	function homepage_param() {
		var _param = {};
		var _data = {};
		var app_id = GetParameter('app_id');

		_param.action_sort = "10001";
		_param.app_id = app_id;
		_param.data = _data;
		_param = JSON.stringify(_param);
		//console.log("输出",_param)
		return _param;
	}

	/*ajax*/
	//用户信息和数字数据获取填充
	$(document).ready(function() {
		$.ajax({
			type: "POST",
			url: "merchant",
			data: homepage_param(),
			beforeSend: function() {
				$.showLoading();
			},
			dataType: "json",
			contentType: "application/json",
			success: function(data) {
				flag_val = data.Flag;
				msg_val = data.Msg;
				//console.log("首页信息", data)
				if(flag_val == 1) {
					$(".weui-tab").show();
					var _data = data.Data;
					app_id = data.App_id;
					$(".heardimg").attr("src", _data.UserInfo.headimgurl);
					$(".username").text(_data.UserInfo.nickname);
					$(".app_name").text(appname(_data.app_name));
				} else {
					flag_type(flag_val, msg_val);
				}
			},
			error: function() {
				$.alert("服务器忙碌，请稍后再试!");
			},
			complete: function() {
				$.hideLoading();
			}
		});
	});

	//商城名字字符串截取
	function appname(app_name) {
		var maxwidth = 32;
		var len = 0;
		var stringdata;
		for(var i = 0; i < app_name.length; i++) {
			if(len < maxwidth) {
				var length = app_name.charCodeAt(i);
				if(length >= 0 && length <= 128) {
					len += 1;
					stringdata += app_name.charAt(i);
				} else {
					len += 2;
					stringdata += app_name.charAt(i);
				}
			} else {
				if(app_name.length > 16) {
					stringdata = stringdata.substring(0, stringdata.length - 1) + ".";
				} else {
					stringdata = stringdata;
				}
				break;
			}
		}
		app_name = stringdata.substring(9);
		return app_name;
	}
})

//跳转连接
$("#productlist").attr("href", "c_productlist.html?app_id=" + app_id);
$("#pubmenu").attr("href", "c_pubmenu.html?app_id=" + app_id);