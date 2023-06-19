//==============================
// RGScreen
//==============================

function RGScreen(elm) {
	this.objectId = this.getNewObjectId();
	this.parentElement = null;
	this.context = null;
	this.canvas = null;
	this.backgroundColor = 0;
	this.isDrawReady = false;
	this.frameRate = 60;
	this.drawTimer = null;
	this.frameRateTimer = null;
	this.pathList = new Array();
	this.textList = new Array();
	this.spriteList = new Array();
	this.drawSpriteList = new Array();
	this.printFrameRate = false;
	this.scale = 1.0;
	this.palette = null;
	this.fontFamily = '"MS Gothic", monospace';
	
	this.canvasWidth = 640;
	this.canvasHeight = 400;
	
	this.frameConter = 0;
	this.frameRealRate = 0;
	
	this.pressKeys = new Object();
	
	this.presetPalette = {
		'msx' : [
			"",         //  0 0 transparent
			"#000000",  //  1 1 black
			"#22DD22",  //  2 2 medium green
			"#66FF66",  //  3 3 light green
			"#2222FF",  //  4 4 dark blue
			"#4466FF",  //  5 5 light blue
			"#AA2222",  //  6 6 dark red
			"#44DDFF",  //  7 7 cyan
			"#FF2222",  //  8 8 medium red
			"#FF6666",  //  9 9 light red
			"#DDDD22",  // 10 A dark yellow
			"#DDDD88",  // 11 B light yellow
			"#228822",  // 12 C dark green
			"#DD44AA",  // 13 D magenta
			"#AAAAAA",  // 14 E gray
			"#FFFFFF",  // 15 F white
		],
	};
	
	if (elm != null) {
		this.parentElement = elm;
		this.initScreen();
	}
	
	this.setPresetPalette('msx');


}

RGScreen.objectIdCounter = 0;;

RGScreen.prototype.setSize = function(w, h) {
	this.canvasWidth = w;
	this.canvasHeight = h;
	
	if (this.canvas != null) {
		this.canvas.width = this.canvasWidth;
		this.canvas.height = this.canvasHeight;
	}
}

RGScreen.prototype.getSize = function() {
	var size = new Object();
	size.width = this.canvas.width;
	size.height = this.canvas.height;
	return size;
}

RGScreen.prototype.setFrameRate = function(fps) {
	this.frameRate = fps;
	if (this.drawTimer != null) {
		this._startRefresh();
	}
}

RGScreen.prototype.getNewObjectId = function() {
	return ++RGScreen.objectIdCounter;
}

RGScreen.prototype.setBackGroundColor = function(code) {
	this.backgroundColor = code;
}

RGScreen.prototype.setScale = function(scale) {
	this.scale = scale;
	if (this.canvas != null) {
		this.canvas.style.width = (this.canvasWidth * this.scale) + 'px';
		this.canvas.style.height = (this.canvasHeight * this.scale) + 'px';
	}
}

RGScreen.prototype.initScreen = function() {
	this.canvas = document.createElement('canvas');
	this.canvas.width = this.canvasWidth;
	this.canvas.height = this.canvasHeight;
	this.setScale(this.scale);
	if (this.parentElement != null) {
		this.parentElement.appendChild(this.canvas);
		this.context = this.canvas.getContext('2d');
	}
	
	// DrawStart
	this._startRefresh();
	
	var
	self = this;
	document.addEventListener("keydown", function(e) {
		//console.log(e.key + ":" + e.keyCode);
		self.pressKeys[e.key] = true;
		self.pressKeys[e.keyCode] = true;
	});
	document.addEventListener("keyup",function(e) {
		delete self.pressKeys[e.key];
		delete self.pressKeys[e.keyCode];
	});
	
}

RGScreen.prototype.clear = function(mode) {
	if (mode == null) {
		mode = 0;
	}
	
	// all
	if (mode == 0) {
		this.pathList = new Array();
		this.drawSpriteList = new Array();
		this.textList = new Array();
		for (var sp of this.spriteList) {
			sp.off();
		}
	}
	
	// graphic
	if (mode == 1) {
		this.pathList = new Array();
		this.drawSpriteList = new Array();
		for (var sp of this.spriteList) {
			sp.off();
		}
	}
	
	// text
	if (mode == 2) {
		this.textList = new Array();
	}
}

