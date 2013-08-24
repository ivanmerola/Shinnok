var buttons = [];
var polygons = [];

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
	button.isPolygon = false;
	buttons.push(button);
	drawButton(button);

}

function loadPolygonButton(xpoints, ypoints, color, text, textX, textY, textColor){

	var button = {};
	button.xpoints = xpoints;
	button.ypoints = ypoints;
	button.color = color;
	button.isPolygon = true;
	button.sides = xpoints.length;
	button.text = text;
	button.textX = textX;
	button.textY = textY;
	button.textColor = textColor;
	polygons.push(button);
	drawPolygon2(button);

}


function drawButton(button){

	drawRectangle(button.x, button.y, button.width, button.height, 2, "#000", true, button.color);
	drawText(button.text, "25px Arial", "center", button.textColor, button.textX, button.textY);

}

function drawPolygon2(polygon){

	drawPolygon(polygon.xpoints, polygon.ypoints, polygon.color);
	drawText(polygon.text, "25px Arial", "center", polygon.textColor, polygon.textX, polygon.textY);

}

function setButtonColor(color, button){

	button.color = color;
	drawButton(button);

}

function buttonUpdate(){

	if (mouseInside && polygons.length>0 && gameState==gameStates.chapterSelection){
		for(var i = 0; i<polygons.length; i++){
			var bool = isInside(polygons[i]);
			if(bool == true){
				polygons[i].color = "#F00";
				drawPolygon2(polygons[i]);
				clickPolygon(polygons[i]);
				break;
			}
		}
	}

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

	if (isClicked()){
		setButtonColor("#0000FF", button);
		buttonHandler(button);
	}

}

function clickPolygon(polygon){

	if(isClicked()){
		polygon.color = "#0000FF";
		drawPolygon2(polygon);
		upPolygon(polygon);
	}

}

function buttonHandler(button){


	if(isUp()){
		nextStep(button.text);
	}else{
		if(moved && !mouseClicked){setButtonColor("#FF0000", button);}
	}

}

function upPolygon(polygon){

	if(isUp()){
		nextStep(polygon.text);
	}else if (moved && !mouseClicked){
		polygon.color = "#FF0000";
		drawPolygon2(polygon);
	}

}

function nextStep(text){

	if (text == "Jogar" || text == "Selecao de Capitulos"){
		gameState = gameStates.chapterSelection;
	}else if (text == "Opcoes"){
		//gameState = gameStates.settings; Not implemented yet.
	}else if (text == "Capitulo 1" || text == "Cupcake"){
		gameState = gameStates.levelSelection1;
	}else if (text == "Capitulo 2" || text == "Donut"){
		//gameState = gameStates.levelSelection2; Not implemented yet.
	}else if (text == "Capitulo 3" || text == "Eclair"){
		//gameState = gameStates.levelSelection3; Not implemented yet.
	}else if (text == "Capitulo 4" || text == "Froyo"){
		//gameState = gameStates.levelSelection4; Not implemented yet.
	}else if (text == "Capitulo 5" || text == "Gingerbread"){
		//gameState = gameStates.levelSelection5; Not implemented yet.
	}else if (text == "Capitulo 6" || text == "HoneyComb"){
		//gameState = gameStates.levelSelection6; Not implemented yet.
	}else if (text == "Capitulo 7" || text == "IceCream"){
		//gameState = gameStates.levelSelection7; Not implemented yet.
	}else if (text == "Capitulo 8" || text == "JellyBean"){
		//gameState = gameStates.levelSelection8; Not implemented yet.
	}else if (text == "Menu Principal" || text == "Menu"){
		gameState = gameStates.mainMenu;
		mapChp1LvL1 = undefined;
	}else if (text == "Level 1" || text == "Tente Novamente"){
		gameState = gameStates.chp1LvL1;
		buttons = [];
		mapChp1LvL1Init();
		//map2Init();
	}else if (text == "Level 2"){
		//gameState = gameStates.chp1LvL2; Not implemented yet.
	}else if (text == "Level 3"){
		//gameState = gameStates.chp1LvL3; Not implemented yet.
	}else if (text == "Level 4"){
		//gameState = gameStates.chp1LvL4; Not implemented yet.
	}else if (text == "Level 5"){
		//gameState = gameStates.chp1LvL5; Not implemented yet.
	}else if (text == "T1"){
		checkAddTower();
	}

}