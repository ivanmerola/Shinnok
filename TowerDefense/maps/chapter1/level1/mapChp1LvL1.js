/*
Configurações e funções de desenho para o mapa do capítulo 1 level 1.
Autor: Fernando del Rio / Thiago Alves / Samuel / Renato / Ivan
 */

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
		mapChp1LvL1Npcs = [];
		mapChp1LvL1Towers = [];
		mapChp1LvL1 = loadMap(mapChp1LvL1Name);
		var npcPos = getNPCStartPoint(mapChp1LvL1Name);
		mapChp1LvL1Npc = loadCharacter(npcPos[0], npcPos[1], mapChp1LvL1NpcWidth, mapChp1LvL1NpcHeight, mapChp1LvL1NpcSprite, keyboard.DOWN);
		mapChp1LvL1Tower = loadTower(0, 0, mapChp1LvL1TowerSprite, mapChp1LvL1TowerWidth, mapChp1LvL1TowerHeight, mapChp1LvL1TowerPlaceWidth, mapChp1LvL1TowerPlaceHeight, mapChp1LvL1TowerQtyFrames, false, mapChp1LvL1Range, false);
		mapChp1LvL1Bits = [];
		mapChp1LvL1Bits[0] = getBits(mapChp1LvL1Name);
		mapChp1LvL1Life = getLife(mapChp1LvL1Name);
		mapChp1LvL1WaveQty = getWaveQty(mapChp1LvL1Name);
		mapChp1LvL1ActualWave=1;
		if (mapChp1LvL1 != undefined && mapChp1LvL1.layers[0].tileset.image.complete && character1 != undefined && character1.image.complete && mapChp1LvL1Npc != undefined && mapChp1LvL1Npc.image.complete && mapChp1LvL1Tower!=undefined && mapChp1LvL1Tower.image.complete) {
			startGenerator(mapChp1LvL1Name);
			mapChp1LvL1Render();
		} else {
			loadingRender();
		}
	} else if (mapChp1LvL1 != undefined && mapChp1LvL1.layers[0].tileset.image.complete && character1 != undefined && character1.image.complete && mapChp1LvL1Npc != undefined && mapChp1LvL1Npc.image.complete) {
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
	drawMap(canvas, mapChp1LvL1, getListLayersBelow(mapChp1LvL1Name));
	for (var i = 0; i < mapChp1LvL1Npcs.length; i++) {
		if (!mapChp1LvL1Npcs[i].removed) {
			//raio pra verificar o range
			//drawCircle(mapChp1LvL1Npcs[i].posX + mapChp1LvL1Npcs[i].chrWidth/2, mapChp1LvL1Npcs[i].posY + 40 + mapChp1LvL1Npcs[i].chrHeight/2, mapChp1LvL1Npcs[i].chrWidth/2, "rgba(0,0,200,0.3)");
			drawCharacter(canvas, mapChp1LvL1Npcs[i]);
			updateNPC(mapChp1LvL1Npcs[i]);
			if (mapChp1LvL1Npcs[i].removed && mapChp1LvL1Npcs[i].life > 0) {
				if (mapChp1LvL1Life > 0) {
					mapChp1LvL1Life--;
				} 
				if (mapChp1LvL1Life<=0){
					mapChp1LvL1Life = 0;
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
	mapChp1LvL1Tower = loadTower(xTileMouseOver * 32, yTileMouseOver * 32 - 32, mapChp1LvL1TowerSprite, mapChp1LvL1TowerWidth, mapChp1LvL1TowerHeight, mapChp1LvL1TowerPlaceWidth, mapChp1LvL1TowerPlaceHeight, mapChp1LvL1TowerQtyFrames, false, mapChp1LvL1Range, false);
	if (mapChp1LvL1Towers.length == 0 && (actualState == statesInterface.p)) {
		highlightPlaces(mapChp1LvL1Tower, mapChp1LvL1Towers, mapChp1LvL1Bits);
	} else {
		var highlight = false;
		for (var i = 0; i < mapChp1LvL1Towers.length; i++) {
			if (mapChp1LvL1Towers[i].y >= yTileMouseOver * 32) {
				if (!highlight && (actualState == statesInterface.p)) {
					highlightPlaces(mapChp1LvL1Tower, mapChp1LvL1Towers, mapChp1LvL1Bits);
					highlight = true;
				}
			}
			drawTower(canvas, mapChp1LvL1Towers[i]);
			updateTower(mapChp1LvL1Towers[i],mapChp1LvL1Npcs, mapChp1LvL1Bullet);
		}
		if (!highlight && (actualState == statesInterface.p)) {
			highlightPlaces(mapChp1LvL1Tower, mapChp1LvL1Towers, mapChp1LvL1Bits);
			highlight = true;
		}
	}
	drawMap(canvas, mapChp1LvL1, getListLayersAbove(mapChp1LvL1Name));
	if(!mouseLocked){
		var detected = detectTowerSelected(mapChp1LvL1Towers);
	}
	drawMapInterface(mapChp1LvL1Name, mapChp1LvL1Bits.last(), mapChp1LvL1Life, mapChp1LvL1ActualWave, mapChp1LvL1WaveQty, detected, actualState);
	generateWave(mapChp1LvL1Npcs);
	// if (!keyLocked && keyG) {
		// keyLocked = true;
		// var npcPos = getNPCStartPoint(mapChp1LvL1Name);
		// mapChp1LvL1Npc = loadCharacter(npcPos[0], npcPos[1], mapChp1LvL1NpcWidth, mapChp1LvL1NpcHeight, mapChp1LvL1NpcSprite, keyboard.DOWN);
		// mapChp1LvL1Npcs.push(mapChp1LvL1Npc);
	// }
}