RGScreen.prototype.text = function(x, y, text, c, scale) {
	if (scale == null) {
		scale = 1.0;
	}
	
	var textData = new Object();
	textData.x = x;
	textData.y = y;
	textData.color = c;
	textData.text = text;
	textData.scale = scale;
	this.textList.push(textData);
}

RGScreen.prototype.pset = function(x, y, c, f) {
	if (f == null) {
		f = false;
	}
	var pathData = new Object();
	pathData.color = c;
	pathData.fill = f;
	pathData.path2d = new Path2D();
	pathData.path2d.rect(x + 0.5, y + 0.5, 1 ,1);
	this.pathList.push(pathData);
}

RGScreen.prototype.line = function(x1, y1, x2, y2, c, f) {
	if (f == null) {
		f = false;
	}
	var pathData = new Object();
	pathData.color = c;
	pathData.fill = f;
	pathData.path2d = new Path2D();
	pathData.path2d.moveTo(x1 + 0.5, y1 + 0.5);
	pathData.path2d.lineTo(x2 + 0.5, y2 + 0.5);
	this.pathList.push(pathData);
}

RGScreen.prototype.rect = function(x1, y1, x2, y2, c, f) {
	if (f == null) {
		f = false;
	}
	var pathData = new Object();
	pathData.color = c;
	pathData.fill = f;
	pathData.path2d = new Path2D();
	pathData.path2d.moveTo(x1 + 0.5, y1 + 0.5);
	pathData.path2d.lineTo(x2 + 0.5, y1 + 0.5);
	pathData.path2d.lineTo(x2 + 0.5, y2 + 0.5);
	pathData.path2d.lineTo(x1 + 0.5, y2 + 0.5);
	pathData.path2d.lineTo(x1 + 0.5, y1 + 0.5);
	pathData.path2d.closePath();
	this.pathList.push(pathData);
}

RGScreen.prototype.circle = function(x, y, h, c, f, start, end, dir) {
	if (start == null) {
		start = 0 * Math.PI / 180;
	}
	if (end == null) {
		end = 360 * Math.PI / 180;
	}
	if (dir == null) {
		dir = true;
	}
	var pathData = new Object();
	pathData.color = c;
	pathData.fill = f;
	pathData.path2d = new Path2D();
	pathData.path2d.arc(x, y, h, start, end, dir);
	this.pathList.push(pathData);
}
RGScreen.prototype.drawSpriteImage = function(sprite, x, y) {
	var spriteData = new Object();
	spriteData.x = x;
	spriteData.y = y;
	spriteData.sprite = sprite;
	this.drawSpriteList.push(spriteData);
}


RGScreen.prototype.path = function(pths, c, f) {
	var ps = pths;
	if (!Array.isArray(ps)) {
		ps = new Array();
	}
	if (f == null) {
		f = false;
	}
	if (ps.length > 1 && ps[0].length == 2 && ps[1].length == 2) {
		var pathData = new Object();
		pathData.color = c;
		pathData.fill = f;
		pathData.path2d = new Path2D();
		for (var i in ps) {
			if (ps[i].length == 2) {
				if (i == 0) {
					pathData.path2d.moveTo(ps[i][0] + 0.5, ps[i][1] + 0.5);
				} else {
					pathData.path2d.lineTo(ps[i][0] + 0.5, ps[i][1] + 0.5);
				}
			}
		}
		this.pathList.push(pathData);
	}
}

RGScreen.prototype.addSprite = function(sprite, index) {
	if (index != null) {
		sprite.index = index;
	} else {
		var max = 0;
		for (var sp of this.spriteList) {
			if (max > sp.index) {
				max = sp.index;
			}
			max++;
			sprite.index = max;
		}
	}
	
	sprite.objectId = this.getNewObjectId();
	sprite.parentCanvas = this;
	this.spriteList.push(sprite);
	
	var sortList = this.spriteList.sort(function(a, b) {
			return (a.index < b.index) ? -1 : 1;
		});
		
	this.spriteList = sortList;
}

