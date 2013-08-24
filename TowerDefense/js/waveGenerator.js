/*
Biblioteca javascript para funções que manipulam waves de NPCs
Autor: Fernando del Rio / Thiago Alves / Samuel / Renato
 */

var waveGeneratorActualTime;
var waveGeneratorStarted;
var waveGeneratorInitialDelay;
var waveGeneratorDelay;
var waveGeneratorDefinition;
var waveGeneratorQuantity;
var waveGeneratorActualWave;
var waveGeneratorActualEnemyGroup;
var waveGeneratorNextWaveActive = false;
//Função responsável por iniciar o gerador de waves. Parâmetro: arquivo XML do mapa
function startGenerator(filename) {
	waveGeneratorStarted = false;
	waveGeneratorActualTime = new Date();
	xmlDoc = loadXMLDoc(filename);
	var objectGroups = xmlDoc.getElementsByTagName("objectgroup");
	for (var i = 0; i < objectGroups.length; i++) {
		if (objectGroups[i].getAttribute("name") == "Waves") {
			var properties = objectGroups[i].getElementsByTagName("properties")[0].getElementsByTagName("property");
			for (var j = 0; j < properties.length; j++) {
				if (properties[j].getAttribute("name") == "definition") {
					waveGeneratorDefinition = properties[j].getAttribute("value");
				} else if (properties[j].getAttribute("name") == "delay") {
					waveGeneratorDelay = parseInt(properties[j].getAttribute("value"));
				} else if (properties[j].getAttribute("name") == "initialDelay") {
					waveGeneratorInitialDelay = parseInt(properties[j].getAttribute("value"));
				} else if (properties[j].getAttribute("name") == "quantity") {
					waveGeneratorQuantity = parseInt(properties[j].getAttribute("value"));
				}
			}
		}
	}
	waveGeneratorDefinition = waveGeneratorDefinition.split("#"); //Quebrando em waves
	for (var i = 0; i < waveGeneratorDefinition.length; i++) {
		waveGeneratorDefinition[i] = waveGeneratorDefinition[i].split("@"); //Quebrando em grupos de inimigos
		for (var j = 0; j < waveGeneratorDefinition[i].length; j++) {
			waveGeneratorDefinition[i][j] = waveGeneratorDefinition[i][j].split(";"); //Quebrando código do inimigo, número de inimigos, delay entre um inimigo e outro
			waveGeneratorDefinition[i][j][0] = parseInt(waveGeneratorDefinition[i][j][0]);
			waveGeneratorDefinition[i][j][1] = parseInt(waveGeneratorDefinition[i][j][1]);
			waveGeneratorDefinition[i][j][2] = parseInt(waveGeneratorDefinition[i][j][2]);
		}
	}
	waveGeneratorActualWave = 0;
	waveGeneratorActualEnemyGroup = 0;
}

//Função responsável por gerar uma wave. Parâmetro: vetor de NPCs.
//Problema para ser corrigido: alterar a função para ficar genérica para qualquer mapa.
function generateWave(npcs) {
	var newTime = new Date();
	if (waveGeneratorStarted) {
		if (waveGeneratorActualWave == 0) {
			if ((newTime - waveGeneratorActualTime) > waveGeneratorDefinition[waveGeneratorActualWave][waveGeneratorActualEnemyGroup][2]) {
				//Valores temporários
				var npcPos = getNPCStartPoint(mapChp1LvL1Name);
				mapChp1LvL1Npc = loadCharacter(npcPos[0], npcPos[1], mapChp1LvL1NpcWidth, mapChp1LvL1NpcHeight, mapChp1LvL1NpcSprite, keyboard.DOWN);
				map1.npcs.push(mapChp1LvL1Npc);
				waveGeneratorDefinition[waveGeneratorActualWave][waveGeneratorActualEnemyGroup][1]--;
				if (waveGeneratorDefinition[waveGeneratorActualWave][waveGeneratorActualEnemyGroup][1] == 0) {
					waveGeneratorActualEnemyGroup++;
					if (waveGeneratorActualEnemyGroup > waveGeneratorDefinition[waveGeneratorActualWave].length - 1) {
						waveGeneratorActualEnemyGroup = 0;
						waveGeneratorActualWave++;
					}
				}
				waveGeneratorActualTime = newTime;
			}
		} else if (waveGeneratorActualWave < waveGeneratorQuantity) {
			if (!waveGeneratorNextWaveActive) {
				var allRemoved=true;
				for(var i=0;i<npcs.length;i++){
					if(!npcs[i].removed){
						allRemoved=false;
					}
				}
				if (allRemoved){
					if((newTime - waveGeneratorActualTime) > waveGeneratorDelay) {
						waveGeneratorNextWaveActive = true;
						map1.actualWave++;
					}
				} else {
					waveGeneratorActualTime=newTime;
				}
			} else {
				if ((newTime - waveGeneratorActualTime) > waveGeneratorDefinition[waveGeneratorActualWave][waveGeneratorActualEnemyGroup][2]) {
					//Valores temporários
					var npcPos = getNPCStartPoint(mapChp1LvL1Name);
					mapChp1LvL1Npc = loadCharacter(npcPos[0], npcPos[1], mapChp1LvL1NpcWidth, mapChp1LvL1NpcHeight, mapChp1LvL1NpcSprite, keyboard.DOWN);
					npcs.push(mapChp1LvL1Npc);
					waveGeneratorDefinition[waveGeneratorActualWave][waveGeneratorActualEnemyGroup][1]--;
					if (waveGeneratorDefinition[waveGeneratorActualWave][waveGeneratorActualEnemyGroup][1] == 0) {
						waveGeneratorActualEnemyGroup++;
						if (waveGeneratorActualEnemyGroup > waveGeneratorDefinition[waveGeneratorActualWave].length - 1) {
							waveGeneratorActualEnemyGroup = 0;
							waveGeneratorActualWave++;
							waveGeneratorNextWaveActive=false;
						}
					}
					waveGeneratorActualTime = newTime;
				}
			}
		} else {
			var allRemoved=true;
			for(var i=0;i<npcs.length;i++){
				if(!npcs[i].removed){
					allRemoved=false;
				}
			}
			if(allRemoved){
				gameState = gameStates.winScreen;
				mapChp1LvL1 = undefined;
			}
		}
	} else {
		if ((newTime - waveGeneratorActualTime) > waveGeneratorInitialDelay) {
			waveGeneratorStarted = true;
			waveGeneratorActualTime = newTime;
		}
	}
}
