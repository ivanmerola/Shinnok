/*
Funções de desenho para o menu principal.
Autor: Fernando del Rio
 */
//Variáveis para as configurações da tela.
var optionSelected, mainMenuLoaded = false;

//Função para inicialização da tela.
function mainMenuInit() {
	optionSelected = mainMenuOptions.play;
}

//Função para desenhar a tela.
function mainMenuRender() {
	if (!mainMenuLoaded) {
		mainMenuInit();
		mainMenuLoaded = true;
	}
	drawMenu(optionSelected);
	mainMenuUpdate();
}

//Função para atualizar a tela.
function mainMenuUpdate() {
	if (!keyLocked && keyEnter && optionSelected == mainMenuOptions.play) {
		gameState = gameStates.chp4LvL5;//gameStates.chp1LvL1;
		keyLocked = true;
	} else if (down) {
		optionSelected = mainMenuOptions.options;
	} else if (up) {
		optionSelected = mainMenuOptions.play;
	}
}
