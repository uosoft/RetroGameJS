function NuMap(eid) {

	this.MaxGold = 0;
	this.Gold = 0;
	
	this.Nux = 0;
	this.Nuy = 0;
	
	this.StageTemplete = [[0,6,3], [1,1,1], [4,5,5]];
	this.StageParts0 = [[1,1,1,1,1],[1,1,1,1,1],[1,1,0,0,0],[1,1,0,1,1],[1,1,0,1,1]];
	this.StageParts12 = 
	[	
		[[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]],
		[[2,2,0,1,1],[0,0,2,0,2],[0,0,1,1,0],[0,2,0,0,2],[2,0,2,1,1]],
		[[1,1,0,1,1],[1,1,0,1,1],[0,0,2,0,0],[1,1,0,1,1],[1,1,0,1,1]],
		[[1,0,2,0,1],[1,0,0,0,1],[1,2,2,2,1],[1,2,2,2,1],[1,2,2,1,1]],
		[[0,0,0,0,0],[2,1,1,1,2],[0,0,0,0,0],[2,1,1,1,2],[0,0,0,0,0]],
		[[1,1,0,1,1],[1,2,0,2,1],[0,0,2,0,0],[1,2,0,2,1],[1,1,0,1,1]],
		[[1,1,2,1,1],[2,2,2,2,1],[2,2,2,2,1],[2,2,2,2,1],[1,1,2,2,1]],
		[[1,1,2,2,1],[1,2,2,2,1],[1,2,1,1,1],[1,2,2,2,2],[1,1,2,2,2]],
		[[1,2,2,1,1],[1,2,2,2,1],[1,2,2,2,1],[1,2,0,2,1],[1,1,0,1,1]],
		[[1,1,0,1,1],[1,2,0,2,1],[0,0,1,0,0],[1,2,0,2,1],[1,1,0,1,1]]
	];
	this.StageParts3456 = 
	[
		[[1,1,1,1,1],[1,1,1,1,1],[2,2,2,1,1],[1,1,2,1,1],[1,1,2,1,1]],
		[[1,1,0,2,2],[1,1,0,2,2],[0,0,0,0,0],[2,2,0,1,1],[2,2,0,1,1]],
		[[1,1,2,2,1],[1,2,2,2,2],[2,2,2,2,2],[1,1,2,2,2],[1,1,2,2,2]],
		[[0,0,0,0,0],[0,0,0,0,0],[0,0,2,0,0],[0,0,0,0,0],[0,0,0,0,0]],
		[[2,2,1,1,1],[2,2,1,1,1],[2,2,1,1,1],[2,2,1,1,1],[2,2,0,0,0]],
		[[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]],
		[[2,2,2,2,2],[2,2,2,2,2],[2,2,1,2,2],[2,2,1,2,2],[2,2,2,2,2]],
		[[2,2,2,2,2],[2,1,1,1,2],[2,1,1,1,2],[1,1,1,1,2],[1,1,2,2,2]],
		[[2,0,0,0,2],[0,1,2,0,2],[2,1,0,1,1],[1,1,2,0,2],[1,1,2,0,2]],
		[[1,1,2,0,2],[1,1,0,0,0],[0,0,0,0,2],[2,0,2,1,1],[2,0,2,1,1]],
		[[2,0,0,0,2],[0,1,1,1,0],[0,1,1,1,0],[0,1,1,1,0],[2,0,0,0,2]],
		[[1,1,1,1,1],[1,2,2,2,2],[2,2,2,2,2],[1,1,2,2,2],[1,1,2,2,2]],
		[[1,1,0,1,1],[1,1,2,1,1],[0,2,0,2,0],[1,1,0,1,1],[1,2,0,2,1]],
		[[1,2,0,0,1],[1,0,2,0,2],[2,0,2,0,2],[0,0,2,0,2],[2,2,0,1,1]],
		[[1,2,2,1,1],[1,2,2,1,1],[2,2,2,1,1],[1,2,2,1,1],[1,2,2,1,1]]
	];
	
	this.StageMap = new Array();
	for (var y = 0; y < 17; y++) {
		this.StageMap[y] = new Array();
		for (var x = 0; x < 17; x++) {
			this.StageMap[y][x] = 0;
		}
	}
	
	this.StageParts = new Array();
	for (var i = 0; i < 7; i++) {
		this.StageParts[i] = new Array();
		for (var j = 0; j < 15; j++) {
			this.StageParts[i][j] = new Array();
			for (var k = 0; k < 5; k++) {
				this.StageParts[i][j][k] = new Array();
				for (var l = 0; l < 5; l++) {
					this.StageParts[i][j][k][l] = 0;
				}
			}
		}
	}
	
	for (var x = 0; x <= 4; x++) {
		for (var y = 0; y <= 4; y++) {
			this.StageParts[0][0][y][x] = this.StageParts0[y][x];
		}
	}
	
	for (var i = 0; i <= 9; i++ ) {
		for (var x = 0; x <= 4; x++) {
			for (var y = 0; y <= 4; y++) {
				this.StageParts[1][i][y][x] = this.StageParts12[i][y][x];
				this.StageParts[2][i][y][x] = this.StageParts12[i][x][y];
			}
		}
	}
	
	for (var i = 0; i <= 14; i++ ) {
		for (var x = 0; x <= 4; x++) {
			for (var y = 0; y <= 4; y++) {
				this.StageParts[3][i][y][x] = this.StageParts3456[i][y][x];
				this.StageParts[4][i][y][x] = this.StageParts3456[i][x][y];
				this.StageParts[5][i][y][x] = this.StageParts3456[i][4 - y][x];
				this.StageParts[6][i][y][x] = this.StageParts3456[i][y][4 - x];
			}
		}
	}
	
}

