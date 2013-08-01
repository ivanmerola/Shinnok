var buttons = [];

function loadButton(x, y, width, height, color, text, textX, textY, textColor){

	var button = {};
	button.x = x;
	button.y = y;
	button.width = width;
	button.height = height;
	button.color = color;
	button.text = text;
	button.textX = textX;
	button.textY = textY;
	button.textColor = textColor;
	buttons.push(button);
	drawButton(button);

}

function drawButton(button){

	drawRectangle(button.x, button.y, button.width, button.height, 2, "#000", true, button.color);
	drawText(button.text, "25px Arial", "center", button.textColor, button.textX, button.textY);

}

function setButtonColor(color, button){

	button.color = color;
	drawButton(button);

}

function buttonUpdate(){

	for(var i = 0; i<buttons.length; i++){
		if (isOver(buttons[i])){
			setButtonColor("#FF0000", buttons[i]);
			clickHandler(buttons[i]);
			break;
		}
	}
	buttons = [];

}

function clickHandler(button){

	if (isClicked(button)){
		setButtonColor("#0000FF", button);
		buttonHandler(button);
	}

}

function buttonHandler(button){


	if(isUp(button)){
		nextStep(button);
	}else{
		if(moved && !mouseClicked){setButtonColor("#FF0000", button);}
		return 0;
	}

}

function nextStep(button){

	if (button.text == "Jogar" || button.text == "Selecao de Capitulos"){
		gameState = gameStates.chapterSelection;
	}else if (button.text == "Opcoes"){
		//gameState = gameStates.settings; Not implemented yet.
	}else if (button.text == "Capitulo 1"){
		gameState = gameStates.levelSelection1;
	}else if (button.text == "Capitulo 2"){
		//gameState = gameStates.levelSelection2; Not implemented yet.
	}else if (button.text == "Capitulo 3"){
		//gameState = gameStates.levelSelection3; Not implemented yet.
	}else if (button.text == "Capitulo 4"){
		//gameState = gameStates.levelSelection4; Not implemented yet.
	}else if (button.text == "Capitulo 5"){
		//gameState = gameStates.levelSelection5; Not implemented yet.
	}else if (button.text == "Capitulo 6"){
		//gameState = gameStates.levelSelection6; Not implemented yet.
	}else if (button.text == "Capitulo 7"){
		//gameState = gameStates.levelSelection7; Not implemented yet.
	}else if (button.text == "Capitulo 8"){
		//gameState = gameStates.levelSelection8; Not implemented yet.
	}else if (button.text == "Menu Principal" || button.text == "Menu"){
		gameState = gameStates.mainMenu;
		mapChp1LvL1 = undefined;
	}else if (button.text == "Level 1" || button.text == "Tente Novamente"){
		gameState = gameStates.chp1LvL1;
		buttons = [];
		mapChp1LvL1Init();
	}else if (button.text == "Level 2"){
		//gameState = gameStates.chp1LvL2; Not implemented yet.
	}else if (button.text == "Level 3"){
		//gameState = gameStates.chp1LvL3; Not implemented yet.
	}else if (button.text == "Level 4"){
		//gameState = gameStates.chp1LvL4; Not implemented yet.
	}else if (button.text == "Level 5"){
		//gameState = gameStates.chp1LvL5; Not implemented yet.
	}else if (button.text == "T1"){
		checkAddTower();
	}

}