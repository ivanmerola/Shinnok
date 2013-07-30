/*
Funções de desenho para o menu principal.
Autor: Fernando del Rio
 */
 
//Variáveis para as configurações da tela.
var mainMenuOptionSelected, mainMenuLoaded = false;
var map, mapName = "maps/chapter1/level1/mapChp1LvL1.tmx";

//Função para inicialização da tela.
function mainMenuInit() {
	//map = loadMap(mapName);
	mainMenuOptionSelected = mainMenuOptions.play;
}

//Função para desenhar a tela.
function mainMenuRender() {
	if (!mainMenuLoaded) {
		mainMenuInit();
		mainMenuLoaded = true;
	}
	drawMenu(mainMenuOptionSelected);
	mainMenuUpdate();
}

//Função para atualizar a tela.
function mainMenuUpdate() {

	buttonUpdate();

	if (!keyLocked && keyEnter && mainMenuOptionSelected == mainMenuOptions.play) {
		gameState = gameStates.chapterSelection;
		keyLocked = true;
	} else if (down) {
		mainMenuOptionSelected = mainMenuOptions.options;
	} else if (up) {
		mainMenuOptionSelected = mainMenuOptions.play;
	}
}