NuMap.prototype.CreateMap = function() {
	this.Nux = 3;
	this.Nuy = 3;
	
	for (var i = 0; i <= 16; i++) {
		this.StageMap[0][i] = 1;
		this.StageMap[16][i] = 1;
		this.StageMap[i][0] = 1;
		this.StageMap[i][16] = 1;
	}
	
	for (var y = 0; y <= 2; y++) {
		for (var x = 0; x <= 2; x++) {
			if (this.StageTemplete[y][x] == 0) {
				for (var y1 = 0; y1 <= 4; y1++) {
					for (var x1 = 0; x1 <= 4; x1++) {
						this.StageMap[y*5+y1+1][x*5+x1+1] = this.StageParts[0][0][y1][x1];
					}
				}
			}
			if (this.StageTemplete[y][x] == 1 || this.StageTemplete[y][x] == 2) {
				var r = Math.floor(Math.random() * 10);
				for (var y1 = 0; y1 <= 4; y1++) {
					for (var x1 = 0; x1 <= 4; x1++) {
						this.StageMap[y*5+y1+1][x*5+x1+1] = this.StageParts[this.StageTemplete[y][x]][r][y1][x1];
					}
				}
			}
			if (this.StageTemplete[y][x] >= 3 && this.StageTemplete[y][x] <= 6) {
				var r = Math.floor(Math.random() * 15);
				for (var y1 = 0; y1 <= 4; y1++) {
					for (var x1 = 0; x1 <= 4; x1++) {
						this.StageMap[y*5+y1+1][x*5+x1+1] = this.StageParts[this.StageTemplete[y][x]][r][y1][x1];
					}
				}
			}
		}
	}
	
	this.MaxGold = 0;
	for (var y = 0; y < 17; y++) {
		for (var x = 0; x < 17; x++) {
			if (this.StageMap[y][x] == 2) {
				this.MaxGold++;
			}
		}
	}
	this.Gold = this.MaxGold;

}

NuMap.prototype.GetStageData = function() {
	return this.StageMap;
}

NuMap.prototype.GetStageTileData = function(x, y) {
	return this.StageMap[y][x];
}

NuMap.prototype.SetNu = function(x, y) {
	this.Nux = x;
	this.Nuy = y;
}

NuMap.prototype.GetMaxGold = function() {
	return this.MaxGold;
}

NuMap.prototype.GetGold = function() {
	return this.Gold;
}

NuMap.prototype.GetNuX = function() {
	return this.Nux;
}

NuMap.prototype.GetNuY = function() {
	return this.Nuy;
}

NuMap.prototype.MoveNu = function(dx, dy) {
	var NewX;
	var NewY;
	var r = false;
	NewX = (this.Nux + dx);
	NewY = (this.Nuy + dy);
	if(this.StageMap[NewY][NewX] != 1) {
		if(this.StageMap[NewY][NewX] == 2) {
			this.StageMap[NewY][NewX] = 1;
			this.Gold--;
			r = true;
		}
		this.Nux = NewX;
		this.Nuy = NewY;
	}
	return r;
}

