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
//Função responsável por iniciar o gerador de waves. Parâmetro: arquivo XML do mapa
function startGenerator(filename){
	waveGeneratorStarted=false;
	waveGeneratorActualTime = new Date();
	xmlDoc = loadXMLDoc(filename);
	var objectGroups = xmlDoc.getElementsByTagName("objectgroup");
	for (var i = 0; i < objectGroups.length; i++) {
		if (objectGroups[i].getAttribute("name") == "Waves") {
			var  properties = objectGroups[i].getElementsByTagName("properties")[0].getElementsByTagName("property");
			for (var j = 0; j < properties.length; j++) {
				if(properties[j].getAttribute("name")=="definition"){
					waveGeneratorDefinition = properties[j].getAttribute("value");
				} else if(properties[j].getAttribute("name")=="delay"){
					waveGeneratorDelay = properties[j].getAttribute("value");
				} else if(properties[j].getAttribute("name")=="initialDelay"){
					waveGeneratorInitialDelay = properties[j].getAttribute("value");
				} else if(properties[j].getAttribute("name")=="quantity"){
					waveGeneratorQuantity = properties[j].getAttribute("value");
				}
			}
		}
	}
	waveGeneratorDefinition = waveGeneratorDefinition.split("#");//Quebrando em waves
	for(var i = 0; i < waveGeneratorDefinition.length; i++){
		waveGeneratorDefinition[i]=waveGeneratorDefinition[i].split("@");//Quebrando em grupos de inimigos
		for(var j = 0; j < waveGeneratorDefinition[i].length ; j++){
			waveGeneratorDefinition[i][j] = waveGeneratorDefinition[i][j].split(";");//Quebrando código do inimigo, número de inimigos, delay entre um inimigo e outro
		}
	}
	waveGeneratorActualWave=0;
	waveGeneratorActualEnemyGroup=0;
}

//Função responsável por gerar uma wave. Parâmetro: vetor de NPCs. Retorno: o vetor de NPCs modificado.
function generateWave(npcs){
	var newTime=new Date();
	if(waveGeneratorStarted){
		if(waveGeneratorActualWave==0){
			if((newTime - waveGeneratorActualTime)>waveGeneratorDefinition[waveGeneratorActualWave][waveGeneratorActualEnemyGroup][2]){
				//Valores temporários
				var npcPos = getNPCStartPoint(mapChp1LvL1Name);
				mapChp1LvL1Npc = loadCharacter(npcPos[0], npcPos[1], mapChp1LvL1NpcWidth, mapChp1LvL1NpcHeight, mapChp1LvL1NpcSprite, keyboard.DOWN);
				mapChp1LvL1Npcs.push(mapChp1LvL1Npc);
				waveGeneratorDefinition[waveGeneratorActualWave][waveGeneratorActualEnemyGroup][1]--;
				if(waveGeneratorDefinition[waveGeneratorActualWave][waveGeneratorActualEnemyGroup][1]==0){
					waveGeneratorActualEnemyGroup++;
					if(waveGeneratorActualEnemyGroup>waveGeneratorDefinition[waveGeneratorActualWave].length){
						waveGeneratorActualEnemyGroup=0;
						waveGeneratorActualWave++;
					}
				}
				waveGeneratorActualTime=newTime;
			}
		} else if(waveGeneratorActualWave < waveGeneratorQuantity) {
			if((newTime - waveGeneratorActualTime) > waveGeneratorDelay){
				if((newTime - waveGeneratorActualTime)>waveGeneratorDefinition[waveGeneratorActualWave][waveGeneratorActualEnemyGroup][2]){
					//Valores temporários
					var npcPos = getNPCStartPoint(mapChp1LvL1Name);
					mapChp1LvL1Npc = loadCharacter(npcPos[0], npcPos[1], mapChp1LvL1NpcWidth, mapChp1LvL1NpcHeight, mapChp1LvL1NpcSprite, keyboard.DOWN);
					mapChp1LvL1Npcs.push(mapChp1LvL1Npc);
					waveGeneratorDefinition[waveGeneratorActualWave][waveGeneratorActualEnemyGroup][1]--;
					if(waveGeneratorDefinition[waveGeneratorActualWave][waveGeneratorActualEnemyGroup][1]==0){
						waveGeneratorActualEnemyGroup++;
						if(waveGeneratorActualEnemyGroup>waveGeneratorDefinition[waveGeneratorActualWave].length){
							waveGeneratorActualEnemyGroup=0;
							waveGeneratorActualWave++;
						}
					}
					waveGeneratorActualTime=newTime;
				}
			}
		} else {
			//win
		}
	} else {
		if((newTime - waveGeneratorActualTime)>initialDelay){
			waveGeneratorStarted=true;
			waveGeneratorActualTime=newTime;
		}
	}
}