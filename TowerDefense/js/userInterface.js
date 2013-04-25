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
		if (objectGroups[i].getAttribute("name") == "Waves") {
			return objectGroups[i].getElementsByTagName("properties")[0].getElementsByTagName("property")[2].getAttribute("value");
		}
	}
}