document.addEventListener('DOMContentLoaded', function() {

	var spriteNU = [
		"00333300",
		"03333330",
		"f3f33f3f",
		"f313313f",
		"f3f33f3f",
		"03333330",
		"0f3333f0",
		"fff00fff",
	];
	
	var spriteWall = [
		"06666660",
		"66666666",
		"66966666",
		"66666696",
		"66666666",
		"66966666",
		"66666966",
		"06666660",
	];
	
	var spriteGold = [
		"00000000",
		"000aa000",
		"000aa000",
		"00aaaa00",
		"00aaaa00",
		"0aaaaaa0",
		"0aaaaaa0",
		"00000000",
	];
	
	var screen1 = new RGScreen(document.getElementById('screen1'));
	
	var numap = new NuMap();
	
	var mode = 1; // タイトル
	
	var isKeyDown = false;
	var isSpaceKey = false;
	
	// フレームレート
	screen1.setFrameRate(30);
	
	// 背景色
	screen1.setBackGroundColor(1);
	
	// スクリーンサイズ
	screen1.setSize(320, 200);
	
	// スプライト
	var spNU = new RGSprite();
	var spWall = new RGSprite();
	var spGold = new RGSprite();
	
	// スクリーンへスプライト追加
	screen1.addSprite(spNU, 2);
	screen1.addSprite(spWall, 1);
	screen1.addSprite(spGold, 1);
	
	// スプライトデータ反映
	spNU.setPatternStringData(spriteNU);
	spWall.setPatternStringData(spriteWall);
	spGold.setPatternStringData(spriteGold);
	
	var int1 = setInterval(function(){
		
		screen1.clear();
		
		// タイトル画面
		if (mode == 1) {
			screen1.text(106, 40, "NU PICK UP GOLD INGOTS", 10);
			screen1.text(124, 100, "PUSH SPACE KEY", 7);
			screen1.text(130, 150, "2023 UO Soft", 15);
			
			isSpaceKey = false;
			
			if (screen1.scanKey(32)) {
				numap.CreateMap();
				mode = 2; // ゲーム画面
			}
		}
		
		// ゲーム画面
		if (mode == 2) {
			screen1.text(88, 2, "NU PICK UP GOLD INGOTS", 10);
			screen1.text(210, 40, "REMAINING GOLD", 15);
			screen1.text(230, 50, ("000" + numap.GetGold()).slice(-3) + "/" + ("000" + numap.GetMaxGold()).slice(-3), 15);
			screen1.text(206, 100, "[↑→↓←] MOVE", 7);
			screen1.text(210, 150, "[ESC] GIVE UP", 8);
			screen1.rect(42, 30, 46, 175, 5, true);
			screen1.rect(183, 30, 187, 175, 5, true);
			screen1.rect(42, 30, 187, 34, 5, true);
			screen1.rect(42, 171, 187, 175, 5, true);
			for (var y = 0; y < 17; y++) {
				for (var x = 0; x < 17; x++) {
					if (numap.GetStageTileData(x, y) == 1) {
						if (x != numap.GetNuX() || y != numap.GetNuY()) {
							screen1.drawSpriteImage(spWall, x * 8 + 47, y * 8 + 35);
						}
					}
					if (numap.GetStageTileData(x, y) == 2) {
						if (x != numap.GetNuX() || y != numap.GetNuY()) {
							screen1.drawSpriteImage(spGold, x * 8 + 47, y * 8 + 35);
						}
					}
					if (x == numap.GetNuX() && y == numap.GetNuY()) {
						spNU.put(x * 8 + 47, y * 8 + 35, 4);
					}
				}
			}
			
			if (screen1.scanKey('ArrowUp')) {
				if (!isKeyDown) {
					isKeyDown = true;
					numap.MoveNu(0, -1);
				}
			} else if (screen1.scanKey('ArrowRight')) {
				if (!isKeyDown) {
					isKeyDown = true;
					numap.MoveNu(1, 0)
				}
			} else if (screen1.scanKey('ArrowDown')) {
				if (!isKeyDown) {
					isKeyDown = true;
					numap.MoveNu(0, 1)
				}
			} else if (screen1.scanKey('ArrowLeft')) {
				if (!isKeyDown) {
					isKeyDown = true;
					numap.MoveNu(-1, 0)
				}
			} else {
				isKeyDown = false;
			}
			if (screen1.scanKey('Escape')) {
				mode = 3; // ゲームオーバー画面
			}
			
			if (numap.GetGold() == 0) {
				mode = 4; // エンディング画面
			}
			
		}
		
		// ゲームオーバー画面
		if (mode == 3) {
			screen1.text(137, 60, "GAME OVER", 8);
			
			screen1.text(124, 120, "PUSH SPACE KEY", 7);
			
			if (screen1.scanKey(32)) {
				isKeyDown = true;
				isSpaceKey = true;
			} else {
				isKeyDown = false;
			}
			if (!isKeyDown && isSpaceKey) {
				mode = 1; // タイトル画面
			}
		}
		
		// エンディング画面
		if (mode == 4) {
			screen1.text(120, 60, "CONGRATULATIONS!", 10);

			screen1.text(124, 120, "PUSH SPACE KEY", 7);
			
			if (screen1.scanKey(32)) {
				isKeyDown = true;
				isSpaceKey = true;
			} else {
				isKeyDown = false;
			}
			if (!isKeyDown && isSpaceKey) {
				mode = 1; // タイトル画面
			}
		}
		
		
	}, 10);
	
});


