/*
Biblioteca javascript utilizada para desenhar a interface de usuário
Autores: Fernando del Rio / Thiago Alves / Orlando Figueiredo / Samuel / Renato
 */

//Função para desenhar a interface que ficará sobre o mapa de uma fase.
function drawMapInterface(map, bits, life, actualWave, waveQty, selected, actualState) {
	drawRectangle(0, 0, 640, 40, 2, "#000", true, "#FFF");
	drawRectangle(0, 520, 640, 40, 2, "#000", true, "#FFF");
	drawLine(c.width/6, 0, c.width/6, 40, 2, "#000");
	drawLine(c.width/3, 0, c.width/3, 40, 2, "#000");
	drawLine(c.width/2, 0, c.width/2, 40, 2, "#000");
	drawLine(5*c.width/6, 0, 5*c.width/6, 40, 2, "#000");
	drawText("$"+bits, "25px Arial", "center", "#000", c.width/12, 25);
	drawText("Vida:"+life, "25px Arial", "center", "#000", c.width/4, 25);
	drawText("Wave:"+actualWave+"/"+waveQty, "25px Arial", "center", "#000", 5*c.width/12, 25);
	drawText(getMapName(map), "25px Arial", "center", "#000", 2*c.width/3, 25);
	//drawText("Menu", "25px Arial", "center", "#000", 11*c.width/12, 25);
	loadButton((11*c.width/12)-30, 3, 60, 30, "#FFF", "Menu", 11*c.width/12, 25, "#000");
	//drawText("Menu de opções RODAPÉ", "25px Arial", "center", "#000", 320, 545);
	if (actualState!=statesInterface.s){
		//drawRectangle(80, 520, 240, 40, 2, "#000", true, "#000");
		drawLine(c.width/8,520,c.width/8,560,2,"#000");
		drawLine(c.width/2,520,c.width/2,560,2,"#000");
		drawLine(c.width/1.5,520,c.width/1.5,560,2,"#000");
		//drawText("T1", "25px Arial", "center", "#000",290, 550);
		loadButton(270, 525, 40, 30, "#FFF", "T1", 290, 550, "#000");
	}else{
		drawLine(c.width/8,520,c.width/8,560,2,"#000");
		drawLine(2*c.width/8,520,2*c.width/8,560,2,"#000");
		drawLine(3*c.width/8,520,3*c.width/8,560,2,"#000");		
		drawLine(4*c.width/8,520,4*c.width/8,560,2,"#000");		
		drawLine(6*c.width/8,520,6*c.width/8,560,2,"#000");
		//drawCircle(selected.x+16, selected.y+96, selected.range, "rgba(0,200,0,0.5)");	
	}	

}

//Função para desenhar o menu principal. Parâmetros: qual opção está selecionada.
function drawMenu(optionSelected) {
	drawRectangle(0, 0, 640, 560, 2, "#000", true, "#FFF");
	loadButton(280, 203, 80, 30, "#FFF", "Jogar", 320, 225, "#000");
	loadButton(270, 253, 100, 30, "#FFF", "Opcoes", 320, 275, "#000");
}

function drawGameOver(optionSelected) {
	drawRectangle(0, 0, 640, 560, 2, "#000", true, "#FFF");
	loadButton(215, 203, 210, 30, "#FFF", "Tente Novamente", 320, 225, "#000");
	loadButton(230, 253, 180, 30, "#FFF", "Menu Principal", 320, 275, "#000");
}

