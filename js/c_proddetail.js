$(function() {
	get_appmesg();
	//获取商品详情
	function get_prod_param() {
		var _param = {};
		var _data = {};
		var app_id = GetParameter('app_id');
		var prodid = GetParameter('prodid');

		_data.prodid = prodid;
		_data.app_id = app_id;

		_param.action_sort = "40102";
		_param.data = _data;
		_param = JSON.stringify(_param);
		//console.log("输出", _param)
		return _param;
	}
	get_prod_detail();

	function get_prod_detail() {
		$.ajax({
			type: 'post',
			dataType: "json",
			contentType: "application/json",
			data: get_prod_param(),
			url: "prod",
			success: function(data) {
				//console.log("商品信息", data)
				flag_val = data.Flag;
				msg_val = data.Msg;
				if(flag_val == 1) {
					var _data = data.Data;
					$("#detail_banner").attr("src", _data.prodpic);
					$("#prodname").text(_data.prodname);
					$("#share_des").attr("name", _data.prodname);
					$("#proddes").html(_data.proddes);
				} else {
					$.alert(msg_val);
				}
			},
			error: function() {
				$.alert("服务器忙碌，请稍候重试！");
			},
			complete: function() {}
		});
	}
})