RGScreen.prototype.removeSprite = function(sprite) {
	for (var i in this.spriteList) {
		if (this.spriteList[i] == sprite) {
			this.spriteList.splice(i, 1);
		}
	}
}

RGScreen.prototype.clearSprite = function() {
	this.spriteList = new Array();
}

RGScreen.prototype.getColor = function(code) {
	var color = '';
	if (code >= this.palette.length) {
		code = 0;
	}
	if (typeof(this.palette[code]) != 'undefined' && this.palette[code] != null) {
		color = this.palette[code];
	}
	return color;
}

RGScreen.prototype.setPalette = function(p) {
	if (Array.isArray(p)) {
		this.palette = p;
	}
}

RGScreen.prototype.setPresetPalette = function(p) {
	if (typeof(this.presetPalette[p]) != 'undefined') {
		this.setPalette(this.presetPalette[p]);
	}
}

RGScreen.prototype.scanKey = function(k) {
	var r = false;
	if (typeof(this.pressKeys[k]) != 'undefined' && this.pressKeys[k]) {
		r = this.pressKeys[k];
	}
	return r;
}

RGScreen.prototype.frameRateOn = function() {
	this.printFrameRate = true;
}

RGScreen.prototype.frameRateOff = function() {
	this.printFrameRate = false;
}

RGScreen.prototype._startRefresh = function() {
	if (this.drawTimer != null) {
		clearInterval(this.drawTimer);
		this.drawTimer = null;
	}
	if (this.frameRateTimer != null) {
		clearInterval(this.frameRateTimer);
		this.frameRateTimer = null;
	}
	this.isDrawReady = true;
	var intTime = 1000 / this.frameRate;
	var self = this;
	this.drawTimer = setInterval(function(){self._draw();}, intTime);
	this.frameRateTimer = setInterval(function(){self._frameRateInterval();}, 1000);
};

RGScreen.prototype._draw = function() {
	if (this.isDrawReady) {
		// clear screen
		this.isDrawReady = false;
		var color = this.palette[parseInt(this.backgroundColor, 16)]; 
		this.canvas.style.backgroundColor = color;
		this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		
		// draw path
		for (var path of this.pathList) {
			this.context.lineWidth = 1;
			this.context.strokeStyle = this.getColor(path.color);
			this.context.stroke(path.path2d);
			if (path.path2d != null) {
				if (path.fill) {
					this.context.fillStyle = this.getColor(path.color);
					this.context.fill(path.path2d);
				}
			}
		}
		
		// draw text
		for (var text of this.textList) {
			this.context.font = (10 * text.scale) + 'px ' + this.fontFamily;
			this.context.fillStyle = this.getColor(text.color);
			this.context.fillText(text.text, text.x, text.y + (16 * text.scale));
		}
		
		// draw sprite
		for (var sp of this.spriteList) {
			if (sp.x != null && sp.y != null) {
				for (var y in sp.data) {
					for (var x in sp.data[y]) {
						if (this.getColor(sp.data[y][x]) != '') {
							this.context.lineWidth = 1;
							this.context.fillStyle = this.getColor(sp.data[y][x]);
							this.context.fillRect(sp.x + parseInt(x), sp.y + parseInt(y), 1, 1);
						}
					}
				}
			}
		}
		
		// draw sprite image
		for (var sp of this.drawSpriteList) {
			if (sp.x != null && sp.y != null) {
				for (var y in sp.sprite.data) {
					for (var x in sp.sprite.data[y]) {
						if (this.getColor(sp.sprite.data[y][x]) != '') {
							this.context.lineWidth = 1;
							this.context.fillStyle = this.getColor(sp.sprite.data[y][x]);
							this.context.fillRect(sp.x + parseInt(x), sp.y + parseInt(y), 1, 1);
						}
					}
				}
			}
		}
		
		// frame rate
		if (this.printFrameRate) {
			this.context.font = '16px family: + this.fontFamily';
			this.context.fillStyle = this.getColor(text.color);
			this.context.fillText("Frame Rate : " + this.frameRealRate, 2, 10);
		}
		this.frameConter++;
		
		this.isDrawReady = true;
	}
}

RGScreen.prototype._frameRateInterval = function() {
	this.frameRealRate = this.frameConter;
	this.frameConter = 0;
}


