/*
Biblioteca javascript utilizada para desenhar a interface de usuário
 */

//Função para desenhar a interface que ficará sobre o mapa de uma fase.
function drawMapInterface() {
	drawRectangle(0, 0, 640, 40, 2, "#000", true, "#FFF");
	drawRectangle(0, 520, 640, 40, 2, "#000", true, "#FFF");
	drawText("Menu de opções TOPO", "25px Arial", "center", "#000", 320, 25);
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
