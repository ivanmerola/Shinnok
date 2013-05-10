//Variáveis para canvas e contexto
var canvas, c;

//Estado do jogo (tela atual)
var gameState;

//Configurações pra caracteres controláveis.
var character1, character1Sprite = "images/characteres/android_sprite.png",
chr1PosX = 352, chr1PosY = 160, chr1Width = 32, chr1Height = 32;

//Estado de teclas utilizadas. True indica tecla pressionada. False indica tecla não pressionada.
var down = false,
left = false,
right = false,
up = false,
keyG = false,
keyEnter = false;
keyLocked = false;

//Level atual do jogo.
var currentLevel;

//Estados possíveis: i=inicial, p=posicionando a torre, s=selecionando a torre
var statesInterface = {
	i : 1,
	p : 2,
	s : 3
}

//Tile sobre o qual paira o mouse.
var xTileMouseOver = 0, yTileMouseOver = 0;

//Posição do mouse e trava para o clique do mouse
var mousePosX = 0, mousePosY = 0, mouseLocked;

//Posição do mouse em relação ao canvas. True indica que o mouse está dentro do canvas. False indica que o mouse está fora do canvas.
var mouseInside = false;

//Estado do mouse. True indica que o botão está sendo pressionado. False indica que o botão não está sendo pressionado
var mouseClicked;

//Primeira função a ser executada. Utilizada para carregar os scripts, recursos e iniciar a renderização.
function init() {
	Modernizr.load([{
				load : [
					"js/xmlParser.js",
					"js/tileEngine.js",
					"js/spriteEngine.js",
					"js/utils.js",
					"js/userInterface.js",
					"js/loadingScreen.js",
					"js/mainMenu.js",
					"maps/chapter1/level1/mapChp1LvL1.js",
					"js/screenManager.js",
					"js/towerPlaces.js",
					"js/gameOverScreen.js",
					"js/waveGenerator.js",
					"js/winScreen.js",
					"js/chapterSelectScreen.js",
					"js/levelSelectScreen1.js"
				],
				complete : function () {
					c = document.getElementById("screen");
					canvas = c.getContext("2d");
					character1 = loadCharacter(chr1PosX, chr1PosY, chr1Width, chr1Height, character1Sprite, keyboard.LEFT, false);
					gameState = gameStates.mainMenu;
					render();
				}
			}
		]);
}

//Função de renderização responsável pela saída de dados.
function render() {
	drawGameScreen(gameState);
	setTimeout(render, 50);
}

//Função executada quando alguma tecla é pressionada.
function keyDown(e) {
	if (e.keyCode == keyboard.S) {
		down = true;
	} else if (e.keyCode == keyboard.A) {
		left = true;
	} else if (e.keyCode == keyboard.D) {
		right = true;
	} else if (e.keyCode == keyboard.W) {
		up = true;
	} else if (e.keyCode == keyboard.G) {
		keyG = true;
	} else if (e.keyCode == keyboard.ENTER) {
		keyEnter = true;
	}
}

//Função executada quando alguma tecla que está pressionada é solta.
function keyUp(e) {
	if (e.keyCode == keyboard.S) {
		down = false;
		keyLocked = false;
	} else if (e.keyCode == keyboard.A) {
		left = false;
		keyLocked = false;
	} else if (e.keyCode == keyboard.D) {
		right = false;
		keyLocked = false;
	} else if (e.keyCode == keyboard.W) {
		up = false;
		keyLocked = false;
	} else if (e.keyCode == keyboard.G) {
		keyG = false;
		keyLocked = false;
	} else if (e.keyCode == keyboard.ENTER) {
		keyEnter = false;
		keyLocked = false;
	}
}

//Função executada quando um botão do mouse é pressionado.
function mouseDown(e) {
	mouseClicked = true;
}

//Função executada quando um botão do mouse, que está sendo pressionado, é solto
function mouseUp(e) {
	mouseClicked = false;
	mouseLocked = false;
}

