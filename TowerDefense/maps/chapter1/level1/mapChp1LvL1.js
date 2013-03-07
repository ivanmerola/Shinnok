/*
Configurações e funções de desenho para o mapa do capítulo 1 level 1.
Autor:Fernando del Rio
 */

//Variáveis para as configurações do mapa.
var mapChp1LvL1, mapChp1LvL1Name = "maps/chapter1/level1/mapChp1LvL1.tmx";

//Configurações para caracteres não controláveis.
var mapChp1LvL1Npcs = [];
var mapChp1LvL1Npc, mapChp1LvL1NpcSprite = "images/characteres/personagem1.png",
mapChp1LvL1NpcWidth = 32, mapChp1LvL1NpcHeight = 32;

//Configurações para as torres.
var mapChp1LvL1Towers = [];
var mapChp1LvL1Tower, mapChp1LvL1TowerSprite = "images/towers/torre-2-3invert.png",
mapChp1LvL1TowerWidth = 32, mapChp1LvL1TowerHeight = 63,
mapChp1LvL1TowerPlaceWidth = 1, mapChp1LvL1TowerPlaceHeight = 1,
mapChp1LvL1TowerQtyFrames=7;

//Função para inicialização do mapa.
function mapChp1LvL1Init() {
	if (mapChp1LvL1 == undefined) {
		mapChp1LvL1 = loadMap(mapChp1LvL1Name);
		var npcPos = getNPCStartPoint(mapChp1LvL1Name);
		mapChp1LvL1Npc = loadCharacter(npcPos[0], npcPos[1], mapChp1LvL1NpcWidth, mapChp1LvL1NpcHeight, mapChp1LvL1NpcSprite, keyboard.DOWN);
		mapChp1LvL1Tower = loadTower(0, 0, mapChp1LvL1TowerSprite, mapChp1LvL1TowerWidth, mapChp1LvL1TowerHeight, mapChp1LvL1TowerPlaceWidth, mapChp1LvL1TowerPlaceHeight, mapChp1LvL1TowerQtyFrames, false);
		if (mapChp1LvL1 != undefined && mapChp1LvL1.layers[0].tileset.image.complete && character1 != undefined && character1.image.complete && mapChp1LvL1Npc != undefined && mapChp1LvL1Npc.image.complete && mapChp1LvL1Tower!=undefined && mapChp1LvL1Tower.image.complete) {
			mapChp1LvL1Render();
		} else {
			loadingRender();
		}
	} else if (mapChp1LvL1 != undefined && mapChp1LvL1.layers[0].tileset.image.complete && character1 != undefined && character1.image.complete && mapChp1LvL1Npc != undefined && mapChp1LvL1Npc.image.complete) {
		mapChp1LvL1Render();
	}
}

//Função para desenhar o mapa.
function mapChp1LvL1Render() {
	drawMap(canvas, mapChp1LvL1, getListLayersBelow(mapChp1LvL1Name));
	for (var i = 0; i < mapChp1LvL1Npcs.length; i++) {
		if (!mapChp1LvL1Npcs[i].removed) {
			drawCharacter(canvas, mapChp1LvL1Npcs[i]);
			updateNPC(mapChp1LvL1Npcs[i]);
		}
	}
	drawCharacter(canvas, character1);
	updateCharacter(character1, down, left, right, up);
	mapChp1LvL1Tower = loadTower(xTileMouseOver * 32, yTileMouseOver * 32 - 32, mapChp1LvL1TowerSprite, mapChp1LvL1TowerWidth, mapChp1LvL1TowerHeight, mapChp1LvL1TowerPlaceWidth, mapChp1LvL1TowerPlaceHeight, mapChp1LvL1TowerQtyFrames, false);
	if (mapChp1LvL1Towers.length == 0) {
		highlightPlaces(mapChp1LvL1Tower, mapChp1LvL1Towers);
	} else {
		var highlight = false;
		for (var i = 0; i < mapChp1LvL1Towers.length; i++) {
			if (mapChp1LvL1Towers[i].y >= yTileMouseOver * 32) {
				if (!highlight) {
					highlightPlaces(mapChp1LvL1Tower, mapChp1LvL1Towers);
					highlight = true;
				}
			}
			drawTower(canvas, mapChp1LvL1Towers[i]);
			updateTower(mapChp1LvL1Towers[i]);
		}
		if (!highlight) {
			highlightPlaces(mapChp1LvL1Tower, mapChp1LvL1Towers);
			highlight = true;
		}
	}
	drawMap(canvas, mapChp1LvL1, getListLayersAbove(mapChp1LvL1Name));
	drawMapInterface(mapChp1LvL1Name);
	if (!keyLocked && keyG) {
		keyLocked = true;
		var npcPos = getNPCStartPoint(mapChp1LvL1Name);
		mapChp1LvL1Npc = loadCharacter(npcPos[0], npcPos[1], mapChp1LvL1NpcWidth, mapChp1LvL1NpcHeight, mapChp1LvL1NpcSprite, keyboard.DOWN);
		mapChp1LvL1Npcs.push(mapChp1LvL1Npc);
	}
}
