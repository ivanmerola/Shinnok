/*
Funções de desenho para o menu de levels.
Autor: Thiago Alves
 */
 
//Variáveis para as configurações da tela.
var levelOptionselected, level1Loaded = false;

//Função para inicialização da tela.
function level1Init() {
	levelOptionselected = levelOptions.level1;
}

//Função para desenhar a tela.
function level1SelectionRender() {
	if (!level1Loaded) {
		level1Init();
		level1Loaded = true;
	}
	drawLevel1SelectScreen(levelOptionselected);
	level1SelectionUpdate();
}

//Função para atualizar a tela.
function level1SelectionUpdate() {
	buttonUpdate();
	//Verifica se foi apertada a tecla enter
	if (!keyLocked && keyEnter && levelOptionselected == levelOptions.level1) {
		gameState = gameStates.chp1LvL1;
		keyLocked = true;
	} else if (!keyLocked && keyEnter && levelOptionselected == levelOptions.backChapter) {
		gameState = gameStates.chapterSelection;
		keyLocked = true;
	} else if (!keyLocked && keyEnter && levelOptionselected == levelOptions.backMenu) {
		gameState = gameStates.mainMenu;
		keyLocked = true;

	//Verifica a opção atual e qual será a próxima se for apertado down
	} else if (!keyLocked && down && levelOptionselected == levelOptions.level1) {
		levelOptionselected = levelOptions.level2;
		keyLocked = true;
	} else if (!keyLocked && down && levelOptionselected == levelOptions.level2) {
		levelOptionselected = levelOptions.level3;
		keyLocked = true;
	} else if (!keyLocked && down && levelOptionselected == levelOptions.level3) {
		levelOptionselected = levelOptions.level4;
		keyLocked = true;
	} else if (!keyLocked && down && levelOptionselected == levelOptions.level4) {
		levelOptionselected = levelOptions.level5;
		keyLocked = true;
	} else if (!keyLocked && down && levelOptionselected == levelOptions.level5) {
		levelOptionselected = levelOptions.backChapter;
		keyLocked = true;
	} else if (!keyLocked && down && levelOptionselected == levelOptions.backChapter) {
		levelOptionselected = levelOptions.backMenu;
		keyLocked = true;
	} else if (!keyLocked && down && levelOptionselected == levelOptions.backMenu) {
		levelOptionselected = levelOptions.level1;
		keyLocked = true;
	}

	//Verifica a opção atual e qual será a próxima se for apertado down
	 else if (!keyLocked && up && levelOptionselected == levelOptions.level1) {
		levelOptionselected = levelOptions.backMenu;
		keyLocked = true;
	} else if (!keyLocked && up && levelOptionselected == levelOptions.level2) {
		levelOptionselected = levelOptions.level1;
		keyLocked = true;
	} else if (!keyLocked && up && levelOptionselected == levelOptions.level3) {
		levelOptionselected = levelOptions.level2;
		keyLocked = true;
	} else if (!keyLocked && up && levelOptionselected == levelOptions.level4) {
		levelOptionselected = levelOptions.level3;
		keyLocked = true;
	} else if (!keyLocked && up && levelOptionselected == levelOptions.level5) {
		levelOptionselected = levelOptions.level4;
		keyLocked = true;
	} else if (!keyLocked && up && levelOptionselected == levelOptions.backChapter) {
		levelOptionselected = levelOptions.level5;
		keyLocked = true;
	} else if (!keyLocked && up && levelOptionselected == levelOptions.backMenu) {
		levelOptionselected = levelOptions.backChapter;
		keyLocked = true;
	} 
}