//Função executada quando o mouse é movido.
function mouseMoved(e) {
	//Filtra eventos fora do canvas
	if(c==undefined){
		return;
	}
	var rect = c.getBoundingClientRect();
	if (e.clientX < rect.left + 2 || e.clientX > rect.right - 2) {
		mouseInside = false;
		return;
	}
	if (e.clientY < rect.top + 42 || e.clientY > rect.bottom - 42) {
		mouseInside = false;
		return;
	}
	mouseInside = true;
	mousePosX = e.clientX - rect.left;
	mousePosY = e.clientY - 40 - rect.top;
	xTileMouseOver = Math.floor( mousePosX/ 32); //TODO : trocar 32 por uma var global de largura de tile
	yTileMouseOver = Math.floor(mousePosY/ 32); //TODO : trocar 32 por uma var global de altura de tile
}

//Representação das teclas do teclado
var keyboard = {
	W : 87,
	A : 65,
	S : 83,
	D : 68,
	UP : 38,
	LEFT : 37,
	DOWN : 40,
	RIGHT : 39,
	G : 71,
	ENTER : 13
}

//Definição de códigos para as telas do jogo
var gameStates = {
	mainMenu : 13,
	chapterSelection : 14,
	levelSelection1 : 15,
	levelSelection2 : 16,
	levelSelection3 : 17,
	levelSelection4 : 18,
	levelSelection5 : 19,
	levelSelection6 : 20,
	levelSelection7 : 21,
	levelSelection8 : 22,
	chp1LvL1 : 23,
	chp1LvL2 : 24,
	chp1LvL3 : 25,
	chp1LvL4 : 26,
	chp1LvL5 : 27,
	chp2LvL1 : 28,
	chp2LvL2 : 29,
	chp2LvL3 : 30,
	chp2LvL4 : 31,
	chp2LvL5 : 32,
	chp3LvL1 : 33,
	chp3LvL2 : 34,
	chp3LvL3 : 35,
	chp3LvL4 : 36,
	chp3LvL5 : 37,
	chp4LvL1 : 38,
	chp4LvL2 : 39,
	chp4LvL3 : 40,
	chp4LvL4 : 41,
	chp4LvL5 : 42,
	chp5LvL1 : 43,
	chp5LvL2 : 44,
	chp5LvL3 : 45,
	chp5LvL4 : 46,
	chp5LvL5 : 47,
	chp6LvL1 : 48,
	chp6LvL2 : 49,
	chp6LvL3 : 50,
	chp6LvL4 : 51,
	chp6LvL5 : 52,
	chp7LvL1 : 53,
	chp7LvL2 : 54,
	chp7LvL3 : 55,
	chp7LvL4 : 56,
	chp7LvL5 : 57,
	chp8LvL1 : 58,
	chp8LvL2 : 59,
	chp8LvL3 : 60,
	chp8LvL4 : 61,
	chp8LvL5 : 62,
	cutScene1 : 63,
	cutScene2 : 64,
	cutScene3 : 65,
	cutScene4 : 66,
	cutScene5 : 67,
	cutScene6 : 68,
	cutScene7 : 69,
	cutScene8 : 70,
	cutScene9 : 71,
	settings : 72,
	gameOver : 73,
	winScreen : 74
}

//Definição de códigos para as opções do menu principal.
var mainMenuOptions = {
	play : 1,
	options : 2
}

//Definição de códigos para as opções do menu de game over
var gameOverOptions = {
	tryagain : 1,
	back : 2
}

var chapterOptions = {
	chapter1 : 1,
	chapter2 : 2,
	chapter3 : 3,
	chapter4 : 4,
	chapter5 : 5,
	chapter6 : 6,
	chapter7 : 7,
	chapter8 : 8,
	back : 9
}

var levelOptions = {
	level1 : 1,
	level2 : 2,
	level3 : 3,
	level4 : 4,
	level5 : 5,
	backChapter : 6,
	backMenu : 7
}

//Definição de códigos para as opções do menu de game over
var winScreenOptions = {
	back : 1
}

//Definição dos eventos utilizados
window.onkeydown = keyDown;
window.onkeyup = keyUp;
window.onload = init;
window.onmousemove = mouseMoved;
window.onmousedown = mouseDown;
window.onmouseup = mouseUp;