function drawChapterSelectScreen(optionSelected) {
	drawRectangle(0, 0, 640, 560, 2, "#000", true, "#00FFFF");
	//loadButton(260, 10, 120, 30, "#FFF", "Capitulo 1", 320, 32, "#000");
	//loadButton(260, 72, 120, 30, "#FFF", "Capitulo 2", 320, 94, "#000");
	//loadButton(260, 134, 120, 30, "#FFF", "Capitulo 3", 320, 156, "#000");
	//loadButton(260, 196, 120, 30, "#FFF", "Capitulo 4", 320, 218, "#000");
	//loadButton(260, 258, 120, 30, "#FFF", "Capitulo 5", 320, 280, "#000");
	//loadButton(260, 320, 120, 30, "#FFF", "Capitulo 6", 320, 342, "#000");
	//loadButton(260, 382, 120, 30, "#FFF", "Capitulo 7", 320, 404, "#000");
	//loadButton(260, 444, 120, 30, "#FFF", "Capitulo 8", 320, 466, "#000");
	loadButton(230, 506, 180, 30, "#FFF", "Menu Principal", 320, 528, "#000");
	var x = [200, 100, 0, 100, 200, 220];
	var y = [0, 0, 100, 150, 150, 100];
	var x1 = [600, 500, 450, 500, 600];
	var y1 = [400, 400, 450, 550, 550];
	var x2 = [600, 500, 450, 500, 600, 640];
	var y2 = [0, 0, 100, 150, 150, 100];
	var x3 = [200, 100, 0, 100, 150];
	var y3 = [400, 400, 450, 550, 450];
	var x4 = [420, 270, 170, 270, 370, 450];
	var y4 = [190, 240, 340, 490, 490, 220];
	var x5 = [200, 100, 0, 100, 200];
	var y5 = [200, 200, 250, 350, 250];
	var x6 = [620, 500, 450, 500, 600];
	var y6 = [230, 250, 300, 350, 350];
	var x7 = [400, 300, 250, 275, 400];
	var y7 = [25, 25, 50, 150, 125];
	loadPolygonButton(x, y, "#008000", "Cupcake", 150, 80, "rgb(255,255,0)");
	loadPolygonButton(x1, y1, "#000", "Donut", 525, 475, "rgb(255,255,0)");
	loadPolygonButton(x2, y2, "#000", "Eclair", 545, 80, "rgb(255,255,0)");
	loadPolygonButton(x3, y3, "#000", "Froyo", 80, 475, "rgb(255,255,0)");
	loadPolygonButton(x4, y4, "#000", "Gingerbread", 330, 325, "rgb(255,255,0)");
	loadPolygonButton(x5, y5, "#000", "HoneyComb", 100, 265, "rgb(255,255,0)");
	loadPolygonButton(x6, y6, "#000", "IceCream", 525, 310, "rgb(255,255,0)");
	loadPolygonButton(x7, y7, "#000", "JellyBean", 330, 85, "rgb(255,255,0)");
}

function drawLevel1SelectScreen(optionSelected) {
	drawRectangle(0, 0, 640, 560, 2, "#000", true, "#FFF");
	loadButton(270, 18, 100, 30, "#FFF", "Level 1", 320, 40, "#000");
	loadButton(270, 98, 100, 30, "#FFF", "Level 2", 320, 120, "#000");
	loadButton(270, 178, 100, 30, "#FFF", "Level 3", 320, 200, "#000");
	loadButton(270, 258, 100, 30, "#FFF", "Level 4", 320, 280, "#000");
	loadButton(270, 338, 100, 30, "#FFF", "Level 5", 320, 360, "#000");
	loadButton(190, 418, 260, 30, "#FFF", "Selecao de Capitulos", 320, 440, "#000");
	loadButton(230, 498, 180, 30, "#FFF", "Menu Principal", 320, 520, "#000");
}

function drawWinScreen(optionSelected) {
	drawRectangle(0, 0, 640, 560, 2, "#000", true, "#FFF");
	drawText("Parabéns você venceu!", "35px Arial", "center", "#000", 320, 200);
	loadButton(230, 253, 180, 30, "#FFF", "Menu Principal", 320, 275, "#000");
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
			return objectGroups[i].getElementsByTagName("properties")[0].getElementsByTagName("property")[3].getAttribute("value");
		}
	}
}