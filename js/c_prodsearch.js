$(function() {
	var app_id = GetParameter('app_id');
	get_appmesg();
	//商品分类 
	function prod_type_param() {
		var _param = {};
		var _data = {};

		_param.action_sort = "40199";
		_param.app_id = app_id;
		_param.data = _data;

		_param = JSON.stringify(_param);
		//console.log("输出", _param)
		return _param;
	}

	$("#search_typelist").ready(function() {
		$.ajax({
			type: 'post',
			dataType: "json",
			contentType: "application/json",
			data: prod_type_param(),
			url: "prod",
			success: function(data) {
				//console.log(data);
				flag_val = data.Flag;
				msg_val = data.Msg;
				if(flag_val == 1) {
					var _data = data.Data.List;
					var listcontent = $("#search_typelist");
					for(var i = 0; i < _data.length; i++) {
						listcontent.append(
							"<li value='" + _data[i].id + "'>" + _data[i].sysname + "</li>"
						);
					}
				} else {
					$.alert(msg_val);
				}
			},
			error: function() {},
			complete: function() {
				prod_list_detail(1, "", "");
			}
		})
	})

	//列表填充
	function prod_list_param(page, searchtext, prodsort) {
		var _param = {};
		var _data = {};

		_data.page_no = page;
		_data.page_size = 10;
		_data.searchtext = searchtext;
		_data.prodsort = prodsort;

		_param.action_sort = "40101";
		_param.app_id = app_id;
		_param.data = _data;
		_param = JSON.stringify(_param);
		//console.log("输出", _param)
		return _param;
	}

	//商品列表
	var page = 1;

	function prod_list_detail(page, searchtext, prodsort) {
		flag_val = "";
		has_next = "";
		//console.log("页数", page);
		$.ajax({
			type: 'post',
			dataType: "json",
			contentType: "application/json",
			data: prod_list_param(page, searchtext, prodsort),
			url: "prod",
			success: function(data) {
				//console.log("商品列表", data)
				flag_val = data.Flag;
				msg_val = data.Msg;
				if(flag_val == 1) {
					var _data = data.Data.List;
					var listcontent = $(".right_div");
					has_next = data.Data.has_next;
					if(_data.length == 0) {
						$("#login_up").hide();
						$(".right_div").css("border-bottom", "none");
						listcontent.append(
							"<div id='shop_none' class='text_align_center'>" +
							"<img src='img/119.png' style='width: 68px;height: 65px;margin-top: 25px;' />" +
							"<div class='weui-flex'>" +
							"<label class='text_size_15 mag_auto'>SORRY,没有找到商品数据！</label>" +
							"</div>" +
							"</div>"
						);
					} else {
						$(".right_div").css("border-bottom", "1px solid #e5e5e5");
						for(var i = 0; i < _data.length; i++) {
							listcontent.append(
								"<a href='c_proddetail.html?app_id=" + _data[i].app_id + "&prodid=" + _data[i].prodid + "' class='weui-media-box weui-media-box_appmsg list_shop_box shop_detali_click'>" +
								"<div class='weui-media-box__hd'>" +
								"<img class='img_shop' src=" + _data[i].prodpic + ">" +
								"</div>" +
								"<div class='weui-media-box__bd'>" +
								"<label class='shop_name'>" + _data[i].prodname + "</label>" +
								"<label class='weui-media-box__desc shop_der'>" + _data[i].proddes + "</label>" +
								"</div>" +
								"</a>"
							);
						}
					}
				} else {
					$.alert(msg_val);
				}
			},
			error: function() {
				$.alert("服务器忙碌，请稍候重试！");
			},
			complete: function() {
				if(flag_val == 1 && has_next > 0) {
					//滚动加载
					loadmore(page);
				} else {
					$("#login_up").hide();
				}
			}
		});
	}

	/*滚动加载*/
	function loadmore(page) {
		$("#login_up").show();
		++page;
		var loading = false; //状态标记
		var searchtext = $("#searchInput").val();
		var prodsort = $(".page_left").find(".active").val();
		if(prodsort == "0") {
			prodsort = "";
		}
		$(".page_right").infinite().off("infinite").on("infinite", function() {
			if(loading) return;
			loading = true;
			setTimeout(function() {
				//列表更新
				prod_list_detail(page, searchtext, prodsort)
			}, 500);
		});
	}

	//搜索方法
	function search_list_js() {
		$(".right_div").html("");
		var searchtext = $("#searchInput").val();
		var prodsort = $(".page_left").find(".active").val();
		if(prodsort == "0") {
			prodsort = "";
		}
		//读取列表方法
		prod_list_detail(page, searchtext, prodsort)
	}

	//点击搜索
	$("#search_shop").click(function() {
		search_list_js();
	});

	//回车搜索
	$("#searchInput").keydown(function() {
		if(event.keyCode == 13) { //回车键的键值为13
			search_list_js();
		}
	});

	//分类搜索
	$(".page_left").off("click", "li").on("click", "li", function() {
		$(".right_div").html("");
		// 设index为当前点击
		var index = $(this).index();
		var prodsort = $(this).val();
		var searchtext = $("#searchInput").val();
		//console.log("prodsort", prodsort)
		if(prodsort == "0") {
			prodsort = "";
		}
		//console.log("prodsort2", prodsort)
		prod_list_detail(page, searchtext, prodsort);
		// 点击添加样式利用siblings清除其他兄弟节点样式
		$(this).addClass("active").siblings().removeClass("active");
		// 同理显示与隐藏
	})
})