/*
Configurações e funções de desenho para o mapa do capítulo 1 level 1.
Autor:Fernando del Rio
 */

//Variáveis para as configurações do mapa.
var mapChp1LvL1, mapChp1LvL1Name = "maps/chapter1/level1/mapChp1LvL1.tmx", mapChp1LvL1listLayersBelow = [0, 1, 2], mapChp1LvL1listLayersAbove = [3];

//Configurações para caracteres não controláveis.
var mapChp1LvL1Npcs = [];
var mapChp1LvL1Npc, mapChp1LvL1NpcSprite = "images/characteres/personagem1.png",
mapChp1LvL1NpcWidth = 32, mapChp1LvL1NpcHeight = 32;

//Configurações para as torres
var towers = [];

//Função para inicialização do mapa.
function mapChp1LvL1Init() {
	if (mapChp1LvL1 == undefined) {
		mapChp1LvL1 = loadMap(mapChp1LvL1Name);
		var npcPos = getNPCStartPoint(mapChp1LvL1Name);
		mapChp1LvL1Npc = loadCharacter(npcPos[0], npcPos[1], mapChp1LvL1NpcWidth, mapChp1LvL1NpcHeight, mapChp1LvL1NpcSprite, keyboard.DOWN);
		if (mapChp1LvL1 != undefined && mapChp1LvL1.layers[0].tileset.image.complete && character1 != undefined && character1.image.complete && mapChp1LvL1Npc != undefined && mapChp1LvL1Npc.image.complete) {
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
	drawMap(canvas, mapChp1LvL1, mapChp1LvL1listLayersBelow);
	for (var i = 0; i < mapChp1LvL1Npcs.length; i++) {
		if (!mapChp1LvL1Npcs[i].removed) {
			drawCharacter(canvas, mapChp1LvL1Npcs[i]);
			updateNPC(mapChp1LvL1Npcs[i]);
		}
	}
	drawCharacter(canvas, character1);
	updateCharacter(character1, down, left, right, up);
	if (towers.length == 0) {
		highlightPlaces();
	} else {
		var highlight = false;
		for (var i = 0; i < towers.length; i++) {
			if (towers[i].y >= (yTileMouseOver) * 32) {
				if (!highlight) {
					highlightPlaces();
					highlight = true;
				}
			}
			drawTower(canvas, towers[i]);
			updateTower(towers[i]);
		}
		if (!highlight) {
			highlightPlaces();
			highlight = true;
		}
	}
	drawMap(canvas, mapChp1LvL1, mapChp1LvL1listLayersAbove);
	if (!keyLocked && keyG) {
		keyLocked = true;
		var npcPos = getNPCStartPoint(mapChp1LvL1Name);
		mapChp1LvL1Npc = loadCharacter(npcPos[0], npcPos[1], mapChp1LvL1NpcWidth, mapChp1LvL1NpcHeight, mapChp1LvL1NpcSprite, keyboard.DOWN);
		mapChp1LvL1Npcs.push(mapChp1LvL1Npc);
	}
	drawMapInterface();
}
