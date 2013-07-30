/*
Funções de desenho para o menu de capítulos.
Autor: Thiago Alves
 */
 
//Variáveis para as configurações da tela.
var chapterOptionSelected, chapterLoaded = false;

//Função para inicialização da tela.
function chapterInit() {
	chapterOptionSelected = chapterOptions.chapter1;
}

//Função para desenhar a tela.
function chapterSelectionRender() {
	if (!chapterLoaded) {
		chapterInit();
		chapterLoaded = true;
	}
	drawChapterSelectScreen(chapterOptionSelected);
	chapterSelectionUpdate();
}

//Função para atualizar a tela.
function chapterSelectionUpdate() {
	buttonUpdate();
	//Verifica se foi apertada a tecla enter
	if (!keyLocked && keyEnter && chapterOptionSelected == chapterOptions.chapter1) {
		gameState = gameStates.levelSelection1;
		keyLocked = true;
	} else if (!keyLocked && keyEnter && chapterOptionSelected == chapterOptions.back) {
		gameState = gameStates.mainMenu;
		keyLocked = true;
	//Verifica a opção atual e qual será a próxima se for apertado down
	} else if (!keyLocked && down && chapterOptionSelected == chapterOptions.chapter1) {
		chapterOptionSelected = chapterOptions.chapter2;
		keyLocked = true;
	} else if (!keyLocked && down && chapterOptionSelected == chapterOptions.chapter2) {
		chapterOptionSelected = chapterOptions.chapter3;
		keyLocked = true;
	} else if (!keyLocked && down && chapterOptionSelected == chapterOptions.chapter3) {
		chapterOptionSelected = chapterOptions.chapter4;
		keyLocked = true;
	} else if (!keyLocked && down && chapterOptionSelected == chapterOptions.chapter4) {
		chapterOptionSelected = chapterOptions.chapter5;
		keyLocked = true;
	} else if (!keyLocked && down && chapterOptionSelected == chapterOptions.chapter5) {
		chapterOptionSelected = chapterOptions.chapter6;
		keyLocked = true;
	} else if (!keyLocked && down && chapterOptionSelected == chapterOptions.chapter6) {
		chapterOptionSelected = chapterOptions.chapter7;
		keyLocked = true;
	} else if (!keyLocked && down && chapterOptionSelected == chapterOptions.chapter7) {
		chapterOptionSelected = chapterOptions.chapter8;
		keyLocked = true;
	} else if (!keyLocked && down && chapterOptionSelected == chapterOptions.chapter8) {
		chapterOptionSelected = chapterOptions.back;
		keyLocked = true;
	} else if (!keyLocked && down && chapterOptionSelected == chapterOptions.back) {
		chapterOptionSelected = chapterOptions.chapter1;
		keyLocked = true;
	}

	//Verifica a opção atual e qual será a próxima se for apertado down
	 else if (!keyLocked && up && chapterOptionSelected == chapterOptions.chapter1) {
		chapterOptionSelected = chapterOptions.back;
		keyLocked = true;
	} else if (!keyLocked && up && chapterOptionSelected == chapterOptions.chapter2) {
		chapterOptionSelected = chapterOptions.chapter1;
		keyLocked = true;
	} else if (!keyLocked && up && chapterOptionSelected == chapterOptions.chapter3) {
		chapterOptionSelected = chapterOptions.chapter2;
		keyLocked = true;
	} else if (!keyLocked && up && chapterOptionSelected == chapterOptions.chapter4) {
		chapterOptionSelected = chapterOptions.chapter3;
		keyLocked = true;
	} else if (!keyLocked && up && chapterOptionSelected == chapterOptions.chapter5) {
		chapterOptionSelected = chapterOptions.chapter4;
		keyLocked = true;
	} else if (!keyLocked && up && chapterOptionSelected == chapterOptions.chapter6) {
		chapterOptionSelected = chapterOptions.chapter5;
		keyLocked = true;
	} else if (!keyLocked && up && chapterOptionSelected == chapterOptions.chapter7) {
		chapterOptionSelected = chapterOptions.chapter6;
		keyLocked = true;
	} else if (!keyLocked && up && chapterOptionSelected == chapterOptions.chapter8) {
		chapterOptionSelected = chapterOptions.chapter7;
		keyLocked = true;
	} else if (!keyLocked && up && chapterOptionSelected == chapterOptions.back) {
		chapterOptionSelected = chapterOptions.chapter8;
		keyLocked = true;
	}
}
