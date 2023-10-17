//==============================
// RGSprite
//==============================
class RGSprite {
	constructor() {
		this.objectId = null;
		this.data = null;
		this.x = null;
		this.y = null;
		this.width = 0;
		this.height = 0;
		this.index = 0;
		this.Collider = new Object();
		this.parentCanvas = null;
		this.ColliderSplites = new Array();
		this.octave = 4;
		this.onCount = 0;
		this.offCount = 0;
		this.playCount = 0;
	}

	setPatternStringData(data) {
		if (typeof(data) != "object") {
			return false;
		}
		
		this.width = 0;
		this.height = 0;
		
		this.data = new Array;
		for (var y = 0; y < data.length; y++) {
			if (typeof(this.data[y]) == "undefined") {
				this.data[y] = new Array();
			}
			for (var x = 0; x < data[y].length; x++) {
				var code = data[y].substr(x, 1);
				this.data[y][x] = parseInt(code, 16);
			}
			if (this.data[y].length > this.width) {
				this.width = this.data[y].length;
			}
		}
		this.height = this.data.length;
	}

	put(x, y) {
		this.x = parseInt(x);
		this.y = parseInt(y);
		
		this.Collider = new Object();
		if (this.data != null) {
			for (var y in this.data) {
				for (var x in this.data[y]) {
					if (this.parentCanvas.getColor(this.data[x][y]) != '') {
						var d = (this.x + parseInt(x)) + ':' + (this.y + parseInt(y));
						this.Collider[d] = d;
					}
				}
			}
		}
		
		this.ColliderSplites = new Array();
		for (var sp of this.parentCanvas.spriteList) {
			if (sp != this) {
				for (var d in this.Collider) {
					if (typeof(sp.Collider[this.Collider[d]]) != 'undefined') {
						this._addColliderSplites(sp);
						sp._addColliderSplites(this);
						break;
					}
				}
			}
		}
		

	}

	getSize() {
		var size = new Object();
		size.width = this.width;
		size.height = this.height;
		return size;
	}

	getPosition() {
		var pos = new Object();
		pos.x = this.x;
		pos.y = this.y;
		return pos;
	}

	off() {
		this.x = null;
		this.y = null;
	}

	getColliderSplites() {
		return this.ColliderSplites;
	}

	_addColliderSplites(sp) {
		var exist = false;
		for (var s of this.ColliderSplites) {
			if (s == sp) {
				exist = true;
				break;
			}
		}
		if (!exist) {
			this.ColliderSplites.push(sp);
		}
	}
}

