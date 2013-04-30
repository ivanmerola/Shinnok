/*
Biblioteca javascript utilizada para desenhar a interface de usuário
Autores: Fernando del Rio / Thiago Alves / Orlando Figueiredo / Samuel / Renato
 */

//Função para desenhar a interface que ficará sobre o mapa de uma fase.
function drawMapInterface(map, bits, life, waveQty, selected) {
	drawRectangle(0, 0, 640, 40, 2, "#000", true, "#FFF");
	drawRectangle(0, 520, 640, 40, 2, "#000", true, "#FFF");
	drawLine(c.width/6, 0, c.width/6, 40, 2, "#000");
	drawLine(c.width/3, 0, c.width/3, 40, 2, "#000");
	drawLine(c.width/2, 0, c.width/2, 40, 2, "#000");
	drawLine(5*c.width/6, 0, 5*c.width/6, 40, 2, "#000");
	drawText("$"+bits, "25px Arial", "center", "#000", c.width/12, 25);
	drawText("Vida:"+life, "25px Arial", "center", "#000", c.width/4, 25);
	drawText("Wave:"+waveQty, "25px Arial", "center", "#000", 5*c.width/12, 25);
	drawText(getMapName(map), "25px Arial", "center", "#000", 2*c.width/3, 25);
	drawText("Menu", "25px Arial", "center", "#000", 11*c.width/12, 25);
	//drawText("Menu de opções RODAPÉ", "25px Arial", "center", "#000", 320, 545);
	if (!selected){
		drawLine(c.width/8,520,c.width/8,560,2,"#000");
		drawLine(c.width/2,520,c.width/2,560,2,"#000");
		drawLine(c.width/1.5,520,c.width/1.5,560,2,"#000");
	}	

}

//Função para desenhar o menu principal. Parâmetros: qual opção está selecionada.
function drawMenu(optionSelected) {
	drawRectangle(0, 0, 640, 560, 2, "#000", true, "#FFF");
	if (optionSelected == mainMenuOptions.play) {
		drawText("Jogar", "25px Arial", "center", "#B0B000", 320, 225);
		drawText("Opções", "25px Arial", "center", "#000", 320, 275);
	} else if (optionSelected == mainMenuOptions.options) {
		drawText("Jogar", "25px Arial", "center", "#000", 320, 225);
		drawText("Opções", "25px Arial", "center", "#B0B000", 320, 275);
	}
}

function drawGameOver(optionSelected) {
	drawRectangle(0, 0, 640, 560, 2, "#000", true, "#FFF");
	if (optionSelected == gameOverOptions.tryagain) {
		drawText("Tente Novamente", "25px Arial", "center", "#B0B000", 320, 225);
		drawText("Menu Principal", "25px Arial", "center", "#000", 320, 275);
	} else if (optionSelected == gameOverOptions.back) {
		drawText("Tente Novamente", "25px Arial", "center", "#000", 320, 225);
		drawText("Menu Principal", "25px Arial", "center", "#B0B000", 320, 275);
	}
}

