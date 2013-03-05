/*
Biblioteca javascript utilizada para desenhar a interface de usuário
 */

//Função para desenhar a interface que ficará sobre o mapa de uma fase.
function drawMapInterface() {
	drawRectangle(0, 0, 640, 40, 2, "#000", true, "#FFF");
	drawRectangle(0, 520, 640, 40, 2, "#000", true, "#FFF");
	canvas.moveTo(c.width/6, 0);
	canvas.lineTo(c.width/6, 40);

	canvas.moveTo(c.width/3, 0);
	canvas.lineTo(c.width/3, 40);

	canvas.moveTo(c.width/2, 0);
	canvas.lineTo(c.width/2, 40);

	canvas.moveTo(5*c.width/6, 0);
	canvas.lineTo(5*c.width/6, 40);

	canvas.stroke();

	drawText("$ Bits", "25px Arial", "center", "#000", c.width/12, 25);
	drawText("Vida:", "25px Arial", "center", "#000", c.width/4, 25);
	drawText("Wave:", "25px Arial", "center", "#000", 5*c.width/12, 25);
	drawText("Fase " + (Math.floor((gameState-23)/5)+1) + "-" + ((gameState-23)%5+1), "25px Arial", "center", "#000", 2*c.width/3, 25);
	drawText("Menu", "25px Arial", "center", "#000", 11*c.width/12, 25);

	//drawText("Menu de opções TOPO", "25px Arial", "center", "#000", 320, 25);
	drawText("Menu de opções RODAPÉ", "25px Arial", "center", "#000", 320, 545);
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
