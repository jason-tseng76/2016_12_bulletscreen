var socket;
var wsUri = "http://lab.medialand.com.tw/";
var wWidth, wHeight;
var _id;
var colorIndex = 0;
var colors = ["#ffffff", "#000000", "red", "green", "blue", "brown", "purple", "gray"];

var bullets = [];

$(onReady);
function onReady() {
	_id = window.location.pathname.replace("/bulletscreen/client/","").split("/")[0];
	
	$(window).on("resize", onResize);
	onResize();

	$(".f_in_btn").on("click", msgClick);
	initSocket();

	switchColor();
	$(".f_color_btn").on("click", onColorClick);
	$(".f_alert").on("click", function() {
		$(".f_alert").hide();
	});

	startPlayer();
}
function onColorClick(e) {
	var _index = $(".f_color_btn").index(e.currentTarget);
	colorIndex = _index;
	switchColor();
}
function switchColor() {
	for (var i = 0;i < $(".f_color_btn").length; i++) {
		var dom = $(".f_color_btn").eq(i);
		var vx = i%4;
		var vy = Math.floor(i/4);
		var ry = vy;
		var ydis = 38;
		if (ry >= 1) ydis = 37;
		if (i != colorIndex)
			vy += 2;
		dom.css({
			"background-position": -vx*109 + "px " + -vy*ydis+"px"
		});
	}
}
function initSocket() {
	//socket = io(wsUri);
  socket = io({ path: '/bulletscreen/socket.io'});
	socket.on("connect", function() {
    	console.log("socket.io connected");
    	socket.emit("_id", _id);
    });
	socket.on("msg", function(data) {
		console.log(data);
	});
}
function msgClick() {
	var msg = $(".f_input").val();
	if (msg.length > 40)
		return $(".f_alert").show();
	if (msg == "") return;
	msg = msg.substr(0, 40);
	socket.emit("msg", {
		type: "bullet",
		str: msg,
		color: colors[colorIndex]
	});
	$(".f_input").val("");
}

function startPlayer() {
	var _rx = 20 + Math.random()*(wWidth-65-40);
	$(".f_player").css({
		left: _rx
	});
	nextPlayerPosition();
}
function nextPlayerPosition() {
	fireBullet();
	var _rx = 20 + Math.random()*(wWidth-65-40);
	$(".f_player").animate({
		left: _rx
	}, nextPlayerPosition);
}
function fireBullet() {
	var dom = $("<div class='f_player_bullet'></div>");
	var vx = $(".f_player").position().left + 32 - 4;
	var vy = $(".f_player").position().top;
	var ra = Math.floor(Math.random()*6);
	dom.appendTo($(".f_game"));
	dom.css({
		left: vx, top: vy, "background-position": -ra*9 +"px 0"
	}).animate({
		top: -9
	}, 5000, function() {
		dom.remove();
	});
}

var resizeTimer = 0;
function onResize() {
	clearTimeout(resizeTimer);
	wWidth = $(window).innerWidth();
	wHeight = $(window).innerHeight();

	$(".wrapper, .f_bg").css({
		width: wWidth, height: wHeight
	});
	wWidth = $(".wrapper").width();
	var bgscale = 1;
	if (wWidth/wHeight < 640/960)
		bgscale = wHeight/960;
	else
		bgscale = wWidth/640;
	var bgw = 640*bgscale;
	var bgh = 960*bgscale;
	$(".all_bg").css({
		width: bgw, height: bgh, left: (wWidth-bgw)/2, top: (wHeight-bgh)/2
	});

	if ($("body").width() != $(window).innerWidth()
		|| $("body").height() != $(window).innerHeight()
		|| $("body").width() != $(".wrapper").width()
		|| $("body").height() != $(".wrapper").height() ) {
		resizeTimer = setTimeout(onResize, 300);
	}
}