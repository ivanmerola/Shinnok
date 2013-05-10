/*
Funções de desenho da tela de vitória.
Autor: Fernando del Rio
 */

 //Variáveis para as configurações da tela.
var winScreenOptionSelected, winScreenLoaded = false;

//Função para inicialização da tela.
function winScreenInit() {
	winScreenOptionSelected = winScreenOptions.back;
}

//Função para desenhar a tela.
function winScreenRender() {
	if (!winScreenLoaded) {
		winScreenInit();
		winScreenLoaded = true;
	}
	drawWinScreen(winScreenOptionSelected);
	winScreenUpdate();
}

//Função para atualizar a tela.
function winScreenUpdate() {
	if (!keyLocked && keyEnter && winScreenOptionSelected == winScreenOptions.back) {
		gameState = gameStates.mainMenu;
		keyLocked = true;
		winScreenLoaded = false;
	}
}