function drawChapterSelectScreen(optionSelected) {
	drawRectangle(0, 0, 640, 560, 2, "#000", true, "#FFF");
	switch (optionSelected) {

		case chapterOptions.chapter1 :
			drawText("Capitulo 1", "25px Arial", "center", "#B0B000", 320, 32);
			drawText("Capitulo 2", "25px Arial", "center", "#000", 320, 94);
			drawText("Capitulo 3", "25px Arial", "center", "#000", 320, 156);
			drawText("Capitulo 4", "25px Arial", "center", "#000", 320, 218);
			drawText("Capitulo 5", "25px Arial", "center", "#000", 320, 280);
			drawText("Capitulo 6", "25px Arial", "center", "#000", 320, 342);
			drawText("Capitulo 7", "25px Arial", "center", "#000", 320, 404);
			drawText("Capitulo 8", "25px Arial", "center", "#000", 320, 466);
			drawText("Menu Principal", "25px Arial", "center", "#000", 320, 528);
			break;

		case chapterOptions.chapter2 :
			drawText("Capitulo 1", "25px Arial", "center", "#000", 320, 32);
			drawText("Capitulo 2", "25px Arial", "center", "#B0B000", 320, 94);
			drawText("Capitulo 3", "25px Arial", "center", "#000", 320, 156);
			drawText("Capitulo 4", "25px Arial", "center", "#000", 320, 218);
			drawText("Capitulo 5", "25px Arial", "center", "#000", 320, 280);
			drawText("Capitulo 6", "25px Arial", "center", "#000", 320, 342);
			drawText("Capitulo 7", "25px Arial", "center", "#000", 320, 404);
			drawText("Capitulo 8", "25px Arial", "center", "#000", 320, 466);
			drawText("Menu Principal", "25px Arial", "center", "#000", 320, 528);
			break;

		case chapterOptions.chapter3 :
			drawText("Capitulo 1", "25px Arial", "center", "#000", 320, 32);
			drawText("Capitulo 2", "25px Arial", "center", "#000", 320, 94);
			drawText("Capitulo 3", "25px Arial", "center", "#B0B000", 320, 156);
			drawText("Capitulo 4", "25px Arial", "center", "#000", 320, 218);
			drawText("Capitulo 5", "25px Arial", "center", "#000", 320, 280);
			drawText("Capitulo 6", "25px Arial", "center", "#000", 320, 342);
			drawText("Capitulo 7", "25px Arial", "center", "#000", 320, 404);
			drawText("Capitulo 8", "25px Arial", "center", "#000", 320, 466);
			drawText("Menu Principal", "25px Arial", "center", "#000", 320, 528);
			break;

		case chapterOptions.chapter4 :
			drawText("Capitulo 1", "25px Arial", "center", "#000", 320, 32);
			drawText("Capitulo 2", "25px Arial", "center", "#000", 320, 94);
			drawText("Capitulo 3", "25px Arial", "center", "#000", 320, 156);
			drawText("Capitulo 4", "25px Arial", "center", "#B0B000", 320, 218);
			drawText("Capitulo 5", "25px Arial", "center", "#000", 320, 280);
			drawText("Capitulo 6", "25px Arial", "center", "#000", 320, 342);
			drawText("Capitulo 7", "25px Arial", "center", "#000", 320, 404);
			drawText("Capitulo 8", "25px Arial", "center", "#000", 320, 466);
			drawText("Menu Principal", "25px Arial", "center", "#000", 320, 528);
			break;

		case chapterOptions.chapter5 :
			drawText("Capitulo 1", "25px Arial", "center", "#000", 320, 32);
			drawText("Capitulo 2", "25px Arial", "center", "#000", 320, 94);
			drawText("Capitulo 3", "25px Arial", "center", "#000", 320, 156);
			drawText("Capitulo 4", "25px Arial", "center", "#000", 320, 218);
			drawText("Capitulo 5", "25px Arial", "center", "#B0B000", 320, 280);
			drawText("Capitulo 6", "25px Arial", "center", "#000", 320, 342);
			drawText("Capitulo 7", "25px Arial", "center", "#000", 320, 404);
			drawText("Capitulo 8", "25px Arial", "center", "#000", 320, 466);
			drawText("Menu Principal", "25px Arial", "center", "#000", 320, 528);
			break;

		case chapterOptions.chapter6 :
			drawText("Capitulo 1", "25px Arial", "center", "#000", 320, 32);
			drawText("Capitulo 2", "25px Arial", "center", "#000", 320, 94);
			drawText("Capitulo 3", "25px Arial", "center", "#000", 320, 156);
			drawText("Capitulo 4", "25px Arial", "center", "#000", 320, 218);
			drawText("Capitulo 5", "25px Arial", "center", "#000", 320, 280);
			drawText("Capitulo 6", "25px Arial", "center", "#B0B000", 320, 342);
			drawText("Capitulo 7", "25px Arial", "center", "#000", 320, 404);
			drawText("Capitulo 8", "25px Arial", "center", "#000", 320, 466);
			drawText("Menu Principal", "25px Arial", "center", "#000", 320, 528);
			break;

		case chapterOptions.chapter7 :
			drawText("Capitulo 1", "25px Arial", "center", "#000", 320, 32);
			drawText("Capitulo 2", "25px Arial", "center", "#000", 320, 94);
			drawText("Capitulo 3", "25px Arial", "center", "#000", 320, 156);
			drawText("Capitulo 4", "25px Arial", "center", "#000", 320, 218);
			drawText("Capitulo 5", "25px Arial", "center", "#000", 320, 280);
			drawText("Capitulo 6", "25px Arial", "center", "#000", 320, 342);
			drawText("Capitulo 7", "25px Arial", "center", "#B0B000", 320, 404);
			drawText("Capitulo 8", "25px Arial", "center", "#000", 320, 466);
			drawText("Menu Principal", "25px Arial", "center", "#000", 320, 528);
			break;

		case chapterOptions.chapter8 :
			drawText("Capitulo 1", "25px Arial", "center", "#000", 320, 32);
			drawText("Capitulo 2", "25px Arial", "center", "#000", 320, 94);
			drawText("Capitulo 3", "25px Arial", "center", "#000", 320, 156);
			drawText("Capitulo 4", "25px Arial", "center", "#000", 320, 218);
			drawText("Capitulo 5", "25px Arial", "center", "#000", 320, 280);
			drawText("Capitulo 6", "25px Arial", "center", "#000", 320, 342);
			drawText("Capitulo 7", "25px Arial", "center", "#000", 320, 404);
			drawText("Capitulo 8", "25px Arial", "center", "#B0B000", 320, 466);
			drawText("Menu Principal", "25px Arial", "center", "#000", 320, 528);
			break;


		case chapterOptions.back :
			drawText("Capitulo 1", "25px Arial", "center", "#000", 320, 32);
			drawText("Capitulo 2", "25px Arial", "center", "#000", 320, 94);
			drawText("Capitulo 3", "25px Arial", "center", "#000", 320, 156);
			drawText("Capitulo 4", "25px Arial", "center", "#000", 320, 218);
			drawText("Capitulo 5", "25px Arial", "center", "#000", 320, 280);
			drawText("Capitulo 6", "25px Arial", "center", "#000", 320, 342);
			drawText("Capitulo 7", "25px Arial", "center", "#000", 320, 404);
			drawText("Capitulo 8", "25px Arial", "center", "#000", 320, 466);
			drawText("Menu Principal", "25px Arial", "center", "#B0B000", 320, 528);
			break;
	}
}

