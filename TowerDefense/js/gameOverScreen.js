/*
Funções de desenho da tela de Game Over.
Autor: Fernando del Rio/Thiago Alves
 */

 //Variáveis para as configurações da tela.
var gameOverOptionSelected, gameOverLoaded = false;

//Função para inicialização da tela.
function gameOverInit() {
	gameOverOptionSelected = gameOverOptions.tryagain;
}

//Função para desenhar a tela.
function gameOverRender() {
	if (!gameOverLoaded) {
		gameOverInit();
		gameOverLoaded = true;
	}
	drawGameOver(gameOverOptionSelected);
	gameOverUpdate();
}

//Função para atualizar a tela.
function gameOverUpdate() {
	buttonUpdate();
	if (!keyLocked && keyEnter && gameOverOptionSelected == gameOverOptions.tryagain) {
		gameState = currentLevel;
		keyLocked = true;
		gameOverLoaded = false;
	} else if (down) {
		gameOverOptionSelected = gameOverOptions.back;
	} else if (up) {
		gameOverOptionSelected = gameOverOptions.tryagain;
	} else if (!keyLocked && keyEnter && gameOverOptionSelected == gameOverOptions.back) {
		gameState = gameStates.mainMenu;
		keyLocked = true;
		gameOverLoaded = false;
	}
}
