function css(element,style) {
	for(att in style) {
		element.style[att] = style[att];
	}
}

var defaultLatter = document.createElement("button");

css(defaultLatter,{
	backgroundColor: "transparent",
	fontSize: "18px",
	padding: "0px",
	fontWeight: "bold",
	position: "fixed",
	cursor: "default",
	zIndex: "1",
	color: "#D20",
	border: "none"
});

var sentense = “Loira, obrigado pelos melhores meses da minha vida...”.split("");

var lastPos = null;

function dropLatter (x,y,l) {
	var newLatter = defaultLatter.cloneNode(true);
	newLatter.style.left = x+"px";
	newLatter.style.top = y+"px";
	newLatter.innerHTML = l;
	newLatter.style.transform = "rotate("+(Math.random()*20-10)+"deg)";
	var ini = new Date();
	var code = setInterval(function(){
		var x = new Date() - ini;
		x/=3000;
		if(x>1){
			clearInterval(code);
			x = 1;
		}
		newLatter.style.opacity = 1-x;
	},0);
	document.body.appendChild(newLatter);
}

var mobile = !!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

var firstButton = document.createElement("div");

firstButton.css = window.getComputedStyle(firstButton);

var fbSize = 40;

css(firstButton,{
	height: fbSize + "px",
	width: fbSize + "px",
	backgroundColor: "#D20",
	borderRadius: "50%",
	position: "fixed",
	cursor: "pointer",
	left: "50px",
	top: "50px",
	zIndex: "2"
});

function mousedown(cx,cy) {
	cx = Math.floor(cx);
	cy = Math.floor(cy);
	firstButton.iniy = cy;
	firstButton.inix = cx;
	firstButton.starty = parseInt(firstButton.css.top);
	firstButton.startx = parseInt(firstButton.css.left);
}

if(mobile){
	firstButton.addEventListener("touchstart",function(e){
		e.preventDefault();
		mousedown(e.changedTouches[0].pageX,e.changedTouches[0].pageY);
	});
}else{
	firstButton.addEventListener("mousedown",function(e){
		mousedown(e.clientX,e.clientY);
	});
}

function mouseup() {
	firstButton.inix = null;
	firstButton.iniy = null;
}

if(mobile){
	window.addEventListener("touchend",mouseup);
}else{
	window.addEventListener("mouseup",mouseup);
}

var step2 = false;
firstButton.free = true;

function step3() {
	var table = document.createElement("table");
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	td.style.textAlign = "center";
	table.appendChild(tr);
	table.style.width = "100%";
	table.style.height = "100%";
	console.log(table);
	tr.appendChild(td);
	var img = document.createElement("img");
	img.src = "s2.png";
	img.style.opacity = 0;
	td.appendChild(img);
	document.body.appendChild(table);
	var ini = new Date();
	setInterval(function(){
		var x = new Date() - ini;
		x/=2000;
		if(x>1)x=1;
		img.style.opacity = x;
	},0);
}

function step2f() {
	setTimeout(function(){
		var top = parseInt(firstButton.css.top);
		var left = parseInt(firstButton.css.left);
		firstButton.free = false;
		var ini = new Date();
		var code = setInterval(function(){
			var x = new Date() - ini;
			x = x/3000 + 1;
			if(x>2.4){
				document.body.style.backgroundColor = firstButton.css.backgroundColor;
				clearInterval(code);
				firstButton.remove();
				step3();
				return;
			}
			var sz = parseInt(firstButton.css.width);
			var d = (firstButton.style.width = firstButton.style.height = Math.floor(Math.pow(fbSize,x))) - sz;
			top -= d/2;
			left -= d/2;
			firstButton.style.top = top;
			firstButton.style.left = left;
		},0);
	},2000);
}

function mousemove(cx,cy) {
	cx = Math.floor(cx);
	cy = Math.floor(cy);
	if(firstButton.inix && firstButton.free){
		var dx = cx - firstButton.inix;
		var x = firstButton.style.left = firstButton.startx + dx;
		var dy = cy - firstButton.iniy;
		var y = firstButton.style.top = firstButton.starty + dy;
		if(lastPos==null){
			lastPos = {x:x,y:y};
		} else {
			dx = Math.abs(x-lastPos.x);
			dy = Math.abs(y-lastPos.y);
			var d = Math.sqrt(dx*dx+dy*dy);
			if(d>30){
				if(sentense.length){
					lastPos.x = x;
					lastPos.y = y;
					dropLatter(x,y,sentense[0]);
					sentense.splice(0,1);
				}else if(!step2) {
					step2 = true;
					step2f();
				}
			}
		}
	}
}

if(mobile){
	window.addEventListener("touchmove",function(e){
		var touch = e.touches[0];
		mousemove(e.pageX||touch.pageX,e.pageY||touch.pageY);
	});
}else{
	window.addEventListener("mousemove",function(e){
		mousemove(e.clientX,e.clientY);
	});
}

window.addEventListener("load",function(){
	document.body.appendChild(firstButton);
});