function drawLevel1SelectScreen(optionSelected) {
	drawRectangle(0, 0, 640, 560, 2, "#000", true, "#FFF");
	switch (optionSelected) {

		case levelOptions.level1 :
			drawText("Level 1", "25px Arial", "center", "#B0B000", 320, 40);
			drawText("Level 2", "25px Arial", "center", "#000", 320, 120);
			drawText("Level 3", "25px Arial", "center", "#000", 320, 200);
			drawText("Level 4", "25px Arial", "center", "#000", 320, 280);
			drawText("Level 5", "25px Arial", "center", "#000", 320, 360);
			drawText("Seleção de Capítulos", "25px Arial", "center", "#000", 320, 440);
			drawText("Menu Principal", "25px Arial", "center", "#000", 320, 520);
			break;

		case levelOptions.level2 :
			drawText("Level 1", "25px Arial", "center", "#000", 320, 40);
			drawText("Level 2", "25px Arial", "center", "#B0B000", 320, 120);
			drawText("Level 3", "25px Arial", "center", "#000", 320, 200);
			drawText("Level 4", "25px Arial", "center", "#000", 320, 280);
			drawText("Level 5", "25px Arial", "center", "#000", 320, 360);
			drawText("Seleção de Capítulos", "25px Arial", "center", "#000", 320, 440);
			drawText("Menu Principal", "25px Arial", "center", "#000", 320, 520);
			break;

		case levelOptions.level3 :
			drawText("Level 1", "25px Arial", "center", "#000", 320, 40);
			drawText("Level 2", "25px Arial", "center", "#000", 320, 120);
			drawText("Level 3", "25px Arial", "center", "#B0B000", 320, 200);
			drawText("Level 4", "25px Arial", "center", "#000", 320, 280);
			drawText("Level 5", "25px Arial", "center", "#000", 320, 360);
			drawText("Seleção de Capítulos", "25px Arial", "center", "#000", 320, 440);
			drawText("Menu Principal", "25px Arial", "center", "#000", 320, 520);
			break;

		case levelOptions.level4 :
			drawText("Level 1", "25px Arial", "center", "#000", 320, 40);
			drawText("Level 2", "25px Arial", "center", "#000", 320, 120);
			drawText("Level 3", "25px Arial", "center", "#000", 320, 200);
			drawText("Level 4", "25px Arial", "center", "#B0B000", 320, 280);
			drawText("Level 5", "25px Arial", "center", "#000", 320, 360);
			drawText("Seleção de Capítulos", "25px Arial", "center", "#000", 320, 440);
			drawText("Menu Principal", "25px Arial", "center", "#000", 320, 520);
			break;

		case levelOptions.level5 :
			drawText("Level 1", "25px Arial", "center", "#000", 320, 40);
			drawText("Level 2", "25px Arial", "center", "#000", 320, 120);
			drawText("Level 3", "25px Arial", "center", "#000", 320, 200);
			drawText("Level 4", "25px Arial", "center", "#000", 320, 280);
			drawText("Level 5", "25px Arial", "center", "#B0B000", 320, 360);
			drawText("Seleção de Capítulos", "25px Arial", "center", "#000", 320, 440);
			drawText("Menu Principal", "25px Arial", "center", "#000", 320, 520);
			break;

		case levelOptions.backChapter :
			drawText("Level 1", "25px Arial", "center", "#000", 320, 40);
			drawText("Level 2", "25px Arial", "center", "#000", 320, 120);
			drawText("Level 3", "25px Arial", "center", "#000", 320, 200);
			drawText("Level 4", "25px Arial", "center", "#000", 320, 280);
			drawText("Level 5", "25px Arial", "center", "#000", 320, 360);
			drawText("Seleção de Capítulos", "25px Arial", "center", "#B0B000", 320, 440);
			drawText("Menu Principal", "25px Arial", "center", "#000", 320, 520);
			break;

		case levelOptions.backMenu :
			drawText("Level 1", "25px Arial", "center", "#000", 320, 40);
			drawText("Level 2", "25px Arial", "center", "#000", 320, 120);
			drawText("Level 3", "25px Arial", "center", "#000", 320, 200);
			drawText("Level 4", "25px Arial", "center", "#000", 320, 280);
			drawText("Level 5", "25px Arial", "center", "#000", 320, 360);
			drawText("Seleção de Capítulos", "25px Arial", "center", "#000", 320, 440);
			drawText("Menu Principal", "25px Arial", "center", "#B0B000", 320, 520);
			break;
	}
}

