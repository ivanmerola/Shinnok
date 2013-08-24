/*
Configurações e funções de desenho para o mapa do capítulo 1 level 1.
Autor: Fernando del Rio / Thiago Alves / Samuel / Renato / Ivan
 */
 
var map1;

//Variáveis para as configurações do mapa.
var mapChp1LvL1, mapChp1LvL1Name = "maps/chapter1/level1/mapChp1LvL1.tmx";

//Configurações para caracteres não controláveis.
var mapChp1LvL1Npcs;
var mapChp1LvL1Npc, mapChp1LvL1NpcSprite = "images/characteres/personagem1.png",
mapChp1LvL1NpcWidth = 32, mapChp1LvL1NpcHeight = 32;

//Configurações para as torres.
var mapChp1LvL1Towers;
var mapChp1LvL1Tower, mapChp1LvL1TowerSprite = "images/towers/torre-2-3invert.png",
mapChp1LvL1TowerWidth = 32, mapChp1LvL1TowerHeight = 63,
mapChp1LvL1TowerPlaceWidth = 1, mapChp1LvL1TowerPlaceHeight = 1,
mapChp1LvL1TowerQtyFrames=7; mapChp1LvL1Range = 50; 
var mapChp1LvL1Bullet = new Image();

//Bullet shot. Comment the line below if you want a laser shot.
//mapChp1LvL1Bullet.src = "images/bullets/bullet.png";

//Configurações para a interface.

//Função para inicialização do mapa.
var mapChp1LvL1Bits, mapChp1LvL1Life,
mapChp1LvL1WaveQty, mapChp1LvL1ActualWave;

//Variável de estado atual do capítulo
var actualState = statesInterface.i;

function mapChp1LvL1Init() {
	if (mapChp1LvL1 == undefined) {
		map1 = initAttributes("maps/chapter1/level1/mapChp1LvL1.tmx", "images/characteres/personagem1.png", 32, 32, "images/towers/torre-2-3invert.png",
		32, 63, 1, 1, 7, 50, new Image());
		mapChp1LvL1 = loadMap(map1.name);
		var npcPos = getNPCStartPoint(map1.name);
		map1 = createMap(map1, [], [], mapChp1LvL1, loadCharacter(npcPos[0], npcPos[1], map1.npcWidth, map1.npcHeight, map1.npcSprite, keyboard.DOWN),
		loadTower(0, 0, map1.towerSprite, map1.towerWidth, map1.towerHeight, map1.towerPlaceWidth, map1.towerPlaceHeight, map1.towerQtyFrames, false, map1.range, false),
		[], getBits(map1.name), getLife(map1.name), getWaveQty(map1.name), 1);
		if (map1.id != undefined && map1.id.layers[0].tileset.image.complete && character1 != undefined && character1.image.complete && map1.npc != undefined && map1.npc.image.complete && map1.tower!=undefined && map1.tower.image.complete) {
			startGenerator(map1.name);
			mapChp1LvL1Render();
		} else {
			loadingRender();
		}
	} else if (mapChp1LvL1 != undefined && mapChp1LvL1.layers[0].tileset.image.complete && character1 != undefined && character1.image.complete && map1.npc != undefined && map1.npc.image.complete) {
		mapChp1LvL1Render();
	}
}

Array.prototype.last = Array.prototype.last || function(count) {
    count = count || 1;
    var length = this.length;
    if (count <= length) {
        return this[length - count];
    } else {
        return null;
    }
};

//Função para desenhar o mapa.
function mapChp1LvL1Render() {
	drawMap(canvas, mapChp1LvL1, getListLayersBelow(map1.name));
	for (var i = 0; i < map1.npcs.length; i++) {
		if (!map1.npcs[i].removed) {
			//raio pra verificar o range
			//drawCircle(mapChp1LvL1Npcs[i].posX + mapChp1LvL1Npcs[i].chrWidth/2, mapChp1LvL1Npcs[i].posY + 40 + mapChp1LvL1Npcs[i].chrHeight/2, mapChp1LvL1Npcs[i].chrWidth/2, "rgba(0,0,200,0.3)");
			drawCharacter(canvas, map1.npcs[i]);
			updateNPC(map1.npcs[i]);
			if (map1.npcs[i].removed && map1.npcs[i].life > 0) {
				if (map1.life > 0) {
					map1.life--;
				} 
				if (map1.life<=0){
					map1.life = 0;
					gameState = gameStates.gameOver;
					mapChp1LvL1 = undefined;
					return;
				}
			}
		}
	}
	//drawCharacter(canvas, character1);
	//updateCharacter(character1, down, left, right, up);
	checkAddTower();
	map1.tower = loadTower(xTileMouseOver * 32, yTileMouseOver * 32 - 32, map1.towerSprite, map1.towerWidth, map1.towerHeight, map1.towerPlaceWidth, map1.towerPlaceHeight, map1.towerQtyFrames, false, map1.range, false);
	if (map1.towers.length == 0 && (actualState == statesInterface.p)) {
		highlightPlaces(map1.tower, map1.towers, map1.bits);
	} else {
		var highlight = false;
		for (var i = 0; i < map1.towers.length; i++) {
			if (map1.towers[i].y >= yTileMouseOver * 32) {
				if (!highlight && (actualState == statesInterface.p)) {
					highlightPlaces(map1.tower, map1.towers, map1.bits);
					highlight = true;
				}
			}
			drawTower(canvas, map1.towers[i]);
			updateTower(map1.towers[i],map1.npcs, map1.bullet);
		}
		if (!highlight && (actualState == statesInterface.p)) {
			highlightPlaces(map1.tower, map1.towers, map1.bits);
			highlight = true;
		}
	}
	drawMap(canvas, mapChp1LvL1, getListLayersAbove(map1.name));
	generateWave(map1.npcs);
	mapChp1LvL1Update();
	// if (!keyLocked && keyG) {
		// keyLocked = true;
		// var npcPos = getNPCStartPoint(mapChp1LvL1Name);
		// mapChp1LvL1Npc = loadCharacter(npcPos[0], npcPos[1], mapChp1LvL1NpcWidth, mapChp1LvL1NpcHeight, mapChp1LvL1NpcSprite, keyboard.DOWN);
		// mapChp1LvL1Npcs.push(mapChp1LvL1Npc);
	// }
}

function mapChp1LvL1Update(){

	if(!mouseLocked){
		var detected = detectTowerSelected(map1.towers);
	}

	//buttonUpdate();
	drawMapInterface(map1.name, map1.bits.last(), map1.life, map1.actualWave, map1.waveQty, detected, actualState);
	buttonUpdate();

}