function getMapName(filename){
	xmlDoc = loadXMLDoc(filename);
	var objectGroups = xmlDoc.getElementsByTagName("objectgroup");
	for (var i = 0; i < objectGroups.length; i++) {
		if (objectGroups[i].getAttribute("name") == "MapName") {
			return objectGroups[i].getElementsByTagName("property")[0].getAttribute("value");
		}
	}
}

function getBits(filename) {
	xmlDoc = loadXMLDoc(filename);
	var objectGroups = xmlDoc.getElementsByTagName("objectgroup");
	for (var i = 0; i < objectGroups.length; i++) {
		if (objectGroups[i].getAttribute("name") == "Bits") {
			return objectGroups[i].getElementsByTagName("property")[0].getAttribute("value");
		}
	}
}

function getLife(filename) {
	xmlDoc = loadXMLDoc(filename);
	var objectGroups = xmlDoc.getElementsByTagName("objectgroup");
	for (var i = 0; i < objectGroups.length; i++) {
		if (objectGroups[i].getAttribute("name") == "Life") {
			return objectGroups[i].getElementsByTagName("property")[0].getAttribute("value");
		}
	}
}

function getWaveQty(filename) {
	xmlDoc = loadXMLDoc(filename);
	var objectGroups = xmlDoc.getElementsByTagName("objectgroup");
	for (var i = 0; i < objectGroups.length; i++) {
		if (objectGroups[i].getAttribute("name") == "WaveQty") {
			return objectGroups[i].getElementsByTagName("property")[0].getAttribute("value");
		}
	}
}